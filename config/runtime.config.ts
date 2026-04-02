import type { NuxtConfig } from "@nuxt/schema";

interface RuntimeConfig {
  RECAPTCHA_SECRET_KEY?: string;
  SMTP_USER?: string;
  SMTP_PASSWORD?: string;
  SMTP_HOST?: string;
  TO_EMAIL?: string;
  public: {
    ENV?: string;
    RECAPTCHA_SITE_KEY?: string;
    VITE_SUPABASE_URL?: string;
    VITE_SUPABASE_ANON_KEY?: string;
  };
}

const config: NuxtConfig["runtimeConfig"] & RuntimeConfig = {
  RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_HOST: process.env.SMTP_HOST,
  TO_EMAIL: process.env.TO_EMAIL,

  public: {
    ENV: process.env.ENV,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY,
  },
};

export default config;
