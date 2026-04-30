import StaticPage, { StaticPageProps } from "../StaticPage";

const make = (props: StaticPageProps) => () => <StaticPage {...props} />;

// ===== PRODUCT =====
export const CryptoPage = make({
  eyebrow: "Product",
  title: "Trade crypto with confidence",
  subtitle: "200+ digital assets, deep liquidity, and institutional-grade execution — built for everyone.",
  sections: [
    {
      heading: "Spot trading, simplified",
      body: "Buy and sell BTC, ETH, SOL and 200+ assets with low fees and instant settlement. Smart routing finds you the best price across global venues.",
      bullets: ["0.10% spot fee", "24/7 market access", "Sub-second execution"],
    },
    {
      heading: "Advanced order types",
      body: "Limit, market, stop-loss, and trailing orders. Whether you're a beginner or running an algo, NETFLOW has you covered.",
    },
    {
      heading: "Self-custody optional",
      body: "Hold assets on the platform with insured cold storage, or withdraw to your own wallet anytime — no questions asked.",
    },
  ],
  cta: { label: "Start trading", href: "/signup" },
});

export const StocksPage = make({
  eyebrow: "Product",
  title: "Stocks & ETFs, fractionalized",
  subtitle: "Invest in 5,000+ US equities and ETFs from $1. No commissions on stock trades.",
  sections: [
    {
      heading: "Fractional shares",
      body: "Own a slice of Apple, Tesla, or NVIDIA for as little as $1. Perfect for dollar-cost averaging into blue chips.",
      bullets: ["$0 commission", "Fractional from $1", "Real-time quotes"],
    },
    {
      heading: "Curated thematic baskets",
      body: "Invest in themes like AI, clean energy, or semiconductors with a single click. Rebalanced quarterly by our research team.",
    },
    {
      heading: "Pre & post-market trading",
      body: "Extended hours access lets you react to earnings and news the moment they break.",
    },
  ],
  cta: { label: "Browse stocks", href: "/markets" },
});

export const AutoInvestPage = make({
  eyebrow: "Product",
  title: "Auto-invest your way to wealth",
  subtitle: "Set a recurring buy plan and let dollar-cost averaging do the work. Daily, weekly, or monthly.",
  sections: [
    {
      heading: "Set it and forget it",
      body: "Choose any asset, any amount, any cadence. NETFLOW executes flawlessly — even on weekends and holidays.",
      bullets: ["Pause anytime", "No fees on plans", "Tax-lot tracked"],
    },
    {
      heading: "Backtested confidence",
      body: "See historical performance for any DCA strategy before you commit. Learn from data, not hype.",
    },
  ],
  cta: { label: "Create a plan", href: "/earn" },
});

export const CopyTradingPage = make({
  eyebrow: "Product",
  title: "Copy the best, automatically",
  subtitle: "Mirror top traders' strategies in real-time. Their trades, your portfolio, zero effort.",
  sections: [
    {
      heading: "Verified track records",
      body: "Every trader on the leaderboard has audited, on-platform performance. No screenshots, no fakes.",
      bullets: ["1,200+ verified traders", "Live ROI feed", "Risk-graded strategies"],
    },
    {
      heading: "Full transparency",
      body: "See every trade, every position, every fee. Stop copying anytime with one click.",
    },
  ],
  cta: { label: "Browse traders", href: "/copy" },
});

export const MarketsLandingPage = make({
  eyebrow: "Product",
  title: "Every market. One place.",
  subtitle: "Crypto, stocks, ETFs, FX, and commodities — unified under one elegant interface.",
  sections: [
    {
      heading: "Real-time data",
      body: "Sub-second quotes from every major exchange. No delayed feeds, no surprises.",
    },
    {
      heading: "Pro-grade charting",
      body: "100+ indicators, drawing tools, and multi-chart layouts — powered by TradingView.",
    },
  ],
  cta: { label: "Open markets", href: "/markets" },
});

// ===== COMPANY =====
export const AboutPage = make({
  eyebrow: "Company",
  title: "Smart investing for everyone",
  subtitle: "We're building the most trusted investment platform of the next decade, combining advanced AI with institutional-grade security.",
  sections: [
    {
      heading: "Our Mission",
      body: "Financial markets shouldn't be reserved for the few. NETFLOW exists to give everyone — from first-time investors to seasoned pros — the tools, data, and confidence to build wealth in the digital age. We're democratizing access to complex financial instruments through simple, elegant technology.",
    },
    {
      heading: "Our Story",
      body: "Founded in 2021 by a team of engineers from Goldman Sachs and Stripe, NETFLOW was born out of frustration with the fragmented nature of modern investing. We saw a world where you needed five different apps to manage your portfolio. We built NETFLOW to be the only one you'll ever need.",
    },
    {
      heading: "Institutional-Grade Infrastructure",
      body: "We don't just build apps; we build infrastructure. Our proprietary matching engine handles millions of orders per second with microsecond latency, while our multi-signature cold storage vault ensures your assets are protected by the same security protocols used by central banks.",
    },
    {
      heading: "Backed by the Best",
      body: "Funded by Sequoia, a16z, and Coinbase Ventures. Headquartered in Singapore with offices in NYC, London, and Dubai. We are supported by a global network of institutional liquidity providers and security auditors.",
    },
    {
      heading: "Regulated Globally",
      body: "Licensed in 40+ jurisdictions. SOC 2 Type II certified. ISO 27001 compliant. We work closely with regulators to ensure that the future of finance is built on a foundation of compliance and trust.",
    },
  ],
});

export const CareersPage = make({
  eyebrow: "Company",
  title: "Build the future of finance",
  subtitle: "Join 400+ engineers, designers, and operators rewriting how the world invests. We're building the infrastructure for the next billion investors.",
  sections: [
    {
      heading: "Our Culture",
      body: "At NETFLOW, we value radical transparency, extreme ownership, and a bias for action. We're a remote-first company with physical hubs for those who love the office energy. We believe in high-trust, low-bureaucracy environments where the best ideas win.",
    },
    {
      heading: "Open Roles",
      body: "We're currently hiring across all departments. If you're passionate about decentralized finance, fintech, and creating world-class user experiences, we want to hear from you.",
      bullets: [
        "Senior Frontend Engineer (React/Tailwind) - Remote",
        "Lead Product Designer (Fintech Experience) - NYC/Remote",
        "Backend Infrastructure Engineer (Go/Rust) - London/Remote",
        "Head of Regulatory Compliance - Singapore",
        "Quantitative Research Lead - Dubai/Remote",
        "Customer Success Lead (24/7 Ops) - Remote"
      ],
    },
    {
      heading: "Perks & Benefits",
      body: "We offer top-tier compensation and a comprehensive benefits package designed to help you do your best work and live your best life.",
      bullets: [
        "Top 1% salary + performance bonuses",
        "Generous equity packages with early exercise",
        "Unlimited PTO (minimum 3 weeks mandated)",
        "Home office stipend ($2,500 initial)",
        "Annual learning & development budget ($5,000)",
        "Health, dental, and vision for you and family"
      ],
    },
  ],
  cta: { label: "View all openings", href: "#" },
});

export const PressPage = make({
  eyebrow: "Company",
  title: "Press & media",
  subtitle: "The latest news, announcements, and brand assets for journalists.",
  sections: [
    {
      heading: "Recent coverage",
      body: "Featured in Bloomberg, TechCrunch, The Information, CoinDesk, and the Financial Times.",
    },
    {
      heading: "Media kit",
      body: "Download logos, product screenshots, and executive headshots. Available in light and dark variants.",
    },
    {
      heading: "Press inquiries",
      body: "For interviews, comments, or background — reach our communications team at press@netflow.example.",
    },
  ],
});

export const BlogPage = make({
  eyebrow: "Company",
  title: "The NETFLOW Blog",
  subtitle: "Insights on markets, product updates, and the future of finance.",
  sections: [
    {
      heading: "Q1 2026 product roadmap",
      body: "A look at what we're shipping next — from options trading to social portfolios and AI co-pilots.",
    },
    {
      heading: "Why we built copy trading",
      body: "The story behind our most-requested feature, and how we made it safe for first-time investors.",
    },
    {
      heading: "Behind the brand",
      body: "How our design team crafted the NETFLOW visual identity from a single neon spark.",
    },
  ],
});

export const SecurityPage = make({
  eyebrow: "Company",
  title: "Security at NETFLOW",
  subtitle: "Bank-grade protection. Audited code. Zero compromises on your assets.",
  sections: [
    {
      heading: "Custody & insurance",
      body: "98% of assets in cold storage with multi-sig. Hot wallet balances insured up to $500M by Lloyd's of London.",
      bullets: ["SOC 2 Type II", "ISO 27001", "$500M insurance"],
    },
    {
      heading: "Account protection",
      body: "Mandatory 2FA, biometric login, withdrawal allow-lists, and 24-hour withdrawal delay on first transfers to a new address.",
    },
    {
      heading: "Bug bounty",
      body: "Up to $1M for critical vulnerabilities. Run in partnership with HackerOne.",
    },
  ],
});

// ===== RESOURCES =====
export const HelpCenterPage = make({
  eyebrow: "Resources",
  title: "Help Center",
  subtitle: "Find answers, guides, and walkthroughs for every NETFLOW feature. Our support team is available 24/7 to assist you.",
  sections: [
    {
      heading: "Getting Started",
      body: "New to NETFLOW? Learn how to set up your account and start your investment journey in minutes.",
      bullets: [
        "How to create and verify your account",
        "Funding your wallet: Crypto & Bank transfers",
        "Connecting your first bank account via Plaid",
        "Security best practices: Enabling 2FA"
      ],
    },
    {
      heading: "Trading & Investing",
      body: "Understand how our markets work, from spot trading to automated investment plans.",
      bullets: [
        "Placing your first trade (Market vs. Limit)",
        "Setting up Auto-Invest recurring buys",
        "Understanding copy trading and risk scores",
        "Reading the order book and depth charts"
      ],
    },
    {
      heading: "Wallet & Transfers",
      body: "Manage your assets across multiple chains and traditional banking systems.",
      bullets: [
        "Withdrawal limits and processing times",
        "Supported networks and asset recovery",
        "Staking and earning rewards on your idle assets",
        "Exporting transaction history for tax reporting"
      ],
    },
    {
      heading: "Account Security",
      body: "Learn how we protect your assets and what you can do to stay secure.",
      bullets: [
        "Resetting your password or 2FA",
        "Managing trusted devices and sessions",
        "Reporting suspicious activity",
        "Understanding our insurance coverage"
      ],
    },
  ],
});

export const ApiDocsPage = make({
  eyebrow: "Resources",
  title: "Developer API",
  subtitle: "Build on NETFLOW. REST and WebSocket APIs for trading, market data, and accounts.",
  sections: [
    {
      heading: "REST API",
      body: "Place orders, fetch balances, and query market data with simple HTTPS endpoints. OpenAPI spec available.",
      bullets: ["1,000 req/min rate limit", "HMAC-SHA256 auth", "Sandbox environment"],
    },
    {
      heading: "WebSocket streams",
      body: "Real-time order book, trade, and ticker streams with sub-10ms latency from our AWS regions.",
    },
    {
      heading: "SDKs",
      body: "Official libraries for Python, TypeScript, Go, and Rust. Community SDKs for everything else.",
    },
  ],
});

export const StatusPage = make({
  eyebrow: "Resources",
  title: "System status",
  subtitle: "Real-time uptime and incident reports for every NETFLOW service.",
  sections: [
    {
      heading: "All systems operational",
      body: "Trading, deposits, withdrawals, and APIs are all running normally.",
      bullets: ["Trading: 100% uptime (90d)", "Deposits: 99.99%", "API: 99.98%"],
    },
    {
      heading: "Past incidents",
      body: "No incidents reported in the last 30 days. Subscribe to status updates via email or RSS.",
    },
  ],
});

export const FeesPage = make({
  eyebrow: "Resources",
  title: "Transparent fees",
  subtitle: "No hidden charges. No surprise spreads. See exactly what you pay.",
  sections: [
    {
      heading: "Trading fees",
      body: "Crypto: 0.10% maker / 0.20% taker. Stocks & ETFs: $0 commission. FX: 0.5% spread.",
    },
    {
      heading: "Deposits & withdrawals",
      body: "Free ACH and SEPA deposits. Crypto deposits free. Withdrawal fees vary by network.",
    },
    {
      heading: "Volume discounts",
      body: "Trade more, pay less. Tiered fee structure scales down to 0.02% for $50M+ monthly volume.",
    },
  ],
});

export const TaxCenterPage = make({
  eyebrow: "Resources",
  title: "Tax Center",
  subtitle: "Generate tax reports, track cost basis, and export to TurboTax in one click.",
  sections: [
    {
      heading: "Automatic tracking",
      body: "Every trade, dividend, and reward is logged with cost basis using FIFO, LIFO, or HIFO accounting.",
    },
    {
      heading: "One-click exports",
      body: "Form 8949, Schedule D, and country-specific reports for US, UK, Canada, Australia, and Germany.",
    },
    {
      heading: "TurboTax integration",
      body: "Direct import into TurboTax, TaxAct, and CoinTracker. Or download CSV for any other software.",
    },
  ],
});

// ===== LEGAL =====
export const TermsPage = make({
  eyebrow: "Legal",
  title: "Terms of Service",
  subtitle: "Last updated: May 1, 2026. This comprehensive agreement governs your use of the NETFLOW ecosystem.",
  sections: [
    {
      heading: "1. Agreement to Terms",
      body: "By accessing or using NETFLOW (the 'Platform'), you agree to be bound by these Terms of Service and all applicable laws and regulations. These terms constitute a legally binding agreement between you ('User', 'you', or 'your') and NETFLOW Technologies Ltd. ('NETFLOW', 'we', 'us', or 'our'). If you do not agree with any of these terms, you are prohibited from using or accessing this site.",
    },
    {
      heading: "2. License & Access",
      body: "NETFLOW grants you a limited, non-exclusive, non-transferable license to access and use the Platform for your personal, non-commercial purposes. This license is subject to your compliance with these Terms.",
      bullets: [
        "You may not modify or copy the Platform materials",
        "No automated data collection or 'scraping' is permitted",
        "No reverse engineering of the Platform's source code",
        "No removal of any copyright or proprietary notations"
      ],
    },
    {
      heading: "3. User Representation & Warranties",
      body: "By using our services, you represent and warrant that you are of legal age to form a binding contract, you have not been previously suspended or removed from our services, and your use of the Platform will not violate any applicable laws or regulations.",
    },
    {
      heading: "4. Digital Asset Risks",
      body: "The risk of loss in trading or holding digital assets can be substantial. You should therefore carefully consider whether trading or holding digital assets is suitable for you in light of your financial condition. Digital assets are not legal tender and are not backed by any government.",
      bullets: [
        "Market volatility is extremely high and unpredictable",
        "Cybersecurity risks: Hacking, phishing, and malware",
        "Regulatory risks: Changes in law may affect asset value",
        "Operational risks: Technical failures or exchange outages"
      ],
    },
    {
      heading: "5. Account Security & Verification",
      body: "You are responsible for maintaining the security of your account credentials. NETFLOW is not responsible for any loss or damage resulting from your failure to protect your account.",
      bullets: [
        "Mandatory 2FA (Two-Factor Authentication) for all withdrawals",
        "Verification of identity (KYC) is required for full feature access",
        "We monitor for suspicious activity and may freeze accounts pending review"
      ],
    },
    {
      heading: "6. Prohibited Use Cases",
      body: "You may not use NETFLOW for any activity that is illegal, fraudulent, or harmful. This includes, but is not limited to, market manipulation, wash trading, or using the Platform to facilitate the purchase of illegal goods or services.",
    },
    {
      heading: "7. Fees, Payments & Taxes",
      body: "All fees are clearly disclosed in our Fee Schedule. By using the Platform, you agree to pay all applicable fees. You are solely responsible for determining what, if any, taxes apply to your transactions and for reporting and remitting the correct tax to the appropriate tax authority.",
    },
    {
      heading: "8. Limitation of Liability",
      body: "In no event shall NETFLOW or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Platform.",
    },
    {
      heading: "9. Indemnification",
      body: "You agree to indemnify, defend, and hold harmless NETFLOW and its affiliates from and against any claims, damages, costs, liabilities, and expenses arising out of or related to your use of the Platform or your violation of these Terms.",
    },
    {
      heading: "10. Modifications & Updates",
      body: "NETFLOW may revise these Terms of Service for its Platform at any time without notice. By using this Platform you are agreeing to be bound by the then current version of these Terms of Service.",
    },
    {
      heading: "11. Governing Law & Dispute Resolution",
      body: "Any claim relating to NETFLOW's Platform shall be governed by the laws of our primary jurisdiction without regard to its conflict of law provisions. Any disputes shall be resolved through binding arbitration.",
    },
  ],
});

export const PrivacyPage = make({
  eyebrow: "Legal",
  title: "Privacy Policy",
  subtitle: "How we collect, use, and protect your personal data. We believe privacy is a fundamental right.",
  sections: [
    {
      heading: "1. Information We Collect",
      body: "We collect information that identifies you or can be used to identify you ('Personal Data'). This includes information you provide directly to us, such as your name, email address, date of birth, social security number (or equivalent), and government-issued identification documents.",
      bullets: [
        "Biometric data for liveness checks during KYC",
        "Financial information: Bank account details and transaction history",
        "Technical data: IP address, device ID, and browser type",
        "Usage data: How you interact with our Platform"
      ],
    },
    {
      heading: "2. How We Use Your Information",
      body: "We use your data to provide our services, maintain security, and comply with legal obligations. We do not sell your personal data to third parties for marketing purposes.",
      bullets: [
        "Verifying your identity and preventing fraud",
        "Processing trades and managing your portfolio",
        "Providing customer support and personalized insights",
        "Complying with AML/KYC regulations and tax reporting"
      ],
    },
    {
      heading: "3. Data Sharing & Disclosure",
      body: "We may share your information with trusted third-party service providers who assist us in operating our Platform, such as identity verification services (e.g., Plaid, Onfido) and cloud infrastructure providers (e.g., AWS).",
      bullets: [
        "With regulators and law enforcement when required by law",
        "With our affiliates and subsidiaries for internal operations",
        "In the event of a merger, acquisition, or sale of assets"
      ],
    },
    {
      heading: "4. Data Security",
      body: "We implement robust security measures to protect your data from unauthorized access, alteration, or destruction. This includes end-to-end encryption, multi-factor authentication, and regular security audits by independent third parties.",
    },
    {
      heading: "5. Your Rights & Choices",
      body: "Depending on your location, you may have rights under data protection laws (such as GDPR or CCPA) to access, correct, delete, or limit the use of your personal data.",
      bullets: [
        "Request a copy of your personal data",
        "Opt-out of non-essential communications",
        "Request account deletion (subject to legal retention periods)"
      ],
    },
    {
      heading: "6. Cookies & Tracking",
      body: "We use cookies and similar technologies to enhance your experience and analyze platform performance. You can manage your cookie preferences in your browser settings.",
    },
  ],
});

export const DisclosuresPage = make({
  eyebrow: "Legal",
  title: "Risk disclosures",
  subtitle: "Important information about the risks of investing on NETFLOW.",
  sections: [
    {
      heading: "Crypto-asset risks",
      body: "Digital assets are highly volatile and may lose all value. Smart contract bugs, regulatory changes, and exchange failures are real risks.",
    },
    {
      heading: "Securities risks",
      body: "Stocks and ETFs may decline in value. Margin trading amplifies both gains and losses. Read our margin disclosure before borrowing.",
    },
    {
      heading: "Operational risks",
      body: "While we maintain 99.99% uptime, market access can be temporarily disrupted. Use limit orders to manage execution risk.",
    },
  ],
});

export const LicensesPage = make({
  eyebrow: "Legal",
  title: "Licenses & registrations",
  subtitle: "NETFLOW is licensed and regulated in 40+ jurisdictions worldwide.",
  sections: [
    {
      heading: "United States",
      body: "Money Services Business registered with FinCEN. Money Transmitter Licenses in 49 states. Broker-dealer subsidiary registered with FINRA.",
    },
    {
      heading: "European Union",
      body: "Authorised under MiCA by the Central Bank of Ireland. Passportable across all EEA member states.",
    },
    {
      heading: "Asia-Pacific",
      body: "MAS-licensed in Singapore (Major Payment Institution). FSA-registered in Japan. AUSTRAC-registered in Australia.",
    },
  ],
});

export const CookiesPage = make({
  eyebrow: "Legal",
  title: "Cookie Policy",
  subtitle: "How and why we use cookies and similar technologies.",
  sections: [
    {
      heading: "What cookies we use",
      body: "Essential cookies for login and security. Analytics cookies to understand usage. No third-party advertising cookies — ever.",
    },
    {
      heading: "Manage your preferences",
      body: "Adjust cookie settings anytime from your browser or our preference center. Disabling essential cookies will break functionality.",
    },
  ],
});
