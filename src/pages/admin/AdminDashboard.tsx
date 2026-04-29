import { Area, AreaChart, ResponsiveContainer, BarChart, Bar, Tooltip } from "recharts";
import { Users, Activity, ArrowRightLeft, DollarSign, TrendingUp, Clock, AlertTriangle } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

const revData = Array.from({ length: 7 }, (_, i) => ({
  name: `Day ${i + 1}`,
  revenue: 20000 + Math.random() * 30000,
  volume: 150000 + Math.random() * 200000,
}));

export const AdminDashboard = () => {
  const { state } = useAdmin();

  const totalUsers = state.users.length;
  const activeUsers = state.users.filter(u => u.status === "Verified").length;
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Platform Overview</h1>
          <p className="text-muted-foreground mt-1">Real-time metrics and financial data.</p>
        </div>
        <div className="text-right">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">System Status</div>
          <div className="flex items-center gap-2 justify-end text-sm font-semibold text-success">
            <div className="h-2 w-2 rounded-full bg-success shadow-[0_0_8px_hsl(var(--success))] animate-blink" />
            ALL SYSTEMS NOMINAL
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
            <Users className="h-20 w-20 text-primary -mr-6 -mt-6" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
              <Users className="h-4 w-4" /> Total Users
            </div>
            <div className="font-display text-3xl font-bold">{totalUsers.toLocaleString()}</div>
            <div className="text-xs text-success flex items-center gap-1 mt-1 font-mono">
              <TrendingUp className="h-3 w-3" /> +12% this week
            </div>
          </div>
        </div>

        <div className="glass rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
            <Activity className="h-20 w-20 text-primary -mr-6 -mt-6" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
              <Activity className="h-4 w-4" /> Active Users
            </div>
            <div className="font-display text-3xl font-bold">{activeUsers.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1 font-mono">
              Currently verified
            </div>
          </div>
        </div>

        <div className="glass rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
            <ArrowRightLeft className="h-20 w-20 text-primary -mr-6 -mt-6" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
              <ArrowRightLeft className="h-4 w-4" /> Total Volume
            </div>
            <div className="font-display text-3xl font-bold">${(state.metrics.totalVolume / 1000000).toFixed(2)}M</div>
            <div className="text-xs text-success flex items-center gap-1 mt-1 font-mono">
              <TrendingUp className="h-3 w-3" /> +4.2% this week
            </div>
          </div>
        </div>

        <div className="glass rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
            <DollarSign className="h-20 w-20 text-success -mr-6 -mt-6" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
              <DollarSign className="h-4 w-4" /> Total Treasury
            </div>
            <div className="font-display text-3xl font-bold text-success">${state.metrics.totalRevenue.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1 font-mono">
              From {state.settings.exchangeFeePercent}% fees
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass rounded-3xl p-6">
          <h3 className="font-display font-semibold mb-6 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" /> Revenue vs Volume (7d)
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revData}>
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--muted)/0.2)' }}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '12px' }} 
                />
                <Bar dataKey="volume" fill="hsl(var(--primary)/0.3)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-3xl p-6 flex flex-col h-full">
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" /> Live Activity Feed
          </h3>
          <div className="flex-1 space-y-4 overflow-y-auto pr-2">
            {state.transactions.slice(0, 5).map(tx => (
              <div key={tx.id} className="flex items-start gap-3 text-sm p-3 rounded-xl bg-muted/20 border border-border/40 hover:bg-muted/40 transition-colors">
                <div className={`mt-0.5 p-1.5 rounded-lg shrink-0 ${
                  tx.type === "Deposit" ? "bg-success/20 text-success" : 
                  tx.type === "Withdrawal" ? "bg-destructive/20 text-destructive" : "bg-primary/20 text-primary"
                }`}>
                  <ArrowRightLeft className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="font-medium">
                    {tx.userName} requested a {tx.type.toLowerCase()} of <span className="font-mono font-bold">${tx.amount.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                    <span>{new Date(tx.date).toLocaleTimeString()}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-semibold ${
                      tx.status === "Pending" ? "bg-warning/20 text-warning" : 
                      tx.status === "Failed" ? "bg-destructive/20 text-destructive" : "bg-success/20 text-success"
                    }`}>{tx.status}</span>
                  </div>
                </div>
              </div>
            ))}
            {state.securityLogs.slice(0, 2).map(log => (
              <div key={log.id} className="flex items-start gap-3 text-sm p-3 rounded-xl bg-destructive/10 border border-destructive/20">
                <div className="mt-0.5 p-1.5 rounded-lg shrink-0 bg-destructive/20 text-destructive">
                  <AlertTriangle className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="font-medium text-destructive">{log.event}</div>
                  <div className="text-xs text-destructive/70 mt-1">
                    {new Date(log.date).toLocaleTimeString()} · {log.userId || "System"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
