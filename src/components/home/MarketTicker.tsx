import React from 'react';
import { Trophy, TrendingUp, DollarSign, Award, Flame, Zap } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { ALL_MOVIES } from '../../data';
import { Movie } from '../../types/movie';

interface MarketTickerProps {
  onSelectMovie: (movie: Movie) => void;
}

export const MarketTicker: React.FC<MarketTickerProps> = ({ onSelectMovie }) => {
  const { format } = useCurrency();

  const avatar = ALL_MOVIES.find((m) => m.id === 'avatar')!;
  const dangal = ALL_MOVIES.find((m) => m.id === 'dangal')!;
  const kalki = ALL_MOVIES.find((m) => m.id === 'kalki-2898-ad')!;
  const insideOut = ALL_MOVIES.find((m) => m.id === 'inside-out-2')!;

  const statCards = [
    {
      title: 'Worldwide All-Time #1',
      movie: avatar,
      value: format(avatar.worldwideGrossUSD, avatar.worldwideGrossINR),
      subtext: 'James Cameron Sci-Fi Titan',
      icon: <Trophy className="w-4 h-4 text-amber-400" />,
      badge: 'All-Time Record',
    },
    {
      title: 'Indian Cinema All-Time #1',
      movie: dangal,
      value: format(dangal.worldwideGrossUSD, dangal.worldwideGrossINR),
      subtext: 'Historic ₹2,070 Cr Worldwide',
      icon: <Award className="w-4 h-4 text-emerald-400" />,
      badge: 'Unbeaten Benchmark',
    },
    {
      title: '2024 Global Leader',
      movie: insideOut,
      value: format(insideOut.worldwideGrossUSD, insideOut.worldwideGrossINR),
      subtext: 'Highest Animated Grosser Ever',
      icon: <Flame className="w-4 h-4 text-cyan-400" />,
      badge: '2024 Champion',
    },
    {
      title: '2024 Indian Box Office King',
      movie: kalki,
      value: format(kalki.worldwideGrossUSD, kalki.worldwideGrossINR),
      subtext: 'Prabhas Epic ₹1,050 Cr',
      icon: <Zap className="w-4 h-4 text-yellow-400" />,
      badge: 'Pan-India Titan',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((card, idx) => (
        <div
          key={idx}
          onClick={() => onSelectMovie(card.movie)}
          className="bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-4 transition-all duration-200 cursor-pointer group shadow-sm hover:shadow-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {card.title}
            </span>
            <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800">
              {card.icon}
            </div>
          </div>

          <div className="text-xl font-black text-white font-serif group-hover:text-amber-400 transition-colors">
            {card.value}
          </div>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60 text-xs">
            <span className="text-slate-300 font-medium truncate">{card.movie.title}</span>
            <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider shrink-0">
              {card.badge}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
