import React from 'react';

export interface BrandLogoProps {
  variant?: 'horizontal' | 'stacked' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
  };

  const svgSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const titleSizes = {
    sm: 'text-xs sm:text-sm',
    md: 'text-sm sm:text-base',
    lg: 'text-base sm:text-lg',
  };

  const badgeSizes = {
    sm: 'text-[8px] px-1 py-0.5',
    md: 'text-[9px] px-1.5 py-0.5',
    lg: 'text-[10px] px-2 py-0.5',
  };

  const iconGraphic = (
    <div
      className={`${iconSizes[size]} rounded-xl bg-gradient-to-b from-[#1c202d] to-[#10121a] border border-[#272d3e] flex items-center justify-center text-[#d99b26] shadow-inner group-hover:border-[#d99b26]/60 group-hover:shadow-[0_0_18px_rgba(217,155,38,0.25)] transition-all duration-200 shrink-0`}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${svgSizes[size]} transition-transform duration-200 group-hover:scale-105`}
        aria-hidden="true"
      >
        <path
          d="M4 9.5L7.5 22.5L11 13.5L14.5 22.5L18 9.5"
          stroke="#d99b26"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 9.5L17.5 22.5L21 13.5L24.5 22.5L28 9.5"
          stroke="#f59e0b"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="6" r="1.5" fill="#d99b26" opacity="0.8" />
      </svg>
    </div>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{iconGraphic}</div>;
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center gap-1.5 text-center ${className}`}>
        {iconGraphic}
        <div className="flex flex-col items-center">
          <span className={`${titleSizes[size]} font-black tracking-tight text-white font-sans`}>
            WW MOVIE
          </span>
          <span
            className={`${badgeSizes[size]} font-bold text-[#d99b26] tracking-widest uppercase bg-[#d99b26]/10 rounded border border-[#d99b26]/25 font-mono leading-none mt-0.5`}
          >
            COLLECTION
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {iconGraphic}
      <div className="flex items-center gap-1.5">
        <span
          className={`${titleSizes[size]} font-black tracking-tight text-white font-sans group-hover:text-[#f4f5f8] transition-colors whitespace-nowrap`}
        >
          WW MOVIE
        </span>
        <span
          className={`${badgeSizes[size]} font-bold text-[#d99b26] tracking-widest uppercase bg-[#d99b26]/10 rounded border border-[#d99b26]/25 font-mono leading-none whitespace-nowrap`}
        >
          COLLECTION
        </span>
      </div>
    </div>
  );
};
