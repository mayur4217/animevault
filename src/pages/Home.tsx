import React, { useState, useEffect } from 'react';
import { Flame, Filter, X } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { AnimeGrid } from '../components/anime/AnimeGrid';
import { useAnime } from '../hooks/useAnime';
import { getGenres } from '../api/animeApi';
import type { Genre } from '../types/anime';

export const Home: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [genresLoaded, setGenresLoaded] = useState(false);
  const [showGenres, setShowGenres] = useState(false);

  const mode = selectedGenre ? 'genre' : 'trending';
  const { anime, loading, error, page, totalPages, hasNextPage, setPage, refetch } = useAnime({
    mode,
    genreId: selectedGenre?.mal_id,
  });

  useEffect(() => {
    if (!genresLoaded) {
      getGenres().then(res => {
        setGenres(res.data.slice(0, 30));
        setGenresLoaded(true);
      }).catch(() => setGenresLoaded(true));
    }
  }, [genresLoaded]);

  const popularGenres = genres.slice(0, 20);

  return (
    <div style={{ minHeight: '100vh', paddingTop: '88px', paddingBottom: '60px' }}>
      <Container>
        {/* Hero Header */}
        <div style={{
          marginBottom: '40px',
          paddingBottom: '40px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(0,245,160,0.08)',
            border: '1px solid rgba(0,245,160,0.2)',
            borderRadius: '20px', padding: '6px 16px',
            marginBottom: '16px',
          }}>
            <Flame size={14} color="#00f5a0" />
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '12px', fontWeight: 600,
              color: '#00f5a0', textTransform: 'uppercase', letterSpacing: '0.1em',
            }}>This Season</span>
          </div>

          <h1 style={{
            margin: '0 0 8px',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(40px, 6vw, 72px)',
            color: '#f1f5f9', lineHeight: '1',
            letterSpacing: '0.03em',
          }}>
            {selectedGenre ? (
              <span>
                <span style={{ color: '#00f5a0' }}>{selectedGenre.name}</span> ANIME
              </span>
            ) : (
              <span>TRENDING <span style={{ color: '#00f5a0' }}>NOW</span></span>
            )}
          </h1>
          <p style={{
            margin: 0,
            fontFamily: "'Outfit', sans-serif",
            fontSize: '15px', color: '#475569',
          }}>
            {selectedGenre
              ? `Discover the best ${selectedGenre.name.toLowerCase()} anime`
              : 'Currently airing shows ranked by popularity'}
          </p>
        </div>

        {/* Genre Filter */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowGenres(s => !s)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: showGenres ? 'rgba(0,245,160,0.1)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${showGenres ? 'rgba(0,245,160,0.3)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '8px', padding: '8px 16px',
                cursor: 'pointer', color: showGenres ? '#00f5a0' : '#94a3b8',
                fontFamily: "'Outfit', sans-serif", fontSize: '13px', fontWeight: 500,
                transition: 'all 0.2s',
              }}
            >
              <Filter size={14} /> Filter by Genre
            </button>

            {selectedGenre && (
              <button
                onClick={() => { setSelectedGenre(null); setPage(1); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: 'rgba(255,45,85,0.1)',
                  border: '1px solid rgba(255,45,85,0.2)',
                  borderRadius: '8px', padding: '8px 14px',
                  cursor: 'pointer', color: '#ff2d55',
                  fontFamily: "'Outfit', sans-serif", fontSize: '13px',
                  transition: 'all 0.2s',
                }}
              >
                <X size={13} /> Clear: {selectedGenre.name}
              </button>
            )}
          </div>

          {/* Genre chips */}
          {showGenres && (
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '8px',
              padding: '20px',
              background: '#12121a',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '14px',
              animation: 'fadeIn 0.2s ease',
            }}>
              <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(-8px) } to { opacity:1; transform:translateY(0) } }`}</style>
              {popularGenres.map(genre => (
                <button
                  key={genre.mal_id}
                  onClick={() => { setSelectedGenre(genre); setPage(1); setShowGenres(false); }}
                  style={{
                    padding: '6px 16px', borderRadius: '20px',
                    background: selectedGenre?.mal_id === genre.mal_id
                      ? 'linear-gradient(135deg, #00f5a0, #00d9f5)'
                      : 'rgba(255,255,255,0.04)',
                    border: selectedGenre?.mal_id === genre.mal_id
                      ? 'none'
                      : '1px solid rgba(255,255,255,0.08)',
                    color: selectedGenre?.mal_id === genre.mal_id ? '#0a0a0f' : '#94a3b8',
                    cursor: 'pointer',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '13px', fontWeight: 500,
                    transition: 'all 0.15s',
                  }}
                >
                  {genre.name}
                  <span style={{ marginLeft: '6px', opacity: 0.6, fontSize: '11px' }}>
                    {(genre.count / 1000).toFixed(0)}k
                  </span>
                </button>
              ))}
            </div>
          )}
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
