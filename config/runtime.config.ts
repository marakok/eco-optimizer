import type { NuxtConfig } from "@nuxt/schema";

interface RuntimeConfig {
  RECAPTCHA_SECRET_KEY?: string;
  RECAPTCHA_SITE_KEY?: string;
  SMTP_USER?: string;
  SMTP_PASSWORD?: string;
  TO_EMAIL?: string;
  public: {
    ENV?: string;
    RECAPTCHA_SECRET_KEY?: string;
    RECAPTCHA_SITE_KEY?: string;
  };
}

const config: NuxtConfig["runtimeConfig"] & RuntimeConfig = {
  // RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
  // RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
  // SMTP_USER: process.env.SMTP_USER,
  // SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  // TO_EMAIL: process.env.TO_EMAIL,

  public: {
    ENV: process.env.ENV,
    // RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
    // RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
  },
};

export default config;
