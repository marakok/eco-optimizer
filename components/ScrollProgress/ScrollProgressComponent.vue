<template>
  <div class="scroll-progress-bar" :style="`width: ${scrollProgress}%`"></div>
</template>

<script setup>
const props = defineProps({ color: String });

const scrollProgress = ref(0);

const updateScrollProgress = () => {
  const scrollPosition = window.scrollY;
  const totalHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.value = (scrollPosition / totalHeight) * 100;
};

onMounted(() => {
  window.addEventListener("scroll", updateScrollProgress);
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateScrollProgress);
});
</script>

<style scoped>
.scroll-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background-color: var(--mvpb-color-tertiary);
  z-index: 1000000000;
  transition: width 0.1s;
}
</style>
