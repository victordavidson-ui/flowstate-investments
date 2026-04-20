import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import KYC from "./pages/KYC.tsx";
import { AppLayout } from "./components/app/AppLayout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Markets from "./pages/Markets.tsx";
import Trade from "./pages/Trade.tsx";
import Wallet from "./pages/Wallet.tsx";
import Settings from "./pages/Settings.tsx";
import Copy from "./pages/Copy.tsx";
import Earn from "./pages/Earn.tsx";
import {
  CryptoPage,
  StocksPage,
  AutoInvestPage,
  CopyTradingPage,
  MarketsLandingPage,
  AboutPage,
  CareersPage,
  PressPage,
  BlogPage,
  SecurityPage,
  HelpCenterPage,
  ApiDocsPage,
  StatusPage,
  FeesPage,
  TaxCenterPage,
  TermsPage,
  PrivacyPage,
  DisclosuresPage,
  LicensesPage,
  CookiesPage,
} from "./pages/static";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/kyc" element={<KYC />} />

          {/* Footer / marketing pages */}
          <Route path="/markets-overview" element={<MarketsLandingPage />} />
          <Route path="/crypto" element={<CryptoPage />} />
          <Route path="/stocks" element={<StocksPage />} />
          <Route path="/auto-invest" element={<AutoInvestPage />} />
          <Route path="/copy-trading" element={<CopyTradingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/press" element={<PressPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/api" element={<ApiDocsPage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/fees" element={<FeesPage />} />
          <Route path="/tax" element={<TaxCenterPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/disclosures" element={<DisclosuresPage />} />
          <Route path="/licenses" element={<LicensesPage />} />
          <Route path="/cookies" element={<CookiesPage />} />

          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/trade" element={<Trade />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/copy" element={<Copy />} />
            <Route path="/earn" element={<Earn />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
