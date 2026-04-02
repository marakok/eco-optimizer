<template>
  <SectionComponent :section="section">
    <div class="testimonials-section">
      <h2 v-if="section.content?.heading" class="testimonials-heading">
        {{ section.content.heading }}
      </h2>
      <TestimonialSliderComponent
        v-if="section.content?.testimonials"
        :testimonials="section.content.testimonials"
      />
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
.testimonials-section {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.testimonials-heading {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: center;
  color: var(--mvpb-color-light);
}
</style>
