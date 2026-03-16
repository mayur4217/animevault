import { useState, useEffect } from 'react';
import type { Anime } from '../types/anime';
import { getAnimeById } from '../api/animeApi';

interface UseAnimeDetailsReturn {
  anime: Anime | null;
  loading: boolean;
  error: string | null;
}

export const useAnimeDetails = (id: number | null): UseAnimeDetailsReturn => {
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;
    setLoading(true);
    setError(null);
    setAnime(null);

    const fetchAnime = async () => {
      try {
        const response = await getAnimeById(id);
        if (!cancelled) {
          setAnime(response.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError('Failed to fetch anime details.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchAnime();
    return () => { cancelled = true; };
  }, [id]);

  return { anime, loading, error };
};
