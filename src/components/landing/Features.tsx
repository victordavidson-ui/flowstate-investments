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
import { useTranslation } from "react-i18next";

export const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: LineChart,
      title: t("features.f1_title", "AI Portfolios"),
      description: t("features.f1_desc", "Smart algorithms that rebalance your holdings automatically based on market conditions."),
      accent: "primary",
    },
    {
      icon: Zap,
      title: t("features.f2_title", "Zero Commission"),
      description: t("features.f2_desc", "Trade thousands of assets with zero fees. We believe in accessible investing for everyone."),
      accent: "secondary",
    },
    {
      icon: Copy,
      title: t("features.f3_title", "Copy Trading"),
      description: t("features.f3_desc", "Automatically follow the trades of top-performing investors in our community."),
      accent: "primary",
    },
    {
      icon: ShieldCheck,
      title: t("features.f4_title", "Bank-Grade Security"),
      description: t("features.f4_desc", "Your assets are protected by multi-sig cold storage and state-of-the-art encryption."),
      accent: "secondary",
    },
  ];

  return (
    <section id="markets" className="py-24 md:py-32 relative">
      <div className="glow-orb h-[400px] w-[400px] bg-secondary/20 top-1/3 -left-20" />

      <div className="container relative">
        <div className="max-w-2xl mx-auto text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-6">
            <span className="text-xs font-mono uppercase tracking-wider text-primary">
              {t("nav.markets", "Platform")}
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            {t("features.title", "Built for the")}
            <br />
            <span className="text-gradient">{t("features.title_highlight", "Modern Investor")}</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("features.subtitle", "Everything you need to grow your wealth in the digital age, all in one place.")}
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
