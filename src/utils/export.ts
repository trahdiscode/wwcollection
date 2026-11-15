import { Movie, CurrencyMode } from '../types/movie';
import { formatCurrencyValue } from './currency';

export function exportMoviesToCSV(movies: Movie[], currency: CurrencyMode) {
  const headers = [
    'Rank',
    'Title',
    'Industry',
    'Language',
    'Release Date',
    'Worldwide Gross (USD M)',
    'Worldwide Gross (INR Cr)',
    'Domestic Gross',
    'Overseas Gross',
    'Opening Day',
    'Opening Weekend',
    'Budget',
    'ROI %',
    'Verdict',
  ];

  const rows = movies.map((m, idx) => [
    idx + 1,
    `"${m.title.replace(/"/g, '""')}"`,
    m.industry,
    m.language,
    m.releaseDate,
    m.worldwideGrossUSD,
    m.worldwideGrossINR,
    currency === 'INR' ? `₹${m.domesticGrossINR} Cr` : `$${m.domesticGrossUSD} M`,
    currency === 'INR' ? `₹${m.overseasGrossINR} Cr` : `$${m.overseasGrossUSD} M`,
    currency === 'INR' ? `₹${m.openingDayGrossINR} Cr` : `$${m.openingDayGrossUSD} M`,
    currency === 'INR' ? `₹${m.openingWeekendINR} Cr` : `$${m.openingWeekendUSD} M`,
    currency === 'INR' ? `₹${m.financials.productionBudgetINR} Cr` : `$${m.financials.productionBudgetUSD} M`,
    `${m.financials.roiPercentage}%`,
    `"${m.verdict}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `cinemetrix_box_office_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportMoviesToJSON(movies: Movie[]) {
  const jsonContent = JSON.stringify(movies, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `cinemetrix_box_office_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
