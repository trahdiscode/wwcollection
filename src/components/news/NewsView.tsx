import React, { useState } from 'react';
import {
  Newspaper,
  Calendar,
  Flame,
  Award,
  Sparkles,
  TrendingUp,
  Clock,
  ArrowRight,
  Globe,
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
    <div className="space-y-6">
      {/* Top Banner Navigation */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Newspaper className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white font-serif">
              Latest Box Office Developments & Release Radar
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Breaking milestones, theatrical run analyses, and upcoming worldwide releases.
          </p>
        </div>

        {/* View Switcher between News and Upcoming Tentpoles */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('news')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'news'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>Trade Intelligence ({BOX_OFFICE_NEWS.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'upcoming'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Release Calendar ({UPCOMING_MOVIES.length})</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: NEWS & TRADE DISPATCHES */}
      {activeTab === 'news' && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  {cat === 'All' ? 'All Updates' : cat}
                </button>
              );
            })}
          </div>

          {/* Featured Headline Story */}
          {featuredNews && selectedCategory === 'All' && (
            <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950">
                    Lead Editorial
                  </span>
                  <span className="text-xs text-amber-300 font-semibold">{featuredNews.category}</span>
                  <span className="text-xs text-slate-400">• {featuredNews.date}</span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white font-serif leading-tight">
                  {featuredNews.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                  {featuredNews.summary}
                </p>

                {featuredNews.highlightStat && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-amber-500/40 text-amber-400 font-mono text-xs font-bold">
                    <Flame className="w-3.5 h-3.5" />
                    <span>Key Stat: {featuredNews.highlightStat}</span>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                  <span>Source: {featuredNews.source}</span>
                  <button
                    onClick={() =>
                      setExpandedNewsId(expandedNewsId === featuredNews.id ? null : featuredNews.id)
                    }
                    className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                  >
                    <span>{expandedNewsId === featuredNews.id ? 'Collapse Analysis' : 'Read Full Editorial'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {expandedNewsId === featuredNews.id && featuredNews.content && (
                  <div className="mt-4 pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-300 leading-relaxed">
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
                  className="bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-amber-300 border border-slate-700">
                        {news.category}
                      </span>
                      <span className="text-[11px] text-slate-400">{news.date}</span>
                    </div>

                    <h4 className="text-base font-bold text-white font-serif leading-snug">
                      {news.title}
                    </h4>

                    <p className="text-xs text-slate-400 leading-relaxed">{news.summary}</p>

                    {news.highlightStat && (
                      <div className="inline-block px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-bold font-mono text-emerald-400">
                        ⚡ {news.highlightStat}
                      </div>
                    )}

                    {isExpanded && news.content && (
                      <div className="pt-3 border-t border-slate-800 space-y-2 text-xs text-slate-300 leading-relaxed animate-in fade-in">
                        {news.content.map((par, idx) => (
                          <p key={idx}>{par}</p>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-500">{news.source}</span>
                    <div className="flex items-center gap-3">
                      {relatedMovie && (
                        <button
                          onClick={() => onSelectMovie(relatedMovie)}
                          className="text-amber-400 hover:text-amber-300 font-medium underline"
                        >
                          View Stats ({relatedMovie.title})
                        </button>
                      )}
                      <button
                        onClick={() => setExpandedNewsId(isExpanded ? null : news.id)}
                        className="text-slate-300 hover:text-white font-semibold"
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

      {/* SECTION 2: THEATRICAL RELEASE CALENDAR & ADVANCE RADAR */}
      {activeTab === 'upcoming' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2">
            <div>
              <h3 className="text-base font-bold text-white font-serif">
                Worldwide Theatrical Release Calendar
              </h3>
              <p className="text-xs text-slate-400">
                Anticipated releases, screen targets, and advance booking buzz ratings.
              </p>
            </div>
            <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Live Forecast Engine
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {UPCOMING_MOVIES.map((movie) => {
              return (
                <div
                  key={movie.id}
                  className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col justify-between space-y-4 group hover:border-amber-500/40 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-16 h-24 object-cover rounded-xl bg-slate-950 border border-slate-700 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-amber-400 border border-slate-700 inline-block mb-1">
                          {movie.industry}
                        </span>
                        <h4 className="text-base font-black text-white font-serif group-hover:text-amber-400 transition-colors leading-tight truncate">
                          {movie.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5">Dir. {movie.director}</p>
                        <p className="text-[11px] text-slate-500 truncate">
                          {movie.cast.slice(0, 2).join(', ')}
                        </p>
                      </div>
                    </div>

                    {/* Vital Specs */}
                    <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-semibold block">
                          Release Date
                        </span>
                        <span className="font-bold text-amber-300 font-mono">
                          {movie.releaseDate}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 uppercase font-semibold block">
                          Target Screens
                        </span>
                        <span className="font-bold text-slate-200">
                          {movie.targetScreens.toLocaleString()}
                        </span>
                      </div>
                      <div className="pt-1 border-t border-slate-800/80">
                        <span className="text-[10px] text-slate-500 uppercase font-semibold block">
                          Est. Budget
                        </span>
                        <span className="font-medium text-slate-300">
                          {format(movie.estimatedBudgetUSD, movie.estimatedBudgetINR, { compact: true })}
                        </span>
                      </div>
                      <div className="pt-1 border-t border-slate-800/80 text-right">
                        <span className="text-[10px] text-slate-500 uppercase font-semibold block">
                          Day 1 Forecast
                        </span>
                        <span className="font-bold text-emerald-400">
                          {format(movie.expectedOpeningUSD, movie.expectedOpeningINR, { compact: true })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Advance Booking Hype Meter */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-amber-400" />
                      <span className="text-slate-300 font-semibold">Hype Index:</span>
                      <span className="font-black text-amber-400 font-mono">{movie.buzzScore}/100</span>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        movie.advanceBookingStatus === 'Record Pace'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : movie.advanceBookingStatus === 'Opens This Week'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-slate-800 text-slate-400'
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
