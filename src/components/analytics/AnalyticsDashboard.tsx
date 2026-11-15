import React, { useState } from 'react';
import { BarChart3, PieChart as PieChartIcon, TrendingUp, Globe, Award, Sparkles, Activity } from 'lucide-react';
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
  ScatterChart,
  Scatter,
} from 'recharts';

interface AnalyticsDashboardProps {
  onSelectMovie: (movie: Movie) => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ onSelectMovie }) => {
  const { format, currency } = useCurrency();
  const [metricTab, setMetricTab] = useState<'marketShare' | 'multipliers' | 'yoy'>('marketShare');

  const multiplierScatterData = ALL_MOVIES.map((m) => ({
    name: m.title,
    industry: m.industry,
    openingDay: currency === 'INR' ? m.openingDayGrossINR : m.openingDayGrossUSD,
    worldwide: currency === 'INR' ? m.worldwideGrossINR : m.worldwideGrossUSD,
    multiplier: m.multiplier,
    rawMovie: m,
  }));

  const topMultipliers = [...ALL_MOVIES]
    .sort((a, b) => b.multiplier - a.multiplier)
    .slice(0, 8);

  const currencyUnit = currency === 'INR' ? '₹ Cr' : '$ M';

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Bar */}
      <div className="bg-[#101217] border border-[#1c1f28] rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <Activity className="w-4 h-4 text-[#d99b26]" />
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Trade Analytics & Market Intelligence
            </h2>
          </div>
          <p className="text-xs text-[#717886] mt-1 max-w-2xl">
            Global market share breakdowns, word-of-mouth multiplier rankings, and multi-year recovery indices.
          </p>
        </div>

        {/* View Switchers */}
        <div className="flex items-center gap-1.5 bg-[#090a0d] p-1.5 rounded-xl border border-[#1c1f28] text-xs font-medium self-start sm:self-auto shrink-0">
          <button
            onClick={() => setMetricTab('marketShare')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors font-medium ${
              metricTab === 'marketShare'
                ? 'bg-[#1e222c] text-white shadow-sm font-semibold border border-[#d99b26]/30'
                : 'text-[#858d9c] hover:text-white hover:bg-[#15171e]'
            }`}
          >
            Market Share
          </button>
          <button
            onClick={() => setMetricTab('multipliers')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors font-medium ${
              metricTab === 'multipliers'
                ? 'bg-[#1e222c] text-white shadow-sm font-semibold border border-[#d99b26]/30'
                : 'text-[#858d9c] hover:text-white hover:bg-[#15171e]'
            }`}
          >
            Multipliers
          </button>
          <button
            onClick={() => setMetricTab('yoy')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors font-medium ${
              metricTab === 'yoy'
                ? 'bg-[#1e222c] text-white shadow-sm font-semibold border border-[#d99b26]/30'
                : 'text-[#858d9c] hover:text-white hover:bg-[#15171e]'
            }`}
          >
            YoY Trends
          </button>
        </div>
      </div>

      {/* METRIC TAB 1: INDUSTRY MARKET SHARE */}
      {metricTab === 'marketShare' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Donut Chart Card */}
          <div className="lg:col-span-1 bg-[#101217] border border-[#1c1f28] rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-1">
                <PieChartIcon className="w-3.5 h-3.5 text-amber-400" />
                Worldwide Gross Share
              </h3>
              <p className="text-xs text-slate-500">Distribution of tracked global theatrical receipts</p>
            </div>

            <div className="h-60 w-full my-3">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={INDUSTRY_MARKET_SHARE}
                    dataKey="sharePercent"
                    nameKey="industry"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={48}
                    paddingAngle={2}
                    stroke="#111317"
                    strokeWidth={2}
                  >
                    {INDUSTRY_MARKET_SHARE.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0a0c10',
                      borderColor: '#262c3d',
                      borderRadius: '8px',
                      color: '#f8fafc',
                      fontSize: '11px',
                      fontFamily: 'monospace',
                    }}
                    formatter={(val: any) => [`${val}%`, 'Share']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-3 border-t border-[#1c1f28] text-[11px] font-mono text-slate-500 text-center">
              Hollywood + Indian Cinema combine for <strong className="text-slate-300">86.2%</strong> of global volume.
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="lg:col-span-2 bg-[#101217] border border-[#1c1f28] rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
              Industry Metrics & Flagship Record Holders
            </h3>

            <div className="space-y-2">
              {INDUSTRY_MARKET_SHARE.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#090a0d] rounded-xl border border-[#1c1f28] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-100">{item.industry}</span>
                        <span className="text-[10px] font-mono font-semibold text-emerald-400">
                          {item.growthYoY > 0 ? `+${item.growthYoY}% YoY` : `${item.growthYoY}%`}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500">
                        All-Time Leader: <strong className="text-slate-300 font-normal">{item.topGrosser}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center font-mono">
                    <div className="text-right">
                      <span className="text-xs font-bold text-amber-400">
                        {currency === 'INR'
                          ? `₹${item.totalGrossINR.toLocaleString()} Cr`
                          : `$${item.totalGrossUSD}B`}
                      </span>
                      <span className="text-[9px] text-slate-500 block">Tracked Volume</span>
                    </div>
                    <span
                      className="px-2 py-0.5 rounded text-[11px] font-mono font-bold text-slate-950"
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
        <div className="space-y-5">
          <div className="bg-[#101217] border border-[#1c1f28] rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Word-of-Mouth Longevity Leaders (Multiplier &gt; 3.0x)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Calculated as Lifetime Worldwide Gross ÷ Opening Weekend Gross. Higher multiplier indicates sustained theatrical holding power.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-1">
              {topMultipliers.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => onSelectMovie(movie)}
                  className="p-3.5 bg-[#090a0d] rounded-xl border border-[#1c1f28] hover:border-[#d99b26]/50 transition-all cursor-pointer group flex items-center gap-3"
                >
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-9 h-13 object-cover rounded bg-[#090a0d] shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-amber-400 transition-colors truncate block">
                      {movie.title}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 block">
                      {movie.industry} • {movie.releaseYear}
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                        {movie.multiplier}x Multiplier
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scatter Chart */}
          <div className="bg-[#101217] border border-[#1c1f28] rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Opening Day vs Worldwide Lifetime Gross Distribution
            </h3>
            <p className="text-xs text-slate-500">
              Plots day-1 theatrical velocity against final cumulative gross in {currencyUnit}.
            </p>

            <div className="h-72 w-full bg-[#090a0d] p-3 rounded-xl border border-[#1c1f28]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1c1f28" />
                  <XAxis
                    type="number"
                    dataKey="openingDay"
                    name="Opening Day"
                    unit={currency === 'INR' ? ' Cr' : ' M'}
                    stroke="#475569"
                    fontSize={10}
                    fontFamily="monospace"
                  />
                  <YAxis
                    type="number"
                    dataKey="worldwide"
                    name="Worldwide Gross"
                    unit={currency === 'INR' ? ' Cr' : ' M'}
                    stroke="#475569"
                    fontSize={10}
                    fontFamily="monospace"
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    content={({ payload }) => {
                      if (payload && payload.length > 0) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-[#0a0c10] border border-[#262c3d] p-2.5 rounded-lg text-xs shadow-xl text-white font-mono">
                            <p className="font-bold text-amber-400">{data.name}</p>
                            <p className="text-slate-400 text-[10px]">{data.industry}</p>
                            <p className="mt-1 text-slate-300">
                              Opening: <strong>{data.openingDay} {currencyUnit}</strong>
                            </p>
                            <p className="text-slate-300">
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
                  <Scatter name="Movies" data={multiplierScatterData} fill="#eab308" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* METRIC TAB 3: YEAR OVER YEAR RECOVERY TRENDS */}
      {metricTab === 'yoy' && (
        <div className="bg-[#101217] border border-[#1c1f28] rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Global Theatrical Gross & Admissions (2019 – 2024+)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Tracking multiplex recovery and cumulative admissions
              </p>
            </div>
            <span className="text-[11px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
              97% Index Recovery
            </span>
          </div>

          <div className="h-64 w-full bg-[#090a0d] p-3 rounded-xl border border-[#1c1f28]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={YEARLY_TRENDS} margin={{ top: 15, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1c1f28" />
                <XAxis dataKey="year" stroke="#475569" fontSize={10} fontFamily="monospace" />
                <YAxis stroke="#475569" fontSize={10} fontFamily="monospace" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0a0c10',
                    borderColor: '#262c3d',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '6px', fontFamily: 'monospace' }} />
                <Bar
                  dataKey="globalGrossUSD"
                  name="Global Gross ($B)"
                  fill="#60a5fa"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="totalAdmissionsBillions"
                  name="Admissions (Billion)"
                  fill="#eab308"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Yearly Trends Table */}
          <div className="overflow-x-auto rounded-xl border border-[#1c1f28] bg-[#090a0d]">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-[#101217] text-slate-400 uppercase text-[10px] tracking-wider border-b border-[#1c1f28] font-mono">
                  <th className="p-3">Year</th>
                  <th className="p-3 text-right">Global Gross (USD)</th>
                  <th className="p-3 text-right">Indian Theatrical (INR)</th>
                  <th className="p-3 text-right">Total Admissions</th>
                  <th className="p-3 text-center">Recovery Index</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#181b24] font-mono">
                {YEARLY_TRENDS.map((y) => (
                  <tr key={y.year} className="hover:bg-[#111317]">
                    <td className="p-3 font-bold text-white">{y.year}</td>
                    <td className="p-3 text-right text-slate-300">${y.globalGrossUSD} Billion</td>
                    <td className="p-3 text-right text-amber-400">
                      ₹{y.indianGrossINR.toLocaleString()} Cr
                    </td>
                    <td className="p-3 text-right text-slate-400">
                      {y.totalAdmissionsBillions} Billion
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#151821] text-slate-300 border border-[#232736]">
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
