<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="viewBox"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="159.806"
      y="76.3676"
      width="118"
      height="118"
      rx="59"
      transform="rotate(135 159.806 76.3676)"
      fill="#010205"
      stroke="#FAFAFA"
      stroke-width="10"
    />
    <g clip-path="url(#clip0_578_18867)">
      <path
        d="M67.8834 100.409V73.5391H82.0255V52.3259"
        stroke="#A8D67B"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M76.3682 91.924L67.8829 100.409L59.3976 91.924"
        stroke="#A8D67B"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <rect
      x="109.603"
      y="76.3676"
      width="49"
      height="49"
      transform="rotate(135 109.603 76.3676)"
      stroke="black"
    />
    <defs>
      <clipPath id="clip0_578_18867">
        <rect
          x="108.896"
          y="76.3676"
          width="48"
          height="48"
          transform="rotate(135 108.896 76.3676)"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
</template>

<script setup>
const props = defineProps({
  width: {
    type: [Number, String],
    default: 153,
  },
  height: {
    type: [Number, String],
    default: 153,
  },
  viewBox: {
    type: String,
    default: "0 0 153 153",
  },
});
</script>
