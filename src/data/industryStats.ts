export interface IndustryMarketShare {
  industry: string;
  sharePercent: number;
  totalGrossUSD: number; // in Billions USD
  totalGrossINR: number; // in Crores INR
  topGrosser: string;
  growthYoY: number; // %
  color: string;
}

export const INDUSTRY_MARKET_SHARE: IndustryMarketShare[] = [
  {
    industry: 'Hollywood',
    sharePercent: 44.8,
    totalGrossUSD: 14.5,
    totalGrossINR: 125400,
    topGrosser: 'Inside Out 2 ($1.698B)',
    growthYoY: +14.2,
    color: '#3b82f6', // blue
  },
  {
    industry: 'Bollywood (Hindi)',
    sharePercent: 18.5,
    totalGrossUSD: 6.0,
    totalGrossINR: 51900,
    topGrosser: 'Stree 2 (₹874.5 Cr)',
    growthYoY: +22.8,
    color: '#eab308', // amber
  },
  {
    industry: 'Tollywood (Telugu)',
    sharePercent: 12.2,
    totalGrossUSD: 3.95,
    totalGrossINR: 34150,
    topGrosser: 'Kalki 2898 AD (₹1,050 Cr)',
    growthYoY: +28.5,
    color: '#ef4444', // red
  },
  {
    industry: 'Kollywood (Tamil)',
    sharePercent: 7.8,
    totalGrossUSD: 2.52,
    totalGrossINR: 21800,
    topGrosser: 'The GOAT / Leo (₹620 Cr)',
    growthYoY: +8.4,
    color: '#a855f7', // purple
  },
  {
    industry: 'Korean Cinema (Hallyu)',
    sharePercent: 5.6,
    totalGrossUSD: 1.81,
    totalGrossINR: 15650,
    topGrosser: 'Exhuma / The Roundup 4',
    growthYoY: +16.0,
    color: '#10b981', // emerald
  },
  {
    industry: 'Mollywood (Malayalam)',
    sharePercent: 4.2,
    totalGrossUSD: 1.36,
    totalGrossINR: 11750,
    topGrosser: 'Manjummel Boys (₹242 Cr)',
    growthYoY: +185.0, // phenomenal spike in 2024
    color: '#06b6d4', // cyan
  },
  {
    industry: 'Sandalwood (Kannada)',
    sharePercent: 3.4,
    totalGrossUSD: 1.1,
    totalGrossINR: 9515,
    topGrosser: 'K.G.F 2 / Kantara',
    growthYoY: +5.2,
    color: '#f97316', // orange
  },
  {
    industry: 'Other International',
    sharePercent: 3.5,
    totalGrossUSD: 1.13,
    totalGrossINR: 9800,
    topGrosser: 'Demon Slayer / Chinese War Epics',
    growthYoY: +9.1,
    color: '#ec4899', // pink
  },
];

export interface YearlyBoxOfficeTrend {
  year: number;
  globalGrossUSD: number; // in Billions
  indianGrossINR: number; // in Crores
  totalAdmissionsBillions: number;
  recoveryIndex: number; // base 100 for 2019
}

export const YEARLY_TRENDS: YearlyBoxOfficeTrend[] = [
  { year: 2019, globalGrossUSD: 42.5, indianGrossINR: 10948, totalAdmissionsBillions: 9.8, recoveryIndex: 100 },
  { year: 2020, globalGrossUSD: 11.8, indianGrossINR: 2850, totalAdmissionsBillions: 2.4, recoveryIndex: 28 },
  { year: 2021, globalGrossUSD: 21.3, indianGrossINR: 5200, totalAdmissionsBillions: 4.5, recoveryIndex: 50 },
  { year: 2022, globalGrossUSD: 25.9, indianGrossINR: 10637, totalAdmissionsBillions: 6.8, recoveryIndex: 78 },
  { year: 2023, globalGrossUSD: 33.9, indianGrossINR: 12226, totalAdmissionsBillions: 8.4, recoveryIndex: 92 },
  { year: 2024, globalGrossUSD: 35.8, indianGrossINR: 13150, totalAdmissionsBillions: 9.1, recoveryIndex: 97 },
];
