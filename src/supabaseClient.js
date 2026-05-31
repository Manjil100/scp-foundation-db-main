import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ikbumuicfvlisgxhdbsr.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrYnVtdWljZnZsaXNneGhkYnNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1NjYxMjUsImV4cCI6MjA5NDE0MjEyNX0.G1qH-RtaZoI0mcurE0PG3yaIPsn_7QLpp7O77aFhC9o'
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const SUBJECTS_TABLE =
cd ~/Downloads/scp-foundation-db-main-main
cat > src/supabaseClient.js << 'EOF'
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ikbumuicfvlisgxhdbsr.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrYnVtdWljZnZsaXNneGhkYnNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1NjYxMjUsImV4cCI6MjA5NDE0MjEyNX0.G1qH-RtaZoI0mcurE0PG3yaIPsn_7QLpp7O77aFhC9o'
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const SUBJECTS_TABLE = 'scp_subjects'
