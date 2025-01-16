<template>
  <component
    :is="linkWrapper"
    :to="`/${linkPath}`"
    :target="linkTarget"
    class="card--link-wrapper"
  >
    <CardComponent
      :blok="blok"
      :isClickable="isClickable"
      ref="cardComponenttRef"
    />
  </component>
</template>

<script setup>
import { NuxtLink } from "#components";

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

const cardComponenttRef = ref(null);

const isClickable = computed(() => {
  return !!props.blok.link?.cached_url;
});

const linkWrapper = computed(() => {
  if (!isClickable.value) return "div";
  return props.blok.link?.cached_url ? NuxtLink : "a";
});

const linkPath = computed(() => {
  return props.blok.link?.cached_url || null;
});

const linkTarget = computed(() => {
  return props.blok.openInNewTab ? "_blank" : "_self";
});
</script>

<style scoped lang="scss">
.card--link-wrapper {
  height: 100%;
  text-decoration: none;
  color: inherit;
  margin: 0;
  display: block;
}
</style>
