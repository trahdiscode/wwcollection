import React from 'react';
import { Bookmark, Scale, Eye, TrendingUp, Calendar, Clock } from 'lucide-react';
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
      className="bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-200 cursor-pointer flex flex-col group relative"
    >
      {/* Poster Image & Overlay Tags */}
      <div className="relative aspect-[2/3] w-full bg-slate-950 overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-95 group-hover:brightness-100"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Top Floating Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-950/85 backdrop-blur-md text-amber-300 border border-amber-500/30">
            {movie.industry}
          </span>

          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => toggleWatchlist(movie.id)}
              className={`p-1.5 rounded-lg backdrop-blur-md border transition-all ${
                isBookmarked
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                  : 'bg-slate-950/80 text-slate-300 hover:text-white border-slate-800 hover:bg-slate-900'
              }`}
              title={isBookmarked ? 'Tracked' : 'Bookmark movie'}
            >
              <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>

            <button
              onClick={() => (isCompared ? removeFromCompare(movie.id) : addToCompare(movie.id))}
              className={`p-1.5 rounded-lg backdrop-blur-md border transition-all ${
                isCompared
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                  : 'bg-slate-950/80 text-slate-300 hover:text-white border-slate-800 hover:bg-slate-900'
              }`}
              title={isCompared ? 'In Compare list' : 'Compare movie'}
            >
              <Scale className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Floating Stats on Poster */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10">
          <VerdictBadge verdict={movie.verdict} size="sm" />
          <h3 className="text-base font-bold text-white tracking-tight mt-1 truncate group-hover:text-amber-400 transition-colors">
            {movie.title}
          </h3>
          <p className="text-[11px] text-slate-300 truncate">
            {movie.releaseYear} • {movie.director}
          </p>
        </div>
      </div>

      {/* Card Content & Box Office Stats */}
      <div className="p-3.5 space-y-3 flex-1 flex flex-col justify-between bg-slate-900/90">
        <div>
          {/* Headline Numbers */}
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Worldwide Gross
            </span>
            <span className="text-base font-black text-amber-400 font-serif">
              {format(movie.worldwideGrossUSD, movie.worldwideGrossINR)}
            </span>
          </div>

          {/* Domestic vs Overseas Visual Share Bar */}
          <div className="mt-2 space-y-1">
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
              <span>Dom: {domesticShare}%</span>
              <span>OS: {overseasShare}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden flex">
              <div
                className="bg-amber-400 h-full"
                style={{ width: `${domesticShare}%` }}
                title={`Domestic: ${format(movie.domesticGrossUSD, movie.domesticGrossINR)}`}
              />
              <div
                className="bg-cyan-400 h-full"
                style={{ width: `${overseasShare}%` }}
                title={`Overseas: ${format(movie.overseasGrossUSD, movie.overseasGrossINR)}`}
              />
            </div>
          </div>
        </div>

        {/* Additional Box Office Metrics */}
        <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px]">
          <div>
            <span className="text-slate-500 block text-[9px] uppercase font-semibold">
              Opening Day
            </span>
            <span className="font-bold text-slate-200">
              {format(movie.openingDayGrossUSD, movie.openingDayGrossINR, { compact: true })}
            </span>
          </div>
          <div className="text-right">
            <span className="text-slate-500 block text-[9px] uppercase font-semibold">
              Multiplier
            </span>
            <span className="font-bold text-emerald-400 font-mono">{movie.multiplier}x</span>
          </div>
        </div>
      </div>
    </div>
  );
};
