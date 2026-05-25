import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
import { Logo } from "./Logo";
import { NAV, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 bg-navy text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="[&_*]:!text-white"><Logo light /></div>
          <p className="mt-4 text-sm text-white/60 leading-relaxed">
            Africa's pro-active, digital-led insurance broker. Regulated by NAICOM & NCRIB.
          </p>
          <div className="flex gap-2 mt-5">
            {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 grid place-items-center rounded-lg bg-white/5 hover:bg-gold hover:text-navy transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="text-white text-sm font-semibold mb-4">Navigate</div>
          <ul className="space-y-2.5 text-sm">
            {NAV.map((n) => (
              <li key={n.to}><Link to={n.to} className="hover:text-gold transition-colors">{n.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-white text-sm font-semibold mb-4">Offices</div>
          <ul className="space-y-3 text-sm text-white/70">
            {SITE.addresses.map((a) => (
              <li key={a.city} className="flex gap-2">
                <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <span><span className="text-white">{a.city}</span> — {a.line}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-white text-sm font-semibold mb-4">Contact</div>
          <a href={`mailto:${SITE.email}`} className="flex items-start gap-2 text-sm hover:text-gold">
            <Mail className="h-4 w-4 text-gold mt-0.5" /> {SITE.email}
          </a>
          <Link to="/contact" className="mt-5 inline-flex rounded-full bg-gradient-gold text-navy font-semibold text-sm px-4 py-2.5">
            Request a quote
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-2">
          <div>© {new Date().getFullYear()} Naingate Insurance Brokers Limited. All rights reserved.</div>
          <div>Registered with NAICOM & NCRIB.</div>
        </div>
      </div>
    </footer>
  );
}
