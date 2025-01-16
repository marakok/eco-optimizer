import type { NuxtConfig } from "@nuxt/schema";

type BuildConfig = Pick<NuxtConfig, "vite" | "css" | "devtools">;

const config: BuildConfig = {
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern",
        },
      },
    },
  },
  css: ["~/assets/scss/main.scss"],
  devtools: { enabled: true },
};

export default config;
