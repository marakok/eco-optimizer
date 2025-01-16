<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="viewBox"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.75 22.5V20H26.25V22.5H3.75ZM3.75 16.25V13.75H26.25V16.25H3.75ZM3.75 10V7.5H26.25V10H3.75Z"
      fill="currentColor"
    />
  </svg>
</template>

<script setup>
const props = defineProps({
  width: {
    type: [Number, String],
    default: 45,
  },
  height: {
    type: [Number, String],
    default: 45,
  },
  viewBox: {
    type: String,
    default: "0 0 30 30",
  },
});
</script>
