import { ArrowUpRight } from "lucide-react";

export const DashboardPreview = () => {
  return (
    <section id="trade" className="py-24 md:py-32 relative overflow-hidden">
      <div className="glow-orb h-[500px] w-[500px] bg-primary/15 top-1/2 -right-20" />

      <div className="container relative">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-6">
            <span className="text-xs font-mono uppercase tracking-wider text-secondary">
              Dashboard
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Your wealth,
            <br />
            <span className="text-gradient-primary">at a glance.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A workspace that turns complex markets into clear decisions.
          </p>
        </div>

        {/* Device Mockups */}
        <div className="relative max-w-6xl mx-auto mt-12 flex items-center justify-center">
          <div className="absolute -inset-6 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2rem] blur-3xl opacity-50" />
          
          <div className="relative w-full max-w-4xl aspect-[16/10] z-10 flex items-center justify-center">
            {/* Laptop Mockup */}
            <img 
              src="/laptop_mockup.png" 
              alt="NetFlow Desktop Dashboard" 
              className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl hover:scale-[1.01] transition-transform duration-500"
            />
            
            {/* Phone Mockup overlapping on the right */}
            <img 
              src="/phone_mockup.png" 
              alt="NetFlow Mobile App" 
              className="absolute -right-4 md:-right-12 lg:-right-24 bottom-0 w-[35%] max-w-[280px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 hover:scale-105 hover:-translate-y-2 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
