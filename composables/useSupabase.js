import { createClient } from '@supabase/supabase-js';

let supabaseClient = null;

export const useSupabase = () => {
  if (!supabaseClient) {
    const config = useRuntimeConfig();
    const supabaseUrl = config.public.VITE_SUPABASE_URL;
    const supabaseKey = config.public.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables');
    }

    supabaseClient = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return supabaseClient;
};
