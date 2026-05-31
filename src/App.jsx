import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import SubjectList from './components/SubjectList'
import SubjectDetail from './components/SubjectDetail'
import SubjectForm from './components/SubjectForm'
import { useSubjects } from './hooks/useSubjects'

export default function App() {
  // One shared hook = one source of truth for subjects. The detail page
  // fetches its own record directly (so refresh-by-URL still works), but
  // mutations live here and trigger a refetch of the list.
  const { subjects, loading, error, add, update, remove } = useSubjects()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <Routes>
          <Route
            path="/"
            element={
              <SubjectList
                subjects={subjects}
                loading={loading}
                error={error}
              />
            }
          />
          <Route
            path="/new"
            element={<SubjectForm mode="create" onCreate={add} />}
          />
          <Route
            path="/subject/:id"
            element={<SubjectDetail onDelete={remove} />}
          />
          <Route
            path="/subject/:id/edit"
            element={<SubjectForm mode="edit" onUpdate={update} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="border-t border-scp-border bg-scp-panel mt-6">
        <div className="max-w-6xl mx-auto px-4 py-3 font-mono text-[10px] text-scp-muted uppercase tracking-widest flex flex-wrap items-center justify-between gap-2">
          <span>SCP Foundation Internal Archive · COMP.6210 Assignment 2</span>
          <span>Backend: Supabase REST · Frontend: React + Vite</span>
        </div>
      </footer>
    </div>
  )
}
