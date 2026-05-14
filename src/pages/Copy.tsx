import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, Users, Trophy, Flame, Star } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

type Trader = {
  id: string;
  name: string;
  handle: string;
  roi: number;
  winRate: number;
  followers: number;
  risk: "Low" | "Medium" | "High";
  trades: number;
  badge: "Elite" | "Rising" | "Safe";
  spark: number[];
  insight: string;
};

const genSpark = (trend: number) => Array.from({ length: 14 }, (_, i) => 50 + Math.sin(i / 2) * 10 + i * trend + Math.random() * 5);

const traders: Trader[] = [
  { id: "1", name: "Ava Lin", handle: "@avalpha", roi: 184.2, winRate: 78, followers: 12480, risk: "Medium", trades: 612, badge: "Elite", spark: genSpark(1.2), insight: "Consistently beats BTC by 12% in volatile conditions." },
  { id: "2", name: "Marcus Cole", handle: "@mc_trades", roi: 142.7, winRate: 71, followers: 8932, risk: "High", trades: 489, badge: "Rising", spark: genSpark(0.8), insight: "High momentum altcoin swing trader. Aggressive take-profits." },
  { id: "3", name: "Yuki Tanaka", handle: "@yuki_x", roi: 96.4, winRate: 82, followers: 7211, risk: "Low", trades: 803, badge: "Safe", spark: genSpark(0.5), insight: "82% win rate over 800+ trades. Focuses on capital preservation." },
  { id: "4", name: "Sofia Reyes", handle: "@sofiar", roi: 88.1, winRate: 69, followers: 5430, risk: "Medium", trades: 351, badge: "Rising", spark: genSpark(0.3), insight: "Algorithm-assisted technical breakouts." },
  { id: "5", name: "Dmitri Volkov", handle: "@volk", roi: 211.5, winRate: 64, followers: 14920, risk: "High", trades: 922, badge: "Elite", spark: genSpark(1.5), insight: "High-frequency leverage trader. Not for the faint of heart." },
  { id: "6", name: "Priya Shah", handle: "@priya.eth", roi: 73.8, winRate: 85, followers: 4102, risk: "Low", trades: 257, badge: "Safe", spark: genSpark(0.2), insight: "Yield farming and large-cap accumulation specialist." },
  { id: "7", name: "Kai Nakamura", handle: "@kainft", roi: 121.3, winRate: 74, followers: 6788, risk: "Medium", trades: 412, badge: "Rising", spark: genSpark(0.7), insight: "NFT and Web3 gaming asset rotation." },
  { id: "8", name: "Elena Roth", handle: "@elenaroth", roi: 65.9, winRate: 80, followers: 3210, risk: "Low", trades: 198, badge: "Safe", spark: genSpark(0.1), insight: "Macro-driven blue-chip investments. Slow and steady." },
];

const riskClasses: Record<Trader["risk"], string> = {
  Low: "bg-success/10 text-success border-success/30",
  Medium: "bg-warning/10 text-[hsl(var(--warning))] border-[hsl(var(--warning))]/30",
  High: "bg-destructive/10 text-destructive border-destructive/30",
};

const Copy = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [following, setFollowing] = useState<Set<string>>(new Set());
  const [selectedTrader, setSelectedTrader] = useState<Trader | null>(null);

  const filtered = traders.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.handle.toLowerCase().includes(query.toLowerCase()),
  );

  const handleConfirmCopy = () => {
    if (!selectedTrader) return;
    setFollowing((prev) => {
      const next = new Set(prev);
      next.add(selectedTrader.id);
      return next;
    });
    toast.success(t("messages.copy_success", { name: selectedTrader.name }));
    setSelectedTrader(null);
  };

  const handleUnfollow = (id: string, name: string) => {
    setFollowing((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    toast.info(t("messages.copy_stopped", { name }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight">{t('copy.title')}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t('copy.subtitle')}
          </p>
        </div>
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('copy.search_traders')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 bg-muted/40 border-border/60"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Trophy, label: t('copy.top_roi'), value: "+211.5%" },
          { icon: Users, label: t('copy.active_copiers'), value: "62.3K" },
          { icon: Flame, label: t('copy.avg_win_rate'), value: "75.4%" },
        ].map((s) => (
          <Card key={s.label} className="glass p-5 flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center">
              <s.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                {s.label}
              </div>
              <div className="font-display text-xl font-bold">{s.value}</div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="glass overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground border-b border-border/40">
          <div className="col-span-3">{t('common.investor')}</div>
          <div className="col-span-2">{t('copy.performance')}</div>
          <div className="col-span-2 text-right">ROI (30d)</div>
          <div className="col-span-2 text-right">{t('copy.win_rate')}</div>
          <div className="col-span-1 text-right">{t('copy.followers')}</div>
          <div className="col-span-2 text-right">{t('common.platform')}</div>
        </div>
        <div className="divide-y divide-border/40">
          {filtered.map((t_item, i) => {
            const isFollowing = following.has(t_item.id);
            return (
              <div
                key={t_item.id}
                className="grid grid-cols-2 md:grid-cols-12 gap-4 px-4 md:px-6 py-4 items-center hover:bg-muted/20 transition-colors"
              >
                <div className="col-span-2 md:col-span-3 flex items-center gap-3 min-w-0">
                  <div className="text-xs font-mono text-muted-foreground w-5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground font-bold">
                      {t_item.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-sm truncate flex items-center gap-2">
                      {t_item.name}
                      <Badge variant="secondary" className="hidden lg:flex text-[9px] px-1.5 py-0">
                        {t_item.badge}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{t_item.handle}</div>
                  </div>
                  <Badge variant="outline" className={`ml-auto md:hidden ${riskClasses[t_item.risk]}`}>
                    {t_item.risk}
                  </Badge>
                </div>

                <div className="hidden md:block md:col-span-2 h-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={t_item.spark.map((v, i_val) => ({ i: i_val, v }))}>
                      <defs>
                        <linearGradient id={`sp-${t_item.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(152 80% 50%)" stopOpacity={0.5} />
                          <stop offset="100%" stopColor="hsl(152 80% 50%)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="v" stroke="hsl(152 80% 50%)" strokeWidth={1.5} fill={`url(#sp-${t_item.id})`} isAnimationActive={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="md:col-span-2 md:text-right">
                  <div className="md:hidden text-[10px] text-muted-foreground font-mono uppercase">ROI</div>
                  <div className="flex items-center md:justify-end gap-1 font-mono font-semibold text-success">
                    <TrendingUp className="h-3 w-3" />+{t_item.roi.toFixed(1)}%
                  </div>
                </div>

                <div className="md:col-span-2 md:text-right">
                  <div className="md:hidden text-[10px] text-muted-foreground font-mono uppercase">Win</div>
                  <div className="font-mono text-sm">{t_item.winRate}%</div>
                </div>

                <div className="md:col-span-1 md:text-right">
                  <div className="md:hidden text-[10px] text-muted-foreground font-mono uppercase">Followers</div>
                  <div className="font-mono text-sm">{t_item.followers.toLocaleString()}</div>
                </div>

                <div className="hidden md:flex md:col-span-2 items-center justify-end gap-2">
                  <Badge variant="outline" className={riskClasses[t_item.risk]}>
                    {t_item.risk}
                  </Badge>
                  <Button
                    size="sm"
                    variant={isFollowing ? "glass" : "hero"}
                    onClick={() => isFollowing ? handleUnfollow(t_item.id, t_item.name) : setSelectedTrader(t_item)}
                  >
                    {isFollowing ? t('copy.following') : t('copy.follow')}
                  </Button>
                </div>

                <div className="col-span-2 md:hidden">
                  <Button
                    size="sm"
                    variant={isFollowing ? "glass" : "hero"}
                    className="w-full"
                    onClick={() => isFollowing ? handleUnfollow(t_item.id, t_item.name) : setSelectedTrader(t_item)}
                  >
                    {isFollowing ? t('copy.following') : t('copy.follow')}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Dialog open={!!selectedTrader} onOpenChange={(o) => !o && setSelectedTrader(null)}>
        <DialogContent className="glass-strong border-border/40 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-display">{t('copy.copy_trader_modal')}</DialogTitle>
            <DialogDescription>
              {t('copy.mirror_desc')}
            </DialogDescription>
          </DialogHeader>
          
          {selectedTrader && (
            <div className="py-4 space-y-4">
              <div className="flex items-center gap-4 p-4 glass rounded-xl">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground font-bold">
                    {selectedTrader.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    {selectedTrader.name}
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      {selectedTrader.badge}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">{selectedTrader.handle}</div>
                </div>
              </div>
              
              <div className="bg-muted/20 rounded-xl p-4 border border-border/40">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-warning" />
                  <span className="text-sm font-semibold">{t('copy.why_follow')}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedTrader.insight}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">{t('copy.win_rate')}</div>
                    <div className="font-mono text-sm font-medium">{selectedTrader.winRate}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{t('copy.risk_profile')}</div>
                    <div className={`text-sm font-medium ${selectedTrader.risk === "High" ? "text-destructive" : selectedTrader.risk === "Medium" ? "text-warning" : "text-success"}`}>
                      {selectedTrader.risk}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setSelectedTrader(null)}>{t('common.cancel')}</Button>
            <Button variant="hero" onClick={handleConfirmCopy}>{t('copy.start_copying')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Copy;
