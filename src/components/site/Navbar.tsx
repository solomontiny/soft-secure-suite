import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV } from "@/lib/site";
import { Logo } from "./Logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [path]);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className={`flex items-center justify-between rounded-2xl px-4 sm:px-5 py-2.5 transition-all duration-300 ${scrolled ? "glass shadow-soft" : "bg-transparent"}`}>
          <Logo />
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => {
              const active = path === n.to;
              return (
                <Link key={n.to} to={n.to}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${active ? "text-navy" : "text-foreground/70 hover:text-navy"}`}>
                  {n.label}
                  {active && (
                    <motion.span layoutId="navdot" className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-1 w-1 rounded-full bg-gold" />
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/contact" className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-navy text-white text-sm font-medium px-4 py-2.5 hover:bg-navy-soft transition-colors shadow-soft">
              Get a quote <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <button onClick={() => setOpen((o) => !o)} className="lg:hidden h-10 w-10 grid place-items-center rounded-lg glass" aria-label="Menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="lg:hidden mt-2 rounded-2xl glass shadow-soft p-3">
              {NAV.map((n) => (
                <Link key={n.to} to={n.to}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium ${path === n.to ? "bg-navy text-white" : "text-foreground/80 hover:bg-secondary"}`}>
                  {n.label}
                </Link>
              ))}
              <Link to="/contact" className="mt-2 block text-center rounded-lg bg-gradient-gold text-navy font-semibold py-3">
                Get a quote
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
