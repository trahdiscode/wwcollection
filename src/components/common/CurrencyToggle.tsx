import React from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { CurrencyMode } from '../../types/movie';

export const CurrencyToggle: React.FC = () => {
  const { currency, setCurrency } = useCurrency();

  const options: { mode: CurrencyMode; label: string; symbol: string }[] = [
    { mode: 'USD', label: 'USD', symbol: '$' },
    { mode: 'INR', label: 'INR (₹ Cr)', symbol: '₹' },
    { mode: 'EUR', label: 'EUR', symbol: '€' },
  ];

  return (
    <div className="flex items-center bg-slate-900/90 p-0.5 rounded-lg border border-slate-800 text-xs shadow-inner">
      {options.map((opt) => {
        const isActive = currency === opt.mode;
        return (
          <button
            key={opt.mode}
            onClick={() => setCurrency(opt.mode)}
            title={`Switch worldwide figures to ${opt.label}`}
            className={`px-2.5 py-1 rounded-md font-medium transition-all duration-150 flex items-center gap-1 ${
              isActive
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>{opt.symbol}</span>
            <span className="hidden sm:inline">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};
