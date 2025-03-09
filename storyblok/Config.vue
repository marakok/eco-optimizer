<template>
  <div v-editable="blok"></div>
</template>

<script setup>
defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>
