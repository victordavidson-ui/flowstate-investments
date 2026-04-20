import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthShell, AuthField, SocialButtons } from "@/components/auth/AuthShell";
import { ArrowRight, Check } from "lucide-react";

const perks = [
  "Trade 200+ assets with zero hidden fees",
  "AI-powered insights & copy trading",
  "Bank-grade security with 2FA",
];

const Signup = () => {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Start investing on NETFLOW in under 60 seconds."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:text-primary-glow font-medium">
            Sign in
          </Link>
        </>
      }
    >
      <SocialButtons />
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-border/60" />
        <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          Or
        </span>
        <div className="flex-1 h-px bg-border/60" />
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-3">
          <AuthField label="First name" placeholder="Alex" />
          <AuthField label="Last name" placeholder="Nakamoto" />
        </div>
        <AuthField label="Email" type="email" placeholder="you@netflow.io" />
        <AuthField label="Password" type="password" placeholder="At least 8 characters" />

        <ul className="space-y-1.5 text-xs text-muted-foreground">
          {perks.map((p) => (
            <li key={p} className="flex items-center gap-2">
              <Check className="h-3 w-3 text-success" />
              {p}
            </li>
          ))}
        </ul>

        <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer">
          <input type="checkbox" className="accent-primary mt-0.5" defaultChecked />
          <span>
            I agree to the{" "}
            <a href="#" className="text-primary hover:text-primary-glow">Terms</a> and{" "}
            <a href="#" className="text-primary hover:text-primary-glow">Privacy Policy</a>
          </span>
        </label>

        <Button variant="hero" size="lg" className="w-full group" asChild>
          <Link to="/kyc">
            Create account
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </form>
    </AuthShell>
  );
};

export default Signup;
