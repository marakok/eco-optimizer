import { resolve } from "path";
import type { NuxtConfig } from "@nuxt/schema";

type PathsConfig = Pick<NuxtConfig, "alias" | "components">;

const config: PathsConfig = {
  alias: {
    "@": resolve(__dirname, "../assets/scss/"),
    "#": resolve(__dirname, "../components/"),
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
};

export default config;
