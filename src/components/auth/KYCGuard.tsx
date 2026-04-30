import { useAuth } from "@/contexts/AuthContext";
import { ShieldAlert, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface KYCGuardProps {
  children: React.ReactNode;
  action?: string;
}

export const KYCGuard = ({ children, action = "perform this action" }: KYCGuardProps) => {
  const { user } = useAuth();

  if (user?.kycStatus === 'verified') {
    return <>{children}</>;
  }

  return (
    <div className="relative group">
      <div className="opacity-40 pointer-events-none filter blur-[2px] transition-all">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-10 p-4">
        <div className="glass-strong rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-elevated border border-primary/20 animate-scale-in text-center">
          <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 animate-glow-pulse">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">Verification Required</h3>
          <p className="text-sm text-muted-foreground mb-6">
            To {action}, you need to complete your identity verification. This helps us keep your account and funds secure.
          </p>
          <Link 
            to="/settings" 
            className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:shadow-glow transition-all"
          >
            Start Verification <ChevronRight className="h-4 w-4" />
          </Link>
          <p className="text-[10px] text-muted-foreground mt-4 uppercase tracking-widest font-mono">
            Tier 2 Access Required
          </p>
        </div>
      </div>
    </div>
  );
};
