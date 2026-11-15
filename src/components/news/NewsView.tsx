import React, { useState } from 'react';
import {
  Newspaper,
  Calendar,
  Flame,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { BOX_OFFICE_NEWS, UPCOMING_MOVIES } from '../../data/newsData';
import { BoxOfficeNews, UpcomingMovieRelease, NewsCategory } from '../../types/news';
import { useCurrency } from '../../context/CurrencyContext';
import { Movie } from '../../types/movie';
import { ALL_MOVIES } from '../../data';

interface NewsViewProps {
  onSelectMovie: (movie: Movie) => void;
}

export const NewsView: React.FC<NewsViewProps> = ({ onSelectMovie }) => {
  const { format } = useCurrency();
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | 'All'>('All');
  const [activeTab, setActiveTab] = useState<'news' | 'upcoming'>('news');
  const [expandedNewsId, setExpandedNewsId] = useState<string | null>(null);

  const categories: (NewsCategory | 'All')[] = [
    'All',
    'Milestone',
    'Weekend Report',
    'Industry Record',
    'Trade Analysis',
  ];

  const filteredNews =
    selectedCategory === 'All'
      ? BOX_OFFICE_NEWS
      : BOX_OFFICE_NEWS.filter((n) => n.category === selectedCategory);

  const featuredNews = BOX_OFFICE_NEWS.find((n) => n.featured);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Banner Navigation */}
      <div className="bg-[#101217] border border-[#1c1f28] rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <Newspaper className="w-4 h-4 text-[#d99b26]" />
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Trade News & Release Radar
            </h2>
          </div>
          <p className="text-xs text-[#717886] mt-1 max-w-2xl">
            Theatrical dispatches, box office milestone announcements, and upcoming tentpole tracking.
          </p>
        </div>

        {/* View Switcher between News and Upcoming Tentpoles */}
        <div className="flex items-center gap-1.5 bg-[#090a0d] p-1.5 rounded-xl border border-[#1c1f28] text-xs font-medium self-start sm:self-auto shrink-0">
          <button
            onClick={() => setActiveTab('news')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-2 ${
              activeTab === 'news'
                ? 'bg-[#1e222c] text-white shadow-sm font-semibold border border-[#d99b26]/30'
                : 'text-[#858d9c] hover:text-white hover:bg-[#15171e]'
            }`}
          >
            <span>Trade Dispatches</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                activeTab === 'news'
                  ? 'bg-[#d99b26] text-slate-950'
                  : 'bg-[#181b23] text-[#717886]'
              }`}
            >
              {BOX_OFFICE_NEWS.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-2 ${
              activeTab === 'upcoming'
                ? 'bg-[#1e222c] text-white shadow-sm font-semibold border border-[#d99b26]/30'
                : 'text-[#858d9c] hover:text-white hover:bg-[#15171e]'
            }`}
          >
            <span>Release Calendar</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                activeTab === 'upcoming'
                  ? 'bg-[#d99b26] text-slate-950'
                  : 'bg-[#181b23] text-[#717886]'
              }`}
            >
              {UPCOMING_MOVIES.length}
            </span>
          </button>
        </div>
      </div>

      {/* SECTION 1: NEWS & TRADE DISPATCHES */}
      {activeTab === 'news' && (
        <div className="space-y-5">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-colors ${
                    active
                      ? 'bg-[#1e222c] text-white font-semibold border border-[#d99b26]/40 shadow-sm'
                      : 'bg-[#101217] hover:bg-[#15171e] text-[#858d9c] hover:text-[#c8d0de] border border-[#1c1f28]'
                  }`}
                >
                  {cat === 'All' ? 'All Updates' : cat}
                </button>
              );
            })}
          </div>

          {/* Featured Headline Story */}
          {featuredNews && selectedCategory === 'All' && (
            <div className="bg-[#101217] border border-[#1c1f28] rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-amber-400 text-slate-950 font-bold">
                    Lead Editorial
                  </span>
                  <span className="text-xs font-mono text-slate-400">{featuredNews.category}</span>
                  <span className="text-xs font-mono text-slate-500">• {featuredNews.date}</span>
                </div>

                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight leading-snug">
                  {featuredNews.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                  {featuredNews.summary}
                </p>

                {featuredNews.highlightStat && (
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#090a0d] border border-[#1c1f28] text-amber-400 font-mono text-xs">
                    <span className="text-slate-500">HIGHLIGHT:</span>
                    <span className="font-bold">{featuredNews.highlightStat}</span>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>Source: {featuredNews.source}</span>
                  <button
                    onClick={() =>
                      setExpandedNewsId(expandedNewsId === featuredNews.id ? null : featuredNews.id)
                    }
                    className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                  >
                    <span>{expandedNewsId === featuredNews.id ? 'Collapse Article' : 'Read Full Editorial'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {expandedNewsId === featuredNews.id && featuredNews.content && (
                  <div className="mt-3 pt-3 border-t border-[#1c1f28] space-y-2 text-xs text-slate-300 leading-relaxed">
                    {featuredNews.content.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* News Feed Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNews.map((news) => {
              const relatedMovie = news.relatedMovieId
                ? ALL_MOVIES.find((m) => m.id === news.relatedMovieId)
                : null;
              const isExpanded = expandedNewsId === news.id;

              return (
                <div
                  key={news.id}
                  className="bg-[#101217] border border-[#1c1f28] hover:border-[#2b3144] rounded-2xl p-5 flex flex-col justify-between transition-colors shadow-sm"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider bg-[#181c26] text-slate-300 border border-[#242b3a]">
                        {news.category}
                      </span>
                      <span className="text-[11px] text-slate-500">{news.date}</span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                      {news.title}
                    </h4>

                    <p className="text-xs text-slate-400 leading-relaxed">{news.summary}</p>

                    {news.highlightStat && (
                      <div className="inline-block px-2 py-0.5 rounded bg-[#090a0d] border border-[#1c1f28] text-[11px] font-mono text-emerald-400">
                        {news.highlightStat}
                      </div>
                    )}

                    {isExpanded && news.content && (
                      <div className="pt-2.5 border-t border-[#1c1f28] space-y-2 text-xs text-slate-300 leading-relaxed animate-in fade-in">
                        {news.content.map((par, idx) => (
                          <p key={idx}>{par}</p>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#1c1f28] flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500 text-[11px]">{news.source}</span>
                    <div className="flex items-center gap-3">
                      {relatedMovie && (
                        <button
                          onClick={() => onSelectMovie(relatedMovie)}
                          className="text-amber-400 hover:underline text-[11px]"
                        >
                          View Stats ({relatedMovie.title})
                        </button>
                      )}
                      <button
                        onClick={() => setExpandedNewsId(isExpanded ? null : news.id)}
                        className="text-slate-300 hover:text-white font-semibold text-[11px]"
                      >
                        {isExpanded ? 'Less' : 'Read'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 2: THEATRICAL RELEASE CALENDAR */}
      {activeTab === 'upcoming' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-1 gap-2">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Worldwide Theatrical Release Calendar
              </h3>
              <p className="text-xs text-[#717886] mt-0.5">
                Anticipated releases, screen targets, and advance booking buzz indicators.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {UPCOMING_MOVIES.map((movie) => {
              return (
                <div
                  key={movie.id}
                  className="bg-[#101217] border border-[#1c1f28] rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3.5 hover:border-[#2b3144] transition-colors shadow-sm"
                >
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-14 h-20 object-cover rounded bg-[#090a0d] border border-[#1c1f28] shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-mono uppercase tracking-wider bg-[#181c26] text-amber-400 border border-[#242b3a] inline-block mb-1">
                          {movie.industry}
                        </span>
                        <h4 className="text-sm font-bold text-white tracking-tight leading-snug truncate">
                          {movie.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">Dir. {movie.director}</p>
                        <p className="text-[10px] text-slate-500 font-mono truncate">
                          {movie.cast.slice(0, 2).join(', ')}
                        </p>
                      </div>
                    </div>

                    {/* Vital Specs */}
                    <div className="p-2.5 bg-[#090a0d] rounded-lg border border-[#1c1f28] grid grid-cols-2 gap-2 text-xs font-mono">
                      <div>
                        <span className="text-[9px] text-slate-500 uppercase block">
                          Release Date
                        </span>
                        <span className="font-bold text-slate-200">
                          {movie.releaseDate}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-slate-500 uppercase block">
                          Screens
                        </span>
                        <span className="font-bold text-slate-300">
                          {movie.targetScreens.toLocaleString()}
                        </span>
                      </div>
                      <div className="pt-1.5 border-t border-[#1c1f28]">
                        <span className="text-[9px] text-slate-500 uppercase block">
                          Est. Budget
                        </span>
                        <span className="text-slate-400">
                          {format(movie.estimatedBudgetUSD, movie.estimatedBudgetINR, { compact: true })}
                        </span>
                      </div>
                      <div className="pt-1.5 border-t border-[#1c1f28] text-right">
                        <span className="text-[9px] text-slate-500 uppercase block">
                          Day 1 Forecast
                        </span>
                        <span className="font-bold text-emerald-400">
                          {format(movie.expectedOpeningUSD, movie.expectedOpeningINR, { compact: true })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Advance Booking Hype Meter */}
                  <div className="pt-2 border-t border-[#1c1f28] flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500 text-[10px]">BUZZ SCORE:</span>
                      <span className="font-bold text-amber-400">{movie.buzzScore}/100</span>
                    </div>

                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
                        movie.advanceBookingStatus === 'Record Pace'
                          ? 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                          : movie.advanceBookingStatus === 'Opens This Week'
                          ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30'
                          : 'bg-[#181c26] text-slate-400 border border-[#242b3a]'
                      }`}
                    >
                      {movie.advanceBookingStatus}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
