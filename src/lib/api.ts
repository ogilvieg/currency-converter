import type { CurrencyCode, Rates } from '../types/currency'

interface ApiResponse {
  success: boolean
  quotes?: Record<string, number>
}

export async function fetchRates(): Promise<Rates> {
  const res = await fetch('/api/rates')
  if (!res.ok) throw new Error(`API error: ${res.status}`)

  const data: ApiResponse = await res.json()
  if (!data.success || !data.quotes) {
    throw new Error('Invalid API response')
  }

  // API returns keys like "USDMXN", "USDCOP" — strip the "USD" prefix
  const values: Record<string, number> = { USD: 1 }
  for (const [key, val] of Object.entries(data.quotes)) {
    const code = key.replace('USD', '')
    values[code] = val
  }

  return {
    asOf: Date.now(),
    baseAnchor: 'USD',
    values: values as Record<CurrencyCode, number>,
  }
}
