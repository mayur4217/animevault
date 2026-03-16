import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Star, Zap, Search, BookOpen } from 'lucide-react';

const FEATURED = [
  {
    id: 38000,
    title: 'Demon Slayer',
    subtitle: 'Kimetsu no Yaiba',
    genre: 'Action · Supernatural',
    score: '8.7',
    year: '2019',
    color: '#e05c1a',
    img: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg',
  },
  {
    id: 16498,
    title: 'Attack on Titan',
    subtitle: 'Shingeki no Kyojin',
    genre: 'Action · Dark Fantasy',
    score: '9.0',
    year: '2013',
    color: '#6b2c2c',
    img: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
  },
  {
    id: 41467,
    title: 'Jujutsu Kaisen',
    subtitle: 'Sorcery Fight',
    genre: 'Action · Supernatural',
    score: '8.6',
    year: '2020',
    color: '#1e2a6b',
    img: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
  },
  {
    id: 5114,
    title: 'Fullmetal Alchemist',
    subtitle: 'Brotherhood',
    genre: 'Adventure · Fantasy',
    score: '9.1',
    year: '2009',
    color: '#7a4f00',
    img: 'https://cdn.myanimelist.net/images/anime/1223/96541l.jpg',
  },
];

const STATS = [
  { value: '20,000+', label: 'Anime Titles' },
  { value: '50M+', label: 'Ratings' },
  { value: '10K+', label: 'Studios' },
  { value: '1990s', label: 'Archive Depth' },
];

const FEATURES = [
  { icon: <Zap size={20} />, title: 'Trending Now', desc: 'Live seasonal picks updated daily from MyAnimeList rankings.', to: '/browse', color: '#00f5a0' },
  { icon: <Star size={20} />, title: 'Top Rated', desc: 'All-time greats, sorted by community score and critical acclaim.', to: '/top', color: '#f59e0b' },
  { icon: <Search size={20} />, title: 'Deep Search', desc: 'Find any title by name, genre, studio, or year with live results.', to: '/search', color: '#06b6d4' },
  { icon: <BookOpen size={20} />, title: 'My Watchlist', desc: 'Track every series — watching, completed, plan to watch, dropped.', to: '/watchlist', color: '#a78bfa' },
];

export const Landing: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number) => {
    if (idx === activeIdx) return;
    setTransitioning(true);
    setTimeout(() => {
      setActiveIdx(idx);
      setTransitioning(false);
    }, 350);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setActiveIdx(i => (i + 1) % FEATURED.length);
        setTransitioning(false);
      }, 350);
    }, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const active = FEATURED[activeIdx];

  return (
    <div style={{ minHeight: '100vh', background: '#07070e', color: '#e2e8f0', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

        * { box-sizing: border-box; }

        @keyframes heroIn {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes grain {
          0%,100% { transform: translate(0,0) }
          10%  { transform: translate(-2%,-3%) }
          20%  { transform: translate(3%,2%) }
          30%  { transform: translate(-1%,3%) }
          40%  { transform: translate(2%,-2%) }
          50%  { transform: translate(-3%,1%) }
          60%  { transform: translate(1%,3%) }
          70%  { transform: translate(-2%,-1%) }
          80%  { transform: translate(3%,2%) }
          90%  { transform: translate(-1%,-3%) }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes scroll-hint {
          0%,100% { transform: translateY(0); opacity: 0.5; }
          50%     { transform: translateY(6px); opacity: 1; }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-12px); }
        }
        @keyframes stat-in {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hero-text-enter { animation: fadeSlide 0.45s ease both; }
        .feature-card:hover .feature-arrow { transform: translateX(4px); }
        .feature-card { transition: all 0.25s ease; }
        .feature-card:hover { transform: translateY(-5px); border-color: var(--card-accent) !important; box-shadow: 0 20px 50px rgba(0,0,0,0.4) !important; }

        .poster-thumb { transition: all 0.25s ease; cursor: pointer; }
        .poster-thumb:hover { transform: scale(1.04) translateY(-2px); }

        .cta-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(0,245,160,0.35) !important; }
        .cta-secondary:hover { background: rgba(255,255,255,0.08) !important; }
        .cta-primary, .cta-secondary { transition: all 0.2s ease; }
      `}</style>

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>

        {/* Backdrop image */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `url(${active.img})`,
          backgroundSize: 'cover', backgroundPosition: 'center 20%',
          filter: 'blur(60px) saturate(0.7)',
          opacity: transitioning ? 0 : 0.18,
          transition: 'opacity 0.4s ease',
          transform: 'scale(1.1)',
        }} />

        {/* Gradient overlays */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(135deg, rgba(7,7,14,0.97) 40%, rgba(7,7,14,0.7) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '300px', zIndex: 2, background: 'linear-gradient(to top, #07070e, transparent)' }} />

        {/* Film-grain overlay */}
        <div style={{
          position: 'absolute', inset: '-50%', zIndex: 3, pointerEvents: 'none',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
          animation: 'grain 0.5s steps(1) infinite',
          opacity: 0.35,
        }} />

        {/* Accent color glow */}
        <div style={{
          position: 'absolute', top: '20%', right: '15%', zIndex: 1,
          width: '600px', height: '600px', borderRadius: '50%',
          background: `radial-gradient(circle, ${active.color}22 0%, transparent 70%)`,
          transition: 'background 1s ease',
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '120px 40px 80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '80px', flexWrap: 'wrap' }}>

            {/* Left: text */}
            <div style={{ flex: '1 1 480px', maxWidth: '640px' }}>

              {/* Badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(0,245,160,0.07)', border: '1px solid rgba(0,245,160,0.2)',
                borderRadius: '20px', padding: '6px 16px', marginBottom: '28px',
                animation: 'heroIn 0.6s ease both',
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#00f5a0', boxShadow: '0 0 8px #00f5a0', display: 'inline-block' }} />
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: '#00f5a0', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Live Seasonal Data</span>
              </div>

              {/* Headline */}
              <h1 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(60px, 9vw, 120px)',
                lineHeight: 0.92, letterSpacing: '0.02em',
                color: '#f8fafc', margin: '0 0 24px',
                animation: 'heroIn 0.6s 0.1s ease both',
              }}>
                YOUR<br />
                ANIME<br />
                <span style={{ color: '#00f5a0', WebkitTextStroke: '1px rgba(0,245,160,0.3)' }}>UNIVERSE</span>
              </h1>

              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '17px', lineHeight: '1.7', color: '#64748b',
                margin: '0 0 40px', maxWidth: '460px',
                animation: 'heroIn 0.6s 0.2s ease both',
              }}>
                Discover trending shows, track your watchlist, explore 20,000+ titles — all powered by MyAnimeList in real time.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', animation: 'heroIn 0.6s 0.3s ease both' }}>
                <Link to="/browse" style={{ textDecoration: 'none' }}>
                  <button className="cta-primary" style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '14px 32px', borderRadius: '12px',
                    background: 'linear-gradient(135deg, #00f5a0, #00d9f5)',
                    border: 'none', cursor: 'pointer',
                    fontFamily: "'Outfit', sans-serif", fontSize: '15px', fontWeight: 700,
                    color: '#07070e',
                    boxShadow: '0 6px 24px rgba(0,245,160,0.25)',
                  }}>
                    Explore Now <ArrowRight size={16} />
                  </button>
                </Link>
                <Link to="/search" style={{ textDecoration: 'none' }}>
                  <button className="cta-secondary" style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '14px 28px', borderRadius: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    cursor: 'pointer',
                    fontFamily: "'Outfit', sans-serif", fontSize: '15px', fontWeight: 500,
                    color: '#94a3b8',
                  }}>
                    <Search size={15} /> Search Titles
                  </button>
                </Link>
              </div>
            </div>

            {/* Right: featured card stack */}
            <div style={{ flex: '0 0 auto', animation: 'heroIn 0.7s 0.2s ease both' }}>
              <div style={{ position: 'relative', width: '320px' }}>

                {/* Floating card */}
                <div style={{
                  borderRadius: '20px', overflow: 'hidden',
                  boxShadow: `0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.07), 0 0 60px ${active.color}33`,
                  transition: 'box-shadow 0.8s ease',
                  animation: 'float 6s ease-in-out infinite',
                }}>
                  <div style={{ position: 'relative', paddingTop: '142%' }}>
                    <img
                      src={active.img}
                      alt={active.title}
                      style={{
                        position: 'absolute', inset: 0,
                        width: '100%', height: '100%', objectFit: 'cover',
                        opacity: transitioning ? 0 : 1,
                        transition: 'opacity 0.35s ease',
                      }}
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(7,7,14,0.95) 0%, rgba(7,7,14,0.1) 50%, transparent 100%)',
                    }} />
                    {/* Info overlay */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px' }}>
                      <p key={`sub-${activeIdx}`} className="hero-text-enter" style={{ margin: '0 0 4px', fontFamily: "'Space Mono', monospace", fontSize: '10px', color: '#00f5a0', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        {active.genre}
                      </p>
                      <h3 key={`title-${activeIdx}`} className="hero-text-enter" style={{ margin: '0 0 8px', fontFamily: "'Bebas Neue', sans-serif", fontSize: '26px', color: '#f8fafc', letterSpacing: '0.03em' }}>
                        {active.title}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: "'Space Mono', monospace", fontSize: '13px', color: '#f59e0b', fontWeight: 700 }}>
                          <Star size={12} fill="#f59e0b" color="#f59e0b" /> {active.score}
                        </span>
                        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '12px', color: '#475569' }}>{active.year}</span>
                      </div>
                    </div>
                    {/* Play button */}
                    <Link to={`/anime/${active.id}`} style={{ textDecoration: 'none' }}>
                      <div style={{
                        position: 'absolute', top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '56px', height: '56px', borderRadius: '50%',
                        background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer',
                        opacity: 0.85,
                        transition: 'opacity 0.2s, transform 0.2s',
                      }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'translate(-50%,-50%) scale(1.08)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; (e.currentTarget as HTMLElement).style.transform = 'translate(-50%,-50%) scale(1)'; }}
                      >
                        <Play size={20} color="#fff" fill="#fff" />
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Thumbnail strip */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '14px', justifyContent: 'center' }}>
                  {FEATURED.map((f, i) => (
                    <div
                      key={f.id}
                      className="poster-thumb"
                      onClick={() => { if (intervalRef.current) clearInterval(intervalRef.current); goTo(i); }}
                      style={{
                        width: i === activeIdx ? '52px' : '42px',
                        height: '58px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: `2px solid ${i === activeIdx ? '#00f5a0' : 'rgba(255,255,255,0.07)'}`,
                        opacity: i === activeIdx ? 1 : 0.5,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <img src={f.img} alt={f.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', color: '#334155', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: 1, height: '28px', background: 'linear-gradient(to bottom, #334155, transparent)', animation: 'scroll-hint 1.8s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ─── STATS ─────────────────────────────────────────── */}
      <section style={{ position: 'relative', padding: '80px 40px', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '40px' }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ textAlign: 'center', animation: `stat-in 0.5s ${i * 0.1}s ease both` }}>
              <p style={{ margin: '0 0 6px', fontFamily: "'Bebas Neue', sans-serif", fontSize: '48px', color: '#f8fafc', letterSpacing: '0.03em', lineHeight: 1 }}>{s.value}</p>
              <p style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontSize: '13px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURES ─────────────────────────────────────── */}
      <section style={{ padding: '100px 40px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ marginBottom: '60px' }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: '#00f5a0', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>Everything You Need</p>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(36px, 5vw, 64px)', color: '#f8fafc', letterSpacing: '0.03em', margin: 0, lineHeight: 1 }}>
            BUILT FOR ANIME<br /><span style={{ color: '#00f5a0' }}>OBSESSIVES</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {FEATURES.map(f => (
            <Link key={f.to} to={f.to} style={{ textDecoration: 'none' }}>
              <div
                className="feature-card"
                // @ts-ignore
                style={{ '--card-accent': f.color, background: '#0e0e1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px', padding: '28px', height: '100%' } as React.CSSProperties}
              >
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: `${f.color}18`, border: `1px solid ${f.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: f.color, marginBottom: '20px',
                }}>
                  {f.icon}
                </div>
                <h3 style={{ margin: '0 0 10px', fontFamily: "'Outfit', sans-serif", fontSize: '16px', fontWeight: 700, color: '#e2e8f0' }}>{f.title}</h3>
                <p style={{ margin: '0 0 20px', fontFamily: "'Outfit', sans-serif", fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>{f.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: f.color, fontFamily: "'Outfit', sans-serif", fontSize: '13px', fontWeight: 600 }}>
                  <span>Explore</span>
                  <ArrowRight size={13} className="feature-arrow" style={{ transition: 'transform 0.2s' }} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────────────── */}
      <section style={{ padding: '0 40px 100px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{
          borderRadius: '24px', overflow: 'hidden', position: 'relative',
          background: 'linear-gradient(135deg, #0e1f1a 0%, #0e0e1a 50%, #1a0e1a 100%)',
          border: '1px solid rgba(0,245,160,0.12)',
          padding: '60px 48px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px',
        }}>
          {/* decorative rings */}
          <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '360px', height: '360px', borderRadius: '50%', border: '1px solid rgba(0,245,160,0.06)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '260px', height: '260px', borderRadius: '50%', border: '1px solid rgba(0,245,160,0.1)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 0, right: 0, width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,245,160,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ margin: '0 0 12px', fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 4vw, 52px)', color: '#f8fafc', letterSpacing: '0.03em', lineHeight: 1 }}>
              START WATCHING.<br />START <span style={{ color: '#00f5a0' }}>TRACKING.</span>
            </h2>
            <p style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontSize: '15px', color: '#475569', maxWidth: '420px' }}>
              No sign-up required. Your watchlist is stored locally — just open AnimeVault and go.
            </p>
          </div>
          <Link to="/browse" style={{ textDecoration: 'none', position: 'relative', zIndex: 1, flexShrink: 0 }}>
            <button className="cta-primary" style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '16px 36px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #00f5a0, #00d9f5)',
              border: 'none', cursor: 'pointer',
              fontFamily: "'Outfit', sans-serif", fontSize: '16px', fontWeight: 700,
              color: '#07070e',
              boxShadow: '0 6px 24px rgba(0,245,160,0.25)',
            }}>
              Browse Trending <ArrowRight size={17} />
            </button>
          </Link>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.04)', padding: '32px 40px', textAlign: 'center' }}>
        <p style={{ margin: 0, fontFamily: "'Space Mono', monospace", fontSize: '11px', color: '#1e293b', letterSpacing: '0.1em' }}>
          ANIMEVAULT · DATA BY MYANIMELIST · JIKAN API
        </p>
      </footer>
    </div>
  );
};
