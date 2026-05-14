import React, { createContext, useContext, useState, useEffect } from 'react';

type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'NGN' | 'ZAR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatValue: (value: number) => string;
  convert: (usdValue: number) => number;
  symbol: string;
}

const currencyData: Record<Currency, { symbol: string, rate: number }> = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
  JPY: { symbol: '¥', rate: 151.6 },
  CAD: { symbol: 'C$', rate: 1.35 },
  NGN: { symbol: '₦', rate: 1200 },
  ZAR: { symbol: 'R', rate: 18.8 },
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>(() => {
    return (localStorage.getItem('app_currency') as Currency) || 'USD';
  });

  useEffect(() => {
    localStorage.setItem('app_currency', currency);
  }, [currency]);

  const convert = (usdValue: number) => {
    return usdValue * currencyData[currency].rate;
  };

  const formatValue = (value: number) => {
    const converted = convert(value);
    const { symbol } = currencyData[currency];
    
    return `${symbol}${converted.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const symbol = currencyData[currency].symbol;

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatValue, convert, symbol }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within a CurrencyProvider');
  return context;
};
