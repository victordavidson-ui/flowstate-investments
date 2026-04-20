import { Button } from "@/components/ui/button";
import { Menu, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container">
        <nav
          className={`flex items-center justify-between rounded-2xl px-4 md:px-6 py-3 transition-all duration-500 ${
            scrolled ? "glass-strong shadow-elevated" : "bg-transparent"
          }`}
        >
          <a href="#" className="flex items-center gap-2 group">
            <div className="relative h-9 w-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:shadow-glow-violet transition-all duration-500">
              <Zap className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">
              NET<span className="text-gradient-primary">FLOW</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {["Markets", "Trade", "Earn", "Company"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-primary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden md:inline-flex text-muted-foreground hover:text-foreground" asChild>
              <a href="/login">Sign in</a>
            </Button>
            <Button variant="hero" size="sm" asChild>
              <a href="/signup">Get started</a>
            </Button>
            <button className="md:hidden p-2 text-foreground">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
