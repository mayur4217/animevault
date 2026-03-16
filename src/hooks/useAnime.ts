import { useState, useEffect, useCallback } from 'react';
import type { Anime } from '../types/anime';
import { getTrendingAnime, searchAnime, getAnimeByGenre, getTopAnime } from '../api/animeApi';

type Mode = 'trending' | 'search' | 'genre' | 'top';

interface UseAnimeOptions {
  mode?: Mode;
  query?: string;
  genreId?: number;
  orderBy?: string;
  sort?: string;
}

interface UseAnimeReturn {
  anime: Anime[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  setPage: (page: number) => void;
  refetch: () => void;
}

export const useAnime = ({
  mode = 'trending',
  query = '',
  genreId,
  orderBy,
  sort,
}: UseAnimeOptions = {}): UseAnimeReturn => {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [trigger, setTrigger] = useState(0);

  const refetch = useCallback(() => setTrigger(t => t + 1), []);

  useEffect(() => {
    setPage(1);
  }, [mode, query, genreId]);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let response;
        if (mode === 'search' && query) {
          response = await searchAnime(query, page, undefined, orderBy, sort);
        } else if (mode === 'genre' && genreId) {
          response = await getAnimeByGenre(genreId, page, orderBy || 'score', sort || 'desc');
        } else if (mode === 'top') {
          response = await getTopAnime(page);
        } else {
          response = await getTrendingAnime(page);
        }

        if (!cancelled) {
          setAnime(response.data);
          setTotalPages(response.pagination.last_visible_page);
          setHasNextPage(response.pagination.has_next_page);
        }
      } catch (err) {
        if (!cancelled) {
          setError('Failed to fetch anime. Please try again.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => { cancelled = true; };
  }, [mode, query, genreId, page, orderBy, sort, trigger]);

  return { anime, loading, error, page, totalPages, hasNextPage, setPage, refetch };
};
