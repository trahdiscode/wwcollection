import { Movie } from '../types/movie';
import { MOVIES_DATA } from './moviesData';
import { ADDITIONAL_MOVIES } from './additionalMovies';

export const ALL_MOVIES: Movie[] = [...MOVIES_DATA, ...ADDITIONAL_MOVIES];

export function getMovieById(id: string): Movie | undefined {
  return ALL_MOVIES.find((m) => m.id === id);
}

export function getTopMovies(limit = 10, criteria: 'worldwide' | 'indian' | 'openingDay' | 'roi' = 'worldwide'): Movie[] {
  const sorted = [...ALL_MOVIES];
  switch (criteria) {
    case 'worldwide':
      return sorted.sort((a, b) => b.worldwideGrossUSD - a.worldwideGrossUSD).slice(0, limit);
    case 'indian':
      return sorted
        .filter((m) => ['Bollywood', 'Tollywood', 'Kollywood', 'Mollywood', 'Sandalwood'].includes(m.industry))
        .sort((a, b) => b.worldwideGrossINR - a.worldwideGrossINR)
        .slice(0, limit);
    case 'openingDay':
      return sorted.sort((a, b) => b.openingDayGrossINR - a.openingDayGrossINR).slice(0, limit);
    case 'roi':
      return sorted.sort((a, b) => b.financials.roiPercentage - a.financials.roiPercentage).slice(0, limit);
    default:
      return sorted.slice(0, limit);
  }
}
