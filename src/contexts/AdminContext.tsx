import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  balance: number;
  plan: string;
  status: "Verified" | "Pending KYC" | "Suspended";
  riskLevel: "Low" | "Medium" | "High";
  badges: string[];
  joinedAt: string;
};

export type AdminTransaction = {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  type: "Deposit" | "Withdrawal" | "Trade";
  status: "Completed" | "Pending" | "Failed";
  date: string;
};

export type SecurityLog = {
  id: string;
  event: string;
  userId?: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  date: string;
};

interface AdminContextState {
  users: AdminUser[];
  transactions: AdminTransaction[];
  securityLogs: SecurityLog[];
  settings: {
    tradingEnabled: boolean;
    withdrawalsEnabled: boolean;
    exchangeFeePercent: number;
    maintenanceMode: boolean;
  };
  metrics: {
    totalVolume: number;
    totalRevenue: number;
  };
}

interface AdminContextType {
  state: AdminContextState;
  updateUserStatus: (id: string, status: AdminUser["status"]) => void;
  updateTransactionStatus: (id: string, status: AdminTransaction["status"]) => void;
  toggleTrading: () => void;
  updateSettings: (key: keyof AdminContextState["settings"], value: boolean | number) => void;
}

const mockUsers: AdminUser[] = [
  { id: "USR-001", name: "Victor", email: "victor@example.com", balance: 128492.50, plan: "Elite", status: "Verified", riskLevel: "Low", badges: ["VIP"], joinedAt: "2023-10-12T10:00:00Z" },
  { id: "USR-002", name: "Sarah Jenkins", email: "sarah.j@example.com", balance: 45210.00, plan: "Premium", status: "Verified", riskLevel: "Low", badges: [], joinedAt: "2023-11-05T14:20:00Z" },
  { id: "USR-003", name: "Michael Chen", email: "m.chen@example.com", balance: 2150.00, plan: "Starter", status: "Pending KYC", riskLevel: "Medium", badges: [], joinedAt: "2024-01-15T09:10:00Z" },
  { id: "USR-004", name: "Elena Rodriguez", email: "elena.r@example.com", balance: 12400.00, plan: "Basic", status: "Verified", riskLevel: "Low", badges: [], joinedAt: "2023-12-20T16:45:00Z" },
  { id: "USR-005", name: "David Kim", email: "dkim99@example.com", balance: 8950.00, plan: "Starter", status: "Verified", riskLevel: "Low", badges: [], joinedAt: "2024-02-01T11:30:00Z" },
  { id: "USR-006", name: "Alex Turner", email: "alex.t@anon.com", balance: 54200.00, plan: "Premium", status: "Suspended", riskLevel: "High", badges: ["Suspicious"], joinedAt: "2024-03-10T08:15:00Z" },
];

const mockTransactions: AdminTransaction[] = [
  { id: "TX-1001", userId: "USR-002", userName: "Sarah Jenkins", amount: 5000, type: "Deposit", status: "Completed", date: "2024-04-20T10:15:00Z" },
  { id: "TX-1002", userId: "USR-006", userName: "Alex Turner", amount: 25000, type: "Withdrawal", status: "Failed", date: "2024-04-21T14:20:00Z" },
  { id: "TX-1003", userId: "USR-001", userName: "Victor", amount: 12500, type: "Trade", status: "Completed", date: "2024-04-22T09:10:00Z" },
  { id: "TX-1004", userId: "USR-004", userName: "Elena Rodriguez", amount: 1500, type: "Withdrawal", status: "Pending", date: "2024-04-22T16:45:00Z" },
];

const mockSecurityLogs: SecurityLog[] = [
  { id: "SEC-001", event: "Multiple failed login attempts", userId: "USR-003", severity: "Medium", date: "2024-04-21T08:30:00Z" },
  { id: "SEC-002", event: "Suspicious IP origin for large withdrawal request", userId: "USR-006", severity: "Critical", date: "2024-04-21T14:15:00Z" },
  { id: "SEC-003", event: "Admin settings modified", severity: "Low", date: "2024-04-20T09:00:00Z" },
];

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AdminContextState>({
    users: mockUsers,
    transactions: mockTransactions,
    securityLogs: mockSecurityLogs,
    settings: {
      tradingEnabled: true,
      withdrawalsEnabled: true,
      exchangeFeePercent: 13,
      maintenanceMode: false,
    },
    metrics: {
      totalVolume: 4250000,
      totalRevenue: 342000,
    }
  });

  const updateUserStatus = (id: string, status: AdminUser["status"]) => {
    setState(prev => ({
      ...prev,
      users: prev.users.map(u => u.id === id ? { ...u, status } : u)
    }));
    toast.success(`User ${id} status updated to ${status}`);
  };

  const updateTransactionStatus = (id: string, status: AdminTransaction["status"]) => {
    setState(prev => ({
      ...prev,
      transactions: prev.transactions.map(t => t.id === id ? { ...t, status } : t)
    }));
    toast.success(`Transaction ${id} marked as ${status}`);
  };

  const toggleTrading = () => {
    setState(prev => {
      const newState = !prev.settings.tradingEnabled;
      if (newState) {
        toast.success("Global trading has been resumed.");
      } else {
        toast.error("Global trading has been PAUSED. Emergency halt active.");
      }
      return {
        ...prev,
        settings: { ...prev.settings, tradingEnabled: newState }
      };
    });
  };

  const updateSettings = (key: keyof AdminContextState["settings"], value: boolean | number) => {
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, [key]: value }
    }));
    toast.success(`Settings updated successfully.`);
  };

  return (
    <AdminContext.Provider value={{ state, updateUserStatus, updateTransactionStatus, toggleTrading, updateSettings }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
