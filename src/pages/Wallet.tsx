import { ArrowDownToLine, Bitcoin, Copy, Plus, QrCode, Wallet as WalletIcon } from "lucide-react";

const balances = [
  { sym: "USD", name: "US Dollar", balance: 12480.5, value: 12480.5, type: "fiat" },
  { sym: "BTC", name: "Bitcoin", balance: 0.842, value: 56767.89, type: "crypto" },
  { sym: "ETH", name: "Ethereum", balance: 12.4, value: 43671.56, type: "crypto" },
  { sym: "SOL", name: "Solana", balance: 210.5, value: 38778.31, type: "crypto" },
  { sym: "USDC", name: "USD Coin", balance: 6828.58, value: 6828.58, type: "stable" },
];

const WalletPage = () => {
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
            <button className="flex items-center gap-2 rounded-xl bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 hover:shadow-glow px-4 py-2.5 text-sm font-semibold transition-all">
              <Plus className="h-4 w-4" /> Deposit
            </button>
            <button className="flex items-center gap-2 rounded-xl glass border border-border/60 hover:border-primary/40 px-4 py-2.5 text-sm font-semibold transition-all">
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
            <code className="text-[11px] font-mono text-muted-foreground truncate flex-1">
              bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
            </code>
            <button className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <Copy className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
