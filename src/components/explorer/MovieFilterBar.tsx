import React from 'react';
import {
  Film,
  Search,
  ArrowUpDown,
  RotateCcw,
  LayoutGrid,
  Table as TableIcon,
  Download,
} from 'lucide-react';
import { FilmIndustry, BoxOfficeVerdict } from '../../types/movie';

export interface FilterState {
  searchQuery: string;
  industry: FilmIndustry | 'All';
  language: string;
  genre: string;
  year: string;
  verdict: BoxOfficeVerdict | 'All';
  sortBy: 'worldwide' | 'openingDay' | 'openingWeekend' | 'roi' | 'releaseDate' | 'budget' | 'rating';
  sortOrder: 'desc' | 'asc';
  viewMode: 'grid' | 'table';
}

interface MovieFilterBarProps {
  filters: FilterState;
  onChangeFilters: (filters: FilterState) => void;
  onReset: () => void;
  onExportCSV: () => void;
  onExportJSON: () => void;
  totalCount: number;
}

export const MovieFilterBar: React.FC<MovieFilterBarProps> = ({
  filters,
  onChangeFilters,
  onReset,
  onExportCSV,
  onExportJSON,
  totalCount,
}) => {
  const industries: (FilmIndustry | 'All')[] = [
    'All',
    'Hollywood',
    'Bollywood',
    'Tollywood',
    'Kollywood',
    'Mollywood',
    'Sandalwood',
    'Korean',
    'International',
  ];

  const genres = [
    'All',
    'Action',
    'Sci-Fi',
    'Drama',
    'Thriller',
    'Comedy',
    'Horror',
    'Animation',
    'Adventure',
    'Fantasy',
    'Mythology',
  ];

  const years = ['All', '2024', '2023', '2022', '2020', '2019', '2017', '2016', '2009', '1997'];

  const verdicts: (BoxOfficeVerdict | 'All')[] = [
    'All',
    'All-Time Blockbuster',
    'Blockbuster',
    'Super Hit',
    'Hit',
    'Average',
    'Flop',
  ];

  const sortOptions = [
    { value: 'worldwide', label: 'Worldwide Gross' },
    { value: 'openingDay', label: 'Opening Day' },
    { value: 'openingWeekend', label: 'Opening Weekend' },
    { value: 'roi', label: 'ROI Multiplier' },
    { value: 'budget', label: 'Budget' },
    { value: 'releaseDate', label: 'Release Date' },
    { value: 'rating', label: 'IMDb Rating' },
  ];

  return (
    <div className="bg-[#101217] border border-[#1c1f28] rounded-2xl p-5 sm:p-6 shadow-sm space-y-4 sm:space-y-5">
      {/* View Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1c1f28]">
        <div>
          <div className="flex items-center gap-2.5">
            <Film className="w-4 h-4 text-[#d99b26]" />
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Global Box Office Explorer
            </h2>
          </div>
          <p className="text-xs text-[#717886] mt-1">
            Filter, sort, and inspect verified theatrical collections, multipliers, and territory splits.
          </p>
        </div>
      </div>

      {/* Search and Action Tools Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#646b7a] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onChangeFilters({ ...filters, searchQuery: e.target.value })}
            placeholder="Search by title, director, or cast..."
            className="w-full bg-[#090a0d] border border-[#1d2028] hover:border-[#2d323f] focus:border-[#d99b26]/70 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-[#5d6370] focus:outline-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 justify-end shrink-0">
          {/* Grid vs Table */}
          <div className="flex items-center bg-[#090a0d] p-1 rounded-xl border border-[#1d2028]">
            <button
              onClick={() => onChangeFilters({ ...filters, viewMode: 'grid' })}
              className={`p-2 rounded-lg transition-colors ${
                filters.viewMode === 'grid'
                  ? 'bg-[#1e222c] text-white shadow-sm'
                  : 'text-[#646b7a] hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onChangeFilters({ ...filters, viewMode: 'table' })}
              className={`p-2 rounded-lg transition-colors ${
                filters.viewMode === 'table'
                  ? 'bg-[#1e222c] text-white shadow-sm'
                  : 'text-[#646b7a] hover:text-white'
              }`}
              title="Table View"
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Export Buttons */}
          <button
            onClick={onExportCSV}
            className="px-3.5 py-2 bg-[#090a0d] hover:bg-[#15171e] text-[#a4acb9] hover:text-white border border-[#1d2028] hover:border-[#2a2f3d] rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
            title="Download CSV"
          >
            <Download className="w-3.5 h-3.5 text-[#d99b26]" />
            <span>CSV</span>
          </button>

          <button
            onClick={onExportJSON}
            className="px-3.5 py-2 bg-[#090a0d] hover:bg-[#15171e] text-[#a4acb9] hover:text-white border border-[#1d2028] hover:border-[#2a2f3d] rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
            title="Download JSON"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span>JSON</span>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 pt-4 sm:pt-5 border-t border-[#1c1f28]">
        <div>
          <label className="text-[11px] font-medium text-[#717886] uppercase tracking-wider block mb-1.5">
            Industry
          </label>
          <select
            value={filters.industry}
            onChange={(e) => onChangeFilters({ ...filters, industry: e.target.value as any })}
            className="w-full bg-[#090a0d] border border-[#1d2028] hover:border-[#2d323f] focus:border-[#d99b26]/70 rounded-xl px-3 py-2 text-xs text-[#c8d0de] focus:outline-none transition-colors cursor-pointer"
          >
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind === 'All' ? 'All Industries' : ind}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[11px] font-medium text-[#717886] uppercase tracking-wider block mb-1.5">
            Genre
          </label>
          <select
            value={filters.genre}
            onChange={(e) => onChangeFilters({ ...filters, genre: e.target.value })}
            className="w-full bg-[#090a0d] border border-[#1d2028] hover:border-[#2d323f] focus:border-[#d99b26]/70 rounded-xl px-3 py-2 text-xs text-[#c8d0de] focus:outline-none transition-colors cursor-pointer"
          >
            {genres.map((g) => (
              <option key={g} value={g}>
                {g === 'All' ? 'All Genres' : g}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[11px] font-medium text-[#717886] uppercase tracking-wider block mb-1.5">
            Year
          </label>
          <select
            value={filters.year}
            onChange={(e) => onChangeFilters({ ...filters, year: e.target.value })}
            className="w-full bg-[#090a0d] border border-[#1d2028] hover:border-[#2d323f] focus:border-[#d99b26]/70 rounded-xl px-3 py-2 text-xs text-[#c8d0de] focus:outline-none transition-colors cursor-pointer"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y === 'All' ? 'All Years' : y}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[11px] font-medium text-[#717886] uppercase tracking-wider block mb-1.5">
            Verdict
          </label>
          <select
            value={filters.verdict}
            onChange={(e) => onChangeFilters({ ...filters, verdict: e.target.value as any })}
            className="w-full bg-[#090a0d] border border-[#1d2028] hover:border-[#2d323f] focus:border-[#d99b26]/70 rounded-xl px-3 py-2 text-xs text-[#c8d0de] focus:outline-none transition-colors cursor-pointer"
          >
            {verdicts.map((v) => (
              <option key={v} value={v}>
                {v === 'All' ? 'All Verdicts' : v}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[11px] font-medium text-[#717886] uppercase tracking-wider block mb-1.5">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => onChangeFilters({ ...filters, sortBy: e.target.value as any })}
            className="w-full bg-[#090a0d] border border-[#1d2028] hover:border-[#2d323f] focus:border-[#d99b26]/70 rounded-xl px-3 py-2 text-xs text-[#c8d0de] focus:outline-none transition-colors cursor-pointer"
          >
            {sortOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[11px] font-medium text-[#717886] uppercase tracking-wider block mb-1.5">
            Direction & Reset
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                onChangeFilters({
                  ...filters,
                  sortOrder: filters.sortOrder === 'desc' ? 'asc' : 'desc',
                })
              }
              className="flex-1 bg-[#090a0d] hover:bg-[#15171e] border border-[#1d2028] hover:border-[#2d323f] rounded-xl py-2 px-2.5 text-xs font-medium text-[#c8d0de] flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-[#d99b26]" />
              <span>{filters.sortOrder === 'desc' ? 'High → Low' : 'Low → High'}</span>
            </button>

            <button
              onClick={onReset}
              className="p-2 bg-[#090a0d] hover:bg-[#15171e] border border-[#1d2028] hover:border-[#2d323f] rounded-xl text-[#717886] hover:text-white transition-colors"
              title="Reset Filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Count summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#717886] pt-3 sm:pt-4 border-t border-[#181a21] gap-2">
        <span>
          Showing <strong className="text-white tabular-nums font-mono font-semibold">{totalCount}</strong> verified records
          {filters.industry !== 'All' && <span> in <span className="text-white font-medium">{filters.industry}</span></span>}
        </span>
        <span className="text-[#646b7a]">Click any title to inspect circuit breakdowns & trajectory</span>
      </div>
    </div>
  );
};
