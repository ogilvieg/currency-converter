export type CurrencyCode = 'USD' | 'MXN' | 'COP' | 'GBP' | 'VND' | 'THB' | 'MYR'

export interface TabSet {
  id: string
  name: string
  currencies: CurrencyCode[]
  defaultBase: CurrencyCode
}

export interface Rates {
  asOf: number
  baseAnchor: 'USD'
  values: Record<CurrencyCode, number>
}

export interface ConversionResult {
  code: CurrencyCode
  name: string
  amount: number
  rate: number
  formatted: string
  formattedRate: string
}
