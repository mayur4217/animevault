import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { getAnimeRecommendations, type AnimeRecommendation } from '../../api/animeApi';

interface RecommendationsSectionProps {
  animeId: number;
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({ animeId }) => {
  const [recs, setRecs] = useState<AnimeRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAnimeRecommendations(animeId)
      .then(data => setRecs(data.slice(0, 8)))
      .catch(() => setRecs([]))
      .finally(() => setLoading(false));
  }, [animeId]);

  if (loading) {
    return (
      <div>
        <SectionHeader />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '12px' }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)', borderRadius: '12px',
              height: '180px', animation: 'pulse 1.5s ease-in-out infinite',
            }} />
          ))}
        </div>
        <style>{`@keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:.8} }`}</style>
      </div>
    );
  }

  if (!recs.length) return null;

  return (
    <div>
      <SectionHeader />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: '12px',
      }}>
        {recs.map(rec => (
          <RecCard key={rec.entry.mal_id} rec={rec} />
        ))}
      </div>
    </div>
  );
};

const SectionHeader: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
    <Sparkles size={14} color="#f59e0b" />
    <h3 style={{
      margin: 0,
      fontFamily: "'Outfit', sans-serif",
      fontSize: '11px', fontWeight: 600,
      color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em',
    }}>You Might Also Like</h3>
  </div>
);

const RecCard: React.FC<{ rec: AnimeRecommendation }> = ({ rec }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/anime/${rec.entry.mal_id}`}
      style={{ textDecoration: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        borderRadius: '10px', overflow: 'hidden',
        background: '#12121a',
        border: `1px solid ${hovered ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.06)'}`,
        transition: 'all 0.2s ease',
        transform: hovered ? 'translateY(-4px)' : 'none',
      }}>
        <div style={{ position: 'relative', paddingTop: '140%', overflow: 'hidden' }}>
          {!imgLoaded && <div style={{ position: 'absolute', inset: 0, background: 'rgba(245,158,11,0.04)' }} />}
          <img
            src={rec.entry.images.jpg.large_image_url || rec.entry.images.jpg.image_url}
            alt={rec.entry.title}
            onLoad={() => setImgLoaded(true)}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              opacity: imgLoaded ? 1 : 0,
              transition: 'opacity 0.3s, transform 0.3s',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(10,10,15,0.9) 0%, transparent 60%)',
            opacity: hovered ? 1 : 0.6,
            transition: 'opacity 0.2s',
          }} />
          <div style={{ position: 'absolute', bottom: '8px', left: '8px', right: '8px' }}>
            <p style={{
              margin: 0, fontSize: '11px',
              fontFamily: "'Outfit', sans-serif", fontWeight: 600,
              color: '#e2e8f0', lineHeight: 1.3,
            }}>
              {rec.entry.title.length > 30 ? rec.entry.title.slice(0, 28) + '…' : rec.entry.title}
            </p>
            {rec.votes > 0 && (
              <p style={{
                margin: '2px 0 0', fontSize: '9px',
                fontFamily: "'Space Mono', monospace",
                color: '#f59e0b',
              }}>{rec.votes} votes</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
