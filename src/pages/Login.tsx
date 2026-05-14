import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthShell, AuthField, SocialButtons } from "@/components/auth/AuthShell";
import { ArrowRight, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import api from "@/lib/axios";
import { toast } from "sonner";

const Login = () => {
  const { t } = useTranslation();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState("");
  const [errors, setErrors] = useState<{identifier?: string, password?: string}>({});
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {identifier?: string, password?: string} = {};
    if (!identifier) newErrors.identifier = t("errors.email_required", "Email or Username is required");
    if (!password) newErrors.password = t("errors.password_required", "Password is required");

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const { data } = await api.post('/auth/login', {
        email: identifier,
        password
      });
      
      login(data.token, data);
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } catch (error: any) {
      if (error.response?.data?.requiresVerification) {
        setNeedsVerification(true);
        setUnverifiedEmail(error.response.data.email);
        toast.info(t("auth.verify_title"));
      } else {
        setErrors({ password: error.response?.data?.message || 'Login failed' });
        toast.error(error.response?.data?.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;
    setLoading(true);
    try {
      const { data } = await api.post('/auth/verify-email', { email: unverifiedEmail, code: otp });
      login(data.token, data);
      toast.success(t("auth.verify_success", "Email verified! Welcome to Netflow."));
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  if (needsVerification) {
    return (
      <AuthShell
        title={t("auth.verify_title")}
        subtitle={`${t("auth.verify_subtitle")} ${unverifiedEmail}`}
        footer={
          <button onClick={() => setNeedsVerification(false)} className="text-primary hover:text-primary-glow font-medium mx-auto">
            {t("common.back_to_login", "Back to login")}
          </button>
        }
      >
        <div className="flex justify-center mb-8">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-glow">
            <Mail className="h-8 w-8" />
          </div>
        </div>
        <form className="space-y-6" onSubmit={handleVerify}>
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 block text-center">
              {t("auth.verification_code", "Verification Code")}
            </label>
            <input 
              type="text" 
              maxLength={6}
              placeholder="000000"
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, ""))}
              className="w-full bg-muted/40 border border-border/60 rounded-xl px-4 py-4 text-2xl font-mono text-center tracking-[1em] focus:outline-none focus:border-primary/60 transition-all"
              required
            />
          </div>
          <Button variant="hero" size="lg" className="w-full py-7" disabled={loading}>
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : t("auth.verify_sign_in", "Verify & Sign In")}
          </Button>
        </form>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title={t("auth.login_title")}
      subtitle={t("auth.login_subtitle")}
      footer={
        <>
          {t("auth.no_account")}{" "}
          <Link to="/signup" className="text-primary hover:text-primary-glow font-medium">
            {t("auth.create_one")}
          </Link>
        </>
      }
    >
      <SocialButtons />
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-border/60" />
        <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          {t("common.or", "Or")}
        </span>
        <div className="flex-1 h-px bg-border/60" />
      </div>

      <form className="space-y-4" onSubmit={handleLogin}>
        <AuthField 
          label={t("nav.email", "Email or Username")} 
          type="text" 
          placeholder="you@example.com" 
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          error={errors.identifier}
        />
        <AuthField 
          label={t("nav.password", "Password")} 
          type="password" 
          placeholder="••••••••" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
            <input type="checkbox" className="accent-primary" />
            {t("auth.remember_me")}
          </label>
          <Link to="/forgot-password" className="text-primary hover:text-primary-glow">
            {t("auth.forgot_password")}
          </Link>
        </div>

        <Button variant="hero" size="lg" className="w-full group" disabled={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {t("auth.sign_in")}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>
    </AuthShell>
  );
};

export default Login;
