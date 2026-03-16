import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, Flame, Star, Menu, X, BookOpen } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchVal.trim())}`);
      setSearchVal('');
    }
  };

  const navLinks = [
    { to: '/browse', label: 'Trending', icon: <Flame size={15} /> },
    { to: '/top', label: 'Top Rated', icon: <Star size={15} /> },
    { to: '/watchlist', label: 'My List', icon: <BookOpen size={15} /> },
    { to: '/favorites', label: 'Favorites', icon: <Heart size={15} /> },
  ];

  return (
    <>
      <style>{`
        .nav-link { transition: all 0.2s ease; }
        .nav-link:hover { color: #00f5a0 !important; }
        .nav-link.active { color: #00f5a0 !important; }
        .search-input:focus { outline: none; border-color: #00f5a0 !important; box-shadow: 0 0 0 3px rgba(0,245,160,0.12) !important; }
        .logo-text { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.1em; }
        .hamburger { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
          .search-desktop { display: none !important; }
        }
      `}</style>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '0 24px',
        height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(10,10,15,0.95)' : 'rgba(10,10,15,0.7)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(0,245,160,0.1)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: 34, height: 34,
            background: 'linear-gradient(135deg, #00f5a0, #00d9f5)',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: "'Bebas Neue'", fontSize: '18px', color: '#0a0a0f' }}>A</span>
          </div>
          <span className="logo-text" style={{ fontSize: '24px', color: '#f1f5f9', fontWeight: 400 }}>
            ANIME<span style={{ color: '#00f5a0' }}>VAULT</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 16px', borderRadius: '8px',
                textDecoration: 'none',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '14px', fontWeight: 500,
                color: location.pathname === link.to ? '#00f5a0' : '#94a3b8',
                background: location.pathname === link.to ? 'rgba(0,245,160,0.08)' : 'transparent',
              }}
            >
              {link.icon}{link.label}
            </Link>
          ))}
        </div>

        {/* Desktop search */}
        <form className="search-desktop" onSubmit={handleSearch} style={{ display: 'flex' }}>
          <div style={{ position: 'relative' }}>
            <Search size={15} style={{
              position: 'absolute', left: '12px', top: '50%',
              transform: 'translateY(-50%)', color: '#64748b',
            }} />
            <input
              className="search-input"
              type="text"
              placeholder="Search anime…"
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              style={{
                paddingLeft: '36px', paddingRight: '16px',
                paddingTop: '8px', paddingBottom: '8px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px', color: '#e2e8f0',
                fontFamily: "'Outfit', sans-serif", fontSize: '14px',
                width: '220px', transition: 'all 0.2s ease',
              }}
            />
          </div>
        </form>

        {/* Mobile menu button */}
        <button
          className="hamburger"
          onClick={() => setMobileOpen(o => !o)}
          style={{
            background: 'none', border: 'none',
            color: '#e2e8f0', cursor: 'pointer',
            display: 'none', alignItems: 'center', justifyContent: 'center',
            padding: '8px',
          }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: '64px', left: 0, right: 0,
          background: 'rgba(10,10,15,0.98)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,245,160,0.1)',
          zIndex: 999, padding: '16px 24px 24px',
          display: 'flex', flexDirection: 'column', gap: '8px',
        }}>
          <form onSubmit={handleSearch} style={{ marginBottom: '8px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={15} style={{
                position: 'absolute', left: '12px', top: '50%',
                transform: 'translateY(-50%)', color: '#64748b',
              }} />
              <input
                className="search-input"
                type="text"
                placeholder="Search anime…"
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                style={{
                  width: '100%', paddingLeft: '36px', paddingRight: '16px',
                  paddingTop: '10px', paddingBottom: '10px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px', color: '#e2e8f0',
                  fontFamily: "'Outfit', sans-serif", fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </form>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '12px 16px', borderRadius: '10px',
                textDecoration: 'none',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '15px', fontWeight: 500,
                color: location.pathname === link.to ? '#00f5a0' : '#94a3b8',
                background: location.pathname === link.to ? 'rgba(0,245,160,0.08)' : 'transparent',
              }}
            >
              {link.icon}{link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
