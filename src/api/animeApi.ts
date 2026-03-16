import axios from 'axios';
import type { AnimeListResponse, AnimeDetailsResponse, GenreListResponse } from '../types/anime';
import { getCached, setCached, cacheKey } from '../utils/cache';

const BASE_URL = 'https://api.jikan.moe/v4';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 12000,
});

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function withCache<T>(key: string, fetcher: () => Promise<T>, ttl?: number): Promise<T> {
  const cached = getCached<T>(key);
  if (cached) return cached;
  const data = await fetcher();
  setCached(key, data, ttl);
  return data;
}

export const getTopAnime = async (page = 1, limit = 20): Promise<AnimeListResponse> => {
  const key = cacheKey('top', page, limit);
  return withCache(key, async () => {
    await delay(300);
    const res = await api.get<AnimeListResponse>('/top/anime', { params: { page, limit } });
    return res.data;
  });
};

export const getTrendingAnime = async (page = 1): Promise<AnimeListResponse> => {
  const key = cacheKey('trending', page);
  return withCache(key, async () => {
    await delay(300);
    const res = await api.get<AnimeListResponse>('/seasons/now', { params: { page, limit: 20 } });
    return res.data;
  });
};

export const searchAnime = async (
  query: string,
  page = 1,
  genres?: string,
  orderBy?: string,
  sort?: string
): Promise<AnimeListResponse> => {
  const key = cacheKey('search', query, page, genres, orderBy, sort);
  return withCache(key, async () => {
    await delay(300);
    const params: Record<string, string | number> = { q: query, page, limit: 20 };
    if (genres) params.genres = genres;
    if (orderBy) params.order_by = orderBy;
    if (sort) params.sort = sort;
    const res = await api.get<AnimeListResponse>('/anime', { params });
    return res.data;
  }, 2 * 60 * 1000);
};

export const getAnimeById = async (id: number): Promise<AnimeDetailsResponse> => {
  const key = cacheKey('anime', id);
  return withCache(key, async () => {
    await delay(300);
    const res = await api.get<AnimeDetailsResponse>(`/anime/${id}`);
    return res.data;
  }, 10 * 60 * 1000);
};

export const getAnimeByGenre = async (
  genreId: number,
  page = 1,
  orderBy = 'score',
  sort = 'desc'
): Promise<AnimeListResponse> => {
  const key = cacheKey('genre', genreId, page, orderBy, sort);
  return withCache(key, async () => {
    await delay(300);
    const res = await api.get<AnimeListResponse>('/anime', {
      params: { genres: genreId, page, limit: 20, order_by: orderBy, sort },
    });
    return res.data;
  });
};

export const getGenres = async (): Promise<GenreListResponse> => {
  const key = 'genres';
  return withCache(key, async () => {
    await delay(300);
    const res = await api.get<GenreListResponse>('/genres/anime');
    return res.data;
  }, 30 * 60 * 1000);
};

export interface AnimeCharacter {
  character: {
    mal_id: number;
    name: string;
    images: { jpg: { image_url: string } };
    url: string;
  };
  role: string;
  voice_actors: {
    person: { mal_id: number; name: string; images: { jpg: { image_url: string } } };
    language: string;
  }[];
}

export const getAnimeCharacters = async (id: number): Promise<AnimeCharacter[]> => {
  const key = cacheKey('characters', id);
  return withCache(key, async () => {
    await delay(300);
    const res = await api.get<{ data: AnimeCharacter[] }>(`/anime/${id}/characters`);
    return res.data.data;
  }, 15 * 60 * 1000);
};

export interface AnimeRecommendation {
  entry: {
    mal_id: number;
    title: string;
    images: { jpg: { image_url: string; large_image_url: string } };
    url: string;
  };
  votes: number;
}

export const getAnimeRecommendations = async (id: number): Promise<AnimeRecommendation[]> => {
  const key = cacheKey('recommendations', id);
  return withCache(key, async () => {
    await delay(300);
    const res = await api.get<{ data: AnimeRecommendation[] }>(`/anime/${id}/recommendations`);
    return res.data.data;
  }, 15 * 60 * 1000);
};
