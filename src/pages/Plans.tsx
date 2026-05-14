import { Check, Star, Zap, Shield, Crown } from "lucide-react";
import { usePortfolio, Plan } from "@/contexts/PortfolioContext";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const PlansPage = () => {
  const { t } = useTranslation();
  const { state, upgradePlan } = usePortfolio();

  const plansData = [
    {
      name: "Starter" as Plan,
      icon: Star,
      roi: "7%",
      minEntry: 500,
      features: [t("plans.f_basic_tools", "Basic Trading Tools"), t("plans.f_std_support", "Standard Support"), t("plans.f_daily_updates", "Daily Market Updates")],
      color: "hsl(220 100% 60%)"
    },
    {
      name: "Basic" as Plan,
      icon: Zap,
      roi: "15%",
      minEntry: 2500,
      features: [t("plans.f_adv_tools", "Advanced Trading Tools"), t("plans.f_prio_support", "Priority Support"), t("plans.f_weekly_calls", "Weekly Strategy Calls"), t("plans.f_lower_fees", "Lower Fees")],
      color: "hsl(152 80% 50%)",
      popular: true
    },
    {
      name: "Premium" as Plan,
      icon: Shield,
      roi: "30%",
      minEntry: 10000,
      features: [t("plans.f_pro_algo", "Pro Trading Algorithms"), t("plans.f_dedi_manager", "24/7 Dedicated Manager"), t("plans.f_zero_fees", "Zero Trade Fees"), t("plans.f_vip_events", "VIP Events")],
      color: "hsl(280 80% 60%)"
    },
    {
      name: "Elite" as Plan,
      icon: Crown,
      roi: "55%",
      minEntry: 50000,
      features: [t("plans.f_inst_liq", "Institutional Liquidity"), t("plans.f_custom_models", "Custom Built Models"), t("plans.f_concierge", "Concierge Service"), t("plans.f_tax_plan", "Tax Planning")],
      color: "hsl(38 100% 55%)"
    }
  ];

  const handleUpgrade = (plan: Plan, cost: number) => {
    if (state.balanceUSD < cost) {
      toast.error(t("errors.insufficient_funds_plan", { cost: cost.toLocaleString(), plan }));
      return;
    }
    upgradePlan(plan, cost);
    toast.success(t("messages.plan_upgraded", { plan }));
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="text-center max-w-2xl mx-auto pt-6">
        <h2 className="text-4xl font-display font-bold mb-4">{t('plans.title')}</h2>
        <p className="text-muted-foreground">{t('plans.subtitle')}</p>
        
        {state.plan !== "None" && (
          <div className="mt-6 inline-block glass px-4 py-2 rounded-full border-primary/30 text-sm font-medium">
            {t('plans.current')}: <span className="text-primary">{state.plan}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 px-2">
        {plansData.map((plan) => (
          <div 
            key={plan.name} 
            className={`relative glass rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated flex flex-col ${
              plan.popular ? "border-primary/50 shadow-[0_0_30px_hsl(var(--primary)/0.15)] scale-[1.02]" : "border-border/50"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 inset-x-0 flex justify-center">
                <span className="bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {t('plans.popular')}
                </span>
              </div>
            )}
            
            <div className="mb-6 flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl flex items-center justify-center bg-muted/50" style={{ color: plan.color }}>
                <plan.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">{plan.name}</h3>
                <div className="text-sm font-semibold" style={{ color: plan.color }}>{plan.roi} ROI</div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-mono mb-1">{t('plans.min_entry')}</div>
              <div className="font-display text-3xl font-bold">
                ${plan.minEntry.toLocaleString()}
              </div>
            </div>

            <div className="space-y-3 mb-8 flex-1">
              {plan.features.map(f => (
                <div key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" style={{ color: plan.color }} />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleUpgrade(plan.name, plan.minEntry)}
              disabled={state.plan === plan.name}
              className="w-full py-3 rounded-xl font-semibold transition-all text-sm mt-auto"
              style={{
                backgroundColor: state.plan === plan.name ? "hsl(var(--muted))" : `${plan.color}20`,
                color: state.plan === plan.name ? "hsl(var(--muted-foreground))" : plan.color,
                border: `1px solid ${state.plan === plan.name ? "transparent" : `${plan.color}40`}`
              }}
            >
              {state.plan === plan.name ? t('plans.current') : t('plans.select')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlansPage;
