import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { createLovableAiGatewayProvider, NAINGATE_SYSTEM_PROMPT } from "@/lib/ai-gateway";
import { generateText } from "ai";

async function sendWa(to: string, body: string) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneId) {
    console.warn("WhatsApp credentials missing — skipping send");
    return;
  }
  await fetch(`https://graph.facebook.com/v20.0/${phoneId}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ messaging_product: "whatsapp", to, type: "text", text: { body } }),
  });
}

export const Route = createFileRoute("/api/public/whatsapp/webhook")({
  server: {
    handlers: {
      // Meta verification
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const mode = url.searchParams.get("hub.mode");
        const token = url.searchParams.get("hub.verify_token");
        const challenge = url.searchParams.get("hub.challenge");
        const expected = process.env.WHATSAPP_VERIFY_TOKEN ?? "naingate-verify";
        if (mode === "subscribe" && token === expected && challenge) {
          return new Response(challenge, { status: 200 });
        }
        return new Response("Forbidden", { status: 403 });
      },
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as {
            entry?: Array<{
              changes?: Array<{
                value?: {
                  messages?: Array<{ from: string; text?: { body: string }; type: string }>;
                  contacts?: Array<{ profile?: { name?: string } }>;
                };
              }>;
            }>;
          };
          for (const entry of body.entry ?? []) {
            for (const change of entry.changes ?? []) {
              const msgs = change.value?.messages ?? [];
              const name = change.value?.contacts?.[0]?.profile?.name ?? null;
              for (const m of msgs) {
                if (m.type !== "text" || !m.text?.body) continue;
                // upsert conversation by whatsapp_from
                const { data: existing } = await supabaseAdmin
                  .from("conversations")
                  .select("id, ai_mode, status")
                  .eq("whatsapp_from", m.from)
                  .order("created_at", { ascending: false })
                  .limit(1)
                  .maybeSingle();
                let convoId = existing?.id;
                let aiMode = existing?.ai_mode ?? true;
                const status = existing?.status ?? "open";
                if (!convoId) {
                  const { data: created } = await supabaseAdmin
                    .from("conversations")
                    .insert({
                      channel: "whatsapp",
                      whatsapp_from: m.from,
                      visitor_name: name,
                      visitor_phone: m.from,
                      ai_mode: true,
                    })
                    .select("id")
                    .single();
                  convoId = created!.id;
                  aiMode = true;
                }
                await supabaseAdmin.from("messages").insert({
                  conversation_id: convoId,
                  role: "user",
                  content: m.text.body,
                });
                await supabaseAdmin
                  .from("conversations")
                  .update({
                    last_message_at: new Date().toISOString(),
                    last_message_preview: m.text.body.slice(0, 140),
                    unread_count: 1,
                  })
                  .eq("id", convoId);

                if (aiMode && status !== "escalated") {
                  try {
                    const { data: hist } = await supabaseAdmin
                      .from("messages")
                      .select("role, content")
                      .eq("conversation_id", convoId)
                      .order("created_at", { ascending: true })
                      .limit(30);
                    const key = process.env.LOVABLE_API_KEY!;
                    const gateway = createLovableAiGatewayProvider(key);
                    const { text } = await generateText({
                      model: gateway("google/gemini-3-flash-preview"),
                      system: NAINGATE_SYSTEM_PROMPT,
                      messages: (hist ?? []).map((h) => ({
                        role: h.role === "user" ? "user" as const : "assistant" as const,
                        content: h.content,
                      })),
                    });
                    const escalate = /\[ESCALATE\]/i.test(text);
                    const clean = text.replace(/\[ESCALATE\]/gi, "").trim();
                    await supabaseAdmin.from("messages").insert({
                      conversation_id: convoId,
                      role: "assistant",
                      content: clean,
                    });
                    await supabaseAdmin
                      .from("conversations")
                      .update({
                        last_message_at: new Date().toISOString(),
                        last_message_preview: clean.slice(0, 140),
                        ...(escalate ? { status: "escalated", ai_mode: false } : {}),
                      })
                      .eq("id", convoId);
                    await sendWa(m.from, clean);
                  } catch (e) {
                    console.error("AI WA reply failed", e);
                  }
                }
              }
            }
          }
          return new Response("ok", { status: 200 });
        } catch (e) {
          console.error("webhook error", e);
          return new Response("ok", { status: 200 });
        }
      },
    },
  },
});
