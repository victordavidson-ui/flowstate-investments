import { Bitcoin, TrendingUp, TrendingDown } from "lucide-react";

const tickers = [
  { symbol: "BTC", name: "Bitcoin", price: "67,432.18", change: "+2.41%", up: true },
  { symbol: "ETH", name: "Ethereum", price: "3,521.90", change: "+1.82%", up: true },
  { symbol: "SOL", name: "Solana", price: "184.22", change: "-0.64%", up: false },
  { symbol: "AAPL", name: "Apple", price: "229.87", change: "+0.91%", up: true },
  { symbol: "TSLA", name: "Tesla", price: "248.50", change: "-1.23%", up: false },
  { symbol: "NVDA", name: "Nvidia", price: "1,142.04", change: "+3.18%", up: true },
  { symbol: "AVAX", name: "Avalanche", price: "38.71", change: "+4.02%", up: true },
  { symbol: "DOGE", name: "Dogecoin", price: "0.1421", change: "-2.10%", up: false },
];

const TickerItem = ({ t }: { t: (typeof tickers)[number] }) => (
  <div className="flex items-center gap-3 px-6 py-2 border-r border-border/40 shrink-0">
    <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center">
      <Bitcoin className="h-3.5 w-3.5 text-primary" />
    </div>
    <span className="font-mono text-sm font-medium text-foreground">{t.symbol}</span>
    <span className="font-mono text-sm text-muted-foreground">${t.price}</span>
    <span
      className={`flex items-center gap-1 text-xs font-medium font-mono ${
        t.up ? "text-success" : "text-destructive"
      }`}
    >
      {t.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
      {t.change}
    </span>
  </div>
);

export const LiveTicker = () => {
  return (
    <div className="relative w-full overflow-hidden border-y border-border/40 bg-background/40 backdrop-blur-md">
      <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      <div className="flex animate-ticker w-max">
        {[...tickers, ...tickers].map((t, i) => (
          <TickerItem key={i} t={t} />
        ))}
      </div>
    </div>
  );
};
