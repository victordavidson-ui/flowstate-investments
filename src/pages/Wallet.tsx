import { ArrowDownToLine, Bitcoin, Copy, Plus, QrCode, Wallet as WalletIcon, CheckCircle2, Clock, XCircle, ChevronDown, Filter, Repeat, X, Loader2, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { useMarketData } from "@/hooks/useMarketData";
import { KYCGuard } from "@/components/auth/KYCGuard";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QRCodeSVG } from "qrcode.react";
import { useTranslation } from "react-i18next";
import { useCurrency } from "@/contexts/CurrencyContext";
import api from "@/lib/axios";

const WalletPage = () => {
  const { t } = useTranslation();
  const { formatValue } = useCurrency();
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [walletAddresses, setWalletAddresses] = useState<Record<string, string>>({});
  const [txHash, setTxHash] = useState("");
  
  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const { data } = await api.get('/transactions/wallets');
        setWalletAddresses(data);
      } catch (e) {
        console.error("Failed to fetch wallets", e);
      }
    };
    fetchWallets();
  }, []);
  
  // Exchange state
  const [fromAsset, setFromAsset] = useState("USD");
  const [toAsset, setToAsset] = useState("BTC");
  const [exchangeAmount, setExchangeAmount] = useState("");
  
  // Modals
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [selectedDepositAsset, setSelectedDepositAsset] = useState<string | null>(null);
  const [withdrawData, setWithdrawData] = useState({ asset: "BTC", amount: "", address: "" });
  const [isProcessing, setIsProcessing] = useState(false);

  const { state, deposit, withdraw, exchange, adminStats } = usePortfolio();
  const { assets: marketAssets } = useMarketData();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(t("messages.address_copied"));
  };

  const portfolioBalances = [
    { sym: "USD", name: t("common.us_dollar", "US Dollar"), balance: state.balanceUSD, value: state.balanceUSD, type: "fiat" },
    ...Object.entries(state.holdings).map(([sym, qty]) => {
      const marketAsset = marketAssets.find(a => a.sym === sym);
      return {
        sym,
        name: marketAsset?.name || sym,
        balance: qty,
        value: (marketAsset?.price || 0) * qty,
        type: "crypto",
        address: walletAddresses[sym]
      };
    })
  ].filter(b => b.balance >= 0);

  const total = portfolioBalances.reduce((a, b) => a + b.value, 0);

  const handleExchange = () => {
    if (!exchangeAmount || isNaN(+exchangeAmount)) return;
    try {
      const fromPrice = fromAsset === "USD" ? 1 : marketAssets.find(a => a.sym === fromAsset)?.price || 1;
      const toPrice = toAsset === "USD" ? 1 : marketAssets.find(a => a.sym === toAsset)?.price || 1;
      const rate = fromPrice / toPrice;
      exchange(fromAsset, toAsset, +exchangeAmount, rate);
      toast.success(t("messages.exchange_success"));
      setExchangeAmount("");
    } catch (e: any) {
      toast.error(e.message || t("errors.exchange_failed"));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass rounded-3xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 h-64 w-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="text-sm text-muted-foreground mb-2">{t('wallet.balance')}</div>
            <div className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              {formatValue(total)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {t('wallet.across', { count: portfolioBalances.length })}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowDeposit(true)}
              className="flex items-center gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-glow px-6 py-2.5 text-sm font-semibold transition-all active:scale-95"
            >
              <Plus className="h-4 w-4" /> {t('dashboard.deposit')}
            </button>
            <KYCGuard action="withdraw funds">
              <button 
                onClick={() => setShowWithdraw(true)}
                className="flex items-center gap-2 rounded-xl glass border border-border/60 hover:border-primary/40 px-6 py-2.5 text-sm font-semibold transition-all active:scale-95"
              >
                <ArrowDownToLine className="h-4 w-4" /> {t('dashboard.withdraw')}
              </button>
            </KYCGuard>
          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      {showDeposit && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowDeposit(false)} />
          <div className="relative glass-strong w-full max-w-md rounded-3xl p-6 md:p-8 animate-fade-in-up border border-primary/20">
            <button onClick={() => setShowDeposit(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-2xl font-bold mb-6">{t('wallet.deposit_funds')}</h2>
            
            <div className="space-y-4">
              <div className="flex gap-2 p-1 bg-muted/40 rounded-xl mb-4">
                <button 
                  onClick={() => setSelectedDepositAsset(null)}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${!selectedDepositAsset ? 'bg-primary text-primary-foreground shadow-glow' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {t('wallet.bank_transfer')}
                </button>
                <button 
                  onClick={() => setSelectedDepositAsset("BTC")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${selectedDepositAsset ? 'bg-primary text-primary-foreground shadow-glow' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {t('common.crypto')}
                </button>
              </div>

              {!selectedDepositAsset ? (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 block">{t('common.amount')} (USD)</label>
                    <Input 
                      type="number" 
                      placeholder={t('messages.enter_amount')} 
                      className="h-12 bg-muted/40"
                      onChange={(e) => setWithdrawData({ ...withdrawData, amount: e.target.value })}
                    />
                  </div>
                  <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {t('wallet.transfer_notice_bank')}
                    </p>
                  </div>
                  <Button 
                    variant="hero" 
                    className="w-full py-6"
                    disabled={isProcessing || !withdrawData.amount || +withdrawData.amount < 50}
                    onClick={() => {
                      setIsProcessing(true);
                      setTimeout(() => {
                        deposit(+withdrawData.amount);
                        setIsProcessing(false);
                        setShowDeposit(false);
                        toast.success(t("messages.deposit_initiated", { amount: withdrawData.amount }));
                      }, 2000);
                    }}
                  >
                    {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : t('wallet.initiate_transfer')}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 block">{t('wallet.select_asset')}</label>
                    <div className="grid grid-cols-2 gap-2">
                      {marketAssets.slice(0, 4).map(a => (
                        <button 
                          key={a.sym}
                          onClick={() => setSelectedDepositAsset(a.sym)}
                          className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${selectedDepositAsset === a.sym ? 'bg-primary/10 border-primary shadow-glow' : 'glass border-border/40 hover:border-primary/40'}`}
                        >
                          <Bitcoin className="h-4 w-4 text-primary" />
                          <span className="text-sm font-bold">{a.sym}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-muted/40 p-6 rounded-2xl flex flex-col items-center text-center">
                    <div className="bg-white p-2 rounded-xl mb-4">
                      {walletAddresses[selectedDepositAsset] ? (
                        <QRCodeSVG value={walletAddresses[selectedDepositAsset]} size={150} />
                      ) : (
                        <QrCode className="h-32 w-32 text-primary" />
                      )}
                    </div>
                    <div className="w-full">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">{t('wallet.your_address', { asset: selectedDepositAsset })}</div>
                      <div className="flex items-center gap-2 bg-background/60 p-2 rounded-lg border border-border/40">
                        <code className="text-xs font-mono truncate flex-1">{walletAddresses[selectedDepositAsset] || t('common.loading')}</code>
                        <button onClick={() => handleCopy(walletAddresses[selectedDepositAsset] || "")} className="p-1 hover:bg-primary/20 rounded transition-colors">
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 block">{t('wallet.tx_hash')} ({t('wallet.proof_of_payment')})</label>
                    <Input 
                      placeholder={t('messages.enter_txhash')} 
                      className="h-12 bg-muted/40 font-mono text-sm"
                      value={txHash}
                      onChange={(e) => setTxHash(e.target.value)}
                    />
                  </div>
                  
                  <div className="p-4 rounded-2xl bg-secondary/5 border border-secondary/10">
                    <p className="text-[10px] text-muted-foreground text-center">
                      {t('wallet.transfer_notice')}
                    </p>
                  </div>

                  <Button 
                    variant="hero" 
                    className="w-full py-6 mt-2"
                    disabled={isProcessing || !txHash}
                    onClick={async () => {
                      setIsProcessing(true);
                      try {
                        await api.post('/transactions/deposit', {
                          amount: 0,
                          asset: selectedDepositAsset,
                          txHash
                        });
                        toast.success(t("messages.deposit_requested"));
                        setTxHash("");
                        setShowDeposit(false);
                      } catch (e: any) {
                        toast.error(e.response?.data?.message || t("errors.deposit_failed"));
                      } finally {
                        setIsProcessing(false);
                      }
                    }}
                  >
                    {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : t('wallet.i_transferred')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdraw && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowWithdraw(false)} />
          <div className="relative glass-strong w-full max-w-md rounded-3xl p-6 md:p-8 animate-fade-in-up border border-primary/20">
            <button onClick={() => setShowWithdraw(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-2xl font-bold mb-2">{t('wallet.withdraw_funds')}</h2>
            <p className="text-sm text-muted-foreground mb-6">{t('messages.withdraw_desc')}</p>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 block">{t('common.asset')}</label>
                <select 
                  className="w-full bg-muted/40 border border-border/60 rounded-xl px-4 py-3 text-sm focus:outline-none"
                  value={withdrawData.asset}
                  onChange={e => setWithdrawData({...withdrawData, asset: e.target.value})}
                >
                  {Object.keys(state.holdings).map(h => (
                    <option key={h} value={h}>{h} (Available: {state.holdings[h]})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 block">{t('common.amount')}</label>
                <div className="relative">
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    className="h-12 pr-16 bg-muted/40"
                    value={withdrawData.amount}
                    onChange={e => setWithdrawData({...withdrawData, amount: e.target.value})}
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-primary hover:text-primary-glow">{t('wallet.max')}</button>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 block">{t('wallet.recipient_address')}</label>
                <Input 
                  placeholder={t('messages.paste_address')} 
                  className="h-12 bg-muted/40 font-mono text-sm"
                  value={withdrawData.address}
                  onChange={e => setWithdrawData({...withdrawData, address: e.target.value})}
                />
              </div>

              <div className="pt-4">
                <Button 
                  variant="hero" 
                  className="w-full py-6" 
                  onClick={async () => {
                    if (!withdrawData.amount || !withdrawData.address) return;
                    setIsProcessing(true);
                    try {
                      await api.post('/transactions/withdraw', {
                        amount: +withdrawData.amount,
                        asset: withdrawData.asset,
                        walletAddress: withdrawData.address
                      });
                      toast.success(t("messages.withdraw_success"));
                      setWithdrawData({ asset: "BTC", amount: "", address: "" });
                      setShowWithdraw(false);
                    } catch (e: any) {
                      toast.error(e.response?.data?.message || t("errors.withdraw_failed"));
                    } finally {
                      setIsProcessing(false);
                    }
                  }} 
                  disabled={isProcessing || !withdrawData.amount || !withdrawData.address}
                >
                  {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : t('wallet.confirm_withdrawal')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 glass rounded-3xl p-6">
          <h3 className="font-display text-lg font-semibold mb-5">{t('dashboard.your_assets')}</h3>
          <div className="space-y-1">
            {portfolioBalances.map((b) => (
              <div
                key={b.sym}
                className="flex flex-col p-3 rounded-xl hover:bg-muted/40 transition-colors group"
              >
                <div className="flex items-center justify-between">
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
                      {b.balance.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {formatValue(b.value)}
                    </div>
                  </div>
                </div>
                
                {b.address && (
                  <div className="mt-3 bg-muted/40 rounded-lg p-2.5 flex items-center justify-between gap-3 animate-fade-in group-hover:bg-muted/60 transition-colors">
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase font-mono text-muted-foreground mb-0.5">{t('wallet.your_address', { asset: b.sym })}</div>
                      <div className="text-[11px] font-mono truncate text-primary/80">{b.address}</div>
                    </div>
                    <button onClick={() => handleCopy(b.address!)} className="h-8 w-8 rounded-md bg-background/60 flex items-center justify-center hover:bg-primary/20 transition-colors shrink-0">
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <KYCGuard action="exchange assets">
            <div className="glass rounded-3xl p-6">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <Repeat className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{t('wallet.quick_exchange')}</h3>
              <p className="text-xs text-muted-foreground mb-4">
                {t('wallet.swap_desc')}
              </p>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <select 
                    value={fromAsset} onChange={e => setFromAsset(e.target.value)}
                    className="bg-muted/40 border border-border/60 rounded-xl px-3 py-2 text-sm focus:outline-none"
                  >
                    <option value="USD">USD</option>
                    {Object.keys(state.holdings).map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                  <input 
                    type="number" placeholder={t('common.amount')} value={exchangeAmount}
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
                  <div className="flex-1 bg-muted/20 border border-border/60 rounded-xl px-4 py-2 text-sm text-muted-foreground flex items-center">{t('wallet.target_asset')}</div>
                </div>
                <button onClick={handleExchange} className="w-full rounded-xl bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 hover:shadow-glow px-4 py-2.5 text-sm font-semibold transition-all active:scale-95 mt-2">
                  {t('wallet.exchange_now')}
                </button>
              </div>
            </div>
          </KYCGuard>
        </div>
      </div>

      <div className="glass rounded-3xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h3 className="font-display text-lg font-semibold">{t('wallet.history')}</h3>
          <div className="flex items-center gap-2 bg-muted/30 p-1 rounded-lg w-fit">
            {["all", "deposit", "withdraw", "trade"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all capitalize ${filter === f ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                {t(`common.${f}`)}
              </button>
            ))}
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
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${tx.up ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                    {tx.type === "Deposit" ? <Plus className="h-4 w-4" /> : tx.type === "Withdraw" ? <ArrowDownToLine className="h-4 w-4" /> : <Repeat className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="text-sm font-semibold flex items-center gap-2">
                      {tx.type} {tx.asset}
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 ${tx.up ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                        <CheckCircle2 className="h-3 w-3" /> {t('common.completed')}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">{new Date(tx.date).toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className={`text-sm font-mono font-medium ${tx.amount.startsWith("+") ? "text-success" : ""}`}>{tx.amount}</div>
                    <div className="text-xs text-muted-foreground">{formatValue(parseFloat(tx.value.replace(/[^0-9.-]+/g,"")) || 0)}</div>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expanded === tx.id ? "rotate-180" : ""}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
