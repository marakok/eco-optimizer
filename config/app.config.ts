import type { NuxtConfig } from "@nuxt/schema";

type AppConfig = NonNullable<NuxtConfig["app"]>;

const config: AppConfig = {
  pageTransition: { name: "page", mode: "out-in" },
  head: {
    title: "EcoOptimizer | Optimizing | Optimal",
    meta: [
      {
        property: "og:title",
        content: "TODO",
      },
      {
        name: "description",
        content: "TODO",
      },
      {
        property: "og:description",
        content: "TODO",
      },
    ],
  },
};

export default config;
