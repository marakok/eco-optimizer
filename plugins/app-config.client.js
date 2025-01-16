export default defineNuxtPlugin(async (nuxtApp) => {
  const storyblokApi = useStoryblokApi();
  const config = useRuntimeConfig();

  const { data } = await storyblokApi.get("cdn/stories/config", {
    resolve_links: "url",
    version:
      config.public.ENV === "development" || config.public.ENV === "staging"
        ? "draft"
        : "published",
  });

  const header = data.story.content.header_menu || [];

  nuxtApp.provide("appConfig", {
    header,
  });
});
