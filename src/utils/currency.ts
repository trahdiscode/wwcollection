import { CurrencyMode } from '../types/movie';

export const USD_TO_INR_RATE = 86.5;
export const USD_TO_EUR_RATE = 0.92;

export function formatCurrencyValue(
  grossUSD: number, // In Millions USD
  grossINR: number, // In Crores INR
  currency: CurrencyMode,
  options?: { compact?: boolean; hideSymbol?: boolean }
): string {
  const { compact = false, hideSymbol = false } = options || {};

  if (currency === 'USD') {
    const symbol = hideSymbol ? '' : '$';
    if (grossUSD >= 1000) {
      const billions = (grossUSD / 1000).toFixed(compact ? 2 : 3);
      return `${symbol}${billions} B`;
    }
    return `${symbol}${grossUSD.toLocaleString(undefined, {
      minimumFractionDigits: grossUSD < 10 ? 2 : 1,
      maximumFractionDigits: 2,
    })} M`;
  }

  if (currency === 'INR') {
    const symbol = hideSymbol ? '' : '₹';
    // Format Crores
    const inrValue = grossINR;
    if (inrValue >= 1000) {
      return `${symbol}${inrValue.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
      })} Cr`;
    }
    return `${symbol}${inrValue.toLocaleString(undefined, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })} Cr`;
  }

  // EUR
  const symbol = hideSymbol ? '' : '€';
  const eurMillions = grossUSD * USD_TO_EUR_RATE;
  if (eurMillions >= 1000) {
    return `${symbol}${(eurMillions / 1000).toFixed(2)} B`;
  }
  return `${symbol}${eurMillions.toLocaleString(undefined, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  })} M`;
}

export function getCurrencySymbol(currency: CurrencyMode): string {
  switch (currency) {
    case 'USD':
      return '$';
    case 'INR':
      return '₹';
    case 'EUR':
      return '€';
  }
}

export function getCurrencyUnitLabel(currency: CurrencyMode): string {
  switch (currency) {
    case 'USD':
      return 'in Millions USD';
    case 'INR':
      return 'in Crores INR';
    case 'EUR':
      return 'in Millions EUR';
  }
}
