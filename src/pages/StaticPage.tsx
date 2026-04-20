import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export type StaticPageProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  sections: { heading: string; body: string; bullets?: string[] }[];
  cta?: { label: string; href: string };
};

export const StaticPage = ({ eyebrow, title, subtitle, sections, cta }: StaticPageProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container max-w-4xl">
          <div className="text-center mb-16 animate-fade-in">
            <span className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-primary mb-4">
              {eyebrow}
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="space-y-6">
            {sections.map((s, i) => (
              <Card key={i} className="glass p-6 md:p-8">
                <h2 className="font-display text-xl md:text-2xl font-semibold mb-3">{s.heading}</h2>
                <p className="text-muted-foreground leading-relaxed">{s.body}</p>
                {s.bullets && (
                  <ul className="mt-4 space-y-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            ))}
          </div>

          {cta && (
            <div className="text-center mt-12">
              <Button variant="hero" size="lg" asChild>
                <a href={cta.href}>
                  {cta.label} <ArrowRight className="h-4 w-4" />
                </a>
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
