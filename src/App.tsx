import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Landing } from './pages/Landing';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { AnimePage } from './pages/AnimePage';
import { TopAnime } from './pages/TopAnime';
import { Favorites } from './pages/Favorites';
import { Watchlist } from './pages/Watchlist';
import { ScrollToTop } from './components/ui/ScrollToTop';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page — no navbar */}
        <Route path="/" element={<Landing />} />

        {/* App pages — with navbar */}
        <Route path="/*" element={
          <div style={{ background: '#0a0a0f', minHeight: '100vh', color: '#e2e8f0' }}>
            <Navbar />
            <Routes>
              <Route path="/browse" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/anime/:id" element={<AnimePage />} />
              <Route path="/top" element={<TopAnime />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/watchlist" element={<Watchlist />} />
            </Routes>
            <ScrollToTop />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
