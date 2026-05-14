import { useState, useMemo } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  LineChart,
  Wallet,
  CandlestickChart,
  Settings,
  Bell,
  Search,
  Zap,
  ShieldCheck,
  LogOut,
  Users,
  Repeat,
  Plus,
  ArrowDownToLine,
  TrendingUp,
  Crown,
  Gift,
  HelpCircle,
  Menu,
  X,
  Globe,
  Coins,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NotificationsPanel } from "./NotificationsPanel";
import { LiveChat } from "./LiveChat";

const SidebarLink = ({
  to,
  label,
  Icon,
}: {
  to: string;
  label: string;
  Icon: typeof LayoutDashboard;
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 ${
        isActive
          ? "bg-primary/10 text-primary shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.2)]"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
      }`
    }
  >
    {({ isActive }) => (
      <>
        <Icon
          className={`h-4 w-4 transition-colors ${
            isActive ? "text-primary" : "group-hover:text-foreground"
          }`}
        />
        {label}
        {isActive && (
          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary shadow-glow" />
        )}
      </>
    )}
  </NavLink>
);

const MobileNavItem = ({
  to,
  label,
  Icon,
}: {
  to: string;
  label: string;
  Icon: typeof LayoutDashboard;
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-colors ${
        isActive ? "text-primary" : "text-muted-foreground"
      }`
    }
  >
    {({ isActive }) => (
      <>
        <div
          className={`relative ${
            isActive ? "drop-shadow-[0_0_8px_hsl(var(--primary))]" : ""
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-[10px] font-medium">{label}</span>
      </>
    )}
  </NavLink>
);

export const AppLayout = () => {
  const { t, i18n } = useTranslation();
  const { currency, setCurrency } = useCurrency();
  const location = useLocation();
  const [notifOpen, setNotifOpen] = useState(false);
  const { user, logout } = useAuth();

  const navItems = [
    { to: "/dashboard", label: t('nav.dashboard', "Dashboard"), icon: LayoutDashboard },
    { to: "/markets", label: t('nav.markets', "Markets"), icon: LineChart },
    { to: "/trade", label: t('nav.trade', "Trade"), icon: CandlestickChart },
    { to: "/wallet", label: t('nav.wallet', "Wallet"), icon: Wallet },
    { to: "/copy", label: t('nav.copy', "Copy"), icon: Users },
    { to: "/earn", label: t('nav.earn', "Earn"), icon: Repeat },
    { to: "/plans", label: t('nav.plans', "Plans"), icon: Crown },
    { to: "/referrals", label: t('nav.referrals', "Referrals"), icon: Gift },
    { to: "/support", label: t('nav.support', "Support"), icon: HelpCircle },
    { to: "/settings", label: t('nav.settings', "Settings"), icon: Settings },
  ];

  const mobileFooterItems = [
    { to: "/dashboard", label: t('nav.dashboard', "Dash"), icon: LayoutDashboard },
    { to: "/markets", label: t('nav.markets', "Markets"), icon: LineChart },
    { to: "/trade", label: t('nav.trade', "Trade"), icon: CandlestickChart },
    { to: "/wallet", label: t('nav.wallet', "Wallet"), icon: Wallet },
    { to: "/settings", label: t('nav.settings', "Settings"), icon: Settings },
  ];

  const pageTitle =
    navItems.find((n) => location.pathname.startsWith(n.to))?.label ?? t('nav.dashboard', "Dashboard");

  const toggleLanguage = () => {
    const current = i18n.language || 'en';
    const nextLang = current.startsWith('en') ? 'es' : current.startsWith('es') ? 'fr' : 'en';
    i18n.changeLanguage(nextLang);
  };

  const toggleCurrency = () => {
    const currencies: ('USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'NGN' | 'ZAR')[] = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'NGN', 'ZAR'];
    const nextIdx = (currencies.indexOf(currency) + 1) % currencies.length;
    setCurrency(currencies[nextIdx]);
  };

  return (
    <div className="min-h-screen bg-background relative flex flex-col w-full overflow-x-hidden">
      <div className="grid-bg-animated" />
      
      {user?.kycStatus === 'unverified' && (
        <div className="relative z-50 bg-primary/10 border-b border-primary/20 py-2 px-4 animate-fade-in">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[10px] md:text-xs font-medium text-primary">
              <ShieldCheck className="h-3 w-3 md:h-4 md:4" />
              <span>{t("common.kyc_msg")}</span>
            </div>
            <NavLink 
              to="/settings" 
              className="text-[10px] md:text-xs font-bold uppercase tracking-wider bg-primary text-primary-foreground px-3 py-1 rounded-full hover:shadow-glow transition-all"
            >
              {t("common.verify_now")}
            </NavLink>
          </div>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col glass-strong border-r border-border/40 z-40">
        <div className="p-6">
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Zap className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">
              NET<span className="text-gradient-primary">FLOW</span>
            </span>
          </NavLink>
        </div>

        <nav className="px-4 flex-1 space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground px-3 mb-2">
            {t("common.platform")}
          </div>
          {navItems.map((n) => (
            <SidebarLink key={n.to} to={n.to} label={n.label} Icon={n.icon} />
          ))}
        </nav>

        <div className="p-4 space-y-3">
          <div className="glass rounded-2xl p-4 relative overflow-hidden">
            <div className="absolute -top-8 -right-8 h-24 w-24 bg-primary/20 rounded-full blur-2xl" />
            <ShieldCheck className="h-5 w-5 text-primary mb-2" />
            <p className="text-sm font-semibold mb-1">{t("common.kyc_title")}</p>
            <p className="text-xs text-muted-foreground mb-3">
              {t("common.kyc_desc")}
            </p>
            <Button variant="hero" size="sm" className="w-full" asChild>
              <NavLink to="/kyc">{t("common.start_kyc")}</NavLink>
            </Button>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all"
          >
            <LogOut className="h-4 w-4" />
            {t("common.sign_out")}
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 w-full lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 glass-strong border-b border-border/40">
          <div className="flex items-center gap-3 px-4 md:px-8 h-16">
            <NavLink to="/" className="lg:hidden flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
                <Zap className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
              </div>
            </NavLink>
            <h1 className="hidden md:block font-display text-lg font-semibold">
              {pageTitle}
            </h1>
            <div className="flex-1 max-w-md ml-auto hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("common.search")}
                  className="pl-9 bg-muted/40 border-border/60 focus-visible:ring-primary/40"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button 
                onClick={toggleLanguage}
                className="h-10 px-3 rounded-xl glass hover:border-primary/40 transition-colors flex items-center gap-2 text-[10px] font-mono uppercase"
              >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{i18n.language?.substring(0, 2) || 'en'}</span>
              </button>
              <button 
                onClick={toggleCurrency}
                className="h-10 px-3 rounded-xl glass hover:border-primary/40 transition-colors flex items-center gap-2 text-[10px] font-mono uppercase"
              >
                <Coins className="h-4 w-4" />
                <span className="hidden sm:inline">{currency}</span>
              </button>
              <button
                type="button"
                aria-label="Open notifications"
                onClick={() => setNotifOpen(true)}
                className="relative h-10 w-10 rounded-xl glass hover:border-primary/40 transition-colors flex items-center justify-center"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary shadow-glow animate-blink" />
              </button>
              <div className="flex h-10 w-10 rounded-xl bg-gradient-primary items-center justify-center text-primary-foreground font-display font-bold shadow-glow">
                {user?.firstName?.charAt(0) || 'A'}
              </div>
              {/* Mobile Hamburger Menu */}
              <div className="lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="relative h-10 w-10 rounded-xl glass hover:border-primary/40 transition-colors flex items-center justify-center">
                      <Menu className="h-5 w-5" />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="glass-strong border-l border-border/40 p-0 w-[280px]">
                    <div className="flex flex-col h-full">
                      <div className="p-6">
                        <div className="flex items-center gap-2">
                          <div className="h-9 w-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                            <Zap className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
                          </div>
                          <span className="font-display text-xl font-bold tracking-tight">
                            NET<span className="text-gradient-primary">FLOW</span>
                          </span>
                        </div>
                      </div>
                      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground px-3 mb-2 mt-4">
                          {t("common.platform")}
                        </div>
                        {navItems.map((n) => (
                          <SidebarLink key={n.to} to={n.to} label={n.label} Icon={n.icon} />
                        ))}
                      </nav>
                      <div className="p-4 border-t border-border/40">
                        <button onClick={logout} className="flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all">
                          <LogOut className="h-4 w-4" />
                          {t("common.sign_out")}
                        </button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 pb-32 lg:pb-8 overflow-y-auto overflow-x-hidden w-full flex flex-col items-center">
          <div key={location.pathname} className="animate-fade-in-up w-full max-w-7xl mx-auto flex-1">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Floating Action Button (Mobile) */}
      <div className="lg:hidden fixed bottom-24 right-4 z-40">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-glow flex items-center justify-center active:scale-95 transition-all">
              <Plus className="h-6 w-6" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass-strong border-border/40 mb-2 w-48">
            <DropdownMenuItem className="gap-3 py-3 cursor-pointer" asChild>
              <NavLink to="/wallet">
                <Plus className="h-4 w-4 text-primary" />
                <span>{t("common.deposit")}</span>
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 py-3 cursor-pointer" asChild>
              <NavLink to="/wallet">
                <ArrowDownToLine className="h-4 w-4 text-primary" />
                <span>{t("common.withdraw")}</span>
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 py-3 cursor-pointer" asChild>
              <NavLink to="/trade">
                <Repeat className="h-4 w-4 text-primary" />
                <span>{t("common.trade")}</span>
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 py-3 cursor-pointer" asChild>
              <NavLink to="/earn">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span>{t("common.earn")}</span>
              </NavLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 glass-strong border-t border-border/40">
        <div className="flex items-stretch pb-[env(safe-area-inset-bottom)] overflow-x-auto">
          {mobileFooterItems.map((n) => (
            <MobileNavItem key={n.to} to={n.to} label={n.label} Icon={n.icon} />
          ))}
        </div>
      </nav>

      <LiveChat />

      <NotificationsPanel open={notifOpen} onOpenChange={setNotifOpen} />
      </div>
    </div>
  );
};
