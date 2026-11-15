import React, { useState, useMemo } from 'react';
import { MovieFilterBar, FilterState } from './MovieFilterBar';
import { MovieCard } from './MovieCard';
import { MovieTableView } from './MovieTableView';
import { ALL_MOVIES } from '../../data';
import { Movie } from '../../types/movie';
import { useCurrency } from '../../context/CurrencyContext';
import { exportMoviesToCSV, exportMoviesToJSON } from '../../utils/export';

interface MovieExplorerViewProps {
  onSelectMovie: (movie: Movie) => void;
  initialIndustry?: string;
}

export const MovieExplorerView: React.FC<MovieExplorerViewProps> = ({
  onSelectMovie,
  initialIndustry,
}) => {
  const { currency } = useCurrency();

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    industry: (initialIndustry as any) || 'All',
    language: 'All',
    genre: 'All',
    year: 'All',
    verdict: 'All',
    sortBy: 'worldwide',
    sortOrder: 'desc',
    viewMode: 'grid',
  });

  const handleReset = () => {
    setFilters({
      searchQuery: '',
      industry: 'All',
      language: 'All',
      genre: 'All',
      year: 'All',
      verdict: 'All',
      sortBy: 'worldwide',
      sortOrder: 'desc',
      viewMode: filters.viewMode,
    });
  };

  // Filter and sort computation
  const filteredAndSortedMovies = useMemo(() => {
    return ALL_MOVIES.filter((m) => {
      // Search
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = m.title.toLowerCase().includes(q);
        const matchesDirector = m.director.toLowerCase().includes(q);
        const matchesCast = m.cast.some((c) => c.toLowerCase().includes(q));
        const matchesOriginal = m.originalTitle?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDirector && !matchesCast && !matchesOriginal) return false;
      }

      // Industry
      if (filters.industry !== 'All' && m.industry !== filters.industry) return false;

      // Genre
      if (filters.genre !== 'All' && !m.genres.includes(filters.genre)) return false;

      // Year
      if (filters.year !== 'All' && m.releaseYear.toString() !== filters.year) return false;

      // Verdict
      if (filters.verdict !== 'All' && m.verdict !== filters.verdict) return false;

      return true;
    }).sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case 'worldwide':
          comparison = b.worldwideGrossUSD - a.worldwideGrossUSD;
          break;
        case 'openingDay':
          comparison = b.openingDayGrossINR - a.openingDayGrossINR;
          break;
        case 'openingWeekend':
          comparison = b.openingWeekendINR - a.openingWeekendINR;
          break;
        case 'roi':
          comparison = b.financials.roiPercentage - a.financials.roiPercentage;
          break;
        case 'budget':
          comparison = b.financials.productionBudgetUSD - a.financials.productionBudgetUSD;
          break;
        case 'releaseDate':
          comparison = new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
          break;
        case 'rating':
          comparison = b.imdbRating - a.imdbRating;
          break;
        default:
          comparison = 0;
      }

      return filters.sortOrder === 'asc' ? -comparison : comparison;
    });
  }, [filters]);

  const handleExportCSV = () => {
    exportMoviesToCSV(filteredAndSortedMovies, currency);
  };

  const handleExportJSON = () => {
    exportMoviesToJSON(filteredAndSortedMovies);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <MovieFilterBar
        filters={filters}
        onChangeFilters={setFilters}
        onReset={handleReset}
        onExportCSV={handleExportCSV}
        onExportJSON={handleExportJSON}
        totalCount={filteredAndSortedMovies.length}
      />

      {filteredAndSortedMovies.length === 0 ? (
        <div className="bg-[#0c0d12] border border-[#1d2028] rounded-2xl p-12 sm:p-16 md:p-20 text-center text-[#8a92a1]">
          <p className="text-base sm:text-lg font-semibold text-[#f4f5f8]">
            No box-office records match the active criteria
          </p>
          <p className="text-xs sm:text-sm text-[#717886] mt-1.5 max-w-md mx-auto">
            Try resetting your search filters or clearing the genre/industry selection.
          </p>
          <button
            onClick={handleReset}
            className="mt-5 px-4 py-2 bg-[#d99b26] hover:bg-[#e6a833] text-black font-bold rounded-lg text-xs transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : filters.viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
          {filteredAndSortedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onSelectMovie={onSelectMovie} />
          ))}
        </div>
      ) : (
        <MovieTableView movies={filteredAndSortedMovies} onSelectMovie={onSelectMovie} />
      )}
    </div>
  );
};
