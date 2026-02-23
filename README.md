# Currency Converter

A fast, mobile-friendly currency converter built with React, TypeScript, and Vite. It lets you enter an amount in a base currency and instantly see converted values across multiple target currencies, with smart caching and a secure serverless proxy for live exchange rates.

## Features

- **Instant conversions** – Type an amount using a custom on-screen keypad and see results update in real time.
- **Multiple currency sets (tabs)** – Quickly switch between predefined groups of currencies (e.g. Americas, SEA+UK).
- **Base currency selector** – Choose which currency you're converting _from_; all other tab currencies are calculated relative to that base.
- **Smart rate fetching**
  - Uses a Vercel serverless function (`/api/rates`) as a secure proxy to the exchangerate.host `/live` endpoint.
  - API key is kept on the server only (never exposed to the browser).
  - TanStack Query handles caching, background refresh, and error states.
- **Local caching & fallbacks**
  - Recent rates are cached in `localStorage`.
  - On startup, the app seeds from cache when available.
  - If the network or API fails, it gracefully falls back to the last cached rates or hardcoded backup rates.
- **Responsive UI**
  - Mobile-first layout with large touch targets for keypad input.
  - Clean Tailwind CSS styling.
- **Helpful status indicators**
  - Banner shows when cached or fallback rates are in use.
  - "Last updated" timestamp for the current rates.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build tool:** Vite 7
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite`
- **Data fetching & caching:** TanStack Query v5
- **Serverless API proxy:** Vercel (`api/rates.ts`)
- **Exchange rates provider:** exchangerate.host `/live` endpoint
- **Package manager:** pnpm

## Architecture Overview

Key files and directories:

```text
currency-converter/
├── index.html
├── package.json
├── vite.config.ts
├── vercel.json                 # SPA routing + /api/* rewrite for Vercel
├── api/
│   └── rates.ts                # Vercel serverless function proxying exchangerate.host
├── src/
│   ├── main.tsx                # React entry point
│   ├── index.css               # Tailwind CSS entry
│   ├── App.tsx                 # App shell, state orchestration
│   ├── types/
│   │   └── currency.ts         # Currency-related types
│   ├── config/
│   │   └── tabs.ts             # Tab definitions, currency metadata, fallback rates
│   ├── lib/
│   │   ├── api.ts              # Fetches and parses rates from /api/rates
│   │   ├── conversion.ts       # Pure conversion & formatting helpers
│   │   └── storage.ts          # localStorage-based rate caching
│   ├── hooks/
│   │   └── useExchangeRates.ts # TanStack Query hook with cache + fallbacks
│   └── components/             # Presentational & small stateful components
│       ├── AmountDisplay.tsx
│       ├── BaseCurrencySelect.tsx
│       ├── CachedRatesBanner.tsx
│       ├── ConversionCard.tsx
│       ├── ConversionResults.tsx
│       ├── Keypad.tsx
│       ├── KeypadButton.tsx
│       ├── LastUpdated.tsx
│       └── TabSelector.tsx
├── PROGRESS.md                 # Detailed implementation notes & future ideas
├── international_currency_converter_spec.md
└── exchange_rate_API.md
```

For a more narrative walkthrough of the implementation phases and future ideas, see `PROGRESS.md`.

## Getting Started (Local Dev)

### Prerequisites

- Node.js 20+
- pnpm installed globally
- A free API key from [exchangerate.host](https://exchangerate.host/)

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root (this file is gitignored):

```bash
EXCHANGERATE_API_KEY=your_api_key_here
```

This key is only read by the serverless function in `api/rates.ts`.

### 3. Run the dev server

For local development with Vercel-style serverless functions, use `vercel dev` so that `/api/rates` is available:

```bash
# If you don't have Vercel CLI yet
npm install -g vercel

# From the project root
vercel dev
```

Then open the printed localhost URL (usually `http://localhost:3000`) in your browser.

Alternatively, you can run the standard Vite dev server, but `/api/rates` will only work if you also run a compatible backend or Vercel dev proxy:

```bash
pnpm dev
```

## Building for Production

To create an optimized production build:

```bash
pnpm build
```

You can preview the production build locally with:

```bash
pnpm preview
```

## Deploying

This project is designed to deploy smoothly to Vercel:

1. Push the repo to GitHub (done).
2. Create a new Vercel project from this repository.
3. In the Vercel project settings, add the `EXCHANGERATE_API_KEY` environment variable.
4. Deploy. Vercel will:
   - Build the frontend using `pnpm build`.
   - Deploy the `api/rates.ts` function as a serverless endpoint.

The `vercel.json` file already contains rewrites so that `/api/*` routes hit the serverless functions and all other routes serve the SPA.

## Development Notes & Roadmap

- See `PROGRESS.md` for a detailed list of completed phases and potential next steps:
  - UX polish (currency symbols, flags, dark mode, animations)
  - New features (more currencies, historical rates, presets)
  - Testing (unit tests for conversion & keypad logic, E2E tests)
  - Performance and bundle analysis

Contributions and ideas for enhancements are welcome.
