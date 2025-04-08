<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>

<script setup>
const { slug } = useRoute().params;
const { setLoading } = usePageLoading();

const config = useRuntimeConfig();

const story = await useAsyncStoryblok(
  slug && slug.length > 0 ? slug.join("/") : "home",
  {
    version:
      config.public.ENV === "development" || config.public.ENV === "staging"
        ? "draft"
        : "published",
  }
);

onMounted(() => {
  nextTick(() => {
    anchorLinksManager.findAnchorLinks();

    window.scrollTo(0, 0);
    setLoading(false);
  });
});
</script>
