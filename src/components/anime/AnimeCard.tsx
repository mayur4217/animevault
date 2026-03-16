import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Tv, Heart } from 'lucide-react';
import type { Anime } from '../../types/anime';
import { formatScore, truncateText, getScoreColor } from '../../utils/format';
import { useFavorites } from '../../hooks/useFavorites';
import { useWatchlist, STATUS_COLORS } from '../../hooks/useWatchlist';

interface AnimeCardProps {
  anime: Anime;
  index?: number;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime, index = 0 }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { getStatus } = useWatchlist();
  const fav = isFavorite(anime.mal_id);
  const watchStatus = getStatus(anime.mal_id);

  const scoreColor = getScoreColor(anime.score);
  const title = anime.title_english || anime.title;
  const genres = anime.genres.slice(0, 2);

  return (
    <div
      style={{
        animation: `cardFadeIn 0.4s ease both`,
        animationDelay: `${Math.min(index * 60, 600)}ms`,
        position: 'relative',
      }}
    >
      <style>{`
        @keyframes cardFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .anime-card-inner {
          border-radius: 14px;
          overflow: hidden;
          background: #12121a;
          border: 1px solid rgba(255,255,255,0.06);
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
        }
        .anime-card-inner:hover {
          transform: translateY(-6px);
          border-color: rgba(0,245,160,0.25);
          box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,245,160,0.1);
        }
        .fav-btn {
          transition: all 0.2s ease;
        }
        .fav-btn:hover {
          transform: scale(1.2);
        }
      `}</style>

      <Link to={`/anime/${anime.mal_id}`} style={{ textDecoration: 'none' }}>
        <div
          className="anime-card-inner"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Image */}
          <div style={{ position: 'relative', paddingTop: '142%', overflow: 'hidden' }}>
            {!imgLoaded && (
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, #12121a, #1e1e2e)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
              </div>
            )}
            <img
              src={anime.images.webp?.large_image_url || anime.images.jpg.large_image_url}
              alt={title}
              onLoad={() => setImgLoaded(true)}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease, opacity 0.3s ease',
                transform: hovered ? 'scale(1.06)' : 'scale(1)',
                opacity: imgLoaded ? 1 : 0,
              }}
            />

            {/* Overlay on hover */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.3) 50%, transparent 100%)',
              opacity: hovered ? 1 : 0.7,
              transition: 'opacity 0.3s ease',
            }} />

            {/* Score badge */}
            {anime.score && (
              <div style={{
                position: 'absolute', top: '10px', left: '10px',
                display: 'flex', alignItems: 'center', gap: '4px',
                background: 'rgba(10,10,15,0.85)',
                backdropFilter: 'blur(8px)',
                padding: '4px 10px', borderRadius: '20px',
                border: `1px solid ${scoreColor}40`,
              }}>
                <Star size={11} fill={scoreColor} color={scoreColor} />
                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '12px', fontWeight: 700,
                  color: scoreColor,
                }}>{formatScore(anime.score)}</span>
              </div>
            )}

            {/* Episodes badge */}
            {anime.episodes && (
              <div style={{
                position: 'absolute', top: '10px', right: '40px',
                display: 'flex', alignItems: 'center', gap: '4px',
                background: 'rgba(10,10,15,0.85)',
                backdropFilter: 'blur(8px)',
                padding: '4px 8px', borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                <Tv size={11} color="#94a3b8" />
                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '11px', color: '#94a3b8',
                }}>{anime.episodes}</span>
              </div>
            )}

            {/* Watchlist status badge */}
            {watchStatus && (() => {
              const c = STATUS_COLORS[watchStatus];
              return (
                <div style={{
                  position: 'absolute', bottom: '10px', right: '8px',
                  padding: '2px 8px', borderRadius: '20px',
                  background: c.bg, border: `1px solid ${c.border}`,
                  opacity: hovered ? 0 : 1,
                  transition: 'opacity 0.2s',
                }}>
                  <span style={{ fontSize: '9px', fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: c.text, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {watchStatus === 'plan_to_watch' ? 'PTW' : watchStatus === 'watching' ? 'Watching' : watchStatus === 'completed' ? 'Done' : 'Dropped'}
                  </span>
                </div>
              );
            })()}

            {/* Genres on hover */}
            <div style={{
              position: 'absolute', bottom: '10px', left: '10px', right: '10px',
              display: 'flex', flexWrap: 'wrap', gap: '4px',
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateY(0)' : 'translateY(8px)',
              transition: 'all 0.3s ease',
            }}>
              {genres.map(g => (
                <span key={g.mal_id} style={{
                  padding: '2px 8px', borderRadius: '20px',
                  background: 'rgba(0,245,160,0.15)',
                  border: '1px solid rgba(0,245,160,0.3)',
                  color: '#00f5a0',
                  fontSize: '10px', fontFamily: "'Outfit', sans-serif",
                  fontWeight: 500,
                }}>{g.name}</span>
              ))}
            </div>
          </div>

          {/* Info */}
          <div style={{ padding: '12px' }}>
            <h3 style={{
              margin: 0,
              fontFamily: "'Outfit', sans-serif",
              fontSize: '13px', fontWeight: 600,
              color: '#e2e8f0',
              lineHeight: '1.4',
            }}>{truncateText(title, 40)}</h3>
            {anime.year && (
              <p style={{
                margin: '4px 0 0',
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px', color: '#475569',
              }}>{anime.year} · {anime.type || 'TV'}</p>
            )}
          </div>
        </div>
      </Link>

      {/* Favorite button */}
      <button
        className="fav-btn"
        onClick={e => { e.preventDefault(); toggleFavorite(anime); }}
        style={{
          position: 'absolute', top: '10px', right: '8px',
          background: fav ? 'rgba(255,45,85,0.2)' : 'rgba(10,10,15,0.85)',
          backdropFilter: 'blur(8px)',
          border: fav ? '1px solid rgba(255,45,85,0.4)' : '1px solid rgba(255,255,255,0.08)',
          borderRadius: '50%', width: '28px', height: '28px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 10,
        }}
      >
        <Heart
          size={13}
          color={fav ? '#ff2d55' : '#94a3b8'}
          fill={fav ? '#ff2d55' : 'none'}
        />
      </button>
    </div>
  );
};
