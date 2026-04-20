import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthShell, AuthField, SocialButtons } from "@/components/auth/AuthShell";
import { ArrowRight } from "lucide-react";

const Login = () => {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to access your NETFLOW portfolio."
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary hover:text-primary-glow font-medium">
            Create one
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
        <AuthField label="Email" type="email" placeholder="you@netflow.io" />
        <AuthField label="Password" type="password" placeholder="••••••••" />

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
            <input type="checkbox" className="accent-primary" />
            Remember me
          </label>
          <a href="#" className="text-primary hover:text-primary-glow">
            Forgot password?
          </a>
        </div>

        <Button variant="hero" size="lg" className="w-full group" asChild>
          <Link to="/dashboard">
            Sign in
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </form>
    </AuthShell>
  );
};

export default Login;
