import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { LogIn, Sparkles, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Naingate Insurance Brokers" },
      { name: "description", content: "Sign in to access the Naingate broker dashboard." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "admin@naingate.com", password: "" });
  const [err, setErr] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.email === "admin@naingate.com" && form.password === "naingate2026") {
      localStorage.setItem("naingate_auth", "1");
      navigate({ to: "/admin" });
    } else {
      setErr("Invalid credentials. Try the demo: admin@naingate.com / naingate2026");
    }
  };

  return (
    <SiteLayout>
      <div className="relative min-h-[calc(100vh-5rem)] grid place-items-center px-4 py-24">
        <div className="absolute inset-0 -z-10 gradient-hero opacity-90" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.78_0.12_80/0.25),transparent_60%)]" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-3xl glass shadow-soft p-8 sm:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3 py-1 text-xs font-medium text-navy">
            <Sparkles className="h-3.5 w-3.5 text-gold" /> Broker portal
          </div>
          <h1 className="mt-4 text-3xl font-semibold text-navy">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to manage quotes, claims and clients.</p>

          <form onSubmit={onSubmit} className="mt-7 space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-navy/70 uppercase tracking-wide">Email</label>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-navy/70 uppercase tracking-wide">Password</label>
              <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="rounded-xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
            </div>
            {err && <div className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{err}</div>}
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-navy text-white font-semibold px-6 py-3.5 hover:bg-navy-soft transition shadow-soft">
              <LogIn className="h-4 w-4" /> Sign in
            </button>
          </form>

          <div className="mt-6 text-xs text-muted-foreground border-t border-border pt-4">
            Demo: <span className="font-mono text-navy">admin@naingate.com</span> /{" "}
            <span className="font-mono text-navy">naingate2026</span>
          </div>
          <Link to="/" className="mt-4 inline-flex items-center gap-1 text-sm text-navy/70 hover:text-navy">
            <ArrowRight className="h-3.5 w-3.5 rotate-180" /> Back to site
          </Link>
        </motion.div>
      </div>
    </SiteLayout>
  );
}
