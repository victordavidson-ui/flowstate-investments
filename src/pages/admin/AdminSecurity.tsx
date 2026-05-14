import { ShieldAlert, Activity, AlertCircle, ShieldCheck } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { useTranslation } from "react-i18next";

export const AdminSecurity = () => {
  const { state } = useAdmin();
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">{t("admin.security_center")}</h1>
          <p className="text-muted-foreground">{t("admin.security_desc", "Monitor system risks and unusual activity.")}</p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-success/10 text-success border border-success/20 flex items-center gap-2 text-sm font-semibold">
          <ShieldCheck className="h-4 w-4" /> {t("admin.systems_secure", "All Systems Secure")}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Activity className="h-24 w-24 text-primary -mr-8 -mt-8" />
          </div>
          <div className="relative z-10">
            <div className="text-sm font-medium text-muted-foreground mb-2">{t("admin.failed_logins", "Failed Logins")} (24h)</div>
            <div className="font-display text-3xl font-bold">142</div>
            <div className="text-xs text-muted-foreground mt-1">{t("admin.normal_baseline", "Normal baseline")}</div>
          </div>
        </div>

        <div className="glass rounded-3xl p-6 relative overflow-hidden group border-destructive/30 shadow-[0_0_15px_hsl(var(--destructive)/0.1)]">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <ShieldAlert className="h-24 w-24 text-destructive -mr-8 -mt-8" />
          </div>
          <div className="relative z-10">
            <div className="text-sm font-medium text-muted-foreground mb-2">{t("admin.high_risk_users", "High Risk Users")}</div>
            <div className="font-display text-3xl font-bold text-destructive">12</div>
            <div className="text-xs text-muted-foreground mt-1 text-destructive/80">{t("admin.manual_review", "Requires manual review")}</div>
          </div>
        </div>

        <div className="glass rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <AlertCircle className="h-24 w-24 text-warning -mr-8 -mt-8" />
          </div>
          <div className="relative z-10">
            <div className="text-sm font-medium text-muted-foreground mb-2">{t("admin.suspicious_txs", "Suspicious Txs")}</div>
            <div className="font-display text-3xl font-bold text-warning">4</div>
            <div className="text-xs text-muted-foreground mt-1">{t("admin.flagged_by_ai", "Flagged by AI Engine")}</div>
          </div>
        </div>
      </div>

      <div className="glass rounded-3xl overflow-hidden border border-border/50">
        <div className="p-6 border-b border-border/50">
          <h3 className="font-display font-semibold">{t("admin.security_event_log", "Security Event Log")}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/20">
                <th className="p-4 text-xs font-mono uppercase tracking-wider text-muted-foreground font-medium">{t("admin.severity", "Severity")}</th>
                <th className="p-4 text-xs font-mono uppercase tracking-wider text-muted-foreground font-medium">{t("admin.event", "Event")}</th>
                <th className="p-4 text-xs font-mono uppercase tracking-wider text-muted-foreground font-medium">User/IP</th>
                <th className="p-4 text-xs font-mono uppercase tracking-wider text-muted-foreground font-medium">{t("common.date")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {state.securityLogs.map(log => (
                <tr key={log.id} className="hover:bg-muted/10 transition-colors">
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold ${
                      log.severity === "Critical" ? "bg-destructive/20 text-destructive border border-destructive/30" :
                      log.severity === "High" ? "bg-destructive/10 text-destructive" :
                      log.severity === "Medium" ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground"
                    }`}>
                      {t(`common.${log.severity.toLowerCase()}`, log.severity)}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-sm">{log.event}</td>
                  <td className="p-4 text-sm font-mono text-muted-foreground">{log.userId || "System"}</td>
                  <td className="p-4 text-xs text-muted-foreground">{new Date(log.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {state.securityLogs.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              {t("admin.no_security_events", "No recent security events.")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
