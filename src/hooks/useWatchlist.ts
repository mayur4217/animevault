import { useState, useCallback } from 'react';
import type { Anime } from '../types/anime';

export type WatchStatus = 'watching' | 'completed' | 'plan_to_watch' | 'dropped';

export interface WatchlistEntry {
  anime: Anime;
  status: WatchStatus;
  addedAt: number;
}

const STORAGE_KEY = 'animevault_watchlist';

const loadWatchlist = (): Record<number, WatchlistEntry> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const saveWatchlist = (watchlist: Record<number, WatchlistEntry>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
  } catch {}
};

export const STATUS_LABELS: Record<WatchStatus, string> = {
  watching: 'Watching',
  completed: 'Completed',
  plan_to_watch: 'Plan to Watch',
  dropped: 'Dropped',
};

export const STATUS_COLORS: Record<WatchStatus, { bg: string; border: string; text: string }> = {
  watching: { bg: 'rgba(0,245,160,0.12)', border: 'rgba(0,245,160,0.35)', text: '#00f5a0' },
  completed: { bg: 'rgba(6,182,212,0.12)', border: 'rgba(6,182,212,0.35)', text: '#06b6d4' },
  plan_to_watch: { bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.35)', text: '#a78bfa' },
  dropped: { bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.35)', text: '#ef4444' },
};

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<Record<number, WatchlistEntry>>(loadWatchlist);

  const getStatus = useCallback(
    (id: number): WatchStatus | null => watchlist[id]?.status ?? null,
    [watchlist]
  );

  const setStatus = useCallback((anime: Anime, status: WatchStatus) => {
    setWatchlist(prev => {
      const next = {
        ...prev,
        [anime.mal_id]: { anime, status, addedAt: prev[anime.mal_id]?.addedAt ?? Date.now() },
      };
      saveWatchlist(next);
      return next;
    });
  }, []);

  const removeFromWatchlist = useCallback((id: number) => {
    setWatchlist(prev => {
      const next = { ...prev };
      delete next[id];
      saveWatchlist(next);
      return next;
    });
  }, []);

  const entries = Object.values(watchlist).sort((a, b) => b.addedAt - a.addedAt);

  return { watchlist, entries, getStatus, setStatus, removeFromWatchlist };
};
