import type { Rates } from '../types/currency'
import { CACHE_KEY } from '../config/tabs'

export function getCachedRates(): Rates | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as Rates
  } catch {
    return null
  }
}

export function setCachedRates(rates: Rates): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(rates))
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}
