import { createClient } from '@supabase/supabase-js';

let supabaseClient = null;

export const useSupabase = () => {
  if (!supabaseClient) {
    const config = useRuntimeConfig();
    const supabaseUrl = config.public.VITE_SUPABASE_URL;
    const supabaseKey = config.public.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase configuration missing:', {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseKey,
        config: config.public
      });
      throw new Error('Missing Supabase environment variables. Please check your .env file.');
    }

    console.log('Initializing Supabase client with URL:', supabaseUrl);

    supabaseClient = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return supabaseClient;
};
