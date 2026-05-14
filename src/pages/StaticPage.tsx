import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export type StaticPageProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  sections: { heading: string; body: string; bullets?: string[] }[];
  cta?: { label: string; href: string };
  keyPrefix?: string;
};

export const StaticPage = ({ eyebrow, title, subtitle, sections, cta, keyPrefix }: StaticPageProps) => {
  const { t } = useTranslation();

  // If keyPrefix is provided, use it to lookup translations
  const localizedEyebrow = keyPrefix ? t(`${keyPrefix}.eyebrow`, eyebrow) : eyebrow;
  const localizedTitle = keyPrefix ? t(`${keyPrefix}.title`, title) : title;
  const localizedSubtitle = keyPrefix ? t(`${keyPrefix}.subtitle`, subtitle) : subtitle;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-[800px] bg-gradient-to-b from-primary/10 via-background to-transparent -z-10" />
      <div className="absolute top-[-10%] right-[-10%] h-[600px] w-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse duration-[10s]" />
      <div className="absolute top-[20%] left-[-5%] h-[400px] w-[400px] bg-secondary/10 rounded-full blur-[100px] -z-10 animate-float" />
      <div className="absolute inset-0 grid-bg opacity-20 -z-10" />

      <Navbar />
      
      <main className="pb-20">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-gradient-to-b from-primary/10 via-transparent to-transparent opacity-50" />
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] animate-glow-pulse" />
            <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[80px]" />
          </div>
          
          <div className="container max-w-5xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-[0.3em] mb-10 animate-fade-in shadow-[0_0_15px_hsl(var(--primary)/0.15)]">
              <Zap className="h-3.5 w-3.5" />
              {localizedEyebrow}
            </div>
            <h1 className="font-display text-6xl md:text-9xl font-black tracking-tighter mb-10 leading-[0.85] animate-fade-in-up">
              <span className="block bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">{localizedTitle}</span>
            </h1>
            <p className="text-xl md:text-3xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed animate-fade-in font-medium tracking-tight" style={{ animationDelay: '200ms' }}>
              {localizedSubtitle}
            </p>
          </div>
        </section>

        <div className="container max-w-4xl mx-auto px-4">
          <div className="space-y-8">
            {sections.map((s, i) => {
              const localizedHeading = keyPrefix ? t(`${keyPrefix}.section${i}.heading`, s.heading) : s.heading;
              const localizedBody = keyPrefix ? t(`${keyPrefix}.section${i}.body`, s.body) : s.body;

              return (
                <div 
                  key={i} 
                  className="glass-strong rounded-3xl p-8 md:p-12 border border-border/40 hover:border-primary/20 transition-all duration-500 animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                    <div className="md:w-1/3">
                      <h2 className="font-display text-xl md:text-2xl font-bold leading-tight text-gradient-primary">
                        {localizedHeading}
                      </h2>
                    </div>
                    <div className="md:w-2/3">
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                        {localizedBody}
                      </p>
                      {s.bullets && (
                        <ul className="mt-6 space-y-3">
                          {s.bullets.map((b, bi) => {
                            const localizedBullet = keyPrefix ? t(`${keyPrefix}.section${i}.bullet${bi}`, b) : b;
                            return (
                              <li key={bi} className="flex items-start gap-3 text-sm font-medium">
                                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                  <CheckCircle2 className="h-3 w-3 text-primary" />
                                </div>
                                <span className="text-foreground/80">{localizedBullet}</span>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {cta && (
            <div className="text-center mt-16 animate-fade-in">
              <Button variant="hero" size="lg" className="rounded-2xl px-10 h-14 text-base shadow-glow" asChild>
                <Link to={cta.href}>
                  {keyPrefix ? t(`${keyPrefix}.cta`, cta.label) : cta.label} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StaticPage;
