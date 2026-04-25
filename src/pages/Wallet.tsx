import { ArrowDownToLine, Bitcoin, Copy, Plus, QrCode, Wallet as WalletIcon, CheckCircle2, Clock, XCircle, ChevronDown, Filter } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const balances = [
  { sym: "USD", name: "US Dollar", balance: 12480.5, value: 12480.5, type: "fiat" },
  { sym: "BTC", name: "Bitcoin", balance: 0.842, value: 56767.89, type: "crypto" },
  { sym: "ETH", name: "Ethereum", balance: 12.4, value: 43671.56, type: "crypto" },
  { sym: "SOL", name: "Solana", balance: 210.5, value: 38778.31, type: "crypto" },
  { sym: "USDC", name: "USD Coin", balance: 6828.58, value: 6828.58, type: "stable" },
];

const txHistory = [
  { id: "tx1", t: "Deposit", asset: "USDC", amount: "+5,000", value: "$5,000.00", status: "completed", time: "Oct 24, 14:32", hash: "0x8f...3a1", fee: "$0.00", network: "ERC-20" },
  { id: "tx2", t: "Trade", asset: "BTC", amount: "+0.025", value: "$1,685.80", status: "completed", time: "Oct 24, 10:15", hash: "N/A", fee: "$1.50", network: "Internal" },
  { id: "tx3", t: "Withdraw", asset: "ETH", amount: "-1.5", value: "$5,282.85", status: "pending", time: "Oct 23, 09:41", hash: "0x2a...9f2", fee: "$2.10", network: "ERC-20" },
  { id: "tx4", t: "Deposit", asset: "SOL", amount: "+150", value: "$27,633.00", status: "failed", time: "Oct 21, 16:20", hash: "5Kx...p8L", fee: "$0.01", network: "Solana" },
];

const WalletPage = () => {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Address copied to clipboard");
  };
  const total = balances.reduce((a, b) => a + b.value, 0);
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
              Across {balances.length} assets
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
            {balances.map((b) => (
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

        <div className="glass rounded-3xl p-6">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
            <WalletIcon className="h-5 w-5" />
          </div>
          <h3 className="font-display text-lg font-semibold mb-2">Deposit address</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Send BTC to this address. Only Bitcoin network is supported.
          </p>
          <div className="glass rounded-2xl p-6 flex items-center justify-center mb-4 aspect-square">
            <QrCode className="h-24 w-24 text-primary" strokeWidth={1} />
          </div>
          <div className="flex items-center gap-2 glass rounded-xl p-3">
            <code className="text-[11px] font-mono text-muted-foreground truncate flex-1 select-all">
              bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
            </code>
            <button
              onClick={() => handleCopy("bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh")}
              className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors active:scale-95"
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
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
          {txHistory.filter(t => filter === "all" || t.t.toLowerCase() === filter).map(tx => (
            <div key={tx.id} className="glass rounded-xl border border-border/50 overflow-hidden transition-all hover:border-primary/30">
              <div 
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => setExpanded(expanded === tx.id ? null : tx.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    tx.status === "completed" ? "bg-success/10 text-success" : 
                    tx.status === "pending" ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"
                  }`}>
                    {tx.t === "Deposit" ? <Plus className="h-4 w-4" /> : tx.t === "Withdraw" ? <ArrowDownToLine className="h-4 w-4" /> : <Bitcoin className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="text-sm font-semibold flex items-center gap-2">
                      {tx.t} {tx.asset}
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 ${
                        tx.status === "completed" ? "bg-success/10 text-success" : 
                        tx.status === "pending" ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"
                      }`}>
                        {tx.status === "completed" ? <CheckCircle2 className="h-3 w-3" /> : tx.status === "pending" ? <Clock className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                        {tx.status}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">{tx.time}</div>
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
                      <div className="font-medium">{tx.network}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Fee</div>
                      <div className="font-mono">{tx.fee}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-xs text-muted-foreground mb-1">Transaction Hash</div>
                      <div className="flex items-center gap-2">
                        <code className="text-xs font-mono bg-muted/50 px-2 py-1 rounded">{tx.hash}</code>
                        {tx.hash !== "N/A" && (
                          <button onClick={() => handleCopy(tx.hash)} className="text-primary hover:text-primary-glow">
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                        )}
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
