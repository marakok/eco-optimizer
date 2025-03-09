import appConfig from "./config/app.config";
import buildConfig from "./config/build.config";
import modulesConfig from "./config/modules.config";
import runtimeConfig from "./config/runtime.config";
import pathsConfig from "./config/paths.config";
import nitroConfig from "./config/nitro.config";

export default defineNuxtConfig({
  ...buildConfig,
  ...modulesConfig,
  ...pathsConfig,
  runtimeConfig,
  app: appConfig,
  nitro: nitroConfig,

  tailwindcss: {
    viewer: false,
    cssPath: false,
  },

  compatibilityDate: "2024-11-07",
  modules: ["vue3-carousel-nuxt"],
});
