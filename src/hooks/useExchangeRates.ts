import { useQuery } from '@tanstack/react-query'
import type { Rates } from '../types/currency'
import { fetchRates } from '../lib/api'
import { getCachedRates, setCachedRates } from '../lib/storage'
import { FALLBACK_RATES, STALE_TIME, GC_TIME } from '../config/tabs'

export function useExchangeRates() {
  const cachedRates = getCachedRates()

  const { data, isError, isLoading, dataUpdatedAt } = useQuery<Rates>({
    queryKey: ['exchange-rates'],
    queryFn: async () => {
      const rates = await fetchRates()
      setCachedRates(rates)
      return rates
    },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    initialData: cachedRates ?? undefined,
    retry: 2,
  })

  const isUsingFallbackRates = !data && !cachedRates
  const isUsingCachedRates = isError && !!cachedRates
  const rates: Rates = data ?? cachedRates ?? FALLBACK_RATES

  return {
    rates,
    isLoading: isLoading && !data,
    isUsingCachedRates,
    isUsingFallbackRates,
    lastUpdated: rates.asOf || dataUpdatedAt || null,
  }
}
