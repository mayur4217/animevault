import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { AnimeDetails } from '../components/anime/AnimeDetails';
import { Loader } from '../components/ui/Loader';
import { useAnimeDetails } from '../hooks/useAnimeDetails';

export const AnimePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = id ? parseInt(id, 10) : null;
  const { anime, loading, error } = useAnimeDetails(numericId);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader size="lg" text="Loading details..." />
      </div>
    );
  }

  if (error || !anime) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: '16px',
      }}>
        <span style={{ fontSize: '48px' }}>🌀</span>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          color: '#94a3b8', fontSize: '16px',
        }}>
          {error || 'Anime not found.'}
        </p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px' }}>
      <Container maxWidth="1200px">
        <AnimeDetails anime={anime} />
      </Container>
    </div>
  );
};
