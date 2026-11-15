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
    <div className="min-h-screen bg-[#090a0d] text-slate-100 flex flex-col font-sans antialiased selection:bg-amber-400 selection:text-slate-950">
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-6 sm:pt-8 md:pt-10 pb-16 sm:pb-20">
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
        <aside aria-label="Comparison dock" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#111317]/95 border border-[#272b38] rounded-xl py-2 px-3 sm:px-4 shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#1c202c] text-amber-400">
              <Scale className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-mono font-medium text-slate-200 whitespace-nowrap">
              {compareList.length} in Arena
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCurrentTab('compare');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono rounded text-xs flex items-center gap-1 transition-colors"
            >
              <span>Compare</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            <button
              onClick={clearCompare}
              className="p-1 text-slate-500 hover:text-slate-300 rounded"
              title="Clear Comparison list"
            >
              <X className="w-3.5 h-3.5" />
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
