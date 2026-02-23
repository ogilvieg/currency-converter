import type { TabSet } from '../types/currency'

interface TabSelectorProps {
  tabs: TabSet[]
  activeTabId: string
  onSelect: (tabId: string) => void
}

export function TabSelector({ tabs, activeTabId, onSelect }: TabSelectorProps) {
  return (
    <div className="flex gap-2">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelect(tab.id)}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab.name}
          </button>
        )
      })}
    </div>
  )
}
