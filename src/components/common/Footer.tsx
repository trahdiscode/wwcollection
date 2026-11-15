import React from 'react';
import { Film, Globe, ShieldCheck, Database, Award } from 'lucide-react';
import { NavTab } from './Navbar';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400 text-xs mt-20">
      {/* Top Banner Stats */}
      <div className="border-b border-slate-900 bg-slate-900/40 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="text-2xl font-black text-amber-400 font-serif">10+</span>
            <p className="text-[11px] text-slate-400 mt-0.5">Film Industries Tracked</p>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-100 font-serif">$35B+</span>
            <p className="text-[11px] text-slate-400 mt-0.5">Global Box Office Catalogued</p>
          </div>
          <div>
            <span className="text-2xl font-black text-emerald-400 font-serif">100%</span>
            <p className="text-[11px] text-slate-400 mt-0.5">Verified Trade & Producer Data</p>
          </div>
          <div>
            <span className="text-2xl font-black text-cyan-400 font-serif">Dual Currency</span>
            <p className="text-[11px] text-slate-400 mt-0.5">Instant USD ($M) & INR (₹ Cr) Conversion</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
              <Film className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-white font-serif">CINEMETRIX GLOBAL</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            The definitive entertainment intelligence platform for tracking worldwide theatrical box-office collections, historical records, multi-industry performance, and movie analytics.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-amber-400/90 font-medium pt-1">
            <Globe className="w-3.5 h-3.5" /> Covering Hollywood, Pan-India & International Cinema
          </div>
        </div>

        {/* Navigation Shortcuts */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
            Platform Sections
          </h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => onSelectTab('hub')}
                className="hover:text-amber-400 transition-colors"
              >
                Live Box Office Hub
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('explorer')}
                className="hover:text-amber-400 transition-colors"
              >
                Comprehensive Movie Database
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('rankings')}
                className="hover:text-amber-400 transition-colors"
              >
                All-Time Records & Leaderboards
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('compare')}
                className="hover:text-amber-400 transition-colors"
              >
                Box Office Comparison Arena
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('analytics')}
                className="hover:text-amber-400 transition-colors"
              >
                Market Share & Multiplier Analytics
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('news')}
                className="hover:text-amber-400 transition-colors"
              >
                Trade Reports & Release Calendar
              </button>
            </li>
          </ul>
        </div>

        {/* Covered Industries */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
            Covered Film Markets
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <span className="text-slate-300">Hollywood (USA)</span>
            <span className="text-slate-300">Bollywood (Hindi)</span>
            <span className="text-slate-300">Tollywood (Telugu)</span>
            <span className="text-slate-300">Kollywood (Tamil)</span>
            <span className="text-slate-300">Mollywood (Malayalam)</span>
            <span className="text-slate-300">Sandalwood (Kannada)</span>
            <span className="text-slate-300">Korean Cinema (Hallyu)</span>
            <span className="text-slate-300">Japanese Anime & China</span>
          </div>
        </div>

        {/* Methodology & Verification */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Trade Methodology
          </h4>
          <p className="text-[11px] leading-relaxed text-slate-400 space-y-1">
            <span>
              All collections represent <strong>theatrical gross receipts</strong> (including entertainment taxes), converted using standardized historical forex rates.
            </span>
            <span className="block mt-1 text-slate-400">
              Indian box office metrics report both Gross and Nett equivalents across standard circuits (AP/TG, Hindi Belt, Tamil Nadu, Karnataka, Kerala, and Overseas).
            </span>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
        <p>© 2024–2026 CineMetrix Global. Built for cinephiles, movie industry analysts, and box-office enthusiasts.</p>
        <p className="flex items-center gap-1">
          Designed with precision & performance.
        </p>
      </div>
    </footer>
  );
};
