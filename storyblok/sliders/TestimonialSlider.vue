<template>
  <div v-editable="blok">
    <TestimonialSliderComponent
      :testimonials="blok.testimonials"
      :backgroundColor="blok.backgroundColor"
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
