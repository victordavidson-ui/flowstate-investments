import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowDownToLine, ArrowUpRight, Bitcoin, Plus, Repeat, TrendingUp } from "lucide-react";

const chartData = Array.from({ length: 30 }, (_, i) => ({
  d: i,
  v: 60000 + Math.sin(i / 3) * 4000 + i * 280 + Math.random() * 1500,
}));

const assets = [
  { sym: "BTC", name: "Bitcoin", price: "67,432.18", change: "+2.41%", up: true, qty: "0.842" },
  { sym: "ETH", name: "Ethereum", price: "3,521.90", change: "+1.82%", up: true, qty: "12.40" },
  { sym: "AAPL", name: "Apple Inc.", price: "229.87", change: "+0.91%", up: true, qty: "84" },
  { sym: "SOL", name: "Solana", price: "184.22", change: "-0.64%", up: false, qty: "210.5" },
];

export const DashboardPreview = () => {
  return (
    <section id="trade" className="py-24 md:py-32 relative overflow-hidden">
      <div className="glow-orb h-[500px] w-[500px] bg-primary/15 top-1/2 -right-20" />

      <div className="container relative">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-6">
            <span className="text-xs font-mono uppercase tracking-wider text-secondary">
              Dashboard
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Your wealth,
            <br />
            <span className="text-gradient-primary">at a glance.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A workspace that turns complex markets into clear decisions.
          </p>
        </div>

        {/* Mock dashboard */}
        <div className="relative max-w-6xl mx-auto">
          <div className="absolute -inset-6 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2rem] blur-3xl opacity-50" />
          <div className="relative glass-strong rounded-3xl p-4 md:p-6 shadow-elevated">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Balance card */}
              <div className="lg:col-span-2 glass rounded-2xl p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-glow opacity-50" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Total balance</span>
                    <span className="flex items-center gap-1.5 text-xs font-mono text-success">
                      <span className="h-1.5 w-1.5 rounded-full bg-success animate-blink" />
                      Live
                    </span>
                  </div>
                  <div className="font-display text-4xl md:text-5xl font-bold mb-1 tracking-tight">
                    $128,492<span className="text-muted-foreground">.50</span>
                  </div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="flex items-center gap-1 text-sm font-mono text-success">
                      <TrendingUp className="h-3.5 w-3.5" /> +$4,218.40
                    </span>
                    <span className="text-sm text-muted-foreground">+3.39% today</span>
                  </div>

                  <div className="h-44 -mx-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="hsl(186 100% 55%)" stopOpacity={0.5} />
                            <stop offset="100%" stopColor="hsl(186 100% 55%)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="d" hide />
                        <YAxis hide domain={["dataMin - 2000", "dataMax + 2000"]} />
                        <Tooltip
                          contentStyle={{
                            background: "hsl(230 30% 8%)",
                            border: "1px solid hsl(230 25% 16%)",
                            borderRadius: "12px",
                            fontSize: "12px",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="v"
                          stroke="hsl(186 100% 55%)"
                          strokeWidth={2.5}
                          fill="url(#grad)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-6">
                    {[
                      { icon: Plus, label: "Deposit" },
                      { icon: ArrowDownToLine, label: "Withdraw" },
                      { icon: Repeat, label: "Trade" },
                    ].map((a) => (
                      <button
                        key={a.label}
                        className="flex items-center justify-center gap-2 rounded-xl bg-muted/50 hover:bg-primary/15 hover:text-primary border border-border/50 hover:border-primary/40 px-3 py-2.5 text-sm font-medium transition-all duration-300"
                      >
                        <a.icon className="h-4 w-4" />
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Assets list */}
              <div className="glass rounded-2xl p-5">
                <div className="flex items-center justify-between mb-5">
                  <h4 className="font-display font-semibold">Your assets</h4>
                  <button className="text-xs text-primary hover:text-primary-glow flex items-center gap-1">
                    View all <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
                <div className="space-y-1">
                  {assets.map((a) => (
                    <div
                      key={a.sym}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/40 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-border/50">
                          <Bitcoin className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold">{a.sym}</div>
                          <div className="text-xs text-muted-foreground font-mono">
                            {a.qty}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-mono font-medium">${a.price}</div>
                        <div
                          className={`text-xs font-mono ${
                            a.up ? "text-success" : "text-destructive"
                          }`}
                        >
                          {a.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
