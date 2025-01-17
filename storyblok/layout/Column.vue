<template>
  <div v-editable="blok" :class="columnClasses" :style="columnStyles">
    <div class="column--background" v-if="hasBackgroundImage">
      <img
        :src="blok.backgroundImage?.filename"
        :alt="blok.backgroundImage?.alt || 'Background image'"
        class="column--background-image"
      />
    </div>
    <div class="column--content">
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
  "column-middle": props.blok.verticalAlign === "middle",
  "column-bottom": props.blok.verticalAlign === "bottom",
  "has-background-image": hasBackgroundImage.value,
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
}

@media (min-width: breakpoint(tablet)) {
  .column-middle {
    justify-content: center;
  }

  .column-bottom {
    justify-content: flex-end;
  }
}
</style>
