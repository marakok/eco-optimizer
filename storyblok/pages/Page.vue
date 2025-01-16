<template>
  <div v-editable="blok" class="page">
    <StoryblokComponent
      v-for="blok in blok.body"
      :key="blok._uid"
      :blok="blok"
    />
  </div>
</template>

<script setup>
const props = defineProps({ blok: Object });

const themeBackgroundColor = computed(() => props.blok.themeBackground);
const utilityColor = computed(() => props.blok.utilityColor);

const updateThemeColors = () => {
  document.documentElement.style.setProperty(
    "--theme-background-color",
    themeBackgroundColor.value
  );

  document.documentElement.style.setProperty(
    "--utility-color",
    utilityColor.value
  );
};

onMounted(updateThemeColors);
</script>

<style scoped lang="scss">
.page {
  overflow: hidden;
}
</style>
