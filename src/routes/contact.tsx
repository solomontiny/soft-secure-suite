import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, MapPin, Sparkles, ArrowRight, Phone } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Section } from "@/components/site/Section";
import { SITE, PRODUCTS } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Naingate Insurance Brokers" },
      { name: "description", content: "Reach Naingate in Lagos, Ibadan or Abuja. Request a free quote or speak with a broker today." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 gradient-hero" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,oklch(0.78_0.12_80/0.25),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:pt-24 sm:pb-32 text-white">
          <div className="inline-flex items-center gap-2 rounded-full glass-dark px-3.5 py-1.5 text-xs font-medium tracking-wide">
            <Sparkles className="h-3.5 w-3.5 text-gold" /> Contact
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight max-w-3xl">
            Let's build the right cover, together.
          </h1>
          <p className="mt-5 text-white/75 text-lg max-w-2xl leading-relaxed">
            Tell us a little about what you'd like to insure. A senior broker will respond within one business day.
          </p>
        </div>
      </div>

      <Section>
        <div className="grid lg:grid-cols-5 gap-8">
          <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            onSubmit={(e) => e.preventDefault()}
            className="lg:col-span-3 rounded-3xl bg-white border border-border p-7 sm:p-10 shadow-soft space-y-3">
            <h2 className="text-2xl font-semibold text-navy">Request a quote</h2>
            <div className="grid sm:grid-cols-2 gap-3 pt-3">
              <input className="rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" placeholder="First name" />
              <input className="rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" placeholder="Last name" />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <input type="email" className="rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" placeholder="Email" />
              <input type="tel" className="rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" placeholder="Phone" />
            </div>
            <input className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" placeholder="Company (optional)" />
            <select className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold">
              <option>What are you looking to insure?</option>
              {PRODUCTS.map((p) => <option key={p.slug}>{p.name}</option>)}
            </select>
            <textarea rows={5} className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" placeholder="Tell us a little more..." />
            <button className="w-full rounded-xl bg-navy text-white font-medium py-3.5 hover:bg-navy-soft transition-colors inline-flex items-center justify-center gap-2">
              Send request <ArrowRight className="h-4 w-4" />
            </button>
          </motion.form>

          <div className="lg:col-span-2 space-y-4">
            <a href={`mailto:${SITE.email}`} className="block rounded-2xl bg-white border border-border p-6 hover:shadow-soft transition-all">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-gold grid place-items-center"><Mail className="h-4 w-4 text-navy" /></div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Email us</div>
                  <div className="text-navy font-medium text-sm">{SITE.email}</div>
                </div>
              </div>
            </a>
            <a href={`tel:${SITE.whatsapp}`} className="block rounded-2xl bg-white border border-border p-6 hover:shadow-soft transition-all">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-gold grid place-items-center"><Phone className="h-4 w-4 text-navy" /></div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Call us</div>
                  <div className="text-navy font-medium text-sm">{SITE.whatsapp}</div>
                </div>
              </div>
            </a>
            {SITE.addresses.map((a) => (
              <div key={a.city} className="rounded-2xl bg-white border border-border p-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-secondary grid place-items-center"><MapPin className="h-4 w-4 text-navy" /></div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gold font-semibold">{a.city} office</div>
                    <div className="text-sm text-foreground/85 mt-1 leading-relaxed">{a.line}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
