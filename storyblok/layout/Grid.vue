<template>
  <div v-editable="blok" :style="gridStyles" :class="gridClasses">
    <StoryblokComponent
      v-if="blok.content?.length"
      v-for="blok in blok.content"
      :key="blok._uid"
      :blok="blok"
    />
  </div>
</template>

<script setup>
const props = defineProps({ blok: Object });

const gridClasses = computed(() => {
  const layout = props.blok.layout || "full";

  const isFlexLayout = [
    "sixty-fourty",
    "fourty-sixty",
    "eighty-twenty",
    "twenty-eighty",
  ].includes(layout);

  return {
    grid: !isFlexLayout,
    [`grid-${layout}`]: true,
    "vertical-spacing": props.blok.verticalSpacing,
    "reverse-mobile": props.blok.reverseMobile,
    flex: isFlexLayout,
  };
});

const gridStyles = computed(() => ({
  "padding-top": props.blok.addPaddingTop ? `var(--mvpb-spacing-8)` : "0",
  "padding-bottom": props.blok.addPaddingBottom ? `var(--mvpb-spacing-8)` : "0",
  "column-gap": props.blok.gapHorizontal
    ? `var(--mvpb-spacing-${props.blok.gapHorizontal})`
    : "var(--mvpb-spacing-8)",
  "row-gap": props.blok.gapVertical
    ? `var(--mvpb-spacing-${props.blok.gapVertical})`
    : "var(--mvpb-spacing-8)",
}));
</script>

<style scoped lang="scss">
@use "@/base/breakpoints.scss" as *;

.animate-columns {
  opacity: 0;
  transform: translateY(10px);
  will-change: opacity, transform, scale;
}

.grid {
  display: grid;
  width: 100%;

  &.vertical-spacing {
    margin-bottom: var(--mvpb-spacing-3);
  }

  &.reverse-mobile {
    display: flex;
    flex-direction: column-reverse;
  }
}

.flex {
  display: flex;
  flex-direction: column;
}

.grid-full {
  grid-template-columns: 1fr;
}

.grid-half {
  grid-template-columns: 1fr;
  .grid & {
    grid-template-columns: 1fr;
  }
}

@media (min-width: breakpoint(tablet)) {
  .grid-half {
    grid-template-columns: repeat(2, 1fr);
    .grid & {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

.grid-thirds {
  grid-template-columns: repeat(3, 1fr);
  .grid & {
    grid-template-columns: repeat(3, 1fr);
  }
}

.grid-quarters {
  grid-template-columns: repeat(4, 1fr);
  .grid & {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: breakpoint(tablet)) {
  .flex {
    flex-direction: row;
  }

  .grid {
    &.reverse-mobile {
      display: flex;
      flex-direction: initial;
    }
  }

  // 60/40 layouts
  .grid-sixty-fourty {
    & > div:first-child {
      flex-basis: 60%;
    }
    & > div:last-child {
      flex-basis: 40%;
    }
  }

  .grid-fourty-sixty {
    & > div:first-child {
      flex-basis: 40%;
    }
    & > div:last-child {
      flex-basis: 60%;
    }
  }

  // 80/20 layouts
  .grid-eighty-twenty {
    & > div:first-child {
      flex-basis: 80%;
    }
    & > div:last-child {
      flex-basis: 20%;
    }
  }

  .grid-twenty-eighty {
    & > div:first-child {
      flex-basis: 20%;
    }
    & > div:last-child {
      flex-basis: 80%;
    }
  }
}

@media (min-width: breakpoint(desktop)) {
  .grid-thirds {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .grid-quarters {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
