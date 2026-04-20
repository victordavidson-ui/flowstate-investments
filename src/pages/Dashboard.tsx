import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Bitcoin,
  Eye,
  EyeOff,
  Plus,
  Repeat,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

const chartData = Array.from({ length: 40 }, (_, i) => ({
  d: i,
  v: 120000 + Math.sin(i / 3) * 6000 + i * 420 + Math.random() * 2200,
}));

const assets = [
  { sym: "BTC", name: "Bitcoin", price: 67432.18, change: 2.41, up: true, qty: 0.842, value: 56767.89 },
  { sym: "ETH", name: "Ethereum", price: 3521.9, change: 1.82, up: true, qty: 12.4, value: 43671.56 },
  { sym: "AAPL", name: "Apple Inc.", price: 229.87, change: 0.91, up: true, qty: 84, value: 19309.08 },
  { sym: "SOL", name: "Solana", price: 184.22, change: -0.64, up: false, qty: 210.5, value: 38778.31 },
];

const transactions = [
  { t: "Buy", asset: "BTC", amount: "+0.025", value: "$1,685.80", time: "2m ago", up: true },
  { t: "Sell", asset: "SOL", amount: "-10.0", value: "$1,842.20", time: "1h ago", up: false },
  { t: "Deposit", asset: "USD", amount: "+$5,000", value: "USDC", time: "3h ago", up: true },
  { t: "Buy", asset: "ETH", amount: "+1.50", value: "$5,282.85", time: "Yesterday", up: true },
  { t: "Withdraw", asset: "USD", amount: "-$2,000", value: "Bank", time: "2 days ago", up: false },
];

const DashboardPage = () => {
  const [hidden, setHidden] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Balance */}
        <div className="lg:col-span-2 glass rounded-3xl p-6 md:p-8 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 h-64 w-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-secondary/20 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-muted-foreground">Total balance</span>
                  <button
                    onClick={() => setHidden((h) => !h)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {hidden ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
                <div className="font-display text-4xl md:text-6xl font-bold tracking-tight">
                  {hidden ? (
                    "••••••••"
                  ) : (
                    <>$158,526<span className="text-muted-foreground">.84</span></>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="flex items-center gap-1 text-sm font-mono text-success">
                    <TrendingUp className="h-3.5 w-3.5" /> +$5,218.40
                  </span>
                  <span className="text-sm text-muted-foreground">+3.39% · 24h</span>
                </div>
              </div>
              <span className="flex items-center gap-1.5 text-xs font-mono text-success glass rounded-full px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-blink" />
                Live
              </span>
            </div>

            <div className="h-56 -mx-2 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="balG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(186 100% 55%)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="hsl(186 100% 55%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="d" hide />
                  <YAxis hide domain={["dataMin - 3000", "dataMax + 3000"]} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(230 30% 8%)",
                      border: "1px solid hsl(230 25% 16%)",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                    formatter={(v: number) => [`$${v.toFixed(2)}`, "Balance"]}
                    labelFormatter={() => ""}
                  />
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke="hsl(186 100% 55%)"
                    strokeWidth={2.5}
                    fill="url(#balG)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-2 md:gap-3 mt-6">
              {[
                { icon: Plus, label: "Deposit" },
                { icon: ArrowDownToLine, label: "Withdraw" },
                { icon: Repeat, label: "Trade" },
              ].map((a) => (
                <button
                  key={a.label}
                  className="flex items-center justify-center gap-2 rounded-xl bg-muted/50 hover:bg-primary/15 hover:text-primary border border-border/50 hover:border-primary/40 px-3 py-3 text-sm font-medium transition-all duration-300"
                >
                  <a.icon className="h-4 w-4" />
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Side stats */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
          <div className="glass rounded-3xl p-6">
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
              24h P/L
            </div>
            <div className="font-display text-2xl md:text-3xl font-bold text-success">
              +$5,218.40
            </div>
            <div className="text-xs text-muted-foreground mt-1">vs yesterday</div>
            <div className="h-12 -mx-2 mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData.slice(-20)}>
                  <defs>
                    <linearGradient id="pl1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(152 80% 50%)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="hsl(152 80% 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="hsl(152 80% 50%)" strokeWidth={2} fill="url(#pl1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="glass rounded-3xl p-6">
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
              Risk level
            </div>
            <div className="font-display text-2xl md:text-3xl font-bold">Moderate</div>
            <div className="text-xs text-muted-foreground mt-1 mb-3">
              Diversified portfolio
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-[55%] bg-gradient-to-r from-success via-warning to-destructive rounded-full" />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground mt-2">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
        </div>
      </div>

      {/* Assets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 glass rounded-3xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-lg font-semibold">Your assets</h3>
            <button className="text-xs text-primary hover:text-primary-glow flex items-center gap-1">
              View all <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {assets.map((a) => (
              <div
                key={a.sym}
                className="group glass rounded-2xl p-4 hover:shadow-elevated hover:-translate-y-0.5 transition-all cursor-pointer glow-border"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-border/50">
                    <Bitcoin className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{a.sym}</div>
                    <div className="text-xs text-muted-foreground">{a.name}</div>
                  </div>
                  <div
                    className={`flex items-center gap-1 text-xs font-mono ${
                      a.up ? "text-success" : "text-destructive"
                    }`}
                  >
                    {a.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {a.change > 0 ? "+" : ""}{a.change}%
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">Holdings</div>
                    <div className="text-sm font-mono">{a.qty} {a.sym}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground mb-0.5">Value</div>
                    <div className="text-sm font-mono font-semibold">
                      ${a.value.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions */}
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-lg font-semibold">Recent activity</h3>
            <button className="text-xs text-primary hover:text-primary-glow">View all</button>
          </div>
          <div className="space-y-1">
            {transactions.map((tx, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center ${
                      tx.up
                        ? "bg-success/10 text-success"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {tx.up ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium">
                      {tx.t} {tx.asset}
                    </div>
                    <div className="text-xs text-muted-foreground">{tx.time}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono font-medium">{tx.amount}</div>
                  <div className="text-xs text-muted-foreground">{tx.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
