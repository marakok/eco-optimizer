<template>
  <div class="tile" :style="tileStyles">
    <div v-if="icon" class="tile--icon-container">
      <component :is="icon" v-if="typeof icon !== 'string'" />
      <img v-else :src="icon" :alt="iconAlt || 'Tile icon'" loading="lazy" />
    </div>

    <div v-if="title || description" class="tile--content">
      <h3 v-if="title" class="tile--title">{{ title }}</h3>
      <p v-if="description" class="tile--description">{{ description }}</p>
    </div>

    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: [String, Object],
    default: null,
  },
  iconAlt: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  backgroundColor: {
    type: String,
    default: 'transparent',
  },
});

const tileStyles = computed(() => ({
  "--theme-background-color": props.backgroundColor,
}));
</script>

<style scoped lang="scss">
.tile {
  background-color: var(--theme-background-color);
  padding: var(--mvpb-spacing-1);
}

.tile--icon-container {
  margin-bottom: var(--mvpb-spacing-base-4);

  img {
    max-width: 64px;
    height: auto;
  }
}

.tile--content {
  text-align: left;
}

.tile--title {
  font-family: var(--mvpb-font-primary-semi-bold);
  font-size: var(--mvpb-font-size-4);
  margin: 0 0 var(--mvpb-spacing-base-2);
  color: var(--mvpb-color-primary);
}

.tile--description {
  font-size: var(--mvpb-font-size-3);
  line-height: 1.6;
  margin: 0;
  color: var(--mvpb-color-grey-700);
}
</style>
