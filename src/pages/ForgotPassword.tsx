import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthShell, AuthField } from "@/components/auth/AuthShell";
import { ArrowRight, Loader2, Mail, Phone, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const ForgotPassword = () => {
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"request" | "verify" | "success">("request");
  const [error, setError] = useState<string | undefined>();

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact) {
      setError(method === "email" ? "Email is required" : "Phone number is required");
      return;
    }
    
    setError(undefined);
    setLoading(true);
    // Simulate sending OTP
    setTimeout(() => {
      setLoading(false);
      setStep("verify");
    }, 1000);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) {
      setError("Please enter the 6-digit code");
      return;
    }
    
    setError(undefined);
    setLoading(true);
    // Simulate verifying OTP
    setTimeout(() => {
      setLoading(false);
      setStep("success");
    }, 1000);
  };

  return (
    <AuthShell
      title={step === "success" ? "Verification complete" : "Recover account"}
      subtitle={
        step === "request" 
          ? "We'll send you a recovery code to verify your identity."
          : step === "verify" 
          ? `Enter the 6-digit code sent to your ${method}.`
          : "You can now reset your password."
      }
      footer={
        <>
          Remember your password?{" "}
          <Link to="/login" className="text-primary hover:text-primary-glow font-medium">
            Sign in
          </Link>
        </>
      }
    >
      {step === "request" && (
        <form className="space-y-6" onSubmit={handleRequest}>
          <div className="flex bg-muted/30 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setMethod("email")}
              className={`flex-1 py-2 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-all ${
                method === "email" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Mail className="h-4 w-4" /> Email
            </button>
            <button
              type="button"
              onClick={() => setMethod("phone")}
              className={`flex-1 py-2 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-all ${
                method === "phone" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Phone className="h-4 w-4" /> SMS
            </button>
          </div>

          <AuthField 
            label={method === "email" ? "Email address" : "Phone number"} 
            type={method === "email" ? "email" : "tel"} 
            placeholder={method === "email" ? "you@netflow.io" : "+1 (555) 000-0000"} 
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            error={error}
          />

          <Button variant="hero" size="lg" className="w-full group" disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Send Code
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </form>
      )}

      {step === "verify" && (
        <form className="space-y-6" onSubmit={handleVerify}>
          <AuthField 
            label="Verification Code" 
            type="text" 
            placeholder="000000" 
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            error={error}
          />

          <Button variant="hero" size="lg" className="w-full group" disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Verify
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
          
          <div className="text-center">
            <button type="button" onClick={() => setStep("request")} className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Didn't receive the code? Try again
            </button>
          </div>
        </form>
      )}

      {step === "success" && (
        <div className="text-center space-y-6 py-4 animate-fade-in">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-success/20 text-success shadow-glow">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Identity verified successfully.</p>
          </div>
          <Button variant="hero" size="lg" className="w-full group" asChild>
            <Link to="/login">
              Return to Login
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      )}
    </AuthShell>
  );
};
