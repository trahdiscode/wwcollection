import React, { useState } from 'react';
import {
  Film,
  TrendingUp,
  Award,
  BarChart3,
  Scale,
  Newspaper,
  Search,
  Bookmark,
  Menu,
  X,
  Sparkles,
  Globe,
} from 'lucide-react';
import { CurrencyToggle } from './CurrencyToggle';
import { useWatchlist } from '../../context/WatchlistContext';
import { useComparison } from '../../context/WatchlistContext';

export type NavTab = 'hub' | 'explorer' | 'rankings' | 'compare' | 'analytics' | 'news';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenSearch: () => void;
  onOpenWatchlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenSearch,
  onOpenWatchlist,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { watchlist } = useWatchlist();
  const { compareList } = useComparison();

  const navLinks: { id: NavTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'hub', label: 'Live Hub', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'explorer', label: 'Movie Explorer', icon: <Film className="w-4 h-4" /> },
    { id: 'rankings', label: 'Leaderboards', icon: <Award className="w-4 h-4" /> },
    {
      id: 'compare',
      label: 'Compare Arena',
      icon: <Scale className="w-4 h-4" />,
      badge: compareList.length,
    },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'news', label: 'Updates & Calendar', icon: <Newspaper className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      {/* Top Banner Ticker */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border-b border-amber-900/30 px-4 py-1 text-[11px] text-amber-200/90 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-amber-300 uppercase tracking-wider text-[10px] shrink-0">
            Global Box Office Pulse:
          </span>
          <span className="text-slate-300 truncate">
            Inside Out 2 crosses $1.698B • Kalki 2898 AD hits ₹1,050 Cr • Stree 2 hits historic 546% ROI • Multilingual Tracking Live
          </span>
        </div>
        <div className="hidden md:flex items-center gap-3 shrink-0 text-slate-400">
          <span className="flex items-center gap-1">
            <Globe className="w-3 h-3 text-amber-400" /> Hollywood, Indian & International Trade
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <div
            onClick={() => handleNavClick('hub')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Film className="w-5 h-5 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-white font-serif">
                  CINEMETRIX
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded">
                  GLOBAL
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wider -mt-0.5">
                Worldwide Box Office Intelligence
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800/60">
            {navLinks.map((tab) => {
              const active = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleNavClick(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 relative ${
                    active
                      ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span
                      className={`ml-1 px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                        active ? 'bg-slate-950 text-amber-400' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency Selector */}
            <CurrencyToggle />

            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-medium transition-colors"
              title="Quick Search (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.2 text-[9px] font-mono text-slate-400 bg-slate-800/90 rounded border border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* Watchlist Quick Button */}
            <button
              onClick={onOpenWatchlist}
              className="relative p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors"
              title="View Bookmarked Movies"
            >
              <Bookmark className="w-4 h-4 text-slate-300 hover:text-amber-400" />
              {watchlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-[9px] font-bold text-slate-950 flex items-center justify-center">
                  {watchlist.length}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/98 px-4 pt-3 pb-5 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((tab) => {
              const active = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleNavClick(tab.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold ${
                    active
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-900/90 text-slate-200 hover:bg-slate-800 border border-slate-800/80'
                  }`}
                >
                  {tab.icon}
                  <span className="truncate">{tab.label}</span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="ml-auto text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/30 text-amber-300">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Currency:</span>
            <CurrencyToggle />
          </div>
        </div>
      )}
    </header>
  );
};
