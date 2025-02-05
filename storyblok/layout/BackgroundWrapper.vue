<template>
  <div v-editable="blok" class="background-wrapper" :style="wrapperStyles">
    <StoryblokComponent
      v-for="nestedBlok in blok.content"
      :key="nestedBlok._uid"
      :blok="nestedBlok"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

const wrapperStyles = computed(() => ({
  backgroundColor: props.blok.backgroundColor || "transparent",
}));
</script>

<style scoped lang="scss">
.background-wrapper {
  padding: var(--mvpb-spacing-6) 0;
}
</style>
