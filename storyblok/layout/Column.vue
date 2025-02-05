<template>
  <div v-editable="blok" :class="columnClasses" :style="columnStyles">
    <div class="column--background" v-if="hasBackgroundImage">
      <img
        :src="blok.backgroundImage?.filename"
        :alt="blok.backgroundImage?.alt || 'Background image'"
        class="column--background-image"
      />
    </div>
    <div class="column--content" :style="contentStyles">
      <StoryblokComponent
        v-for="item in blok.content"
        :key="item._uid"
        :blok="item"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

const hasBackgroundImage = computed(() => {
  return !!props.blok.backgroundImage?.filename;
});

const columnClasses = computed(() => ({
  column: true,
  "has-background-image": hasBackgroundImage.value,
}));

const contentStyles = computed(() => ({
  "--column-content-align":
    props.blok.verticalAlign === "middle"
      ? "center"
      : props.blok.verticalAlign === "bottom"
      ? "flex-end"
      : "flex-start",
}));

const columnStyles = computed(() => ({
  "--column-background-color": !hasBackgroundImage.value
    ? props.blok.backgroundColor
    : "transparent",
  paddingTop: props.blok.removeVerticalPadding ? "0" : "var(--mvpb-spacing-1)",
  paddingBottom: props.blok.removeVerticalPadding
    ? "0"
    : "var(--mvpb-spacing-1)",
  paddingLeft: props.blok.removeHorizontalPadding
    ? "0"
    : "var(--mvpb-spacing-1)",
  paddingRight: props.blok.removeHorizontalPadding
    ? "0"
    : "var(--mvpb-spacing-1)",
}));
</script>

<style scoped lang="scss">
@use "@/base/breakpoints.scss" as *;

.column {
  display: flex;
  flex-basis: 100%;
  flex: 1;
  flex-direction: column;
  background-color: var(--column-background-color, transparent);
  position: relative;
  border-radius: var(--mvpb-border-radius);
}

.column--background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  border-radius: var(--mvpb-border-radius);
}

.column--background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.column--content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: var(--column-content-align, flex-start);
}
</style>
