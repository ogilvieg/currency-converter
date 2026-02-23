import type { CurrencyCode } from '../types/currency'

interface AmountDisplayProps {
  amount: string
  currencyCode: CurrencyCode
}

export function AmountDisplay({ amount, currencyCode }: AmountDisplayProps) {
  return (
    <div className="text-center py-4">
      <p className="text-4xl font-bold text-slate-900 tracking-tight">
        {amount}
      </p>
      <p className="text-sm text-slate-500 mt-1">{currencyCode}</p>
    </div>
  )
}
