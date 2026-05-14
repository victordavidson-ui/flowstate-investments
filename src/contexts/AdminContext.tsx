import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";
import api from "../lib/axios";
import { useAuth } from "./AuthContext";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  balance: number;
  plan: string;
  status: "Verified" | "Pending KYC" | "Suspended" | "Unverified";
  riskLevel: "Low" | "Medium" | "High";
  badges: string[];
  joinedAt: string;
};

export type AdminTransaction = {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  type: string;
  status: "Completed" | "Pending" | "Failed" | "Rejected";
  date: string;
  asset?: string;
  walletAddress?: string;
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
  updateTransactionStatus: (id: string, status: AdminTransaction["status"], finalAmount?: number) => void;
  editUserBalance: (id: string, balance: number) => Promise<void>;
  toggleTrading: () => void;
  updateSettings: (key: keyof AdminContextState["settings"], value: boolean | number) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [state, setState] = useState<AdminContextState>({
    users: [],
    transactions: [],
    securityLogs: [],
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

  const fetchAdminData = async () => {
    if (user?.role !== 'admin') return;
    try {
      const [usersRes, txsRes] = await Promise.all([
        api.get('/admin/users'),
        api.get('/admin/transactions')
      ]);

      const users: AdminUser[] = usersRes.data.map((u: any) => ({
        id: u._id,
        name: `${u.firstName} ${u.lastName}`,
        email: u.email,
        balance: u.balance,
        plan: "Basic",
        status: u.kycStatus === 'verified' ? "Verified" : u.kycStatus === 'pending' ? "Pending KYC" : "Unverified",
        riskLevel: "Low",
        badges: u.role === 'admin' ? ["Admin"] : [],
        joinedAt: u.createdAt,
      }));

      const transactions: AdminTransaction[] = txsRes.data.map((t: any) => ({
        id: t._id,
        userId: t.user?._id || t.user,
        userName: t.user ? `${t.user.firstName} ${t.user.lastName}` : 'Unknown User',
        amount: t.amount,
        type: t.type.charAt(0).toUpperCase() + t.type.slice(1),
        status: t.status.charAt(0).toUpperCase() + t.status.slice(1),
        date: t.createdAt,
        asset: t.asset,
        walletAddress: t.walletAddress
      }));

      setState(prev => ({ ...prev, users, transactions }));
    } catch (error) {
      console.error("Failed to fetch admin data", error);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [user]);

  const updateUserStatus = async (id: string, status: AdminUser["status"]) => {
    // Ideally this hits a backend endpoint to update status
    toast.success(`User status update mocked on frontend for now.`);
  };

  const updateTransactionStatus = async (id: string, status: AdminTransaction["status"], finalAmount?: number) => {
    try {
      await api.put(`/admin/transactions/${id}/status`, { status: status.toLowerCase(), finalAmount });
      toast.success(`Transaction ${id} marked as ${status}`);
      fetchAdminData(); // Refresh data
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to update transaction status");
    }
  };

  const editUserBalance = async (id: string, balance: number) => {
    try {
      await api.put(`/admin/users/${id}/balance`, { balance });
      toast.success(`User balance updated successfully`);
      fetchAdminData(); // Refresh to get updated balance
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to edit balance");
    }
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
    <AdminContext.Provider value={{ state, updateUserStatus, updateTransactionStatus, editUserBalance, toggleTrading, updateSettings }}>
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
