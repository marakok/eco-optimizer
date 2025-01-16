<template>
  <div
    v-editable="blok"
    class="horizontal-rule"
    :class="classes"
    :style="styles"
  >
    <hr class="horizontal-rule--line" />
  </div>
</template>

<script setup>
const props = defineProps({
  blok: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const classes = computed(() => ({
  "horizontal-rule--solid": props.blok.style === "solid" || !props.blok.style,
  "horizontal-rule--dashed": props.blok.style === "dashed",
  "horizontal-rule--dotted": props.blok.style === "dotted",
}));

const styles = computed(() => ({
  "--hr-color": props.blok.color || "var(--mvpb-color-dark)",
  "--hr-width": `${props.blok.width || "100"}%`,
  "--hr-thickness": `${props.blok.thickness || 2}px`,
  "--hr-margin": props.blok.spacing
    ? `var(--mvpb-spacing-${props.blok.spacing})`
    : "var(--mvpb-spacing-3)",
}));
</script>

<style scoped lang="scss">
@use "@/base/breakpoints.scss" as *;

.horizontal-rule {
  width: var(--hr-width);
  max-width: var(--hr-max-width);
  margin: var(--hr-margin) auto;
}

.horizontal-rule--line {
  border: none;
  height: var(--hr-thickness);
  margin: 0;

  .horizontal-rule--solid & {
    background-color: var(--hr-color);
  }

  .horizontal-rule--dashed & {
    background: repeating-linear-gradient(
      90deg,
      var(--hr-color),
      var(--hr-color) 8px,
      transparent 8px,
      transparent 16px
    );
  }

  .horizontal-rule--dotted & {
    background: repeating-linear-gradient(
      90deg,
      var(--hr-color),
      var(--hr-color) 2px,
      transparent 2px,
      transparent 8px
    );
  }
}

@media (min-width: breakpoint(tablet)) {
  .horizontal-rule {
    --hr-thickness: calc(var(--hr-thickness) * 1);
  }
}
</style>
