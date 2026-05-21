import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { LogIn, Loader2 } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Naingate Insurance Brokers" },
      { name: "description", content: "Sign in to access the Naingate admin dashboard." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back");
        navigate({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created. You can sign in now.");
        setMode("signin");
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <SiteLayout>
      <section className="min-h-[80vh] grid place-items-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="rounded-3xl border border-border bg-white p-8 shadow-soft">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-11 w-11 rounded-2xl bg-gradient-gold grid place-items-center text-navy">
                <LogIn className="h-5 w-5" />
              </div>
              <div>
                <h1 className="font-display text-2xl text-navy leading-tight">
                  {mode === "signin" ? "Welcome back" : "Create account"}
                </h1>
                <p className="text-xs text-muted-foreground">
                  Naingate admin & broker portal
                </p>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-navy">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:bg-white"
                  placeholder="you@naingate.com"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-navy">Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:bg-white"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                disabled={busy}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-navy text-white py-3 font-medium hover:bg-navy-soft transition-colors disabled:opacity-60"
              >
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                {mode === "signin" ? "Sign in" : "Create account"}
              </button>
            </form>

            <p className="text-center text-xs text-muted-foreground mt-5">
              {mode === "signin" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button onClick={() => setMode("signup")} className="text-navy font-medium hover:text-gold">
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button onClick={() => setMode("signin")} className="text-navy font-medium hover:text-gold">
                    Sign in
                  </button>
                </>
              )}
            </p>

            <p className="text-center text-[11px] text-muted-foreground mt-3">
              Admin access is restricted to whitelisted emails.
            </p>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-4">
            <Link to="/" className="hover:text-navy">← Back to website</Link>
          </p>
        </motion.div>
      </section>
    </SiteLayout>
  );
}
