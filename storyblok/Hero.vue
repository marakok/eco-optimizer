<template>
  <section class="section" :style="sectionStyles" ref="heroRef">
    <div class="section--background" ref="sectionBackgroundRef">
      <div class="section--background-color" />
    </div>

    <div class="section--inner">
      <div class="animation--container"></div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

const heroRef = ref(null);
const sectionBackgroundRef = ref(null);

const sectionStyles = computed(() => ({
  "--theme-background-color": props.blok.backgroundColor,
  "--theme-font-color": props.blok.textColor,
}));
</script>

<style scoped lang="scss">
@use "@/base/breakpoints.scss" as *;

.section {
  --theme-font-color: #ffffff;

  height: 100dvh;
  position: relative;
  color: var(--theme-font-color);
}

.section--background {
  opacity: 0;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: var(--theme-background-color);
  overflow: hidden;
}

.section--inner {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.animation--container {
}
</style>
