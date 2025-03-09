<template>
  <div v-editable="blok">
    <TestimonialComponent :blok="blok" />
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
