import React from 'react';
import { Bookmark, Scale } from 'lucide-react';
import { Movie } from '../../types/movie';
import { useCurrency } from '../../context/CurrencyContext';
import { useWatchlist, useComparison } from '../../context/WatchlistContext';
import { VerdictBadge } from '../common/VerdictBadge';

interface MovieCardProps {
  movie: Movie;
  onSelectMovie: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onSelectMovie }) => {
  const { format } = useCurrency();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const { isInCompare, addToCompare, removeFromCompare } = useComparison();

  const isBookmarked = isInWatchlist(movie.id);
  const isCompared = isInCompare(movie.id);

  const domesticShare = Math.round((movie.domesticGrossUSD / movie.worldwideGrossUSD) * 100);
  const overseasShare = 100 - domesticShare;

  return (
    <div
      onClick={() => onSelectMovie(movie)}
      className="bg-[#101217] hover:bg-[#14161d] border border-[#1c1f28] hover:border-[#2a2e39] rounded-xl overflow-hidden transition-all duration-150 cursor-pointer flex flex-col group relative"
    >
      {/* Poster Image with Subtle Gradient */}
      <div className="relative aspect-[2/3] w-full bg-[#08090b] overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101217] via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10">
          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#0a0b0e]/90 text-[#c8d0de] border border-[#20232c] uppercase tracking-wider backdrop-blur-sm">
            {movie.industry}
          </span>

          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => toggleWatchlist(movie.id)}
              className={`p-1.5 rounded-md backdrop-blur-sm transition-colors ${
                isBookmarked
                  ? 'bg-[#d99b26] text-black font-bold'
                  : 'bg-[#0a0b0e]/80 text-[#858d9c] hover:text-white border border-[#20232c]'
              }`}
              title={isBookmarked ? 'Tracked' : 'Bookmark movie'}
            >
              <Bookmark className="w-3 h-3" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>

            <button
              onClick={() => (isCompared ? removeFromCompare(movie.id) : addToCompare(movie.id))}
              className={`p-1.5 rounded-md backdrop-blur-sm transition-colors ${
                isCompared
                  ? 'bg-sky-500 text-black font-bold'
                  : 'bg-[#0a0b0e]/80 text-[#858d9c] hover:text-white border border-[#20232c]'
              }`}
              title={isCompared ? 'In Arena' : 'Compare movie'}
            >
              <Scale className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Bottom Overlay Title */}
        <div className="absolute bottom-2 left-2 right-2 z-10">
          <VerdictBadge verdict={movie.verdict} size="sm" />
          <h3 className="text-sm font-semibold text-white tracking-tight mt-1 truncate group-hover:text-[#d99b26] transition-colors">
            {movie.title}
          </h3>
          <p className="text-[11px] text-[#858d9c] truncate">
            {movie.releaseYear} · {movie.director}
          </p>
        </div>
      </div>

      {/* Card Content Footer */}
      <div className="p-3 space-y-2.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Worldwide Gross */}
          <div className="flex items-baseline justify-between text-xs">
            <span className="text-[10px] text-[#6b7280] uppercase tracking-wider font-medium">
              Worldwide
            </span>
            <span className="font-bold text-white tabular-nums font-mono">
              {format(movie.worldwideGrossUSD, movie.worldwideGrossINR)}
            </span>
          </div>

          {/* Revenue Distribution Bar */}
          <div className="mt-1.5 space-y-1">
            <div className="flex items-center justify-between text-[10px] text-[#6b7280]">
              <span>Dom: {domesticShare}%</span>
              <span>OS: {overseasShare}%</span>
            </div>
            <div className="w-full bg-[#1b1e26] h-1 rounded-full overflow-hidden flex">
              <div
                className="bg-sky-400 h-full"
                style={{ width: `${domesticShare}%` }}
                title={`Domestic: ${format(movie.domesticGrossUSD, movie.domesticGrossINR)}`}
              />
              <div
                className="bg-teal-400 h-full"
                style={{ width: `${overseasShare}%` }}
                title={`Overseas: ${format(movie.overseasGrossUSD, movie.overseasGrossINR)}`}
              />
            </div>
          </div>
        </div>

        {/* Quick Numbers */}
        <div className="pt-2 border-t border-[#181a21] grid grid-cols-2 gap-2 text-[10px]">
          <div>
            <span className="text-[#646b7a] block uppercase font-medium">
              Day 1
            </span>
            <span className="font-medium text-[#c8d0de] tabular-nums font-mono">
              {format(movie.openingDayGrossUSD, movie.openingDayGrossINR, { compact: true })}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[#646b7a] block uppercase font-medium">
              Multiplier
            </span>
            <span className="font-medium text-emerald-400 font-mono tabular-nums">
              {movie.multiplier}x
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
