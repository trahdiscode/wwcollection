import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrencyMode } from '../types/movie';

interface CurrencyContextType {
  currency: CurrencyMode;
  setCurrency: (mode: CurrencyMode) => void;
  format: (grossUSD: number, grossINR: number, options?: { compact?: boolean; hideSymbol?: boolean }) => string;
  getRawValue: (grossUSD: number, grossINR: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyMode>(() => {
    const saved = localStorage.getItem('ww_movie_collection_currency') || localStorage.getItem('cinemetrix_currency');
    return (saved as CurrencyMode) || 'USD';
  });

  const setCurrency = (mode: CurrencyMode) => {
    setCurrencyState(mode);
    localStorage.setItem('ww_movie_collection_currency', mode);
  };

  const getRawValue = (grossUSD: number, grossINR: number): number => {
    if (currency === 'INR') return grossINR;
    if (currency === 'EUR') return grossUSD * 0.92;
    return grossUSD;
  };

  const format = (grossUSD: number, grossINR: number, options?: { compact?: boolean; hideSymbol?: boolean }) => {
    const { compact = false, hideSymbol = false } = options || {};

    if (currency === 'USD') {
      const symbol = hideSymbol ? '' : '$';
      if (grossUSD >= 1000) {
        return `${symbol}${(grossUSD / 1000).toFixed(compact ? 2 : 3)} B`;
      }
      return `${symbol}${grossUSD.toLocaleString(undefined, {
        minimumFractionDigits: grossUSD < 10 ? 2 : 1,
        maximumFractionDigits: 1,
      })} M`;
    }

    if (currency === 'INR') {
      const symbol = hideSymbol ? '' : '₹';
      return `${symbol}${grossINR.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
      })} Cr`;
    }

    // EUR
    const symbol = hideSymbol ? '' : '€';
    const eurVal = grossUSD * 0.92;
    if (eurVal >= 1000) {
      return `${symbol}${(eurVal / 1000).toFixed(2)} B`;
    }
    return `${symbol}${eurVal.toLocaleString(undefined, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })} M`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format, getRawValue }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
