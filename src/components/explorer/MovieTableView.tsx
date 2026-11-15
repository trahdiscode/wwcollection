import React from 'react';
import { Bookmark, Scale, Eye } from 'lucide-react';
import { Movie } from '../../types/movie';
import { useCurrency } from '../../context/CurrencyContext';
import { useWatchlist, useComparison } from '../../context/WatchlistContext';
import { VerdictBadge } from '../common/VerdictBadge';

interface MovieTableViewProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

export const MovieTableView: React.FC<MovieTableViewProps> = ({ movies, onSelectMovie }) => {
  const { format } = useCurrency();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const { isInCompare, addToCompare, removeFromCompare } = useComparison();

  return (
    <div className="bg-[#101217] border border-[#1c1f28] rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-[#0b0c10] text-[#646b7a] uppercase text-[10px] tracking-wider border-b border-[#1c1f28] font-semibold">
              <th className="py-2.5 px-3 text-center w-12">#</th>
              <th className="py-2.5 px-3">Title</th>
              <th className="py-2.5 px-3">Industry</th>
              <th className="py-2.5 px-3">Year</th>
              <th className="py-2.5 px-3 text-right">Opening Day</th>
              <th className="py-2.5 px-3 text-right">Opening W/E</th>
              <th className="py-2.5 px-3 text-right">Domestic</th>
              <th className="py-2.5 px-3 text-right">Overseas</th>
              <th className="py-2.5 px-3 text-right text-[#d99b26] font-bold">
                Worldwide Gross
              </th>
              <th className="py-2.5 px-3 text-right">Budget</th>
              <th className="py-2.5 px-3 text-center">Multiplier</th>
              <th className="py-2.5 px-3 text-center">Verdict</th>
              <th className="py-2.5 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#15181f]">
            {movies.map((movie, idx) => {
              const isBookmarked = isInWatchlist(movie.id);
              const isCompared = isInCompare(movie.id);

              return (
                <tr
                  key={movie.id}
                  onClick={() => onSelectMovie(movie)}
                  className="hover:bg-[#14171f] transition-colors cursor-pointer group"
                >
                  {/* Rank */}
                  <td className="py-2.5 px-3 text-center text-[#585f6d] font-mono text-[11px]">
                    {idx + 1}
                  </td>

                  {/* Title & Poster */}
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-7 h-10 object-cover rounded bg-[#090a0d] border border-[#1b1e26] shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=200';
                        }}
                      />
                      <div className="min-w-0">
                        <span className="font-semibold text-white group-hover:text-[#d99b26] transition-colors block text-xs truncate max-w-[200px]">
                          {movie.title}
                        </span>
                        <span className="text-[10px] text-[#6b7280] truncate block">
                          Dir. {movie.director}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Industry */}
                  <td className="py-2.5 px-3">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#14161c] text-[#8e95a2] border border-[#1e222a]">
                      {movie.industry}
                    </span>
                  </td>

                  {/* Year */}
                  <td className="py-2.5 px-3 text-[#7d8594] font-mono text-[11px]">{movie.releaseYear}</td>

                  {/* Opening Day */}
                  <td className="py-2.5 px-3 text-right text-[#c8d0de] font-mono tabular-nums">
                    {format(movie.openingDayGrossUSD, movie.openingDayGrossINR, { compact: true })}
                  </td>

                  {/* Opening Weekend */}
                  <td className="py-2.5 px-3 text-right text-[#c8d0de] font-mono tabular-nums">
                    {format(movie.openingWeekendUSD, movie.openingWeekendINR, { compact: true })}
                  </td>

                  {/* Domestic */}
                  <td className="py-2.5 px-3 text-right text-[#9ca3af] font-mono tabular-nums">
                    {format(movie.domesticGrossUSD, movie.domesticGrossINR, { compact: true })}
                  </td>

                  {/* Overseas */}
                  <td className="py-2.5 px-3 text-right text-[#9ca3af] font-mono tabular-nums">
                    {format(movie.overseasGrossUSD, movie.overseasGrossINR, { compact: true })}
                  </td>

                  {/* Worldwide Gross */}
                  <td className="py-2.5 px-3 text-right font-bold text-white font-mono tabular-nums">
                    {format(movie.worldwideGrossUSD, movie.worldwideGrossINR)}
                  </td>

                  {/* Budget */}
                  <td className="py-2.5 px-3 text-right text-[#7d8594] font-mono tabular-nums">
                    {format(
                      movie.financials.productionBudgetUSD,
                      movie.financials.productionBudgetINR,
                      { compact: true }
                    )}
                  </td>

                  {/* Multiplier */}
                  <td className="py-2.5 px-3 text-center">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium text-emerald-400 bg-[#0e1f16] border border-[#1b432e] tabular-nums">
                      {movie.multiplier}x
                    </span>
                  </td>

                  {/* Verdict */}
                  <td className="py-2.5 px-3 text-center">
                    <VerdictBadge verdict={movie.verdict} size="sm" />
                  </td>

                  {/* Action Shortcuts */}
                  <td className="py-2.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => toggleWatchlist(movie.id)}
                        className={`p-1 rounded transition-colors ${
                          isBookmarked
                            ? 'text-[#d99b26]'
                            : 'text-[#585f6d] hover:text-white'
                        }`}
                        title={isBookmarked ? 'Tracked' : 'Bookmark'}
                      >
                        <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? 'currentColor' : 'none'} />
                      </button>

                      <button
                        onClick={() =>
                          isCompared ? removeFromCompare(movie.id) : addToCompare(movie.id)
                        }
                        className={`p-1 rounded transition-colors ${
                          isCompared
                            ? 'text-sky-400'
                            : 'text-[#585f6d] hover:text-white'
                        }`}
                        title={isCompared ? 'In Compare' : 'Compare'}
                      >
                        <Scale className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onSelectMovie(movie)}
                        className="p-1 text-[#585f6d] hover:text-[#d99b26] transition-colors"
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
