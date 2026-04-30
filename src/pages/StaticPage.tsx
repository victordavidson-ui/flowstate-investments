import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export type StaticPageProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  sections: { heading: string; body: string; bullets?: string[] }[];
  cta?: { label: string; href: string };
};

export const StaticPage = ({ eyebrow, title, subtitle, sections, cta }: StaticPageProps) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-primary/5 to-transparent -z-10" />
      <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-glow-pulse" />
      <div className="absolute bottom-[20%] left-[-10%] h-[400px] w-[400px] bg-secondary/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute inset-0 grid-bg opacity-30 -z-10" />

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono uppercase tracking-[0.2em] mb-8 animate-fade-in">
              <Zap className="h-3 w-3" />
              {eyebrow}
            </div>
            <h1 className="font-display text-5xl md:text-8xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/40 leading-[0.9] animate-fade-in-up">
              {title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '200ms' }}>
              {subtitle}
            </p>
          </div>
        </section>

        <div className="container max-w-4xl mx-auto px-4">

          <div className="space-y-8">
            {sections.map((s, i) => (
              <div 
                key={i} 
                className="glass-strong rounded-3xl p-8 md:p-12 border border-border/40 hover:border-primary/20 transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                  <div className="md:w-1/3">
                    <h2 className="font-display text-xl md:text-2xl font-bold leading-tight text-gradient-primary">
                      {s.heading}
                    </h2>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {s.body}
                    </p>
                    {s.bullets && (
                      <ul className="mt-6 space-y-3">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-3 text-sm font-medium">
                            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle2 className="h-3 w-3 text-primary" />
                            </div>
                            <span className="text-foreground/80">{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {cta && (
            <div className="text-center mt-16 animate-fade-in">
              <Button variant="hero" size="lg" className="rounded-2xl px-10 h-14 text-base shadow-glow" asChild>
                <Link to={cta.href}>
                  {cta.label} <ArrowRight className="ml-2 h-5 w-5" />
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
