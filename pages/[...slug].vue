<template>
  <div v-if="page">
    <component
      :is="getSectionComponent(section.type)"
      v-for="section in page.sections"
      :key="section.id"
      :section="section"
    />
  </div>
  <div v-else-if="!pending && !page" class="error-container">
    <h1>Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <NuxtLink to="/">Go to Homepage</NuxtLink>
  </div>
</template>

<script setup>
const route = useRoute();
const { setLoading } = usePageLoading();
const { fetchPageBySlug } = usePages();

const slug = computed(() => {
  const params = route.params.slug;
  return params && params.length > 0 ? params.join('/') : 'home';
});

const { data: page, pending } = await useAsyncData(
  `page-${slug.value}`,
  () => fetchPageBySlug(slug.value)
);

if (page.value) {
  useHead({
    title: page.value.title,
    meta: [
      { name: 'description', content: page.value.meta_description },
      { name: 'keywords', content: page.value.meta_keywords },
    ],
  });
}

const getSectionComponent = (type) => {
  switch (type) {
    case 'hero':
      return resolveComponent('HeroSection');
    case 'content':
      return resolveComponent('ContentSection');
    case 'grid':
      return resolveComponent('GridSection');
    case 'testimonials':
      return resolveComponent('TestimonialsSection');
    case 'contact':
      return resolveComponent('ContactSection');
    default:
      return resolveComponent('SectionComponent');
  }
};

onMounted(() => {
  nextTick(() => {
    anchorLinksManager.findAnchorLinks();
    window.scrollTo(0, 0);
    setLoading(false);
  });
});
</script>

<style scoped>
.error-container {
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--mvpb-spacing-8);
}

.error-container h1 {
  font-size: var(--mvpb-font-size-8);
  margin-bottom: var(--mvpb-spacing-4);
}

.error-container p {
  font-size: var(--mvpb-font-size-5);
  margin-bottom: var(--mvpb-spacing-6);
}

.error-container a {
  text-decoration: none;
  color: var(--mvpb-color-primary);
  font-size: var(--mvpb-font-size-4);
}
</style>
