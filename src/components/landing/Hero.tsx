import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import heroChart from "@/assets/hero-chart.jpg";

export const Hero = () => {
  return (
    <section className="relative pt-32 md:pt-40 pb-20 md:pb-32 overflow-hidden">
      {/* Background orbs */}
      <div className="glow-orb h-[500px] w-[500px] bg-primary/30 -top-40 -left-40" />
      <div className="glow-orb h-[600px] w-[600px] bg-secondary/30 top-20 -right-40 animate-glow-pulse" />
      <div className="absolute inset-0 grid-bg" />

      <div className="container relative">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-8 animate-fade-in">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">
              AI-powered investing · Now live
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-blink" />
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6 animate-fade-in-up">
            Smart Investing
            <br />
            Starts With{" "}
            <span className="text-gradient-primary inline-block">NETFLOW</span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.15s" }}
          >
            Trade crypto, stocks, and ETFs from one elegant platform.
            Real-time markets, AI insights, and copy trading — built for the next generation of investors.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Button variant="hero" size="xl" className="group">
              Start Investing
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="glass" size="xl" className="group">
              <Play className="h-4 w-4" />
              View Markets
            </Button>
          </div>

          {/* Hero visual */}
          <div
            className="relative mx-auto max-w-5xl animate-scale-in"
            style={{ animationDelay: "0.45s" }}
          >
            <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-3xl blur-3xl opacity-60 animate-glow-pulse" />
            <div className="relative rounded-3xl overflow-hidden glass-strong shadow-elevated">
              <img
                src={heroChart}
                alt="NETFLOW trading dashboard with live candlestick chart"
                width={1536}
                height={1024}
                className="w-full h-auto opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
