import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell } from "recharts";
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
  Clock,
  PieChart as PieChartIcon,
  ShieldCheck,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { KYCGuard } from "@/components/auth/KYCGuard";
import { useMarketData } from "@/hooks/useMarketData";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const chartData = Array.from({ length: 40 }, (_, i) => ({
  d: i,
  v: 120000 + Math.sin(i / 3) * 6000 + i * 420 + Math.random() * 2200,
}));

const DashboardPage = () => {
  const { t } = useTranslation();
  const { formatValue } = useCurrency();
  const [hidden, setHidden] = useState(false);
  const [timeRange, setTimeRange] = useState("1M");
  const [greeting, setGreeting] = useState("Good day");

  const { assets: marketAssets } = useMarketData();
  const { state, toggleDemo } = usePortfolio();
  const { user } = useAuth();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting(t('dashboard.greeting', "Good morning"));
    else if (hour < 18) setGreeting(t('dashboard.greeting_afternoon', "Good afternoon"));
    else setGreeting(t('dashboard.greeting_evening', "Good evening"));
  }, [t]);

  const portfolioAssets = Object.entries(state.holdings).map(([sym, qty]) => {
    const marketAsset = marketAssets.find(a => a.sym === sym);
    if (!marketAsset) return null;
    return {
      sym,
      name: marketAsset.name,
      price: marketAsset.price,
      change: marketAsset.change24h,
      up: marketAsset.change24h >= 0,
      qty,
      value: marketAsset.price * qty,
    };
  }).filter(Boolean) as any[];

  const totalHoldingsValue = portfolioAssets.reduce((sum, a) => sum + a.value, 0);
  const totalBalance = state.balanceUSD + totalHoldingsValue;

  const topMovers = [...marketAssets].sort((a, b) => b.change24h - a.change24h).slice(0, 2);

  const allocation = [
    { name: "BTC", value: 45, color: "hsl(38 100% 55%)" },
    { name: "ETH", value: 30, color: "hsl(220 100% 60%)" },
    { name: "SOL", value: 15, color: "hsl(152 80% 50%)" },
    { name: "Other", value: 10, color: "hsl(280 80% 60%)" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-display font-semibold">
            {greeting}, {user?.firstName || t("common.investor", "Investor")} <span className="inline-block animate-bounce ml-1">👋</span>
          </h2>
          <button 
            onClick={toggleDemo}
            className={`px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all border ${state.isDemo ? "bg-warning/20 text-warning border-warning/50" : "bg-primary/10 text-primary border-primary/30"}`}
          >
            {state.isDemo ? t('dashboard.demo', "Demo Account") : t('dashboard.real', "Real Account")}
          </button>
          {user?.isAdmin && (
            <Link 
              to="/admin/dashboard" 
              className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-secondary/10 text-secondary border border-secondary/30 hover:bg-secondary/20 transition-all"
            >
              {t("common.admin_portal")}
            </Link>
          )}
        </div>
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <Clock className="h-4 w-4" /> {t('dashboard.market_status', "Market opens in 4h 12m")}
        </div>
      </div>
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
                  <span className="text-sm text-muted-foreground">{t('dashboard.balance', "Total balance")}</span>
                  <button
                    onClick={() => setHidden((h) => !h)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {hidden ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
                <div className="font-display text-4xl md:text-6xl font-bold tracking-tight break-words">
                  {hidden ? (
                    "••••••••"
                  ) : (
                    <span className="flex flex-wrap items-baseline">
                      {formatValue(totalBalance)}
                    </span>
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
                {t('dashboard.live', "Live")}
              </span>
            </div>

            <div className="flex items-center justify-between mt-6 mb-2">
              <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-lg">
                {["1H", "24H", "7D", "1M", "1Y"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeRange(t)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                      timeRange === t ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-56 -mx-2 mt-2">
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
                    formatter={(v: number) => [formatValue(v), t('dashboard.balance', "Balance")]}
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3 mt-6">
              <button
                onClick={() => toast.info("Deposit flow initiated. Please select an asset to see your unique wallet address.")}
                className="flex items-center justify-center gap-2 rounded-xl bg-muted/50 hover:bg-primary/15 hover:text-primary border border-border/50 hover:border-primary/40 px-3 py-3 text-sm font-medium transition-all duration-300 active:scale-95"
              >
                <Plus className="h-4 w-4" />
                {t('dashboard.deposit', "Deposit")}
              </button>
              <KYCGuard action="withdraw funds">
                <button
                  onClick={() => toast.info("Withdrawal flow initiated.")}
                  className="flex items-center justify-center gap-2 rounded-xl bg-muted/50 hover:bg-primary/15 hover:text-primary border border-border/50 hover:border-primary/40 px-3 py-3 text-sm font-medium transition-all duration-300 active:scale-95"
                >
                  <ArrowDownToLine className="h-4 w-4" />
                  {t('dashboard.withdraw', "Withdraw")}
                </button>
              </KYCGuard>
              <KYCGuard action="trade assets">
                <button
                  onClick={() => toast.info("Trading flow initiated.")}
                  className="flex items-center justify-center gap-2 rounded-xl bg-muted/50 hover:bg-primary/15 hover:text-primary border border-border/50 hover:border-primary/40 px-3 py-3 text-sm font-medium transition-all duration-300 active:scale-95"
                >
                  <Repeat className="h-4 w-4" />
                  {t('dashboard.trade', "Trade")}
                </button>
              </KYCGuard>
            </div>
          </div>
        </div>

        {/* Side stats */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
          <div className="glass rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <PieChartIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              {t('dashboard.allocation', "Allocation")}
            </div>
            <div className="h-32 mt-2 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocation}
                    innerRadius={40}
                    outerRadius={55}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {allocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ background: "hsl(230 30% 8%)", border: "1px solid hsl(230 25% 16%)", borderRadius: "12px", fontSize: "12px" }}
                    itemStyle={{ color: "#fff" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-muted-foreground">Crypto</span>
                <span className="font-bold text-sm">90%</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {allocation.map(a => (
                <div key={a.name} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: a.color }} />
                  <span className="text-xs text-muted-foreground">{a.name}</span>
                  <span className="text-xs font-medium ml-auto">{a.value}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass rounded-3xl p-6">
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              {t('dashboard.top_movers', "Top Movers")}
            </div>
            <div className="space-y-4">
              {topMovers.map(m => (
                <div key={m.sym} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${m.change24h >= 0 ? 'bg-success/10' : 'bg-destructive/10'}`}>
                      {m.change24h >= 0 ? <TrendingUp className="h-4 w-4 text-success" /> : <TrendingDown className="h-4 w-4 text-destructive" />}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{m.sym}</div>
                      <div className="text-xs text-muted-foreground">{m.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${m.change24h >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {m.change24h >= 0 ? '+' : ''}{m.change24h.toFixed(2)}%
                    </div>
                    <div className="text-xs text-muted-foreground">{formatValue(m.price)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
            </div>
          </div>
          
          {user?.kycStatus !== 'verified' && (
            <div className="glass rounded-3xl p-6 border border-primary/20 relative overflow-hidden group hover:border-primary/40 transition-all">
              <div className="absolute top-0 right-0 p-4">
                <ShieldAlert className={`h-5 w-5 ${user?.kycStatus === 'pending' ? 'text-warning' : 'text-primary'} animate-pulse`} />
              </div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
                {t("common.kyc_title")}
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-bold mb-1">
                    {user?.kycStatus === 'pending' ? t("common.kyc_pending") : t("common.kyc_unverified")}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {user?.kycStatus === 'pending' 
                      ? t("common.kyc_pending_desc") 
                      : t("common.kyc_unverified_desc")}
                  </p>
                </div>
                {user?.kycStatus === 'unverified' && (
                  <Link 
                    to="/settings" 
                    className="flex items-center justify-between w-full p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all group/btn"
                  >
                    <span className="text-xs font-bold uppercase tracking-wider">{t("common.verify_now")}</span>
                    <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            </div>
          )}
      
      {/* Assets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 glass rounded-3xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-lg font-semibold">{t('dashboard.your_assets', "Your assets")}</h3>
            <button className="text-xs text-primary hover:text-primary-glow flex items-center gap-1">
              {t('dashboard.view_all', "View all")} <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {portfolioAssets.map((a) => (
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
                    <div className="text-xs text-muted-foreground mb-0.5">{t("common.holdings")}</div>
                    <div className="text-sm font-mono">{a.qty} {a.sym}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground mb-0.5">{t("common.price")}</div>
                    <div className="text-sm font-mono font-semibold">
                      {formatValue(a.price)}
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-xs text-muted-foreground mb-0.5">{t("common.value")}</div>
                    <div className="text-sm font-mono font-semibold">
                      {formatValue(a.value)}
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
            <h3 className="font-display text-lg font-semibold">{t('dashboard.activity', "Recent activity")}</h3>
            <button className="text-xs text-primary hover:text-primary-glow">{t('dashboard.view_all', "View all")}</button>
          </div>
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border/60 before:to-transparent">
            {state.transactions.slice(0, 5).map((tx, i) => (
              <div
                key={tx.id}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-muted/40 text-muted-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors group-hover:bg-primary/20 group-hover:text-primary group-hover:border-primary/30">
                  {tx.up ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass rounded-xl p-3 flex flex-col transition-all group-hover:-translate-y-1 group-hover:shadow-elevated">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm font-semibold text-foreground">{tx.type} {tx.asset}</div>
                    <time className="text-[10px] font-mono text-muted-foreground">{new Date(tx.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</time>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">{tx.value}</div>
                    <div className={`text-sm font-mono font-medium ${tx.up ? "text-success" : "text-destructive"}`}>
                      {tx.amount}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {state.transactions.length === 0 && (
              <div className="text-center text-sm text-muted-foreground py-8">{t("common.no_activity")}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
