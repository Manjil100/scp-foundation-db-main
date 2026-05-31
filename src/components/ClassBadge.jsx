import { CLASS_COLORS } from '../constants'

// Small coloured pill for the object class. Falls back to a neutral
// grey badge if we somehow get an unknown class string from the DB.
export default function ClassBadge({ value }) {
  const color = CLASS_COLORS[value] ?? 'bg-scp-panel-2 border border-scp-border'
  return (
    <span
      className={`inline-block px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-white ${color}`}
      title={`Object class: ${value}`}
    >
      {value || 'Unknown'}
    </span>
  )
}
