import { HelpCircle, MessageSquare, Mail, PhoneCall, ChevronDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const faqs = [
  { q: "How do I deposit funds?", a: "Navigate to your Wallet and click the Deposit button. We support direct crypto transfers via the Bitcoin, Ethereum, and Solana networks, as well as fiat deposits via Bank Transfer." },
  { q: "What are the trading fees?", a: "Standard trading fees are 0.10% per trade. Exchange fees within the wallet are fixed at 13%. Upgrading to the Premium plan removes all standard trading fees." },
  { q: "How do I upgrade my account plan?", a: "Go to the Plans page from the sidebar menu, select the tier that fits your needs, and click Select Plan. The minimum entry requirement will be deducted from your available USD balance." },
  { q: "When are withdrawals processed?", a: "Crypto withdrawals are processed automatically and typically take 5-10 minutes depending on network congestion. Fiat withdrawals are processed within 1-2 business days." }
];

const SupportPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden text-center mb-8">
        <div className="absolute -top-40 -right-40 h-80 w-80 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 bg-secondary/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 border border-primary/20 mb-6 text-primary">
            <HelpCircle className="h-8 w-8" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">How can we help?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Our support team is available 24/7 to assist you with any questions or issues.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass rounded-3xl p-6 text-center hover:-translate-y-1 transition-transform cursor-pointer group">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <MessageSquare className="h-5 w-5" />
          </div>
          <h3 className="font-semibold mb-2">Live Chat</h3>
          <p className="text-sm text-muted-foreground mb-4">Chat with our support agents in real-time.</p>
          <button 
            onClick={() => toast.info("Opening Live Chat...")}
            className="text-sm text-primary font-semibold hover:underline"
          >
            Start Chat
          </button>
        </div>
        
        <div className="glass rounded-3xl p-6 text-center hover:-translate-y-1 transition-transform cursor-pointer group">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Mail className="h-5 w-5" />
          </div>
          <h3 className="font-semibold mb-2">Email Support</h3>
          <p className="text-sm text-muted-foreground mb-4">Send us an email and we'll respond within 2 hours.</p>
          <button 
            onClick={() => toast.info("Opening Mail Client...")}
            className="text-sm text-primary font-semibold hover:underline"
          >
            support@netflow.invest
          </button>
        </div>
        
        <div className="glass rounded-3xl p-6 text-center hover:-translate-y-1 transition-transform cursor-pointer group">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <PhoneCall className="h-5 w-5" />
          </div>
          <h3 className="font-semibold mb-2">Phone Support</h3>
          <p className="text-sm text-muted-foreground mb-4">Available for Premium and Elite plan members.</p>
          <button 
            onClick={() => toast.info("Premium Support Line Initiated.")}
            className="text-sm text-primary font-semibold hover:underline"
          >
            +1 (800) 555-0199
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-12">
        <h3 className="font-display text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="glass rounded-2xl border border-border/50 overflow-hidden"
            >
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between font-semibold text-left focus:outline-none"
              >
                {faq.q}
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4 text-sm text-muted-foreground">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
