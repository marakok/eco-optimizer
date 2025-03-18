<!-- will do primary tile, secomndary tile etc -->

<template>
  <TileComponent :blok="blok" />
</template>

<script setup>
defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped></style>
