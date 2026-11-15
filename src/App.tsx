import React, { useState } from 'react';
import { CurrencyProvider } from './context/CurrencyContext';
import { WatchlistProvider, ComparisonProvider, useComparison } from './context/WatchlistContext';
import { Navbar, NavTab } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { LiveHubView } from './components/home/LiveHubView';
import { MovieExplorerView } from './components/explorer/MovieExplorerView';
import { LeaderboardsView } from './components/rankings/LeaderboardsView';
import { CompareArena } from './components/comparison/CompareArena';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { NewsView } from './components/news/NewsView';
import { MovieDetailModal } from './components/movie/MovieDetailModal';
import { SearchModal } from './components/common/SearchModal';
import { WatchlistModal } from './components/common/WatchlistModal';
import { Movie, FilmIndustry } from './types/movie';
import { Scale, ArrowRight, X } from 'lucide-react';

const MainApp: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavTab>('hub');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [watchlistModalOpen, setWatchlistModalOpen] = useState(false);
  const [initialIndustryFilter, setInitialIndustryFilter] = useState<FilmIndustry | 'All'>('All');

  const { compareList, clearCompare } = useComparison();

  const handleSelectIndustry = (industry: FilmIndustry) => {
    setInitialIndustryFilter(industry);
    setCurrentTab('explorer');
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
      {/* Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'explorer' && currentTab !== 'explorer') {
            setInitialIndustryFilter('All');
          }
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenWatchlist={() => setWatchlistModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentTab === 'hub' && (
          <LiveHubView
            onSelectMovie={(movie) => setSelectedMovie(movie)}
            onNavigateTab={(tab) => setCurrentTab(tab)}
            onFilterIndustry={handleSelectIndustry}
          />
        )}

        {currentTab === 'explorer' && (
          <MovieExplorerView
            onSelectMovie={(movie) => setSelectedMovie(movie)}
            initialIndustry={initialIndustryFilter}
          />
        )}

        {currentTab === 'rankings' && (
          <LeaderboardsView onSelectMovie={(movie) => setSelectedMovie(movie)} />
        )}

        {currentTab === 'compare' && (
          <CompareArena onSelectMovie={(movie) => setSelectedMovie(movie)} />
        )}

        {currentTab === 'analytics' && (
          <AnalyticsDashboard onSelectMovie={(movie) => setSelectedMovie(movie)} />
        )}

        {currentTab === 'news' && (
          <NewsView onSelectMovie={(movie) => setSelectedMovie(movie)} />
        )}
      </main>

      {/* Floating Bottom Comparison Drawer Bar (shown if compareList has movies and not on compare tab) */}
      {compareList.length > 0 && currentTab !== 'compare' && (
        <aside aria-label="Comparison dock" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 border border-amber-500/40 rounded-full py-2.5 px-4 sm:px-6 shadow-2xl backdrop-blur-md flex items-center gap-3 sm:gap-4 animate-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-full bg-amber-500 text-slate-950 font-bold">
              <Scale className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold text-white whitespace-nowrap">
              {compareList.length} Movie{compareList.length > 1 ? 's' : ''} in Arena
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCurrentTab('compare');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-full text-xs flex items-center gap-1 shadow-md transition-colors"
            >
              <span>Compare Now</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            <button
              onClick={clearCompare}
              className="p-1 text-slate-400 hover:text-rose-400 rounded-full"
              title="Clear Comparison list"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}

      {/* Footer */}
      <Footer onSelectTab={(tab) => setCurrentTab(tab)} />

      {/* Movie Detail Modal */}
      <MovieDetailModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        onOpenCompare={() => {
          setSelectedMovie(null);
          setCurrentTab('compare');
        }}
      />

      {/* Global Search Modal (Ctrl+K) */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectMovie={(movie) => setSelectedMovie(movie)}
      />

      {/* User Watchlist Drawer */}
      <WatchlistModal
        isOpen={watchlistModalOpen}
        onClose={() => setWatchlistModalOpen(false)}
        onSelectMovie={(movie) => setSelectedMovie(movie)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CurrencyProvider>
      <WatchlistProvider>
        <ComparisonProvider>
          <MainApp />
        </ComparisonProvider>
      </WatchlistProvider>
    </CurrencyProvider>
  );
};

export default App;
