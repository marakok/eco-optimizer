<template>
  <div v-editable="blok" :class="gridClasses">
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

const gridClasses = computed(() => ({
  grid: true,
  [`grid-${props.blok.layout}`]: true,
  "vertical-spacing": props.blok.verticalSpacing,
  "vertical-align": props.blok.verticalAlign,
  "reverse-mobile": props.blok.reverseMobile,
  flex: props.blok.gridSixtyFourty || props.blok.layout === "half",
  "grid-sixty-fourty": props.blok.gridSixtyFourty,
  "grid-sixty-fourty-reverse":
    props.blok.gridSixtyFourty && props.blok.reverseOrder,
}));
</script>

<style scoped lang="scss">
@use "@/base/breakpoints.scss" as *;

.grid {
  display: grid;
  gap: var(--mvpb-spacing-2);
  width: 100%;

  &.vertical-spacing {
    margin-bottom: var(--mvpb-spacing-3);
  }

  &.reverse-mobile {
    display: flex;
    flex-direction: column-reverse;
  }
}

.grid-full {
  grid-template-columns: 1fr;
}

.grid-half {
  display: flex;
  flex-wrap: wrap;
  gap: var(--mvpb-spacing-2);

  & > div {
    flex: 1 1 100%;
    min-width: 300px;
  }
}

.grid-thirds {
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));

  .grid & {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 120px), 1fr));
  }
}

.grid-quarters {
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));

  .grid & {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 100px), 1fr));
  }
}

.flex {
  display: flex;
  flex-direction: column;
  gap: var(--mvpb-spacing-2);
}

.grid-sixty-fourty-reverse {
  & > div:first-child {
    order: 1;
  }

  & > div:last-child {
    order: 0;
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

  .grid-half > div {
    flex: 0 1 calc(50% - var(--mvpb-spacing-2) / 2);
  }

  .grid-sixty-fourty {
    & > div:first-child {
      flex-basis: 60%;
    }

    & > div:last-child {
      flex-basis: 40%;
    }
  }

  .grid-sixty-fourty-reverse {
    justify-content: flex-end;

    & > div:first-child {
      order: 1;
    }

    & > div:last-child {
      order: 0;
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
