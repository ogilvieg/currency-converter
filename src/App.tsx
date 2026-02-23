import { useState, useCallback, useMemo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { CurrencyCode } from './types/currency'
import { TABS } from './config/tabs'
import { convertAll } from './lib/conversion'
import { useExchangeRates } from './hooks/useExchangeRates'
import { processInput } from './components/Keypad'
import { TabSelector } from './components/TabSelector'
import { AmountDisplay } from './components/AmountDisplay'
import { BaseCurrencySelect } from './components/BaseCurrencySelect'
import { ConversionResults } from './components/ConversionResults'
import { Keypad } from './components/Keypad'
import { LastUpdated } from './components/LastUpdated'
import { CachedRatesBanner } from './components/CachedRatesBanner'

const queryClient = new QueryClient()

function CurrencyConverter() {
  const [activeTabId, setActiveTabId] = useState(TABS[0].id)
  const [amountString, setAmountString] = useState('0')
  const [baseCurrency, setBaseCurrency] = useState<CurrencyCode>(TABS[0].defaultBase)

  const { rates, isLoading, isUsingCachedRates, isUsingFallbackRates, lastUpdated } =
    useExchangeRates()

  const activeTab = TABS.find((t) => t.id === activeTabId) ?? TABS[0]

  const handleTabChange = useCallback(
    (tabId: string) => {
      setActiveTabId(tabId)
      const newTab = TABS.find((t) => t.id === tabId) ?? TABS[0]
      if (!newTab.currencies.includes(baseCurrency)) {
        setBaseCurrency(newTab.defaultBase)
      }
    },
    [baseCurrency],
  )

  const handleInput = useCallback((key: string) => {
    setAmountString((prev) => processInput(prev, key) ?? prev)
  }, [])

  const amount = parseFloat(amountString) || 0

  const results = useMemo(
    () => convertAll(amount, baseCurrency, activeTab.currencies, rates),
    [amount, baseCurrency, activeTab.currencies, rates],
  )

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-slate-50 px-4 py-6">
      {/* Header */}
      <header className="flex items-baseline justify-between">
        <h1 className="text-lg font-bold text-slate-800">Currency Converter</h1>
        <LastUpdated timestamp={lastUpdated} isLoading={isLoading} />
      </header>

      {/* Banner */}
      <div className="mt-3">
        <CachedRatesBanner
          isUsingCachedRates={isUsingCachedRates}
          isUsingFallbackRates={isUsingFallbackRates}
        />
      </div>

      {/* Tabs */}
      <div className="mt-4">
        <TabSelector tabs={TABS} activeTabId={activeTabId} onSelect={handleTabChange} />
      </div>

      {/* Amount + Base currency */}
      <div className="mt-4">
        <AmountDisplay amount={amountString} currencyCode={baseCurrency} />
        <BaseCurrencySelect
          currencies={activeTab.currencies}
          selected={baseCurrency}
          onChange={setBaseCurrency}
        />
      </div>

      {/* Conversion results — scrollable middle section */}
      <div className="mt-4 flex-1 overflow-y-auto">
        <ConversionResults results={results} />
      </div>

      {/* Keypad — anchored at bottom */}
      <div className="mt-4 pt-2">
        <Keypad onInput={handleInput} />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyConverter />
    </QueryClientProvider>
  )
}
