<template>
  <div class="video" ref="videoContainer">
    <video
      ref="videoElement"
      class="video--element"
      :loop="blok.loop"
      muted
      playsinline
      :poster="blok.poster?.filename"
    >
      <source :src="blok.video.filename" type="video/mp4" />
    </video>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from "vue";

const props = defineProps({ blok: Object });
const videoContainer = ref(null);
const videoElement = ref(null);
let observer = null;

onMounted(() => {
  if (props.blok.autoplay) {
    videoElement.value.play();
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoElement.value.play();
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  if (videoContainer.value) {
    observer.observe(videoContainer.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped lang="scss">
@use "@/base/responsive.scss";

.video {
  display: flex;
  align-items: center;
  justify-content: center;
}

.video--element {
  width: 100%;
  max-height: 90vh;
  object-fit: cover;
  object-position: 50% 50%;
}
</style>
