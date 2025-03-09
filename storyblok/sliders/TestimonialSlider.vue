<template>
  <div v-editable="blok" class="testimonial-slider-wrapper">
    <TestimonialSliderComponent
      :testimonials="blok?.testimonials || []"
      :backgroundColor="blok.backgroundColor || '#000'"
      :autoplay="blok.autoplay ? parseInt(blok.autoplaySpeed) : 0"
      :showNavigation="blok.showNavigation !== false"
      :showPagination="blok.showPagination !== false"
      :animate="blok.animate"
    />
  </div>
</template>

<script setup>
defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.testimonial-slider-wrapper {
  width: 100%;
}
</style>
