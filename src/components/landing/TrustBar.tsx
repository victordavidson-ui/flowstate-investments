import { Users, Shield, TrendingUp, Globe } from "lucide-react";

const stats = [
  { icon: Users, value: "2.4M+", label: "Active investors" },
  { icon: TrendingUp, value: "$18B", label: "Trading volume" },
  { icon: Shield, value: "ISO 27001", label: "Bank-grade security" },
  { icon: Globe, value: "120+", label: "Countries served" },
];

export const TrustBar = () => {
  return (
    <section className="py-16 md:py-20 border-y border-border/40 relative">
      <div className="container">
        <p className="text-center text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-10">
          Trusted by investors worldwide
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="text-center group animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl glass mb-4 group-hover:shadow-glow transition-all duration-500">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="font-display text-3xl md:text-4xl font-bold text-gradient mb-1">
                {s.value}
              </div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
