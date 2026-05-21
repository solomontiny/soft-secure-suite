import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateText } from "ai";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createLovableAiGatewayProvider, NAINGATE_SYSTEM_PROMPT } from "./ai-gateway";

async function isAdmin(userId: string) {
  const { data } = await supabaseAdmin
    .from("profiles")
    .select("is_admin")
    .eq("user_id", userId)
    .maybeSingle();
  return !!data?.is_admin;
}

async function runAssistant(conversationId: string) {
  const { data: msgs } = await supabaseAdmin
    .from("messages")
    .select("role, content")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })
    .limit(30);

  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("LOVABLE_API_KEY missing");
  const gateway = createLovableAiGatewayProvider(key);

  const history = (msgs ?? []).map((m) => ({
    role: m.role === "user" ? ("user" as const) : ("assistant" as const),
    content: m.content,
  }));

  const { text } = await generateText({
    model: gateway("google/gemini-3-flash-preview"),
    system: NAINGATE_SYSTEM_PROMPT,
    messages: history,
  });

  const escalate = /\[ESCALATE\]/i.test(text);
  const clean = text.replace(/\[ESCALATE\]/gi, "").trim();

  await supabaseAdmin.from("messages").insert({
    conversation_id: conversationId,
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
    .eq("id", conversationId);
  return { text: clean, escalated: escalate };
}

// PUBLIC: visitor creates/gets a web conversation
export const startWebConversation = createServerFn({ method: "POST" })
  .inputValidator((input: { name?: string; phone?: string }) =>
    z.object({ name: z.string().max(120).optional(), phone: z.string().max(40).optional() }).parse(input),
  )
  .handler(async ({ data }) => {
    const { data: row, error } = await supabaseAdmin
      .from("conversations")
      .insert({
        channel: "web",
        visitor_name: data.name ?? null,
        visitor_phone: data.phone ?? null,
        ai_mode: true,
        last_message_preview: "New chat started",
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);

    await supabaseAdmin.from("messages").insert({
      conversation_id: row.id,
      role: "assistant",
      content: `Hi${data.name ? ` ${data.name.split(" ")[0]}` : ""}! I'm Naingate Assistant. How can I help — a quote, a claim, or a product question?`,
    });
    return { conversationId: row.id };
  });

// PUBLIC: visitor sends a message
export const sendVisitorMessage = createServerFn({ method: "POST" })
  .inputValidator((input: { conversationId: string; content: string }) =>
    z
      .object({
        conversationId: z.string().uuid(),
        content: z.string().trim().min(1).max(4000),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { data: convo } = await supabaseAdmin
      .from("conversations")
      .select("id, ai_mode, status")
      .eq("id", data.conversationId)
      .maybeSingle();
    if (!convo) throw new Error("Conversation not found");

    await supabaseAdmin.from("messages").insert({
      conversation_id: data.conversationId,
      role: "user",
      content: data.content,
    });
    await supabaseAdmin
      .from("conversations")
      .update({
        last_message_at: new Date().toISOString(),
        last_message_preview: data.content.slice(0, 140),
        unread_count: 1,
        status: convo.status === "closed" ? "open" : convo.status,
      })
      .eq("id", data.conversationId);

    if (convo.ai_mode && convo.status !== "escalated") {
      try {
        const reply = await runAssistant(data.conversationId);
        return { ok: true, reply: reply.text, escalated: reply.escalated };
      } catch (e) {
        console.error("AI reply failed", e);
        return { ok: true, reply: null, escalated: false };
      }
    }
    return { ok: true, reply: null, escalated: false };
  });

// PUBLIC: visitor fetches own conversation messages (knows the UUID)
export const getVisitorMessages = createServerFn({ method: "POST" })
  .inputValidator((input: { conversationId: string }) =>
    z.object({ conversationId: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data }) => {
    const { data: messages } = await supabaseAdmin
      .from("messages")
      .select("id, role, content, media_url, media_type, created_at")
      .eq("conversation_id", data.conversationId)
      .order("created_at", { ascending: true });
    return { messages: messages ?? [] };
  });

// ADMIN
export const listConversations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    if (!(await isAdmin(context.userId))) throw new Error("Forbidden");
    const { data } = await supabaseAdmin
      .from("conversations")
      .select("*")
      .order("last_message_at", { ascending: false })
      .limit(200);
    return { conversations: data ?? [] };
  });

export const adminGetMessages = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { conversationId: string }) =>
    z.object({ conversationId: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    if (!(await isAdmin(context.userId))) throw new Error("Forbidden");
    const { data: msgs } = await supabaseAdmin
      .from("messages")
      .select("*")
      .eq("conversation_id", data.conversationId)
      .order("created_at", { ascending: true });
    await supabaseAdmin
      .from("conversations")
      .update({ unread_count: 0 })
      .eq("id", data.conversationId);
    return { messages: msgs ?? [] };
  });

export const adminSendMessage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { conversationId: string; content: string }) =>
    z
      .object({
        conversationId: z.string().uuid(),
        content: z.string().trim().min(1).max(4000),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    if (!(await isAdmin(context.userId))) throw new Error("Forbidden");
    await supabaseAdmin.from("messages").insert({
      conversation_id: data.conversationId,
      role: "agent",
      content: data.content,
    });
    await supabaseAdmin
      .from("conversations")
      .update({
        last_message_at: new Date().toISOString(),
        last_message_preview: data.content.slice(0, 140),
        ai_mode: false,
      })
      .eq("id", data.conversationId);
    return { ok: true };
  });

export const adminToggleAi = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { conversationId: string; aiMode: boolean }) =>
    z.object({ conversationId: z.string().uuid(), aiMode: z.boolean() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    if (!(await isAdmin(context.userId))) throw new Error("Forbidden");
    await supabaseAdmin
      .from("conversations")
      .update({ ai_mode: data.aiMode, status: data.aiMode ? "open" : "escalated" })
      .eq("id", data.conversationId);
    return { ok: true };
  });

export const adminCloseConversation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { conversationId: string }) =>
    z.object({ conversationId: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    if (!(await isAdmin(context.userId))) throw new Error("Forbidden");
    await supabaseAdmin.from("conversations").update({ status: "closed" }).eq("id", data.conversationId);
    return { ok: true };
  });

export const adminAnalytics = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    if (!(await isAdmin(context.userId))) throw new Error("Forbidden");
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const [{ count: total }, { count: open }, { count: escalated }, { data: recent }] = await Promise.all([
      supabaseAdmin.from("conversations").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("conversations").select("id", { count: "exact", head: true }).eq("status", "open"),
      supabaseAdmin.from("conversations").select("id", { count: "exact", head: true }).eq("status", "escalated"),
      supabaseAdmin
        .from("messages")
        .select("role, created_at")
        .gte("created_at", since)
        .limit(2000),
    ]);
    const ai = (recent ?? []).filter((m) => m.role === "assistant").length;
    const human = (recent ?? []).filter((m) => m.role === "agent").length;
    const visitor = (recent ?? []).filter((m) => m.role === "user").length;
    return {
      totals: { total: total ?? 0, open: open ?? 0, escalated: escalated ?? 0 },
      week: { ai, human, visitor },
    };
  });
