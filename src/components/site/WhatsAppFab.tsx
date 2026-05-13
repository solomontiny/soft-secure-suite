import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { SITE } from "@/lib/site";

export function WhatsAppFab() {
  const href = `https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hello Naingate, I'd like a quote.")}`;
  return (
    <motion.a href={href} target="_blank" rel="noreferrer"
      initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6, type: "spring" }}
      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 group">
      <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30" />
      <span className="relative flex items-center gap-2 rounded-full bg-emerald-500 text-white pl-4 pr-5 py-3 shadow-glow">
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline text-sm font-medium">Chat with us</span>
      </span>
    </motion.a>
  );
}
