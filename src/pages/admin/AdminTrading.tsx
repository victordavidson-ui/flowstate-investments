import { Activity, AlertTriangle, Play, Pause, TrendingUp, Settings2 } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

const sparkData = Array.from({ length: 24 }, (_, i) => ({
  i, v: 400 + Math.sin(i / 2) * 50 + Math.random() * 20
}));

export const AdminTrading = () => {
  const { state, toggleTrading } = useAdmin();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Trading Control</h1>
          <p className="text-muted-foreground">Monitor market activity and system controls.</p>
        </div>
        
        <button 
          onClick={toggleTrading}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-elevated hover:scale-105 active:scale-95 ${
            state.settings.tradingEnabled 
              ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" 
              : "bg-success text-success-foreground hover:bg-success/90"
          }`}
        >
          {state.settings.tradingEnabled ? (
            <><Pause className="h-5 w-5" /> EMERGENCY PAUSE TRADING</>
          ) : (
            <><Play className="h-5 w-5" /> RESUME TRADING</>
          )}
        </button>
      </div>

      {!state.settings.tradingEnabled && (
        <div className="bg-destructive/20 border border-destructive/50 text-destructive rounded-2xl p-6 flex items-start gap-4">
          <AlertTriangle className="h-8 w-8 shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg">TRADING IS CURRENTLY HALTED</h3>
            <p className="opacity-90">All new orders are being rejected. Open positions cannot be closed until trading is resumed. System is in emergency maintenance mode.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-3xl p-6">
            <h3 className="font-display font-semibold mb-6 flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" /> Live Order Flow Volume
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparkData}>
                  <defs>
                    <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#volGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass rounded-3xl p-6">
            <h3 className="font-display font-semibold mb-4">System Parameters</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/20">
                <div>
                  <div className="font-semibold text-sm">Max Leverage Allowed</div>
                  <div className="text-xs text-muted-foreground">Highest leverage multiplier for users</div>
                </div>
                <div className="font-mono bg-muted px-3 py-1 rounded-md">100x</div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/20">
                <div>
                  <div className="font-semibold text-sm">Margin Call Threshold</div>
                  <div className="text-xs text-muted-foreground">Liquidation warning percentage</div>
                </div>
                <div className="font-mono bg-muted px-3 py-1 rounded-md">85%</div>
              </div>
              <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-border/50 hover:bg-muted transition-colors text-sm font-semibold text-muted-foreground">
                <Settings2 className="h-4 w-4" /> Edit Parameters
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass rounded-3xl p-6">
            <h3 className="font-display font-semibold mb-4">Top Traded Assets</h3>
            <div className="space-y-3">
              {[
                { sym: "BTC/USDT", vol: "$1.2M", up: true },
                { sym: "ETH/USDT", vol: "$850K", up: true },
                { sym: "SOL/USDT", vol: "$320K", up: false },
                { sym: "NVDA", vol: "$145K", up: true },
              ].map(a => (
                <div key={a.sym} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/40 transition-colors">
                  <div className="font-semibold text-sm">{a.sym}</div>
                  <div className="text-right">
                    <div className="font-mono text-sm">{a.vol}</div>
                    <div className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                      <TrendingUp className={`h-3 w-3 ${a.up ? "text-success" : "text-destructive rotate-180"}`} />
                      24h Vol
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
