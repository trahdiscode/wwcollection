import React, { useState } from 'react';
import { BarChart3, PieChart as PieChartIcon, TrendingUp, Globe, Award, Sparkles } from 'lucide-react';
import { ALL_MOVIES } from '../../data';
import { INDUSTRY_MARKET_SHARE, YEARLY_TRENDS } from '../../data/industryStats';
import { useCurrency } from '../../context/CurrencyContext';
import { Movie } from '../../types/movie';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  ZAxis,
} from 'recharts';

interface AnalyticsDashboardProps {
  onSelectMovie: (movie: Movie) => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ onSelectMovie }) => {
  const { format, currency } = useCurrency();
  const [metricTab, setMetricTab] = useState<'marketShare' | 'multipliers' | 'yoy'>('marketShare');

  // Multiplier scatter data (Opening Day vs Lifetime Gross)
  const multiplierScatterData = ALL_MOVIES.map((m) => ({
    name: m.title,
    industry: m.industry,
    openingDay: currency === 'INR' ? m.openingDayGrossINR : m.openingDayGrossUSD,
    worldwide: currency === 'INR' ? m.worldwideGrossINR : m.worldwideGrossUSD,
    multiplier: m.multiplier,
    rawMovie: m,
  }));

  // Top 10 by Multiplier (Word of Mouth longevity)
  const topMultipliers = [...ALL_MOVIES]
    .sort((a, b) => b.multiplier - a.multiplier)
    .slice(0, 8);

  const currencyUnit = currency === 'INR' ? '₹ Cr' : '$ M';

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white font-serif">
              Global Box Office Intelligence & Trade Analytics
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Industry market shares, opening-vs-lifetime multipliers, and year-over-year global trends.
          </p>
        </div>

        {/* View Switchers */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setMetricTab('marketShare')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              metricTab === 'marketShare'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Market Share
          </button>
          <button
            onClick={() => setMetricTab('multipliers')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              metricTab === 'multipliers'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Multipliers & Longevity
          </button>
          <button
            onClick={() => setMetricTab('yoy')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              metricTab === 'yoy'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            YoY Recovery Trends
          </button>
        </div>
      </div>

      {/* METRIC TAB 1: INDUSTRY MARKET SHARE */}
      {metricTab === 'marketShare' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pie Chart Card */}
          <div className="lg:col-span-1 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-white font-serif flex items-center gap-2 mb-1">
                <PieChartIcon className="w-4 h-4 text-amber-400" />
                Industry Market Share Distribution
              </h3>
              <p className="text-xs text-slate-400">Share of worldwide theatrical gross receipts</p>
            </div>

            <div className="h-64 w-full my-3">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={INDUSTRY_MARKET_SHARE}
                    dataKey="sharePercent"
                    nameKey="industry"
                    cx="50%"
                    cy="50%"
                    outerRadius={85}
                    innerRadius={50}
                    paddingAngle={3}
                  >
                    {INDUSTRY_MARKET_SHARE.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '8px',
                      color: '#f8fafc',
                      fontSize: '12px',
                    }}
                    formatter={(val: any) => [`${val}%`, 'Market Share']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 text-center">
              Hollywood and Indian Cinema combine for over <strong>86%</strong> of tracked trade receipts.
            </div>
          </div>

          {/* Bar Chart & Breakdown Table */}
          <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white font-serif flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              Industry Performance & Top Flagship Grossers
            </h3>

            <div className="space-y-2.5">
              {INDUSTRY_MARKET_SHARE.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-100">{item.industry}</span>
                        <span className="text-xs font-bold text-emerald-400">
                          {item.growthYoY > 0 ? `+${item.growthYoY}% YoY` : `${item.growthYoY}%`}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        All-Time Flagship: <strong className="text-slate-300">{item.topGrosser}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <div className="text-right">
                      <span className="text-xs font-black text-amber-400 font-serif">
                        {currency === 'INR'
                          ? `₹${item.totalGrossINR.toLocaleString()} Cr`
                          : `$${item.totalGrossUSD} Billion`}
                      </span>
                      <span className="text-[10px] text-slate-500 block">Total Catalog Gross</span>
                    </div>
                    <span
                      className="px-2.5 py-1 rounded-lg text-xs font-bold font-mono text-slate-950"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.sharePercent}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* METRIC TAB 2: MULTIPLIERS & LONGEVITY */}
      {metricTab === 'multipliers' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-3">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white font-serif">
                Opening Weekend Multiplier vs Lifetime Box Office
              </h3>
              <p className="text-xs text-slate-400">
                A multiplier greater than 4.0x indicates legendary word-of-mouth endurance and repeat viewings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {topMultipliers.map((movie, idx) => (
                <div
                  key={movie.id}
                  onClick={() => onSelectMovie(movie)}
                  className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-all cursor-pointer group flex items-center gap-3"
                >
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-10 h-14 object-cover rounded-lg bg-slate-800 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors truncate block">
                      {movie.title}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {movie.industry} • {movie.releaseYear}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
                        {movie.multiplier}x Multiplier
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scatter Chart */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-3">
            <h3 className="text-sm sm:text-base font-bold text-white font-serif">
              Opening Day vs Worldwide Lifetime Gross Matrix
            </h3>
            <p className="text-xs text-slate-400">
              Hover over points to see individual movie multipliers
            </p>

            <div className="h-72 w-full bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis
                    type="number"
                    dataKey="openingDay"
                    name="Opening Day"
                    unit={currency === 'INR' ? ' Cr' : ' M'}
                    stroke="#64748b"
                    fontSize={11}
                  />
                  <YAxis
                    type="number"
                    dataKey="worldwide"
                    name="Worldwide Gross"
                    unit={currency === 'INR' ? ' Cr' : ' M'}
                    stroke="#64748b"
                    fontSize={11}
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    content={({ payload }) => {
                      if (payload && payload.length > 0) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-slate-900 border border-slate-700 p-2.5 rounded-lg text-xs shadow-xl text-white">
                            <p className="font-bold text-amber-400">{data.name}</p>
                            <p className="text-slate-400 text-[10px]">{data.industry}</p>
                            <p className="mt-1">
                              Opening Day: <strong>{data.openingDay} {currencyUnit}</strong>
                            </p>
                            <p>
                              Worldwide: <strong>{data.worldwide} {currencyUnit}</strong>
                            </p>
                            <p className="text-emerald-400 font-bold">
                              Multiplier: {data.multiplier}x
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter name="Movies" data={multiplierScatterData} fill="#f59e0b" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* METRIC TAB 3: YEAR OVER YEAR RECOVERY TRENDS */}
      {metricTab === 'yoy' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white font-serif">
                Global Theatrical Gross & Admissions (2019 – 2024+)
              </h3>
              <p className="text-xs text-slate-400">
                Tracking post-pandemic recovery and multiplex box-office rebound
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
              97% of Pre-Pandemic Baseline
            </span>
          </div>

          <div className="h-72 w-full bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={YEARLY_TRENDS} margin={{ top: 15, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
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
                <Bar
                  dataKey="globalGrossUSD"
                  name="Global Gross ($ Billion)"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="totalAdmissionsBillions"
                  name="Admissions (Billion Tickets)"
                  fill="#f59e0b"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Yearly Trends Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800 font-semibold">
                  <th className="p-3">Year</th>
                  <th className="p-3 text-right">Global Gross (USD)</th>
                  <th className="p-3 text-right">Indian Theatrical (INR)</th>
                  <th className="p-3 text-right">Total Admissions</th>
                  <th className="p-3 text-center">Recovery Index</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {YEARLY_TRENDS.map((y) => (
                  <tr key={y.year} className="hover:bg-slate-900/50">
                    <td className="p-3 font-bold text-white font-mono">{y.year}</td>
                    <td className="p-3 text-right text-slate-200">${y.globalGrossUSD} Billion</td>
                    <td className="p-3 text-right text-amber-400 font-serif">
                      ₹{y.indianGrossINR.toLocaleString()} Cr
                    </td>
                    <td className="p-3 text-right text-slate-300">
                      {y.totalAdmissionsBillions} Billion
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-800 text-slate-200">
                        {y.recoveryIndex}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
