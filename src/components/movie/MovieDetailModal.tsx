import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  Award,
  DollarSign,
  TrendingUp,
  Globe,
  Share2,
  Check,
  Bookmark,
  Scale,
  Users,
  Video,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { Movie } from '../../types/movie';
import { useCurrency } from '../../context/CurrencyContext';
import { useWatchlist, useComparison } from '../../context/WatchlistContext';
import { VerdictBadge } from '../common/VerdictBadge';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from 'recharts';

interface MovieDetailModalProps {
  movie: Movie | null;
  onClose: () => void;
  onOpenCompare?: (movie: Movie) => void;
}

export const MovieDetailModal: React.FC<MovieDetailModalProps> = ({
  movie,
  onClose,
  onOpenCompare,
}) => {
  const { format, currency, getRawValue } = useCurrency();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const { isInCompare, addToCompare, removeFromCompare } = useComparison();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'daywise' | 'territories' | 'financials'>('overview');

  if (!movie) return null;

  const isBookmarked = isInWatchlist(movie.id);
  const isCompared = isInCompare(movie.id);

  const handleShare = () => {
    const text = `🎬 ${movie.title} (${movie.releaseYear})\n💰 Worldwide Gross: ${format(
      movie.worldwideGrossUSD,
      movie.worldwideGrossINR
    )}\n🏆 Verdict: ${movie.verdict}\n⚡ Opening Day: ${format(
      movie.openingDayGrossUSD,
      movie.openingDayGrossINR
    )}\nTracked via CineMetrix Global!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleCompare = () => {
    if (isCompared) {
      removeFromCompare(movie.id);
    } else {
      addToCompare(movie.id);
      if (onOpenCompare) onOpenCompare(movie);
    }
  };

  // Prepare chart data for Day-wise trajectory
  const chartData = movie.dayWiseTrajectory.map((record) => ({
    name: `Day ${record.day}`,
    dayName: record.dayName,
    daily: currency === 'INR' ? record.dailyGrossINR : record.dailyGrossUSD,
    cumulative: currency === 'INR' ? record.cumulativeINR : record.cumulativeUSD,
    date: record.date,
    notes: record.notes,
  }));

  const currencyUnit = currency === 'INR' ? '₹ Cr' : '$ M';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col my-auto max-h-[92vh]">
        {/* Backdrop Banner Header */}
        <div className="relative h-48 sm:h-64 w-full bg-slate-950 shrink-0 overflow-hidden">
          <img
            src={movie.backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover opacity-35 filter brightness-75 scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

          {/* Close & Action Buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 backdrop-blur-md border border-slate-700 transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="Copy Summary to Clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={() => toggleWatchlist(movie.id)}
              className={`p-2 rounded-xl backdrop-blur-md border transition-colors ${
                isBookmarked
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-900/80 text-slate-200 hover:bg-slate-800 border-slate-700'
              }`}
              title={isBookmarked ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>

            <button
              onClick={handleToggleCompare}
              className={`p-2 rounded-xl backdrop-blur-md border transition-colors flex items-center gap-1.5 text-xs font-medium ${
                isCompared
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                  : 'bg-slate-900/80 text-slate-200 hover:bg-slate-800 border-slate-700'
              }`}
              title="Add to Box Office Arena Compare"
            >
              <Scale className="w-4 h-4" />
              <span className="hidden sm:inline">{isCompared ? 'In Compare' : 'Compare'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 backdrop-blur-md border border-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Header Details Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end gap-4 z-10">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-20 h-28 sm:w-28 sm:h-40 object-cover rounded-xl shadow-2xl border-2 border-slate-700 shrink-0 bg-slate-950"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=300';
              }}
            />
            <div className="min-w-0 flex-1 pb-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                  {movie.industry}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {movie.language}
                </span>
                <span className="text-xs text-slate-400 font-medium">•</span>
                <span className="text-xs text-slate-400 font-medium">{movie.certification}</span>
                <VerdictBadge verdict={movie.verdict} size="sm" />
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight truncate font-serif">
                {movie.title}
              </h2>
              {movie.originalTitle && movie.originalTitle !== movie.title && (
                <p className="text-xs text-slate-400 font-medium">{movie.originalTitle}</p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  {movie.releaseDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {movie.runtimeMinutes} min
                </span>
                <span className="flex items-center gap-1 text-amber-300 font-semibold">
                  ⭐ {movie.imdbRating} / 10
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Worldwide Headline Scorecard */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 bg-slate-950 border-b border-slate-800">
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
              Worldwide Gross
            </span>
            <div className="text-lg sm:text-xl font-black text-amber-400 font-serif mt-0.5">
              {format(movie.worldwideGrossUSD, movie.worldwideGrossINR)}
            </div>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3 h-3" /> Lifetime Theatrical
            </span>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
              Domestic Gross
            </span>
            <div className="text-lg sm:text-xl font-black text-slate-100 font-serif mt-0.5">
              {format(movie.domesticGrossUSD, movie.domesticGrossINR)}
            </div>
            <span className="text-[10px] text-slate-400">
              {((movie.domesticGrossUSD / movie.worldwideGrossUSD) * 100).toFixed(1)}% of total
            </span>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
              Overseas Gross
            </span>
            <div className="text-lg sm:text-xl font-black text-slate-100 font-serif mt-0.5">
              {format(movie.overseasGrossUSD, movie.overseasGrossINR)}
            </div>
            <span className="text-[10px] text-slate-400">
              {((movie.overseasGrossUSD / movie.worldwideGrossUSD) * 100).toFixed(1)}% of total
            </span>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
              Opening Day Gross
            </span>
            <div className="text-lg sm:text-xl font-black text-cyan-400 font-serif mt-0.5">
              {format(movie.openingDayGrossUSD, movie.openingDayGrossINR)}
            </div>
            <span className="text-[10px] text-cyan-300">
              Weekend: {format(movie.openingWeekendUSD, movie.openingWeekendINR, { compact: true })}
            </span>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="px-4 border-b border-slate-800 bg-slate-900 flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Overview & Cast
          </button>
          <button
            onClick={() => setActiveTab('daywise')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'daywise'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" /> Day-Wise Trajectory & Graph
          </button>
          <button
            onClick={() => setActiveTab('territories')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'territories'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" /> Territory Breakdown
          </button>
          <button
            onClick={() => setActiveTab('financials')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'financials'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" /> Budget, ROI & Profitability
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Synopsis */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Synopsis
                </h3>
                <p className="text-sm leading-relaxed text-slate-200 bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                  {movie.synopsis}
                </p>
              </div>

              {/* Cast & Crew Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5" /> Direction & Production
                  </h4>
                  <div className="text-xs text-slate-300">
                    <span className="text-slate-500 font-medium">Director: </span>
                    <span className="font-semibold text-white">{movie.director}</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    <span className="text-slate-500 font-medium">Producers: </span>
                    <span>{movie.producers.join(', ')}</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    <span className="text-slate-500 font-medium">Genres: </span>
                    <span className="text-amber-300">{movie.genres.join(', ')}</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    <span className="text-slate-500 font-medium">Screens: </span>
                    <span>
                      {movie.screensCount.domestic.toLocaleString()} Domestic +{' '}
                      {movie.screensCount.overseas.toLocaleString()} Overseas (Total:{' '}
                      {movie.screensCount.worldwideTotal.toLocaleString()})
                    </span>
                  </div>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Leading Cast
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {movie.cast.map((actor, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 font-medium"
                      >
                        {actor}
                      </span>
                    ))}
                  </div>
                  <div className="pt-2 text-xs text-slate-400">
                    Theatrical Multiplier:{' '}
                    <span className="font-bold text-emerald-400">{movie.multiplier}x</span> (Weekend to
                    Lifetime holding index)
                  </div>
                </div>
              </div>

              {/* Milestones & Records */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Box Office Records & Milestones
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {movie.milestones.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl text-xs text-amber-200/90 flex items-start gap-2"
                    >
                      <span className="text-amber-400 font-bold shrink-0">✦</span>
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DAY-WISE TRAJECTORY */}
          {activeTab === 'daywise' && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Cumulative Box Office Growth Curve ({currencyUnit})
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    Lifetime: {format(movie.worldwideGrossUSD, movie.worldwideGrossINR)}
                  </span>
                </div>

                <div className="h-64 w-full bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="name" stroke="#64748b" textAnchor="end" fontSize={11} />
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
                          'Cumulative',
                        ]}
                      />
                      <Area
                        type="monotone"
                        dataKey="cumulative"
                        stroke="#f59e0b"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#colorCumulative)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Day-Wise Table */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Daily Box Office Log
                </h4>
                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 font-semibold uppercase text-[10px]">
                      <tr>
                        <th className="p-2.5">Timeline</th>
                        <th className="p-2.5">Date</th>
                        <th className="p-2.5">Day</th>
                        <th className="p-2.5 text-right">Daily Gross</th>
                        <th className="p-2.5 text-right">Cumulative</th>
                        <th className="p-2.5">Trade Remarks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {movie.dayWiseTrajectory.map((record) => (
                        <tr
                          key={record.day}
                          className={`hover:bg-slate-900/60 ${
                            record.isWeekend ? 'bg-amber-500/[0.02]' : ''
                          }`}
                        >
                          <td className="p-2.5 font-bold text-slate-200">Day {record.day}</td>
                          <td className="p-2.5 text-slate-400">{record.date}</td>
                          <td className="p-2.5 text-slate-300">
                            {record.dayName}{' '}
                            {record.isWeekend && (
                              <span className="text-[10px] text-amber-400 font-medium">(W/E)</span>
                            )}
                          </td>
                          <td className="p-2.5 text-right font-medium text-slate-200">
                            {format(record.dailyGrossUSD, record.dailyGrossINR)}
                          </td>
                          <td className="p-2.5 text-right font-bold text-amber-400">
                            {format(record.cumulativeUSD, record.cumulativeINR)}
                          </td>
                          <td className="p-2.5 text-slate-400 text-[11px] max-w-xs truncate">
                            {record.notes || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TERRITORIES */}
          {activeTab === 'territories' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Territory & Market Share Breakdown
                </h3>
                <span className="text-xs text-slate-500">
                  Domestic vs Overseas Circuits
                </span>
              </div>

              <div className="space-y-3">
                {movie.territoryBreakdown.map((t, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">{t.territory}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-amber-400">
                          {format(t.grossUSD, t.grossINR)}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono w-12 text-right">
                          {t.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(t.percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: FINANCIALS & ROI */}
          {activeTab === 'financials' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
                    Production Budget
                  </span>
                  <div className="text-lg font-black text-slate-100 font-serif mt-1">
                    {format(
                      movie.financials.productionBudgetUSD,
                      movie.financials.productionBudgetINR
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">Estimated Cost</span>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
                    Theatrical Share
                  </span>
                  <div className="text-lg font-black text-emerald-400 font-serif mt-1">
                    {format(
                      movie.financials.theatricalShareUSD,
                      movie.financials.theatricalShareINR
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    Distributor Net Share
                  </span>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
                    Net Theatrical ROI
                  </span>
                  <div className="text-lg font-black text-amber-400 font-serif mt-1">
                    +{movie.financials.roiPercentage.toFixed(0)}%
                  </div>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">Return on Investment</span>
                </div>
              </div>

              {/* Profitability Calculation Explanation */}
              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300">
                <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
                  Trade Profitability Analysis
                </h4>
                <p className="leading-relaxed text-slate-400">
                  To achieve commercial breakeven, the theatrical release needed to return approximately{' '}
                  <strong className="text-white">
                    {format(
                      movie.financials.breakevenTargetUSD,
                      movie.financials.breakevenTargetINR
                    )}
                  </strong>{' '}
                  in worldwide theatrical distributor share. With an actual theatrical distributor share
                  of{' '}
                  <strong className="text-emerald-400">
                    {format(
                      movie.financials.theatricalShareUSD,
                      movie.financials.theatricalShareINR
                    )}
                  </strong>
                  , this film has earned an official verdict of:
                </p>
                <div className="pt-2">
                  <VerdictBadge verdict={movie.verdict} size="md" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>Currency:</span>
            <span className="font-bold text-amber-400">{currency}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleCompare}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                isCompared
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              {isCompared ? 'Remove from Compare' : 'Add to Compare'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
