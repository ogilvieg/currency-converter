import type { ConversionResult } from '../types/currency'

interface ConversionCardProps {
  result: ConversionResult
}

export function ConversionCard({ result }: ConversionCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-baseline justify-between">
        <div>
          <span className="text-sm font-semibold text-slate-500">{result.code}</span>
          <span className="ml-2 text-xs text-slate-400">{result.name}</span>
        </div>
      </div>
      <p className="mt-1 text-2xl font-bold text-slate-900">{result.formatted}</p>
      <p className="mt-1 text-xs text-slate-400">{result.formattedRate}</p>
    </div>
  )
}
