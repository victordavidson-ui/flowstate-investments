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
  subtitle: "We're building the most trusted investment platform of the next decade.",
  sections: [
    {
      heading: "Our mission",
      body: "Financial markets shouldn't be reserved for the few. NETFLOW exists to give everyone — from first-time investors to seasoned pros — the tools, data, and confidence to build wealth.",
    },
    {
      heading: "Backed by the best",
      body: "Funded by Sequoia, a16z, and Coinbase Ventures. Headquartered in Singapore with offices in NYC, London, and Dubai.",
    },
    {
      heading: "Regulated globally",
      body: "Licensed in 40+ jurisdictions. SOC 2 Type II certified. ISO 27001 compliant.",
    },
  ],
});

export const CareersPage = make({
  eyebrow: "Company",
  title: "Build the future of finance",
  subtitle: "Join 400+ engineers, designers, and operators rewriting how the world invests.",
  sections: [
    {
      heading: "Open roles",
      body: "We're hiring across engineering, product, design, compliance, and growth. Remote-first with hubs in Singapore, NYC, and London.",
      bullets: ["Senior Frontend Engineer", "ML Research Lead", "Compliance Counsel (US)", "Product Designer"],
    },
    {
      heading: "Why NETFLOW",
      body: "Top 1% comp, generous equity, unlimited PTO, $5K annual learning stipend, and the chance to ship products used by millions.",
    },
  ],
  cta: { label: "See all openings", href: "#" },
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
  subtitle: "Find answers, guides, and walkthroughs for every NETFLOW feature.",
  sections: [
    {
      heading: "Getting started",
      body: "Open an account, complete KYC, fund your wallet, and place your first trade in under 10 minutes.",
    },
    {
      heading: "Trading basics",
      body: "Learn order types, fees, settlement, and how to read a candlestick chart.",
    },
    {
      heading: "Account & security",
      body: "Reset 2FA, change your email, and manage withdrawal allow-lists.",
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
  subtitle: "The agreement between you and NETFLOW for using our platform.",
  sections: [
    {
      heading: "Eligibility",
      body: "You must be at least 18 years old and legally able to enter contracts in your jurisdiction. Some products are restricted by region.",
    },
    {
      heading: "Account responsibilities",
      body: "You are responsible for safeguarding your credentials, 2FA device, and recovery codes. NETFLOW cannot recover lost passwords without identity verification.",
    },
    {
      heading: "Risk acknowledgement",
      body: "Investing involves risk including total loss of capital. Past performance does not guarantee future results. Read our risk disclosures in full.",
    },
  ],
});

export const PrivacyPage = make({
  eyebrow: "Legal",
  title: "Privacy Policy",
  subtitle: "How we collect, use, and protect your personal data.",
  sections: [
    {
      heading: "What we collect",
      body: "Identity (KYC), contact info, device data, transaction history, and usage analytics. We never sell your data.",
    },
    {
      heading: "How we use it",
      body: "To operate the platform, comply with regulations, prevent fraud, and improve the product. Marketing emails are opt-in only.",
    },
    {
      heading: "Your rights",
      body: "Access, correct, export, or delete your data anytime. GDPR and CCPA compliant. Contact privacy@netflow.example.",
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
