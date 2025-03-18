<template>
  <div
    v-editable="blok"
    class="eco-icon"
    :class="{ 'has-background': hasBackground }"
    :style="iconStyles"
  >
    <component :is="getIconComponent()" v-if="blok.iconName" />
  </div>
</template>

<script setup>
import * as Icons from "#/Icons";
import { computed } from "vue";

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

const getIconComponent = () => {
  return Icons[props.blok.iconName] || null;
};

const hasBackground = computed(() => {
  return !!props.blok.backgroundColor;
});

const iconStyles = computed(() => ({
  "--icon-color": props.blok.color,
  "--icon-background": props.blok.backgroundColor,
}));
</script>

<style scoped lang="scss">
.eco-icon {
  --size: 40px;

  color: var(--icon-color);
  background: var(--icon-background);
  width: var(--size);
  height: var(--size);
  display: flex;
  align-items: center;
  justify-content: center;

  &.has-background {
    border-radius: 50%;
  }
}
</style>
