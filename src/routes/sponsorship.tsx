import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, Music, Calendar, Target, Wallet, Phone, ArrowRight, CheckCircle2, Heart } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Section } from "@/components/site/Section";
import { SPONSORSHIP } from "@/lib/site";

export const Route = createFileRoute("/sponsorship")({
  head: () => ({
    meta: [
      { title: "Sponsorship & CSR — Naingate Insurance" },
      { name: "description", content: "Naingate Insurance proudly supports community-driven projects. Current cause: The Living Sacrifice Choir Live Recording, RCCG General Assembly, July 2026." },
    ],
    links: [{ rel: "canonical", href: "/sponsorship" }],
  }),
  component: SponsorshipPage,
});

function SponsorshipPage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 gradient-hero" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,oklch(0.78_0.12_80/0.3),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:pt-24 sm:pb-28 text-white">
          <div className="inline-flex items-center gap-2 rounded-full glass-dark px-3.5 py-1.5 text-xs font-medium tracking-wide">
            <Heart className="h-3.5 w-3.5 text-gold" /> Community Impact
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight max-w-3xl">
            Insurance is about people — so is our giving.
          </h1>
          <p className="mt-5 text-white/75 text-base sm:text-lg max-w-2xl leading-relaxed">
            Beyond risk cover, Naingate Insurance Brokers supports faith-based,
            educational and community projects that uplift Nigerian lives.
          </p>
        </div>
      </div>

      {/* FEATURED SPONSORSHIP */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-white border border-border shadow-soft overflow-hidden"
        >
          <div className="grid lg:grid-cols-5 gap-0">
            <div className="lg:col-span-2 bg-gradient-to-br from-navy to-navy-soft text-white p-8 sm:p-10">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                <Sparkles className="h-3.5 w-3.5" /> Currently Sponsoring
              </div>
              <h2 className="mt-4 text-2xl sm:text-3xl font-semibold leading-tight">
                {SPONSORSHIP.title}
              </h2>
              <p className="mt-3 text-white/75 text-sm leading-relaxed">
                In support of <span className="text-gold font-medium">{SPONSORSHIP.beneficiary}</span>.
              </p>

              <div className="mt-8 space-y-4 text-sm">
                <div className="flex gap-3">
                  <Calendar className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white/55 text-xs uppercase tracking-wider">Event date</div>
                    <div className="text-white">{SPONSORSHIP.date}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Wallet className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white/55 text-xs uppercase tracking-wider">Project budget</div>
                    <div className="text-white">{SPONSORSHIP.budget}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Music className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white/55 text-xs uppercase tracking-wider">Project type</div>
                    <div className="text-white">Live Worship Recording</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 p-8 sm:p-10">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                <Target className="h-3.5 w-3.5" /> The vision
              </div>
              <p className="mt-3 text-foreground/85 leading-relaxed">
                {SPONSORSHIP.vision}
              </p>

              <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-navy">
                What sponsorship covers
              </h3>
              <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                {SPONSORSHIP.coverage.map((c) => (
                  <li key={c} className="flex gap-2.5 items-start rounded-xl bg-secondary p-3.5">
                    <CheckCircle2 className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground/85">{c}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border p-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Project contacts</div>
                  {SPONSORSHIP.contacts.map((c) => (
                    <div key={c.name} className="mt-2 text-sm">
                      <div className="font-medium text-navy">{c.name}</div>
                      {c.role && <div className="text-xs text-muted-foreground">{c.role}</div>}
                      {c.phone && (
                        <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="mt-0.5 inline-flex items-center gap-1.5 text-xs text-foreground/70 hover:text-gold">
                          <Phone className="h-3 w-3" /> {c.phone}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-border p-4 bg-gradient-soft">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Support account</div>
                  <div className="mt-2 text-sm space-y-1">
                    <div><span className="text-muted-foreground">Name:</span> <span className="text-navy font-medium">{SPONSORSHIP.account.name}</span></div>
                    <div><span className="text-muted-foreground">Bank:</span> <span className="text-navy font-medium">{SPONSORSHIP.account.bank}</span></div>
                    <div><span className="text-muted-foreground">Account:</span> <span className="text-navy font-mono font-semibold">{SPONSORSHIP.account.number}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 text-xs text-muted-foreground text-center">
          Endorsed {SPONSORSHIP.letterDate} · {SPONSORSHIP.signatories.map((s) => s.name).join(" & ")} · {SPONSORSHIP.zone}
        </div>
      </Section>

      {/* CTA */}
      <Section className="!pt-0">
        <div className="rounded-3xl gradient-hero p-8 sm:p-14 text-white text-center relative overflow-hidden">
          <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-gold/30 blur-3xl" />
          <h2 className="relative text-2xl sm:text-4xl font-semibold max-w-2xl mx-auto">
            Want Naingate to support your community project?
          </h2>
          <p className="relative mt-4 text-white/75 max-w-lg mx-auto text-sm sm:text-base">
            We partner with faith communities, schools, and grassroots initiatives across Nigeria. Send us your proposal.
          </p>
          <Link to="/contact" className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-gold text-navy font-semibold px-7 py-4 shadow-glow">
            Submit a proposal <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </SiteLayout>
  );
}
