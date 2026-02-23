# Currency Converter — Progress & Next Steps

## Completed

### Phase 1: Project Scaffolding
- [x] Vite + React + TypeScript project scaffolded
- [x] Dependencies installed: `react`, `react-dom`, `@tanstack/react-query`
- [x] Dev dependencies: `tailwindcss` v4, `@tailwindcss/vite`, `@vercel/node`
- [x] Tailwind CSS v4 configured via `@tailwindcss/vite` plugin (no PostCSS config needed)
- [x] `src/index.css` set to `@import "tailwindcss"`
- [x] Vite boilerplate removed (App.css, logos, default counter app)
- [x] `index.html` updated with "Currency Converter" title and theme-color meta tag
- [x] Production build verified (`pnpm build` succeeds)
- [x] TypeScript type check passes (`tsc --noEmit`)

### Phase 2: Types & Configuration
- [x] `src/types/currency.ts` — `CurrencyCode` union, `TabSet`, `Rates`, `ConversionResult` interfaces
- [x] `src/config/tabs.ts` — Two tab definitions (Americas, SEA+UK), currency names/decimals maps, hardcoded fallback rates, cache timing constants

### Phase 3: Vercel Serverless Proxy
- [x] `api/rates.ts` — Vercel serverless function that proxies exchangerate.host `/live` endpoint
  - Reads `EXCHANGERATE_API_KEY` from `process.env`
  - Sets `Cache-Control` and CORS headers
  - API key never exposed to frontend
- [x] `vercel.json` — SPA rewrite rules for `/api/*` and client-side routing
- [x] `.env.local` — Placeholder for local API key (gitignored via `*.local` pattern)

### Phase 4: Data Layer
- [x] `src/lib/storage.ts` — `getCachedRates()` / `setCachedRates()` via localStorage
- [x] `src/lib/api.ts` — `fetchRates()` calls `/api/rates`, parses `USDXXX` quote keys
- [x] `src/hooks/useExchangeRates.ts` — TanStack Query hook with:
  - 10min `staleTime`, 60min `gcTime`
  - Seeds `initialData` from localStorage
  - Persists fresh rates to localStorage on success
  - 3-tier fallback: query cache → localStorage → hardcoded rates
  - Exposes `isUsingCachedRates` / `isUsingFallbackRates` flags

### Phase 5: Business Logic
- [x] `src/lib/conversion.ts` — Pure functions:
  - `convert()` — single currency conversion using `amount × (rate_target / rate_base)`
  - `convertAll()` — converts to all tab currencies, excludes base
  - `formatCurrency()` — 2dp for most, 0dp for VND/COP
  - `formatRate()` — adaptive decimals (0dp if ≥100, 2dp if ≥1, 4dp if <1)

### Phase 6: UI Components (9 components)
- [x] `KeypadButton.tsx` — Styled button with `number`/`action` variants, large touch targets
- [x] `Keypad.tsx` — 3×4 grid + Clear button, `processInput()` validation (single decimal, max 2dp, max 12 chars, no leading zeros), keyboard listener (digits, backspace, period, escape)
- [x] `AmountDisplay.tsx` — Large text showing current amount + base currency code
- [x] `BaseCurrencySelect.tsx` — Dropdown filtered to active tab's currencies
- [x] `ConversionCard.tsx` — Card showing currency code, name, converted amount, exchange rate
- [x] `ConversionResults.tsx` — Maps results array to ConversionCard components
- [x] `TabSelector.tsx` — Two pill buttons, active tab highlighted in blue
- [x] `LastUpdated.tsx` — Formatted timestamp or "Loading rates..." / "Using fallback rates"
- [x] `CachedRatesBanner.tsx` — Amber banner for cached/fallback rate states

### Phase 7: App Shell
- [x] `App.tsx` — Full state orchestrator:
  - State: `activeTabId`, `amountString`, `baseCurrency`
  - `QueryClientProvider` wrapping
  - Tab switch resets base currency if current base isn't in new tab
  - Amount persists across tab switches
  - Layout: header → banner → tabs → amount → dropdown → results → keypad
- [x] `main.tsx` — Clean entry point with StrictMode

### Phase 8: Dev Environment
- [x] Vite dev proxy configured (`/api` → `localhost:3000` for `vercel dev`)
- [x] Dev server starts successfully (`pnpm dev`)

---

## File Structure
```
currency-converter/
├── index.html
├── package.json
├── vite.config.ts
├── vercel.json
├── .env.local                        ← API key (gitignored)
├── api/
│   └── rates.ts                      ← Vercel serverless proxy
├── src/
│   ├── main.tsx
│   ├── index.css
│   ├── App.tsx
│   ├── types/
│   │   └── currency.ts
│   ├── config/
│   │   └── tabs.ts
│   ├── lib/
│   │   ├── api.ts
│   │   ├── conversion.ts
│   │   └── storage.ts
│   ├── hooks/
│   │   └── useExchangeRates.ts
│   └── components/
│       ├── TabSelector.tsx
│       ├── AmountDisplay.tsx
│       ├── BaseCurrencySelect.tsx
│       ├── ConversionResults.tsx
│       ├── ConversionCard.tsx
│       ├── Keypad.tsx
│       ├── KeypadButton.tsx
│       ├── LastUpdated.tsx
│       └── CachedRatesBanner.tsx
├── international_currency_converter_spec.md
└── exchange_rate_API.md
```

---

## Tech Stack
| Layer | Tool |
|---|---|
| Framework | React 19 + TypeScript |
| Bundler | Vite 7 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite` plugin) |
| Data fetching | TanStack Query v5 |
| API proxy | Vercel serverless function |
| Exchange rates | exchangerate.host `/live` endpoint |
| Package manager | pnpm |

---

## Potential Next Steps

### Pre-deployment (Required)
1. **Add real API key** — Sign up at exchangerate.host, put key in `.env.local` for local dev
2. **Test with live API** — Run `vercel dev` locally to verify the serverless function works end-to-end
3. **Deploy to Vercel** — Connect repo, set `EXCHANGERATE_API_KEY` environment variable
4. **Rename package** — `package.json` still says `"name": "vite-scaffold"` — update to `"currency-converter"`

### Polish & UX
5. **Currency symbols/flags** — Add $ / £ / ₫ symbols or country flag emojis to conversion cards
6. **Haptic feedback** — Add subtle vibration on keypad tap for mobile (`navigator.vibrate`)
7. **Dark mode** — Tailwind v4 supports `dark:` variant out of the box; add dark color scheme
8. **Transition animations** — Animate tab switches and conversion result changes
9. **PWA support** — Add `manifest.json` and service worker for offline/installable app
10. **Favicon** — Replace removed Vite favicon with a currency-themed icon

### Features
11. **Swap base/target** — Quick-swap button to reverse a conversion
12. **More currencies** — Add EUR, JPY, KRW, CAD, AUD etc. and a third tab
13. **Historical rates** — Show rate trend chart using exchangerate.host `/timeframe` endpoint
14. **Amount presets** — Quick buttons for common amounts (100, 500, 1000)
15. **Share conversion** — Copy or share a specific conversion result
16. **Reverse keypad entry** — Type target amount and see what base amount is needed

### Code Quality
17. **Unit tests** — Test `processInput()`, `convert()`, `formatCurrency()` pure functions with Vitest
18. **E2E tests** — Playwright tests for keypad input, tab switching, conversion display
19. **Error boundary** — Wrap app in React error boundary for graceful crash recovery
20. **Accessibility audit** — Add ARIA labels, screen reader announcements for conversion updates
21. **Git init & first commit** — Initialize repo and create initial commit

### Performance
22. **Bundle analysis** — Run `npx vite-bundle-visualizer` to check bundle size
23. **Lazy load tabs** — Code-split tab content if more tabs/currencies are added
24. **Rate refresh indicator** — Show countdown to next rate refresh
