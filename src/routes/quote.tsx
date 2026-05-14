import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ShieldCheck, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Section } from "@/components/site/Section";
import { PRODUCTS } from "@/lib/site";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Get a Quote — Naingate Insurance Brokers" },
      { name: "description", content: "Request a free, no-obligation insurance quote. A senior broker responds within one business day." },
      { property: "og:title", content: "Get a Quote — Naingate Insurance Brokers" },
      { property: "og:description", content: "Free, no-obligation insurance quote in under a business day." },
    ],
    links: [{ rel: "canonical", href: "/quote" }],
  }),
  component: QuotePage,
});

function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", product: PRODUCTS[0].slug,
    sumInsured: "", details: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem("naingate_quotes") || "[]");
    stored.unshift({ ...form, id: crypto.randomUUID(), createdAt: new Date().toISOString(), status: "new" });
    localStorage.setItem("naingate_quotes", JSON.stringify(stored));
    setSubmitted(true);
  };

  return (
    <SiteLayout>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 gradient-hero" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,oklch(0.78_0.12_80/0.25),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 pt-24 pb-20 sm:pt-32 text-white">
          <div className="inline-flex items-center gap-2 rounded-full glass-dark px-3.5 py-1.5 text-xs font-medium tracking-wide">
            <Sparkles className="h-3.5 w-3.5 text-gold" /> Free quote
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight max-w-3xl">
            Tell us what to insure. We'll do the rest.
          </h1>
          <p className="mt-5 text-white/75 text-lg max-w-2xl leading-relaxed">
            One short form. We benchmark across leading underwriters and come back with the best combination of cover and price.
          </p>
        </div>
      </div>

      <Section>
        <div className="grid lg:grid-cols-5 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-3 rounded-3xl glass shadow-soft p-6 sm:p-10">
            {submitted ? (
              <div className="text-center py-10">
                <div className="mx-auto h-14 w-14 grid place-items-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-navy">Quote request received</h3>
                <p className="mt-2 text-muted-foreground">A senior broker will reach out within one business day.</p>
                <Link to="/" className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-navy text-white text-sm font-medium px-5 py-2.5">
                  Back to home <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-4">
                <Field label="Full name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                <Field label="Email" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                <Field label="Phone" required value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-navy/70 uppercase tracking-wide">Product</label>
                  <select value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })}
                    className="rounded-xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40">
                    {PRODUCTS.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}
                  </select>
                </div>
                <Field label="Sum insured (₦)" value={form.sumInsured} onChange={(v) => setForm({ ...form, sumInsured: v })} className="sm:col-span-2" />
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-navy/70 uppercase tracking-wide">Details</label>
                  <textarea rows={4} value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })}
                    placeholder="Tell us about the asset, location, usage, etc."
                    className="rounded-xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
                </div>
                <button type="submit" className="sm:col-span-2 mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold text-navy font-semibold px-6 py-3.5 shadow-glow hover:opacity-95 transition">
                  Request my quote <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </motion.div>

          <div className="lg:col-span-2 space-y-4">
            {[
              { t: "Independent advice", d: "We work for you, not the underwriter — every recommendation is in your best interest." },
              { t: "Best market price", d: "We benchmark across the leading NAICOM-licensed underwriters in Nigeria." },
              { t: "Claims advocacy", d: "If you ever need to claim, we negotiate on your behalf until you're paid in full." },
            ].map((b) => (
              <div key={b.t} className="rounded-2xl glass shadow-soft p-5 flex gap-4">
                <div className="h-10 w-10 grid place-items-center rounded-xl bg-navy text-gold shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-navy">{b.t}</div>
                  <div className="text-sm text-muted-foreground mt-1">{b.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}

function Field({ label, value, onChange, type = "text", required, className = "" }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; className?: string }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-xs font-semibold text-navy/70 uppercase tracking-wide">{label}</label>
      <input type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
    </div>
  );
}
