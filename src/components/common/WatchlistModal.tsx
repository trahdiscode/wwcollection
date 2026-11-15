import React from 'react';
import { Bookmark, X, Trash2, ArrowRight, Film } from 'lucide-react';
import { useWatchlist } from '../../context/WatchlistContext';
import { ALL_MOVIES } from '../../data';
import { Movie } from '../../types/movie';
import { useCurrency } from '../../context/CurrencyContext';
import { VerdictBadge } from './VerdictBadge';

interface WatchlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMovie: (movie: Movie) => void;
}

export const WatchlistModal: React.FC<WatchlistModalProps> = ({ isOpen, onClose, onSelectMovie }) => {
  const { watchlist, toggleWatchlist } = useWatchlist();
  const { format } = useCurrency();

  if (!isOpen) return null;

  const bookmarkedMovies = ALL_MOVIES.filter((m) => watchlist.includes(m.id));

  const totalUSD = bookmarkedMovies.reduce((acc, m) => acc + m.worldwideGrossUSD, 0);
  const totalINR = bookmarkedMovies.reduce((acc, m) => acc + m.worldwideGrossINR, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/75 backdrop-blur-sm transition-opacity">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-md h-full bg-[#0e1015] border-l border-[#222634] shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-150">
        {/* Header */}
        <div className="p-4 border-b border-[#1c202c] flex items-center justify-between bg-[#0a0c10]">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-400" />
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">Saved Movie Portfolio</h3>
              <p className="text-xs font-mono text-slate-500">
                {bookmarkedMovies.length} title{bookmarkedMovies.length === 1 ? '' : 's'} tracked
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-md text-slate-400 hover:text-white hover:bg-[#1a1e28] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Portfolio Stats Summary */}
        {bookmarkedMovies.length > 0 && (
          <div className="p-3.5 bg-[#090a0d] border-b border-[#1c202c] flex items-center justify-between font-mono">
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                Total Tracked Gross
              </span>
              <div className="text-base font-bold text-amber-400">
                {format(totalUSD, totalINR)}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                Avg Rating
              </span>
              <div className="text-sm font-bold text-slate-200">
                {(
                  bookmarkedMovies.reduce((acc, m) => acc + m.imdbRating, 0) /
                  bookmarkedMovies.length
                ).toFixed(1)} / 10
              </div>
            </div>
          </div>
        )}

        {/* Movies List */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-2">
          {bookmarkedMovies.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <Film className="w-8 h-8 mx-auto mb-2 opacity-30 text-slate-400" />
              <p className="text-xs font-medium text-slate-300">No movies saved yet</p>
              <p className="text-[11px] text-slate-600 mt-1 max-w-xs mx-auto">
                Bookmark titles from the Home feed, Explorer table, or Detail modals to curate your custom box-office list.
              </p>
            </div>
          ) : (
            bookmarkedMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-[#090a0d] border border-[#1c202c] rounded-lg p-2.5 flex items-center justify-between gap-3 hover:border-[#272b38] transition-colors group"
              >
                <div
                  onClick={() => {
                    onSelectMovie(movie);
                    onClose();
                  }}
                  className="flex items-center gap-2.5 cursor-pointer min-w-0 flex-1"
                >
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-10 h-14 object-cover rounded bg-[#07080b] shrink-0 border border-[#1c202c]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=200';
                    }}
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-slate-200 group-hover:text-amber-400 transition-colors truncate">
                        {movie.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 block">
                      {movie.industry} • {movie.releaseYear}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-400 block mt-0.5">
                      {format(movie.worldwideGrossUSD, movie.worldwideGrossINR)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => toggleWatchlist(movie.id)}
                    className="p-1.5 rounded text-slate-500 hover:text-rose-400 hover:bg-[#1a1e28] transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
