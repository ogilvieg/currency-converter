import type { ConversionResult } from '../types/currency'
import { ConversionCard } from './ConversionCard'

interface ConversionResultsProps {
  results: ConversionResult[]
}

export function ConversionResults({ results }: ConversionResultsProps) {
  if (results.length === 0) return null

  return (
    <div className="space-y-3">
      {results.map((r) => (
        <ConversionCard key={r.code} result={r} />
      ))}
    </div>
  )
}
