import { motion } from "framer-motion";
import { ReactNode } from "react";

export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`mx-auto max-w-7xl px-4 py-16 sm:py-24 ${className}`}>{children}</section>
  );
}

export function SectionHeader({ eyebrow, title, sub, center = true }: { eyebrow?: string; title: string; sub?: string; center?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold ${center ? "" : ""}`}>
          <span className="h-px w-6 bg-gold" /> {eyebrow}
        </div>
      )}
      <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold text-navy">{title}</h2>
      {sub && <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">{sub}</p>}
    </motion.div>
  );
}
