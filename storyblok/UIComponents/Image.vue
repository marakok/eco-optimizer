<template>
  <div v-editable="blok" class="image" :class="{ 'flex-grow': blok.flexGrow }">
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
          :style="{ 'object-fit': blok.objectFit || 'cover' }"
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
defineProps({ blok: Object });
</script>

<style scoped lang="scss">
.image {
  --image-size: 45vh;
  position: relative;
  color: var(--theme-color);
  display: flex;

  &.flex-grow {
    flex-grow: 1;
  }

  &--asset {
    height: 100%;
    width: 100%;
    overflow: hidden;
    border-radius: var(--mvpb-spacing-base-3);
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
