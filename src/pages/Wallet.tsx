import { ArrowDownToLine, Bitcoin, Copy, Plus, QrCode, Wallet as WalletIcon, CheckCircle2, Clock, XCircle, ChevronDown, Filter, Repeat } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { useMarketData } from "@/hooks/useMarketData";

const WalletPage = () => {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  
  // Exchange state
  const [fromAsset, setFromAsset] = useState("USD");
  const [toAsset, setToAsset] = useState("BTC");
  const [exchangeAmount, setExchangeAmount] = useState("");

  const { state, deposit, exchange, adminStats } = usePortfolio();
  const { assets: marketAssets } = useMarketData();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Address copied to clipboard");
  };

  const portfolioBalances = [
    { sym: "USD", name: "US Dollar", balance: state.balanceUSD, value: state.balanceUSD, type: "fiat" },
    ...Object.entries(state.holdings).map(([sym, qty]) => {
      const marketAsset = marketAssets.find(a => a.sym === sym);
      return {
        sym,
        name: marketAsset?.name || sym,
        balance: qty,
        value: (marketAsset?.price || 0) * qty,
        type: "crypto"
      };
    })
  ].filter(b => b.balance > 0);

  const total = portfolioBalances.reduce((a, b) => a + b.value, 0);

  const handleExchange = () => {
    if (!exchangeAmount || isNaN(+exchangeAmount)) return;
    try {
      // Find rate (destination asset price in source asset terms)
      // Actually we just get the USD prices
      const fromPrice = fromAsset === "USD" ? 1 : marketAssets.find(a => a.sym === fromAsset)?.price || 1;
      const toPrice = toAsset === "USD" ? 1 : marketAssets.find(a => a.sym === toAsset)?.price || 1;
      
      const rate = fromPrice / toPrice;
      
      exchange(fromAsset, toAsset, +exchangeAmount, rate);
      toast.success(`Exchanged successfully! 13% fee applied.`);
      setExchangeAmount("");
    } catch (e: any) {
      toast.error(e.message || "Exchange failed");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass rounded-3xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 h-64 w-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="text-sm text-muted-foreground mb-2">Wallet balance</div>
            <div className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              ${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Across {portfolioBalances.length} assets
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => toast.info("Deposit flow initiated.")}
              className="flex items-center gap-2 rounded-xl bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 hover:shadow-glow px-4 py-2.5 text-sm font-semibold transition-all active:scale-95"
            >
              <Plus className="h-4 w-4" /> Deposit
            </button>
            <button 
              onClick={() => toast.info("Withdrawal flow initiated.")}
              className="flex items-center gap-2 rounded-xl glass border border-border/60 hover:border-primary/40 px-4 py-2.5 text-sm font-semibold transition-all active:scale-95"
            >
              <ArrowDownToLine className="h-4 w-4" /> Withdraw
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 glass rounded-3xl p-6">
          <h3 className="font-display text-lg font-semibold mb-5">Assets</h3>
          <div className="space-y-1">
            {portfolioBalances.map((b) => (
              <div
                key={b.sym}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-border/50">
                    {b.type === "fiat" ? (
                      <span className="font-mono text-xs font-bold text-primary">$</span>
                    ) : (
                      <Bitcoin className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{b.sym}</div>
                    <div className="text-xs text-muted-foreground">{b.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono font-medium">
                    {b.balance.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">
                    ${b.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass rounded-3xl p-6">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
              <Repeat className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">Quick Exchange</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Swap assets instantly with a standard 13% network fee.
            </p>
            <div className="space-y-3">
              <div className="flex gap-2">
                <select 
                  value={fromAsset} onChange={e => setFromAsset(e.target.value)}
                  className="bg-muted/40 border border-border/60 rounded-xl px-3 py-2 text-sm focus:outline-none"
                >
                  <option value="USD">USD</option>
                  <option value="BTC">BTC</option>
                  <option value="ETH">ETH</option>
                  <option value="SOL">SOL</option>
                </select>
                <input 
                  type="number" 
                  placeholder="Amount" 
                  value={exchangeAmount}
                  onChange={e => setExchangeAmount(e.target.value)}
                  className="flex-1 bg-muted/40 border border-border/60 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary/60"
                />
              </div>
              <div className="flex justify-center">
                <ArrowDownToLine className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex gap-2">
                <select 
                  value={toAsset} onChange={e => setToAsset(e.target.value)}
                  className="bg-muted/40 border border-border/60 rounded-xl px-3 py-2 text-sm focus:outline-none"
                >
                  <option value="BTC">BTC</option>
                  <option value="ETH">ETH</option>
                  <option value="SOL">SOL</option>
                  <option value="USD">USD</option>
                </select>
                <div className="flex-1 bg-muted/20 border border-border/60 rounded-xl px-4 py-2 text-sm text-muted-foreground flex items-center">
                  Target Asset
                </div>
              </div>
              <button 
                onClick={handleExchange}
                className="w-full rounded-xl bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 hover:shadow-glow px-4 py-2.5 text-sm font-semibold transition-all active:scale-95 mt-2"
              >
                Exchange Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="glass rounded-3xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h3 className="font-display text-lg font-semibold">Transaction History</h3>
          <div className="flex items-center gap-2 bg-muted/30 p-1 rounded-lg w-fit">
            {["all", "deposit", "withdraw", "trade"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all capitalize ${
                  filter === f ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
            <button className="px-3 py-1.5 text-xs font-medium rounded-md text-muted-foreground hover:text-foreground flex items-center gap-1 ml-2 border-l border-border/40 pl-3">
              <Filter className="h-3.5 w-3.5" /> Filters
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {state.transactions.filter(t => filter === "all" || t.type.toLowerCase() === filter).map(tx => (
            <div key={tx.id} className="glass rounded-xl border border-border/50 overflow-hidden transition-all hover:border-primary/30">
              <div 
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => setExpanded(expanded === tx.id ? null : tx.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    tx.up ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                  }`}>
                    {tx.type === "Deposit" ? <Plus className="h-4 w-4" /> : tx.type === "Withdraw" ? <ArrowDownToLine className="h-4 w-4" /> : <Repeat className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="text-sm font-semibold flex items-center gap-2">
                      {tx.type} {tx.asset}
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 ${
                        tx.up ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                      }`}>
                        <CheckCircle2 className="h-3 w-3" />
                        Completed
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">{new Date(tx.date).toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className={`text-sm font-mono font-medium ${tx.amount.startsWith("+") ? "text-success" : ""}`}>{tx.amount}</div>
                    <div className="text-xs text-muted-foreground">{tx.value}</div>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expanded === tx.id ? "rotate-180" : ""}`} />
                </div>
              </div>
              
              {/* Expandable Details */}
              {expanded === tx.id && (
                <div className="px-4 pb-4 pt-2 border-t border-border/40 bg-muted/10">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-3">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Network</div>
                      <div className="font-medium">Internal</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Fee</div>
                      <div className="font-mono">{tx.type === "Exchange" ? "13%" : "0.00"}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-xs text-muted-foreground mb-1">Transaction ID</div>
                      <div className="flex items-center gap-2">
                        <code className="text-xs font-mono bg-muted/50 px-2 py-1 rounded">{tx.id}</code>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
