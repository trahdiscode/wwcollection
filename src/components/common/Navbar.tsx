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
  Globe,
} from 'lucide-react';
import { CurrencyToggle } from './CurrencyToggle';
import { useWatchlist, useComparison } from '../../context/WatchlistContext';

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

  const navLinks: {
    id: NavTab;
    label: string;
    icon: React.ReactNode;
    badge?: number;
  }[] = [
    { id: 'hub', label: 'Overview', icon: <TrendingUp className="w-3.5 h-3.5" /> },
    { id: 'explorer', label: 'Database', icon: <Film className="w-3.5 h-3.5" /> },
    { id: 'rankings', label: 'Rankings', icon: <Award className="w-3.5 h-3.5" /> },
    {
      id: 'compare',
      label: 'Compare',
      icon: <Scale className="w-3.5 h-3.5" />,
      badge: compareList.length,
    },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-3.5 h-3.5" /> },
    { id: 'news', label: 'Updates', icon: <Newspaper className="w-3.5 h-3.5" /> },
  ];

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0b0f]/95 backdrop-blur-md border-b border-[#181a24] transition-colors">
      {/* Editorial Market Pulse Ticker */}
      <div className="bg-[#0b0c11] border-b border-[#161822]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 sm:h-9 flex items-center justify-between gap-4 text-[11px] sm:text-xs">
          {/* Live Market Pulse Marquee Segment */}
          <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap min-w-0">
            <div className="flex items-center gap-2 shrink-0 pr-3 border-r border-[#1e222e]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-emerald-400 font-mono">
                Market Pulse
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 overflow-hidden truncate text-[#7e8697]">
              <span className="inline-flex items-center gap-1.5 shrink-0">
                <span className="text-[#c4cad4] font-medium">Inside Out 2</span>
                <span className="text-emerald-400 font-mono font-semibold tabular-nums">$1.698B</span>
              </span>
              <span className="text-[#2c3240] select-none">•</span>
              <span className="inline-flex items-center gap-1.5 shrink-0">
                <span className="text-[#c4cad4] font-medium">Kalki 2898 AD</span>
                <span className="text-amber-400 font-mono font-semibold tabular-nums">₹1,050 Cr</span>
              </span>
              <span className="text-[#2c3240] select-none">•</span>
              <span className="inline-flex items-center gap-1.5 shrink-0">
                <span className="text-[#c4cad4] font-medium">Stree 2</span>
                <span className="text-emerald-400 font-mono font-semibold tabular-nums">546% ROI</span>
              </span>
              <span className="text-[#2c3240] select-none hidden md:inline">•</span>
              <span className="hidden md:inline-flex items-center gap-1.5 shrink-0">
                <span className="text-[#c4cad4] font-medium">Manjummel Boys</span>
                <span className="text-amber-400 font-mono font-semibold tabular-nums">₹242 Cr</span>
                <span className="text-[10px] text-[#5e6677] font-normal">(Mollywood record)</span>
              </span>
            </div>
          </div>

          {/* Right Status Badges */}
          <div className="hidden lg:flex items-center gap-4 shrink-0 text-[#646d7e] text-[11px] font-medium tracking-tight pl-3 border-l border-[#1e222e]">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70"></span>
              <span className="text-[#8891a2]">Verified Box Office</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d99b26]/80"></span>
              <span>Dual Engine (USD · INR)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[72px] gap-3 sm:gap-4 lg:gap-4 xl:gap-6">
          {/* Left: Brand Logo & Title */}
          <div
            onClick={() => handleNavClick('hub')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNavClick('hub');
              }
            }}
            role="button"
            tabIndex={0}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0 select-none py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 rounded-xl"
            aria-label="CineMetrix Global Home"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-[#1c202d] to-[#10121a] border border-[#272d3e] flex items-center justify-center text-[#d99b26] shadow-inner group-hover:border-[#d99b26]/60 group-hover:shadow-[0_0_18px_rgba(217,155,38,0.2)] transition-all duration-200">
              <Film className="w-4 h-4 transition-transform duration-200 group-hover:scale-105" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[15px] font-extrabold tracking-tight text-white font-sans group-hover:text-[#f4f5f8] transition-colors">
                CINEMETRIX
              </span>
              <span className="text-[9px] font-bold text-[#d99b26] tracking-widest uppercase bg-[#d99b26]/10 px-1.5 py-0.5 rounded border border-[#d99b26]/25 font-mono leading-none">
                GLOBAL
              </span>
            </div>
          </div>

          {/* Center: Desktop Navigation Tabs */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center shrink-0 gap-1 xl:gap-1.5 bg-[#0d0f14]/85 backdrop-blur-sm p-1 rounded-2xl border border-[#1b1e28] shadow-inner"
          >
            {navLinks.map((tab) => {
              const active = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleNavClick(tab.id)}
                  className={`group relative flex items-center gap-1.5 px-2.5 py-1.5 xl:px-3.5 xl:py-2 rounded-xl text-xs font-medium transition-all duration-150 whitespace-nowrap select-none cursor-pointer ${
                    active
                      ? 'bg-[#1e2330] text-white shadow-xs font-semibold border border-[#2f3649]/80'
                      : 'text-[#828a9c] hover:text-[#f0f2f7] hover:bg-[#151720] border border-transparent'
                  }`}
                >
                  <span
                    className={`transition-colors duration-150 ${
                      active ? 'text-[#d99b26]' : 'text-[#646b7c] group-hover:text-[#a0a7b7]'
                    }`}
                  >
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span
                      className={`ml-0.5 px-1.5 py-0.5 min-w-[17px] text-[10px] rounded-full font-mono font-bold tabular-nums text-center leading-none transition-colors ${
                        active
                          ? 'bg-[#d99b26] text-black shadow-xs'
                          : 'bg-[#1b1f2b] text-[#d99b26] border border-[#2b3144]'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Utility Cluster (Currency, Search, Watchlist, Mobile Menu) */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Currency Selector */}
            <CurrencyToggle />

            {/* Subtle hairline separator between currency engine and user actions */}
            <div className="hidden sm:block h-5 w-[1px] bg-[#1a1d27] mx-0.5" />

            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 h-9 sm:h-[38px] px-2.5 sm:px-3 rounded-xl bg-[#0f1116] hover:bg-[#161821] border border-[#1e222d] hover:border-[#2d3345] text-[#858d9e] hover:text-white text-xs font-medium transition-all duration-150 shadow-xs cursor-pointer group"
              title="Quick Search (Ctrl+K)"
              aria-label="Search database (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-[#8890a2] group-hover:text-[#d99b26] transition-colors" />
              <span className="hidden sm:inline font-medium text-xs">Search</span>
              <kbd className="hidden 2xl:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-[#626978] bg-[#161822] rounded-md border border-[#242835] group-hover:text-[#9ea6b8] group-hover:border-[#33394b] transition-colors">
                ⌘K
              </kbd>
            </button>

            {/* Watchlist Quick Button */}
            <button
              onClick={onOpenWatchlist}
              className="relative h-9 sm:h-[38px] w-9 sm:w-[38px] flex items-center justify-center rounded-xl bg-[#0f1116] hover:bg-[#161821] border border-[#1e222d] hover:border-[#2d3345] text-[#858d9e] hover:text-white transition-all duration-150 shadow-xs cursor-pointer group"
              title="View Bookmarked Movies"
              aria-label={`Watchlist (${watchlist.length} saved)`}
            >
              <Bookmark className="w-4 h-4 text-[#8890a2] group-hover:text-[#d99b26] transition-colors" />
              {watchlist.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#d99b26] text-[10px] font-extrabold text-black flex items-center justify-center font-mono leading-none shadow-sm ring-2 ring-[#0a0b0f]">
                  {watchlist.length}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-9 sm:h-[38px] w-9 sm:w-[38px] flex items-center justify-center rounded-xl bg-[#0f1116] hover:bg-[#161821] border border-[#1e222d] hover:border-[#2d3345] text-[#858d9e] hover:text-white transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-[#d99b26]" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#1a1d27] bg-[#0a0c10]/98 backdrop-blur-xl px-4 sm:px-6 pt-4 pb-6 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#181a24] text-xs">
            <span className="font-semibold text-[#8b93a4] uppercase tracking-wider text-[11px] font-mono">
              Platform Navigation
            </span>
            <span className="text-[11px] text-[#5e6677]">CineMetrix Global</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {navLinks.map((tab) => {
              const active = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleNavClick(tab.id)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    active
                      ? 'bg-[#1e2330] text-white font-semibold border border-[#2f3649] shadow-xs'
                      : 'bg-[#101217] text-[#858d9d] hover:bg-[#151820] hover:text-white border border-[#191c25]'
                  }`}
                >
                  <span className={active ? 'text-[#d99b26]' : 'text-[#656d7e]'}>{tab.icon}</span>
                  <span className="truncate">{tab.label}</span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-[#d99b26] text-black font-mono font-bold">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#181a24] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#7d8594]">
              <Globe className="w-3.5 h-3.5 text-[#5e6677]" />
              <span>Dual-Currency Valuation Engine</span>
            </div>
            <CurrencyToggle showLabels={true} />
          </div>
        </div>
      )}
    </header>
  );
};
