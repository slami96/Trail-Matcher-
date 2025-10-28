import { createClient } from '@supabase/supabase-js'

// grab the environment variables from Vercel
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// create the supabase client for database operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
