import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, Quote } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Section, SectionHeader } from "@/components/site/Section";
import { PARTNERS } from "@/lib/site";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners & Clients — Naingate" },
      { name: "description", content: "Government, banking, logistics and corporate clients trust Naingate to manage their risk." },
      { property: "og:url", content: "/partners" },
    ],
    links: [{ rel: "canonical", href: "/partners" }],
  }),
  component: PartnersPage,
});

function PartnersPage() {
  return (
    <SiteLayout>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 gradient-hero" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,oklch(0.78_0.12_80/0.25),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:pt-24 sm:pb-32 text-white">
          <div className="inline-flex items-center gap-2 rounded-full glass-dark px-3.5 py-1.5 text-xs font-medium tracking-wide">
            <Sparkles className="h-3.5 w-3.5 text-gold" /> Partners & clients
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight max-w-3xl">
            In good company.
          </h1>
          <p className="mt-5 text-white/75 text-lg max-w-2xl leading-relaxed">
            Government agencies, banks, logistics groups and private enterprises across Nigeria
            trust Naingate to structure and manage their risk.
          </p>
        </div>
      </div>

      <Section>
        <SectionHeader eyebrow="Selected clients" title="Trusted by leading organisations" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PARTNERS.map((p, i) => (
            <motion.div key={p}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.04 }}
              className="rounded-2xl bg-white border border-border p-7 text-center hover:shadow-soft hover:-translate-y-1 transition-all">
              <div className="h-12 w-12 mx-auto rounded-xl bg-gradient-gold grid place-items-center font-display text-navy text-lg font-bold shadow-soft">
                {p.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </div>
              <div className="mt-4 text-sm font-semibold text-navy">{p}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl gradient-hero p-10 sm:p-14 text-white relative overflow-hidden">
          <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
          <Quote className="relative h-12 w-12 text-gold" />
          <p className="relative mt-6 text-2xl sm:text-3xl font-display max-w-3xl leading-snug">
            "Naingate has been a strategic risk partner for our operations — combining technical depth with genuinely fast claims response."
          </p>
          <div className="relative mt-6 text-sm text-white/70">— Group Head of Procurement, Tier-1 Bank</div>
        </div>
      </Section>
    </SiteLayout>
  );
}
