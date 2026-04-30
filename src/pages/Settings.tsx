import { useState } from "react";
import { 
  Bell, 
  CreditCard, 
  Globe, 
  Key, 
  ShieldCheck, 
  User, 
  HelpCircle, 
  MessageSquare,
  ArrowLeft,
  Camera,
  FileText,
  CheckCircle2,
  ChevronRight,
  Loader2,
  Lock
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const languages = [
  "English (US)", "English (UK)", "Spanish", "French", "German", 
  "Chinese (Simplified)", "Chinese (Traditional)", "Japanese", 
  "Korean", "Russian", "Portuguese (Brazil)", "Portuguese (Portugal)", 
  "Italian", "Arabic", "Turkish", "Hindi", "Vietnamese", 
  "Indonesian", "Thai", "Polish", "Dutch", "Greek", "Swedish"
];

const currencies = [
  "USD - US Dollar", "EUR - Euro", "GBP - British Pound", "JPY - Japanese Yen",
  "AUD - Australian Dollar", "CAD - Canadian Dollar", "CHF - Swiss Franc",
  "CNY - Chinese Yuan", "SGD - Singapore Dollar", "HKD - Hong Kong Dollar",
  "NGN - Nigerian Naira"
];

type View = "root" | "profile" | "kyc" | "language" | "security";

const SettingsPage = () => {
  const { user, updateUser } = useAuth();
  const [view, setView] = useState<View>("root");
  const [loading, setLoading] = useState(false);

  // Form states
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      updateUser(profileData);
      setLoading(false);
      toast.success("Profile updated successfully");
      setView("root");
    }, 1000);
  };

  const handleKYCSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      updateUser({ kycStatus: "pending" });
      setLoading(false);
      toast.success("Verification documents submitted for review");
      setView("root");
    }, 2000);
  };

  const renderRoot = () => (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">Account</h3>
        <div className="glass rounded-3xl divide-y divide-border/40 overflow-hidden">
          <SettingItem 
            icon={User} 
            label="Profile" 
            desc={`${user?.firstName} ${user?.lastName} · ${user?.email}`} 
            onClick={() => setView("profile")}
          />
          <SettingItem 
            icon={ShieldCheck} 
            label="KYC & verification" 
            desc={user?.kycStatus === 'verified' ? "Tier 2 · Verified" : user?.kycStatus === 'pending' ? "Review in progress" : "Action required"} 
            statusColor={user?.kycStatus === 'verified' ? "text-success" : user?.kycStatus === 'pending' ? "text-warning" : "text-destructive"}
            onClick={() => setView("kyc")}
          />
          <SettingItem icon={Key} label="Security" desc="Password, 2FA, sessions" onClick={() => setView("security")} />
        </div>
      </div>

      <div>
        <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">Preferences</h3>
        <div className="glass rounded-3xl divide-y divide-border/40 overflow-hidden">
          <SettingItem icon={Bell} label="Notifications" desc="Price alerts, news" />
          <SettingItem 
            icon={Globe} 
            label="Language & region" 
            desc={`${user?.preferences?.language || 'English (US)'} · ${user?.preferences?.currency || 'USD'}`} 
            onClick={() => setView("language")}
          />
          <SettingItem icon={CreditCard} label="Payment methods" desc="Connected bank accounts" />
        </div>
      </div>

      <div>
        <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">Support</h3>
        <div className="glass rounded-3xl divide-y divide-border/40 overflow-hidden">
          <SettingItem icon={HelpCircle} label="Help Center" desc="FAQs and guides" />
          <SettingItem icon={MessageSquare} label="Live Chat" desc="Speak with an agent" />
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6 animate-fade-in-up">
      <button onClick={() => setView("root")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to settings
      </button>
      <div className="glass rounded-3xl p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="First Name" value={profileData.firstName} onChange={e => setProfileData({...profileData, firstName: e.target.value})} />
            <Field label="Last Name" value={profileData.lastName} onChange={e => setProfileData({...profileData, lastName: e.target.value})} />
          </div>
          <Field label="Email Address" value={user?.email || ""} disabled />
          <Field label="Phone Number" placeholder="+1 (555) 000-0000" value={profileData.phone} onChange={e => setProfileData({...profileData, phone: e.target.value})} />
          <Field label="Residential Address" placeholder="Street, City, Zip" value={profileData.address} onChange={e => setProfileData({...profileData, address: e.target.value})} />
          <Button variant="hero" className="w-full mt-4" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );

  const renderKYC = () => (
    <div className="space-y-6 animate-fade-in-up">
      <button onClick={() => setView("root")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>
      <div className="glass rounded-3xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Identity Verification</h2>
            <p className="text-sm text-muted-foreground">Level 2: Unlimited trading & withdrawals</p>
          </div>
        </div>

        {user?.kycStatus === 'verified' ? (
          <div className="bg-success/10 border border-success/20 rounded-2xl p-6 text-center">
            <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-4" />
            <h3 className="text-lg font-bold text-success">You are fully verified</h3>
            <p className="text-sm text-muted-foreground">All features are unlocked. Happy trading!</p>
          </div>
        ) : user?.kycStatus === 'pending' ? (
          <div className="bg-warning/10 border border-warning/20 rounded-2xl p-6 text-center">
            <Loader2 className="h-12 w-12 text-warning mx-auto mb-4 animate-spin" />
            <h3 className="text-lg font-bold text-warning">Review in progress</h3>
            <p className="text-sm text-muted-foreground">We are checking your documents. This usually takes 24 hours.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UploadCard icon={FileText} label="Government ID" desc="Passport or Driver's License" />
              <UploadCard icon={Camera} label="Live Selfie" desc="Facial recognition check" />
            </div>
            <Button variant="hero" className="w-full" onClick={handleKYCSubmit} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit for Review"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  const renderLanguage = () => (
    <div className="space-y-6 animate-fade-in-up">
      <button onClick={() => setView("root")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass rounded-3xl p-6">
          <h3 className="text-lg font-bold mb-4">Language</h3>
          <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {languages.map(lang => (
              <button 
                key={lang}
                onClick={() => {
                  updateUser({ preferences: { ...user?.preferences, language: lang, currency: user?.preferences?.currency || 'USD' } });
                  toast.success(`Language changed to ${lang}`);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${user?.preferences?.language === lang ? 'bg-primary/10 text-primary' : 'hover:bg-muted/30 text-muted-foreground'}`}
              >
                <span className="text-sm">{lang}</span>
                {user?.preferences?.language === lang && <CheckCircle2 className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
        <div className="glass rounded-3xl p-6">
          <h3 className="text-lg font-bold mb-4">Base Currency</h3>
          <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {currencies.map(curr => (
              <button 
                key={curr}
                onClick={() => {
                  updateUser({ preferences: { ...user?.preferences, currency: curr.split(' ')[0], language: user?.preferences?.language || 'English (US)' } });
                  toast.success(`Currency changed to ${curr.split(' ')[0]}`);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${user?.preferences?.currency === curr.split(' ')[0] ? 'bg-primary/10 text-primary' : 'hover:bg-muted/30 text-muted-foreground'}`}
              >
                <span className="text-sm">{curr}</span>
                {user?.preferences?.currency === curr.split(' ')[0] && <CheckCircle2 className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6 animate-fade-in-up">
      <button onClick={() => setView("root")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>
      <div className="glass rounded-3xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <Lock className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Security Settings</h2>
            <p className="text-sm text-muted-foreground">Keep your account safe and secure.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 glass rounded-2xl border border-border/40">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Bell className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-semibold">Two-Factor Authentication</div>
                <div className="text-xs text-muted-foreground">Real-time codes via email or SMS</div>
              </div>
            </div>
            <button className="h-6 w-11 rounded-full bg-primary relative transition-colors p-1">
              <div className="h-4 w-4 rounded-full bg-white absolute right-1 shadow-sm" />
            </button>
          </div>

          <div className="p-4 glass rounded-2xl border border-border/40 space-y-4">
            <div className="text-sm font-semibold mb-2">Change Password</div>
            <Field label="Current Password" type="password" />
            <Field label="New Password" type="password" />
            <Button variant="outline" className="w-full">Update Password</Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {view === "root" && renderRoot()}
      {view === "profile" && renderProfile()}
      {view === "kyc" && renderKYC()}
      {view === "language" && renderLanguage()}
      {view === "security" && renderSecurity()}
    </div>
  );
};

const SettingItem = ({ 
  icon: Icon, 
  label, 
  desc, 
  onClick, 
  statusColor = "text-muted-foreground" 
}: { 
  icon: any, 
  label: string, 
  desc: string, 
  onClick?: () => void,
  statusColor?: string 
}) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-4 p-5 hover:bg-muted/30 transition-colors text-left group"
  >
    <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
      <Icon className="h-4 w-4" />
    </div>
    <div className="flex-1">
      <div className="text-sm font-semibold">{label}</div>
      <div className={`text-xs ${statusColor}`}>{desc}</div>
    </div>
    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
  </button>
);

const Field = ({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <div>
    <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5 block">
      {label}
    </label>
    <Input
      {...props}
      className="bg-muted/40 border-border/60 focus-visible:ring-primary/40 h-11"
    />
  </div>
);

const UploadCard = ({ icon: Icon, label, desc }: { icon: any, label: string, desc: string }) => (
  <div className="glass rounded-2xl border-2 border-dashed border-border/60 p-6 text-center hover:border-primary/50 transition-colors cursor-pointer group">
    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-3 group-hover:scale-110 transition-transform">
      <Icon className="h-5 w-5" />
    </div>
    <p className="text-sm font-medium mb-1">{label}</p>
    <p className="text-xs text-muted-foreground">{desc}</p>
  </div>
);

export default SettingsPage;
