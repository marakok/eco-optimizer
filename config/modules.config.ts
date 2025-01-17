import type { NuxtConfig } from "@nuxt/schema";

type ModulesConfig = Pick<NuxtConfig, "modules" | "robots" | "icon">;

const config: ModulesConfig = {
  modules: [
    "@nuxt/icon",
    "@nuxtjs/robots",
    "@nuxt/ui",
    "@nuxtjs/device",
    "nuxt-viewport",
    "vue3-carousel-nuxt",
    [
      "@storyblok/nuxt",
      {
        accessToken: process.env.STORYBLOK_KEY,
        apiOptions: { region: "" },
      },
    ],
  ],
  icon: {
    serverBundle: {
      collections: ["uil", "mdi"],
    },
  },
  robots: {
    sitemap: ["/sitemap.xml"],
  },
};

export default config;
