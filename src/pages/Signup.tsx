import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthShell, AuthField, SocialButtons } from "@/components/auth/AuthShell";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const perks = [
  "Trade 200+ assets with zero hidden fees",
  "AI-powered insights & copy trading",
  "Bank-grade security with 2FA",
];

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!firstName) newErrors.firstName = "First name required";
    if (!lastName) newErrors.lastName = "Last name required";
    if (!username) newErrors.username = "Username required";
    if (!email) newErrors.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email";
    if (!password) newErrors.password = "Password required";
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/.test(password)) {
      newErrors.password = "Requires 8+ chars, upper, lower, numbers & special char";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login({
        firstName,
        lastName,
        email,
        username,
      });
      navigate("/kyc");
    }, 800);
  };
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

      <form className="space-y-4" onSubmit={handleSignup}>
        <div className="grid grid-cols-2 gap-3">
          <AuthField 
            label="First name" 
            placeholder="Alex" 
            value={firstName} 
            onChange={e => setFirstName(e.target.value)} 
            error={errors.firstName} 
          />
          <AuthField 
            label="Last name" 
            placeholder="Nakamoto" 
            value={lastName} 
            onChange={e => setLastName(e.target.value)} 
            error={errors.lastName} 
          />
        </div>
        <AuthField 
          label="Username" 
          placeholder="cryptowhale" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          error={errors.username} 
        />
        <AuthField 
          label="Email" 
          type="email" 
          placeholder="you@netflow.io" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          error={errors.email} 
        />
        <AuthField 
          label="Password" 
          type="password" 
          placeholder="At least 8 characters" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          error={errors.password} 
        />

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
            <Link to="/terms" className="text-primary hover:text-primary-glow">Terms</Link> and{" "}
            <Link to="/privacy" className="text-primary hover:text-primary-glow">Privacy Policy</Link>
          </span>
        </label>

        <Button variant="hero" size="lg" className="w-full group" disabled={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Create account
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>
    </AuthShell>
  );
};

export default Signup;
