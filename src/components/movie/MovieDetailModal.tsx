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
  Star,
  ExternalLink,
} from 'lucide-react';
import { Movie } from '../../types/movie';
import { useCurrency } from '../../context/CurrencyContext';
import { useWatchlist, useComparison } from '../../context/WatchlistContext';
import { VerdictBadge } from '../common/VerdictBadge';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
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
  const { format, currency } = useCurrency();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const { isInCompare, addToCompare, removeFromCompare } = useComparison();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'daywise' | 'territories' | 'financials'>('overview');

  if (!movie) return null;

  const isBookmarked = isInWatchlist(movie.id);
  const isCompared = isInCompare(movie.id);

  const handleShare = () => {
    const text = `${movie.title} (${movie.releaseYear}) | Worldwide: ${format(
      movie.worldwideGrossUSD,
      movie.worldwideGrossINR
    )} | Verdict: ${movie.verdict} | CineMetrix Global`;
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

  const chartData = movie.dayWiseTrajectory.map((record) => ({
    name: `D${record.day}`,
    dayName: record.dayName,
    daily: currency === 'INR' ? record.dailyGrossINR : record.dailyGrossUSD,
    cumulative: currency === 'INR' ? record.cumulativeINR : record.cumulativeUSD,
    date: record.date,
    notes: record.notes,
  }));

  const currencyUnit = currency === 'INR' ? '₹ Cr' : '$ M';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-4xl bg-[#0e1015] border border-[#222634] rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col my-auto max-h-[92vh]">
        {/* Backdrop Banner Header */}
        <div className="relative h-44 sm:h-56 w-full bg-[#07080b] shrink-0 overflow-hidden">
          <img
            src={movie.backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover opacity-25 filter grayscale contrast-125"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1015] via-[#0e1015]/70 to-transparent" />

          {/* Top Actions */}
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 z-20">
            <button
              onClick={handleShare}
              className="h-8 px-2.5 rounded-lg bg-[#151821]/90 hover:bg-[#1d222e] text-slate-300 border border-[#262c3d] transition-colors flex items-center gap-1.5 text-xs font-mono"
              title="Copy Summary"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'COPIED' : 'SHARE'}</span>
            </button>

            <button
              onClick={() => toggleWatchlist(movie.id)}
              className={`h-8 px-2.5 rounded-lg border transition-colors flex items-center gap-1 text-xs font-mono ${
                isBookmarked
                  ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                  : 'bg-[#151821]/90 text-slate-300 hover:bg-[#1d222e] border-[#262c3d]'
              }`}
              title={isBookmarked ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? 'currentColor' : 'none'} />
              <span className="hidden sm:inline">{isBookmarked ? 'SAVED' : 'SAVE'}</span>
            </button>

            <button
              onClick={handleToggleCompare}
              className={`h-8 px-2.5 rounded-lg border transition-colors flex items-center gap-1.5 text-xs font-mono ${
                isCompared
                  ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                  : 'bg-[#151821]/90 text-slate-300 hover:bg-[#1d222e] border-[#262c3d]'
              }`}
              title="Add to Arena Comparison"
            >
              <Scale className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isCompared ? 'COMPARING' : 'COMPARE'}</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-[#151821]/90 hover:bg-[#1d222e] text-slate-300 border border-[#262c3d] transition-colors flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Title and Key Details */}
          <div className="absolute bottom-3 left-4 right-4 flex items-end gap-3.5 z-10">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-18 h-26 sm:w-24 sm:h-34 object-cover rounded-lg shadow-xl border border-[#2b3144] shrink-0 bg-[#07080b]"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=300';
              }}
            />
            <div className="min-w-0 flex-1 pb-0.5">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#1c202c] text-slate-300 border border-[#2b3144]">
                  {movie.industry}
                </span>
                <span className="text-[11px] font-mono text-slate-400">{movie.language}</span>
                <span className="text-slate-600">•</span>
                <span className="text-[11px] font-mono text-slate-400">{movie.certification}</span>
                <VerdictBadge verdict={movie.verdict} size="sm" />
              </div>

              <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight truncate">
                {movie.title}
              </h2>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  {movie.releaseDate}
                </span>
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {movie.runtimeMinutes}m
                </span>
                <span className="flex items-center gap-1 font-mono text-[11px] text-amber-300 font-semibold">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  {movie.imdbRating.toFixed(1)}/10
                </span>
                <span className="text-slate-500 font-mono text-[11px]">
                  Director: <span className="text-slate-300">{movie.director}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Headline Trade Metric Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#1c202c] border-b border-[#1c202c]">
          <div className="p-3.5 bg-[#0e1015]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
              Worldwide Gross
            </span>
            <div className="text-base sm:text-lg font-bold font-mono text-amber-400 mt-0.5">
              {format(movie.worldwideGrossUSD, movie.worldwideGrossINR)}
            </div>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3 h-3" /> Lifetime Theatrical
            </span>
          </div>

          <div className="p-3.5 bg-[#0e1015]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
              Domestic Circuit
            </span>
            <div className="text-base sm:text-lg font-bold font-mono text-slate-100 mt-0.5">
              {format(movie.domesticGrossUSD, movie.domesticGrossINR)}
            </div>
            <span className="text-[10px] font-mono text-slate-500 mt-0.5 block">
              {((movie.domesticGrossUSD / movie.worldwideGrossUSD) * 100).toFixed(1)}% of total
            </span>
          </div>

          <div className="p-3.5 bg-[#0e1015]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
              Overseas Circuit
            </span>
            <div className="text-base sm:text-lg font-bold font-mono text-slate-100 mt-0.5">
              {format(movie.overseasGrossUSD, movie.overseasGrossINR)}
            </div>
            <span className="text-[10px] font-mono text-slate-500 mt-0.5 block">
              {((movie.overseasGrossUSD / movie.worldwideGrossUSD) * 100).toFixed(1)}% of total
            </span>
          </div>

          <div className="p-3.5 bg-[#0e1015]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
              Opening Day
            </span>
            <div className="text-base sm:text-lg font-bold font-mono text-cyan-400 mt-0.5">
              {format(movie.openingDayGrossUSD, movie.openingDayGrossINR)}
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-0.5 block">
              W/E: {format(movie.openingWeekendUSD, movie.openingWeekendINR, { compact: true })}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 border-b border-[#1c202c] bg-[#0a0c10] flex items-center gap-1 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview & Cast' },
            { id: 'daywise', label: 'Day-Wise Trajectory' },
            { id: 'territories', label: 'Territory Breakdown' },
            { id: 'financials', label: 'Financials & ROI' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3.5 text-xs font-mono font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">
                  Synopsis
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-300 bg-[#07080b] p-3.5 rounded-xl border border-[#1c202c]">
                  {movie.synopsis}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="bg-[#07080b] p-3.5 rounded-xl border border-[#1c202c] space-y-2">
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-slate-500" /> Direction & Production
                  </h4>
                  <div className="text-xs text-slate-300">
                    <span className="text-slate-500 font-mono text-[11px]">Director: </span>
                    <span className="font-semibold text-white">{movie.director}</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    <span className="text-slate-500 font-mono text-[11px]">Producers: </span>
                    <span>{movie.producers.join(', ')}</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    <span className="text-slate-500 font-mono text-[11px]">Genres: </span>
                    <span className="text-amber-300 font-mono text-[11px]">{movie.genres.join(', ')}</span>
                  </div>
                  <div className="text-xs text-slate-300 font-mono text-[11px]">
                    <span className="text-slate-500">Screens: </span>
                    <span>
                      {movie.screensCount.domestic.toLocaleString()} Dom +{' '}
                      {movie.screensCount.overseas.toLocaleString()} OS ({movie.screensCount.worldwideTotal.toLocaleString()} Total)
                    </span>
                  </div>
                </div>

                <div className="bg-[#07080b] p-3.5 rounded-xl border border-[#1c202c] space-y-2">
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-500" /> Leading Cast
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {movie.cast.map((actor, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-[#13161f] border border-[#202534] text-xs text-slate-300"
                      >
                        {actor}
                      </span>
                    ))}
                  </div>
                  <div className="pt-2 text-[11px] font-mono text-slate-400">
                    Theatrical Multiplier:{' '}
                    <span className="font-bold text-emerald-400">{movie.multiplier}x</span> (Weekend-to-lifetime index)
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" /> Box Office Records & Milestones
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {movie.milestones.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#07080b] border border-[#1c202c] rounded-lg text-xs text-slate-300 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DAY-WISE TRAJECTORY */}
          {activeTab === 'daywise' && (
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                    Cumulative Box Office Trajectory ({currencyUnit})
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    Total: {format(movie.worldwideGrossUSD, movie.worldwideGrossINR)}
                  </span>
                </div>

                <div className="h-56 w-full bg-[#07080b] p-3 rounded-xl border border-[#1c202c]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorCumulativeModal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#eab308" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1c202c" />
                      <XAxis dataKey="name" stroke="#475569" fontSize={10} fontFamily="monospace" />
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
                        formatter={(val: any) => [
                          `${currency === 'INR' ? '₹' : '$'}${Number(val).toLocaleString()} ${currencyUnit}`,
                          'Cumulative',
                        ]}
                      />
                      <Area
                        type="monotone"
                        dataKey="cumulative"
                        stroke="#eab308"
                        strokeWidth={1.5}
                        fillOpacity={1}
                        fill="url(#colorCumulativeModal)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                  Daily Box Office Log
                </h4>
                <div className="overflow-x-auto rounded-xl border border-[#1c202c] bg-[#07080b]">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#0e1015] text-slate-400 border-b border-[#1c202c] font-mono uppercase text-[10px]">
                      <tr>
                        <th className="p-2.5">Timeline</th>
                        <th className="p-2.5">Date</th>
                        <th className="p-2.5">Day</th>
                        <th className="p-2.5 text-right">Daily Gross</th>
                        <th className="p-2.5 text-right">Cumulative</th>
                        <th className="p-2.5">Trade Remarks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#181b24] font-mono">
                      {movie.dayWiseTrajectory.map((record) => (
                        <tr
                          key={record.day}
                          className={`hover:bg-[#12151e] ${
                            record.isWeekend ? 'bg-[#151821]/40' : ''
                          }`}
                        >
                          <td className="p-2.5 font-bold text-slate-200">Day {record.day}</td>
                          <td className="p-2.5 text-slate-400 text-[11px]">{record.date}</td>
                          <td className="p-2.5 text-slate-300 text-[11px]">
                            {record.dayName}{' '}
                            {record.isWeekend && (
                              <span className="text-[10px] text-amber-400 font-semibold">(W/E)</span>
                            )}
                          </td>
                          <td className="p-2.5 text-right text-slate-300">
                            {format(record.dailyGrossUSD, record.dailyGrossINR)}
                          </td>
                          <td className="p-2.5 text-right font-bold text-amber-400">
                            {format(record.cumulativeUSD, record.cumulativeINR)}
                          </td>
                          <td className="p-2.5 text-slate-400 text-[11px] max-w-xs truncate font-sans">
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
                <h3 className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                  Territory & Market Share Breakdown
                </h3>
                <span className="text-xs font-mono text-slate-500">
                  Domestic vs International Circuits
                </span>
              </div>

              <div className="space-y-2.5">
                {movie.territoryBreakdown.map((t, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#07080b] rounded-xl border border-[#1c202c] space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">{t.territory}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-amber-400">
                          {format(t.grossUSD, t.grossINR)}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 w-12 text-right">
                          {t.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-[#151821] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-400 h-full rounded-full transition-all duration-300"
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
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-[#07080b] rounded-xl border border-[#1c202c]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                    Production Budget
                  </span>
                  <div className="text-base font-bold font-mono text-slate-100 mt-1">
                    {format(
                      movie.financials.productionBudgetUSD,
                      movie.financials.productionBudgetINR
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 mt-0.5 block">Estimated Negative Cost</span>
                </div>

                <div className="p-3.5 bg-[#07080b] rounded-xl border border-[#1c202c]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                    Theatrical Share
                  </span>
                  <div className="text-base font-bold font-mono text-emerald-400 mt-1">
                    {format(
                      movie.financials.theatricalShareUSD,
                      movie.financials.theatricalShareINR
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 mt-0.5 block">Distributor Realization</span>
                </div>

                <div className="p-3.5 bg-[#07080b] rounded-xl border border-[#1c202c]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                    Theatrical ROI
                  </span>
                  <div className="text-base font-bold font-mono text-amber-400 mt-1">
                    +{movie.financials.roiPercentage.toFixed(0)}%
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 mt-0.5 block">Return on Investment</span>
                </div>
              </div>

              <div className="p-4 bg-[#07080b] rounded-xl border border-[#1c202c] space-y-2 text-xs text-slate-300">
                <h4 className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                  Trade Profitability Analysis
                </h4>
                <p className="leading-relaxed text-slate-400">
                  To achieve commercial breakeven, the theatrical release required approximately{' '}
                  <strong className="text-white font-mono">
                    {format(
                      movie.financials.breakevenTargetUSD,
                      movie.financials.breakevenTargetINR
                    )}
                  </strong>{' '}
                  in worldwide theatrical distributor share. With actual theatrical realization of{' '}
                  <strong className="text-emerald-400 font-mono">
                    {format(
                      movie.financials.theatricalShareUSD,
                      movie.financials.theatricalShareINR
                    )}
                  </strong>
                  , this film has attained an official verdict of:
                </p>
                <div className="pt-2">
                  <VerdictBadge verdict={movie.verdict} size="md" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 border-t border-[#1c202c] bg-[#0a0c10] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="text-slate-500">CURRENCY:</span>
            <span className="font-bold text-amber-400">{currency}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleCompare}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-colors ${
                isCompared
                  ? 'bg-amber-400 text-slate-950'
                  : 'bg-[#151821] hover:bg-[#1d222e] text-slate-300 border border-[#262c3d]'
              }`}
            >
              {isCompared ? 'Remove from Compare' : '+ Add to Compare'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-200 hover:bg-white text-slate-950 font-bold font-mono text-xs rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
