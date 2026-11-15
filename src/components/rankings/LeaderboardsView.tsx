import React, { useState } from 'react';
import { Award, Trophy, Sparkles, TrendingUp, Flame, Clock, Layers } from 'lucide-react';
import { ALL_MOVIES } from '../../data';
import { Movie } from '../../types/movie';
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

  const categories: { id: RankingCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'worldwide-all-time', label: 'Worldwide All-Time', icon: <Trophy className="w-3.5 h-3.5 text-[#d99b26]" /> },
    { id: 'indian-all-time', label: 'Indian Cinema All-Time', icon: <Award className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'opening-day', label: 'Highest Opening Day', icon: <Flame className="w-3.5 h-3.5 text-sky-400" /> },
    { id: 'opening-weekend', label: 'Highest Opening Weekend', icon: <Clock className="w-3.5 h-3.5 text-violet-400" /> },
    { id: 'highest-roi', label: 'Highest ROI Multipliers', icon: <TrendingUp className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'year-2024', label: 'Best of 2024', icon: <Sparkles className="w-3.5 h-3.5 text-[#d99b26]" /> },
    { id: 'year-2023', label: 'Best of 2023', icon: <Sparkles className="w-3.5 h-3.5 text-slate-400" /> },
    { id: 'hollywood', label: 'Hollywood', icon: <Layers className="w-3.5 h-3.5 text-blue-400" /> },
    { id: 'bollywood', label: 'Bollywood (Hindi)', icon: <Layers className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'tollywood', label: 'Tollywood (Telugu)', icon: <Layers className="w-3.5 h-3.5 text-red-400" /> },
    { id: 'kollywood', label: 'Kollywood (Tamil)', icon: <Layers className="w-3.5 h-3.5 text-purple-400" /> },
    { id: 'mollywood', label: 'Mollywood (Malayalam)', icon: <Layers className="w-3.5 h-3.5 text-cyan-400" /> },
    { id: 'sandalwood', label: 'Sandalwood (Kannada)', icon: <Layers className="w-3.5 h-3.5 text-orange-400" /> },
    { id: 'korean', label: 'Korean Cinema (Hallyu)', icon: <Layers className="w-3.5 h-3.5 text-emerald-400" /> },
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
    <div className="space-y-6 sm:space-y-8">
      {/* Category Navigation Bar */}
      <div className="bg-[#101217] border border-[#1c1f28] rounded-2xl p-5 sm:p-6 shadow-sm space-y-4 sm:space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5">
              <Trophy className="w-4 h-4 text-[#d99b26]" />
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Box Office Record Books & Standings
              </h2>
            </div>
            <p className="text-xs text-[#717886] mt-1">
              Historical milestones, opening day benchmarks, worldwide grossers, and ROI leaders.
            </p>
          </div>
          <span className="text-xs font-mono text-[#717886] self-start sm:self-auto bg-[#090a0d] px-3 py-1.5 rounded-xl border border-[#1c1f28] shrink-0">
            {categories.length} Categories
          </span>
        </div>

        {/* Categories Chips */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5 pt-4 border-t border-[#1c1f28]">
          {categories.map((cat) => {
            const active = category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-colors ${
                  active
                    ? 'bg-[#1e222c] text-white font-semibold border border-[#d99b26]/40 shadow-sm'
                    : 'bg-[#090a0d] hover:bg-[#15171e] text-[#858d9c] hover:text-[#c8d0de] border border-[#1c1f28]'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Top 3 Showcase */}
      {ranked.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* #2 Silver */}
          <div
            onClick={() => onSelectMovie(ranked[1])}
            className="order-2 md:order-1 bg-[#101217] border border-[#1f232d] hover:border-[#343a4a] rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all shadow-sm group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-6 h-6 rounded-lg bg-[#1a1c24] text-[#c8d0de] border border-[#2c303d] flex items-center justify-center font-mono font-bold text-xs">
                  2
                </span>
                <span className="text-[10px] uppercase font-semibold text-[#717886] tracking-wider">Runner Up</span>
              </div>
              <div className="flex items-center gap-3.5">
                <img
                  src={ranked[1].posterUrl}
                  alt={ranked[1].title}
                  className="w-13 h-18 object-cover rounded-lg bg-[#090a0d] border border-[#1e222b] shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#d99b26] transition-colors truncate">
                    {ranked[1].title}
                  </h4>
                  <p className="text-[11px] text-[#717886] mt-0.5">
                    {ranked[1].industry} · {ranked[1].releaseYear}
                  </p>
                  <div className="mt-1.5">
                    <VerdictBadge verdict={ranked[1].verdict} size="sm" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#181a21] flex items-baseline justify-between text-xs">
              <span className="text-[10px] text-[#717886] uppercase font-medium">
                {category === 'opening-day' ? 'Day 1' : category === 'highest-roi' ? 'ROI' : 'Worldwide'}
              </span>
              <span className="font-mono font-bold text-white tabular-nums">
                {category === 'opening-day'
                  ? format(ranked[1].openingDayGrossUSD, ranked[1].openingDayGrossINR)
                  : category === 'highest-roi'
                  ? `+${ranked[1].financials.roiPercentage}%`
                  : format(ranked[1].worldwideGrossUSD, ranked[1].worldwideGrossINR)}
              </span>
            </div>
          </div>

          {/* #1 Gold */}
          <div
            onClick={() => onSelectMovie(ranked[0])}
            className="order-1 md:order-2 bg-[#12141a] border border-[#3d2f16] hover:border-[#5a451d] rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all shadow-md group md:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-6 h-6 rounded-lg bg-[#211a0e] text-[#f2b84b] border border-[#483719] flex items-center justify-center font-mono font-bold text-xs">
                  1
                </span>
                <span className="text-[10px] uppercase font-bold text-[#d99b26] tracking-wider">
                  Champion
                </span>
              </div>
              <div className="flex items-center gap-3.5">
                <img
                  src={ranked[0].posterUrl}
                  alt={ranked[0].title}
                  className="w-14 h-20 object-cover rounded-lg bg-[#090a0d] border border-[#2b2416] shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-white group-hover:text-[#d99b26] transition-colors truncate">
                    {ranked[0].title}
                  </h3>
                  <p className="text-[11px] text-[#a4acb9] mt-0.5">
                    {ranked[0].industry} · {ranked[0].releaseYear} · Dir. {ranked[0].director}
                  </p>
                  <div className="mt-1.5">
                    <VerdictBadge verdict={ranked[0].verdict} size="sm" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#262015] flex items-baseline justify-between text-xs">
              <span className="text-[10px] text-[#d99b26] uppercase font-semibold">
                {category === 'opening-day' ? 'Day 1 Gross' : category === 'highest-roi' ? 'ROI %' : 'Worldwide Gross'}
              </span>
              <span className="text-base font-bold text-white tabular-nums font-mono">
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
            className="order-3 bg-[#101217] border border-[#1f232d] hover:border-[#343a4a] rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all shadow-sm group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-6 h-6 rounded-lg bg-[#22160f] text-[#f97316] border border-[#422514] flex items-center justify-center font-mono font-bold text-xs">
                  3
                </span>
                <span className="text-[10px] uppercase font-semibold text-[#717886] tracking-wider">Third Place</span>
              </div>
              <div className="flex items-center gap-3.5">
                <img
                  src={ranked[2].posterUrl}
                  alt={ranked[2].title}
                  className="w-13 h-18 object-cover rounded-lg bg-[#090a0d] border border-[#1e222b] shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#d99b26] transition-colors truncate">
                    {ranked[2].title}
                  </h4>
                  <p className="text-[11px] text-[#717886] mt-0.5">
                    {ranked[2].industry} · {ranked[2].releaseYear}
                  </p>
                  <div className="mt-1.5">
                    <VerdictBadge verdict={ranked[2].verdict} size="sm" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#181a21] flex items-baseline justify-between text-xs">
              <span className="text-[10px] text-[#717886] uppercase font-medium">
                {category === 'opening-day' ? 'Day 1' : category === 'highest-roi' ? 'ROI' : 'Worldwide'}
              </span>
              <span className="font-mono font-bold text-white tabular-nums">
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

      {/* Standings Table */}
      <div className="bg-[#101217] border border-[#1c1f28] rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 bg-[#0b0c10] border-b border-[#1c1f28] flex items-center justify-between text-xs">
          <span className="font-semibold text-white text-sm">
            {currentCategoryObj?.label} Standings
          </span>
          <span className="text-[#717886] tabular-nums font-mono">{ranked.length} entries listed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#0e0f13] text-[#646b7a] uppercase text-[10px] tracking-wider border-b border-[#1c1f28] font-semibold">
                <th className="py-2.5 px-3 text-center w-12">Rank</th>
                <th className="py-2.5 px-4">Title</th>
                <th className="py-2.5 px-3">Industry</th>
                <th className="py-2.5 px-3">Year</th>
                <th className="py-2.5 px-3 text-right">Opening Day</th>
                <th className="py-2.5 px-3 text-right">Opening W/E</th>
                <th className="py-2.5 px-3 text-right">Domestic</th>
                <th className="py-2.5 px-3 text-right">Overseas</th>
                <th className="py-2.5 px-3 text-right text-white font-bold">
                  Worldwide Gross
                </th>
                <th className="py-2.5 px-3 text-center">Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#15181f]">
              {ranked.map((movie, idx) => (
                <tr
                  key={movie.id}
                  onClick={() => onSelectMovie(movie)}
                  className="hover:bg-[#14171f] transition-colors cursor-pointer group"
                >
                  <td className="py-2.5 px-3 text-center text-[#646b7a] font-mono text-[11px]">
                    {idx + 1}
                  </td>
                  <td className="py-2.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-7 h-10 object-cover rounded bg-[#090a0d] border border-[#1b1e26] shrink-0"
                      />
                      <div>
                        <span className="font-semibold text-white group-hover:text-[#d99b26] transition-colors block text-xs truncate max-w-[200px]">
                          {movie.title}
                        </span>
                        <span className="text-[10px] text-[#6b7280] truncate block">
                          Dir. {movie.director}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#14161c] text-[#8e95a2] border border-[#1e222a]">
                      {movie.industry}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-[#7d8594] font-mono text-[11px]">{movie.releaseYear}</td>
                  <td className="py-2.5 px-3 text-right text-[#c8d0de] font-mono tabular-nums">
                    {format(movie.openingDayGrossUSD, movie.openingDayGrossINR, { compact: true })}
                  </td>
                  <td className="py-2.5 px-3 text-right text-[#c8d0de] font-mono tabular-nums">
                    {format(movie.openingWeekendUSD, movie.openingWeekendINR, { compact: true })}
                  </td>
                  <td className="py-2.5 px-3 text-right text-[#9ca3af] font-mono tabular-nums">
                    {format(movie.domesticGrossUSD, movie.domesticGrossINR, { compact: true })}
                  </td>
                  <td className="py-2.5 px-3 text-right text-[#9ca3af] font-mono tabular-nums">
                    {format(movie.overseasGrossUSD, movie.overseasGrossINR, { compact: true })}
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-white font-mono tabular-nums">
                    {format(movie.worldwideGrossUSD, movie.worldwideGrossINR)}
                  </td>
                  <td className="py-2.5 px-3 text-center">
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
