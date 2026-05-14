import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/utils/ScrollToTop";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import ForgotPassword from "./pages/ForgotPassword";
import KYC from "./pages/KYC.tsx";
import { AppLayout } from "./components/app/AppLayout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Markets from "./pages/Markets.tsx";
import Trade from "./pages/Trade.tsx";
import Wallet from "./pages/Wallet.tsx";
import Settings from "./pages/Settings.tsx";
import Copy from "./pages/Copy.tsx";
import Earn from "./pages/Earn.tsx";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import TradeHistoryPage from "./pages/TradeHistory.tsx";
import PlansPage from "./pages/Plans.tsx";
import ReferralsPage from "./pages/Referrals.tsx";
import SupportPage from "./pages/Support.tsx";
import { AdminLayout } from "./pages/admin/AdminLayout.tsx";
import { AdminDashboard } from "./pages/admin/AdminDashboard.tsx";
import { AdminUsers } from "./pages/admin/AdminUsers.tsx";
import { AdminTransactions } from "./pages/admin/AdminTransactions.tsx";
import { AdminTrading } from "./pages/admin/AdminTrading.tsx";
import { AdminSecurity } from "./pages/admin/AdminSecurity.tsx";
import { AdminSettings } from "./pages/admin/AdminSettings.tsx";
import { AdminLogin } from "./pages/admin/AdminLogin.tsx";
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
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
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

          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/markets" element={<Markets />} />
              <Route path="/trade" element={<Trade />} />
              <Route path="/history" element={<TradeHistoryPage />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/copy" element={<Copy />} />
              <Route path="/earn" element={<Earn />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/plans" element={<PlansPage />} />
              <Route path="/referrals" element={<ReferralsPage />} />
              <Route path="/support" element={<SupportPage />} />
            </Route>
          </Route>
          
          {/* ADMIN ROUTES */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route element={<ProtectedRoute requireAdmin />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="transactions" element={<AdminTransactions />} />
              <Route path="trading" element={<AdminTrading />} />
              <Route path="security" element={<AdminSecurity />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
