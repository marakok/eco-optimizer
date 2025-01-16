<template>
  <div ref="midHeroRef" v-editable="blok" class="mid-hero">
    <div class="mid-hero--inner" :style="midHeroInnerStyles">
      <div v-if="blok.image?.filename" class="mid-hero--image-container">
        <img
          loading="lazy"
          :src="blok.image.filename"
          aria-label="Mid Hero image"
          class="mid-hero--image"
        />
      </div>
    </div>
    <div
      class="mid-hero--content"
      :class="contentPositionClass"
      :style="contentStyles"
    >
      <div v-if="blok.richText?.length" class="mid-hero--text">
        <StoryblokComponent
          v-for="blok in blok.richText"
          :key="blok._uid"
          :blok="blok"
        />
      </div>
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

const midHeroRef = ref(null);

const midHeroInnerStyles = computed(() => ({
  "--mid-hero-background-color":
    props.blok.backgroundColor || "var(--mvpb-color-light)",
}));

const contentStyles = computed(() => ({
  "--mid-hero-text-color": props.blok.textColor || "inherit",
  color: props.blok.textColor || "inherit",
}));

const contentPositionClass = computed(() => {
  switch (props.blok.contentPosition) {
    case "top-left":
      return "mid-hero--content--top-left";
    case "top-center":
      return "mid-hero--content--top-center";
    case "top-right":
      return "mid-hero--content--top-right";
    case "center-left":
      return "mid-hero--content--center-left";
    case "center-right":
      return "mid-hero--content--center-right";
    case "bottom-left":
      return "mid-hero--content--bottom-left";
    case "bottom-center":
      return "mid-hero--content--bottom-center";
    case "bottom-right":
      return "mid-hero--content--bottom-right";
    default:
      return "mid-hero--content--center";
  }
});
</script>

<style scoped lang="scss">
@use "@/base/breakpoints.scss" as *;

.mid-hero {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1000;
  overflow: hidden;
  transform-origin: 50% 50%;
}

.mid-hero--inner {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  border-radius: var(--mvpb-spacing-base-2);
  overflow: hidden;
  background-color: var(--mid-hero-background-color, var(--mvpb-color-light));
}

.mid-hero--image-container {
  width: 100%;
  aspect-ratio: 9 / 16;
  overflow: hidden;
  max-height: 75dvh;
}

@media (min-width: breakpoint(tablet)) {
  .mid-hero--image-container {
    aspect-ratio: 4 / 3;
    max-height: 50vh;
  }
}

@media (min-width: breakpoint(desktop)) {
  .mid-hero--image-container {
    aspect-ratio: 16 / 9;
    max-height: 75vh;
  }
}

.mid-hero--image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mid-hero--content {
  position: absolute;
  inset: 0;
  display: flex;
  padding: var(--mvpb-spacing-8);
  color: var(--mid-hero-text-color);

  .mid-hero--text {
    max-width: 65ch;
  }

  &--top-left {
    justify-content: flex-start;
    align-items: flex-start;
  }

  &--top-center {
    justify-content: center;
    align-items: flex-start;

    .mid-hero--text {
      text-align: center;
    }
  }

  &--top-right {
    justify-content: flex-end;
    align-items: flex-start;

    .mid-hero--text {
      text-align: right;
    }
  }

  &--center-left {
    justify-content: flex-start;
    align-items: center;
  }

  &--center {
    justify-content: center;
    align-items: center;

    .mid-hero--text {
      text-align: center;
    }
  }

  &--center-right {
    justify-content: flex-end;
    align-items: center;

    .mid-hero--text {
      text-align: right;
    }
  }

  &--bottom-left {
    justify-content: flex-start;
    align-items: flex-end;
  }

  &--bottom-center {
    justify-content: center;
    align-items: flex-end;

    .mid-hero--text {
      text-align: center;
    }
  }

  &--bottom-right {
    justify-content: flex-end;
    align-items: flex-end;

    .mid-hero--text {
      text-align: right;
    }
  }
}
</style>
