# AnimeVault

A sleek, production-grade React anime browser powered by the [Jikan API](https://jikan.moe/) (unofficial MyAnimeList API).

## Features

- 🔥 **Trending Anime** — Currently airing shows ranked by popularity
- ⭐ **Top Rated** — All-time highest-scored anime
- 🔍 **Search** — Full-text search with popular suggestions
- 🎭 **Genre Filter** — Browse by genre with live filtering
- ❤️ **Favorites** — Save anime to a local favorites list (persisted in localStorage)
- 📄 **Pagination** — Smart pagination with ellipsis
- 📱 **Responsive** — Works on mobile, tablet, and desktop
- ✨ **Animations** — Staggered card entrances, hover effects, smooth transitions

## Tech Stack

- **React 18** + **TypeScript**
- **React Router v6** for navigation
- **Axios** for API requests
- **Vite** for fast builds
- **Jikan API v4** (free, no auth needed)

## Design

- Dark cinematic theme (deep charcoal `#0a0a0f`)
- Electric cyan/teal accent palette (`#00f5a0`, `#00d9f5`)
- **Bebas Neue** for display headings
- **Outfit** for body text
- **Space Mono** for stats and scores
- Noise texture overlay for depth

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── api/          animeApi.ts — Jikan API calls
├── components/
│   ├── anime/    AnimeCard, AnimeGrid, AnimeDetails
│   ├── layout/   Navbar, Container
│   └── ui/       Button, Loader
├── hooks/        useAnime, useAnimeDetails, useFavorites
├── pages/        Home, Search, AnimePage, TopAnime, Favorites
├── types/        anime.ts — TypeScript interfaces
└── utils/        format.ts — helper functions
```

## Notes

- The Jikan API has rate limits (~3 req/sec). A small delay is added between requests.
- Favorites are persisted via `localStorage`.
- No API key required.
