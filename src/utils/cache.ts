// Simple in-memory cache with TTL
const cache = new Map<string, { data: unknown; expires: number }>();

const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

export const getCached = <T>(key: string): T | null => {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
};

export const setCached = <T>(key: string, data: T, ttl = DEFAULT_TTL): void => {
  cache.set(key, { data, expires: Date.now() + ttl });
};

export const cacheKey = (...parts: (string | number | undefined)[]): string =>
  parts.filter(Boolean).join(':');
