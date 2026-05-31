import { Link, NavLink } from 'react-router-dom'

// Top bar — classified-document letterhead with primary nav.
export default function Header() {
  const navItem = ({ isActive }) =>
    `scp-btn ${isActive ? 'border-scp-amber text-scp-amber' : ''}`

  return (
    <header className="border-b border-scp-border bg-scp-panel">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 group">
          {/* SVG logo — simplified Foundation mark */}
          <svg
            viewBox="0 0 64 64"
            className="w-9 h-9 text-scp-amber"
            aria-hidden="true"
          >
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              d="M32 8 v48 M8 32 h48 M14 14 l36 36 M50 14 l-36 36"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              opacity="0.8"
            />
            <circle cx="32" cy="32" r="6" fill="currentColor" />
          </svg>
          <div className="leading-tight">
            <div className="font-mono text-scp-amber text-sm uppercase tracking-widest">
              SCP Foundation
            </div>
            <div className="font-mono text-scp-muted text-[10px] uppercase tracking-widest">
              Secure · Contain · Protect
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink to="/" end className={navItem}>
            Archive
          </NavLink>
          <NavLink to="/new" className={navItem}>
            + New Subject
          </NavLink>
        </nav>
      </div>

      <div className="bg-scp-red-bright/90 text-white text-[10px] font-mono uppercase tracking-widest text-center py-1">
        Clearance Level 3 / Authorised Personnel Only — Foundation Property
      </div>
    </header>
  )
}
