import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";

export const AuthShell = ({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden pt-24">
        <div className="glow-orb h-[500px] w-[500px] bg-primary/25 -top-40 -left-40" />
        <div className="glow-orb h-[600px] w-[600px] bg-secondary/25 -bottom-40 -right-40 animate-glow-pulse" />
        <div className="absolute inset-0 grid-bg opacity-60" />

        <div className="relative w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="glass-strong rounded-3xl p-8 shadow-elevated animate-scale-in">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="h-9 w-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Zap className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="font-display text-xl font-bold">
              NET<span className="text-gradient-primary">FLOW</span>
            </span>
          </Link>

          <h1 className="font-display text-3xl font-bold mb-2">{title}</h1>
          <p className="text-sm text-muted-foreground mb-6">{subtitle}</p>

          {children}
        </div>

        {footer && (
          <p className="text-center text-sm text-muted-foreground mt-6">{footer}</p>
        )}
      </div>
    </div>
  </div>
  );
};

export const AuthField = ({
  label,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) => (
  <div className="group">
    <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5 block group-focus-within:text-primary transition-colors">
      {label}
    </label>
    <Input
      {...props}
      className={`bg-muted/40 border-border/60 transition-all duration-300 h-11 ${
        error 
          ? "border-destructive/50 focus-visible:ring-destructive/20 focus-visible:border-destructive" 
          : "focus-visible:ring-primary/20 focus-visible:border-primary/60 hover:border-primary/40 shadow-sm"
      }`}
    />
    {error && <p className="text-[10px] text-destructive mt-1.5 animate-fade-in">{error}</p>}
  </div>
);

export const SocialButtons = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSocial = (provider: string) => {
    import("sonner").then(({ toast }) => {
      toast.promise(new Promise(res => setTimeout(res, 1200)), {
        loading: `Connecting to ${provider}...`,
        success: () => {
          login({
            firstName: "Social",
            lastName: "User",
            email: `social@${provider.toLowerCase()}.com`,
            username: `${provider.toLowerCase()}_user`,
            kycStatus: 'unverified',
          });
          navigate("/dashboard");
          return `Successfully logged in with ${provider}!`;
        },
        error: "Connection failed",
      });
    });
  };

  return (
    <div className="grid grid-cols-2 gap-3 mb-5">
      <Button variant="glass" className="h-11" onClick={() => handleSocial("Google")}>
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M21.35 11.1H12v3.2h5.35c-.23 1.22-.94 2.25-2 2.94v2.45h3.23c1.9-1.75 2.99-4.33 2.99-7.4 0-.64-.06-1.25-.17-1.85z" fill="#4285F4"/><path d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.23-2.45c-.9.6-2.04.94-3.4.94-2.6 0-4.8-1.75-5.6-4.12H3.08v2.54A10 10 0 0012 22z" fill="#34A853"/><path d="M6.4 13.94A6 6 0 016.08 12c0-.68.12-1.34.32-1.94V7.52H3.08a10 10 0 000 8.96l3.32-2.54z" fill="#FBBC05"/><path d="M12 5.94c1.47 0 2.8.5 3.83 1.5l2.88-2.88A10 10 0 0012 2a10 10 0 00-8.92 5.52L6.4 10.06c.8-2.37 3-4.12 5.6-4.12z" fill="#EA4335"/></svg>
        Google
      </Button>
      <Button variant="glass" className="h-11" onClick={() => handleSocial("Apple")}>
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25"/></svg>
        Apple
      </Button>
    </div>
  );
};
