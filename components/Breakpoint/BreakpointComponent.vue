<template>
  <p class="breakpoint">
    {{ $viewport.breakpoint }}
  </p>
</template>

<script setup></script>

<style scoped>
.breakpoint {
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 0;
  color: var(--mvpb-color-dark);
  padding: var(--mvpb-spacing-base-2) var(--mvpb-spacing-base-6);
  z-index: 100000;
  text-transform: uppercase;

  backdrop-filter: blur(3px);
}
</style>
