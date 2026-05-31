// useSubjects — small hook that owns the list of SCP subjects in memory
// and re-fetches when something changes. Keeps components dumb.

import { useCallback, useEffect, useState } from 'react'
import {
  listSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
} from '../api/subjectsApi'

export function useSubjects() {
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await listSubjects()
    if (error) setError(error.message)
    else setSubjects(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const add = useCallback(
    async (subject) => {
      const { data, error } = await createSubject(subject)
      if (error) return { error }
      // Optimistic-ish: just refetch so ordering stays correct.
      await refresh()
      return { data }
    },
    [refresh]
  )

  const update = useCallback(
    async (id, subject) => {
      const { data, error } = await updateSubject(id, subject)
      if (error) return { error }
      await refresh()
      return { data }
    },
    [refresh]
  )

  const remove = useCallback(
    async (id) => {
      const { error } = await deleteSubject(id)
      if (error) return { error }
      await refresh()
      return {}
    },
    [refresh]
  )

  return { subjects, loading, error, refresh, add, update, remove }
}
