import React, { useState } from 'react';
import { Award, Trophy, Sparkles, TrendingUp, DollarSign, Flame, Clock, Layers } from 'lucide-react';
import { ALL_MOVIES } from '../../data';
import { Movie, FilmIndustry } from '../../types/movie';
import { useCurrency } from '../../context/CurrencyContext';
import { VerdictBadge } from '../common/VerdictBadge';

type RankingCategory =
  | 'worldwide-all-time'
  | 'indian-all-time'
  | 'hollywood'
  | 'bollywood'
  | 'tollywood'
  | 'kollywood'
  | 'mollywood'
  | 'sandalwood'
  | 'korean'
  | 'opening-day'
  | 'opening-weekend'
  | 'highest-roi'
  | 'year-2024'
  | 'year-2023';

interface LeaderboardsViewProps {
  onSelectMovie: (movie: Movie) => void;
}

export const LeaderboardsView: React.FC<LeaderboardsViewProps> = ({ onSelectMovie }) => {
  const { format } = useCurrency();
  const [category, setCategory] = useState<RankingCategory>('worldwide-all-time');

  const categories: { id: RankingCategory; label: string; icon: React.ReactNode; group: string }[] = [
    { id: 'worldwide-all-time', label: 'Worldwide All-Time', icon: <Trophy className="w-4 h-4 text-amber-400" />, group: 'Global' },
    { id: 'indian-all-time', label: 'Indian Cinema All-Time', icon: <Award className="w-4 h-4 text-emerald-400" />, group: 'Global' },
    { id: 'opening-day', label: 'Highest Opening Day', icon: <Flame className="w-4 h-4 text-cyan-400" />, group: 'Records' },
    { id: 'opening-weekend', label: 'Highest Opening Weekend', icon: <Clock className="w-4 h-4 text-purple-400" />, group: 'Records' },
    { id: 'highest-roi', label: 'Highest ROI Multipliers', icon: <TrendingUp className="w-4 h-4 text-yellow-400" />, group: 'Records' },
    { id: 'year-2024', label: 'Best of 2024', icon: <Sparkles className="w-4 h-4 text-amber-400" />, group: 'Years' },
    { id: 'year-2023', label: 'Best of 2023', icon: <Sparkles className="w-4 h-4 text-slate-400" />, group: 'Years' },
    { id: 'hollywood', label: 'Hollywood Champions', icon: <Layers className="w-4 h-4 text-blue-400" />, group: 'Industries' },
    { id: 'bollywood', label: 'Bollywood (Hindi)', icon: <Layers className="w-4 h-4 text-amber-400" />, group: 'Industries' },
    { id: 'tollywood', label: 'Tollywood (Telugu)', icon: <Layers className="w-4 h-4 text-red-400" />, group: 'Industries' },
    { id: 'kollywood', label: 'Kollywood (Tamil)', icon: <Layers className="w-4 h-4 text-purple-400" />, group: 'Industries' },
    { id: 'mollywood', label: 'Mollywood (Malayalam)', icon: <Layers className="w-4 h-4 text-cyan-400" />, group: 'Industries' },
    { id: 'sandalwood', label: 'Sandalwood (Kannada)', icon: <Layers className="w-4 h-4 text-orange-400" />, group: 'Industries' },
    { id: 'korean', label: 'Korean Cinema (Hallyu)', icon: <Layers className="w-4 h-4 text-emerald-400" />, group: 'Industries' },
  ];

  const getRankedMovies = (): Movie[] => {
    const list = [...ALL_MOVIES];

    switch (category) {
      case 'worldwide-all-time':
        return list.sort((a, b) => b.worldwideGrossUSD - a.worldwideGrossUSD);

      case 'indian-all-time':
        return list
          .filter((m) => ['Bollywood', 'Tollywood', 'Kollywood', 'Mollywood', 'Sandalwood'].includes(m.industry))
          .sort((a, b) => b.worldwideGrossINR - a.worldwideGrossINR);

      case 'opening-day':
        return list.sort((a, b) => b.openingDayGrossINR - a.openingDayGrossINR);

      case 'opening-weekend':
        return list.sort((a, b) => b.openingWeekendINR - a.openingWeekendINR);

      case 'highest-roi':
        return list.sort((a, b) => b.financials.roiPercentage - a.financials.roiPercentage);

      case 'year-2024':
        return list.filter((m) => m.releaseYear === 2024).sort((a, b) => b.worldwideGrossUSD - a.worldwideGrossUSD);

      case 'year-2023':
        return list.filter((m) => m.releaseYear === 2023).sort((a, b) => b.worldwideGrossUSD - a.worldwideGrossUSD);

      case 'hollywood':
        return list.filter((m) => m.industry === 'Hollywood').sort((a, b) => b.worldwideGrossUSD - a.worldwideGrossUSD);

      case 'bollywood':
        return list.filter((m) => m.industry === 'Bollywood').sort((a, b) => b.worldwideGrossINR - a.worldwideGrossINR);

      case 'tollywood':
        return list.filter((m) => m.industry === 'Tollywood').sort((a, b) => b.worldwideGrossINR - a.worldwideGrossINR);

      case 'kollywood':
        return list.filter((m) => m.industry === 'Kollywood').sort((a, b) => b.worldwideGrossINR - a.worldwideGrossINR);

      case 'mollywood':
        return list.filter((m) => m.industry === 'Mollywood').sort((a, b) => b.worldwideGrossINR - a.worldwideGrossINR);

      case 'sandalwood':
        return list.filter((m) => m.industry === 'Sandalwood').sort((a, b) => b.worldwideGrossINR - a.worldwideGrossINR);

      case 'korean':
        return list.filter((m) => m.industry === 'Korean').sort((a, b) => b.worldwideGrossUSD - a.worldwideGrossUSD);

      default:
        return list;
    }
  };

  const ranked = getRankedMovies();
  const currentCategoryObj = categories.find((c) => c.id === category);

  return (
    <div className="space-y-6">
      {/* Category Navigation Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h2 className="text-base sm:text-lg font-bold text-white font-serif">
              Box Office Record Books & Leaderboards
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            {categories.length} Official Record Categories
          </span>
        </div>

        {/* Categories Chips */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {categories.map((cat) => {
            const active = category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  active
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Top 3 Podium Highlights for the Selected Category */}
      {ranked.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* #2 Silver */}
          <div
            onClick={() => onSelectMovie(ranked[1])}
            className="order-2 md:order-1 bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-700/80 rounded-2xl p-4 flex flex-col justify-between cursor-pointer hover:border-slate-400 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-7 h-7 rounded-full bg-slate-300/20 text-slate-200 border border-slate-400 flex items-center justify-center font-black text-xs">
                  #2
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400">Runner Up</span>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={ranked[1].posterUrl}
                  alt={ranked[1].title}
                  className="w-14 h-20 object-cover rounded-lg bg-slate-800 border border-slate-700 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                    {ranked[1].title}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {ranked[1].industry} • {ranked[1].releaseYear}
                  </p>
                  <VerdictBadge verdict={ranked[1].verdict} size="sm" />
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-baseline justify-between">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">
                {category === 'opening-day' ? 'Day 1 Gross' : category === 'highest-roi' ? 'ROI %' : 'Worldwide'}
              </span>
              <span className="text-base font-black text-slate-200 font-serif">
                {category === 'opening-day'
                  ? format(ranked[1].openingDayGrossUSD, ranked[1].openingDayGrossINR)
                  : category === 'highest-roi'
                  ? `+${ranked[1].financials.roiPercentage}%`
                  : format(ranked[1].worldwideGrossUSD, ranked[1].worldwideGrossINR)}
              </span>
            </div>
          </div>

          {/* #1 Gold - Center & Elevated */}
          <div
            onClick={() => onSelectMovie(ranked[0])}
            className="order-1 md:order-2 bg-gradient-to-b from-amber-950/40 via-slate-900/90 to-slate-950 border-2 border-amber-500/60 rounded-2xl p-5 flex flex-col justify-between cursor-pointer hover:border-amber-400 transition-all shadow-xl shadow-amber-500/10 group scale-[1.02]"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm shadow-md shadow-amber-500/30">
                  #1
                </span>
                <span className="text-[10px] uppercase font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                  ★ Reigning Champion
                </span>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={ranked[0].posterUrl}
                  alt={ranked[0].title}
                  className="w-16 h-24 object-cover rounded-xl bg-slate-800 border-2 border-amber-500/40 shrink-0 shadow-lg"
                />
                <div className="min-w-0">
                  <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors truncate font-serif">
                    {ranked[0].title}
                  </h3>
                  <p className="text-xs text-slate-300">
                    {ranked[0].industry} • {ranked[0].releaseYear}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">Dir. {ranked[0].director}</p>
                  <div className="mt-1">
                    <VerdictBadge verdict={ranked[0].verdict} size="sm" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-baseline justify-between">
              <span className="text-[10px] text-amber-300 uppercase font-bold">
                {category === 'opening-day' ? 'Day 1 Gross' : category === 'highest-roi' ? 'ROI %' : 'Worldwide Gross'}
              </span>
              <span className="text-xl font-black text-amber-400 font-serif">
                {category === 'opening-day'
                  ? format(ranked[0].openingDayGrossUSD, ranked[0].openingDayGrossINR)
                  : category === 'highest-roi'
                  ? `+${ranked[0].financials.roiPercentage}%`
                  : format(ranked[0].worldwideGrossUSD, ranked[0].worldwideGrossINR)}
              </span>
            </div>
          </div>

          {/* #3 Bronze */}
          <div
            onClick={() => onSelectMovie(ranked[2])}
            className="order-3 bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-700/80 rounded-2xl p-4 flex flex-col justify-between cursor-pointer hover:border-amber-700 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-7 h-7 rounded-full bg-amber-700/30 text-amber-400 border border-amber-700 flex items-center justify-center font-black text-xs">
                  #3
                </span>
                <span className="text-[10px] uppercase font-bold text-amber-600">Bronze</span>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={ranked[2].posterUrl}
                  alt={ranked[2].title}
                  className="w-14 h-20 object-cover rounded-lg bg-slate-800 border border-slate-700 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                    {ranked[2].title}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {ranked[2].industry} • {ranked[2].releaseYear}
                  </p>
                  <VerdictBadge verdict={ranked[2].verdict} size="sm" />
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-baseline justify-between">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">
                {category === 'opening-day' ? 'Day 1 Gross' : category === 'highest-roi' ? 'ROI %' : 'Worldwide'}
              </span>
              <span className="text-base font-black text-amber-500 font-serif">
                {category === 'opening-day'
                  ? format(ranked[2].openingDayGrossUSD, ranked[2].openingDayGrossINR)
                  : category === 'highest-roi'
                  ? `+${ranked[2].financials.roiPercentage}%`
                  : format(ranked[2].worldwideGrossUSD, ranked[2].worldwideGrossINR)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Complete Rankings Table for Selected Category */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {currentCategoryObj?.label} Official Standings
            </span>
            <span className="text-xs text-slate-400">({ranked.length} titles listed)</span>
          </div>
          <span className="text-[11px] text-slate-400">Sorted by verified global receipts</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800 font-bold">
                <th className="py-3 px-3 text-center">Rank</th>
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
                <th className="py-3 px-3 text-center">Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {ranked.map((movie, idx) => (
                <tr
                  key={movie.id}
                  onClick={() => onSelectMovie(movie)}
                  className="hover:bg-slate-800/70 transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold font-mono ${
                        idx === 0
                          ? 'bg-amber-500 text-slate-950'
                          : idx === 1
                          ? 'bg-slate-300 text-slate-950'
                          : idx === 2
                          ? 'bg-amber-700 text-white'
                          : 'text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-7 h-10 object-cover rounded bg-slate-950 border border-slate-800 shrink-0"
                      />
                      <div>
                        <span className="font-bold text-slate-100 group-hover:text-amber-400 transition-colors block text-xs truncate max-w-[220px]">
                          {movie.title}
                        </span>
                        <span className="text-[10px] text-slate-400 truncate block">
                          Dir. {movie.director}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                      {movie.industry}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-400 font-mono">{movie.releaseYear}</td>
                  <td className="py-3 px-3 text-right text-slate-300 font-mono">
                    {format(movie.openingDayGrossUSD, movie.openingDayGrossINR, { compact: true })}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-300 font-mono">
                    {format(movie.openingWeekendUSD, movie.openingWeekendINR, { compact: true })}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-300 font-mono">
                    {format(movie.domesticGrossUSD, movie.domesticGrossINR, { compact: true })}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-300 font-mono">
                    {format(movie.overseasGrossUSD, movie.overseasGrossINR, { compact: true })}
                  </td>
                  <td className="py-3 px-3 text-right font-black text-amber-400 font-serif bg-amber-500/5 text-sm">
                    {format(movie.worldwideGrossUSD, movie.worldwideGrossINR)}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <VerdictBadge verdict={movie.verdict} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
