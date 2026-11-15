import React from 'react';
import { Globe } from 'lucide-react';
import { NavTab } from './Navbar';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="w-full bg-[#07080b] border-t border-[#1c1f28] text-slate-400 text-xs mt-12 sm:mt-16">
      {/* Top Banner Stats */}
      <div className="border-b border-[#14161f] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <span className="text-xl sm:text-2xl font-bold font-mono text-amber-400">10+</span>
            <p className="text-[11px] font-mono text-slate-500 mt-0.5">Film Industries Tracked</p>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-bold font-mono text-slate-200">$35B+</span>
            <p className="text-[11px] font-mono text-slate-500 mt-0.5">Theatrical Volume Catalogued</p>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">100%</span>
            <p className="text-[11px] font-mono text-slate-500 mt-0.5">Verified Producer & Trade Data</p>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">Multi-FX</span>
            <p className="text-[11px] font-mono text-slate-500 mt-0.5">Instant USD ($M) & INR (₹ Cr) Conversion</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3 md:col-span-1">
          <BrandLogo variant="horizontal" size="md" />
          <p className="text-xs leading-relaxed text-slate-500">
            Authoritative entertainment data platform for tracking worldwide theatrical collections, historical records, pan-industry comparative analytics, and global movie developments.
          </p>
          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 pt-1">
            <Globe className="w-3 h-3 text-slate-500" /> Hollywood, Bollywood, Tollywood, Kollywood, Hallyu & International
          </div>
        </div>

        {/* Navigation Shortcuts */}
        <div>
          <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-3">
            Core Modules
          </h4>
          <ul className="space-y-1.5 text-slate-400">
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
                Trade Intelligence & Analytics
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('news')}
                className="hover:text-amber-400 transition-colors"
              >
                Trade Dispatches & Calendar
              </button>
            </li>
          </ul>
        </div>

        {/* Trade Industry Coverage */}
        <div>
          <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-3">
            Covered Industries
          </h4>
          <div className="grid grid-cols-2 gap-1.5 text-slate-500 font-mono text-[11px]">
            <span>• Hollywood (USA)</span>
            <span>• Bollywood (Hindi)</span>
            <span>• Tollywood (Telugu)</span>
            <span>• Kollywood (Tamil)</span>
            <span>• Mollywood (Malayalam)</span>
            <span>• Sandalwood (Kannada)</span>
            <span>• Hallyu (Korean)</span>
            <span>• Chinese Cinema</span>
            <span>• Japanese Cinema</span>
            <span>• European Circuits</span>
          </div>
        </div>

        {/* Methodology & Currency Note */}
        <div className="space-y-2">
          <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
            Data Methodology
          </h4>
          <p className="text-[11px] leading-relaxed text-slate-500">
            Collections are compiled from official producer statements, trade tracking bodies (Sacnilk, Comscore, Box Office Mojo, Rentrak), and verified distributor returns.
          </p>
          <div className="pt-2 text-[10px] font-mono text-slate-600">
            FX Reference: 1 USD = 83.5 INR • Tabular numbers aligned to standard ISO reporting.
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#14161f] py-4 bg-[#050608]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-600 font-mono text-[11px]">
          <div>
            © {new Date().getFullYear()} WW MOVIE COLLECTION. Worldwide Movie Box Office Intelligence.
          </div>
          <div className="flex items-center gap-4">
            <span>Built for film enthusiasts, analysts & trade researchers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
