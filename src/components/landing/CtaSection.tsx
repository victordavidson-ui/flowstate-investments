import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CtaSection = () => {
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
              Your portfolio,
              <br />
              <span className="text-gradient-primary">unleashed.</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10">
              Join 2.4M+ investors building wealth on NETFLOW. Get started in under 60 seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" className="group">
                Create your account
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="glass" size="xl">
                Talk to sales
              </Button>
            </div>
            <p className="text-xs text-muted-foreground font-mono mt-8">
              No credit card required · KYC in minutes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
