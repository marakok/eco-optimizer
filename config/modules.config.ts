import type { NuxtConfig } from "@nuxt/schema";

type ModulesConfig = Pick<NuxtConfig, "modules" | "robots">;

const config: ModulesConfig = {
  modules: [
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
  robots: {
    sitemap: ["/sitemap.xml"],
  },
};

export default config;
