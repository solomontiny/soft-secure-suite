import logo from "@/assets/naingate-logo.jpg";
import { Link } from "@tanstack/react-router";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className="relative flex items-center">
        <span className="absolute -left-1 top-1 bottom-1 w-1 rounded-full bg-gold" />
        <div className="ml-2 h-11 w-11 overflow-hidden rounded-md bg-white shadow-soft ring-1 ring-navy/10">
          <img
            src={logo}
            alt="Naingate Insurance Brokers"
            className="h-full w-full object-contain p-0.5"
            style={{ imageRendering: "auto" }}
          />
        </div>
      </div>
      <div className="leading-tight">
        <div className={`font-display text-[17px] font-bold tracking-tight ${light ? "text-white" : "text-navy"}`}>
          Naingate
        </div>
        <div className={`text-[10px] uppercase tracking-[0.22em] font-semibold ${light ? "text-gold" : "text-gold"}`}>
          Insurance Brokers
        </div>
      </div>
    </Link>
  );
}
