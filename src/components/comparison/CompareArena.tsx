import React, { useState } from 'react';
import { Scale, Plus, X } from 'lucide-react';
import { ALL_MOVIES } from '../../data';
import { Movie } from '../../types/movie';
import { useComparison } from '../../context/WatchlistContext';
import { useCurrency } from '../../context/CurrencyContext';
import { VerdictBadge } from '../common/VerdictBadge';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';

interface CompareArenaProps {
  onSelectMovie: (movie: Movie) => void;
}

export const CompareArena: React.FC<CompareArenaProps> = ({ onSelectMovie }) => {
  const { compareList, removeFromCompare, addToCompare, clearCompare } = useComparison();
  const { format, currency } = useCurrency();
  const [selectorOpen, setSelectorOpen] = useState(false);

  const selectedMovies = ALL_MOVIES.filter((m) => compareList.includes(m.id));

  // Refined palette for multi-movie comparison
  const movieColors = ['#f59e0b', '#38bdf8', '#ec4899', '#34d399'];

  const timelineDays = [1, 2, 3, 4, 7, 10, 14, 21, 30, 40];
  const overlayChartData = timelineDays.map((dayNum) => {
    const point: any = { day: `D${dayNum}` };

    selectedMovies.forEach((m) => {
      const matches = m.dayWiseTrajectory.filter((d) => d.day <= dayNum);
      if (matches.length > 0) {
        const latest = matches[matches.length - 1];
        point[m.title] = currency === 'INR' ? latest.cumulativeINR : latest.cumulativeUSD;
      } else {
        point[m.title] = 0;
      }
    });

    return point;
  });

  const comparisonBarData = selectedMovies.map((m) => ({
    name: m.title.length > 14 ? m.title.slice(0, 13) + '…' : m.title,
    Worldwide: currency === 'INR' ? m.worldwideGrossINR : m.worldwideGrossUSD,
    Domestic: currency === 'INR' ? m.domesticGrossINR : m.domesticGrossUSD,
    Overseas: currency === 'INR' ? m.overseasGrossINR : m.overseasGrossUSD,
  }));

  const currencyUnit = currency === 'INR' ? '₹ Cr' : '$ M';

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="bg-[#101217] border border-[#1c1f28] rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <Scale className="w-4 h-4 text-[#d99b26]" />
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Head-to-Head Comparison Arena
            </h2>
          </div>
          <p className="text-xs text-[#717886] mt-1 max-w-2xl">
            Compare up to 4 global blockbusters across cumulative curves, opening records, and profitability.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
          {selectedMovies.length < 4 && (
            <button
              onClick={() => setSelectorOpen(true)}
              className="px-3.5 py-2 bg-[#f4f5f8] hover:bg-white text-black font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Movie ({selectedMovies.length}/4)</span>
            </button>
          )}

          {selectedMovies.length > 0 && (
            <button
              onClick={clearCompare}
              className="px-3.5 py-2 bg-[#090a0d] hover:bg-[#15171e] text-[#717886] hover:text-[#fb7185] hover:border-[#fb7185]/40 border border-[#1c1f28] rounded-xl text-xs font-medium transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Selected Movie Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {selectedMovies.map((movie, idx) => (
          <div
            key={movie.id}
            className="p-3.5 sm:p-4 bg-[#101217] border border-[#1c1f28] hover:border-[#2d323f] rounded-2xl flex items-center justify-between gap-3 transition-colors shadow-sm"
          >
            <div
              onClick={() => onSelectMovie(movie)}
              className="flex items-center gap-3 min-w-0 cursor-pointer flex-1 group"
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: movieColors[idx] }}
              />
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-9 h-12 object-cover rounded-lg bg-[#090a0d] border border-[#1e222b] shrink-0"
              />
              <div className="min-w-0">
                <span className="font-semibold text-white text-xs block truncate group-hover:text-[#d99b26] transition-colors">
                  {movie.title}
                </span>
                <span className="text-[10px] text-[#717886] block mt-0.5">
                  {movie.industry} · {movie.releaseYear}
                </span>
                <span className="text-xs font-bold font-mono tabular-nums text-[#e2e8f0] block mt-0.5">
                  {format(movie.worldwideGrossUSD, movie.worldwideGrossINR)}
                </span>
              </div>
            </div>

            <button
              onClick={() => removeFromCompare(movie.id)}
              className="p-1.5 rounded-lg text-[#585f6d] hover:text-[#fb7185] hover:bg-[#15171e] transition-colors shrink-0"
              title="Remove"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}

        {selectedMovies.length < 4 && (
          <button
            onClick={() => setSelectorOpen(true)}
            className="border border-dashed border-[#1f232d] hover:border-[#384054] bg-[#090a0d] hover:bg-[#101217] rounded-2xl p-4 flex items-center justify-center gap-2 text-[#717886] hover:text-white transition-all text-xs min-h-[68px] group"
          >
            <Plus className="w-4 h-4 text-[#717886] group-hover:text-[#d99b26] transition-colors" />
            <span className="font-medium">Add movie to compare</span>
          </button>
        )}
      </div>

      {selectedMovies.length === 0 ? (
        <div className="bg-[#101217] border border-[#1c1f28] rounded-2xl p-12 sm:p-16 text-center text-[#717886] space-y-3">
          <Scale className="w-10 h-10 text-[#2c303f] mx-auto mb-2" />
          <p className="text-base font-semibold text-white">No movies selected in arena</p>
          <p className="text-xs text-[#717886] max-w-md mx-auto">
            Choose movies from the explorer or click Add Movie above to compare theatrical performances, daily trajectories, and territory splits.
          </p>
          <button
            onClick={() => setSelectorOpen(true)}
            className="mt-2 px-4 py-2 bg-[#d99b26] hover:bg-[#eab348] text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-sm"
          >
            Select Movies
          </button>
        </div>
      ) : (
        <>
          {/* Chart 1: Trajectory Overlay */}
          <div className="bg-[#101217] border border-[#1c1f28] rounded-2xl p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div>
                <h3 className="font-semibold text-white">
                  Cumulative Box Office Trajectory ({currencyUnit})
                </h3>
                <p className="text-[11px] text-[#6b7280]">
                  Comparative day-by-day collection momentum
                </p>
              </div>
              <span className="text-[#646b7a] font-mono">
                Currency: <strong className="text-white">{currency}</strong>
              </span>
            </div>

            <div className="h-64 w-full bg-[#0a0b0e] p-2.5 rounded-xl border border-[#181a21]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={overlayChartData} margin={{ top: 10, right: 15, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#16181f" />
                  <XAxis dataKey="day" stroke="#4b5262" fontSize={11} />
                  <YAxis stroke="#4b5262" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111317',
                      borderColor: '#262933',
                      borderRadius: '8px',
                      color: '#f4f5f8',
                      fontSize: '11px',
                    }}
                    formatter={(val: any) => [
                      `${Number(val).toLocaleString()} ${currencyUnit}`,
                    ]}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                  {selectedMovies.map((m, idx) => (
                    <Line
                      key={m.id}
                      type="monotone"
                      dataKey={m.title}
                      stroke={movieColors[idx]}
                      strokeWidth={2}
                      dot={{ r: 2 }}
                      activeDot={{ r: 5 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Revenue Split */}
          <div className="bg-[#101217] border border-[#1c1f28] rounded-2xl p-5 shadow-sm space-y-2">
            <h3 className="font-semibold text-white text-xs">
              Revenue Split Comparison ({currencyUnit})
            </h3>
            <p className="text-[11px] text-[#6b7280]">
              Domestic market vs International / Overseas box office collection split
            </p>

            <div className="h-56 w-full bg-[#0a0b0e] p-2.5 rounded-xl border border-[#181a21]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonBarData} margin={{ top: 10, right: 15, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#16181f" />
                  <XAxis dataKey="name" stroke="#4b5262" fontSize={11} />
                  <YAxis stroke="#4b5262" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111317',
                      borderColor: '#262933',
                      borderRadius: '8px',
                      color: '#f4f5f8',
                      fontSize: '11px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                  <Bar dataKey="Domestic" fill="#38bdf8" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="Overseas" fill="#2dd4bf" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="Worldwide" fill="#f59e0b" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Side-by-Side Table */}
          <div className="bg-[#101217] border border-[#1c1f28] rounded-2xl overflow-hidden shadow-sm">
            <div className="p-3.5 bg-[#0b0c10] border-b border-[#1c1f28]">
              <h3 className="text-xs font-semibold text-white">
                Side-by-Side Financial Comparison
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-[#0e0f13] text-[#646b7a] uppercase text-[10px] tracking-wider border-b border-[#1c1f28]">
                    <th className="py-2.5 px-4 w-44">Metric</th>
                    {selectedMovies.map((m, idx) => (
                      <th
                        key={m.id}
                        className="py-2.5 px-4 font-semibold text-center"
                        style={{ color: movieColors[idx] }}
                      >
                        {m.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#15181f] font-medium">
                  <tr>
                    <td className="py-2.5 px-4 text-[#7d8594]">Industry</td>
                    {selectedMovies.map((m) => (
                      <td key={m.id} className="py-2.5 px-4 text-center text-[#c8d0de]">
                        {m.industry} ({m.language})
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 text-[#7d8594]">Release Date</td>
                    {selectedMovies.map((m) => (
                      <td key={m.id} className="py-2.5 px-4 text-center text-[#7d8594] font-mono">
                        {m.releaseDate}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-[#15171f]/50">
                    <td className="py-2.5 px-4 font-bold text-white">Worldwide Gross</td>
                    {selectedMovies.map((m) => (
                      <td key={m.id} className="py-2.5 px-4 text-center font-bold text-white tabular-nums font-mono text-sm">
                        {format(m.worldwideGrossUSD, m.worldwideGrossINR)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 text-[#7d8594]">Domestic Gross</td>
                    {selectedMovies.map((m) => (
                      <td key={m.id} className="py-2.5 px-4 text-center text-[#c8d0de] font-mono tabular-nums">
                        {format(m.domesticGrossUSD, m.domesticGrossINR)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 text-[#7d8594]">Overseas Gross</td>
                    {selectedMovies.map((m) => (
                      <td key={m.id} className="py-2.5 px-4 text-center text-[#c8d0de] font-mono tabular-nums">
                        {format(m.overseasGrossUSD, m.overseasGrossINR)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 text-[#7d8594]">Opening Day</td>
                    {selectedMovies.map((m) => (
                      <td key={m.id} className="py-2.5 px-4 text-center font-semibold text-sky-400 font-mono tabular-nums">
                        {format(m.openingDayGrossUSD, m.openingDayGrossINR)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 text-[#7d8594]">Opening Weekend</td>
                    {selectedMovies.map((m) => (
                      <td key={m.id} className="py-2.5 px-4 text-center text-[#c8d0de] font-mono tabular-nums">
                        {format(m.openingWeekendUSD, m.openingWeekendINR)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 text-[#7d8594]">Multiplier</td>
                    {selectedMovies.map((m) => (
                      <td key={m.id} className="py-2.5 px-4 text-center font-mono font-medium text-emerald-400 tabular-nums">
                        {m.multiplier}x
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 text-[#7d8594]">Budget</td>
                    {selectedMovies.map((m) => (
                      <td key={m.id} className="py-2.5 px-4 text-center text-[#7d8594] font-mono tabular-nums">
                        {format(m.financials.productionBudgetUSD, m.financials.productionBudgetINR)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 text-[#7d8594]">Net ROI</td>
                    {selectedMovies.map((m) => (
                      <td key={m.id} className="py-2.5 px-4 text-center font-bold text-emerald-400 font-mono tabular-nums">
                        +{m.financials.roiPercentage}%
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 text-[#7d8594]">Verdict</td>
                    {selectedMovies.map((m) => (
                      <td key={m.id} className="py-2.5 px-4 text-center">
                        <VerdictBadge verdict={m.verdict} size="sm" />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Selector Modal */}
      {selectorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#101217] border border-[#1f232d] rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-[#1c1f28]">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#d99b26]" />
                <h3 className="text-sm font-bold text-white">Select Movie to Compare</h3>
              </div>
              <button
                onClick={() => setSelectorOpen(false)}
                className="p-1.5 rounded-lg text-[#646b7a] hover:text-white hover:bg-[#15171e] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 space-y-1.5 pr-1 divide-y divide-[#15181f]">
              {ALL_MOVIES.map((m) => {
                const inComp = compareList.includes(m.id);
                return (
                  <div
                    key={m.id}
                    onClick={() => {
                      if (!inComp) {
                        addToCompare(m.id);
                        setSelectorOpen(false);
                      }
                    }}
                    className={`flex items-center justify-between p-2 rounded-lg transition-colors cursor-pointer ${
                      inComp ? 'opacity-35 bg-[#090a0d] cursor-not-allowed' : 'hover:bg-[#15181f]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={m.posterUrl}
                        alt={m.title}
                        className="w-7 h-10 object-cover rounded bg-[#090a0d] shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="font-semibold text-white text-xs block truncate">
                          {m.title}
                        </span>
                        <span className="text-[10px] text-[#6b7280]">
                          {m.industry} · {m.releaseYear}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold font-mono text-white tabular-nums block">
                        {format(m.worldwideGrossUSD, m.worldwideGrossINR)}
                      </span>
                      <span className="text-[10px] text-[#585f6d] block">
                        {inComp ? 'Selected' : 'Add +'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
