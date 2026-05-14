import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthShell, AuthField } from "@/components/auth/AuthShell";
import { ArrowLeft, Loader2, KeyRound, ShieldCheck } from "lucide-react";
import { useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP + New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setStep(2);
      toast.success("Reset code sent to your email.");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to request reset");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !newPassword) return;
    setLoading(true);
    try {
      await api.post('/auth/reset-password', { email, code: otp, newPassword });
      toast.success("Password reset successful. Please login.");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  if (step === 2) {
    return (
      <AuthShell
        title="Create new password"
        subtitle={`Enter the 6-digit code sent to ${email}`}
        footer={
          <button onClick={() => setStep(1)} className="flex items-center gap-2 text-primary hover:text-primary-glow font-medium mx-auto">
            <ArrowLeft className="h-4 w-4" /> Try another email
          </button>
        }
      >
        <div className="flex justify-center mb-8">
          <div className="h-16 w-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shadow-glow-secondary">
            <ShieldCheck className="h-8 w-8" />
          </div>
        </div>
        <form className="space-y-6" onSubmit={handleResetPassword}>
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 block text-center">Verification Code</label>
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
          <AuthField 
            label="New Password" 
            type="password" 
            placeholder="Min 8 characters" 
            value={newPassword} 
            onChange={e => setNewPassword(e.target.value)}
          />
          <Button variant="hero" size="lg" className="w-full py-7" disabled={loading}>
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Reset Password"}
          </Button>
        </form>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Reset password"
      subtitle="Enter your email and we'll send you a 6-digit code to reset your password."
      footer={
        <Link to="/login" className="flex items-center gap-2 text-primary hover:text-primary-glow font-medium mx-auto">
          <ArrowLeft className="h-4 w-4" /> Back to login
        </Link>
      }
    >
      <div className="flex justify-center mb-8">
        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-glow">
          <KeyRound className="h-8 w-8" />
        </div>
      </div>
      <form className="space-y-6" onSubmit={handleRequestReset}>
        <AuthField 
          label="Email Address" 
          type="email" 
          placeholder="you@example.com" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
        />
        <Button variant="hero" size="lg" className="w-full py-7" disabled={loading}>
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Send Reset Code"}
        </Button>
      </form>
    </AuthShell>
  );
};

export default ForgotPassword;
