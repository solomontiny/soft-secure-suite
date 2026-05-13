import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Phone, FileText, ClipboardCheck, Wallet, Sparkles, ArrowRight, Upload } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Section, SectionHeader } from "@/components/site/Section";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/claims")({
  head: () => ({
    meta: [
      { title: "Claims Support — Naingate" },
      { name: "description", content: "File a claim with Naingate. We act as your advocate with the underwriter from notification to settlement." },
      { property: "og:url", content: "/claims" },
    ],
    links: [{ rel: "canonical", href: "/claims" }],
  }),
  component: ClaimsPage,
});

const STEPS = [
  { icon: Phone, title: "Notify", body: "Call, email or WhatsApp our claims desk within 24 hours of the incident." },
  { icon: FileText, title: "Document", body: "Send photos, reports and the policy number — we handle the underwriter forms." },
  { icon: ClipboardCheck, title: "Assess", body: "An adjuster inspects damage and we negotiate the settlement on your behalf." },
  { icon: Wallet, title: "Settle", body: "Funds are disbursed directly to your nominated account, usually within 14 working days." },
];

function ClaimsPage() {
  return (
    <SiteLayout>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 gradient-hero" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,oklch(0.78_0.12_80/0.25),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:pt-24 sm:pb-32 text-white">
          <div className="inline-flex items-center gap-2 rounded-full glass-dark px-3.5 py-1.5 text-xs font-medium tracking-wide">
            <Sparkles className="h-3.5 w-3.5 text-gold" /> Claims support
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight max-w-3xl">
            We'll move the moment you do.
          </h1>
          <p className="mt-5 text-white/75 text-lg max-w-2xl leading-relaxed">
            From the first call to the cleared payout, our claims team works for you — not the underwriter.
          </p>
          <a href={`tel:${SITE.whatsapp}`} className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-gold text-navy font-semibold px-6 py-3.5 shadow-glow">
            <Phone className="h-4 w-4" /> Call claims desk
          </a>
        </div>
      </div>

      <Section>
        <SectionHeader eyebrow="The process" title="Four steps. One advocate." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="relative rounded-3xl bg-white border border-border p-7 hover:shadow-soft transition-all">
              <div className="absolute top-4 right-5 text-5xl font-display font-semibold text-secondary">0{i + 1}</div>
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-navy to-navy-soft grid place-items-center shadow-soft">
                <s.icon className="h-5 w-5 text-gold" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-navy">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <SectionHeader center={false} eyebrow="File a claim" title="Tell us what happened"
              sub="Submit the basics here and a claims officer will reach out within one business hour." />
          </div>
          <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            onSubmit={(e) => e.preventDefault()}
            className="rounded-3xl bg-white border border-border p-7 sm:p-8 shadow-soft space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <input className="rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" placeholder="Full name" />
              <input className="rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" placeholder="Policy number" />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <input type="email" className="rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" placeholder="Email" />
              <input type="tel" className="rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" placeholder="Phone" />
            </div>
            <input type="date" className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
            <textarea rows={4} placeholder="Briefly describe the incident" className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
            <label className="flex items-center gap-2 rounded-xl border border-dashed border-border px-4 py-4 text-sm text-muted-foreground cursor-pointer hover:border-gold transition-colors">
              <Upload className="h-4 w-4" /> Attach photos or documents
              <input type="file" className="hidden" multiple />
            </label>
            <button className="w-full rounded-xl bg-navy text-white font-medium py-3.5 hover:bg-navy-soft transition-colors inline-flex items-center justify-center gap-2">
              Submit claim <ArrowRight className="h-4 w-4" />
            </button>
          </motion.form>
        </div>
      </Section>
    </SiteLayout>
  );
}
