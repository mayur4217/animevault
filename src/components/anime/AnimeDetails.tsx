import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Tv, Calendar, Users, Trophy, Heart, ArrowLeft, Play, Clock, X } from 'lucide-react';
import type { Anime } from '../../types/anime';
import { formatScore, formatNumber, getScoreColor, formatStatus } from '../../utils/format';
import { Button } from '../ui/Button';
import { useFavorites } from '../../hooks/useFavorites';
import { WatchlistButton } from '../ui/WatchlistButton';
import { CharactersSection } from './CharactersSection';
import { RecommendationsSection } from './RecommendationsSection';

interface AnimeDetailsProps {
  anime: Anime;
}

export const AnimeDetails: React.FC<AnimeDetailsProps> = ({ anime }) => {
  const navigate = useNavigate();
  const [synopsisExpanded, setSynopsisExpanded] = useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(anime.mal_id);

  const title = anime.title_english || anime.title;
  const scoreColor = getScoreColor(anime.score);
  const allGenres = [...anime.genres, ...anime.themes, ...anime.demographics];

  const stats = [
    { icon: <Star size={16} />, label: 'Score', value: formatScore(anime.score), color: scoreColor },
    { icon: <Trophy size={16} />, label: 'Rank', value: anime.rank ? `#${anime.rank}` : 'N/A', color: '#f59e0b' },
    { icon: <Tv size={16} />, label: 'Episodes', value: anime.episodes?.toString() || '?', color: '#06b6d4' },
    { icon: <Users size={16} />, label: 'Members', value: formatNumber(anime.members), color: '#8b5cf6' },
    { icon: <Calendar size={16} />, label: 'Year', value: anime.year?.toString() || 'N/A', color: '#ec4899' },
    { icon: <Clock size={16} />, label: 'Duration', value: anime.duration?.replace(' per ep', '') || 'N/A', color: '#10b981' },
  ];

  const SYNOPSIS_LIMIT = 400;
  const shortSynopsis = anime.synopsis && anime.synopsis.length > SYNOPSIS_LIMIT
    ? anime.synopsis.slice(0, SYNOPSIS_LIMIT) + '…'
    : anime.synopsis;

  return (
    <>
      <style>{`
        @keyframes detailsIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .details-container { animation: detailsIn 0.5s ease both; }
        .stat-card { transition: all 0.2s ease; }
        .stat-card:hover { transform: translateY(-3px); border-color: rgba(0,245,160,0.2) !important; }
        .genre-tag { transition: all 0.2s ease; cursor: default; }
        .genre-tag:hover { transform: translateY(-2px); }
        @media (max-width: 768px) {
          .details-layout { flex-direction: column !important; }
          .poster-col { align-self: center !important; width: 200px !important; }
          .stats-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <div className="details-container">
        {/* Hero backdrop */}
        <div style={{ position: 'relative', marginBottom: '40px' }}>
          <div style={{
            position: 'absolute', inset: 0, height: '400px',
            backgroundImage: `url(${anime.images.jpg.large_image_url})`,
            backgroundSize: 'cover', backgroundPosition: 'center top',
            filter: 'blur(40px) saturate(0.5)',
            opacity: 0.15,
          }} />
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '400px',
            background: 'linear-gradient(to bottom, transparent 0%, #0a0a0f 100%)',
          }} />
        </div>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#64748b', fontFamily: "'Outfit', sans-serif",
            fontSize: '14px', padding: '0 0 24px',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#00f5a0')}
          onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* Main layout */}
        <div className="details-layout" style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
          {/* Poster */}
          <div className="poster-col" style={{ flexShrink: 0, width: '260px' }}>
            <div style={{
              borderRadius: '16px', overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
              position: 'relative',
            }}>
              <img
                src={anime.images.webp?.large_image_url || anime.images.jpg.large_image_url}
                alt={title}
                style={{ width: '100%', display: 'block' }}
              />
              {/* Airing badge */}
              {anime.airing && (
                <div style={{
                  position: 'absolute', top: '12px', left: '12px',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: 'rgba(0,245,160,0.15)',
                  border: '1px solid rgba(0,245,160,0.4)',
                  borderRadius: '20px', padding: '4px 12px',
                }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#00f5a0', boxShadow: '0 0 6px #00f5a0' }} />
                  <span style={{ fontFamily: "'Outfit'", fontSize: '11px', color: '#00f5a0', fontWeight: 600 }}>AIRING</span>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
              <Button
                variant={fav ? 'danger' : 'secondary'}
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => toggleFavorite(anime)}
              >
                <Heart size={15} fill={fav ? 'white' : 'none'} />
                {fav ? 'Remove Favorite' : 'Add to Favorites'}
              </Button>
              <WatchlistButton anime={anime} />
              {anime.trailer?.youtube_id && (
                <Button
                  variant="ghost"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => setTrailerOpen(true)}
                >
                  <Play size={15} /> Watch Trailer
                </Button>
              )}
            </div>
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Titles */}
            <div style={{ marginBottom: '24px' }}>
              {anime.title_japanese && (
                <p style={{
                  margin: '0 0 8px',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '13px', color: '#475569',
                  letterSpacing: '0.05em',
                }}>{anime.title_japanese}</p>
              )}
              <h1 style={{
                margin: '0 0 8px',
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(32px, 5vw, 56px)',
                color: '#f1f5f9', lineHeight: '1.1',
                letterSpacing: '0.02em',
              }}>{title}</h1>

              {/* Status + type */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{
                  padding: '4px 12px', borderRadius: '20px',
                  background: anime.airing ? 'rgba(0,245,160,0.1)' : 'rgba(255,255,255,0.06)',
                  border: `1px solid ${anime.airing ? 'rgba(0,245,160,0.3)' : 'rgba(255,255,255,0.1)'}`,
                  color: anime.airing ? '#00f5a0' : '#94a3b8',
                  fontFamily: "'Outfit', sans-serif", fontSize: '12px', fontWeight: 600,
                }}>{formatStatus(anime.status)}</span>
                {anime.type && (
                  <span style={{
                    padding: '4px 12px', borderRadius: '20px',
                    background: 'rgba(6,182,212,0.1)',
                    border: '1px solid rgba(6,182,212,0.2)',
                    color: '#06b6d4',
                    fontFamily: "'Outfit', sans-serif", fontSize: '12px', fontWeight: 600,
                  }}>{anime.type}</span>
                )}
                {anime.rating && (
                  <span style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '11px', color: '#475569',
                  }}>{anime.rating}</span>
                )}
              </div>
            </div>

            {/* Stats grid */}
            <div className="stats-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px', marginBottom: '28px',
            }}>
              {stats.map(stat => (
                <div
                  key={stat.label}
                  className="stat-card"
                  style={{
                    background: '#12121a',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '12px', padding: '14px 16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <span style={{ color: stat.color }}>{stat.icon}</span>
                    <span style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '11px', color: '#475569',
                      textTransform: 'uppercase', letterSpacing: '0.08em',
                    }}>{stat.label}</span>
                  </div>
                  <p style={{
                    margin: 0,
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '18px', fontWeight: 700,
                    color: stat.color,
                  }}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Genres */}
            {allGenres.length > 0 && (
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{
                  margin: '0 0 12px',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px', fontWeight: 600,
                  color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em',
                }}>Genres & Themes</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {allGenres.map(g => (
                    <span
                      key={g.mal_id}
                      className="genre-tag"
                      style={{
                        padding: '5px 14px', borderRadius: '20px',
                        background: 'rgba(139,92,246,0.1)',
                        border: '1px solid rgba(139,92,246,0.25)',
                        color: '#a78bfa',
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '12px', fontWeight: 500,
                      }}
                    >{g.name}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Studios */}
            {anime.studios?.length > 0 && (
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{
                  margin: '0 0 12px',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px', fontWeight: 600,
                  color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em',
                }}>Studios</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {anime.studios.map(s => (
                    <span key={s.mal_id} style={{
                      padding: '5px 14px', borderRadius: '20px',
                      background: 'rgba(236,72,153,0.1)',
                      border: '1px solid rgba(236,72,153,0.2)',
                      color: '#f472b6',
                      fontFamily: "'Outfit', sans-serif", fontSize: '12px', fontWeight: 500,
                    }}>{s.name}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Synopsis */}
            {anime.synopsis && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{
                  margin: '0 0 12px',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px', fontWeight: 600,
                  color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em',
                }}>Synopsis</h3>
                <p style={{
                  margin: 0,
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '15px', lineHeight: '1.8',
                  color: '#94a3b8',
                }}>
                  {synopsisExpanded ? anime.synopsis : shortSynopsis}
                </p>
                {anime.synopsis.length > SYNOPSIS_LIMIT && (
                  <button
                    onClick={() => setSynopsisExpanded(e => !e)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: '#00f5a0', fontFamily: "'Outfit', sans-serif",
                      fontSize: '14px', fontWeight: 600,
                      padding: '8px 0 0', marginTop: '4px',
                    }}
                  >
                    {synopsisExpanded ? 'Show Less' : 'Read More'}
                  </button>
                )}
              </div>
            )}

            {/* Characters */}
            <div style={{ marginBottom: '32px' }}>
              <CharactersSection animeId={anime.mal_id} />
            </div>

            {/* Recommendations */}
            <RecommendationsSection animeId={anime.mal_id} />
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {trailerOpen && anime.trailer?.youtube_id && (
        <div
          onClick={() => setTrailerOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <style>{`@keyframes fadeIn { from { opacity:0 } to { opacity:1 } }`}</style>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: '900px',
              borderRadius: '16px', overflow: 'hidden',
              boxShadow: '0 40px 80px rgba(0,0,0,0.8)',
              position: 'relative',
              animation: 'scaleIn 0.25s ease',
            }}
          >
            <style>{`@keyframes scaleIn { from { transform:scale(0.92); opacity:0 } to { transform:scale(1); opacity:1 } }`}</style>
            <div style={{ position: 'relative', paddingTop: '56.25%', background: '#000' }}>
              <iframe
                src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}?autoplay=1`}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
            <button
              onClick={() => setTrailerOpen(false)}
              style={{
                position: 'absolute', top: '-14px', right: '-14px',
                width: '36px', height: '36px', borderRadius: '50%',
                background: '#1a1a26', border: '1px solid rgba(255,255,255,0.15)',
                cursor: 'pointer', color: '#e2e8f0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
