import React from 'react';
import { HeroSpotlight } from './HeroSpotlight';
import { MarketTicker } from './MarketTicker';
import { TopGrossersPreview } from './TopGrossersPreview';
import { IndustryPulse } from './IndustryPulse';
import { ALL_MOVIES } from '../../data';
import { Movie, FilmIndustry } from '../../types/movie';
import { NavTab } from '../common/Navbar';

interface LiveHubViewProps {
  onSelectMovie: (movie: Movie) => void;
  onNavigateTab: (tab: NavTab) => void;
  onFilterIndustry: (industry: FilmIndustry) => void;
}

export const LiveHubView: React.FC<LiveHubViewProps> = ({
  onSelectMovie,
  onNavigateTab,
  onFilterIndustry,
}) => {
  return (
    <div className="space-y-10">
      {/* 1. Hero Spotlight Carousel */}
      <HeroSpotlight
        movies={ALL_MOVIES}
        onSelectMovie={onSelectMovie}
        onExploreClick={() => onNavigateTab('explorer')}
      />

      {/* 2. Global Marquee KPIs */}
      <MarketTicker onSelectMovie={onSelectMovie} />

      {/* 3. Top Grossers Leaderboard Preview */}
      <TopGrossersPreview
        movies={ALL_MOVIES}
        onSelectMovie={onSelectMovie}
        onViewAllRankings={() => onNavigateTab('rankings')}
      />

      {/* 4. Multi-industry Pulse (Hollywood, Indian Cinema, Korean, International) */}
      <IndustryPulse
        movies={ALL_MOVIES}
        onSelectIndustry={(ind) => {
          onFilterIndustry(ind);
          onNavigateTab('explorer');
        }}
        onSelectMovie={onSelectMovie}
      />
    </div>
  );
};
