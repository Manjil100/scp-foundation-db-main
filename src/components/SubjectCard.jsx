import { Link } from 'react-router-dom'
import ClassBadge from './ClassBadge'

// One row in the archive list. Click anywhere to view the full file.
export default function SubjectCard({ subject }) {
  return (
    <Link
      to={`/subject/${subject.id}`}
      className="scp-panel block p-4 hover:border-scp-amber transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-mono text-scp-amber text-sm uppercase tracking-widest">
            Item #: {subject.item}
          </div>
          <p className="font-serif text-scp-text mt-2 line-clamp-2">
            {subject.description}
          </p>
        </div>
        <div className="shrink-0">
          <ClassBadge value={subject.class} />
        </div>
      </div>
    </Link>
  )
}
