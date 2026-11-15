import React from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { CurrencyMode } from '../../types/movie';

export interface CurrencyToggleProps {
  className?: string;
  showAllLabels?: boolean;
}

export const CurrencyToggle: React.FC<CurrencyToggleProps> = ({
  className = '',
  showAllLabels = false,
}) => {
  const { currency, setCurrency } = useCurrency();

  const options: {
    mode: CurrencyMode;
    label: string;
    symbol: string;
    title: string;
  }[] = [
    { mode: 'USD', label: 'USD', symbol: '$', title: 'US Dollar ($ Millions / Billions)' },
    { mode: 'INR', label: 'INR', symbol: '₹', title: 'Indian Rupee (₹ Crores)' },
    { mode: 'EUR', label: 'EUR', symbol: '€', title: 'Euro (€ Millions / Billions)' },
  ];

  return (
    <div
      role="group"
      aria-label="Currency Selection"
      className={`inline-flex items-center bg-[#0d0f14] p-1 rounded-xl border border-[#1e222d] shadow-inner select-none ${className}`}
    >
      {options.map((opt) => {
        const isActive = currency === opt.mode;
        return (
          <button
            key={opt.mode}
            onClick={() => setCurrency(opt.mode)}
            title={opt.title}
            aria-pressed={isActive}
            className={`h-7 sm:h-7.5 rounded-lg text-xs transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer relative ${
              isActive || showAllLabels ? 'px-2.5' : 'px-2 min-w-[28px]'
            } ${
              isActive
                ? 'bg-[#1e2330] text-white shadow-xs font-semibold border border-[#2e3547]'
                : 'text-[#7a8292] hover:text-[#dce0e8] hover:bg-[#14161f] border border-transparent font-medium'
            }`}
          >
            <span
              className={`font-mono text-xs transition-colors ${
                isActive ? 'text-[#d99b26] font-bold' : 'text-[#5a6272]'
              }`}
            >
              {opt.symbol}
            </span>
            {(isActive || showAllLabels) && (
              <span className="text-[11px] font-sans font-semibold tracking-tight">
                {opt.label}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
