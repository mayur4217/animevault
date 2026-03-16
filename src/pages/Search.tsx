import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, Sparkles, SlidersHorizontal } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { AnimeGrid } from '../components/anime/AnimeGrid';
import { useAnime } from '../hooks/useAnime';
import { useDebounce } from '../hooks/useDebounce';


const SORT_OPTIONS = [
  { label: 'Relevance', value: '', sortDir: '' },
  { label: 'Score ↓', value: 'score', sortDir: 'desc' },
  { label: 'Score ↑', value: 'score', sortDir: 'asc' },
  { label: 'Popularity', value: 'popularity', sortDir: 'asc' },
  { label: 'Newest', value: 'start_date', sortDir: 'desc' },
];

export const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputVal, setInputVal] = useState(searchParams.get('q') || '');
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [sortIdx, setSortIdx] = useState(0);
  const [showSort, setShowSort] = useState(false);

  const debouncedInput = useDebounce(inputVal, 500);

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setQuery(q);
    setInputVal(q);
  }, [searchParams]);

  // Auto-search as user types (debounced)
  useEffect(() => {
    if (debouncedInput.trim() && debouncedInput !== query) {
      setSearchParams({ q: debouncedInput.trim() });
    }
  }, [debouncedInput]);

  const sortOpt = SORT_OPTIONS[sortIdx];

  const { anime, loading, error, page, totalPages, hasNextPage, setPage, refetch } = useAnime({
    mode: query ? 'search' : 'top',
    query,
    orderBy: sortOpt.value || undefined,
    sort: sortOpt.sortDir || undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) setSearchParams({ q: inputVal.trim() });
  };

  const handlePopular = (term: string) => {
    setInputVal(term);
    setSearchParams({ q: term });
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: '88px', paddingBottom: '60px' }}>
      <Container>
        {/* Search header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            margin: '0 0 24px',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(40px, 6vw, 64px)',
            color: '#f1f5f9', letterSpacing: '0.03em', lineHeight: 1,
          }}>
            SEARCH <span style={{ color: '#00f5a0' }}>ANIME</span>
          </h1>

          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'flex', gap: '12px',
              background: '#12121a',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px', padding: '8px',
            }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <SearchIcon size={18} style={{
                  position: 'absolute', left: '16px', top: '50%',
                  transform: 'translateY(-50%)', color: '#475569',
                  pointerEvents: 'none',
                }} />
                <input
                  type="text"
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  placeholder="Search by title, genre, studio…"
                  style={{
                    width: '100%', paddingLeft: '48px',
                    paddingTop: '12px', paddingBottom: '12px', paddingRight: '16px',
                    background: 'none', border: 'none',
                    color: '#e2e8f0',
                    fontFamily: "'Outfit', sans-serif", fontSize: '16px',
                    boxSizing: 'border-box', outline: 'none',
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  padding: '12px 28px', borderRadius: '10px',
                  background: 'linear-gradient(135deg, #00f5a0, #00d9f5)',
                  border: 'none', cursor: 'pointer',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '14px', fontWeight: 700,
                  color: '#0a0a0f',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  whiteSpace: 'nowrap',
                }}
              >
                <SearchIcon size={15} /> Search
              </button>
            </div>
          </form>

          {/* Popular searches */}
          {!query && (
            <div style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Sparkles size={14} color="#f59e0b" />
                <span style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '12px', color: '#475569',
                  textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600,
                }}>Popular searches</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {[
                  'Naruto', 'Attack on Titan', 'Demon Slayer', 'One Piece',
                  'Fullmetal Alchemist', 'Death Note', 'Jujutsu Kaisen', 'Bleach',
                ].map(term => (
                  <button
                    key={term}
                    onClick={() => handlePopular(term)}
                    style={{
                      padding: '6px 16px', borderRadius: '20px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#94a3b8', cursor: 'pointer',
                      fontFamily: "'Outfit', sans-serif", fontSize: '13px',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(0,245,160,0.08)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,245,160,0.2)';
                      (e.currentTarget as HTMLElement).style.color = '#00f5a0';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                      (e.currentTarget as HTMLElement).style.color = '#94a3b8';
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results header with sort */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            {query ? (
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '14px', color: '#475569', margin: 0 }}>
                Results for <span style={{ color: '#e2e8f0', fontWeight: 600 }}>"{query}"</span>
              </p>
            ) : (
              <h2 style={{
                margin: 0,
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '28px', color: '#94a3b8', letterSpacing: '0.05em',
              }}>ALL-TIME TOP RATED</h2>
            )}
          </div>

          {/* Sort dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowSort(s => !s)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 14px', borderRadius: '8px',
                background: showSort ? 'rgba(0,245,160,0.08)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${showSort ? 'rgba(0,245,160,0.25)' : 'rgba(255,255,255,0.1)'}`,
                color: showSort ? '#00f5a0' : '#94a3b8',
                cursor: 'pointer', fontFamily: "'Outfit', sans-serif", fontSize: '13px',
                transition: 'all 0.2s',
              }}
            >
              <SlidersHorizontal size={13} /> Sort: {SORT_OPTIONS[sortIdx].label}
            </button>
            {showSort && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 6px)', right: 0,
                background: '#1a1a26', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px', overflow: 'hidden',
                boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
                zIndex: 50, minWidth: '150px',
                animation: 'dropIn 0.15s ease',
              }}>
                <style>{`@keyframes dropIn { from { opacity:0; transform:translateY(-4px) } to { opacity:1; transform:translateY(0) } }`}</style>
                {SORT_OPTIONS.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => { setSortIdx(i); setShowSort(false); setPage(1); }}
                    style={{
                      width: '100%', padding: '9px 14px', background: i === sortIdx ? 'rgba(0,245,160,0.08)' : 'transparent',
                      border: 'none', cursor: 'pointer', color: i === sortIdx ? '#00f5a0' : '#94a3b8',
                      fontFamily: "'Outfit', sans-serif", fontSize: '13px', textAlign: 'left',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => { if (i !== sortIdx) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                    onMouseLeave={e => { if (i !== sortIdx) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
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
          emptyMessage={query ? `No results found for "${query}"` : 'No anime found.'}
        />
      </Container>
    </div>
  );
};


