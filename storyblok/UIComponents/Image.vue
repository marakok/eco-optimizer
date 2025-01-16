<template>
  <div v-editable="blok" class="image">
    <div class="image--container">
      <picture class="image--picture">
        <source media="(min-width: 1280px)" :srcset="blok.desktop?.filename" />
        <source
          media="(min-width: 768px)"
          :srcset="blok.tablet?.filename || blok.desktop?.filename"
        />
        <img
          class="image--asset"
          loading="lazy"
          :class="imageClasses"
          :src="blok.mobile?.filename || blok.desktop?.filename"
          :title="blok.headline"
          :alt="blok.headline"
          :aria-label="blok.headline"
        />
      </picture>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ blok: Object });

const imageClasses = computed(() => ({
  "image-contain": props.blok.contain,
  "image-large": props.blok.large,
  "position-top": props.blok.imageTop,
  "position-bottom": props.blok.imageBottom,
}));
</script>

<style scoped lang="scss">
.image {
  --image-size: 45vh;
  position: relative;
  color: var(--theme-color);

  &--asset {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
    overflow: hidden;
    border-radius: var(--mvpb-spacing-base-3);

    &.image-contain {
      object-fit: contain;
    }

    &.image-large {
      --image-size: 70vh;
    }

    &.position-top {
      object-position: top;
    }

    &.position-bottom {
      object-position: bottom;
    }
  }
}

.image--picture {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: var(--mvpb-spacing-base-3);
}

.image--container {
  position: relative;
}

.image--caption {
  text-align: left;
  margin-top: var(--mvpb-spacing-base-3);
}
</style>
