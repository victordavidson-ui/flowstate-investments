import { useState, useMemo, useEffect } from "react";
import {
  Search,
  Star,
  Bitcoin,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { useMarketData } from "@/hooks/useMarketData";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

type SortKey = "sym" | "price" | "change24h" | "volume";

const Sparkline = ({ data, up }: { data: number[]; up: boolean }) => {
  const { t } = useTranslation();
  const chartData = data.map((v, i) => ({ i, v }));
  const color = up ? "hsl(152 80% 50%)" : "hsl(0 85% 60%)";
  return (
    <div className="h-10 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id={`sp-${up}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.4} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={1.8}
            fill={`url(#sp-${up})`}
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-in-out"
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className={`text-[9px] font-mono text-center mt-1 ${up ? "text-success/70" : "text-destructive/70"}`}>
        {up ? "+" : "-"}{Math.abs(data[data.length - 1] - data[0]).toFixed(1)}% {t("common.this_wk")}
      </div>
    </div>
  );
};

const MarketsPage = () => {
  const { t } = useTranslation();
  const { formatValue } = useCurrency();
  const [tab, setTab] = useState<"all" | "crypto" | "stock" | "watch">("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({
    key: "change24h",
    dir: "desc",
  });
  const [watch, setWatch] = useState<Set<string>>(new Set(["BTC", "NVDA"]));
  const [loading, setLoading] = useState(false);
  const { assets } = useMarketData();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [tab, sort, q]);

  const toggleWatch = (sym: string) => {
    setWatch((s) => {
      const n = new Set(s);
      n.has(sym) ? n.delete(sym) : n.add(sym);
      return n;
    });
  };

  const rows = useMemo(() => {
    let r = assets;
    if (tab === "crypto") r = r.filter((x) => x.type === "crypto");
    if (tab === "stock") r = r.filter((x) => x.type === "stock");
    if (tab === "watch") r = r.filter((x) => watch.has(x.sym));
    if (q) {
      const s = q.toLowerCase();
      r = r.filter((x) => x.sym.toLowerCase().includes(s) || x.name.toLowerCase().includes(s));
    }
    r = [...r].sort((a, b) => {
      const va = a[sort.key] as number | string;
      const vb = b[sort.key] as number | string;
      if (typeof va === "number" && typeof vb === "number") {
        return sort.dir === "asc" ? va - vb : vb - va;
      }
      return sort.dir === "asc"
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va));
    });
    return r;
  }, [tab, q, sort, watch, assets]);

  const toggleSort = (key: SortKey) => {
    setSort((s) => ({
      key,
      dir: s.key === key && s.dir === "desc" ? "asc" : "desc",
    }));
  };

  const SortHead = ({ label, k, align = "left" }: { label: string; k: SortKey; align?: "left" | "right" }) => (
    <button
      onClick={() => toggleSort(k)}
      className={`flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors ${
        align === "right" ? "ml-auto" : ""
      }`}
    >
      {label}
      <ArrowUpDown className={`h-3 w-3 ${sort.key === k ? "text-primary" : ""}`} />
    </button>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-1 glass rounded-xl p-1">
          {([
            { k: "all", l: t("common.all") },
            { k: "crypto", l: t("common.crypto") },
            { k: "stock", l: t("common.stocks") },
            { k: "watch", l: t("common.watchlist") },
          ] as const).map((tabItem) => (
            <button
              key={tabItem.k}
              onClick={() => setTab(tabItem.k)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                tab === tabItem.k
                  ? "bg-primary/15 text-primary shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.3)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tabItem.l}
            </button>
          ))}
        </div>
        <div className="relative md:ml-auto md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('common.search', "Search assets…")}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="pl-9 bg-muted/40 border-border/60"
          />
        </div>
      </div>

      <div className="glass rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="hidden md:grid grid-cols-[40px_1.4fr_1fr_0.8fr_1fr_1fr_100px] items-center gap-4 px-6 py-4 border-b border-border/40">
          <div />
          <SortHead label={t('common.asset')} k="sym" />
          <SortHead label={t('common.price')} k="price" />
          <SortHead label="24h" k="change24h" />
          <SortHead label={t('common.volume')} k="volume" />
          <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            {t('common.chart_24h')}
          </div>
          <div className="text-right text-xs font-mono uppercase tracking-wider text-muted-foreground">
            {t('dashboard.trade')}
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-border/40 min-h-[400px]">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-[40px_1fr_auto] md:grid-cols-[40px_1.4fr_1fr_0.8fr_1fr_1fr_100px] items-center gap-4 px-4 md:px-6 py-4 animate-pulse-fast"
              >
                <div className="h-8 w-8 rounded-lg bg-muted/40" />
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-muted/40" />
                  <div className="space-y-2">
                    <div className="h-4 w-12 bg-muted/40 rounded" />
                    <div className="h-3 w-20 bg-muted/20 rounded" />
                  </div>
                </div>
                <div className="hidden md:block h-4 w-16 bg-muted/40 rounded" />
                <div className="hidden md:block h-4 w-12 bg-muted/40 rounded" />
                <div className="hidden md:block h-4 w-16 bg-muted/40 rounded" />
                <div className="hidden md:block h-8 w-24 bg-muted/40 rounded" />
                <div className="hidden md:flex justify-end">
                  <div className="h-8 w-16 bg-muted/40 rounded-lg" />
                </div>
              </div>
            ))
          ) : rows.length === 0 ? (
            <div className="p-16 text-center">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl glass mb-4">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">{t("common.no_results")}</p>
            </div>
          ) : (
            rows.map((r) => {
              const up = r.change24h >= 0;
            const starred = watch.has(r.sym);
            return (
              <div
                key={r.sym}
                className="grid grid-cols-[40px_1fr_auto] md:grid-cols-[40px_1.4fr_1fr_0.8fr_1fr_1fr_100px] items-center gap-4 px-4 md:px-6 py-4 hover:bg-muted/30 transition-colors"
              >
                <button
                  onClick={() => toggleWatch(r.sym)}
                  className={`h-8 w-8 flex items-center justify-center rounded-lg transition-all ${
                    starred
                      ? "text-warning drop-shadow-[0_0_6px_hsl(var(--warning))]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Star className={`h-4 w-4 ${starred ? "fill-current" : ""}`} />
                </button>

                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-border/50 shrink-0">
                    <Bitcoin className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold truncate">{r.sym}</div>
                    <div className="text-xs text-muted-foreground truncate">{r.name}</div>
                  </div>
                </div>

                <div className="hidden md:block text-sm font-mono font-medium">
                  {formatValue(r.price)}
                </div>

                <div
                  className={`hidden md:flex items-center gap-1 text-sm font-mono ${
                    up ? "text-success" : "text-destructive"
                  }`}
                >
                  {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                  {up ? "+" : ""}
                  {r.change24h.toFixed(2)}%
                </div>

                <div className="hidden md:block text-sm font-mono text-muted-foreground">
                  {r.volume}
                </div>

                <div className="hidden md:block">
                  <Sparkline data={r.spark} up={up} />
                </div>

                {/* Mobile price */}
                <div className="md:hidden text-right">
                  <div className="text-sm font-mono font-medium">
                    {formatValue(r.price)}
                  </div>
                  <div
                    className={`text-xs font-mono ${
                      up ? "text-success" : "text-destructive"
                    }`}
                  >
                    {up ? "+" : ""}{r.change24h.toFixed(2)}%
                  </div>
                </div>

                <div className="hidden md:flex justify-end">
                  <button 
                    onClick={() => toast.info(`${t("dashboard.trade")} flow initiated for ${r.sym}.`)}
                    className="rounded-lg bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 hover:border-primary hover:shadow-glow px-4 py-1.5 text-xs font-semibold transition-all active:scale-95"
                  >
                    {t("dashboard.trade")}
                  </button>
                </div>
              </div>
            );
          }))}
        </div>
      </div>
    </div>
  );
};

export default MarketsPage;
