import React from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  RotateCcw,
  LayoutGrid,
  Table as TableIcon,
  Download,
  SlidersHorizontal,
} from 'lucide-react';
import { FilmIndustry, BoxOfficeVerdict, TheatricalStatus } from '../../types/movie';

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
    { value: 'budget', label: 'Production Budget' },
    { value: 'releaseDate', label: 'Release Date' },
    { value: 'rating', label: 'IMDb Rating' },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl space-y-4">
      {/* Top Search & View Mode row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onChangeFilters({ ...filters, searchQuery: e.target.value })}
            placeholder="Search by title, director, or cast..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500/60 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
          />
        </div>

        {/* View Mode & Export Tools */}
        <div className="flex items-center gap-2 justify-end">
          {/* Grid vs Table Toggle */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => onChangeFilters({ ...filters, viewMode: 'grid' })}
              className={`p-2 rounded-lg transition-colors ${
                filters.viewMode === 'grid'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Grid Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onChangeFilters({ ...filters, viewMode: 'table' })}
              className={`p-2 rounded-lg transition-colors ${
                filters.viewMode === 'table'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Statistical Table View"
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Export Dropdown / Buttons */}
          <button
            onClick={onExportCSV}
            className="px-3 py-2 bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Download Box Office Data as CSV spreadsheet"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">CSV</span>
          </button>

          <button
            onClick={onExportJSON}
            className="px-3 py-2 bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Download JSON"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">JSON</span>
          </button>
        </div>
      </div>

      {/* Filter Selectors Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2 border-t border-slate-800/80">
        {/* Industry */}
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Industry
          </label>
          <select
            value={filters.industry}
            onChange={(e) => onChangeFilters({ ...filters, industry: e.target.value as any })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500/60"
          >
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind === 'All' ? 'All Industries' : ind}
              </option>
            ))}
          </select>
        </div>

        {/* Genre */}
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Genre
          </label>
          <select
            value={filters.genre}
            onChange={(e) => onChangeFilters({ ...filters, genre: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500/60"
          >
            {genres.map((g) => (
              <option key={g} value={g}>
                {g === 'All' ? 'All Genres' : g}
              </option>
            ))}
          </select>
        </div>

        {/* Release Year */}
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Year
          </label>
          <select
            value={filters.year}
            onChange={(e) => onChangeFilters({ ...filters, year: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500/60"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y === 'All' ? 'All Years' : y}
              </option>
            ))}
          </select>
        </div>

        {/* Verdict */}
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Verdict
          </label>
          <select
            value={filters.verdict}
            onChange={(e) => onChangeFilters({ ...filters, verdict: e.target.value as any })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500/60"
          >
            {verdicts.map((v) => (
              <option key={v} value={v}>
                {v === 'All' ? 'All Verdicts' : v}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Field */}
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Sort Metric
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => onChangeFilters({ ...filters, sortBy: e.target.value as any })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500/60"
          >
            {sortOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Order & Reset */}
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Order & Reset
          </label>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() =>
                onChangeFilters({
                  ...filters,
                  sortOrder: filters.sortOrder === 'desc' ? 'asc' : 'desc',
                })
              }
              className="flex-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl py-2 px-2 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1 transition-colors"
              title="Toggle Ascending / Descending"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
              <span>{filters.sortOrder === 'desc' ? 'High → Low' : 'Low → High'}</span>
            </button>

            <button
              onClick={onReset}
              className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
              title="Reset All Filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Summary Count Bar */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
        <div>
          Showing <span className="font-bold text-amber-400">{totalCount}</span> verified box-office
          records
          {filters.industry !== 'All' && (
            <span className="ml-1 text-slate-300">
              in <strong>{filters.industry}</strong>
            </span>
          )}
          {filters.genre !== 'All' && (
            <span className="ml-1 text-slate-300">
              ({filters.genre})
            </span>
          )}
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400">
          <span>Click any movie to inspect day-wise trajectory & territory share</span>
        </div>
      </div>
    </div>
  );
};
