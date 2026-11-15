import React from 'react';
import { BoxOfficeVerdict } from '../../types/movie';

interface VerdictBadgeProps {
  verdict: BoxOfficeVerdict;
  size?: 'sm' | 'md' | 'lg';
}

export const VerdictBadge: React.FC<VerdictBadgeProps> = ({ verdict, size = 'sm' }) => {
  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 font-medium tracking-wide',
    md: 'text-[11px] px-2.5 py-0.5 font-medium tracking-wide',
    lg: 'text-xs px-3 py-1 font-semibold tracking-wide',
  };

  const getStyle = () => {
    switch (verdict) {
      case 'All-Time Blockbuster':
        return 'bg-[#211a0e] text-[#f2b84b] border border-[#483719]';
      case 'Blockbuster':
        return 'bg-[#0e1f16] text-[#34d399] border border-[#1b432e]';
      case 'Super Hit':
        return 'bg-[#0f1d2b] text-[#38bdf8] border border-[#1a3854]';
      case 'Hit':
        return 'bg-[#121b2d] text-[#60a5fa] border border-[#1e3458]';
      case 'Semi-Hit':
        return 'bg-[#151722] text-[#818cf8] border border-[#272b42]';
      case 'Average':
        return 'bg-[#15171c] text-[#94a3b8] border border-[#262933]';
      case 'Flop':
      case 'Disaster':
        return 'bg-[#221215] text-[#fb7185] border border-[#441d24]';
      default:
        return 'bg-[#15171c] text-[#94a3b8] border border-[#262933]';
    }
  };

  return (
    <span
      className={`inline-flex items-center rounded-md font-sans uppercase transition-colors shrink-0 ${sizeClasses[size]} ${getStyle()}`}
    >
      {verdict}
    </span>
  );
};
