import React, { useState, useEffect } from 'react';
import { ArrowRight, Eye, Calendar, Clock, Film } from 'lucide-react';
import { Movie } from '../../types/movie';
import { useCurrency } from '../../context/CurrencyContext';
import { VerdictBadge } from '../common/VerdictBadge';

interface HeroSpotlightProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onExploreClick: () => void;
  className?: string;
}

export const HeroSpotlight: React.FC<HeroSpotlightProps> = ({
  movies,
  onSelectMovie,
  onExploreClick,
  className,
}) => {
  const { format } = useCurrency();
  const spotlightMovies = movies.filter((m) =>
    ['kalki-2898-ad', 'inside-out-2', 'rrr', 'dune-part-two', 'avengers-endgame'].includes(m.id)
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % spotlightMovies.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [spotlightMovies.length]);

  if (spotlightMovies.length === 0) return null;
  const current = spotlightMovies[currentIndex] || spotlightMovies[0];

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-[#1d2028] bg-[#0c0d12] shadow-2xl ${className || ''}`}>
      {/* Cinematic Background Scrim */}
      <div className="absolute inset-0">
        <img
          src={current.backdropUrl}
          alt={current.title}
          className="w-full h-full object-cover opacity-20 filter brightness-90 scale-100 transition-opacity duration-700 ease-out"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0d12] via-[#0c0d12]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-transparent to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between min-h-[420px] sm:min-h-[460px] md:min-h-[480px]">
        <div>
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-3.5 sm:mb-4 text-xs text-[#8a92a1]">
            <span className="font-semibold text-[#f4f5f8] uppercase tracking-wider text-[11px] bg-[#1a1c24] px-2.5 py-0.5 rounded border border-[#262a36]">
              {current.industry}
            </span>
            <span className="text-[#4b5563]">·</span>
            <span>{current.language}</span>
            <span className="text-[#4b5563]">·</span>
            <span>{current.releaseYear}</span>
            <span className="text-[#4b5563]">·</span>
            <span>{current.certification}</span>
            <VerdictBadge verdict={current.verdict} size="sm" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-2 sm:mb-2.5">
            {current.title}
          </h1>

          {current.originalTitle && current.originalTitle !== current.title && (
            <p className="text-sm sm:text-base font-normal text-[#9ca3af] mb-3 sm:mb-4 italic">
              {current.originalTitle}
            </p>
          )}

          {/* Synopsis */}
          <p className="text-xs sm:text-sm md:text-[15px] text-[#9ca3af] line-clamp-2 sm:line-clamp-3 max-w-2xl lg:max-w-3xl leading-relaxed mb-6 sm:mb-8 font-normal">
            {current.synopsis}
          </p>

          {/* Clean Financial Stats Strip with hairline vertical dividers */}
          <div className="inline-flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 bg-[#12141a]/90 backdrop-blur-md px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl border border-[#1e222c] mb-6 sm:mb-8 shadow-inner">
            <div>
              <span className="text-[10px] sm:text-[11px] text-[#6b7280] font-semibold block uppercase tracking-wider mb-0.5 sm:mb-1">
                Worldwide Gross
              </span>
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-white tabular-nums tracking-tight">
                {format(current.worldwideGrossUSD, current.worldwideGrossINR)}
              </span>
            </div>

            <div className="hidden sm:block w-[1px] h-9 bg-[#1f232d]" />

            <div>
              <span className="text-[10px] sm:text-[11px] text-[#6b7280] font-semibold block uppercase tracking-wider mb-0.5 sm:mb-1">
                Opening Day
              </span>
              <span className="text-base sm:text-lg md:text-xl font-semibold text-[#c8d0de] tabular-nums tracking-tight">
                {format(current.openingDayGrossUSD, current.openingDayGrossINR)}
              </span>
            </div>

            <div className="hidden sm:block w-[1px] h-9 bg-[#1f232d]" />

            <div>
              <span className="text-[10px] sm:text-[11px] text-[#6b7280] font-semibold block uppercase tracking-wider mb-0.5 sm:mb-1">
                Weekend Multiplier
              </span>
              <span className="text-base sm:text-lg md:text-xl font-semibold text-emerald-400 tabular-nums tracking-tight">
                {current.multiplier}x
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions & Slide Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 sm:pt-6 border-t border-[#1a1c24] mt-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectMovie(current)}
              className="px-4 sm:px-5 py-2.5 rounded-lg bg-[#f4f5f8] hover:bg-white text-black font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 shadow-sm"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect Full Dossier</span>
            </button>

            <button
              onClick={onExploreClick}
              className="px-4 sm:px-5 py-2.5 rounded-lg bg-[#14161d] hover:bg-[#1b1e27] text-[#c8d0de] border border-[#222631] text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5"
            >
              <span>Explore All Movies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Minimal pagination bar */}
          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            {spotlightMovies.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  currentIndex === idx ? 'w-6 bg-[#d99b26]' : 'w-2 bg-[#252833] hover:bg-[#393e4d]'
                }`}
                title={`Spotlight #${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
