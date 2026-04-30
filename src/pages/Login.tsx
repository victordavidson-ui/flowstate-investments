import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthShell, AuthField, SocialButtons } from "@/components/auth/AuthShell";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{identifier?: string, password?: string}>({});
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {identifier?: string, password?: string} = {};
    if (!identifier) newErrors.identifier = "Email or Username is required";
    
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8) newErrors.password = "Password must be at least 8 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    // Mock API call
    setTimeout(() => {
      setLoading(false);
      login({
        firstName: "Victor", 
        lastName: "Davidson",
        email: identifier.includes("@") ? identifier : `${identifier}@example.com`,
        username: identifier.includes("@") ? identifier.split("@")[0] : identifier,
        kycStatus: 'verified', // Letting the user (Victor) be verified by default
        isAdmin: true,
      });
      // Redirect to the page they tried to visit, or dashboard
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    }, 800);
  };
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

      <form className="space-y-4" onSubmit={handleLogin}>
        <AuthField 
          label="Email or Username" 
          type="text" 
          placeholder="you@netflow.io or username" 
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          error={errors.identifier}
        />
        <AuthField 
          label="Password" 
          type="password" 
          placeholder="••••••••" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
            <input type="checkbox" className="accent-primary" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-primary hover:text-primary-glow">
            Forgot password?
          </Link>
        </div>

        <Button variant="hero" size="lg" className="w-full group" disabled={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Sign in
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>
    </AuthShell>
  );
};

export default Login;
