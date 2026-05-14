import { Zap, ChevronUp, Twitter, Github, Linkedin, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  const groups: { title: string; links: { label: string; to: string }[] }[] = [
    {
      title: t("footer.platform", "Platform"),
      links: [
        { label: t("nav.markets"), to: "/markets" },
        { label: t("nav.trade"), to: "/trade" },
        { label: t("nav.copy"), to: "/copy" },
        { label: t("nav.dashboard"), to: "/dashboard" },
      ],
    },
    {
      title: t("footer.company", "Company"),
      links: [
        { label: t("nav.about"), to: "/about" },
        { label: t("footer.blog", "Blog"), to: "/blog" },
        { label: t("footer.careers", "Careers"), to: "/careers" },
        { label: t("footer.press", "Press"), to: "/press" },
      ],
    },
    {
      title: t("footer.legal", "Legal"),
      links: [
        { label: t("footer.terms", "Terms"), to: "/terms" },
        { label: t("footer.privacy", "Privacy"), to: "/privacy" },
        { label: t("footer.licenses", "Licenses"), to: "/licenses" },
        { label: t("footer.cookies", "Cookies"), to: "/cookies" },
      ],
    },
  ];

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
              {t("footer.desc", "Netflow is the world's most advanced multi-asset investment platform, powered by AI and community insights.")}
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
              © {new Date().getFullYear()} NETFLOW. {t("footer.all_rights", "All rights reserved.")}
            </p>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group"
          >
            {t("common.back", "Back to Top")} <ChevronUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
          </button>
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
