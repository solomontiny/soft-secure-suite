import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Compass, ShieldCheck, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Section, SectionHeader } from "@/components/site/Section";
import { BOARD, MANAGEMENT, VALUES } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Naingate Insurance Brokers" },
      { name: "description", content: "A registered NAICOM & NCRIB insurance broker delivering risk management for corporates, government and individuals." },
      { property: "og:title", content: "About Naingate" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function PageHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 gradient-hero" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,oklch(0.78_0.12_80/0.25),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:pt-24 sm:pb-32 text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full glass-dark px-3.5 py-1.5 text-xs font-medium tracking-wide">
          <Sparkles className="h-3.5 w-3.5 text-gold" /> {eyebrow}
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="mt-4 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight max-w-3xl">{title}</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mt-5 text-white/75 text-lg max-w-2xl leading-relaxed">{sub}</motion.p>
      </div>
    </div>
  );
}

function PersonCard({ name, role, i }: { name: string; role: string; i: number }) {
  const initials = name.split(" ").filter(Boolean).slice(0, 2).map((s) => s[0]).join("");
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: i * 0.05 }}
      className="rounded-3xl bg-white border border-border p-6 text-center hover:shadow-soft hover:-translate-y-1 transition-all">
      <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-navy to-navy-soft text-white grid place-items-center font-display text-2xl font-semibold shadow-soft">
        {initials}
      </div>
      <div className="mt-4 font-semibold text-navy">{name}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-gold font-semibold">{role}</div>
    </motion.div>
  );
}

function AboutPage() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="About us" title="A digital-led broker, built on trust."
        sub="Naingate Insurance Brokers Limited is a registered insurance broker with NAICOM and NCRIB, providing risk management and insurance solutions for corporate organisations, enterprises, government and individuals." />

      <Section>
        <div className="grid lg:grid-cols-2 gap-6">
          {[
            { icon: Target, title: "Our vision",
              body: "To be Africa's finest pro-active and digital-led insurance broker — renowned for excellent and prompt service." },
            { icon: Compass, title: "Our mission",
              body: "Achieve exponential growth through robust, result-driven streams of opportunities — ensuring stakeholders enjoy the peace of mind they desire." },
          ].map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="rounded-3xl bg-white border border-border p-8 sm:p-10 shadow-soft">
              <div className="h-12 w-12 rounded-2xl bg-gradient-gold grid place-items-center shadow-soft">
                <c.icon className="h-5 w-5 text-navy" />
              </div>
              <h3 className="mt-5 text-2xl font-semibold text-navy">{c.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{c.body}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="What we add" title="Value-added services"
          sub="Beyond placing policies, we work as your in-house risk team." />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUES.map((v, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="rounded-2xl bg-white border border-border p-6 flex gap-4">
              <div className="h-10 w-10 rounded-xl bg-secondary grid place-items-center shrink-0">
                <ShieldCheck className="h-5 w-5 text-navy" />
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed">{v}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Leadership" title="Board of Directors"
          sub="Experienced stewards guiding Naingate's strategy and governance." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BOARD.map((p, i) => <PersonCard key={p.name} {...p} i={i} />)}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Our team" title="Management"
          sub="The senior team running operations day-to-day." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MANAGEMENT.map((p, i) => <PersonCard key={p.name} {...p} i={i} />)}
        </div>
      </Section>
    </SiteLayout>
  );
}
