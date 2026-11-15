import React from 'react';
import { BoxOfficeVerdict } from '../../types/movie';

interface VerdictBadgeProps {
  verdict: BoxOfficeVerdict;
  size?: 'sm' | 'md' | 'lg';
}

export const VerdictBadge: React.FC<VerdictBadgeProps> = ({ verdict, size = 'sm' }) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5 font-semibold',
  };

  const getStyle = () => {
    switch (verdict) {
      case 'All-Time Blockbuster':
        return 'bg-gradient-to-r from-amber-500/20 via-yellow-500/25 to-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/10 font-medium tracking-wide';
      case 'Blockbuster':
        return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
      case 'Super Hit':
        return 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30';
      case 'Hit':
        return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
      case 'Semi-Hit':
        return 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30';
      case 'Average':
        return 'bg-slate-500/20 text-slate-300 border border-slate-500/30';
      case 'Flop':
      case 'Disaster':
        return 'bg-rose-500/20 text-rose-300 border border-rose-500/30';
      default:
        return 'bg-slate-700/50 text-slate-300 border border-slate-600/30';
    }
  };

  return (
    <span
      className={`inline-flex items-center rounded-full tracking-wide transition-colors ${sizeClasses[size]} ${getStyle()}`}
    >
      {verdict === 'All-Time Blockbuster' && (
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1.5 animate-pulse" />
      )}
      {verdict}
    </span>
  );
};
