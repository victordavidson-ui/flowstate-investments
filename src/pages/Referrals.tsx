import { Copy, Users, DollarSign, TrendingUp, Gift } from "lucide-react";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const ReferralsPage = () => {
  const { t } = useTranslation();
  const { state } = usePortfolio();

  const referralLink = "https://netflow.invest/ref/victor2024";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success(t('referrals.copied'));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass rounded-3xl p-6 md:p-10 relative overflow-hidden text-center">
        <div className="absolute -top-40 -right-40 h-80 w-80 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 bg-secondary/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 border border-primary/20 mb-6 text-primary">
            <Gift className="h-8 w-8" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">{t('referrals.title')}</h2>
          <p className="text-muted-foreground text-lg mb-8">
            {t('referrals.subtitle')}
          </p>
          
          <div className="glass-strong rounded-2xl p-4 flex items-center gap-3 border border-border/60 max-w-lg mx-auto">
            <div className="flex-1 text-sm font-mono text-muted-foreground text-left truncate px-2 select-all">
              {referralLink}
            </div>
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 px-5 py-2.5 text-sm font-semibold transition-all active:scale-95 shrink-0"
            >
              <Copy className="h-4 w-4" /> {t('referrals.copy_link')}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="glass rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
            <Users className="h-24 w-24 text-primary -mr-8 -mt-8" />
          </div>
          <div className="relative z-10">
            <div className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-2">{t('referrals.total')}</div>
            <div className="font-display text-4xl font-bold">{state.referrals}</div>
          </div>
        </div>

        <div className="glass rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
            <TrendingUp className="h-24 w-24 text-success -mr-8 -mt-8" />
          </div>
          <div className="relative z-10">
            <div className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-2">{t('referrals.active')}</div>
            <div className="font-display text-4xl font-bold">{Math.floor(state.referrals * 0.4)}</div>
          </div>
        </div>

        <div className="glass rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
            <DollarSign className="h-24 w-24 text-warning -mr-8 -mt-8" />
          </div>
          <div className="relative z-10">
            <div className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-2">{t('referrals.commissions')}</div>
            <div className="font-display text-4xl font-bold text-warning">${state.commissions.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="glass rounded-3xl p-6">
        <h3 className="font-display text-lg font-semibold mb-5">{t('referrals.how_it_works')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold mb-3">1</div>
            <h4 className="font-semibold">{t('referrals.step1_title')}</h4>
            <p className="text-sm text-muted-foreground">{t('referrals.step1_desc')}</p>
          </div>
          <div className="space-y-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold mb-3">2</div>
            <h4 className="font-semibold">{t('referrals.step2_title')}</h4>
            <p className="text-sm text-muted-foreground">{t('referrals.step2_desc')}</p>
          </div>
          <div className="space-y-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold mb-3">3</div>
            <h4 className="font-semibold">{t('referrals.step3_title')}</h4>
            <p className="text-sm text-muted-foreground">{t('referrals.step3_desc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralsPage;
