import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { getAnimeCharacters, type AnimeCharacter } from '../../api/animeApi';

interface CharactersSectionProps {
  animeId: number;
}

export const CharactersSection: React.FC<CharactersSectionProps> = ({ animeId }) => {
  const [characters, setCharacters] = useState<AnimeCharacter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAnimeCharacters(animeId)
      .then(data => setCharacters(data.slice(0, 12)))
      .catch(() => setCharacters([]))
      .finally(() => setLoading(false));
  }, [animeId]);

  if (loading) {
    return (
      <div>
        <SectionHeader />
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{
              flexShrink: 0, width: '90px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '12px', height: '140px',
              animation: 'pulse 1.5s ease-in-out infinite',
            }} />
          ))}
        </div>
        <style>{`@keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:.8} }`}</style>
      </div>
    );
  }

  if (!characters.length) return null;

  const mains = characters.filter(c => c.role === 'Main');
  const supporting = characters.filter(c => c.role !== 'Main');
  const display = [...mains, ...supporting].slice(0, 12);

  return (
    <div>
      <SectionHeader count={display.length} />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
        gap: '12px',
      }}>
        {display.map(c => (
          <CharacterCard key={c.character.mal_id} character={c} />
        ))}
      </div>
    </div>
  );
};

const SectionHeader: React.FC<{ count?: number }> = ({ count }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
    <Users size={14} color="#8b5cf6" />
    <h3 style={{
      margin: 0,
      fontFamily: "'Outfit', sans-serif",
      fontSize: '11px', fontWeight: 600,
      color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em',
    }}>Characters{count ? ` (${count})` : ''}</h3>
  </div>
);

const CharacterCard: React.FC<{ character: AnimeCharacter }> = ({ character: c }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const jaVA = c.voice_actors.find(va => va.language === 'Japanese');

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '12px', overflow: 'hidden',
        background: '#12121a',
        border: `1px solid ${hovered ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.06)'}`,
        transition: 'all 0.2s ease',
        transform: hovered ? 'translateY(-4px)' : 'none',
        cursor: 'default',
      }}
    >
      <div style={{ position: 'relative', paddingTop: '130%', overflow: 'hidden' }}>
        {!imgLoaded && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(139,92,246,0.05)',
          }} />
        )}
        <img
          src={c.character.images.jpg.image_url}
          alt={c.character.name}
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
        {c.role === 'Main' && (
          <div style={{
            position: 'absolute', top: '6px', left: '6px',
            background: 'rgba(139,92,246,0.8)',
            borderRadius: '4px', padding: '1px 5px',
            fontSize: '9px', fontFamily: "'Outfit', sans-serif",
            fontWeight: 700, color: '#fff', letterSpacing: '0.05em',
          }}>MAIN</div>
        )}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(10,10,15,0.95) 0%, transparent 60%)',
          opacity: hovered ? 1 : 0.7,
          transition: 'opacity 0.2s',
        }} />
        <div style={{
          position: 'absolute', bottom: '6px', left: '6px', right: '6px',
        }}>
          <p style={{
            margin: 0, fontSize: '10px',
            fontFamily: "'Outfit', sans-serif", fontWeight: 600,
            color: '#e2e8f0', lineHeight: 1.3,
          }}>{c.character.name}</p>
          {jaVA && (
            <p style={{
              margin: '2px 0 0', fontSize: '9px',
              fontFamily: "'Space Mono', monospace",
              color: '#a78bfa', opacity: 0.8,
            }}>{jaVA.person.name.split(', ').reverse().join(' ')}</p>
          )}
        </div>
      </div>
    </div>
  );
};
