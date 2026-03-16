import React from 'react';
import type { Anime } from '../../types/anime';
import { AnimeCard } from './AnimeCard';
import { Loader } from '../ui/Loader';
import { Button } from '../ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AnimeGridProps {
  anime: Anime[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
  onRetry?: () => void;
  emptyMessage?: string;
}

export const AnimeGrid: React.FC<AnimeGridProps> = ({
  anime,
  loading,
  error,
  page,
  totalPages,
  hasNextPage,
  onPageChange,
  onRetry,
  emptyMessage = 'No anime found.',
}) => {
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
        <Loader size="lg" text="Loading anime..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        textAlign: 'center', padding: '80px 0',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: 'rgba(255,78,106,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '28px',
        }}>⚠️</div>
        <p style={{ color: '#94a3b8', fontFamily: "'Outfit', sans-serif", margin: 0 }}>{error}</p>
        {onRetry && <Button variant="secondary" onClick={onRetry}>Try Again</Button>}
      </div>
    );
  }

  if (!anime.length) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <p style={{ color: '#475569', fontFamily: "'Outfit', sans-serif", fontSize: '16px' }}>
          {emptyMessage}
        </p>
      </div>
    );
  }

  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '20px',
      }}>
        {anime.map((item, i) => (
          <AnimeCard key={item.mal_id} anime={item} index={i} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          gap: '8px', marginTop: '48px', flexWrap: 'wrap',
        }}>
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              padding: '8px 16px', borderRadius: '8px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: page === 1 ? '#334155' : '#94a3b8',
              cursor: page === 1 ? 'not-allowed' : 'pointer',
              fontFamily: "'Outfit', sans-serif", fontSize: '14px',
              transition: 'all 0.2s',
            }}
          >
            <ChevronLeft size={15} /> Prev
          </button>

          {pageNumbers.map((p, idx) =>
            p === '...' ? (
              <span key={`dots-${idx}`} style={{ color: '#475569', padding: '0 4px' }}>…</span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(Number(p))}
                style={{
                  width: '40px', height: '40px', borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: p === page ? 'linear-gradient(135deg, #00f5a0, #00d9f5)' : 'rgba(255,255,255,0.04)',
                  border: p === page ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  color: p === page ? '#0a0a0f' : '#94a3b8',
                  cursor: 'pointer',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '13px', fontWeight: p === page ? 700 : 400,
                  transition: 'all 0.2s',
                }}
              >
                {p}
              </button>
            )
          )}

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={!hasNextPage}
            style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              padding: '8px 16px', borderRadius: '8px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: !hasNextPage ? '#334155' : '#94a3b8',
              cursor: !hasNextPage ? 'not-allowed' : 'pointer',
              fontFamily: "'Outfit', sans-serif", fontSize: '14px',
              transition: 'all 0.2s',
            }}
          >
            Next <ChevronRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
};

function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | '...')[] = [];
  pages.push(1);
  if (current > 3) pages.push('...');
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i);
  }
  if (current < total - 2) pages.push('...');
  pages.push(total);
  return pages;
}
