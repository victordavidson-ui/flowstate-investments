import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, Users, Trophy, Flame } from "lucide-react";

type Trader = {
  id: string;
  name: string;
  handle: string;
  roi: number;
  winRate: number;
  followers: number;
  risk: "Low" | "Medium" | "High";
  trades: number;
};

const traders: Trader[] = [
  { id: "1", name: "Ava Lin", handle: "@avalpha", roi: 184.2, winRate: 78, followers: 12480, risk: "Medium", trades: 612 },
  { id: "2", name: "Marcus Cole", handle: "@mc_trades", roi: 142.7, winRate: 71, followers: 8932, risk: "High", trades: 489 },
  { id: "3", name: "Yuki Tanaka", handle: "@yuki_x", roi: 96.4, winRate: 82, followers: 7211, risk: "Low", trades: 803 },
  { id: "4", name: "Sofia Reyes", handle: "@sofiar", roi: 88.1, winRate: 69, followers: 5430, risk: "Medium", trades: 351 },
  { id: "5", name: "Dmitri Volkov", handle: "@volk", roi: 211.5, winRate: 64, followers: 14920, risk: "High", trades: 922 },
  { id: "6", name: "Priya Shah", handle: "@priya.eth", roi: 73.8, winRate: 85, followers: 4102, risk: "Low", trades: 257 },
  { id: "7", name: "Kai Nakamura", handle: "@kainft", roi: 121.3, winRate: 74, followers: 6788, risk: "Medium", trades: 412 },
  { id: "8", name: "Elena Roth", handle: "@elenaroth", roi: 65.9, winRate: 80, followers: 3210, risk: "Low", trades: 198 },
];

const riskClasses: Record<Trader["risk"], string> = {
  Low: "bg-success/10 text-success border-success/30",
  Medium: "bg-warning/10 text-[hsl(var(--warning))] border-[hsl(var(--warning))]/30",
  High: "bg-destructive/10 text-destructive border-destructive/30",
};

const Copy = () => {
  const [query, setQuery] = useState("");
  const [following, setFollowing] = useState<Set<string>>(new Set());

  const filtered = traders.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.handle.toLowerCase().includes(query.toLowerCase()),
  );

  const toggle = (id: string) => {
    setFollowing((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight">Copy Trading</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Mirror the strategies of top-performing traders. One click to follow.
          </p>
        </div>
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search traders…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 bg-muted/40 border-border/60"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Trophy, label: "Top ROI (30d)", value: "+211.5%" },
          { icon: Users, label: "Active copiers", value: "62.3K" },
          { icon: Flame, label: "Avg win rate", value: "75.4%" },
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
          <div className="col-span-4">Trader</div>
          <div className="col-span-2 text-right">ROI (30d)</div>
          <div className="col-span-2 text-right">Win rate</div>
          <div className="col-span-2 text-right">Followers</div>
          <div className="col-span-2 text-right">Action</div>
        </div>
        <div className="divide-y divide-border/40">
          {filtered.map((t, i) => {
            const isFollowing = following.has(t.id);
            return (
              <div
                key={t.id}
                className="grid grid-cols-2 md:grid-cols-12 gap-4 px-4 md:px-6 py-4 items-center hover:bg-muted/20 transition-colors"
              >
                <div className="col-span-2 md:col-span-4 flex items-center gap-3 min-w-0">
                  <div className="text-xs font-mono text-muted-foreground w-5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground font-bold">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm truncate">{t.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{t.handle}</div>
                  </div>
                  <Badge variant="outline" className={`ml-auto md:hidden ${riskClasses[t.risk]}`}>
                    {t.risk}
                  </Badge>
                </div>

                <div className="md:col-span-2 md:text-right">
                  <div className="md:hidden text-[10px] text-muted-foreground font-mono uppercase">ROI</div>
                  <div className="flex items-center md:justify-end gap-1 font-mono font-semibold text-success">
                    <TrendingUp className="h-3 w-3" />+{t.roi.toFixed(1)}%
                  </div>
                </div>

                <div className="md:col-span-2 md:text-right">
                  <div className="md:hidden text-[10px] text-muted-foreground font-mono uppercase">Win</div>
                  <div className="font-mono text-sm">{t.winRate}%</div>
                </div>

                <div className="md:col-span-2 md:text-right">
                  <div className="md:hidden text-[10px] text-muted-foreground font-mono uppercase">Followers</div>
                  <div className="font-mono text-sm">{t.followers.toLocaleString()}</div>
                </div>

                <div className="hidden md:flex md:col-span-2 items-center justify-end gap-2">
                  <Badge variant="outline" className={riskClasses[t.risk]}>
                    {t.risk}
                  </Badge>
                  <Button
                    size="sm"
                    variant={isFollowing ? "glass" : "hero"}
                    onClick={() => toggle(t.id)}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                </div>

                <div className="col-span-2 md:hidden">
                  <Button
                    size="sm"
                    variant={isFollowing ? "glass" : "hero"}
                    className="w-full"
                    onClick={() => toggle(t.id)}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default Copy;
