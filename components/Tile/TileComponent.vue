<template>
  <div v-editable="blok" class="tile" :style="tileStyles">
    <div class="tile--icon-container">
      <StoryblokComponent
        v-for="nestedBlok in blok.icon"
        :key="nestedBlok._uid"
        :blok="nestedBlok"
      />
    </div>

    <StoryblokComponent
      v-for="nestedBlok in blok.richText"
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

const tileStyles = computed(() => ({
  "--theme-background-color": props.blok.backgroundColor || "transparent",
}));
</script>

<style scoped>
.tile {
  background-color: var(--theme-background-color);
}

.tile--icon-container {
  margin-top: var(--mvpb-spacing-1);
}
</style>
