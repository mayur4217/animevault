import React, { useState } from 'react';
import { Star, SlidersHorizontal } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { AnimeGrid } from '../components/anime/AnimeGrid';
import { useAnime } from '../hooks/useAnime';

const FILTERS = [
  { label: 'All', value: '' },
  { label: 'TV', value: 'tv' },
  { label: 'Movie', value: 'movie' },
  { label: 'OVA', value: 'ova' },
  { label: 'Special', value: 'special' },
];

export const TopAnime: React.FC = () => {
  const [filterIdx, setFilterIdx] = useState(0);

  const { anime, loading, error, page, totalPages, hasNextPage, setPage, refetch } = useAnime({
    mode: 'top',
  });

  return (
    <div style={{ minHeight: '100vh', paddingTop: '88px', paddingBottom: '60px' }}>
      <Container>
        <div style={{ marginBottom: '40px', paddingBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(245,158,11,0.08)',
            border: '1px solid rgba(245,158,11,0.2)',
            borderRadius: '20px', padding: '6px 16px', marginBottom: '16px',
          }}>
            <Star size={14} fill="#f59e0b" color="#f59e0b" />
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '12px', fontWeight: 600, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Hall of Fame</span>
          </div>
          <h1 style={{
            margin: '0 0 8px',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(40px, 6vw, 72px)',
            color: '#f1f5f9', lineHeight: '1', letterSpacing: '0.03em',
          }}>
            TOP <span style={{ color: '#f59e0b' }}>RATED</span> ANIME
          </h1>
          <p style={{ margin: '0 0 24px', fontFamily: "'Outfit', sans-serif", fontSize: '15px', color: '#475569' }}>
            The highest-rated anime of all time, ranked by MyAnimeList
          </p>

          {/* Type filter pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <SlidersHorizontal size={14} color="#475569" />
            {FILTERS.map((f, i) => {
              const isActive = filterIdx === i;
              return (
                <button
                  key={f.value}
                  onClick={() => { setFilterIdx(i); setPage(1); }}
                  style={{
                    padding: '6px 16px', borderRadius: '20px',
                    background: isActive ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isActive ? 'rgba(245,158,11,0.35)' : 'rgba(255,255,255,0.08)'}`,
                    color: isActive ? '#f59e0b' : '#64748b',
                    cursor: 'pointer',
                    fontFamily: "'Outfit', sans-serif", fontSize: '13px', fontWeight: isActive ? 600 : 400,
                    transition: 'all 0.2s',
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        <AnimeGrid
          anime={anime}
          loading={loading}
          error={error}
          page={page}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          onPageChange={setPage}
          onRetry={refetch}
        />
      </Container>
    </div>
  );
};
