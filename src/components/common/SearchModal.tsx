import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Film, ChevronRight, TrendingUp } from 'lucide-react';
import { ALL_MOVIES } from '../../data';
import { Movie } from '../../types/movie';
import { useCurrency } from '../../context/CurrencyContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMovie: (movie: Movie) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectMovie }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { format } = useCurrency();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? ALL_MOVIES.filter((m) => {
        const q = query.toLowerCase();
        return (
          m.title.toLowerCase().includes(q) ||
          m.originalTitle?.toLowerCase().includes(q) ||
          m.director.toLowerCase().includes(q) ||
          m.cast.some((c) => c.toLowerCase().includes(q)) ||
          m.industry.toLowerCase().includes(q) ||
          m.genres.some((g) => g.toLowerCase().includes(q))
        );
      }).slice(0, 8)
    : ALL_MOVIES.slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-sm transition-opacity">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div className="relative w-full max-w-2xl bg-[#0e1015] border border-[#222634] rounded-xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-[#1c202c] bg-[#090a0d] gap-3">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movie title, star, director, or industry (e.g. Kalki, Cameron, RRR)..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-500 hover:text-slate-300 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-[#161820] rounded border border-[#262c3d]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-[#181b24]">
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-500 flex items-center justify-between">
            <span>{query ? `MATCHES (${filtered.length})` : 'TRENDING GLOBALLY'}</span>
            <span className="text-[10px] text-slate-600">ENTER / CLICK TO SELECT</span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-500 font-mono text-xs">
              No matching blockbusters found for "{query}".
            </div>
          ) : (
            filtered.map((movie) => (
              <div
                key={movie.id}
                onClick={() => {
                  onSelectMovie(movie);
                  onClose();
                }}
                className="p-2.5 rounded-lg hover:bg-[#14161f] transition-colors cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-9 h-13 object-cover rounded bg-[#090a0d] shrink-0 border border-[#1c202c]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=200';
                    }}
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-200 group-hover:text-amber-400 transition-colors truncate">
                        {movie.title}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {movie.releaseYear}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      <span className="text-slate-400">{movie.industry}</span> • Dir. {movie.director} • Cast: {movie.cast.slice(0, 2).join(', ')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 font-mono text-right">
                  <div>
                    <span className="text-xs font-bold text-amber-400 block">
                      {format(movie.worldwideGrossUSD, movie.worldwideGrossINR)}
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      {movie.verdict}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition-colors" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
