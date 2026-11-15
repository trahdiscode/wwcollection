import React, { useState } from 'react';
import { Award, ArrowRight, TrendingUp, Sparkles, Flame } from 'lucide-react';
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
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white font-serif">
              Box Office Hall of Fame
            </h3>
            <p className="text-xs text-slate-400">Rankings across global & Indian cinema</p>
          </div>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800/80 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('worldwide')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'worldwide'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Worldwide All-Time
          </button>
          <button
            onClick={() => setActiveTab('indian')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'indian'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Indian All-Time
          </button>
          <button
            onClick={() => setActiveTab('opening')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'opening'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Opening Day Records
          </button>
          <button
            onClick={() => setActiveTab('roi')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'roi'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Highest ROI Multiplier
          </button>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-800/80">
              <th className="py-2.5 px-3"># Rank</th>
              <th className="py-2.5 px-3">Movie Title</th>
              <th className="py-2.5 px-3">Industry</th>
              <th className="py-2.5 px-3 text-right">
                {activeTab === 'opening'
                  ? 'Day 1 Collection'
                  : activeTab === 'roi'
                  ? 'Return on Budget'
                  : 'Worldwide Gross'}
              </th>
              <th className="py-2.5 px-3 text-center">Verdict</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {currentList.map((movie, index) => {
              const rank = index + 1;
              const rankColor =
                rank === 1
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : rank === 2
                  ? 'bg-slate-300/20 text-slate-200 border-slate-300/40'
                  : rank === 3
                  ? 'bg-amber-700/20 text-amber-500 border-amber-700/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700';

              return (
                <tr
                  key={movie.id}
                  onClick={() => onSelectMovie(movie)}
                  className="hover:bg-slate-800/60 cursor-pointer transition-colors group"
                >
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold border ${rankColor}`}
                    >
                      {rank}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-9 h-12 object-cover rounded-md bg-slate-950 border border-slate-800 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=200';
                        }}
                      />
                      <div>
                        <span className="font-bold text-slate-100 group-hover:text-amber-400 transition-colors block text-sm">
                          {movie.title}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {movie.releaseYear} • Dir. {movie.director}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                      {movie.industry}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    {activeTab === 'opening' ? (
                      <span className="text-sm font-bold text-cyan-400">
                        {format(movie.openingDayGrossUSD, movie.openingDayGrossINR)}
                      </span>
                    ) : activeTab === 'roi' ? (
                      <div>
                        <span className="text-sm font-bold text-emerald-400">
                          +{movie.financials.roiPercentage}%
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          Budget:{' '}
                          {format(
                            movie.financials.productionBudgetUSD,
                            movie.financials.productionBudgetINR,
                            { compact: true }
                          )}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm font-black text-amber-400 font-serif">
                        {format(movie.worldwideGrossUSD, movie.worldwideGrossINR)}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <VerdictBadge verdict={movie.verdict} size="sm" />
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectMovie(movie);
                      }}
                      className="text-xs text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Stats</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Link */}
      <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80">
        <span>Displaying Top 5 Record Breakers</span>
        <button
          onClick={onViewAllRankings}
          className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
        >
          <span>View All 50+ Global Records & Full Leaderboards</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
