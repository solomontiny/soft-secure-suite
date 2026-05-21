import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  LayoutDashboard, Send, Loader2, Bot, User as UserIcon, LogOut,
  CheckCircle2, AlertCircle, Search, MessageSquare, TrendingUp, Power, Sparkles,
} from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import {
  listConversations, adminGetMessages, adminSendMessage,
  adminToggleAi, adminCloseConversation, adminAnalytics,
} from "@/lib/chat.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Naingate" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Conversation = {
  id: string; channel: string; visitor_name: string | null; visitor_phone: string | null;
  whatsapp_from: string | null; ai_mode: boolean; status: string; unread_count: number;
  last_message_preview: string | null; last_message_at: string; created_at: string;
};
type Message = { id: string; role: string; content: string; created_at: string };

function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="min-h-screen grid place-items-center"><Loader2 className="h-6 w-6 animate-spin text-navy" /></div>;
  }
  if (!user) return null;
  if (!isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center bg-secondary/40 p-6">
        <div className="max-w-md text-center rounded-3xl bg-white p-8 border border-border">
          <AlertCircle className="h-10 w-10 text-amber-500 mx-auto mb-3" />
          <h1 className="font-display text-xl text-navy">Not an admin</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Your account ({user.email}) is signed in but not authorised. Contact a Naingate admin.
          </p>
          <button onClick={() => supabase.auth.signOut()} className="mt-4 text-sm font-medium text-navy hover:text-gold">
            Sign out
          </button>
        </div>
      </div>
    );
  }
  return <Dashboard />;
}

function Dashboard() {
  const qc = useQueryClient();
  const listFn = useServerFn(listConversations);
  const analyticsFn = useServerFn(adminAnalytics);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const { data: convData } = useQuery({
    queryKey: ["admin", "conversations"],
    queryFn: () => listFn({}),
    refetchInterval: 5000,
  });
  const { data: stats } = useQuery({
    queryKey: ["admin", "analytics"],
    queryFn: () => analyticsFn({}),
    refetchInterval: 15000,
  });

  // Realtime: refresh on any change
  useEffect(() => {
    const ch = supabase
      .channel("admin-stream")
      .on("postgres_changes", { event: "*", schema: "public", table: "messages" }, () => {
        qc.invalidateQueries({ queryKey: ["admin"] });
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "conversations" }, () => {
        qc.invalidateQueries({ queryKey: ["admin"] });
      })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [qc]);

  const conversations = (convData?.conversations ?? []) as Conversation[];
  const filtered = conversations.filter((c) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (c.visitor_name ?? "").toLowerCase().includes(s) ||
      (c.last_message_preview ?? "").toLowerCase().includes(s) ||
      (c.visitor_phone ?? "").includes(s);
  });
  const active = filtered.find((c) => c.id === activeId) ?? filtered[0];

  return (
    <div className="min-h-screen bg-secondary/40 flex flex-col lg:flex-row">
      <aside className="hidden lg:flex flex-col w-60 bg-navy text-white p-5 sticky top-0 h-screen">
        <div className="[&_*]:!text-white"><Logo light /></div>
        <nav className="mt-10 space-y-1 text-sm">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10">
            <LayoutDashboard className="h-4 w-4" /> Live chats
          </div>
        </nav>
        <div className="mt-auto space-y-2">
          <Link to="/" className="block text-xs text-gold hover:underline">← Back to website</Link>
          <button onClick={() => supabase.auth.signOut()} className="text-xs text-white/70 hover:text-white flex items-center gap-1">
            <LogOut className="h-3 w-3" /> Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="bg-white border-b border-border px-5 py-4 flex items-center gap-4">
          <div className="lg:hidden"><Logo /></div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Dashboard</div>
            <h1 className="text-xl font-display text-navy">Naingate Assistant — Live Inbox</h1>
          </div>
          <div className="ml-auto hidden md:flex items-center gap-6 text-xs">
            <Stat label="Conversations" value={stats?.totals.total ?? 0} />
            <Stat label="Open" value={stats?.totals.open ?? 0} accent="emerald" />
            <Stat label="Escalated" value={stats?.totals.escalated ?? 0} accent="amber" />
            <Stat label="AI replies (7d)" value={stats?.week.ai ?? 0} />
          </div>
        </header>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-[320px_1fr] min-h-0">
          {/* Conversation list */}
          <div className="border-r border-border bg-white flex flex-col min-h-0">
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search chats…"
                  className="w-full rounded-xl bg-secondary px-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filtered.length === 0 && (
                <div className="text-center text-sm text-muted-foreground p-8">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-40" />
                  No chats yet.
                </div>
              )}
              {filtered.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={`w-full text-left px-4 py-3 border-b border-border hover:bg-secondary/50 transition-colors ${active?.id === c.id ? "bg-secondary/70" : ""}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-medium text-sm text-navy truncate">
                      {c.visitor_name || c.whatsapp_from || c.visitor_phone || "Anonymous visitor"}
                    </div>
                    <span className={`text-[10px] font-semibold uppercase rounded-full px-1.5 py-0.5 ${c.channel === "whatsapp" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"}`}>
                      {c.channel}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground truncate mt-0.5">{c.last_message_preview ?? "—"}</div>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    {c.ai_mode ? (
                      <span className="inline-flex items-center gap-1 text-[10px] rounded-full bg-violet-50 text-violet-700 px-1.5 py-0.5"><Bot className="h-2.5 w-2.5" /> AI</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] rounded-full bg-gold/20 text-gold-deep px-1.5 py-0.5"><UserIcon className="h-2.5 w-2.5" /> Human</span>
                    )}
                    {c.status === "escalated" && (
                      <span className="inline-flex items-center gap-1 text-[10px] rounded-full bg-amber-50 text-amber-700 px-1.5 py-0.5"><AlertCircle className="h-2.5 w-2.5" /> Needs you</span>
                    )}
                    {c.status === "closed" && (
                      <span className="inline-flex items-center gap-1 text-[10px] rounded-full bg-secondary text-muted-foreground px-1.5 py-0.5"><CheckCircle2 className="h-2.5 w-2.5" /> Closed</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat panel */}
          {active ? <ChatPanel key={active.id} conversation={active} /> : (
            <div className="grid place-items-center text-muted-foreground">
              <div className="text-center">
                <Sparkles className="h-10 w-10 mx-auto text-navy/30" />
                <p className="mt-2 text-sm">Select a conversation to view messages.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: "emerald" | "amber" }) {
  return (
    <div>
      <div className="text-muted-foreground text-[10px] uppercase tracking-wider">{label}</div>
      <div className={`text-lg font-display font-semibold ${accent === "emerald" ? "text-emerald-600" : accent === "amber" ? "text-amber-600" : "text-navy"}`}>{value}</div>
    </div>
  );
}

function ChatPanel({ conversation }: { conversation: Conversation }) {
  const qc = useQueryClient();
  const getFn = useServerFn(adminGetMessages);
  const sendFn = useServerFn(adminSendMessage);
  const toggleFn = useServerFn(adminToggleAi);
  const closeFn = useServerFn(adminCloseConversation);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data } = useQuery({
    queryKey: ["admin", "messages", conversation.id],
    queryFn: () => getFn({ data: { conversationId: conversation.id } }),
    refetchInterval: 3000,
  });
  const messages = (data?.messages ?? []) as Message[];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setSending(true);
    try {
      await sendFn({ data: { conversationId: conversation.id, content: text } });
      setInput("");
      qc.invalidateQueries({ queryKey: ["admin"] });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to send");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col min-h-0 bg-secondary/30">
      <header className="bg-white border-b border-border px-5 py-3 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-navy to-navy-soft text-white grid place-items-center font-semibold">
          {(conversation.visitor_name ?? "A").slice(0, 1).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-medium text-navy truncate">
            {conversation.visitor_name || conversation.whatsapp_from || conversation.visitor_phone || "Anonymous visitor"}
          </div>
          <div className="text-xs text-muted-foreground">
            {conversation.channel.toUpperCase()} · {new Date(conversation.created_at).toLocaleString()}
          </div>
        </div>
        <button
          onClick={async () => {
            await toggleFn({ data: { conversationId: conversation.id, aiMode: !conversation.ai_mode } });
            qc.invalidateQueries({ queryKey: ["admin"] });
            toast.success(conversation.ai_mode ? "You've taken over" : "AI is back on");
          }}
          className={`text-xs font-medium rounded-xl px-3 py-2 transition-colors ${conversation.ai_mode ? "bg-gold text-navy hover:bg-gold-deep" : "bg-violet-100 text-violet-700 hover:bg-violet-200"}`}
        >
          {conversation.ai_mode ? "Take over" : "Hand back to AI"}
        </button>
        <button
          onClick={async () => {
            await closeFn({ data: { conversationId: conversation.id } });
            qc.invalidateQueries({ queryKey: ["admin"] });
            toast.success("Conversation closed");
          }}
          className="text-xs font-medium rounded-xl px-3 py-2 bg-secondary text-navy hover:bg-secondary/70"
          title="Close conversation"
        >
          <Power className="h-3.5 w-3.5" />
        </button>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-3">
        {messages.map((m) => {
          const isUser = m.role === "user";
          const isAgent = m.role === "agent";
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${isUser ? "justify-start" : "justify-end"}`}
            >
              <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap shadow-sm ${
                isUser ? "bg-white border border-border text-foreground rounded-bl-md"
                  : isAgent ? "bg-navy text-white rounded-br-md"
                  : "bg-gradient-to-br from-violet-500 to-violet-600 text-white rounded-br-md"
              }`}>
                <div className={`text-[10px] uppercase tracking-wider font-semibold mb-0.5 ${
                  isUser ? "text-navy/60" : "text-white/70"
                }`}>
                  {isUser ? "Visitor" : isAgent ? "You" : "AI"}
                </div>
                {m.content}
                <div className={`text-[10px] mt-1 ${isUser ? "text-muted-foreground" : "text-white/60"}`}>
                  {new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="p-3 border-t border-border bg-white">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder={conversation.ai_mode ? "AI is handling this chat — take over to reply manually" : "Type your reply…"}
            disabled={conversation.ai_mode}
            rows={2}
            className="flex-1 resize-none rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:bg-white disabled:opacity-60"
          />
          <button
            onClick={send}
            disabled={sending || !input.trim() || conversation.ai_mode}
            className="h-11 px-4 grid place-items-center rounded-xl bg-navy text-white disabled:opacity-50 hover:bg-navy-soft transition-colors shrink-0"
          >
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <span className="inline-flex items-center gap-1.5 text-sm font-medium"><Send className="h-3.5 w-3.5" /> Send</span>}
          </button>
        </div>
        <div className="flex items-center gap-2 mt-2 text-[11px] text-muted-foreground">
          <TrendingUp className="h-3 w-3" />
          Replies sent here are saved and shown to the visitor in real time.
        </div>
      </div>
    </div>
  );
}
