import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthShell, AuthField, SocialButtons } from "@/components/auth/AuthShell";
import { ArrowRight, Check, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import api from "@/lib/axios";
import { toast } from "sonner";

const Signup = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1); // 1: Info, 2: OTP
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const perks = [
    t("auth.perk1", "Trade 200+ assets with zero hidden fees"),
    t("auth.perk2", "AI-powered insights & copy trading"),
    t("auth.perk3", "Bank-grade security with 2FA"),
  ];

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!firstName) newErrors.firstName = t("errors.first_name_required", "First name required");
    if (!lastName) newErrors.lastName = t("errors.last_name_required", "Last name required");
    if (!email) newErrors.email = t("errors.email_required", "Email required");
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = t("errors.invalid_email", "Invalid email");
    if (!password) newErrors.password = t("errors.password_required", "Password required");

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await api.post('/auth/register', {
        firstName,
        lastName,
        email,
        password,
        adminKey
      });
      setStep(2);
      toast.success(t("auth.verify_sent", "Verification code sent to your email."));
    } catch (error: any) {
      setErrors({ email: error.response?.data?.message || 'Registration failed' });
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;

    setLoading(true);
    try {
      const { data } = await api.post('/auth/verify-email', { email, code: otp });
      login(data.token, data);
      toast.success(t("auth.verify_success", "Email verified! Welcome to Netflow."));
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  if (step === 2) {
    return (
      <AuthShell
        title={t("auth.verify_title")}
        subtitle={`${t("auth.verify_subtitle")} ${email}`}
        footer={
          <>
            {t("auth.didnt_receive")}{" "}
            <button 
              onClick={handleSignup} 
              className="text-primary hover:text-primary-glow font-medium"
              disabled={loading}
            >
              {t("auth.resend", "Resend")}
            </button>
          </>
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
          <Button variant="hero" size="lg" className="w-full py-7 text-base" disabled={loading}>
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : t("auth.verify_continue")}
          </Button>
          <button 
            type="button" 
            onClick={() => setStep(1)} 
            className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("auth.change_email")}
          </button>
        </form>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title={t("auth.signup_title")}
      subtitle={t("auth.signup_subtitle")}
      footer={
        <>
          {t("auth.already_account")}{" "}
          <Link to="/login" className="text-primary hover:text-primary-glow font-medium">
            {t("auth.sign_in")}
          </Link>
        </>
      }
    >
      <SocialButtons />
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-border/60" />
        <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          {t("common.or")}
        </span>
        <div className="flex-1 h-px bg-border/60" />
      </div>

      <form className="space-y-4" onSubmit={handleSignup}>
        <div className="grid grid-cols-2 gap-3">
          <AuthField 
            label={t("nav.first_name")} 
            placeholder="Alex" 
            value={firstName} 
            onChange={e => setFirstName(e.target.value)} 
            error={errors.firstName} 
          />
          <AuthField 
            label={t("nav.last_name")} 
            placeholder="Nakamoto" 
            value={lastName} 
            onChange={e => setLastName(e.target.value)} 
            error={errors.lastName} 
          />
        </div>
        <AuthField 
          label={t("auth.referral_key", "Referral / Admin Key")} 
          placeholder={t("common.optional", "Optional")} 
          value={adminKey} 
          onChange={e => setAdminKey(e.target.value)} 
        />
        <AuthField 
          label={t("nav.email")} 
          type="email" 
          placeholder="you@example.com" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          error={errors.email} 
        />
        <AuthField 
          label={t("nav.password")} 
          type="password" 
          placeholder={t("auth.password_placeholder", "At least 8 characters")} 
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
            {t("auth.agree_to")}{" "}
            <Link to="/terms" className="text-primary hover:text-primary-glow">{t("auth.terms")}</Link> {t("auth.and")}{" "}
            <Link to="/privacy" className="text-primary hover:text-primary-glow">{t("auth.privacy")}</Link>
          </span>
        </label>

        <Button variant="hero" size="lg" className="w-full group" disabled={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {t("nav.signup")}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>
    </AuthShell>
  );
};

export default Signup;
