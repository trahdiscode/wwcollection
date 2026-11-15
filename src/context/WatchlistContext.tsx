import React, { createContext, useContext, useState, useEffect } from 'react';
import { Movie } from '../types/movie';

interface WatchlistContextType {
  watchlist: string[]; // movie IDs
  toggleWatchlist: (movieId: string) => void;
  isInWatchlist: (movieId: string) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cinemetrix_watchlist');
      return saved ? JSON.parse(saved) : ['dune-part-two', 'kalki-2898-ad', 'avatar-the-way-of-water'];
    } catch {
      return ['dune-part-two', 'kalki-2898-ad'];
    }
  });

  useEffect(() => {
    localStorage.setItem('cinemetrix_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatchlist = (movieId: string) => {
    setWatchlist((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
  };

  const isInWatchlist = (movieId: string) => watchlist.includes(movieId);

  return (
    <WatchlistContext.Provider value={{ watchlist, toggleWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};

// Comparison Context
interface ComparisonContextType {
  compareList: string[]; // movie IDs (up to 4)
  addToCompare: (movieId: string) => boolean;
  removeFromCompare: (movieId: string) => void;
  clearCompare: () => void;
  isInCompare: (movieId: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareList, setCompareList] = useState<string[]>(['kalki-2898-ad', 'rrr', 'dune-part-two']);

  const addToCompare = (movieId: string): boolean => {
    if (compareList.includes(movieId)) return true;
    if (compareList.length >= 4) {
      return false; // limit reached
    }
    setCompareList((prev) => [...prev, movieId]);
    return true;
  };

  const removeFromCompare = (movieId: string) => {
    setCompareList((prev) => prev.filter((id) => id !== movieId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (movieId: string) => compareList.includes(movieId);

  return (
    <ComparisonContext.Provider
      value={{ compareList, addToCompare, removeFromCompare, clearCompare, isInCompare }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};
