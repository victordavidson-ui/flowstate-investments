import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { PortfolioProvider } from "@/contexts/PortfolioContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { AdminProvider } from "@/contexts/AdminContext";
import App from "./App.tsx";
import "./index.css";
import "./i18n.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <AdminProvider>
        <PortfolioProvider>
          <CurrencyProvider>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              <App />
            </ThemeProvider>
          </CurrencyProvider>
        </PortfolioProvider>
      </AdminProvider>
    </AuthProvider>
  </React.StrictMode>
);
