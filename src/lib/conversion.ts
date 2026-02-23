import type { CurrencyCode, Rates, ConversionResult } from '../types/currency'
import { CURRENCY_NAMES, ZERO_DECIMAL_CURRENCIES } from '../config/tabs'

export function convert(
  amount: number,
  base: CurrencyCode,
  target: CurrencyCode,
  rates: Rates,
): ConversionResult {
  const rateBase = rates.values[base]
  const rateTarget = rates.values[target]
  const converted = amount * (rateTarget / rateBase)
  const rate = rateTarget / rateBase

  return {
    code: target,
    name: CURRENCY_NAMES[target],
    amount: converted,
    rate,
    formatted: formatCurrency(converted, target),
    formattedRate: `1 ${base} = ${formatRate(rate, target)}`,
  }
}

export function convertAll(
  amount: number,
  base: CurrencyCode,
  targets: CurrencyCode[],
  rates: Rates,
): ConversionResult[] {
  return targets
    .filter((code) => code !== base)
    .map((code) => convert(amount, base, code, rates))
}

export function formatCurrency(amount: number, code: CurrencyCode): string {
  const decimals = ZERO_DECIMAL_CURRENCIES.has(code) ? 0 : 2
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export function formatRate(rate: number, code: CurrencyCode): string {
  let decimals: number
  if (rate >= 100) decimals = 0
  else if (rate >= 1) decimals = 2
  else decimals = 4

  return `${rate.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })} ${code}`
}
