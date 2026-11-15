import React from 'react';
import { Bookmark, Scale, ArrowRight, Eye, TrendingUp } from 'lucide-react';
import { Movie } from '../../types/movie';
import { useCurrency } from '../../context/CurrencyContext';
import { useWatchlist, useComparison } from '../../context/WatchlistContext';
import { VerdictBadge } from '../common/VerdictBadge';

interface MovieTableViewProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

export const MovieTableView: React.FC<MovieTableViewProps> = ({ movies, onSelectMovie }) => {
  const { format, currency } = useCurrency();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const { isInCompare, addToCompare, removeFromCompare } = useComparison();

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800 font-bold">
              <th className="py-3 px-3 text-center">#</th>
              <th className="py-3 px-4">Movie Title</th>
              <th className="py-3 px-3">Industry</th>
              <th className="py-3 px-3">Year</th>
              <th className="py-3 px-3 text-right">Opening Day</th>
              <th className="py-3 px-3 text-right">Opening W/E</th>
              <th className="py-3 px-3 text-right">Domestic</th>
              <th className="py-3 px-3 text-right">Overseas</th>
              <th className="py-3 px-3 text-right bg-amber-500/5 text-amber-300 font-black">
                Worldwide Gross
              </th>
              <th className="py-3 px-3 text-right">Budget</th>
              <th className="py-3 px-3 text-center">Multiplier</th>
              <th className="py-3 px-3 text-center">Verdict</th>
              <th className="py-3 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-medium">
            {movies.map((movie, idx) => {
              const isBookmarked = isInWatchlist(movie.id);
              const isCompared = isInCompare(movie.id);

              return (
                <tr
                  key={movie.id}
                  onClick={() => onSelectMovie(movie)}
                  className="hover:bg-slate-800/70 transition-colors cursor-pointer group"
                >
                  {/* Rank */}
                  <td className="py-3 px-3 text-center text-slate-400 font-mono">
                    {idx + 1}
                  </td>

                  {/* Title & Poster */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-8 h-11 object-cover rounded bg-slate-950 border border-slate-800 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=200';
                        }}
                      />
                      <div className="min-w-0">
                        <span className="font-bold text-slate-100 group-hover:text-amber-400 transition-colors block text-xs truncate max-w-[200px]">
                          {movie.title}
                        </span>
                        <span className="text-[10px] text-slate-400 truncate block">
                          Dir. {movie.director}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Industry */}
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                      {movie.industry}
                    </span>
                  </td>

                  {/* Year */}
                  <td className="py-3 px-3 text-slate-400 font-mono">{movie.releaseYear}</td>

                  {/* Opening Day */}
                  <td className="py-3 px-3 text-right text-slate-300 font-mono">
                    {format(movie.openingDayGrossUSD, movie.openingDayGrossINR, { compact: true })}
                  </td>

                  {/* Opening Weekend */}
                  <td className="py-3 px-3 text-right text-slate-300 font-mono">
                    {format(movie.openingWeekendUSD, movie.openingWeekendINR, { compact: true })}
                  </td>

                  {/* Domestic */}
                  <td className="py-3 px-3 text-right text-slate-300 font-mono">
                    {format(movie.domesticGrossUSD, movie.domesticGrossINR, { compact: true })}
                  </td>

                  {/* Overseas */}
                  <td className="py-3 px-3 text-right text-slate-300 font-mono">
                    {format(movie.overseasGrossUSD, movie.overseasGrossINR, { compact: true })}
                  </td>

                  {/* Worldwide Gross */}
                  <td className="py-3 px-3 text-right font-black text-amber-400 font-serif bg-amber-500/5 text-sm">
                    {format(movie.worldwideGrossUSD, movie.worldwideGrossINR)}
                  </td>

                  {/* Budget */}
                  <td className="py-3 px-3 text-right text-slate-400 font-mono">
                    {format(
                      movie.financials.productionBudgetUSD,
                      movie.financials.productionBudgetINR,
                      { compact: true }
                    )}
                  </td>

                  {/* Multiplier */}
                  <td className="py-3 px-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                      {movie.multiplier}x
                    </span>
                  </td>

                  {/* Verdict */}
                  <td className="py-3 px-3 text-center">
                    <VerdictBadge verdict={movie.verdict} size="sm" />
                  </td>

                  {/* Action Shortcuts */}
                  <td className="py-3 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => toggleWatchlist(movie.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isBookmarked
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                            : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
                        }`}
                        title={isBookmarked ? 'Tracked' : 'Bookmark movie'}
                      >
                        <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? 'currentColor' : 'none'} />
                      </button>

                      <button
                        onClick={() =>
                          isCompared ? removeFromCompare(movie.id) : addToCompare(movie.id)
                        }
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isCompared
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                            : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
                        }`}
                        title={isCompared ? 'In Compare list' : 'Compare movie'}
                      >
                        <Scale className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onSelectMovie(movie)}
                        className="p-1.5 rounded-lg bg-slate-950 text-slate-400 hover:text-amber-400 border border-slate-800 transition-colors"
                        title="View Full Profile"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
