import React from 'react';
import { Trophy, Award, Flame, Zap, ArrowRight } from 'lucide-react';
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
      subtext: 'James Cameron · 2009',
      badge: 'All-Time Record',
    },
    {
      title: 'Indian Cinema All-Time #1',
      movie: dangal,
      value: format(dangal.worldwideGrossUSD, dangal.worldwideGrossINR),
      subtext: 'Aamir Khan · 2016',
      badge: 'Unbeaten Benchmark',
    },
    {
      title: '2024 Global Leader',
      movie: insideOut,
      value: format(insideOut.worldwideGrossUSD, insideOut.worldwideGrossINR),
      subtext: 'Highest Animated Grosser',
      badge: '2024 Champion',
    },
    {
      title: '2024 Indian Box Office King',
      movie: kalki,
      value: format(kalki.worldwideGrossUSD, kalki.worldwideGrossINR),
      subtext: 'Nag Ashwin · Prabhas',
      badge: 'Pan-India Titan',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
      {statCards.map((card, idx) => (
        <div
          key={idx}
          onClick={() => onSelectMovie(card.movie)}
          className="bg-[#101217] hover:bg-[#14171e] border border-[#1c1f28] hover:border-[#2b303d] rounded-xl p-4 sm:p-5 transition-all duration-150 cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-[#7b8290] mb-1.5">
              <span className="text-[11px] font-medium uppercase tracking-wider">
                {card.title}
              </span>
              <span className="text-[10px] text-[#9ca3af] font-mono">
                {card.badge}
              </span>
            </div>

            <div className="text-xl sm:text-2xl font-bold text-white tabular-nums group-hover:text-[#d99b26] transition-colors">
              {card.value}
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#181a21] text-xs">
            <span className="text-[#a4acb9] font-medium truncate">{card.movie.title}</span>
            <span className="text-[11px] text-[#5d6370] group-hover:text-[#8a92a1] transition-colors flex items-center gap-0.5">
              <span>Inspect</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
