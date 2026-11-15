import { FilmIndustry } from './movie';

export type NewsCategory = 'Milestone' | 'Weekend Report' | 'Release Update' | 'Industry Record' | 'Trade Analysis';

export interface BoxOfficeNews {
  id: string;
  title: string;
  summary: string;
  category: NewsCategory;
  industry: FilmIndustry | 'Global';
  date: string;
  readTime: string;
  source: string;
  relatedMovieId?: string;
  highlightStat?: string;
  featured?: boolean;
  content?: string[];
}

export interface UpcomingMovieRelease {
  id: string;
  title: string;
  industry: FilmIndustry;
  language: string;
  releaseDate: string; // YYYY-MM-DD
  director: string;
  cast: string[];
  genre: string[];
  estimatedBudgetUSD: number;
  estimatedBudgetINR: number;
  buzzScore: number; // 1-100
  targetScreens: number;
  posterUrl: string;
  advanceBookingStatus: 'Not Started' | 'Opens This Week' | 'Open' | 'Record Pace';
  expectedOpeningUSD: number;
  expectedOpeningINR: number;
}
