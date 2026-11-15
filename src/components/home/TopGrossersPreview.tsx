import React, { useState } from 'react';
import { Award, ArrowRight } from 'lucide-react';
import { Movie } from '../../types/movie';
import { useCurrency } from '../../context/CurrencyContext';
import { VerdictBadge } from '../common/VerdictBadge';

interface TopGrossersPreviewProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onViewAllRankings: () => void;
}

export const TopGrossersPreview: React.FC<TopGrossersPreviewProps> = ({
  movies,
  onSelectMovie,
  onViewAllRankings,
}) => {
  const { format } = useCurrency();
  const [activeTab, setActiveTab] = useState<'worldwide' | 'indian' | 'opening' | 'roi'>('worldwide');

  const getFilteredMovies = () => {
    const list = [...movies];
    switch (activeTab) {
      case 'worldwide':
        return list.sort((a, b) => b.worldwideGrossUSD - a.worldwideGrossUSD).slice(0, 5);
      case 'indian':
        return list
          .filter((m) =>
            ['Bollywood', 'Tollywood', 'Kollywood', 'Mollywood', 'Sandalwood'].includes(m.industry)
          )
          .sort((a, b) => b.worldwideGrossINR - a.worldwideGrossINR)
          .slice(0, 5);
      case 'opening':
        return list.sort((a, b) => b.openingDayGrossINR - a.openingDayGrossINR).slice(0, 5);
      case 'roi':
        return list.sort((a, b) => b.financials.roiPercentage - a.financials.roiPercentage).slice(0, 5);
      default:
        return list.slice(0, 5);
    }
  };

  const currentList = getFilteredMovies();

  return (
    <div className="bg-[#101217] border border-[#1c1f28] rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
      {/* Header and Segmented Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#181a21]">
        <div>
          <h3 className="text-base font-semibold text-white">
            Box Office Hall of Fame
          </h3>
          <p className="text-xs text-[#7b8290]">Rankings across global & Indian cinema</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-[#0a0b0e] p-1 rounded-lg border border-[#1b1e26] overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('worldwide')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              activeTab === 'worldwide'
                ? 'bg-[#1e222c] text-white font-semibold shadow-sm'
                : 'text-[#7e8594] hover:text-[#c4cad4]'
            }`}
          >
            Worldwide All-Time
          </button>
          <button
            onClick={() => setActiveTab('indian')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              activeTab === 'indian'
                ? 'bg-[#1e222c] text-white font-semibold shadow-sm'
                : 'text-[#7e8594] hover:text-[#c4cad4]'
            }`}
          >
            Indian All-Time
          </button>
          <button
            onClick={() => setActiveTab('opening')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              activeTab === 'opening'
                ? 'bg-[#1e222c] text-white font-semibold shadow-sm'
                : 'text-[#7e8594] hover:text-[#c4cad4]'
            }`}
          >
            Opening Day Records
          </button>
          <button
            onClick={() => setActiveTab('roi')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              activeTab === 'roi'
                ? 'bg-[#1e222c] text-white font-semibold shadow-sm'
                : 'text-[#7e8594] hover:text-[#c4cad4]'
            }`}
          >
            Highest ROI Multiplier
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-[#646b7a] uppercase tracking-wider text-[10px] font-semibold border-b border-[#181a21]">
              <th className="py-2.5 px-3 w-12 text-center">Rank</th>
              <th className="py-2.5 px-3">Movie</th>
              <th className="py-2.5 px-3">Industry</th>
              <th className="py-2.5 px-3 text-right">
                {activeTab === 'opening'
                  ? 'Day 1 Gross'
                  : activeTab === 'roi'
                  ? 'Return on Budget'
                  : 'Worldwide Gross'}
              </th>
              <th className="py-2.5 px-3 text-center">Verdict</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#15181f]">
            {currentList.map((movie, index) => {
              const rank = index + 1;
              const rankBadge =
                rank === 1
                  ? 'text-[#f2b84b] bg-[#211a0e] border-[#483719]'
                  : rank === 2
                  ? 'text-[#e2e8f0] bg-[#1a1c24] border-[#2c303d]'
                  : rank === 3
                  ? 'text-[#f97316] bg-[#22160f] border-[#422514]'
                  : 'text-[#717886] bg-[#111318] border-[#1d2028]';

              return (
                <tr
                  key={movie.id}
                  onClick={() => onSelectMovie(movie)}
                  className="hover:bg-[#15181f]/80 cursor-pointer transition-colors group"
                >
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 rounded text-[11px] font-mono font-bold border ${rankBadge}`}
                    >
                      {rank}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-8 h-11 object-cover rounded bg-[#090a0d] border border-[#1e222b] shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=200';
                        }}
                      />
                      <div>
                        <span className="font-semibold text-white group-hover:text-[#d99b26] transition-colors block text-xs">
                          {movie.title}
                        </span>
                        <span className="text-[11px] text-[#717886]">
                          {movie.releaseYear} · Dir. {movie.director}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#14161c] text-[#9ca3af] border border-[#1e222a]">
                      {movie.industry}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    {activeTab === 'opening' ? (
                      <span className="text-xs font-bold text-[#38bdf8] tabular-nums font-mono">
                        {format(movie.openingDayGrossUSD, movie.openingDayGrossINR)}
                      </span>
                    ) : activeTab === 'roi' ? (
                      <div>
                        <span className="text-xs font-bold text-emerald-400 tabular-nums font-mono">
                          +{movie.financials.roiPercentage}%
                        </span>
                        <span className="text-[10px] text-[#6b7280] block tabular-nums">
                          Budget:{' '}
                          {format(
                            movie.financials.productionBudgetUSD,
                            movie.financials.productionBudgetINR,
                            { compact: true }
                          )}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs font-bold text-white tabular-nums font-mono">
                        {format(movie.worldwideGrossUSD, movie.worldwideGrossINR)}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <VerdictBadge verdict={movie.verdict} size="sm" />
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="text-xs text-[#717886] group-hover:text-white font-medium inline-flex items-center gap-1 transition-colors">
                      <span>Dossier</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="pt-2 flex items-center justify-between text-xs text-[#686f7c] border-t border-[#181a21]">
        <span>Top 5 verified records</span>
        <button
          onClick={onViewAllRankings}
          className="text-[#adb5c4] hover:text-white font-medium flex items-center gap-1 transition-colors"
        >
          <span>View All 50+ Global Records</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
