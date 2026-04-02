<template>
  <SectionComponent :section="section">
    <div class="hero-content">
      <h1 v-if="section.content?.heading" class="hero-heading">
        {{ section.content.heading }}
      </h1>
      <p v-if="section.content?.subheading" class="hero-subheading">
        {{ section.content.subheading }}
      </p>
      <div v-if="section.content?.buttonText" class="hero-cta">
        <ButtonComponent
          :href="section.content.buttonUrl"
          :variant="section.content.buttonVariant || 'primary'"
        >
          {{ section.content.buttonText }}
        </ButtonComponent>
      </div>
    </div>
  </SectionComponent>
</template>

<script setup>
const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero-heading {
  font-size: var(--mvpb-font-size-9);
  font-family: var(--mvpb-font-primary-bold);
  margin-bottom: var(--mvpb-spacing-4);
  line-height: 1.2;
}

.hero-subheading {
  font-size: var(--mvpb-font-size-5);
  margin-bottom: var(--mvpb-spacing-6);
  line-height: 1.6;
}

.hero-cta {
  display: flex;
  justify-content: center;
  gap: var(--mvpb-spacing-4);
}
</style>
