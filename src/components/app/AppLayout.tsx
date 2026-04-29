import { useState } from "react";
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
} from "lucide-react";
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

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/markets", label: "Markets", icon: LineChart },
  { to: "/trade", label: "Trade", icon: CandlestickChart },
  { to: "/wallet", label: "Wallet", icon: Wallet },
  { to: "/copy", label: "Copy", icon: Users },
  { to: "/earn", label: "Earn", icon: Repeat },
  { to: "/plans", label: "Plans", icon: Crown },
  { to: "/referrals", label: "Referrals", icon: Gift },
  { to: "/support", label: "Support", icon: HelpCircle },
  { to: "/settings", label: "Settings", icon: Settings },
];

const mobileFooterItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/markets", label: "Markets", icon: LineChart },
  { to: "/trade", label: "Trade", icon: CandlestickChart },
  { to: "/wallet", label: "Wallet", icon: Wallet },
  { to: "/settings", label: "Settings", icon: Settings },
];

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
  const location = useLocation();
  const [notifOpen, setNotifOpen] = useState(false);
  const pageTitle =
    navItems.find((n) => location.pathname.startsWith(n.to))?.label ?? "Dashboard";

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="grid-bg-animated" />
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
            Platform
          </div>
          {navItems.map((n) => (
            <SidebarLink key={n.to} to={n.to} label={n.label} Icon={n.icon} />
          ))}
        </nav>

        <div className="p-4 space-y-3">
          <div className="glass rounded-2xl p-4 relative overflow-hidden">
            <div className="absolute -top-8 -right-8 h-24 w-24 bg-primary/20 rounded-full blur-2xl" />
            <ShieldCheck className="h-5 w-5 text-primary mb-2" />
            <p className="text-sm font-semibold mb-1">Verify identity</p>
            <p className="text-xs text-muted-foreground mb-3">
              Unlock higher limits
            </p>
            <Button variant="hero" size="sm" className="w-full" asChild>
              <NavLink to="/kyc">Start KYC</NavLink>
            </Button>
          </div>
          <button className="flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all">
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-64">
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
            <div className="flex-1 max-w-md ml-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search markets, assets…"
                  className="pl-9 bg-muted/40 border-border/60 focus-visible:ring-primary/40"
                />
              </div>
            </div>
            <button
              type="button"
              aria-label="Open notifications"
              onClick={() => setNotifOpen(true)}
              className="relative h-10 w-10 rounded-xl glass hover:border-primary/40 transition-colors hidden md:flex items-center justify-center"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary shadow-glow animate-blink" />
            </button>
            <div className="hidden md:flex h-10 w-10 rounded-xl bg-gradient-primary items-center justify-center text-primary-foreground font-display font-bold shadow-glow">
              A
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
                        Platform
                      </div>
                      {navItems.map((n) => (
                        <SidebarLink key={n.to} to={n.to} label={n.label} Icon={n.icon} />
                      ))}
                    </nav>
                    <div className="p-4 border-t border-border/40">
                      <button className="flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all">
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8 pb-28 lg:pb-8">
          <div key={location.pathname} className="animate-fade-in-up">
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
            <DropdownMenuItem className="gap-3 py-3 cursor-pointer">
              <Plus className="h-4 w-4 text-primary" />
              <span>Deposit</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 py-3 cursor-pointer">
              <ArrowDownToLine className="h-4 w-4 text-primary" />
              <span>Withdraw</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 py-3 cursor-pointer">
              <Repeat className="h-4 w-4 text-primary" />
              <span>Trade</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 py-3 cursor-pointer">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span>Earn</span>
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

      {/* Floating 24/7 Support Widget */}
      <div className="fixed bottom-6 right-6 z-50 hidden lg:block">
        <button 
          onClick={() => {
            const el = document.getElementById("support-chat-toast");
            if (!el) {
              import("sonner").then(({ toast }) => {
                toast.info("Connecting to Support Agent...", { id: "support-chat-toast" });
              });
            }
          }}
          className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
        >
          <HelpCircle className="h-6 w-6 group-hover:hidden" />
          <span className="hidden group-hover:block font-bold text-xs">Chat</span>
        </button>
      </div>

      <NotificationsPanel open={notifOpen} onOpenChange={setNotifOpen} />
    </div>
  );
};
