# All-In — Crypto Market Tracker (Frontend)

A dashboard for tracking crypto prices. This repo is the **frontend only** — I'm splitting this project into separate repos as I build it out, backend comes later.

> **Heads up before you dig through the code:** this is a personal project, built with a lot of AI assistance (I'm a vibe coder). It's not production software. Some parts are mocked and I've listed exactly which ones below so nobody gets the wrong idea from browsing the code.

## What actually works right now

- Real-time-ish crypto prices (top coins by market cap) pulled from CoinGecko
- Coin detail page with a price chart, basic stats, and description
- Watchlist / favorites, saved in the browser's localStorage
- Coin search
- A blog/articles section (static content for now, not hooked up to a real CMS)
- Login & Register forms — **but read the note below before assuming this is real auth**

This is a tracker, nothing more. No buy/sell, no wallet connection, no exchange integration. Just numbers going up and down and a way to keep tabs on the ones you care about.

## What's not there yet

- **No backend.** Login and register are simulated in the frontend — a fake delay, then the "user" gets written to localStorage. There's no server validating anything, no real user database, no session tokens.
- **Profile is bare bones.** You can log in, but there's no real profile editing yet.
- **Running on CoinGecko's free tier.** No API key, which means it'll hit rate limits (429s) if you hammer it, and there's no retry or caching logic to soften that yet.
- **Crypto only, for now.** Stocks and commodities are on the roadmap but not built.
- **Barely any tests.** There's one test that checks the app mounts and the navbar shows up. That's it.
- **Not configured for different environments.** The API endpoint is hardcoded, no `.env` setup yet.

None of this is hidden intentionally — it's just where the project is at this point in time.

## Stack

- Vue 3 (Composition API)
- Vite
- Pinia for state
- Vue Router
- [lightweight-charts](https://github.com/tradingview/lightweight-charts) for the price charts
- [CoinGecko API](https://www.coingecko.com/en/api) (free/public tier) for market data

## Running it locally

```sh
npm install
npm run dev
```

Build:

```sh
npm run build
```

Tests:

```sh
npm run test:unit
```

## Folder layout

```
src/
├── components/    # UI pieces, grouped by feature (auth, chart, coin, market, ui)
├── composables/   # Shared logic — data fetching, chart setup, etc.
├── router/        # Route definitions
├── services/      # External API calls (CoinGecko, articles)
├── stores/        # Pinia stores (auth, favorites)
├── utils/         # Helpers — e.g. a small HTML sanitizer for coin descriptions
└── views/         # Page-level components
```

## What I'm planning next

- A real backend for auth (its own repo, not this one)
- An actual profile page
- Adding stocks and commodities as new asset types
- Reworking how favorites are stored so they can hold more than just crypto IDs
- More tests, especially around the stores and the sanitizer

## Why split into multiple repos instead of one?

Mostly so I can build and reason about each piece on its own while I'm still figuring things out, rather than dragging a half-finished backend around inside the same repo as a frontend that already works.

---

Personal learning project. If you spot something broken or have suggestions, open an issue.
