interface LastUpdatedProps {
  timestamp: number | null
  isLoading: boolean
}

export function LastUpdated({ timestamp, isLoading }: LastUpdatedProps) {
  if (isLoading) {
    return <span className="text-xs text-slate-400">Loading rates...</span>
  }

  if (!timestamp) {
    return <span className="text-xs text-slate-400">Using fallback rates</span>
  }

  const date = new Date(timestamp)
  const formatted = date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

  return <span className="text-xs text-slate-400">Updated {formatted}</span>
}
