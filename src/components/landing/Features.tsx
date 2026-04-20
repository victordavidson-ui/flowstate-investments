import {
  Brain,
  Copy,
  LineChart,
  Repeat,
  ShieldCheck,
  Bell,
  Wallet,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: LineChart,
    title: "Pro-grade charts",
    description: "Candlestick, depth, and volume views with 50+ indicators. Built for speed.",
    accent: "primary",
  },
  {
    icon: Brain,
    title: "AI investment signals",
    description: "Get personalized suggestions powered by real-time market intelligence.",
    accent: "secondary",
  },
  {
    icon: Copy,
    title: "Copy top traders",
    description: "Mirror strategies from verified investors with proven track records.",
    accent: "primary",
  },
  {
    icon: Repeat,
    title: "Auto-invest plans",
    description: "Set daily or weekly recurring buys. Dollar-cost averaging on autopilot.",
    accent: "secondary",
  },
  {
    icon: Wallet,
    title: "Unified portfolio",
    description: "Crypto, stocks, ETFs, and cash — all in one elegant dashboard.",
    accent: "primary",
  },
  {
    icon: ShieldCheck,
    title: "Vault-level security",
    description: "Cold storage, biometric login, and full KYC compliance worldwide.",
    accent: "secondary",
  },
  {
    icon: Bell,
    title: "Smart alerts",
    description: "Price targets, news, and market events delivered the moment they matter.",
    accent: "primary",
  },
  {
    icon: Zap,
    title: "Lightning execution",
    description: "Sub-50ms order routing across global liquidity venues.",
    accent: "secondary",
  },
];

export const Features = () => {
  return (
    <section id="markets" className="py-24 md:py-32 relative">
      <div className="glow-orb h-[400px] w-[400px] bg-secondary/20 top-1/3 -left-20" />

      <div className="container relative">
        <div className="max-w-2xl mx-auto text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-6">
            <span className="text-xs font-mono uppercase tracking-wider text-primary">
              Platform
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Everything you need.
            <br />
            <span className="text-gradient">Nothing you don't.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A complete trading stack designed for clarity, speed, and confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group glass rounded-3xl p-6 hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 glow-border"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl mb-5 transition-all duration-500 ${
                  f.accent === "primary"
                    ? "bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:shadow-glow"
                    : "bg-secondary/10 text-secondary group-hover:bg-secondary/20 group-hover:shadow-glow-violet"
                }`}
              >
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
