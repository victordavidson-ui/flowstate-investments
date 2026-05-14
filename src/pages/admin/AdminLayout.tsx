import { NavLink, Outlet, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Users, Activity, Settings, LogOut, 
  ShieldCheck, ArrowRightLeft, ShieldAlert, Zap, Bell, Search,
  Menu
} from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTranslation } from "react-i18next";

export const AdminLayout = () => {
  const { state } = useAdmin();
  const location = useLocation();
  const { t } = useTranslation();

  const adminNavItems = [
    { to: "/admin/dashboard", label: t("admin.overview"), icon: LayoutDashboard },
    { to: "/admin/users", label: t("admin.users"), icon: Users },
    { to: "/admin/transactions", label: t("admin.transactions"), icon: ArrowRightLeft },
    { to: "/admin/trading", label: t("admin.trading_control"), icon: Activity },
    { to: "/admin/security", label: t("admin.security_center"), icon: ShieldAlert },
    { to: "/admin/settings", label: t("settings.settings"), icon: Settings },
  ];

  const pageTitle = adminNavItems.find(n => location.pathname.startsWith(n.to))?.label ?? t("admin.portal");

  return (
    <div className="min-h-screen bg-background flex relative overflow-hidden">
      <div className="grid-bg-animated" />
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 glass-strong border-r border-border/40 flex-col z-40 fixed inset-y-0 left-0">
        <div className="p-6 border-b border-border/40">
          <div className="flex items-center gap-2 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
              <ShieldCheck className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">
              ADMIN<span className="text-primary opacity-80">OS</span>
            </span>
          </div>
          
          <div className="mt-6 glass rounded-xl p-4 bg-muted/20 border border-border/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{t("admin.system_status")}</span>
              {state.settings.tradingEnabled && !state.settings.maintenanceMode ? (
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-success bg-success/10 px-2 py-0.5 rounded-full border border-success/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-blink" /> {t("admin.operational")}
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-destructive bg-destructive/10 px-2 py-0.5 rounded-full border border-destructive/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-blink" /> {t("admin.halted")}
                </span>
              )}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">{t("admin.treasury_fees")}</div>
            <div className="font-mono text-lg font-bold text-success">${state.metrics.totalRevenue.toLocaleString()}</div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground px-3 mb-3">
            {t("admin.command_center")}
          </div>
          {adminNavItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive 
                    ? "bg-primary/15 text-primary shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.2)]" 
                    : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <n.icon className={`h-4 w-4 transition-colors ${isActive ? "text-primary" : "group-hover:text-foreground"}`} />
                  {n.label}
                  {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary shadow-glow" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border/40">
          <NavLink
            to="/dashboard"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all"
          >
            <LogOut className="h-4 w-4" /> {t("admin.exit_to_app")}
          </NavLink>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        {/* Admin Header */}
        <header className="sticky top-0 z-30 glass-strong border-b border-border/40 px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:hidden relative h-10 w-10 rounded-xl glass hover:border-primary/40 transition-colors flex items-center justify-center">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="glass-strong border-r border-border/40 p-0 w-[280px]">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-border/40">
                    <div className="flex items-center gap-2 group">
                      <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
                        <ShieldCheck className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
                      </div>
                      <span className="font-display text-xl font-bold tracking-tight">
                        ADMIN<span className="text-primary opacity-80">OS</span>
                      </span>
                    </div>
                  </div>
                  <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                    {adminNavItems.map((n) => (
                      <NavLink
                        key={n.to}
                        to={n.to}
                        className={({ isActive }) =>
                          `group flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                            isActive 
                              ? "bg-primary/15 text-primary shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.2)]" 
                              : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <n.icon className={`h-4 w-4 transition-colors ${isActive ? "text-primary" : "group-hover:text-foreground"}`} />
                            {n.label}
                            {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary shadow-glow" />}
                          </>
                        )}
                      </NavLink>
                    ))}
                  </nav>
                  <div className="p-4 border-t border-border/40">
                    <NavLink
                      to="/dashboard"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-muted/50 transition-all"
                    >
                      <LogOut className="h-4 w-4" /> {t("admin.exit_to_app")}
                    </NavLink>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="hidden md:block font-display text-lg font-semibold tracking-tight">{pageTitle}</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                placeholder={t("admin.search_placeholder")} 
                className="w-full bg-muted/40 border-border/60 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all"
              />
            </div>
            <button className="relative h-10 w-10 rounded-xl glass hover:border-primary/40 transition-colors flex items-center justify-center">
              <Bell className="h-4 w-4" />
              {state.securityLogs.some(l => l.severity === "Critical" || l.severity === "High") && (
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive shadow-[0_0_8px_hsl(var(--destructive))] animate-blink" />
              )}
            </button>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-primary font-display font-bold border border-primary/20">
              <Zap className="h-4 w-4" />
            </div>
          </div>
        </header>

        {/* Global Warning Banner */}
        {(!state.settings.tradingEnabled || state.settings.maintenanceMode) && (
          <div className="bg-destructive/20 border-b border-destructive/40 px-4 py-2 flex items-center justify-center gap-3">
            <ShieldAlert className="h-4 w-4 text-destructive animate-pulse" />
            <span className="text-sm font-semibold text-destructive">
              {t("admin.system_alert")}: {state.settings.maintenanceMode ? t("admin.maintenance_mode") : t("admin.trading_paused")}
            </span>
          </div>
        )}

        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto" key={location.pathname}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
