export type FilmIndustry =
  | 'Hollywood'
  | 'Bollywood'
  | 'Tollywood'
  | 'Kollywood'
  | 'Mollywood'
  | 'Sandalwood'
  | 'Korean'
  | 'International';

export type BoxOfficeVerdict =
  | 'All-Time Blockbuster'
  | 'Blockbuster'
  | 'Super Hit'
  | 'Hit'
  | 'Semi-Hit'
  | 'Average'
  | 'Flop'
  | 'Disaster';

export type TheatricalStatus =
  | 'Active in Theatres'
  | 'Extended Run'
  | 'Re-Release'
  | 'Concluded'
  | 'Upcoming';

export type CurrencyMode = 'USD' | 'INR' | 'EUR';

export interface TerritoryShare {
  territory: string;
  grossUSD: number; // in Millions USD
  grossINR: number; // in Crores INR
  percentage: number;
}

export interface DayWiseRecord {
  day: number;
  date: string;
  dayName: string;
  dailyGrossUSD: number; // Millions USD
  dailyGrossINR: number; // Crores INR
  cumulativeUSD: number;
  cumulativeINR: number;
  isWeekend?: boolean;
  notes?: string;
}

export interface MovieFinancials {
  productionBudgetUSD: number; // Millions USD
  productionBudgetINR: number; // Crores INR
  marketingBudgetUSD?: number;
  marketingBudgetINR?: number;
  theatricalShareUSD: number;
  theatricalShareINR: number;
  roiPercentage: number;
  breakevenTargetUSD: number;
  breakevenTargetINR: number;
}

export interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  industry: FilmIndustry;
  language: string;
  releaseDate: string; // YYYY-MM-DD
  releaseYear: number;
  genres: string[];
  director: string;
  cast: string[];
  producers: string[];
  runtimeMinutes: number;
  certification: string;
  posterUrl: string;
  backdropUrl: string;
  synopsis: string;
  status: TheatricalStatus;
  verdict: BoxOfficeVerdict;
  
  // Key Box Office Figures (USD in Millions, INR in Crores)
  worldwideGrossUSD: number;
  worldwideGrossINR: number;
  domesticGrossUSD: number;
  domesticGrossINR: number;
  overseasGrossUSD: number;
  overseasGrossINR: number;
  
  openingDayGrossUSD: number;
  openingDayGrossINR: number;
  openingWeekendUSD: number;
  openingWeekendINR: number;
  
  multiplier: number; // Lifetime / Opening Weekend
  screensCount: {
    domestic: number;
    overseas: number;
    worldwideTotal: number;
  };

  financials: MovieFinancials;
  territoryBreakdown: TerritoryShare[];
  dayWiseTrajectory: DayWiseRecord[];
  milestones: string[];
  imdbRating: number;
  rankings?: {
    worldwideAllTime?: number;
    indianAllTime?: number;
    industryAllTime?: number;
    yearRank?: number;
  };
}

export interface MovieFilterState {
  searchQuery: string;
  selectedIndustry: FilmIndustry | 'All';
  selectedLanguage: string | 'All';
  selectedGenre: string | 'All';
  selectedYear: string | 'All';
  selectedStatus: TheatricalStatus | 'All';
  selectedVerdict: BoxOfficeVerdict | 'All';
  sortBy: 'worldwideGross' | 'openingDay' | 'openingWeekend' | 'roi' | 'releaseDate' | 'rating' | 'budget';
  sortOrder: 'asc' | 'desc';
  minGross?: number;
}
