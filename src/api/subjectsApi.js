// Thin CRUD wrapper around the Supabase auto-generated REST API.
//
// Supabase exposes every table as a REST endpoint at:
//   <VITE_SUPABASE_URL>/rest/v1/scp_subjects
// The supabase-js client builds those requests for us. Each function returns
// a Promise that resolves to { data, error } so components can render
// loading / error states consistently.

import { supabase, SUBJECTS_TABLE } from '../supabaseClient'

/**
 * Fetch all SCP subjects, ordered by item designation.
 * REST equivalent: GET /rest/v1/scp_subjects?select=*&order=item.asc
 */
export async function listSubjects() {
  const { data, error } = await supabase
    .from(SUBJECTS_TABLE)
    .select('*')
    .order('item', { ascending: true })
  return { data: data ?? [], error }
}

/**
 * Fetch a single subject by id (uuid).
 * REST equivalent: GET /rest/v1/scp_subjects?id=eq.<id>
 */
export async function getSubject(id) {
  const { data, error } = await supabase
    .from(SUBJECTS_TABLE)
    .select('*')
    .eq('id', id)
    .single()
  return { data, error }
}

/**
 * Create a new SCP subject.
 * REST equivalent: POST /rest/v1/scp_subjects
 */
export async function createSubject(subject) {
  const payload = sanitize(subject)
  const { data, error } = await supabase
    .from(SUBJECTS_TABLE)
    .insert(payload)
    .select()
    .single()
  return { data, error }
}

/**
 * Update an SCP subject by id.
 * REST equivalent: PATCH /rest/v1/scp_subjects?id=eq.<id>
 */
export async function updateSubject(id, subject) {
  const payload = sanitize(subject)
  const { data, error } = await supabase
    .from(SUBJECTS_TABLE)
    .update(payload)
    .eq('id', id)
    .select()
    .single()
  return { data, error }
}

/**
 * Delete an SCP subject by id.
 * REST equivalent: DELETE /rest/v1/scp_subjects?id=eq.<id>
 */
export async function deleteSubject(id) {
  const { error } = await supabase.from(SUBJECTS_TABLE).delete().eq('id', id)
  return { error }
}

// Strip whitespace and drop any keys the table doesn't have, so we get a
// clean 400 response if the caller passes garbage instead of a silent insert.
function sanitize(subject) {
  const allowed = ['item', 'class', 'description', 'containment']
  const out = {}
  for (const key of allowed) {
    if (subject[key] !== undefined) {
      out[key] = typeof subject[key] === 'string' ? subject[key].trim() : subject[key]
    }
  }
  return out
}
