interface CachedRatesBannerProps {
  isUsingCachedRates: boolean
  isUsingFallbackRates: boolean
}

export function CachedRatesBanner({ isUsingCachedRates, isUsingFallbackRates }: CachedRatesBannerProps) {
  if (!isUsingCachedRates && !isUsingFallbackRates) return null

  const message = isUsingFallbackRates
    ? 'Unable to fetch rates. Using built-in fallback rates.'
    : 'Unable to reach server. Using cached rates.'

  return (
    <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-2 text-sm text-amber-800">
      {message}
    </div>
  )
}
