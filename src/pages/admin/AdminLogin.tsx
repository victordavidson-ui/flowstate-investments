import { Button } from "@/components/ui/button";
import { AuthShell, AuthField } from "@/components/auth/AuthShell";
import { ArrowRight, Loader2, ShieldAlert } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const AdminLogin = () => {
  const [passcode, setPasscode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // If already has the master key in storage, redirect
    if (localStorage.getItem("admin_master_key") === "1507003") {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode) {
      setError("Admin passcode is required");
      return;
    }

    if (passcode !== "1507003") {
      setError("Invalid security key");
      return;
    }

    setError(undefined);
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("admin_master_key", passcode);
      toast.success("Admin access granted");
      navigate("/admin/dashboard", { replace: true });
    }, 1000);
  };

  return (
    <AuthShell
      title="AdminOS Authentication"
      subtitle="Enter your master security key to access the terminal."
      footer={
        <span className="text-muted-foreground flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-mono">
          <ShieldAlert className="h-3 w-3" /> Secure Node Access
        </span>
      }
    >
      <div className="flex justify-center mb-8">
        <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-[0_0_15px_hsl(var(--primary)/0.2)]">
          <ShieldAlert className="h-8 w-8" />
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleLogin}>
        <AuthField 
          label="Security Key" 
          type="password" 
          placeholder="•••••••" 
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          error={error}
        />

        <Button variant="hero" size="lg" className="w-full group" disabled={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Initialize Admin Session
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>
    </AuthShell>
  );
};
