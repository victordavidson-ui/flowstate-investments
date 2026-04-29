import { Bell, CreditCard, Globe, Key, ShieldCheck, User, HelpCircle, MessageSquare } from "lucide-react";

const groups = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Profile", desc: "Name, email, avatar" },
      { icon: ShieldCheck, label: "KYC & verification", desc: "Tier 2 · Verified" },
      { icon: Key, label: "Security", desc: "Password, 2FA, sessions" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: Bell, label: "Notifications", desc: "Price alerts, news" },
      { icon: Globe, label: "Language & region", desc: "English · USD" },
      { icon: CreditCard, label: "Payment methods", desc: "2 cards · 1 bank" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Help Center", desc: "FAQs and guides" },
      { icon: MessageSquare, label: "Live Chat", desc: "Speak with an agent" },
    ],
  },
];

const SettingsPage = () => {
  return (
    <div className="max-w-3xl space-y-8 animate-fade-in">
      {groups.map((g) => (
        <div key={g.title}>
          <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
            {g.title}
          </h3>
          <div className="glass rounded-3xl divide-y divide-border/40 overflow-hidden">
            {g.items.map((it) => (
              <button
                key={it.label}
                className="w-full flex items-center gap-4 p-5 hover:bg-muted/30 transition-colors text-left"
              >
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <it.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{it.label}</div>
                  <div className="text-xs text-muted-foreground">{it.desc}</div>
                </div>
                <span className="text-muted-foreground">›</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SettingsPage;
