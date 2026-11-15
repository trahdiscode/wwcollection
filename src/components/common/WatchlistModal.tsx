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
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/70 backdrop-blur-sm transition-all">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-md h-full bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base font-bold text-white">Your Tracked Movies</h3>
              <p className="text-xs text-slate-400">
                {bookmarkedMovies.length} movie{bookmarkedMovies.length === 1 ? '' : 's'} tracked
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Portfolio Stats Summary */}
        {bookmarkedMovies.length > 0 && (
          <div className="p-4 bg-slate-950/40 border-b border-slate-800/80 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
                Combined WW Gross
              </span>
              <div className="text-lg font-black text-amber-400">
                {format(totalUSD, totalINR)}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
                Avg Rating
              </span>
              <div className="text-base font-bold text-slate-200">
                ⭐{' '}
                {(
                  bookmarkedMovies.reduce((acc, m) => acc + m.imdbRating, 0) /
                  bookmarkedMovies.length
                ).toFixed(1)}
              </div>
            </div>
          </div>
        )}

        {/* Movies List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {bookmarkedMovies.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Film className="w-10 h-10 mx-auto mb-3 opacity-30 text-slate-500" />
              <p className="text-sm font-medium text-slate-300">No movies in your tracking list</p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Click the bookmark icon on any movie card or detail view to track collections here.
              </p>
            </div>
          ) : (
            bookmarkedMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 flex items-center justify-between gap-3 hover:border-slate-700 transition-all group"
              >
                <div
                  onClick={() => {
                    onSelectMovie(movie);
                    onClose();
                  }}
                  className="flex items-center gap-3 cursor-pointer min-w-0 flex-1"
                >
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-12 h-16 object-cover rounded-lg bg-slate-800 border border-slate-700 shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=300';
                    }}
                  />
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-100 group-hover:text-amber-400 transition-colors truncate">
                      {movie.title}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {movie.industry} • {movie.releaseYear}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-300">
                        {format(movie.worldwideGrossUSD, movie.worldwideGrossINR)}
                      </span>
                      <VerdictBadge verdict={movie.verdict} size="sm" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => toggleWatchlist(movie.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                    title="Remove from tracking list"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      onSelectMovie(movie);
                      onClose();
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                    title="View full profile"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 text-xs text-slate-500 flex items-center justify-between">
          <span>Saved to your local browser storage</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
