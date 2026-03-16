import { useState, useCallback } from 'react';
import type { Anime } from '../types/anime';

const STORAGE_KEY = 'animevault_favorites';

const loadFavorites = (): Anime[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveFavorites = (favorites: Anime[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // ignore
  }
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Anime[]>(loadFavorites);

  const isFavorite = useCallback(
    (id: number) => favorites.some(a => a.mal_id === id),
    [favorites]
  );

  const toggleFavorite = useCallback((anime: Anime) => {
    setFavorites(prev => {
      const exists = prev.some(a => a.mal_id === anime.mal_id);
      const next = exists
        ? prev.filter(a => a.mal_id !== anime.mal_id)
        : [anime, ...prev];
      saveFavorites(next);
      return next;
    });
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    saveFavorites([]);
  }, []);

  return { favorites, isFavorite, toggleFavorite, clearFavorites };
};
