// Supabase client.
// Reads URL + anon key from Vite env vars (must be prefixed with VITE_ to be exposed to the browser).
// See .env.example for the variables required.

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // Help the dev catch a missing .env early instead of getting a cryptic 401.
  // eslint-disable-next-line no-console
  console.warn(
    '[supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not set. ' +
      'Copy .env.example to .env.local and fill in your Supabase credentials.'
  )
}

export const supabase = createClient(
  supabaseUrl ?? 'http://placeholder',
  supabaseAnonKey ?? 'placeholder'
)

export const SUBJECTS_TABLE = 'scp_subjects'
