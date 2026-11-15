import React, { useState } from 'react';
import { Scale, Plus, X, ArrowUpDown, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';
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

  // Distinct palette colors for up to 4 movies
  const movieColors = ['#f59e0b', '#06b6d4', '#ec4899', '#10b981'];

  // Prepare day-wise overlay comparison data
  const maxDays = Math.max(
    ...selectedMovies.map((m) =>
      m.dayWiseTrajectory.length > 0 ? Math.max(...m.dayWiseTrajectory.map((d) => d.day)) : 1
    ),
    1
  );

  // Normalize data points for common timeline (e.g. Day 1, 2, 3, 4, 7, 10, 14, 21, etc.)
  const timelineDays = [1, 2, 3, 4, 7, 10, 14, 21, 30, 40];
  const overlayChartData = timelineDays.map((dayNum) => {
    const point: any = { day: `Day ${dayNum}` };

    selectedMovies.forEach((m) => {
      // Find nearest cumulative record for this day or prior
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

  // Prepare Bar chart for Worldwide vs Domestic vs Overseas
  const comparisonBarData = selectedMovies.map((m) => ({
    name: m.title.length > 15 ? m.title.slice(0, 14) + '…' : m.title,
    Worldwide: currency === 'INR' ? m.worldwideGrossINR : m.worldwideGrossUSD,
    Domestic: currency === 'INR' ? m.domesticGrossINR : m.domesticGrossUSD,
    Overseas: currency === 'INR' ? m.overseasGrossINR : m.overseasGrossUSD,
  }));

  const currencyUnit = currency === 'INR' ? '₹ Cr' : '$ M';

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Scale className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white font-serif">
              Box Office Arena: Head-to-Head Comparison
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Compare up to 4 global blockbusters across cumulative curves, opening records, and profitability.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {selectedMovies.length < 4 && (
            <button
              onClick={() => setSelectorOpen(true)}
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-amber-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add Movie to Arena ({selectedMovies.length}/4)</span>
            </button>
          )}

          {selectedMovies.length > 0 && (
            <button
              onClick={clearCompare}
              className="px-3 py-2 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-rose-400 border border-slate-800 rounded-xl text-xs font-semibold transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Selected Movie Badges Tray */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {selectedMovies.map((movie, idx) => (
          <div
            key={movie.id}
            className="p-3 bg-slate-900/95 border rounded-2xl flex items-center justify-between gap-3 shadow-md"
            style={{ borderColor: movieColors[idx] + '55' }}
          >
            <div
              onClick={() => onSelectMovie(movie)}
              className="flex items-center gap-2.5 min-w-0 cursor-pointer flex-1"
            >
              <div
                className="w-3 h-8 rounded-full shrink-0"
                style={{ backgroundColor: movieColors[idx] }}
              />
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-8 h-12 object-cover rounded bg-slate-950 shrink-0"
              />
              <div className="min-w-0">
                <span className="font-bold text-slate-100 text-xs block truncate hover:text-amber-400">
                  {movie.title}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  {movie.industry} • {movie.releaseYear}
                </span>
                <span className="text-xs font-black font-serif" style={{ color: movieColors[idx] }}>
                  {format(movie.worldwideGrossUSD, movie.worldwideGrossINR)}
                </span>
              </div>
            </div>

            <button
              onClick={() => removeFromCompare(movie.id)}
              className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800"
              title="Remove from comparison"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {selectedMovies.length < 4 && (
          <button
            onClick={() => setSelectorOpen(true)}
            className="border-2 border-dashed border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-900/40 rounded-2xl p-4 flex flex-col items-center justify-center text-slate-500 hover:text-slate-300 transition-all text-xs font-medium min-h-[72px]"
          >
            <Plus className="w-5 h-5 mb-1 text-slate-600" />
            <span>Click to add another movie</span>
          </button>
        )}
      </div>

      {selectedMovies.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
          <Scale className="w-12 h-12 mx-auto mb-3 text-slate-600" />
          <h3 className="text-base font-bold text-white">No Movies Selected in Arena</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Choose movies from the explorer or click &ldquo;Add Movie to Arena&rdquo; above to start comparing theatrical performances!
          </p>
          <button
            onClick={() => setSelectorOpen(true)}
            className="mt-4 px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
          >
            Pick Movies to Compare
          </button>
        </div>
      ) : (
        <>
          {/* Chart 1: Trajectory Overlay Curves */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white font-serif">
                  Box Office Cumulative Trajectory Overlay ({currencyUnit})
                </h3>
                <p className="text-xs text-slate-400">
                  Head-to-head day-by-day collection momentum
                </p>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Currency: <strong className="text-amber-400">{currency}</strong>
              </span>
            </div>

            <div className="h-72 w-full bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={overlayChartData} margin={{ top: 15, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '8px',
                      color: '#f8fafc',
                      fontSize: '12px',
                    }}
                    formatter={(val: any) => [
                      `${currency === 'INR' ? '₹' : '$'}${Number(val).toLocaleString()} ${currencyUnit}`,
                    ]}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  {selectedMovies.map((m, idx) => (
                    <Line
                      key={m.id}
                      type="monotone"
                      dataKey={m.title}
                      stroke={movieColors[idx]}
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                      activeDot={{ r: 6 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Revenue Split (Worldwide vs Domestic vs Overseas) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-3">
            <h3 className="text-sm sm:text-base font-bold text-white font-serif">
              Revenue Breakdown Comparison ({currencyUnit})
            </h3>
            <p className="text-xs text-slate-400">
              Domestic market vs International / Overseas box office collection split
            </p>

            <div className="h-64 w-full bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonBarData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '8px',
                      color: '#f8fafc',
                      fontSize: '12px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Bar dataKey="Domestic" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Overseas" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Worldwide" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Side-by-Side Metric Comparison Table */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-4 bg-slate-950 border-b border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Detailed Side-by-Side Financial Scorecard
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <th className="py-3 px-4">Metric</th>
                    {selectedMovies.map((m, idx) => (
                      <th
                        key={m.id}
                        className="py-3 px-4 font-bold text-center"
                        style={{ color: movieColors[idx] }}
                      >
                        {m.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {/* Industry & Language */}
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-3 px-4 text-slate-400 font-semibold">Industry & Language</td>
                    {selectedMovies.map((m) => (
                      <td key={m.id} className="py-3 px-4 text-center">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-semibold">
                          {m.industry} ({m.language})
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Release Date */}
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-3 px-4 text-slate-400 font-semibold">Release Date</td>
                    {selectedMovies.map((m) => (
                      <td key={m.id} className="py-3 px-4 text-center text-slate-300">
                        {m.releaseDate}
                      </td>
                    ))}
                  </tr>

                  {/* Worldwide Gross */}
                  <tr className="bg-amber-500/5 hover:bg-amber-500/10">
                    <td className="py-3 px-4 font-bold text-amber-300">Worldwide Gross</td>
                    {selectedMovies.map((m) => (
                      <td key={m.id} className="py-3 px-4 text-center font-black text-amber-400 text-sm font-serif">
                        {format(m.worldwideGrossUSD, m.worldwideGrossINR)}
                      </td>
                    ))}
                  </tr>

                  {/* Domestic Gross */}
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-3 px-4 text-slate-400 font-semibold">Domestic Gross</td>
                    {selectedMovies.map((m) => (
                      <td key={m.id} className="py-3 px-4 text-center text-slate-200">
                        {format(m.domesticGrossUSD, m.domesticGrossINR)}
                      </td>
                    ))}
                  </tr>

                  {/* Overseas Gross */}
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-3 px-4 text-slate-400 font-semibold">Overseas Gross</td>
                    {selectedMovies.map((m) => (
                      <td key={m.id} className="py-3 px-4 text-center text-slate-200">
                        {format(m.overseasGrossUSD, m.overseasGrossINR)}
                      </td>
                    ))}
                  </tr>

                  {/* Opening Day Gross */}
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-3 px-4 text-slate-400 font-semibold">Opening Day (Day 1)</td>
                    {selectedMovies.map((m) => (
                      <td key={m.id} className="py-3 px-4 text-center font-bold text-cyan-400">
                        {format(m.openingDayGrossUSD, m.openingDayGrossINR)}
                      </td>
                    ))}
                  </tr>

                  {/* Opening Weekend */}
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-3 px-4 text-slate-400 font-semibold">Opening Weekend</td>
                    {selectedMovies.map((m) => (
                      <td key={m.id} className="py-3 px-4 text-center font-bold text-slate-200">
                        {format(m.openingWeekendUSD, m.openingWeekendINR)}
                      </td>
                    ))}
                  </tr>

                  {/* Weekend Multiplier */}
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-3 px-4 text-slate-400 font-semibold">Weekend Multiplier</td>
                    {selectedMovies.map((m) => (
                      <td key={m.id} className="py-3 px-4 text-center">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-bold">
                          {m.multiplier}x
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Production Budget */}
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-3 px-4 text-slate-400 font-semibold">Production Budget</td>
                    {selectedMovies.map((m) => (
                      <td key={m.id} className="py-3 px-4 text-center text-slate-300">
                        {format(
                          m.financials.productionBudgetUSD,
                          m.financials.productionBudgetINR
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Net ROI */}
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-3 px-4 text-slate-400 font-semibold">Net Theatrical ROI</td>
                    {selectedMovies.map((m) => (
                      <td key={m.id} className="py-3 px-4 text-center font-bold text-emerald-400">
                        +{m.financials.roiPercentage}%
                      </td>
                    ))}
                  </tr>

                  {/* Trade Verdict */}
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-3 px-4 text-slate-400 font-semibold">Trade Verdict</td>
                    {selectedMovies.map((m) => (
                      <td key={m.id} className="py-3 px-4 text-center">
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

      {/* Movie Selector Modal */}
      {selectorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-3 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Select Movie to Add to Comparison</h3>
              <button
                onClick={() => setSelectorOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 space-y-2 pr-1 divide-y divide-slate-800/60">
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
                    className={`flex items-center justify-between p-2 rounded-xl transition-colors cursor-pointer ${
                      inComp ? 'opacity-40 bg-slate-950 cursor-not-allowed' : 'hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={m.posterUrl}
                        alt={m.title}
                        className="w-8 h-11 object-cover rounded bg-slate-800 shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="font-bold text-slate-100 text-xs block truncate">
                          {m.title}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {m.industry} • {m.releaseYear}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-amber-400">
                        {format(m.worldwideGrossUSD, m.worldwideGrossINR)}
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        {inComp ? 'Already Added' : 'Click to Add'}
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
