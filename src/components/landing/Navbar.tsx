import { Button } from "@/components/ui/button";
import { Menu, X, Zap, Globe, Coins } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCurrency } from "@/contexts/CurrencyContext";

export const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { currency, setCurrency } = useCurrency();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const sectionLinks = [
    { label: t('nav.markets', 'Markets'), to: "/markets-overview" },
    { label: t('nav.trade', 'Trade'), to: "/crypto" },
    { label: t('nav.earn', 'Earn'), to: "/auto-invest" },
    { label: t('nav.about', 'About'), to: "/about" },
  ];

  const toggleLanguage = () => {
    const current = i18n.language || 'en';
    const nextLang = current.startsWith('en') ? 'es' : current.startsWith('es') ? 'fr' : 'en';
    i18n.changeLanguage(nextLang);
  };

  const toggleCurrency = () => {
    const currencies: ('USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'NGN' | 'ZAR')[] = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'NGN', 'ZAR'];
    const nextIdx = (currencies.indexOf(currency) + 1) % currencies.length;
    setCurrency(currencies[nextIdx]);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled || open ? "py-3" : "py-5"
      }`}
    >
      <div className="container">
        <nav
          className={`flex items-center justify-between rounded-2xl px-4 md:px-6 py-3 transition-all duration-500 ${
            scrolled || open ? "glass-strong shadow-elevated" : "bg-transparent"
          }`}
        >
          <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
            <div className="relative h-9 w-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:shadow-glow-violet transition-all duration-500">
              <Zap className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">
              NET<span className="text-gradient-primary">FLOW</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {sectionLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={toggleLanguage}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/40 rounded-lg transition-colors flex items-center gap-1 text-xs font-mono uppercase"
              title="Change Language"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden md:inline">{i18n.language?.substring(0, 2) || 'en'}</span>
            </button>
            <button 
              onClick={toggleCurrency}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/40 rounded-lg transition-colors flex items-center gap-1 text-xs font-mono uppercase"
              title="Change Currency"
            >
              <Coins className="h-4 w-4" />
              <span className="hidden md:inline">{currency}</span>
            </button>
            <Button variant="ghost" size="sm" className="hidden md:inline-flex text-muted-foreground hover:text-foreground" asChild>
              <Link to="/login">{t('nav.login', 'Sign in')}</Link>
            </Button>
            <Button variant="hero" size="sm" asChild>
              <Link to="/signup">{t('nav.signup', 'Get started')}</Link>
            </Button>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="md:hidden p-2 text-foreground rounded-lg hover:bg-muted/40 transition-colors"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden mt-2 glass-strong rounded-2xl p-4 animate-fade-in shadow-elevated">
            <div className="flex flex-col gap-1">
              {sectionLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 rounded-xl text-sm font-medium text-foreground/90 hover:bg-muted/40 hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="h-px bg-border/40 my-2" />
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted/40 hover:text-foreground transition-colors"
              >
                {t('nav.login', 'Sign in')}
              </Link>
              <Button variant="hero" size="sm" className="mt-1" asChild>
                <Link to="/signup" onClick={() => setOpen(false)}>
                  {t('nav.signup', 'Get started')}
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
