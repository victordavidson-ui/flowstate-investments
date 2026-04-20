import { useMemo, useState } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { ArrowUpDown, Bitcoin, Search, Star, TrendingDown, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";

type Asset = {
  sym: string;
  name: string;
  type: "crypto" | "stock";
  price: number;
  change24h: number;
  volume: string;
  marketCap: string;
  spark: number[];
};

const genSpark = (trend: number) =>
  Array.from({ length: 24 }, (_, i) => 50 + Math.sin(i / 3) * 8 + i * trend + Math.random() * 4);

const seed: Asset[] = [
  { sym: "BTC", name: "Bitcoin", type: "crypto", price: 67432.18, change24h: 2.41, volume: "$28.4B", marketCap: "$1.32T", spark: genSpark(0.8) },
  { sym: "ETH", name: "Ethereum", type: "crypto", price: 3521.9, change24h: 1.82, volume: "$14.2B", marketCap: "$423B", spark: genSpark(0.5) },
  { sym: "SOL", name: "Solana", type: "crypto", price: 184.22, change24h: -0.64, volume: "$3.1B", marketCap: "$86B", spark: genSpark(-0.3) },
  { sym: "AVAX", name: "Avalanche", type: "crypto", price: 38.71, change24h: 4.02, volume: "$890M", marketCap: "$15B", spark: genSpark(1.1) },
  { sym: "DOGE", name: "Dogecoin", type: "crypto", price: 0.1421, change24h: -2.1, volume: "$680M", marketCap: "$20B", spark: genSpark(-0.6) },
  { sym: "LINK", name: "Chainlink", type: "crypto", price: 17.84, change24h: 1.15, volume: "$420M", marketCap: "$10.5B", spark: genSpark(0.4) },
  { sym: "AAPL", name: "Apple Inc.", type: "stock", price: 229.87, change24h: 0.91, volume: "$6.8B", marketCap: "$3.5T", spark: genSpark(0.3) },
  { sym: "TSLA", name: "Tesla Inc.", type: "stock", price: 248.5, change24h: -1.23, volume: "$12.4B", marketCap: "$790B", spark: genSpark(-0.4) },
  { sym: "NVDA", name: "NVIDIA Corp.", type: "stock", price: 1142.04, change24h: 3.18, volume: "$22.1B", marketCap: "$2.8T", spark: genSpark(1.2) },
  { sym: "MSFT", name: "Microsoft", type: "stock", price: 428.12, change24h: 0.52, volume: "$5.2B", marketCap: "$3.2T", spark: genSpark(0.2) },
  { sym: "AMZN", name: "Amazon", type: "stock", price: 186.92, change24h: 1.65, volume: "$8.1B", marketCap: "$1.95T", spark: genSpark(0.6) },
  { sym: "META", name: "Meta Platforms", type: "stock", price: 512.28, change24h: -0.82, volume: "$4.3B", marketCap: "$1.3T", spark: genSpark(-0.2) },
];

type SortKey = "sym" | "price" | "change24h" | "volume";

const Sparkline = ({ data, up }: { data: number[]; up: boolean }) => {
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
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const MarketsPage = () => {
  const [tab, setTab] = useState<"all" | "crypto" | "stock" | "watch">("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({
    key: "change24h",
    dir: "desc",
  });
  const [watch, setWatch] = useState<Set<string>>(new Set(["BTC", "NVDA"]));

  const toggleWatch = (sym: string) => {
    setWatch((s) => {
      const n = new Set(s);
      n.has(sym) ? n.delete(sym) : n.add(sym);
      return n;
    });
  };

  const rows = useMemo(() => {
    let r = seed;
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
  }, [tab, q, sort, watch]);

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
            { k: "all", l: "All" },
            { k: "crypto", l: "Crypto" },
            { k: "stock", l: "Stocks" },
            { k: "watch", l: "Watchlist" },
          ] as const).map((t) => (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                tab === t.k
                  ? "bg-primary/15 text-primary shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.3)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.l}
            </button>
          ))}
        </div>
        <div className="relative md:ml-auto md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assets…"
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
          <SortHead label="Asset" k="sym" />
          <SortHead label="Price" k="price" />
          <SortHead label="24h" k="change24h" />
          <SortHead label="Volume" k="volume" />
          <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            24h chart
          </div>
          <div className="text-right text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Trade
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-border/40">
          {rows.length === 0 && (
            <div className="p-16 text-center">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl glass mb-4">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">No assets match your search.</p>
            </div>
          )}
          {rows.map((r) => {
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
                  ${r.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
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
                    ${r.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
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
                  <button className="rounded-lg bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 hover:border-primary hover:shadow-glow px-4 py-1.5 text-xs font-semibold transition-all">
                    Trade
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MarketsPage;
