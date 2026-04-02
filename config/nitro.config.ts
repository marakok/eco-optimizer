import type { NuxtConfig } from "@nuxt/schema";
import { createClient } from '@supabase/supabase-js';
import generateSitemapXml from "../server/utils/generateSitemapXml";

type NitroConfig = NonNullable<NuxtConfig["nitro"]>;

const config: NitroConfig = {
  preset: "netlify",
  hooks: {
    close: async () => {
      const baseUrl = process.env.BASE_URL || 'https://ecooptimizer.com';

      try {
        const supabase = createClient(
          process.env.VITE_SUPABASE_URL || '',
          process.env.VITE_SUPABASE_ANON_KEY || ''
        );

        const { data: pages, error } = await supabase
          .from('pages')
          .select('slug, updated_at')
          .eq('published', true);

        if (!error && pages) {
          generateSitemapXml(pages, baseUrl);
        } else {
          console.warn('Failed to generate sitemap:', error);
        }
      } catch (error) {
        console.warn('Sitemap generation skipped:', error);
      }
    },
  },
};

export default config;
