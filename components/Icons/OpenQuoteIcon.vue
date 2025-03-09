<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="viewBox"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.8801 25.9599V17.7999C17.8801 13.1279 18.9681 9.28788 21.1441 6.27988C23.3841 3.20788 26.6161 1.22388 30.8401 0.327881V5.60788C28.7921 6.11988 27.1921 7.07988 26.0401 8.48788C24.8881 9.83188 24.1841 11.4959 23.9281 13.4799H28.9201V25.9599H17.8801ZM0.120117 25.9599V17.7999C0.120117 13.1279 1.20812 9.28788 3.38412 6.27988C5.62412 3.20788 8.85612 1.22388 13.0801 0.327881V5.60788C11.0321 6.11988 9.43212 7.07988 8.28012 8.48788C7.12812 9.83188 6.42412 11.4959 6.16812 13.4799H11.1601V25.9599H0.120117Z"
      fill="currentColor"
    />
  </svg>
</template>

<script setup>
const props = defineProps({
  width: {
    type: [Number, String],
    default: 31,
  },
  height: {
    type: [Number, String],
    default: 26,
  },
  viewBox: {
    type: String,
    default: "0 0 31 26",
  },
});
</script>
