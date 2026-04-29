import { useState } from "react";
import { Save, Sliders, Bell, Users, ShieldAlert } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

export const AdminSettings = () => {
  const { state, updateSettings } = useAdmin();
  const [fee, setFee] = useState(state.settings.exchangeFeePercent.toString());

  const handleSaveFee = () => {
    const parsed = parseFloat(fee);
    if (!isNaN(parsed) && parsed >= 0) {
      updateSettings("exchangeFeePercent", parsed);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Platform Settings</h1>
        <p className="text-muted-foreground">Configure global system parameters and admin preferences.</p>
      </div>

      <div className="grid gap-8">
        <section className="space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2 border-b border-border/40 pb-2">
            <Sliders className="h-5 w-5 text-primary" /> Financial Parameters
          </h2>
          <div className="glass rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-sm">Global Exchange Fee (%)</h3>
                <p className="text-xs text-muted-foreground mt-1">Percentage taken on all wallet crypto exchanges.</p>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  className="bg-muted/40 border border-border/60 rounded-xl px-4 py-2 w-24 text-sm focus:outline-none focus:border-primary/50 text-right font-mono"
                />
                <button 
                  onClick={handleSaveFee}
                  className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Save className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border/30">
              <div>
                <h3 className="font-semibold text-sm">Allow User Withdrawals</h3>
                <p className="text-xs text-muted-foreground mt-1">Globally enable or disable withdrawals.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={state.settings.withdrawalsEnabled}
                  onChange={(e) => updateSettings("withdrawalsEnabled", e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-muted/50 rounded-full peer peer-checked:bg-primary/80 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2 border-b border-border/40 pb-2 text-destructive">
            <ShieldAlert className="h-5 w-5" /> Danger Zone
          </h2>
          <div className="glass border-destructive/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-sm text-destructive">Maintenance Mode</h3>
                <p className="text-xs text-muted-foreground mt-1">Lock out all non-admin users and show a maintenance page.</p>
              </div>
              <button 
                onClick={() => updateSettings("maintenanceMode", !state.settings.maintenanceMode)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  state.settings.maintenanceMode 
                    ? "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-[0_0_15px_hsl(var(--destructive)/0.3)]" 
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {state.settings.maintenanceMode ? "DISABLE MAINTENANCE" : "ENABLE MAINTENANCE"}
              </button>
            </div>
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2 border-b border-border/40 pb-2">
            <Bell className="h-5 w-5 text-primary" /> Admin Notifications
          </h2>
          <div className="glass rounded-2xl p-6 space-y-4">
            {["Large Withdrawals (> $10k)", "Suspicious Login Attempts", "New VIP Signups", "System Errors"].map(pref => (
              <div key={pref} className="flex items-center justify-between">
                <div className="text-sm">{pref}</div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-9 h-5 bg-muted/50 rounded-full peer peer-checked:bg-primary/80 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
