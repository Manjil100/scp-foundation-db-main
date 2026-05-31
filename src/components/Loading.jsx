// Tiny shared loading + error blocks. Kept dumb on purpose.

export function Loading({ label = 'Decrypting archive…' }) {
  return (
    <div className="font-mono text-scp-muted uppercase tracking-widest text-xs blink py-6 text-center">
      {label}
    </div>
  )
}

export function ErrorBlock({ message }) {
  if (!message) return null
  return (
    <div className="font-mono text-xs uppercase tracking-widest border border-scp-red text-scp-red-bright bg-black/40 px-3 py-2 my-3">
      ! Error: {message}
    </div>
  )
}

export function Empty({ label = 'No records found.' }) {
  return (
    <div className="font-mono text-scp-muted uppercase tracking-widest text-xs py-12 text-center border border-dashed border-scp-border">
      {label}
    </div>
  )
}
