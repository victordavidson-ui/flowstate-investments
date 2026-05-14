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
  Lock,
  QrCode,
  Copy,
  Smartphone
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const currencies = [
  "USD - US Dollar", "EUR - Euro", "GBP - British Pound", "JPY - Japanese Yen",
  "NGN - Nigerian Naira", "ZAR - South African Rand"
];

type View = "root" | "profile" | "kyc" | "language" | "security";

const SettingsPage = () => {
  const { t, i18n } = useTranslation();
  const { user, updateUser } = useAuth();
  const [view, setView] = useState<View>("root");
  const [loading, setLoading] = useState(false);
  const [setup2FA, setSetup2FA] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [tempSecret] = useState("XJ9K-P2L4-M7Q9-R1S5"); // Simulated secret
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

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
      toast.success(t("messages.profile_updated"));
      setView("root");
    }, 1000);
  };

  const handleKYCSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      updateUser({ kycStatus: "pending" });
      setLoading(false);
      toast.success(t("messages.kyc_submitted"));
      setView("root");
    }, 2000);
  };

  const handleFileUpload = (type: string) => {
    if (uploadProgress[type]) return;
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        toast.success(t("messages.file_uploaded", { file: type.toUpperCase() }));
      }
      setUploadProgress(prev => ({ ...prev, [type]: progress }));
    }, 400);
  };

  const handleEnable2FA = () => {
    if (twoFactorCode.length !== 6) {
      toast.error(t("errors.invalid_otp"));
      return;
    }
    setLoading(true);
    setTimeout(() => {
      updateUser({ is2FAEnabled: true, twoFactorSecret: tempSecret });
      setLoading(false);
      setSetup2FA(false);
      toast.success(t("messages.2fa_enabled"));
    }, 1500);
  };

  const renderRoot = () => (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">{t('settings.account')}</h3>
        <div className="glass rounded-3xl divide-y divide-border/40 overflow-hidden">
          <SettingItem 
            icon={User} 
            label={t('settings.profile')} 
            desc={`${user?.firstName} ${user?.lastName} · ${user?.email}`} 
            onClick={() => setView("profile")}
          />
          <SettingItem 
            icon={ShieldCheck} 
            label={t('settings.kyc_verification')} 
            desc={user?.kycStatus === 'verified' ? t('settings.tier2_verified') : user?.kycStatus === 'pending' ? t('settings.pending_msg') : t('messages.action_required')} 
            statusColor={user?.kycStatus === 'verified' ? "text-success" : user?.kycStatus === 'pending' ? "text-warning" : "text-destructive"}
            onClick={() => setView("kyc")}
          />
          <SettingItem icon={Key} label={t('settings.security')} desc={t('messages.security_desc')} onClick={() => setView("security")} />
        </div>
      </div>

      <div>
        <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">{t('settings.preferences')}</h3>
        <div className="glass rounded-3xl divide-y divide-border/40 overflow-hidden">
          <SettingItem icon={Bell} label={t('settings.notifications')} desc={t('messages.notifications_desc')} />
          <SettingItem 
            icon={Globe} 
            label={t('settings.language_region')} 
            desc={`${i18n.language.toUpperCase()} · ${user?.preferences?.currency || 'USD'}`} 
            onClick={() => setView("language")}
          />
          <SettingItem icon={CreditCard} label={t('settings.payment_methods')} desc={t('messages.payment_desc')} />
        </div>
      </div>

      <div>
        <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">{t('settings.support')}</h3>
        <div className="glass rounded-3xl divide-y divide-border/40 overflow-hidden">
          <SettingItem icon={HelpCircle} label={t('settings.help_center')} desc={t('messages.help_desc')} />
          <SettingItem icon={MessageSquare} label={t('settings.live_chat')} desc={t('messages.chat_desc')} />
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6 animate-fade-in-up">
      <button onClick={() => setView("root")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> {t('settings.back_to_settings')}
      </button>
      <div className="glass rounded-3xl p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6">{t('settings.profile_settings')}</h2>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label={t('nav.first_name')} value={profileData.firstName} onChange={e => setProfileData({...profileData, firstName: e.target.value})} />
            <Field label={t('nav.last_name')} value={profileData.lastName} onChange={e => setProfileData({...profileData, lastName: e.target.value})} />
          </div>
          <Field label={t('nav.email')} value={user?.email || ""} disabled />
          <Field label={t('settings.phone_number')} placeholder="+1 (555) 000-0000" value={profileData.phone} onChange={e => setProfileData({...profileData, phone: e.target.value})} />
          <Field label={t('settings.residential_address')} placeholder="Street, City, Zip" value={profileData.address} onChange={e => setProfileData({...profileData, address: e.target.value})} />
          <Button variant="hero" className="w-full mt-4" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : t('common.save')}
          </Button>
        </form>
      </div>
    </div>
  );

  const renderKYC = () => (
    <div className="space-y-6 animate-fade-in-up">
      <button onClick={() => setView("root")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> {t('common.back')}
      </button>
      <div className="glass rounded-3xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{t('settings.identity_verification')}</h2>
            <p className="text-sm text-muted-foreground">{t('settings.kyc_level2')}</p>
          </div>
        </div>

        {user?.kycStatus === 'verified' ? (
          <div className="bg-success/10 border border-success/20 rounded-2xl p-6 text-center">
            <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-4" />
            <h3 className="text-lg font-bold text-success">{t('settings.verified_msg')}</h3>
            <p className="text-sm text-muted-foreground">{t('settings.verified_desc')}</p>
          </div>
        ) : user?.kycStatus === 'pending' ? (
          <div className="bg-warning/10 border border-warning/20 rounded-2xl p-6 text-center">
            <Loader2 className="h-12 w-12 text-warning mx-auto mb-4 animate-spin" />
            <h3 className="text-lg font-bold text-warning">{t('settings.pending_msg')}</h3>
            <p className="text-sm text-muted-foreground">{t('settings.pending_desc')}</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UploadCard 
                icon={FileText} 
                label={t('settings.gov_id')} 
                desc={t('settings.gov_id_desc')} 
                progress={uploadProgress['id']}
                onClick={() => handleFileUpload('id')}
              />
              <UploadCard 
                icon={Camera} 
                label={t('settings.selfie')} 
                desc={t('settings.selfie_desc')} 
                progress={uploadProgress['selfie']}
                onClick={() => handleFileUpload('selfie')}
              />
            </div>
            <Button 
              variant="hero" 
              className="w-full" 
              onClick={handleKYCSubmit} 
              disabled={loading || !uploadProgress['id'] || !uploadProgress['selfie']}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : t('settings.submit_review')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  const renderLanguage = () => (
    <div className="space-y-6 animate-fade-in-up">
      <button onClick={() => setView("root")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> {t('common.back')}
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass rounded-3xl p-6">
          <h3 className="text-lg font-bold mb-4">{t('nav.language')}</h3>
          <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {["en", "es", "fr"].map(langCode => {
              const langLabel = langCode === 'en' ? 'English' : langCode === 'es' ? 'Spanish' : 'French';
              return (
                <button 
                  key={langCode}
                  onClick={() => {
                    i18n.changeLanguage(langCode);
                    toast.success(t("messages.language_changed", { lang: langLabel }));
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${i18n.language === langCode ? 'bg-primary/10 text-primary' : 'hover:bg-muted/30 text-muted-foreground'}`}
                >
                  <span className="text-sm">{langLabel}</span>
                  {i18n.language === langCode && <CheckCircle2 className="h-4 w-4" />}
                </button>
              );
            })}
          </div>
        </div>
        <div className="glass rounded-3xl p-6">
          <h3 className="text-lg font-bold mb-4">{t('settings.base_currency')}</h3>
          <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {currencies.map(curr => (
              <button 
                key={curr}
                onClick={() => {
                  toast.success(t("messages.currency_changed", { curr: curr.split(' ')[0] }));
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
        <ArrowLeft className="h-4 w-4" /> {t('common.back')}
      </button>
      <div className="glass rounded-3xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <Lock className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{t('settings.security_settings')}</h2>
            <p className="text-sm text-muted-foreground">{t('messages.security_subtitle')}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 glass rounded-2xl border border-border/40 relative overflow-hidden group">
            {user?.is2FAEnabled && <div className="absolute top-0 right-0 h-1 w-full bg-success shadow-glow" />}
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Smartphone className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-semibold">{t('settings.auth_app')}</div>
                <div className="text-xs text-muted-foreground">{t('settings.auth_app_desc')}</div>
              </div>
            </div>
            <button 
              onClick={() => !user?.is2FAEnabled && setSetup2FA(true)}
              className={`h-6 w-11 rounded-full relative transition-all p-1 ${user?.is2FAEnabled ? 'bg-success' : 'bg-muted-foreground/30'}`}
            >
              <div className={`h-4 w-4 rounded-full bg-white absolute shadow-sm transition-all ${user?.is2FAEnabled ? 'right-1' : 'left-1'}`} />
            </button>
          </div>

          {setup2FA && (
            <div className="p-6 glass rounded-2xl border border-primary/30 space-y-6 animate-fade-in-up">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">{t('settings.setup_auth')}</h3>
                <button onClick={() => setSetup2FA(false)} className="text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="h-32 w-32 bg-white p-2 rounded-xl flex items-center justify-center shadow-lg">
                  <QrCode className="h-full w-full text-black" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">{t('messages.step1')}</div>
                    <div className="flex items-center gap-2 bg-muted/40 p-2 rounded-lg border border-border/60">
                      <code className="text-sm font-mono flex-1">{tempSecret}</code>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(tempSecret);
                          toast.success(t("messages.secret_copied"));
                        }}
                        className="p-1 hover:bg-background/40 rounded transition-colors"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">{t('messages.step2')}</div>
                    <Input 
                      placeholder="000000" 
                      maxLength={6}
                      value={twoFactorCode}
                      onChange={e => setTwoFactorCode(e.target.value)}
                      className="font-mono text-center tracking-[0.5em] text-lg bg-muted/40"
                    />
                  </div>
                  <Button variant="hero" className="w-full" onClick={handleEnable2FA} disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : t('auth.verify_continue')}
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="p-4 glass rounded-2xl border border-border/40 space-y-4">
            <div className="text-sm font-semibold mb-2">{t('settings.change_password')}</div>
            <Field label={t('settings.current_password')} type="password" />
            <Field label={t('settings.new_password')} type="password" />
            <Button variant="outline" className="w-full">{t('settings.update_password')}</Button>
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

const UploadCard = ({ icon: Icon, label, desc, progress, onClick }: { icon: any, label: string, desc: string, progress?: number, onClick: () => void }) => {
  const { t } = useTranslation();
  return (
    <div 
      onClick={onClick}
      className="glass rounded-2xl border-2 border-dashed border-border/60 p-6 text-center hover:border-primary/50 transition-colors cursor-pointer group relative overflow-hidden"
    >
      {progress !== undefined && progress > 0 && progress < 100 && (
        <div className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
      )}
      {progress === 100 && (
        <div className="absolute top-2 right-2">
          <CheckCircle2 className="h-4 w-4 text-success" />
        </div>
      )}
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-3 group-hover:scale-110 transition-transform">
        {progress === 100 ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
      </div>
      <p className="text-sm font-medium mb-1">{label}</p>
      <p className="text-xs text-muted-foreground">{progress === 100 ? t("common.ready") : desc}</p>
    </div>
  );
};

export default SettingsPage;
