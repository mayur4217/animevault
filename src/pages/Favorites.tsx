import React from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { AnimeCard } from '../components/anime/AnimeCard';
import { Button } from '../components/ui/Button';
import { useFavorites } from '../hooks/useFavorites';

export const Favorites: React.FC = () => {
  const { favorites, clearFavorites } = useFavorites();

  return (
    <div style={{ minHeight: '100vh', paddingTop: '88px', paddingBottom: '60px' }}>
      <Container>
        <div style={{ marginBottom: '40px', paddingBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(255,45,85,0.08)',
                border: '1px solid rgba(255,45,85,0.2)',
                borderRadius: '20px', padding: '6px 16px', marginBottom: '16px',
              }}>
                <Heart size={14} fill="#ff2d55" color="#ff2d55" />
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '12px', fontWeight: 600, color: '#ff2d55', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Your List</span>
              </div>
              <h1 style={{
                margin: '0 0 8px',
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(40px, 6vw, 72px)',
                color: '#f1f5f9', lineHeight: '1', letterSpacing: '0.03em',
              }}>
                MY <span style={{ color: '#ff2d55' }}>FAVORITES</span>
              </h1>
              <p style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontSize: '15px', color: '#475569' }}>
                {favorites.length} {favorites.length === 1 ? 'anime' : 'series'} saved
              </p>
            </div>

            {favorites.length > 0 && (
              <Button variant="ghost" onClick={clearFavorites} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Trash2 size={14} /> Clear All
              </Button>
            )}
          </div>
        </div>

        {favorites.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px 20px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'rgba(255,45,85,0.08)',
              border: '1px solid rgba(255,45,85,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Heart size={32} color="#ff2d55" />
            </div>
            <h2 style={{ margin: 0, fontFamily: "'Bebas Neue'", fontSize: '28px', color: '#334155', letterSpacing: '0.05em' }}>NO FAVORITES YET</h2>
            <p style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontSize: '15px', color: '#475569', maxWidth: '300px' }}>
              Start browsing and tap the heart icon on any anime to save it here.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '20px',
          }}>
            {favorites.map((anime, i) => (
              <AnimeCard key={anime.mal_id} anime={anime} index={i} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};
