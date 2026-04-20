import { Zap } from "lucide-react";

const groups = [
  {
    title: "Product",
    links: ["Markets", "Crypto", "Stocks", "Auto-invest", "Copy trading"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Blog", "Security"],
  },
  {
    title: "Resources",
    links: ["Help center", "API docs", "Status", "Fees", "Tax center"],
  },
  {
    title: "Legal",
    links: ["Terms", "Privacy", "Disclosures", "Licenses", "Cookies"],
  },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border/40 pt-20 pb-10 relative">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2 mb-5">
              <div className="h-9 w-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <Zap className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <span className="font-display text-xl font-bold">
                NET<span className="text-gradient-primary">FLOW</span>
              </span>
            </a>
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
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-foreground/80 hover:text-primary transition-colors"
                    >
                      {l}
                    </a>
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
