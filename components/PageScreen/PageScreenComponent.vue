<template>
  <Transition @enter="onEnter" @leave="onLeave">
    <div v-if="isVisible" class="page-screen" ref="pageScreenElement">
      <div class="heart-container">
        <LogoIconSmall class="logo-icon" ref="logoIcon" />
      </div>
    </div>
  </Transition>
</template>

<script setup>
const { $gsap: gsap } = useNuxtApp();

const pageScreenElement = ref(null);
const logoIcon = ref(null);
const { isLoading } = usePageLoading();
const isVisible = ref(false);

const onEnter = (el, done) => {
  const tl = gsap.timeline({
    onComplete: done,
  });

  tl.set(logoIcon.value.$el, {
    scale: 0.1,
    opacity: 1,
    color: "var(--mvpb-color-primary)",
  });

  tl.to(logoIcon.value.$el, {
    scale: 3.5,
    duration: 1.2,
    ease: "power2.inOut",
  }).to(logoIcon.value.$el, {
    scale: 0.1,
    duration: 1.2,
    ease: "power2.inOut",
  });
};

const onLeave = (el, done) => {
  if (!logoIcon.value) {
    done();
    return;
  }

  const tl = gsap.timeline({
    onComplete: () => {
      setTimeout(() => {
        isVisible.value = false;
        done();
      }, 0.8);
    },
  });

  tl.to(logoIcon.value.$el, {
    opacity: 0,
    duration: 0.8,
    ease: "power2.in",
  });
};

watch(isLoading, (newValue) => {
  if (newValue) {
    isVisible.value = true;
  } else {
    nextTick(() => {
      onLeave(pageScreenElement.value, () => {});
    });
  }
});

onMounted(() => {
  if (isLoading.value) {
    isVisible.value = true;
  }
});
</script>

<style scoped lang="scss">
.page-screen {
  position: fixed;
  inset: 0;
  z-index: 500;
  background-color: var(--mvpb-color-light);
  display: flex;
  align-items: center;
  justify-content: center;
}

.heart-container {
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon {
  width: 100%;
  height: 100%;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
}
</style>
