import type { CurrencyCode, TabSet, Rates } from '../types/currency'

export const TABS: TabSet[] = [
  {
    id: 'americas',
    name: 'Americas',
    currencies: ['USD', 'MXN', 'COP'],
    defaultBase: 'USD',
  },
  {
    id: 'sea-uk',
    name: 'SEA + UK',
    currencies: ['USD', 'GBP', 'VND', 'THB', 'MYR'],
    defaultBase: 'USD',
  },
]

export const CURRENCY_NAMES: Record<CurrencyCode, string> = {
  USD: 'US Dollar',
  MXN: 'Mexican Peso',
  COP: 'Colombian Peso',
  GBP: 'British Pound',
  VND: 'Vietnamese Dong',
  THB: 'Thai Baht',
  MYR: 'Malaysian Ringgit',
}

/** Currencies that display with 0 decimal places (large-value currencies) */
export const ZERO_DECIMAL_CURRENCIES: Set<CurrencyCode> = new Set(['VND', 'COP'])

export const FALLBACK_RATES: Rates = {
  asOf: 0,
  baseAnchor: 'USD',
  values: {
    USD: 1,
    MXN: 17.25,
    COP: 4150,
    GBP: 0.79,
    VND: 25450,
    THB: 35.8,
    MYR: 4.72,
  },
}

export const STALE_TIME = 10 * 60 * 1000  // 10 minutes
export const GC_TIME = 60 * 60 * 1000     // 60 minutes
export const CACHE_KEY = 'currency-rates'
