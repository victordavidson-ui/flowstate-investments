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
  keyPrefix: "static.about",
  eyebrow: "Company",
  title: "Rewriting the rules of global finance",
  subtitle: "NETFLOW is building the unified infrastructure for the next billion investors, combining institutional-grade security with a seamless consumer experience.",
  sections: [
    {
      heading: "Our Mission",
      body: "Financial freedom shouldn't be a privilege. Our mission is to democratize access to sophisticated investment tools that were previously only available to hedge funds and elite institutions. We believe in a world where everyone can participate in the global economy with confidence.",
    },
    {
      heading: "The NETFLOW Story",
      body: "Founded in 2021 by a group of engineers and economists from Stripe, Goldman Sachs, and NASA, NETFLOW was born out of a simple observation: the world of finance is fragmented, slow, and exclusionary. We set out to build a platform that is fast, global, and open to all.",
    },
    {
      heading: "Institutional Grade Security",
      body: "Security is not a feature; it is our foundation. We employ multi-signature cold storage, hardware security modules (HSMs), and biometric verification to ensure that your assets are protected against even the most sophisticated threats.",
    },
    {
      heading: "Our Global Footprint",
      body: "With physical offices in Singapore, London, and New York, and a remote-first team spread across 40+ countries, we are a truly global organization. We are regulated in multiple jurisdictions and work closely with local authorities to ensure compliance.",
    },
    {
      heading: "Innovation First",
      body: "We are at the forefront of financial technology. From AI-driven portfolio insights to zero-knowledge proofs for privacy-preserving verification, we are constantly pushing the boundaries of what is possible.",
    },
    {
      heading: "Environmental Responsibility",
      body: "We are committed to building a sustainable future. We offset 100% of our carbon emissions and prioritize partnerships with eco-friendly infrastructure providers.",
    },
    {
      heading: "Leadership Team",
      body: "Led by industry veterans with decades of experience in fintech, cybersecurity, and capital markets. Our board includes former regulators and technology pioneers.",
    },
  ],
});

export const CareersPage = make({
  eyebrow: "Company",
  title: "Build the future of wealth",
  subtitle: "Join a high-performance team of over 400 innovators, designers, and engineers rewriting the financial stack from the ground up.",
  sections: [
    {
      heading: "Our Culture",
      body: "We value radical transparency, extreme ownership, and a bias for action. At NETFLOW, we don't just solve problems; we redefine them. We're a remote-first company that prioritizes deep work and meaningful collaboration over meetings.",
    },
    {
      heading: "Open Roles",
      body: "We are actively hiring across all departments. If you are passionate about decentralized finance, high-frequency trading, or world-class UX, we want to hear from you.",
      bullets: [
        "Senior Frontend Engineer (React/Tailwind)",
        "Staff Backend Engineer (Rust/Go)",
        "Principal Product Designer",
        "Head of Regulatory Compliance",
        "Quantitative Research Lead",
        "Customer Success Manager",
        "Technical Recruiter"
      ],
    },
    {
      heading: "Benefits & Perks",
      body: "We take care of our people so they can take care of our mission. Our benefits are designed to support your health, wealth, and professional growth.",
      bullets: [
        "Top 1% market salary + performance bonuses",
        "Generous equity package with early exercise",
        "Unlimited PTO (minimum 3 weeks mandated)",
        "Premium health, dental, and vision for you and family",
        "Home office stipend ($3,000 initial)",
        "Annual learning & development budget ($5,000)"
      ],
    },
    {
      heading: "Our Hiring Process",
      body: "We've designed our process to be respectful of your time while ensuring a perfect fit. It usually involves a brief intro call, a technical/design deep-dive, and a 'values' round with our founders.",
    },
    {
      heading: "Internships & New Grads",
      body: "We believe in investing in the next generation of talent. Our 12-week summer internship program provides hands-on experience on mission-critical projects.",
    },
    {
      heading: "Diversity & Inclusion",
      body: "We are committed to building a diverse and inclusive workplace. We believe that different perspectives lead to better decisions and a better product.",
    },
  ],
  cta: { label: "View all openings", href: "#" },
});

export const PressPage = make({
  eyebrow: "Company",
  title: "Media & Press Room",
  subtitle: "Official announcements, media kits, and the latest news from the NETFLOW ecosystem.",
  sections: [
    {
      heading: "Recent Headlines",
      body: "Stay up to date with our latest milestones and industry insights.",
      bullets: [
        "NETFLOW raises $150M Series C led by Sequoia",
        "Launching our institutional-grade custody solution",
        "Expanding operations to the European market",
        "NETFLOW reaches 10M active users milestone"
      ],
    },
    {
      heading: "Media Kit",
      body: "Download our official brand assets, including logos, founder headshots, and high-resolution platform screenshots.",
    },
    {
      heading: "Press Contact",
      body: "For media inquiries, please reach out to our communications team at press@netflow.invest. We typically respond within 24 hours.",
    },
    {
      heading: "Brand Guidelines",
      body: "Our brand is our promise. Please follow our guidelines when using NETFLOW assets to ensure consistency and trust.",
    },
    {
      heading: "Speaker Bureau",
      body: "Our executives are available for speaking engagements at major fintech and technology conferences globally.",
    },
  ],
  cta: { label: "Download Media Kit", href: "#" },
});

export const BlogPage = make({
  eyebrow: "Company",
  title: "NETFLOW Insights",
  subtitle: "Expert analysis, product updates, and educational guides to help you navigate the future of investing.",
  sections: [
    {
      heading: "Featured Articles",
      body: "Dive deep into the most important topics in finance and technology.",
      bullets: [
        "The Future of Multi-Chain Portfolios",
        "Understanding Market Cycles: A Guide for 2026",
        "How AI is Revolutionizing Copy Trading",
        "Security Best Practices for Digital Assets"
      ],
    },
    {
      heading: "Product Updates",
      body: "See what we've been building lately. From new assets to advanced charting tools, we're constantly shipping.",
    },
    {
      heading: "Educational Series",
      body: "New to investing? Our 'NETFLOW Academy' series covers everything from 'What is a Satoshi?' to 'Advanced Options Strategies'.",
    },
    {
      heading: "Engineering Blog",
      body: "A technical look at how we build high-availability financial infrastructure. Written by our engineers, for engineers.",
    },
    {
      heading: "Community Spotlight",
      body: "Highlighting our most successful copy traders and active community members.",
    },
  ],
});

export const SecurityPage = make({
  eyebrow: "Company",
  title: "Safe and Secure",
  subtitle: "Your security is our top priority. We use institutional-grade encryption and multi-layered protection to keep your assets safe.",
  sections: [
    {
      heading: "Asset Protection",
      body: "98% of all digital assets are held in geographically distributed, multi-signature cold storage vaults. We maintain a full reserve for all user balances.",
    },
    {
      heading: "Account Security",
      body: "We provide industry-leading security tools to help you protect your account.",
      bullets: [
        "Mandatory hardware-based 2FA support",
        "Advanced withdrawal white-listing",
        "Real-time session monitoring and alerts",
        "Biometric authentication for mobile access"
      ],
    },
    {
      heading: "Compliance & Audits",
      body: "We undergo regular third-party security audits and penetration testing. We are SOC 2 Type II certified and ISO 27001 compliant.",
    },
    {
      heading: "Privacy by Design",
      body: "We believe privacy is a fundamental right. We use zero-knowledge proofs and advanced encryption to ensure your data stays your own.",
    },
    {
      heading: "Bug Bounty Program",
      body: "We partner with top ethical hackers globally to identify and patch vulnerabilities before they can be exploited. We've paid out over $1M in bounties.",
    },
    {
      heading: "Insurance Coverage",
      body: "Our hot wallets are insured against theft and cybersecurity breaches by leading global insurance providers.",
    },
    {
      heading: "System Integrity",
      body: "Our infrastructure is designed for 99.99% uptime with automated fail-over and real-time threat detection.",
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
  subtitle: "Build on the world's most powerful financial infrastructure. Our REST and WebSocket APIs provide real-time access to markets and account management.",
  sections: [
    {
      heading: "Introduction",
      body: "The NETFLOW API is organized around REST. Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.",
    },
    {
      heading: "Authentication",
      body: "Authenticate your account by including your secret key in API requests. You can manage your API keys in the Settings page of your dashboard. Never share your secret keys in publicly accessible areas.",
    },
    {
      heading: "Rate Limits",
      body: "To ensure system stability, we enforce rate limits on all API endpoints. Standard accounts are limited to 10 requests per second. Institutional accounts can request higher limits.",
    },
    {
      heading: "WebSocket Streams",
      body: "For real-time market data, use our WebSocket API. We provide low-latency streams for ticker updates, order book depth, and trade execution reports.",
    },
    {
      heading: "SDKs & Libraries",
      body: "We provide official SDKs for Python, Node.js, Go, and Ruby to help you get started quickly.",
    },
    {
      heading: "Error Codes",
      body: "Our API uses conventional HTTP response codes to indicate the success or failure of an API request. In general: 2xx codes indicate success, 4xx codes indicate an error from the client, and 5xx codes indicate an error from our servers.",
    },
  ],
  cta: { label: "View API Reference", href: "#" },
});

export const StatusPage = make({
  eyebrow: "Resources",
  title: "System Status",
  subtitle: "Real-time updates on the health and performance of the NETFLOW ecosystem. We pride ourselves on 99.99% uptime.",
  sections: [
    {
      heading: "All Systems Operational",
      body: "Our core systems are currently performing within normal parameters.",
      bullets: [
        "Trading Engine: 100% Uptime",
        "Wallet Services: 100% Uptime",
        "Public API: 100% Uptime",
        "Web Dashboard: 100% Uptime",
        "Mobile Application: 100% Uptime"
      ],
    },
    {
      heading: "Past Incidents",
      body: "Transparency is core to our values. Here are the details of our most recent maintenance and incidents.",
      bullets: [
        "Feb 12, 2026: Scheduled database maintenance (Completed)",
        "Jan 28, 2026: Minor latency on WebSocket stream (Resolved)",
        "Dec 15, 2025: API rate limit adjustment (Completed)"
      ],
    },
    {
      heading: "Monitoring Infrastructure",
      body: "We use globally distributed monitoring agents to check our system health every 30 seconds from over 50 locations worldwide.",
    },
    {
      heading: "Incident Response",
      body: "Our 24/7 on-call engineering team is notified within seconds of any system anomaly. We maintain a rigorous post-mortem process to prevent recurrence.",
    },
  ],
});

export const FeesPage = make({
  eyebrow: "Resources",
  title: "Transparent Fee Structure",
  subtitle: "No hidden charges. No surprise spreads. We believe in clear and competitive pricing for all investors.",
  sections: [
    {
      heading: "Trading Fees",
      body: "Our maker-taker fee model rewards liquidity providers and keeps costs low for all traders.",
      bullets: [
        "Maker Fee: 0.10%",
        "Taker Fee: 0.13%",
        "Volume-based discounts available for high-frequency traders"
      ],
    },
    {
      heading: "Deposit & Withdrawal Fees",
      body: "We keep our transfer fees as close to cost as possible.",
      bullets: [
        "Bank Transfers (ACH/SEPA): $0.00",
        "Crypto Deposits: $0.00",
        "Crypto Withdrawals: Dynamic based on network congestion",
        "Wire Transfers: $25.00 flat fee"
      ],
    },
    {
      heading: "Staking & Earn Fees",
      body: "We charge a small 5% commission on rewards earned to cover infrastructure and slashing insurance costs.",
    },
    {
      heading: "Institutional Pricing",
      body: "Custom fee schedules, sub-account management, and dedicated support for institutional clients with over $10M AUM.",
    },
    {
      heading: "No Account Fees",
      body: "We do not charge for account maintenance, inactivity, or opening an account.",
    },
  ],
});

export const TaxCenterPage = make({
  eyebrow: "Resources",
  title: "Tax Reporting Center",
  subtitle: "Simplified tax reporting for your digital assets and investments. We provide the tools you need to stay compliant.",
  sections: [
    {
      heading: "Automated Tax Forms",
      body: "Download pre-filled tax forms (e.g., Form 1099-B, 1099-MISC) directly from your dashboard every January.",
    },
    {
      heading: "Transaction Exports",
      body: "Export your entire transaction history in CSV or PDF format, compatible with leading tax software like TurboTax and CoinTracker.",
    },
    {
      heading: "Cost Basis Tracking",
      body: "We use the FIFO (First-In, First-Out) method by default for cost basis tracking, but you can customize this in your settings.",
    },
    {
      heading: "Tax Professionals",
      body: "Invite your accountant to view your reports through our secure 'Accountant Access' portal.",
    },
    {
      heading: "Global Tax Guides",
      body: "We provide region-specific tax guides for the US, UK, EU, and Singapore to help you understand your local obligations.",
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
  title: "Risk Disclosures",
  subtitle: "Investing involves risk. Please understand the nature of the products you are trading.",
  sections: [
    {
      heading: "Market Risk",
      body: "Prices can and do fluctuate on any given day. Due to such fluctuations, you may gain or lose value of your assets at any given moment. Any asset or currency may be subject to large swings in value and may even become worthless.",
    },
    {
      heading: "Liquidity Risk",
      body: "Some assets may have low liquidity, making it difficult or impossible to exit a position at the current market price. This is especially true for small-cap tokens and during periods of extreme market stress.",
    },
    {
      heading: "Technology Risk",
      body: "The Platform and the underlying blockchains are subject to technical risks, including software bugs, hardware failures, and malicious attacks. We do not guarantee that the services will be uninterrupted or error-free.",
    },
    {
      heading: "Regulatory Risk",
      body: "The regulatory status of digital assets is currently unsettled in many jurisdictions. Changes in law or regulation may affect the value of your assets or your ability to use the Platform.",
    },
    {
      heading: "Custodial Risk",
      body: "While we employ institutional-grade security, no custodial solution is entirely without risk. You acknowledge that your assets are subject to the risks of our custodial infrastructure.",
    },
  ],
});

export const LicensesPage = make({
  eyebrow: "Legal",
  title: "Licenses & Registrations",
  subtitle: "NETFLOW is committed to regulatory compliance and holds licenses in multiple jurisdictions.",
  sections: [
    {
      heading: "United States",
      body: "NETFLOW is registered as a Money Services Business (MSB) with FinCEN and holds Money Transmitter Licenses (MTL) in 40+ states.",
    },
    {
      heading: "Europe",
      body: "NETFLOW is registered as a Virtual Asset Service Provider (VASP) in several EU member states and is compliant with AMLD5 regulations.",
    },
    {
      heading: "Singapore",
      body: "NETFLOW holds a Major Payment Institution license from the Monetary Authority of Singapore (MAS).",
    },
    {
      heading: "United Kingdom",
      body: "NETFLOW is registered with the Financial Conduct Authority (FCA) for crypto-asset activities.",
    },
    {
      heading: "Other Jurisdictions",
      body: "We are constantly expanding our regulatory footprint. Please check our full list of registrations for updates.",
    },
  ],
});

export const CookiesPage = make({
  eyebrow: "Legal",
  title: "Cookie Policy",
  subtitle: "How we use cookies and similar technologies to improve your experience.",
  sections: [
    {
      heading: "What are cookies?",
      body: "Cookies are small text files that are placed on your device by websites that you visit. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.",
    },
    {
      heading: "Necessary Cookies",
      body: "These cookies are essential for you to move around the website and use its features, such as accessing secure areas of the website. Without these cookies, services like logging in cannot be provided.",
    },
    {
      heading: "Performance Cookies",
      body: "These cookies collect information about how visitors use a website, for instance which pages visitors go to most often. These cookies don't collect information that identifies a visitor. All information these cookies collect is aggregated and therefore anonymous.",
    },
    {
      heading: "Functionality Cookies",
      body: "These cookies allow the website to remember choices you make (such as your user name, language or the region you are in) and provide enhanced, more personal features.",
    },
    {
      heading: "Managing Cookies",
      body: "Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit www.aboutcookies.org.",
    },
  ],
});
