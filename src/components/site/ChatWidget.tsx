import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Bot, ExternalLink, Sparkles } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import {
  startWebConversation,
  sendVisitorMessage,
  getVisitorMessages,
} from "@/lib/chat.functions";
import { SITE } from "@/lib/site";

type Msg = { id: string; role: string; content: string; created_at: string };

const STORAGE_KEY = "naingate.cid";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"ai" | "wa">("ai");
  const [cid, setCid] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const startFn = useServerFn(startWebConversation);
  const sendFn = useServerFn(sendVisitorMessage);
  const getFn = useServerFn(getVisitorMessages);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCid(localStorage.getItem(STORAGE_KEY));
    }
  }, []);

  useEffect(() => {
    if (!open || !cid) return;
    let cancelled = false;
    const load = async () => {
      const { messages: m } = await getFn({ data: { conversationId: cid } });
      if (!cancelled) setMessages(m as Msg[]);
    };
    load();
    const t = setInterval(load, 3500);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, [open, cid, getFn]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const ensureConversation = async () => {
    if (cid) return cid;
    const { conversationId } = await startFn({ data: {} });
    localStorage.setItem(STORAGE_KEY, conversationId);
    setCid(conversationId);
    return conversationId;
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setSending(true);
    try {
      const id = await ensureConversation();
      const optimistic: Msg = {
        id: `tmp-${Date.now()}`,
        role: "user",
        content: text,
        created_at: new Date().toISOString(),
      };
      setMessages((m) => [...m, optimistic]);
      setInput("");
      setTyping(true);
      await sendFn({ data: { conversationId: id, content: text } });
      const { messages: m } = await getFn({ data: { conversationId: id } });
      setMessages(m as Msg[]);
    } catch (e) {
      console.error(e);
    } finally {
      setTyping(false);
      setSending(false);
    }
  };

  const waNumber = SITE.whatsapp.replace(/\D/g, "");
  const waHref = `https://wa.me/${waNumber || ""}?text=${encodeURIComponent("Hello Naingate, I'd like a quote.")}`;

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Open chat"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30" />
        <span className="relative flex items-center gap-2 rounded-full bg-emerald-500 text-white pl-4 pr-5 py-3 shadow-glow">
          {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
          <span className="hidden sm:inline text-sm font-medium">
            {open ? "Close" : "Chat with us"}
          </span>
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] max-h-[78vh] rounded-3xl bg-white border border-border shadow-2xl flex flex-col overflow-hidden"
          >
            <header className="bg-gradient-to-br from-navy to-navy-soft text-white p-5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-11 w-11 rounded-2xl bg-gradient-gold grid place-items-center text-navy">
                    <Bot className="h-5 w-5" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-navy" />
                </div>
                <div className="min-w-0">
                  <div className="font-display font-semibold leading-tight">Naingate Assistant</div>
                  <div className="text-xs text-white/70 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> AI · online 24/7
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-1 bg-white/10 rounded-xl p-1">
                <button
                  onClick={() => setTab("ai")}
                  className={`text-xs font-medium py-2 rounded-lg transition-colors ${tab === "ai" ? "bg-white text-navy" : "text-white/80 hover:text-white"}`}
                >
                  AI Chat
                </button>
                <button
                  onClick={() => setTab("wa")}
                  className={`text-xs font-medium py-2 rounded-lg transition-colors ${tab === "wa" ? "bg-white text-navy" : "text-white/80 hover:text-white"}`}
                >
                  WhatsApp
                </button>
              </div>
            </header>

            {tab === "ai" ? (
              <>
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-secondary/30">
                  {messages.length === 0 && (
                    <div className="text-center text-sm text-muted-foreground py-8">
                      <Bot className="h-8 w-8 mx-auto mb-2 text-navy/40" />
                      Ask me about products, quotes or claims.
                    </div>
                  )}
                  {messages.map((m) => (
                    <Bubble key={m.id} role={m.role} content={m.content} />
                  ))}
                  {typing && (
                    <div className="flex gap-1.5 px-3 py-2.5 bg-white rounded-2xl rounded-bl-md w-fit shadow-sm border border-border">
                      <span className="h-2 w-2 rounded-full bg-navy/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 rounded-full bg-navy/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-2 w-2 rounded-full bg-navy/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  )}
                </div>
                <div className="p-3 border-t border-border bg-white">
                  <div className="flex items-end gap-2">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      placeholder="Type your message…"
                      rows={1}
                      className="flex-1 resize-none rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:bg-white max-h-32"
                    />
                    <button
                      onClick={handleSend}
                      disabled={sending || !input.trim()}
                      className="h-10 w-10 grid place-items-center rounded-xl bg-navy text-white disabled:opacity-50 hover:bg-navy-soft transition-colors shrink-0"
                    >
                      {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2 text-center">
                    Powered by Naingate AI · A human broker takes over for complex cases.
                  </p>
                </div>
              </>
            ) : (
              <div className="p-6 space-y-4 text-center">
                <div className="h-16 w-16 mx-auto rounded-2xl bg-emerald-500 grid place-items-center">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-lg text-navy">Chat on WhatsApp</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Continue the conversation in your WhatsApp app with a Naingate broker.
                  </p>
                </div>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-500 text-white py-3 font-medium hover:bg-emerald-600 transition-colors"
                >
                  Open WhatsApp <ExternalLink className="h-4 w-4" />
                </a>
                <p className="text-xs text-muted-foreground">
                  {waNumber ? `+${waNumber}` : "WhatsApp number coming soon — use AI Chat for now."}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({ role, content }: { role: string; content: string }) {
  const isUser = role === "user";
  const isAgent = role === "agent";
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm whitespace-pre-wrap break-words shadow-sm ${
          isUser
            ? "bg-navy text-white rounded-br-md"
            : isAgent
              ? "bg-gold/20 text-navy border border-gold/40 rounded-bl-md"
              : "bg-white text-foreground border border-border rounded-bl-md"
        }`}
      >
        {!isUser && (
          <div className={`text-[10px] uppercase tracking-wider font-semibold mb-0.5 ${isAgent ? "text-gold-deep" : "text-navy/60"}`}>
            {isAgent ? "Naingate Broker" : "Assistant"}
          </div>
        )}
        {content}
      </div>
    </motion.div>
  );
}
