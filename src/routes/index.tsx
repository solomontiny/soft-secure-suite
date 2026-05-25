import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck, ArrowRight, Sparkles, Clock, Award, Users,
  Car, HardHat, Building2, ShieldAlert, Sprout, HeartPulse, Scale, Banknote,
  Star, Plus, Minus, CheckCircle2,
} from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Section, SectionHeader } from "@/components/site/Section";
import { PRODUCTS, FAQ, PARTNERS, SITE } from "@/lib/site";
import hero from "@/assets/hero-skyline.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Naingate Insurance Brokers — Insurance you can rely on" },
      { name: "description", content: "Tailored insurance and risk management for corporates, government and individuals across Nigeria. Get a quote in minutes." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Car, HardHat, Building2, ShieldAlert, Sprout, HeartPulse, Scale, Banknote,
};

function Counter({ to, suffix = "", duration = 1.6 }: { to: number; suffix?: string; duration?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / (duration * 1000));
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={hero} alt="" className="h-full w-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 gradient-hero opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.78_0.12_80/0.25),transparent_60%)]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 pt-20 pb-28 sm:pt-28 sm:pb-36 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 text-white">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full glass-dark px-3.5 py-1.5 text-xs font-medium tracking-wide">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              Regulated by NAICOM & NCRIB
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight">
              Insurance and risk management
              <span className="block text-gold font-normal mt-2">trusted across Nigeria.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-lg text-white/75 max-w-xl leading-relaxed">
              Tailored cover, prompt claims and pro-active risk advice for corporates,
              government and individuals — delivered the digital way.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-gold text-navy font-semibold px-6 py-3.5 shadow-glow hover:translate-y-[-1px] transition-transform">
                Get a free quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/products" className="inline-flex items-center gap-2 rounded-full glass-dark text-white font-medium px-6 py-3.5 hover:bg-white/10 transition-colors">
                Explore products
              </Link>
            </motion.div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                { icon: Clock, label: "Avg. claim", val: "< 14d" },
                { icon: Users, label: "Clients", val: "200+" },
                { icon: Award, label: "Years", val: "10+" },
              ].map((s, i) => (
                <div key={i} className="border-l border-white/15 pl-4">
                  <s.icon className="h-4 w-4 text-gold" />
                  <div className="mt-1.5 text-xl font-semibold text-white">{s.val}</div>
                  <div className="text-xs text-white/60">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* QUOTE CARD */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5">
            <div className="glass rounded-3xl p-6 sm:p-8 shadow-glow">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                <ShieldCheck className="h-4 w-4" /> Instant quote
              </div>
              <h3 className="mt-2 text-2xl font-semibold text-navy">Request a tailored quote</h3>
              <form className="mt-5 space-y-3" onSubmit={(e) => e.preventDefault()}>
                <input className="w-full rounded-xl border border-border bg-white/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" placeholder="Full name" />
                <div className="grid grid-cols-2 gap-3">
                  <input className="rounded-xl border border-border bg-white/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" placeholder="Email" type="email" />
                  <input className="rounded-xl border border-border bg-white/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" placeholder="Phone" type="tel" />
                </div>
                <select className="w-full rounded-xl border border-border bg-white/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold">
                  <option>Select a product</option>
                  {PRODUCTS.map((p) => <option key={p.slug}>{p.name}</option>)}
                </select>
                <textarea rows={3} className="w-full rounded-xl border border-border bg-white/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" placeholder="Tell us about what you'd like to insure" />
                <button className="w-full rounded-xl bg-navy text-white font-medium py-3.5 hover:bg-navy-soft transition-colors">
                  Request quote
                </button>
                <p className="text-[11px] text-muted-foreground text-center">By submitting, you agree to be contacted by Naingate.</p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS BAND */}
      <Section className="!py-12">
        <div className="rounded-3xl bg-gradient-soft border border-border shadow-soft p-8 sm:p-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { v: 250, s: "+", l: "Corporate clients" },
            { v: 14, s: "d", l: "Avg. claim time" },
            { v: 98, s: "%", l: "Renewal rate" },
            { v: 8, s: "", l: "Product lines" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl sm:text-5xl font-display font-semibold text-navy">
                <Counter to={s.v} suffix={s.s} />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* PRODUCTS */}
      <Section>
        <SectionHeader eyebrow="What we cover" title="Insurance built around your risk"
          sub="Eight specialist product lines, one trusted broker. Every policy is tailored after a free risk audit." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p, i) => {
            const Icon = ICONS[p.icon];
            return (
              <motion.div key={p.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative rounded-3xl bg-white border border-border p-6 hover:shadow-soft hover:-translate-y-1 transition-all">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-navy to-navy-soft grid place-items-center shadow-soft group-hover:rotate-3 transition-transform">
                  <Icon className="h-5 w-5 text-gold" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-navy">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.short}</p>
                <Link to="/products" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-navy hover:text-gold transition-colors">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* CLAIMS BAND */}
      <Section>
        <div className="relative overflow-hidden rounded-3xl gradient-hero p-8 sm:p-14 text-white">
          <div className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-gold/30 blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                <span className="h-px w-6 bg-gold" /> Claims support
              </div>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold">When the unexpected happens, we move fast.</h2>
              <p className="mt-4 text-white/75 leading-relaxed max-w-lg">
                We act as your advocate with the underwriter — gathering documents, negotiating
                the settlement and tracking every step until your claim is paid.
              </p>
              <Link to="/claims" className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-gold text-navy font-semibold px-6 py-3.5 shadow-glow">
                Start a claim <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-3">
              {["Notify our claims desk within 24h", "We document and file with the underwriter", "Adjuster visit & settlement negotiation", "Funds disbursed to your account"].map((s, i) => (
                <div key={i} className="flex gap-3 items-start glass-dark rounded-2xl p-4">
                  <div className="h-7 w-7 rounded-full bg-gradient-gold text-navy text-xs font-bold grid place-items-center shrink-0">{i + 1}</div>
                  <div className="text-sm text-white/85">{s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section>
        <SectionHeader eyebrow="Trusted voices" title="What our clients say" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { n: "Adaeze O.", r: "CFO, Logistics Group", q: "Naingate restructured our fleet cover and cut our annual premium by 18% — without compromising on protection." },
            { n: "Engr. Tunde A.", r: "Project Director", q: "From CAR to PAR, the team understood our project risk in detail. Claims paid in 11 days, no friction." },
            { n: "Mrs. Adekunle", r: "Private client", q: "I always thought insurance was complicated. Naingate made it feel personal and effortless." },
          ].map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="rounded-3xl bg-white border border-border p-7 shadow-soft">
              <div className="flex gap-0.5 text-gold">{[...Array(5)].map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}</div>
              <p className="mt-4 text-foreground/85 leading-relaxed">"{t.q}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-navy to-navy-soft text-white grid place-items-center font-semibold">
                  {t.n.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-navy">{t.n}</div>
                  <div className="text-xs text-muted-foreground">{t.r}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* PARTNERS STRIP */}
      <Section className="!py-10">
        <div className="rounded-3xl border border-border bg-white p-8">
          <div className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Trusted by leading organisations
          </div>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 items-center">
            {PARTNERS.map((p) => (
              <div key={p} className="text-center text-xs sm:text-sm font-semibold text-navy/60 hover:text-navy transition-colors">
                {p}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeader eyebrow="Frequently asked" title="Questions, answered." />
        <div className="mt-10 max-w-3xl mx-auto space-y-3">
          {FAQ.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
        </div>
        <div className="mt-12 text-center">
          <Link to="/contact" className="inline-flex items-center gap-2 text-navy font-medium hover:text-gold">
            Still have questions? Talk to us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="rounded-3xl bg-white border border-border shadow-soft p-10 sm:p-16 text-center relative overflow-hidden">
          <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-navy/10 blur-3xl" />
          <h2 className="relative text-3xl sm:text-5xl font-semibold text-navy max-w-2xl mx-auto">
            Ready to insure what matters most?
          </h2>
          <p className="relative mt-4 text-muted-foreground max-w-lg mx-auto">
            Get a personalised quote within one business day. No obligation.
          </p>
          <Link to="/contact" className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-navy text-white font-semibold px-7 py-4 hover:bg-navy-soft transition-colors shadow-soft">
            Get started <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </SiteLayout>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl bg-white border border-border overflow-hidden">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between gap-4 p-5 text-left">
        <span className="font-medium text-navy">{q}</span>
        <span className="h-8 w-8 grid place-items-center rounded-full bg-secondary text-navy">
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }} className="overflow-hidden">
        <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed flex gap-2">
          <CheckCircle2 className="h-4 w-4 text-gold mt-0.5 shrink-0" />
          {a}
        </div>
      </motion.div>
    </div>
  );
}
