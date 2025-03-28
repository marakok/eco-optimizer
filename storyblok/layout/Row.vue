<template>
  <div v-editable="blok" class="row" :style="rowStyles" :class="rowClasses">
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

const rowClasses = computed(() => ({
  "row--wrap": props.blok.wrap,
  "row--reverse": props.blok.reverse,
  "row--reverse-mobile": props.blok.reverseMobile,
}));

const rowStyles = computed(() => ({
  "--row-justify": props.blok.justifyContent || "flex-start",
  "--row-align": props.blok.alignItems || "stretch",
  "--row-gap": props.blok.gap
    ? `var(--mvpb-spacing-${props.blok.gap})`
    : "var(--mvpb-spacing-4)",
  "--row-padding-x": props.blok.horizontalPadding
    ? `var(--mvpb-spacing-${props.blok.horizontalPadding})`
    : "0",
  "--row-padding-y": props.blok.verticalPadding
    ? `var(--mvpb-spacing-${props.blok.verticalPadding})`
    : "0",
  "--row-margin-bottom": props.blok.marginBottom
    ? `var(--mvpb-spacing-${props.blok.marginBottom})`
    : "0",
  "--row-background-color": props.blok.backgroundColor || "transparent",
}));
</script>

<style scoped lang="scss">
@use "@/base/breakpoints.scss" as *;

.row {
  display: flex;
  width: 100%;
  container-type: inline-size;
  justify-content: var(--row-justify);
  align-items: var(--row-align);
  gap: var(--row-gap);
  padding: var(--row-padding-y) var(--row-padding-x);
  margin-bottom: var(--row-margin-bottom);
  background-color: var(--row-background-color);

  &--wrap {
    flex-wrap: wrap;
  }

  &--reverse {
    flex-direction: row-reverse;
  }

  &--reverse-mobile {
    flex-direction: column-reverse;

    @container (min-width: 768px) {
      flex-direction: row;
    }
  }
}

@container (max-width: breakpoint(tablet)) {
  .row {
    flex-direction: column;

    &--wrap {
      flex-direction: column;
    }
  }
}
</style>
