import React from 'react';
import { Globe, ArrowRight } from 'lucide-react';
import { FilmIndustry, Movie } from '../../types/movie';
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
    code: string;
  }[] = [
    {
      id: 'Hollywood',
      title: 'Hollywood',
      description: 'Global reach, IMAX spectacles, and high-concept studio tentpoles.',
      topMovieId: 'avatar',
      code: 'US',
    },
    {
      id: 'Bollywood',
      title: 'Bollywood (Hindi)',
      description: 'North India heartland, mass action spectacles, and global diaspora power.',
      topMovieId: 'dangal',
      code: 'IN-HI',
    },
    {
      id: 'Tollywood',
      title: 'Tollywood (Telugu)',
      description: 'Pioneers of Pan-India spectacle cinema and mythologies.',
      topMovieId: 'baahubali-2',
      code: 'IN-TE',
    },
    {
      id: 'Kollywood',
      title: 'Kollywood (Tamil)',
      description: 'Superstar power, auteur craft, and explosive worldwide markets.',
      topMovieId: 'jailer',
      code: 'IN-TA',
    },
    {
      id: 'Mollywood',
      title: 'Mollywood (Malayalam)',
      description: 'Breakout realism, tight budgets, and record multipliers.',
      topMovieId: 'manjummel-boys',
      code: 'IN-ML',
    },
    {
      id: 'Sandalwood',
      title: 'Sandalwood (Kannada)',
      description: 'Rooted folklore, visual grit, and extraordinary budget multipliers.',
      topMovieId: 'kgf-chapter-2',
      code: 'IN-KA',
    },
    {
      id: 'Korean',
      title: 'Korean Cinema (Hallyu)',
      description: 'Oscar-winning thrillers and explosive crime franchises.',
      topMovieId: 'parasite',
      code: 'KR',
    },
    {
      id: 'International',
      title: 'International Cinema',
      description: 'Record-shattering Japanese anime and East Asian blockbusters.',
      topMovieId: 'demon-slayer-mugen-train',
      code: 'INT',
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <h3 className="text-base font-semibold text-white">
          Major Film Industries
        </h3>
        <span className="text-xs text-[#717886]">
          Tracking 8 global cinematic markets
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {industries.map((ind) => {
          const topMovie = movies.find((m) => m.id === ind.topMovieId);

          return (
            <div
              key={ind.id}
              onClick={() => onSelectIndustry(ind.id)}
              className="bg-[#101217] hover:bg-[#14171e] border border-[#1c1f28] hover:border-[#2b303d] rounded-xl p-4 transition-all duration-150 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-white group-hover:text-[#d99b26] transition-colors flex items-center gap-1.5">
                    <span className="font-mono text-[10px] text-[#717886] bg-[#16181f] px-1.5 py-0.5 rounded border border-[#20232b]">
                      {ind.code}
                    </span>
                    <span>{ind.title}</span>
                  </span>
                  <span className="text-[10px] text-[#8a92a1] group-hover:text-white transition-colors">
                    Filter →
                  </span>
                </div>
                <p className="text-xs text-[#788090] line-clamp-2 leading-relaxed mb-3">
                  {ind.description}
                </p>
              </div>

              {topMovie && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectMovie(topMovie);
                  }}
                  className="pt-2 border-t border-[#181a21] flex items-center justify-between text-xs"
                >
                  <div className="min-w-0 pr-2">
                    <span className="text-[10px] text-[#5d6370] block uppercase font-medium">
                      Leader
                    </span>
                    <span className="font-medium text-[#c8d0de] hover:text-[#d99b26] truncate block text-[11px]">
                      {topMovie.title}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono font-bold text-white text-[11px] tabular-nums">
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
