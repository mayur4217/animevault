import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Check, Eye, X, ChevronDown } from 'lucide-react';
import type { Anime } from '../../types/anime';
import { useWatchlist, STATUS_LABELS, STATUS_COLORS, type WatchStatus } from '../../hooks/useWatchlist';

interface WatchlistButtonProps {
  anime: Anime;
  compact?: boolean;
}

const STATUS_ICONS: Record<WatchStatus, React.ReactNode> = {
  watching: <Eye size={13} />,
  completed: <Check size={13} />,
  plan_to_watch: <BookOpen size={13} />,
  dropped: <X size={13} />,
};

const ALL_STATUSES: WatchStatus[] = ['watching', 'completed', 'plan_to_watch', 'dropped'];

export const WatchlistButton: React.FC<WatchlistButtonProps> = ({ anime, compact = false }) => {
  const { getStatus, setStatus, removeFromWatchlist } = useWatchlist();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const status = getStatus(anime.mal_id);
  const colors = status ? STATUS_COLORS[status] : null;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: compact ? '6px 12px' : '10px 18px',
          borderRadius: '10px',
          background: colors ? colors.bg : 'rgba(255,255,255,0.05)',
          border: `1px solid ${colors ? colors.border : 'rgba(255,255,255,0.12)'}`,
          color: colors ? colors.text : '#94a3b8',
          cursor: 'pointer',
          fontFamily: "'Outfit', sans-serif",
          fontSize: compact ? '12px' : '14px',
          fontWeight: 600,
          transition: 'all 0.2s',
          whiteSpace: 'nowrap',
        }}
      >
        {status ? STATUS_ICONS[status] : <BookOpen size={compact ? 12 : 14} />}
        {!compact && (status ? STATUS_LABELS[status] : 'Add to List')}
        <ChevronDown size={compact ? 11 : 13} style={{ opacity: 0.6, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          left: 0,
          zIndex: 100,
          background: '#1a1a26',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
          minWidth: '180px',
          animation: 'dropIn 0.15s ease',
        }}>
          <style>{`@keyframes dropIn { from { opacity:0; transform:translateY(-6px) } to { opacity:1; transform:translateY(0) } }`}</style>
          {ALL_STATUSES.map(s => {
            const c = STATUS_COLORS[s];
            const isActive = status === s;
            return (
              <button
                key={s}
                onClick={() => { setStatus(anime, s); setOpen(false); }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 14px', background: isActive ? c.bg : 'transparent',
                  border: 'none', cursor: 'pointer', color: isActive ? c.text : '#94a3b8',
                  fontFamily: "'Outfit', sans-serif", fontSize: '13px', fontWeight: isActive ? 600 : 400,
                  textAlign: 'left', transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <span style={{ color: c.text }}>{STATUS_ICONS[s]}</span>
                {STATUS_LABELS[s]}
                {isActive && <Check size={12} style={{ marginLeft: 'auto', color: c.text }} />}
              </button>
            );
          })}
          {status && (
            <>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />
              <button
                onClick={() => { removeFromWatchlist(anime.mal_id); setOpen(false); }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 14px', background: 'transparent',
                  border: 'none', cursor: 'pointer', color: '#64748b',
                  fontFamily: "'Outfit', sans-serif", fontSize: '13px',
                  textAlign: 'left', transition: 'all 0.15s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#ef4444'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#64748b'; }}
              >
                <X size={13} /> Remove from List
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
