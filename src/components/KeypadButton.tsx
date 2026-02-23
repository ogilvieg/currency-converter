interface KeypadButtonProps {
  label: string
  onClick: () => void
  variant?: 'number' | 'action'
  className?: string
}

export function KeypadButton({ label, onClick, variant = 'number', className = '' }: KeypadButtonProps) {
  const base = 'flex items-center justify-center rounded-xl text-xl font-semibold active:scale-95 transition-transform select-none min-h-14'
  const styles =
    variant === 'action'
      ? 'bg-slate-200 text-slate-700'
      : 'bg-white text-slate-900 border border-slate-200'

  return (
    <button type="button" onClick={onClick} className={`${base} ${styles} ${className}`}>
      {label}
    </button>
  )
}
