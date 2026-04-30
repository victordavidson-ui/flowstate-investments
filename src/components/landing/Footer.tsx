import { Zap, ChevronUp, Twitter, Github, Linkedin, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const groups: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Markets", to: "/markets-overview" },
      { label: "Crypto Trading", to: "/crypto" },
      { label: "Stock Market", to: "/stocks" },
      { label: "Auto-invest Plans", to: "/auto-invest" },
      { label: "Copy Trading", to: "/copy-trading" },
      { label: "Portfolio Analytics", to: "/dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Netflow", to: "/about" },
      { label: "Our Story", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Press & News", to: "/press" },
      { label: "Official Blog", to: "/blog" },
      { label: "Security First", to: "/security" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help Center", to: "/help" },
      { label: "API Documentation", to: "/api" },
      { label: "System Status", to: "/status" },
      { label: "Fee Schedule", to: "/fees" },
      { label: "Tax Reporting", to: "/tax" },
      { label: "Community", to: "/blog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", to: "/terms" },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Risk Disclosures", to: "/disclosures" },
      { label: "Global Licenses", to: "/licenses" },
      { label: "Cookie Policy", to: "/cookies" },
    ],
  },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border/40 pt-24 pb-12 relative bg-muted/20">
      <div className="container px-4">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-12 mb-20">
          <div className="col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight">
                NET<span className="text-gradient-primary">FLOW</span>
              </span>
            </Link>
            <p className="text-base text-muted-foreground max-w-sm leading-relaxed">
              The next generation of investing. Trade crypto, stocks, and ETFs from one intuitive interface. Built for speed, security, and everyone.
            </p>
            <div className="flex items-center gap-4">
              <SocialLink icon={Twitter} href="#" />
              <SocialLink icon={Github} href="#" />
              <SocialLink icon={Linkedin} href="#" />
              <SocialLink icon={MessageSquare} href="#" />
            </div>
          </div>

          {groups.map((g) => (
            <div key={g.title} className="space-y-6">
              <h5 className="text-xs font-mono uppercase tracking-[0.2em] text-primary font-bold">
                {g.title}
              </h5>
              <ul className="space-y-4">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-muted-foreground hover:text-foreground transition-all flex items-center gap-2 group"
                    >
                      <span className="h-1 w-0 bg-primary group-hover:w-2 transition-all" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-10 border-t border-border/40">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground font-mono">
              © {new Date().getFullYear()} NETFLOW technologies. All rights reserved.
            </p>
            <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest font-mono">
              Secured by bank-grade encryption
            </p>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group"
          >
            Back to Top <ChevronUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <div className="mt-12 p-6 glass rounded-3xl border border-border/40">
          <p className="text-[11px] text-muted-foreground leading-relaxed text-center">
            Investing in digital assets and securities involves significant risk and can result in the loss of your invested capital. 
            Content on this platform is for informational purposes only and does not constitute financial advice. 
            NETFLOW is a licensed and regulated financial services provider. Please read our full Risk Disclosures before trading.
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon: Icon, href }: { icon: any, href: string }) => (
  <a 
    href={href} 
    className="h-10 w-10 rounded-xl bg-muted/40 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border/40 transition-all hover:-translate-y-1"
  >
    <Icon className="h-5 w-5" />
  </a>
);
