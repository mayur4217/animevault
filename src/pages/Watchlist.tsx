import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Eye, Check, X, Star } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { useWatchlist, STATUS_COLORS, type WatchStatus } from '../hooks/useWatchlist';
import { WatchlistButton } from '../components/ui/WatchlistButton';
import { formatScore, getScoreColor } from '../utils/format';

const TABS: { key: WatchStatus | 'all'; label: string; icon: React.ReactNode }[] = [
  { key: 'all', label: 'All', icon: <BookOpen size={14} /> },
  { key: 'watching', label: 'Watching', icon: <Eye size={14} /> },
  { key: 'completed', label: 'Completed', icon: <Check size={14} /> },
  { key: 'plan_to_watch', label: 'Plan to Watch', icon: <BookOpen size={14} /> },
  { key: 'dropped', label: 'Dropped', icon: <X size={14} /> },
];

export const Watchlist: React.FC = () => {
  const { entries } = useWatchlist();
  const [activeTab, setActiveTab] = useState<WatchStatus | 'all'>('all');

  const filtered = activeTab === 'all'
    ? entries
    : entries.filter(e => e.status === activeTab);

  const counts = {
    all: entries.length,
    watching: entries.filter(e => e.status === 'watching').length,
    completed: entries.filter(e => e.status === 'completed').length,
    plan_to_watch: entries.filter(e => e.status === 'plan_to_watch').length,
    dropped: entries.filter(e => e.status === 'dropped').length,
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: '88px', paddingBottom: '60px' }}>
      <Container>
        {/* Header */}
        <div style={{ marginBottom: '40px', paddingBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(139,92,246,0.08)',
            border: '1px solid rgba(139,92,246,0.2)',
            borderRadius: '20px', padding: '6px 16px', marginBottom: '16px',
          }}>
            <BookOpen size={14} color="#a78bfa" />
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '12px', fontWeight: 600, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>My Anime List</span>
          </div>
          <h1 style={{
            margin: '0 0 8px',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(40px, 6vw, 72px)',
            color: '#f1f5f9', lineHeight: '1', letterSpacing: '0.03em',
          }}>
            MY <span style={{ color: '#a78bfa' }}>WATCHLIST</span>
          </h1>
          <p style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontSize: '15px', color: '#475569' }}>
            {entries.length} {entries.length === 1 ? 'series' : 'series'} tracked
          </p>
        </div>

        {entries.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px 20px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'rgba(139,92,246,0.08)',
              border: '1px solid rgba(139,92,246,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <BookOpen size={32} color="#a78bfa" />
            </div>
            <h2 style={{ margin: 0, fontFamily: "'Bebas Neue'", fontSize: '28px', color: '#334155', letterSpacing: '0.05em' }}>NO ANIME TRACKED YET</h2>
            <p style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontSize: '15px', color: '#475569', maxWidth: '320px' }}>
              Open any anime page and use "Add to List" to start tracking what you're watching.
            </p>
            <Link to="/" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '10px 24px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
              border: 'none', cursor: 'pointer',
              fontFamily: "'Outfit', sans-serif", fontSize: '14px', fontWeight: 600,
              color: '#fff', textDecoration: 'none', marginTop: '8px',
            }}>
              Browse Anime
            </Link>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
              {TABS.map(tab => {
                const isActive = activeTab === tab.key;
                const count = counts[tab.key];
                const colors = tab.key !== 'all' ? STATUS_COLORS[tab.key as WatchStatus] : null;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '7px',
                      padding: '8px 16px', borderRadius: '20px',
                      background: isActive
                        ? (colors ? colors.bg : 'rgba(139,92,246,0.12)')
                        : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${isActive
                        ? (colors ? colors.border : 'rgba(139,92,246,0.35)')
                        : 'rgba(255,255,255,0.08)'}`,
                      color: isActive
                        ? (colors ? colors.text : '#a78bfa')
                        : '#64748b',
                      cursor: 'pointer',
                      fontFamily: "'Outfit', sans-serif", fontSize: '13px', fontWeight: isActive ? 600 : 400,
                      transition: 'all 0.2s',
                    }}
                  >
                    {tab.icon}
                    {tab.label}
                    <span style={{
                      background: isActive ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)',
                      borderRadius: '10px', padding: '1px 7px', fontSize: '11px',
                    }}>{count}</span>
                  </button>
                );
              })}
            </div>

            {/* List */}
            {filtered.length === 0 ? (
              <p style={{ color: '#475569', fontFamily: "'Outfit', sans-serif", fontSize: '15px' }}>
                No anime in this category yet.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filtered.map(entry => {
                  const anime = entry.anime;
                  const title = anime.title_english || anime.title;
                  const scoreColor = getScoreColor(anime.score);
                  return (
                    <div
                      key={anime.mal_id}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '16px',
                        background: '#12121a',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: '14px', padding: '12px 16px',
                        transition: 'border-color 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(139,92,246,0.2)')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
                    >
                      {/* Poster */}
                      <Link to={`/anime/${anime.mal_id}`}>
                        <img
                          src={anime.images.webp?.image_url || anime.images.jpg.image_url}
                          alt={title}
                          style={{
                            width: '48px', height: '68px',
                            objectFit: 'cover', borderRadius: '8px',
                            flexShrink: 0,
                          }}
                        />
                      </Link>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <Link to={`/anime/${anime.mal_id}`} style={{ textDecoration: 'none' }}>
                          <h3 style={{
                            margin: '0 0 4px',
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: '14px', fontWeight: 600, color: '#e2e8f0',
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          }}>{title}</h3>
                        </Link>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                          {anime.score && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: "'Space Mono', monospace", fontSize: '12px', color: scoreColor }}>
                              <Star size={11} fill={scoreColor} color={scoreColor} />{formatScore(anime.score)}
                            </span>
                          )}
                          {anime.type && (
                            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '12px', color: '#475569' }}>
                              {anime.type}{anime.episodes ? ` · ${anime.episodes} eps` : ''}
                            </span>
                          )}
                          {anime.year && (
                            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: '#334155' }}>{anime.year}</span>
                          )}
                        </div>
                      </div>

                      {/* Status badge + change button */}
                      <div style={{ flexShrink: 0 }}>
                        <WatchlistButton anime={anime} compact />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};
