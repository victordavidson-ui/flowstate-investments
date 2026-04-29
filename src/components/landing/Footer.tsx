import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

const groups: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Markets", to: "/markets-overview" },
      { label: "Crypto", to: "/crypto" },
      { label: "Stocks", to: "/stocks" },
      { label: "Auto-invest", to: "/auto-invest" },
      { label: "Copy trading", to: "/copy-trading" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Press", to: "/press" },
      { label: "Blog", to: "/blog" },
      { label: "Security", to: "/security" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help center", to: "/help" },
      { label: "API docs", to: "/api" },
      { label: "Status", to: "/status" },
      { label: "Fees", to: "/fees" },
      { label: "Tax center", to: "/tax" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", to: "/terms" },
      { label: "Privacy", to: "/privacy" },
      { label: "Disclosures", to: "/disclosures" },
      { label: "Licenses", to: "/licenses" },
      { label: "Cookies", to: "/cookies" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border/40 pt-20 pb-10 relative">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
          <div className="mb-10 md:mb-0 space-y-4">
          <Link to="/" className="flex items-center gap-2 mb-5">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">
              NET<span className="text-gradient-primary">FLOW</span>
            </span>
          </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Smart investing for the next generation. Trade crypto, stocks, and ETFs from one elegant platform.
            </p>
          </div>
          {groups.map((g) => (
            <div key={g.title}>
              <h5 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
                {g.title}
              </h5>
              <ul className="space-y-3">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-foreground/80 hover:text-primary transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border/40">
          <p className="text-xs text-muted-foreground font-mono">
            © {new Date().getFullYear()} NETFLOW Technologies. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground max-w-2xl text-center md:text-right">
            Investing involves risk. Past performance is not indicative of future results. NETFLOW is a regulated entity.
          </p>
        </div>
      </div>
    </footer>
  );
};
