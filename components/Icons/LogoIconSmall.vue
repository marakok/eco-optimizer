<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="viewBox"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 6C0 3.17157 0 1.75736 0.87868 0.87868C1.75736 0 3.17157 0 6 0H31.2321C32.2085 0 33 0.791497 33 1.76786C33 19.0169 19.0169 33 1.76786 33C0.791496 33 0 32.2085 0 31.2321V6Z"
      fill="#99EA48"
    />
    <path
      d="M0 6C0 3.17157 0 1.75736 0.87868 0.87868C1.75736 0 3.17157 0 6 0H31.2321C32.2085 0 33 0.791497 33 1.76786C33 19.0169 19.0169 33 1.76786 33C0.791496 33 0 32.2085 0 31.2321V6Z"
      fill="#99EA48"
    />
    <path
      d="M11 17.5C11 14.6716 11 13.2574 11.8787 12.3787C12.7574 11.5 14.1716 11.5 17 11.5H24.25C24.6642 11.5 25 11.8358 25 12.25C25 19.5678 19.0678 25.5 11.75 25.5C11.3358 25.5 11 25.1642 11 24.75V17.5Z"
      fill="#191F33"
    />
  </svg>
</template>

<script setup>
const props = defineProps({
  width: {
    type: [Number, String],
    default: 206,
  },
  height: {
    type: [Number, String],
    default: 34,
  },
  viewBox: {
    type: String,
    default: "0 0 206 34",
  },
});
</script>
