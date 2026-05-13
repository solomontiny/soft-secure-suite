import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, FileCheck2, Package, Bell, Search, TrendingUp, TrendingDown,
  ArrowUpRight, MoreHorizontal, Plus, CheckCircle2, Clock, AlertCircle,
} from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { PRODUCTS } from "@/lib/site";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Naingate" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const NAV = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard },
  { to: "/admin", label: "Customers", icon: Users },
  { to: "/admin", label: "Claims", icon: FileCheck2 },
  { to: "/admin", label: "Products", icon: Package },
  { to: "/admin", label: "Notifications", icon: Bell },
];

const REQUESTS = [
  { id: "RQ-2841", name: "Adaeze Okeke", product: "Motor Insurance", status: "New", amount: "₦1.2M", date: "Today" },
  { id: "RQ-2840", name: "Tunde Adekunle", product: "Property Insurance", status: "Quoted", amount: "₦4.8M", date: "Today" },
  { id: "RQ-2839", name: "Zenith Logistics", product: "Engineering (PAR)", status: "In review", amount: "₦26M", date: "Yesterday" },
  { id: "RQ-2838", name: "Mrs. Bola Ade", product: "Life & Personal", status: "Closed", amount: "₦650K", date: "2 days ago" },
  { id: "RQ-2837", name: "Iron Resources", product: "Liability", status: "Quoted", amount: "₦3.1M", date: "3 days ago" },
];

const CLAIMS = [
  { id: "CL-1187", client: "Keystone Bank", type: "Property", stage: "Settled", pct: 100 },
  { id: "CL-1186", client: "Lagos State Govt", type: "Motor", stage: "Adjuster visit", pct: 60 },
  { id: "CL-1185", client: "Dangote Group", type: "Engineering", stage: "Documenting", pct: 35 },
  { id: "CL-1184", client: "Mrs. Adekunle", type: "Travel", stage: "Notified", pct: 15 },
];

const NOTIFICATIONS = [
  { icon: CheckCircle2, color: "text-emerald-500", title: "Claim CL-1187 settled", time: "12 min ago" },
  { icon: AlertCircle, color: "text-amber-500", title: "3 quotes pending broker review", time: "1 hr ago" },
  { icon: Clock, color: "text-blue-500", title: "Policy POL-9982 renewal in 7 days", time: "3 hr ago" },
];

const STATUS_STYLES: Record<string, string> = {
  "New": "bg-blue-50 text-blue-700",
  "Quoted": "bg-amber-50 text-amber-700",
  "In review": "bg-violet-50 text-violet-700",
  "Closed": "bg-emerald-50 text-emerald-700",
};

function AdminPage() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen bg-secondary/40 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-navy text-white p-5 sticky top-0 h-screen">
        <div className="[&_*]:!text-white"><Logo light /></div>
        <nav className="mt-10 space-y-1">
          {NAV.map((n, i) => (
            <button key={i} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-colors ${i === 0 ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/5"}`}>
              <n.icon className="h-4 w-4" /> {n.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl glass-dark p-4">
          <div className="text-xs text-white/60">Logged in as</div>
          <div className="text-sm font-medium text-white mt-0.5">Admin · Naingate</div>
          <Link to="/" className="mt-3 block text-xs text-gold hover:underline">← Back to website</Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-border px-5 sm:px-8 py-4 flex items-center gap-4">
          <div className="lg:hidden"><Logo /></div>
          <div className="flex-1 max-w-md relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input className="w-full rounded-xl bg-secondary px-9 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold" placeholder="Search customers, claims, policies..." />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="relative h-10 w-10 rounded-xl bg-secondary grid place-items-center">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-gold" />
            </button>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-navy to-navy-soft text-white grid place-items-center text-sm font-semibold">AN</div>
          </div>
        </header>

        <main className="p-5 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Dashboard</div>
              <h1 className="mt-1 text-3xl font-semibold text-navy">Good morning, Admin</h1>
              <p className="text-sm text-muted-foreground">Here's what's happening across your portfolio today.</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl bg-navy text-white text-sm font-medium px-4 py-2.5 hover:bg-navy-soft">
              <Plus className="h-4 w-4" /> New policy
            </button>
          </div>

          {/* Analytics cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Active policies", val: "1,284", delta: "+8.2%", up: true },
              { label: "Open claims", val: "37", delta: "-12%", up: false },
              { label: "Premiums (MTD)", val: "₦248M", delta: "+15.4%", up: true },
              { label: "New leads", val: "94", delta: "+3.1%", up: true },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="rounded-2xl bg-white border border-border p-6">
                <div className="flex items-start justify-between">
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                  <span className={`inline-flex items-center gap-0.5 text-xs font-semibold rounded-full px-2 py-0.5 ${s.up ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                    {s.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {s.delta}
                  </span>
                </div>
                <div className="mt-3 text-3xl font-display font-semibold text-navy">{s.val}</div>
                <div className="mt-4 h-10 flex items-end gap-1">
                  {Array.from({ length: 14 }).map((_, k) => (
                    <div key={k} className="flex-1 rounded-sm bg-gradient-to-t from-navy/20 to-gold/40" style={{ height: `${20 + Math.sin(k + i) * 30 + Math.random() * 30}%` }} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Customer requests */}
            <div className="lg:col-span-2 rounded-2xl bg-white border border-border overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-border">
                <div>
                  <div className="font-semibold text-navy">Customer requests</div>
                  <div className="text-xs text-muted-foreground">Latest quote requests across all channels</div>
                </div>
                <button className="text-xs text-navy font-medium hover:text-gold inline-flex items-center gap-1">
                  View all <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/50 text-muted-foreground text-xs uppercase tracking-wider">
                    <tr>
                      <th className="text-left font-medium px-5 py-3">ID</th>
                      <th className="text-left font-medium px-5 py-3">Customer</th>
                      <th className="text-left font-medium px-5 py-3">Product</th>
                      <th className="text-left font-medium px-5 py-3">Amount</th>
                      <th className="text-left font-medium px-5 py-3">Status</th>
                      <th className="text-left font-medium px-5 py-3">Date</th>
                      <th className="px-5 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {REQUESTS.map((r) => (
                      <tr key={r.id} className="border-t border-border hover:bg-secondary/30 transition-colors">
                        <td className="px-5 py-3.5 font-mono text-xs text-muted-foreground">{r.id}</td>
                        <td className="px-5 py-3.5 font-medium text-navy">{r.name}</td>
                        <td className="px-5 py-3.5 text-foreground/80">{r.product}</td>
                        <td className="px-5 py-3.5 font-semibold">{r.amount}</td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[r.status]}`}>{r.status}</span>
                        </td>
                        <td className="px-5 py-3.5 text-muted-foreground text-xs">{r.date}</td>
                        <td className="px-5 py-3.5 text-right">
                          <button className="h-8 w-8 grid place-items-center rounded-lg hover:bg-secondary"><MoreHorizontal className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Notifications */}
            <div className="rounded-2xl bg-white border border-border p-5">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-navy">Notifications</div>
                <span className="text-xs text-muted-foreground">3 new</span>
              </div>
              <div className="mt-4 space-y-3">
                {NOTIFICATIONS.map((n, i) => (
                  <div key={i} className="flex gap-3 rounded-xl p-3 hover:bg-secondary/40 transition-colors">
                    <n.icon className={`h-5 w-5 ${n.color} shrink-0 mt-0.5`} />
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-navy">{n.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-3 w-full text-xs font-medium text-navy hover:text-gold py-2">View all notifications</button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Claims tracking */}
            <div className="rounded-2xl bg-white border border-border p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-navy">Claims tracking</div>
                  <div className="text-xs text-muted-foreground">Live status of active claims</div>
                </div>
                <button className="text-xs text-navy font-medium hover:text-gold inline-flex items-center gap-1">All claims <ArrowUpRight className="h-3 w-3" /></button>
              </div>
              <div className="mt-4 space-y-4">
                {CLAIMS.map((c) => (
                  <div key={c.id}>
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <div className="font-medium text-navy">{c.client}</div>
                        <div className="text-xs text-muted-foreground">{c.id} · {c.type} · {c.stage}</div>
                      </div>
                      <div className="text-xs font-semibold text-navy">{c.pct}%</div>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-gold" style={{ width: `${c.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product management */}
            <div className="rounded-2xl bg-white border border-border p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-navy">Product management</div>
                  <div className="text-xs text-muted-foreground">Active product lines and policy counts</div>
                </div>
                <button className="text-xs inline-flex items-center gap-1 rounded-lg bg-secondary px-2.5 py-1.5 hover:bg-secondary/70">
                  <Plus className="h-3 w-3" /> Add
                </button>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {PRODUCTS.slice(0, 6).map((p) => (
                  <div key={p.slug} className="rounded-xl border border-border p-4 hover:border-gold transition-colors">
                    <div className="text-sm font-medium text-navy">{p.name}</div>
                    <div className="mt-2 flex items-end justify-between">
                      <div className="text-2xl font-display font-semibold text-navy">{Math.floor(40 + Math.random() * 200)}</div>
                      <div className="text-xs text-emerald-600 font-medium">active</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
