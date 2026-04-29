import { Button } from "@/components/ui/button";
import { AuthShell, AuthField } from "@/components/auth/AuthShell";
import { ArrowRight, Loader2, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const AdminLogin = () => {
  const [passcode, setPasscode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode) {
      setError("Admin passcode is required");
      return;
    }

    // In a real app, this is verified on the backend.
    // For simulation, any passcode works, but let's require at least 8 chars.
    if (passcode.length < 8) {
      setError("Invalid admin credential format");
      return;
    }

    setError(undefined);
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      login({
        firstName: "System",
        lastName: "Admin",
        email: "admin@netflow.io",
        isAdmin: true,
      });
      navigate("/admin/dashboard", { replace: true });
    }, 1000);
  };

  return (
    <AuthShell
      title="AdminOS Authentication"
      subtitle="Restricted internal control system."
      footer={
        <span className="text-muted-foreground flex items-center justify-center gap-2">
          <ShieldAlert className="h-4 w-4" /> Unauthorized access is strictly prohibited.
        </span>
      }
    >
      <div className="flex justify-center mb-8">
        <div className="h-16 w-16 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center border border-destructive/20 shadow-[0_0_15px_hsl(var(--destructive)/0.2)]">
          <ShieldAlert className="h-8 w-8" />
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleLogin}>
        <AuthField 
          label="Secure Passcode" 
          type="password" 
          placeholder="••••••••••••••••" 
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          error={error}
        />

        <Button variant="hero" size="lg" className="w-full group bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-none" disabled={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Authorize Access
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>
    </AuthShell>
  );
};
