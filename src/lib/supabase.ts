import { createClient } from '@supabase/supabase-js'
// import type { Database } from '../types/database'  // ver nota abaixo

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY

// O cliente é exportado uma única vez e reutilizado em todo o app
export const supabase = createClient(supabaseUrl, supabaseKey)