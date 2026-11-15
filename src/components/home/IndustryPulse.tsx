import React from 'react';
import { Globe, ArrowRight, TrendingUp } from 'lucide-react';
import { FilmIndustry, Movie } from '../../types/movie';
import { INDUSTRY_MARKET_SHARE } from '../../data/industryStats';
import { useCurrency } from '../../context/CurrencyContext';

interface IndustryPulseProps {
  movies: Movie[];
  onSelectIndustry: (industry: FilmIndustry) => void;
  onSelectMovie: (movie: Movie) => void;
}

export const IndustryPulse: React.FC<IndustryPulseProps> = ({
  movies,
  onSelectIndustry,
  onSelectMovie,
}) => {
  const { format } = useCurrency();

  const industries: {
    id: FilmIndustry;
    title: string;
    description: string;
    topMovieId: string;
    flag: string;
  }[] = [
    {
      id: 'Hollywood',
      title: 'Hollywood',
      description: 'Global reach, IMAX spectacles, and high-concept studio tentpoles.',
      topMovieId: 'avatar',
      flag: '🇺🇸',
    },
    {
      id: 'Bollywood',
      title: 'Bollywood (Hindi)',
      description: 'North India heartland, mass action spectacles, and global diaspora power.',
      topMovieId: 'dangal',
      flag: '🇮🇳',
    },
    {
      id: 'Tollywood',
      title: 'Tollywood (Telugu)',
      description: 'Pioneers of Pan-India spectacle cinema: Rajamouli epics and visionary mythologies.',
      topMovieId: 'baahubali-2',
      flag: '🇮🇳',
    },
    {
      id: 'Kollywood',
      title: 'Kollywood (Tamil)',
      description: 'Superstar power, cinematic auteurism, and explosive worldwide markets.',
      topMovieId: 'jailer',
      flag: '🇮🇳',
    },
    {
      id: 'Mollywood',
      title: 'Mollywood (Malayalam)',
      description: '2024 breakout cinema: phenomenal storytelling, low budgets, and record multipliers.',
      topMovieId: 'manjummel-boys',
      flag: '🇮🇳',
    },
    {
      id: 'Sandalwood',
      title: 'Sandalwood (Kannada)',
      description: 'Rooted folklore, visual grit, and extraordinary return-on-investment multipliers.',
      topMovieId: 'kgf-chapter-2',
      flag: '🇮🇳',
    },
    {
      id: 'Korean',
      title: 'Korean Cinema (Hallyu)',
      description: 'Oscar-winning masterclasses, gripping occult thrillers, and explosive crime franchises.',
      topMovieId: 'parasite',
      flag: '🇰🇷',
    },
    {
      id: 'International',
      title: 'International Cinema',
      description: 'Record-shattering Japanese anime features, Chinese epics, and European champions.',
      topMovieId: 'demon-slayer-mugen-train',
      flag: '🇯🇵',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-bold text-white font-serif">
            Multilingual Film Industries at a Glance
          </h3>
        </div>
        <span className="text-xs text-slate-400">
          Tracking 8 major cinematic powerhouses worldwide
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {industries.map((ind) => {
          const topMovie = movies.find((m) => m.id === ind.topMovieId);

          return (
            <div
              key={ind.id}
              onClick={() => onSelectIndustry(ind.id)}
              className="bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-4 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                    <span>{ind.flag}</span>
                    <span>{ind.title}</span>
                  </span>
                  <span className="text-[10px] text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    Track
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                  {ind.description}
                </p>
              </div>

              {topMovie && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectMovie(topMovie);
                  }}
                  className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs"
                >
                  <div className="min-w-0 pr-2">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">
                      Industry Leader
                    </span>
                    <span className="font-semibold text-slate-200 hover:text-amber-300 truncate block">
                      {topMovie.title}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-amber-400 font-mono text-[11px]">
                      {format(topMovie.worldwideGrossUSD, topMovie.worldwideGrossINR, { compact: true })}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
