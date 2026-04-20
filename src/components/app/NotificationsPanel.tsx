import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ArrowDownLeft, ArrowUpRight, Bell, TrendingDown, TrendingUp, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Notif = {
  id: string;
  type: "alert" | "price" | "tx";
  title: string;
  desc: string;
  time: string;
  group: "Today" | "Earlier";
  positive?: boolean;
};

const notifications: Notif[] = [
  { id: "1", type: "alert", title: "BTC volatility spike", desc: "Bitcoin moved 4.2% in the last hour.", time: "2m ago", group: "Today" },
  { id: "2", type: "price", title: "ETH crossed $3,500", desc: "Your price alert was triggered.", time: "18m ago", group: "Today", positive: true },
  { id: "3", type: "tx", title: "Deposit received", desc: "+$2,500.00 USD to wallet", time: "1h ago", group: "Today", positive: true },
  { id: "4", type: "price", title: "SOL dropped below $140", desc: "Watchlist alert triggered.", time: "3h ago", group: "Today", positive: false },
  { id: "5", type: "tx", title: "Withdrawal complete", desc: "-0.0125 BTC to external wallet", time: "Yesterday", group: "Earlier" },
  { id: "6", type: "alert", title: "New market: ARB/USD", desc: "Arbitrum is now available to trade.", time: "2 days ago", group: "Earlier" },
  { id: "7", type: "tx", title: "Auto-invest executed", desc: "Bought $50 of ETH (weekly plan)", time: "3 days ago", group: "Earlier", positive: true },
];

const iconFor = (n: Notif) => {
  if (n.type === "alert") return <Zap className="h-4 w-4 text-secondary" />;
  if (n.type === "price")
    return n.positive ? (
      <TrendingUp className="h-4 w-4 text-success" />
    ) : (
      <TrendingDown className="h-4 w-4 text-destructive" />
    );
  return n.positive ? (
    <ArrowDownLeft className="h-4 w-4 text-success" />
  ) : (
    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
  );
};

export const NotificationsPanel = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) => {
  const groups: ("Today" | "Earlier")[] = ["Today", "Earlier"];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="glass-strong border-l border-border/40 w-full sm:max-w-md p-0">
        <SheetHeader className="p-6 border-b border-border/40">
          <SheetTitle className="flex items-center gap-2 font-display">
            <Bell className="h-4 w-4 text-primary" />
            Notifications
            <Badge variant="secondary" className="ml-auto bg-primary/10 text-primary border-primary/20">
              {notifications.length} new
            </Badge>
          </SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto h-[calc(100vh-5rem)] p-4 space-y-6">
          {groups.map((g) => {
            const items = notifications.filter((n) => n.group === g);
            if (!items.length) return null;
            return (
              <div key={g}>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground px-2 mb-2">
                  {g}
                </div>
                <div className="space-y-2">
                  {items.map((n) => (
                    <div
                      key={n.id}
                      className="glass rounded-xl p-3 flex gap-3 hover:border-primary/40 transition-all cursor-pointer"
                    >
                      <div className="h-9 w-9 rounded-lg bg-muted/40 flex items-center justify-center shrink-0">
                        {iconFor(n)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold truncate">{n.title}</p>
                          <span className="text-[10px] text-muted-foreground font-mono shrink-0">
                            {n.time}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{n.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};
