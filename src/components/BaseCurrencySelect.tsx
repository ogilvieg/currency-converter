import type { CurrencyCode } from '../types/currency'
import { CURRENCY_NAMES } from '../config/tabs'

interface BaseCurrencySelectProps {
  currencies: CurrencyCode[]
  selected: CurrencyCode
  onChange: (code: CurrencyCode) => void
}

export function BaseCurrencySelect({ currencies, selected, onChange }: BaseCurrencySelectProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <label htmlFor="base-currency" className="text-sm font-medium text-slate-600">
        Base:
      </label>
      <select
        id="base-currency"
        value={selected}
        onChange={(e) => onChange(e.target.value as CurrencyCode)}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {currencies.map((code) => (
          <option key={code} value={code}>
            {code} — {CURRENCY_NAMES[code]}
          </option>
        ))}
      </select>
    </div>
  )
}
