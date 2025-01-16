<template>
  <div v-editable="blok" :class="columnClasses" :style="columnStyles">
    <StoryblokComponent
      v-for="item in blok.content"
      :key="item._uid"
      :blok="item"
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

const columnClasses = computed(() => ({
  column: true,
  "column-middle": props.blok.verticalAlign === "middle",
  "column-bottom": props.blok.verticalAlign === "bottom",
}));

const columnStyles = computed(() => ({
  "--column-background-color": props.blok.backgroundColor,
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
