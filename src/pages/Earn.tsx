import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarClock, Pause, Play, Plus, Repeat, Sparkles, Trash2, Edit2, TrendingUp, ShieldAlert, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

type Cadence = "Daily" | "Weekly" | "Monthly";
type Plan = {
  id: string;
  asset: string;
  amount: number;
  cadence: Cadence;
  next: string;
  active: boolean;
  invested: number;
  target: number;
  projectedApy: number;
  risk: "Low" | "Medium" | "High";
};

const ASSETS = ["BTC", "ETH", "SOL", "AAPL", "TSLA", "NVDA"];

const initialPlans: Plan[] = [
  { id: "1", asset: "BTC", amount: 50, cadence: "Weekly", next: "Mon, 9:00", active: true, invested: 1850, target: 5000, projectedApy: 12.5, risk: "Medium" },
  { id: "2", asset: "ETH", amount: 25, cadence: "Daily", next: "Tomorrow, 9:00", active: true, invested: 920, target: 2000, projectedApy: 14.2, risk: "Medium" },
  { id: "3", asset: "AAPL", amount: 100, cadence: "Monthly", next: "May 1", active: false, invested: 400, target: 1200, projectedApy: 8.4, risk: "Low" },
];

const Earn = () => {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [asset, setAsset] = useState("BTC");
  const [amount, setAmount] = useState("50");
  const [cadence, setCadence] = useState<Cadence>("Weekly");
  const [editingId, setEditingId] = useState<string | null>(null);

  const createOrUpdate = () => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    if (editingId) {
      setPlans(p => p.map(pl => pl.id === editingId ? { ...pl, asset, amount: amt, cadence } : pl));
      toast.success(`Plan updated`);
      setEditingId(null);
    } else {
      const newPlan: Plan = {
        id: Math.random().toString(36).slice(2),
        asset,
        amount: amt,
        cadence,
        next: cadence === "Daily" ? "Tomorrow, 9:00" : cadence === "Weekly" ? "Mon, 9:00" : "1st of month",
        active: true,
        invested: 0,
        target: amt * (cadence === "Daily" ? 30 : cadence === "Weekly" ? 52 : 12) * 2, // Mock target
        projectedApy: Math.random() * 10 + 5,
        risk: "Medium"
      };
      setPlans((p) => [newPlan, ...p]);
      toast.success(`Auto-invest plan created: $${amt} ${cadence.toLowerCase()} → ${asset}`);
    }
  };

  const startEdit = (p: Plan) => {
    setAsset(p.asset);
    setAmount(p.amount.toString());
    setCadence(p.cadence);
    setEditingId(p.id);
  };

  const toggle = (id: string) =>
    setPlans((p) => p.map((pl) => (pl.id === id ? { ...pl, active: !pl.active } : pl)));
  const remove = (id: string) => setPlans((p) => p.filter((pl) => pl.id !== id));

  const totalMonthly = plans
    .filter((p) => p.active)
    .reduce((sum, p) => sum + (p.cadence === "Daily" ? p.amount * 30 : p.cadence === "Weekly" ? p.amount * 4 : p.amount), 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight">Auto-invest</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Build wealth on autopilot with recurring buy plans. Dollar-cost average into any asset.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create plan */}
        <Card className="glass p-6 lg:col-span-1">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-9 w-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <h2 className="font-display text-lg font-semibold">New plan</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Asset</Label>
              <Select value={asset} onValueChange={setAsset}>
                <SelectTrigger className="bg-muted/40 border-border/60">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ASSETS.map((a) => (
                    <SelectItem key={a} value={a}>
                      {a}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Amount (USD)</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-muted/40 border-border/60"
              />
            </div>
            <div className="space-y-2">
              <Label>Cadence</Label>
              <Tabs value={cadence} onValueChange={(v) => setCadence(v as Cadence)}>
                <TabsList className="grid grid-cols-3 w-full bg-muted/40">
                  <TabsTrigger value="Daily">Daily</TabsTrigger>
                  <TabsTrigger value="Weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="Monthly">Monthly</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <Button variant="hero" className="w-full" onClick={createOrUpdate}>
              {editingId ? <Edit2 className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {editingId ? "Update plan" : "Create plan"}
            </Button>
            {editingId && (
              <Button variant="ghost" className="w-full" onClick={() => {
                setEditingId(null);
                setAmount("50");
              }}>
                Cancel
              </Button>
            )}
            <div className="glass rounded-xl p-3 text-xs text-muted-foreground">
              Estimated monthly contribution from active plans:{" "}
              <span className="font-mono font-semibold text-foreground">
                ${totalMonthly.toLocaleString()}
              </span>
            </div>
          </div>
        </Card>

        {/* Active plans */}
        <Card className="glass p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Repeat className="h-4 w-4 text-primary" />
              <h2 className="font-display text-lg font-semibold">Your plans</h2>
            </div>
            <Badge variant="outline" className="border-primary/30 text-primary">
              {plans.filter((p) => p.active).length} active
            </Badge>
          </div>

          {plans.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No plans yet. Create your first auto-invest plan to get started.
            </div>
          ) : (
            <div className="space-y-3">
              {plans.map((p) => (
                <div
                  key={p.id}
                  className="glass rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center font-display font-bold text-primary-foreground shrink-0">
                    {p.asset.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">{p.asset}</span>
                      <Badge variant="outline" className="border-border/60 text-xs">
                        {p.cadence}
                      </Badge>
                      {p.active ? (
                        <span className="text-[10px] font-mono uppercase tracking-wider text-success">● Active</span>
                      ) : (
                        <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                          ● Paused
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center gap-3 flex-wrap">
                      <span className="font-mono">${p.amount} / {p.cadence.toLowerCase()}</span>
                      <span className="flex items-center gap-1">
                        <CalendarClock className="h-3 w-3" /> Next: {p.next}
                      </span>
                      <span className="flex items-center gap-1 text-success">
                        <TrendingUp className="h-3 w-3" /> {p.projectedApy.toFixed(1)}% APY
                      </span>
                      <span className={`flex items-center gap-1 ${p.risk === "Low" ? "text-success" : p.risk === "Medium" ? "text-warning" : "text-destructive"}`}>
                        {p.risk === "Low" ? <ShieldCheck className="h-3 w-3" /> : <ShieldAlert className="h-3 w-3" />} {p.risk} Risk
                      </span>
                    </div>
                    
                    <div className="mt-3 space-y-1.5">
                      <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                        <span>${p.invested.toLocaleString()} invested</span>
                        <span>Target: ${p.target.toLocaleString()}</span>
                      </div>
                      <Progress value={(p.invested / p.target) * 100} className="h-1.5" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 sm:mt-0">
                    <Button size="sm" variant="glass" onClick={() => toggle(p.id)}>
                      {p.active ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                      <span className="sr-only md:not-sr-only md:ml-1">{p.active ? "Pause" : "Resume"}</span>
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => startEdit(p)}>
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => remove(p.id)}>
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Earn;
