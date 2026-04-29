import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  FileText,
  ShieldCheck,
  User,
  Zap,
  Info,
  CheckCircle2,
} from "lucide-react";

const steps = [
  { id: 1, label: "Identity", icon: User },
  { id: 2, label: "Document", icon: FileText },
  { id: 3, label: "Selfie", icon: Camera },
  { id: 4, label: "Review", icon: ShieldCheck },
];

const KYC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", dob: "", nationality: "", phone: "" });
  const [docUploaded, setDocUploaded] = useState(false);
  const [selfieTaken, setSelfieTaken] = useState(false);
  
  const canContinue = () => {
    if (step === 1) return formData.firstName && formData.lastName && formData.dob && formData.nationality && formData.phone;
    if (step === 2) return docUploaded;
    if (step === 3) return selfieTaken;
    return true;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="glow-orb h-[500px] w-[500px] bg-primary/20 -top-40 -left-40" />
      <div className="glow-orb h-[500px] w-[500px] bg-secondary/20 -bottom-40 -right-40" />
      <div className="absolute inset-0 grid-bg opacity-50" />

      <div className="relative container max-w-3xl py-10 md:py-16">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to dashboard
        </Link>

        <div className="flex items-center gap-2 mb-8">
          <div className="h-9 w-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <Zap className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl font-bold">
            NET<span className="text-gradient-primary">FLOW</span>
          </span>
          <span className="ml-auto text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Verification
          </span>
        </div>

        {/* Stepper */}
        <div className="glass-strong rounded-3xl p-6 md:p-8 mb-6">
          <div className="flex items-center justify-between mb-8 relative">
            <div className="absolute top-5 left-0 right-0 h-px bg-border/60" />
            <div
              className="absolute top-5 left-0 h-px bg-gradient-primary transition-all duration-500"
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            />
            {steps.map((s) => {
              const active = step === s.id;
              const done = step > s.id;
              return (
                <div key={s.id} className="relative flex flex-col items-center gap-2">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                      done
                        ? "bg-primary border-primary text-primary-foreground shadow-glow"
                        : active
                        ? "bg-background border-primary text-primary shadow-glow"
                        : "bg-background border-border text-muted-foreground"
                    }`}
                  >
                    {done ? <Check className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
                  </div>
                  <span
                    className={`text-[10px] md:text-xs font-mono uppercase tracking-wider ${
                      active || done ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="animate-fade-in" key={step}>
            {step === 1 && (
              <div className="space-y-5 animate-fade-in-up">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl font-bold mb-1">Personal details</h2>
                    <p className="text-sm text-muted-foreground">
                      This information must match your government-issued ID.
                    </p>
                  </div>
                  <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 flex items-start gap-3 max-w-xs">
                    <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-xs text-primary/80 leading-relaxed">
                      <strong>Why we need this:</strong> Financial regulations require us to verify the identity of all users to prevent fraud and money laundering.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Legal first name" placeholder="Alex" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                  <Field label="Legal last name" placeholder="Nakamoto" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                  <Field label="Date of birth" type="date" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} />
                  <Field label="Nationality" placeholder="United States" value={formData.nationality} onChange={e => setFormData({...formData, nationality: e.target.value})} />
                  <div className="md:col-span-2">
                    <Field label="Phone number" type="tel" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="md:col-span-2">
                    <Field label="Residential address" placeholder="123 Market Street" />
                  </div>
                  <Field label="City" placeholder="San Francisco" />
                  <Field label="Postal code" placeholder="94103" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5 animate-fade-in-up">
                <div>
                  <h2 className="font-display text-2xl font-bold mb-1">Upload your ID</h2>
                  <p className="text-sm text-muted-foreground">
                    Passport, driver's license, or national ID card.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {["Passport", "Driver's license", "National ID"].map((d, i) => (
                    <button
                      key={d}
                      className={`rounded-2xl p-4 text-left transition-all border ${
                        i === 0
                          ? "bg-primary/10 border-primary/40 shadow-glow"
                          : "glass border-border/60 hover:border-primary/40"
                      }`}
                    >
                      <FileText className={`h-5 w-5 mb-2 ${i === 0 ? "text-primary" : ""}`} />
                      <div className="text-xs font-medium">{d}</div>
                    </button>
                  ))}
                </div>
                {!docUploaded ? (
                  <div 
                    onClick={() => setDocUploaded(true)}
                    className="glass rounded-2xl border-2 border-dashed border-border/60 p-10 text-center hover:border-primary/50 transition-colors cursor-pointer group"
                  >
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-3 group-hover:scale-110 transition-transform">
                      <FileText className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-medium mb-1">Drop your file here or click to upload</p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG or PDF · max 10 MB
                    </p>
                  </div>
                ) : (
                  <div className="glass rounded-2xl border border-success/30 p-6 flex items-center justify-between bg-success/5">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-success/20 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-success" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-success flex items-center gap-2">
                          passport_front.jpg <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <div className="text-xs text-muted-foreground">2.4 MB • Uploaded successfully</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setDocUploaded(false)}>
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5 animate-fade-in-up">
                <div>
                  <h2 className="font-display text-2xl font-bold mb-1">Take a selfie</h2>
                  <p className="text-sm text-muted-foreground">
                    We'll match your face with your ID to confirm it's really you.
                  </p>
                </div>
                <div className="glass rounded-3xl p-10 flex flex-col items-center justify-center aspect-video relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
                  <div className={`relative h-32 w-32 rounded-full flex items-center justify-center transition-all duration-500 ${selfieTaken ? "border-4 border-success bg-success/20 scale-105" : "border-2 border-dashed border-primary/60 animate-glow-pulse"}`}>
                    {selfieTaken ? <CheckCircle2 className="h-10 w-10 text-success" /> : <Camera className="h-10 w-10 text-primary" strokeWidth={1.5} />}
                  </div>
                  <p className="relative text-sm font-medium mt-4">{selfieTaken ? "Selfie captured successfully" : "Center your face"}</p>
                  <p className="relative text-xs text-muted-foreground mt-1">
                    {selfieTaken ? "You look great!" : "Ensure good lighting and remove glasses"}
                  </p>
                </div>
                <Button 
                  variant={selfieTaken ? "outline" : "glow"} 
                  size="lg" 
                  className="w-full"
                  onClick={() => setSelfieTaken(!selfieTaken)}
                >
                  <Camera className="h-4 w-4 mr-2" /> {selfieTaken ? "Retake photo" : "Capture photo"}
                </Button>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5 text-center py-6">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary shadow-glow animate-glow-pulse">
                  <Check className="h-10 w-10 text-primary-foreground" strokeWidth={3} />
                </div>
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
                    Verification submitted
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                    We're reviewing your documents. This usually takes 5–10 minutes.
                    You'll get an email as soon as you're verified.
                  </p>
                </div>
                <div className="glass rounded-2xl p-4 max-w-sm mx-auto text-left">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Reference ID</span>
                    <span className="font-mono">NF-8D4F2A91</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <span className="flex items-center gap-1.5 text-warning">
                      <span className="h-1.5 w-1.5 rounded-full bg-warning animate-blink" />
                      Pending review
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/40">
            <Button
              variant="ghost"
              disabled={step === 1}
              onClick={() => setStep((s) => Math.max(1, s - 1))}
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            {step < steps.length ? (
              <Button 
                variant="hero" 
                onClick={() => setStep((s) => s + 1)} 
                className="group disabled:opacity-50"
                disabled={!canContinue()}
              >
                Continue
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            ) : (
              <Button variant="hero" asChild>
                <Link to="/dashboard">Go to dashboard</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <div>
    <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5 block">
      {label}
    </label>
    <Input
      {...props}
      className="bg-muted/40 border-border/60 focus-visible:ring-primary/40 h-11"
    />
  </div>
);

export default KYC;
