import { useEffect, useCallback } from 'react'
import { KeypadButton } from './KeypadButton'

interface KeypadProps {
  onInput: (value: string) => void
}

/** Validate and produce the next amount string, or return null to reject */
export function processInput(current: string, key: string): string | null {
  if (key === 'C') return '0'
  if (key === '⌫') {
    const next = current.slice(0, -1)
    return next === '' || next === '-' ? '0' : next
  }
  if (key === '.') {
    if (current.includes('.')) return null
    return current + '.'
  }
  // digit
  if (key >= '0' && key <= '9') {
    // enforce max 2 decimal places
    const dotIndex = current.indexOf('.')
    if (dotIndex !== -1 && current.length - dotIndex > 2) return null
    // prevent leading zeros like "007"
    if (current === '0') return key === '0' ? null : key
    // cap length at 12 characters
    if (current.length >= 12) return null
    return current + key
  }
  return null
}

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'] as const

export function Keypad({ onInput }: KeypadProps) {
  const handleKey = useCallback(
    (key: string) => {
      onInput(key)
    },
    [onInput],
  )

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      // Ignore key events when focus is on an interactive element (e.g. select)
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'SELECT' || tag === 'INPUT' || tag === 'TEXTAREA') return

      if (e.key >= '0' && e.key <= '9') handleKey(e.key)
      else if (e.key === '.') handleKey('.')
      else if (e.key === 'Backspace') handleKey('⌫')
      else if (e.key === 'Escape') handleKey('C')
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleKey])

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-2">
        {KEYS.map((key) => (
          <KeypadButton
            key={key}
            label={key}
            onClick={() => handleKey(key)}
            variant={key === '⌫' ? 'action' : 'number'}
          />
        ))}
      </div>
      <KeypadButton
        label="Clear"
        onClick={() => handleKey('C')}
        variant="action"
        className="w-full"
      />
    </div>
  )
}
