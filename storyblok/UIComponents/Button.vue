<template>
  <div v-editable="blok">
    <NuxtLink
      v-if="blok.link?.cached_url && blok.variant !== 'quaternary'"
      :to="resolveLink"
      :target="blok.openInNewTab ? '_blank' : '_self'"
      class="storyblok-button"
    >
      <ButtonComponent
        :variant="blok.variant || 'primary'"
        :type="blok.type || 'button'"
        :disabled="blok.disabled"
      >
        {{ blok.text }}
      </ButtonComponent>
    </NuxtLink>

    <ButtonComponent
      v-else
      :variant="blok.variant || 'quaternary'"
      :type="blok.type || 'button'"
      :disabled="blok.disabled"
      :url="blok.link.url"
    >
      {{ blok.text }}
    </ButtonComponent>
  </div>
</template>

<script setup>
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

const resolveLink = computed(() => {
  if (!props.blok.link?.cached_url) return "/";

  // Handle external links that start with http or https
  if (props.blok.link.url?.match(/^https?:\/\//)) {
    return props.blok.link.url;
  }

  // Handle internal Storyblok links
  return `/${props.blok.link.cached_url}`;
});
</script>

<style scoped>
.storyblok-button {
  text-decoration: none;
  margin: 0;
}
</style>
