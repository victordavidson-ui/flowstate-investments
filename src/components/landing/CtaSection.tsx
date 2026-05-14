import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export const CtaSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="container relative">
        <div className="relative max-w-5xl mx-auto rounded-[2rem] overflow-hidden glass-strong p-10 md:p-20 text-center">
          {/* glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[500px] bg-primary/30 rounded-full blur-[120px] animate-glow-pulse" />
          <div className="absolute inset-0 grid-bg opacity-40" />

          <div className="relative">
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              {t("cta.title", "Ready to transform your")}
              <br />
              <span className="text-gradient-primary">{t("cta.title_highlight", "financial future?")}</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10">
              {t("cta.subtitle", "Join 2M+ investors who trust NETFLOW for their digital asset management.")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" className="group" asChild>
                <a href="/signup">
                  {t("cta.button", "Join Now")}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
