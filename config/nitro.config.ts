import type { NuxtConfig } from "@nuxt/schema";
import StoryblokClient from "storyblok-js-client";
import generateSitemapXml from "../server/utils/generateSitemapXml";

type NitroConfig = NonNullable<NuxtConfig["nitro"]>;

const config: NitroConfig = {
  preset: "netlify",
  hooks: {
    close: async () => {
      const baseUrl = process.env.BASE_URL;

      const sbInstance = new StoryblokClient({
        accessToken: process.env.STORYBLOK_KEY,
      });

      const { data } = await sbInstance.get("cdn/links", {
        version: "published",
        per_page: 1000,
      });

      generateSitemapXml(data, baseUrl);
    },
  },
};

export default config;
