import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, TrendingUp, ArrowRight, Play, Eye } from 'lucide-react';
import { Movie } from '../../types/movie';
import { useCurrency } from '../../context/CurrencyContext';
import { VerdictBadge } from '../common/VerdictBadge';

interface HeroSpotlightProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onExploreClick: () => void;
}

export const HeroSpotlight: React.FC<HeroSpotlightProps> = ({
  movies,
  onSelectMovie,
  onExploreClick,
}) => {
  const { format } = useCurrency();
  const spotlightMovies = movies.filter((m) =>
    ['kalki-2898-ad', 'inside-out-2', 'rrr', 'dune-part-two', 'avengers-endgame'].includes(m.id)
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % spotlightMovies.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [spotlightMovies.length]);

  if (spotlightMovies.length === 0) return null;
  const current = spotlightMovies[currentIndex] || spotlightMovies[0];

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
      {/* Background Image Backdrop */}
      <div className="absolute inset-0">
        <img
          src={current.backdropUrl}
          alt={current.title}
          className="w-full h-full object-cover opacity-25 filter brightness-75 scale-105 transition-all duration-1000 ease-out"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 p-6 sm:p-8 md:p-12 max-w-3xl flex flex-col justify-between min-h-[420px] sm:min-h-[480px]">
        <div>
          {/* Top Pill */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/10">
              <Sparkles className="w-3.5 h-3.5" /> Spotlight Box Office Juggernaut
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-900/80 text-slate-300 border border-slate-700">
              {current.industry}
            </span>
            <VerdictBadge verdict={current.verdict} size="sm" />
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none font-serif mb-2">
            {current.title}
          </h1>

          {/* Original title if different */}
          {current.originalTitle && current.originalTitle !== current.title && (
            <p className="text-sm font-medium text-amber-300/80 mb-3">{current.originalTitle}</p>
          )}

          {/* Synopsis */}
          <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 sm:line-clamp-2 max-w-2xl leading-relaxed mb-6">
            {current.synopsis}
          </p>

          {/* Key Figures Marquee */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mb-6">
            <div className="p-3 bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
                Worldwide Lifetime
              </span>
              <span className="text-lg sm:text-xl font-black text-amber-400 font-serif">
                {format(current.worldwideGrossUSD, current.worldwideGrossINR)}
              </span>
            </div>

            <div className="p-3 bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
                Opening Day Record
              </span>
              <span className="text-lg sm:text-xl font-black text-slate-100 font-serif">
                {format(current.openingDayGrossUSD, current.openingDayGrossINR)}
              </span>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3 bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
                Weekend Multiplier
              </span>
              <span className="text-lg sm:text-xl font-black text-emerald-400 font-serif">
                {current.multiplier}x
              </span>
            </div>
          </div>
        </div>

        {/* Buttons & Indicators */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectMovie(current)}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              <span>Inspect Full Box Office Dossier</span>
            </button>

            <button
              onClick={onExploreClick}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5"
            >
              <span>Explore All Movies</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Pagination dots */}
          <div className="flex items-center gap-2">
            {spotlightMovies.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                title={`View spotlight #${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
