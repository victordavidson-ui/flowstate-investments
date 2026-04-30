import React, { createContext, useContext, useEffect, useState, useMemo } from "react";

export type Transaction = {
  id: string;
  type: "Deposit" | "Withdraw" | "Exchange" | "Plan Purchase" | "Fee";
  asset: string;
  amount: string;
  value: string;
  date: string;
  up: boolean;
};

export type Trade = {
  id: string;
  pair: string;
  side: "Buy" | "Sell";
  type: "Market" | "Limit";
  amount: string;
  price: string;
  total: string;
  date: string;
  status: "Filled" | "Pending" | "Cancelled";
};

export type Plan = "Starter" | "Basic" | "Premium" | "Elite" | "None";

export interface PortfolioState {
  isDemo: boolean;
  balanceUSD: number;
  holdings: Record<string, number>;
  transactions: Transaction[];
  trades: Trade[];
  plan: Plan;
  referrals: number;
  commissions: number;
  walletAddresses: Record<string, string>;
}

interface PortfolioContextType {
  state: PortfolioState;
  toggleDemo: () => void;
  deposit: (amount: number) => void;
  exchange: (fromAsset: string, toAsset: string, amount: number, rate: number) => void;
  executeTrade: (trade: Omit<Trade, "id" | "date">) => void;
  upgradePlan: (plan: Plan, cost: number) => void;
  adminStats: { totalFeesCollected: number };
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// Helper to generate a realistic crypto address
const generateAddress = (sym: string) => {
  const chars = "0123456789abcdef";
  let addr = "";
  if (sym === "BTC") {
    addr = "bc1q";
    for (let i = 0; i < 38; i++) addr += chars[Math.floor(Math.random() * chars.length)];
  } else if (sym === "ETH" || sym === "BNB" || sym === "MATIC") {
    addr = "0x";
    for (let i = 0; i < 40; i++) addr += chars[Math.floor(Math.random() * chars.length)];
  } else {
    addr = "nf_";
    for (let i = 0; i < 32; i++) addr += chars[Math.floor(Math.random() * chars.length)];
  }
  return addr;
};

const initialHoldings = {
  "BTC": 0.842,
  "ETH": 12.4,
  "SOL": 210.5,
};

const defaultAddresses = Object.keys(initialHoldings).reduce((acc, sym) => {
  acc[sym] = generateAddress(sym);
  return acc;
}, {} as Record<string, string>);

const defaultState: PortfolioState = {
  isDemo: false,
  balanceUSD: 12480.50,
  holdings: initialHoldings,
  transactions: [],
  trades: [],
  plan: "None",
  referrals: 0,
  commissions: 0,
  walletAddresses: defaultAddresses,
};

const demoState: PortfolioState = {
  isDemo: true,
  balanceUSD: 100000,
  holdings: {
    "BTC": 1.5,
    "ETH": 50,
  },
  transactions: [],
  trades: [],
  plan: "None",
  referrals: 0,
  commissions: 0,
  walletAddresses: {}, // Demo addresses generated on the fly if needed
};

export const PortfolioProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<PortfolioState>(() => {
    const saved = localStorage.getItem("netflow_portfolio");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return defaultState;
  });

  const [adminStats, setAdminStats] = useState({ totalFeesCollected: 0 });

  useEffect(() => {
    localStorage.setItem("netflow_portfolio", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const savedAdmin = localStorage.getItem("netflow_admin");
    if (savedAdmin) {
      try { setAdminStats(JSON.parse(savedAdmin)); } catch(e) {}
    }
  }, []);

  const toggleDemo = () => {
    setState(prev => prev.isDemo ? defaultState : demoState);
  };

  const deposit = (amount: number) => {
    const newTx: Transaction = {
      id: Math.random().toString(36).substring(7),
      type: "Deposit",
      asset: "USD",
      amount: `+$${amount.toLocaleString()}`,
      value: "Bank Transfer",
      date: new Date().toISOString(),
      up: true,
    };
    setState(prev => ({
      ...prev,
      balanceUSD: prev.balanceUSD + amount,
      transactions: [newTx, ...prev.transactions],
    }));
  };

  const exchange = (fromAsset: string, toAsset: string, amount: number, rate: number) => {
    const feePercent = 0.0013; // 0.13%
    
    setState(prev => {
      let newBalanceUSD = prev.balanceUSD;
      const newHoldings = { ...prev.holdings };
      const newAddresses = { ...prev.walletAddresses };
      
      let amountReceived = 0;

      // Deduct source
      if (fromAsset === "USD") {
        if (newBalanceUSD < amount) throw new Error("Insufficient funds");
        newBalanceUSD -= amount;
        const fee = amount * feePercent;
        const amountAfterFee = amount - fee;
        amountReceived = amountAfterFee / rate;
      } else {
        if ((newHoldings[fromAsset] || 0) < amount) throw new Error("Insufficient funds");
        newHoldings[fromAsset] -= amount;
        const grossDest = amount * rate;
        const fee = grossDest * feePercent; 
        amountReceived = grossDest - fee;
      }

      if (toAsset === "USD") {
        newBalanceUSD += amountReceived;
      } else {
        newHoldings[toAsset] = (newHoldings[toAsset] || 0) + amountReceived;
        if (!newAddresses[toAsset]) {
          newAddresses[toAsset] = generateAddress(toAsset);
        }
      }

      const tx: Transaction = {
        id: Math.random().toString(36).substring(7),
        type: "Exchange",
        asset: toAsset,
        amount: `+${amountReceived.toFixed(6)} ${toAsset}`,
        value: `From ${amount} ${fromAsset}`,
        date: new Date().toISOString(),
        up: true,
      };

      return {
        ...prev,
        balanceUSD: newBalanceUSD,
        holdings: newHoldings,
        walletAddresses: newAddresses,
        transactions: [tx, ...prev.transactions]
      };
    });
  };

  const executeTrade = (tradeData: Omit<Trade, "id" | "date">) => {
    setState(prev => {
      const trade: Trade = {
        ...tradeData,
        id: Math.random().toString(36).substring(7),
        date: new Date().toISOString()
      };
      
      let newBalance = prev.balanceUSD;
      if (trade.side === "Buy") {
        newBalance -= parseFloat(trade.total);
      } else {
        newBalance += parseFloat(trade.total);
      }
      return {
        ...prev,
        balanceUSD: newBalance >= 0 ? newBalance : prev.balanceUSD,
        trades: [trade, ...prev.trades]
      };
    });
  };

  const upgradePlan = (plan: Plan, cost: number) => {
    setState(prev => {
      const tx: Transaction = {
        id: Math.random().toString(36).substring(7),
        type: "Plan Purchase",
        asset: "USD",
        amount: `-$${cost.toLocaleString()}`,
        value: `${plan} Plan`,
        date: new Date().toISOString(),
        up: false,
      };
      return {
        ...prev,
        plan,
        balanceUSD: prev.balanceUSD - cost,
        transactions: [tx, ...prev.transactions]
      }
    });
  };

  return (
    <PortfolioContext.Provider value={{ state, toggleDemo, deposit, exchange, executeTrade, upgradePlan, adminStats }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
