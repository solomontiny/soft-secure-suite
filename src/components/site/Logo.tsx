import logo from "@/assets/naingate-logo.jpg";
import { Link } from "@tanstack/react-router";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div className="h-10 w-10 rounded-xl overflow-hidden ring-1 ring-black/5 shadow-soft bg-white">
        <img src={logo} alt="Naingate Insurance Brokers" className="h-full w-full object-cover" />
      </div>
      <div className="leading-tight">
        <div className={`font-display text-base font-semibold tracking-tight ${light ? "text-white" : "text-navy"}`}>
          Naingate
        </div>
        <div className={`text-[10px] uppercase tracking-[0.18em] ${light ? "text-white/70" : "text-muted-foreground"}`}>
          Insurance Brokers
        </div>
      </div>
    </Link>
  );
}
