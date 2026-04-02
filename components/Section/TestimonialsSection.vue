<template>
  <SectionComponent :section="section">
    <div class="testimonials-section">
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

<style scoped>
.testimonials-section {
  width: 100%;
}
</style>
