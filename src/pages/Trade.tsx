import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";
import { Bitcoin, TrendingUp, TrendingDown, Star, Zap, History } from "lucide-react";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { KYCGuard } from "@/components/auth/KYCGuard";

// Mock OHLC candles
type Candle = { t: number; o: number; h: number; l: number; c: number; v: number };

const genCandles = (): Candle[] => {
  const out: Candle[] = [];
  let price = 67000;
  for (let i = 0; i < 60; i++) {
    const o = price;
    const move = (Math.random() - 0.48) * 600;
    const c = o + move;
    const h = Math.max(o, c) + Math.random() * 200;
    const l = Math.min(o, c) - Math.random() * 200;
    out.push({ t: i, o, h, l, c, v: 500 + Math.random() * 1500 });
    price = c;
  }
  return out;
};

const orderBook = {
  asks: Array.from({ length: 10 }, (_, i) => ({
    price: 67432 + (10 - i) * 6 + Math.random() * 3,
    size: +(Math.random() * 2 + 0.1).toFixed(4),
    total: +(Math.random() * 20 + 5).toFixed(3),
  })),
  bids: Array.from({ length: 10 }, (_, i) => ({
    price: 67432 - (i + 1) * 6 - Math.random() * 3,
    size: +(Math.random() * 2 + 0.1).toFixed(4),
    total: +(Math.random() * 20 + 5).toFixed(3),
  })),
};

const CandleBar = (props: any) => {
  const { x, y, width, height, payload } = props;
  if (!payload) return null;
  const up = payload.c >= payload.o;
  const color = up ? "hsl(152 80% 50%)" : "hsl(0 85% 60%)";
  const bodyTop = y;
  const bodyHeight = Math.max(height, 1);
  // Wick positions calculated from data range on axis - recharts gives us y,height for [low,high]
  // We'll overlay body using open/close via a proportional calc
  const range = payload.h - payload.l || 1;
  const bodyY = y + ((payload.h - Math.max(payload.o, payload.c)) / range) * height;
  const bodyH = Math.max(((Math.abs(payload.o - payload.c)) / range) * height, 1);
  return (
    <g>
      <line
        x1={x + width / 2}
        x2={x + width / 2}
        y1={bodyTop}
        y2={bodyTop + bodyHeight}
        stroke={color}
        strokeWidth={1}
      />
      <rect x={x + 1} y={bodyY} width={width - 2} height={bodyH} fill={color} />
    </g>
  );
};

const TradePage = () => {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [price, setPrice] = useState("67432.18");
  const [amount, setAmount] = useState("");
  const [risk, setRisk] = useState(30);
  const { executeTrade, state } = usePortfolio();

  const candles = useMemo(() => genCandles(), []);
  const last = candles[candles.length - 1];
  const change = ((last.c - candles[0].o) / candles[0].o) * 100;

  const riskLabel = risk < 33 ? "Low" : risk < 66 ? "Medium" : "High";
  const riskColor =
    risk < 33 ? "hsl(152 80% 50%)" : risk < 66 ? "hsl(40 100% 60%)" : "hsl(0 85% 60%)";

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-4 md:gap-6 animate-fade-in">
      <KYCGuard action="trade assets">
        <div className="space-y-4 md:space-y-6 min-w-0">
          {/* Pair header */}
          <div className="glass rounded-3xl p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center border border-border/60">
                  <Bitcoin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-display text-lg font-bold flex items-center gap-2">
                    BTC/USDT
                    <Star className="h-4 w-4 text-warning fill-warning" />
                  </div>
                  <div className="text-xs text-muted-foreground">Bitcoin · Spot</div>
                </div>
              </div>
              
              <Link 
                to="/history"
                className="ml-auto hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/50 text-xs font-mono text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
              >
                <History className="h-4 w-4" /> Trade History
              </Link>
              <div className="grid grid-cols-2 md:flex md:items-center md:gap-8 gap-3">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    Last price
                  </div>
                  <div className={`font-mono text-lg font-semibold ${change >= 0 ? "text-success" : "text-destructive"}`}>
                    ${last.c.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    24h change
                  </div>
                  <div className={`font-mono text-sm flex items-center gap-1 ${change >= 0 ? "text-success" : "text-destructive"}`}>
                    {change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {change.toFixed(2)}%
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    24h high
                  </div>
                  <div className="font-mono text-sm">${Math.max(...candles.map((c) => c.h)).toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    24h low
                  </div>
                  <div className="font-mono text-sm">${Math.min(...candles.map((c) => c.l)).toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Candlestick chart */}
          <div className="glass rounded-3xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1 glass rounded-lg p-1">
                {["1H", "4H", "1D", "1W", "1M"].map((tf, i) => (
                  <button
                    key={tf}
                    className={`px-3 py-1 rounded-md text-xs font-mono transition-all ${
                      i === 2
                        ? "bg-primary/15 text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
              <div className="text-xs font-mono text-muted-foreground hidden md:block">
                Candles · Volume
              </div>
            </div>

            <div className="h-72 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={candles} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="hsl(230 25% 14%)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="t" hide />
                  <YAxis
                    domain={["dataMin - 200", "dataMax + 200"]}
                    tick={{ fill: "hsl(220 15% 65%)", fontSize: 10, fontFamily: "JetBrains Mono" }}
                    axisLine={false}
                    tickLine={false}
                    width={60}
                    orientation="right"
                  />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(230 30% 8%)",
                      border: "1px solid hsl(230 25% 16%)",
                      borderRadius: "12px",
                      fontSize: "11px",
                      fontFamily: "JetBrains Mono",
                    }}
                    formatter={(v: number, name: string) => [v.toFixed(2), name.toUpperCase()]}
                    labelFormatter={() => ""}
                  />
                  {/* Invisible high-low bar to create candle shape */}
                  <Bar dataKey="h" shape={(p: any) => <CandleBar {...p} />} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="h-20 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={candles}>
                  <XAxis dataKey="t" hide />
                  <YAxis hide />
                  <Bar dataKey="v">
                    {candles.map((c, i) => (
                      <Cell key={i} fill={c.c >= c.o ? "hsl(152 80% 50% / 0.5)" : "hsl(0 85% 60% / 0.5)"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Order book (mobile) */}
          <div className="xl:hidden glass rounded-3xl p-4">
            <OrderBookPanel lastPrice={last.c} />
          </div>
        </div>
      </KYCGuard>

      {/* Right column: Order form + book */}
      <div className="space-y-4 md:space-y-6 min-w-0">v>

      {/* Right column: Order form + book */}
      <div className="space-y-4 md:space-y-6 min-w-0">
        {/* Order form */}
        <div className="glass rounded-3xl p-5">
          <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-muted/40 mb-4">
            <button
              onClick={() => setSide("buy")}
              className={`rounded-lg py-2 text-sm font-semibold transition-all ${
                side === "buy"
                  ? "bg-success/15 text-success shadow-[inset_0_0_0_1px_hsl(var(--success)/0.4)]"
                  : "text-muted-foreground"
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setSide("sell")}
              className={`rounded-lg py-2 text-sm font-semibold transition-all ${
                side === "sell"
                  ? "bg-destructive/15 text-destructive shadow-[inset_0_0_0_1px_hsl(var(--destructive)/0.4)]"
                  : "text-muted-foreground"
              }`}
            >
              Sell
            </button>
          </div>

          <div className="flex items-center gap-1 mb-4">
            {(["market", "limit"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setOrderType(t)}
                className={`px-3 py-1 rounded-md text-xs font-medium uppercase tracking-wider transition-all ${
                  orderType === t
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {orderType === "limit" && (
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5 block">
                  Price (USDT)
                </label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-muted/40 border border-border/60 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            )}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5 block">
                Amount (BTC)
              </label>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-muted/40 border border-border/60 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {["25%", "50%", "75%", "100%"].map((p) => (
                <button
                  key={p}
                  className="rounded-lg bg-muted/40 hover:bg-primary/10 hover:text-primary border border-border/50 hover:border-primary/40 py-1.5 text-xs font-mono transition-all"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Risk */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Risk level
                </label>
                <span
                  className="text-xs font-mono font-semibold"
                  style={{ color: riskColor }}
                >
                  {riskLabel}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={risk}
                onChange={(e) => setRisk(+e.target.value)}
                className="w-full accent-primary"
                style={{ accentColor: riskColor }}
              />
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground mt-1">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
            </div>

            <div className="glass rounded-xl p-3 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Available</span>
                <span className="font-mono">{state.balanceUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })} USDT</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Est. total</span>
                <span className="font-mono">
                  ${((+amount || 0) * +price).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Fee</span>
                <span className="font-mono">0.10%</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (!amount || isNaN(+amount)) return;
                const total = (+amount * +price).toFixed(2);
                if (side === "buy" && +total > state.balanceUSD) {
                  toast.error("Insufficient USDT balance");
                  return;
                }
                executeTrade({
                  pair: "BTC/USDT",
                  side: side === "buy" ? "Buy" : "Sell",
                  type: orderType === "market" ? "Market" : "Limit",
                  amount: amount,
                  price: price,
                  total: total,
                  status: "Filled"
                });
                toast.success(`${side === "buy" ? "Bought" : "Sold"} ${amount} BTC successfully`);
                setAmount("");
              }}
              className={`w-full rounded-xl py-3 text-sm font-semibold transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 ${
                side === "buy"
                  ? "bg-success/20 text-success border border-success/40 hover:bg-success/30 hover:shadow-[0_0_20px_hsl(var(--success)/0.3)]"
                  : "bg-destructive/20 text-destructive border border-destructive/40 hover:bg-destructive/30 hover:shadow-[0_0_20px_hsl(var(--destructive)/0.3)]"
              }`}
            >
              <Zap className="h-4 w-4" />
              {side === "buy" ? "Buy" : "Sell"} BTC
            </button>
          </div>
        </div>

        {/* Order book (desktop) */}
        <div className="hidden xl:block glass rounded-3xl p-4">
          <OrderBookPanel lastPrice={last.c} />
        </div>
      </div>
    </div>
  );
};

const OrderBookPanel = ({ lastPrice }: { lastPrice: number }) => {
  const maxAskTotal = Math.max(...orderBook.asks.map((a) => a.total));
  const maxBidTotal = Math.max(...orderBook.bids.map((b) => b.total));
  return (
    <>
      <h3 className="font-display font-semibold mb-3">Order book</h3>
      <div className="grid grid-cols-3 text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
        <div>Price</div>
        <div className="text-right">Size</div>
        <div className="text-right">Total</div>
      </div>
      {/* Asks */}
      <div className="space-y-0.5 mb-2">
        {orderBook.asks.slice().reverse().map((a, i) => (
          <div key={i} className="relative grid grid-cols-3 text-xs font-mono py-0.5">
            <div
              className="absolute inset-y-0 right-0 bg-destructive/10 rounded"
              style={{ width: `${(a.total / maxAskTotal) * 100}%` }}
            />
            <div className="relative text-destructive">{a.price.toFixed(2)}</div>
            <div className="relative text-right">{a.size.toFixed(4)}</div>
            <div className="relative text-right text-muted-foreground">{a.total.toFixed(3)}</div>
          </div>
        ))}
      </div>
      {/* Last price */}
      <div className="text-center py-2 glass rounded-lg mb-2">
        <div className="font-mono text-base font-semibold text-success">
          ${lastPrice.toFixed(2)}
        </div>
        <div className="text-[10px] text-muted-foreground">Last price</div>
      </div>
      {/* Bids */}
      <div className="space-y-0.5">
        {orderBook.bids.map((b, i) => (
          <div key={i} className="relative grid grid-cols-3 text-xs font-mono py-0.5">
            <div
              className="absolute inset-y-0 right-0 bg-success/10 rounded"
              style={{ width: `${(b.total / maxBidTotal) * 100}%` }}
            />
            <div className="relative text-success">{b.price.toFixed(2)}</div>
            <div className="relative text-right">{b.size.toFixed(4)}</div>
            <div className="relative text-right text-muted-foreground">{b.total.toFixed(3)}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TradePage;
