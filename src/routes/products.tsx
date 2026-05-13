import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Car, HardHat, Building2, ShieldAlert, Sprout, HeartPulse, Scale, Banknote, ArrowRight, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Section, SectionHeader } from "@/components/site/Section";
import { PRODUCTS } from "@/lib/site";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Insurance Products — Naingate" },
      { name: "description", content: "Eight specialist insurance product lines: motor, engineering, property, special risk, agric, life, liability and pecuniary." },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
});

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Car, HardHat, Building2, ShieldAlert, Sprout, HeartPulse, Scale, Banknote,
};

function ProductsPage() {
  return (
    <SiteLayout>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 gradient-hero" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,oklch(0.78_0.12_80/0.25),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:pt-24 sm:pb-32 text-white">
          <div className="inline-flex items-center gap-2 rounded-full glass-dark px-3.5 py-1.5 text-xs font-medium tracking-wide">
            <Sparkles className="h-3.5 w-3.5 text-gold" /> Insurance Products
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight max-w-3xl">
            Cover for every kind of risk.
          </h1>
          <p className="mt-5 text-white/75 text-lg max-w-2xl leading-relaxed">
            Each product is structured around your operations — selected from underwriters
            we've vetted for strength, speed and service.
          </p>
        </div>
      </div>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {PRODUCTS.map((p, i) => {
            const Icon = ICONS[p.icon];
            return (
              <motion.div key={p.slug}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }} transition={{ delay: (i % 2) * 0.1 }}
                className="group relative rounded-3xl bg-white border border-border p-7 sm:p-8 hover:shadow-soft hover:-translate-y-1 transition-all overflow-hidden">
                <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gold/10 blur-2xl group-hover:bg-gold/20 transition-colors" />
                <div className="relative flex items-start gap-5">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-navy to-navy-soft grid place-items-center shadow-soft shrink-0">
                    <Icon className="h-6 w-6 text-gold" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-navy">{p.name}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{p.full}</p>
                    <Link to="/contact" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-gold transition-colors">
                      Request this cover <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl gradient-hero p-10 sm:p-14 text-white text-center relative overflow-hidden">
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gold/30 blur-3xl" />
          <h2 className="relative text-3xl sm:text-4xl font-semibold max-w-2xl mx-auto">
            Not sure which product fits? Let our team build a programme for you.
          </h2>
          <Link to="/contact" className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-gold text-navy font-semibold px-7 py-4 shadow-glow">
            Talk to a broker <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </SiteLayout>
  );
}
