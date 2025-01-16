<template>
  <div v-editable="blok" class="slider">
    <Carousel :breakpoints="breakpoints" v-bind="settings">
      <Slide
        v-for="(card, index) in blok.sliderCards"
        :key="index"
        class="carousel-slide"
      >
        <CardComponent :blok="card" ref="cardComponenttRef" />
      </Slide>

      <template #addons>
        <Navigation v-if="blok.navigation" />
      </template>
    </Carousel>
  </div>
</template>

<script setup>
defineProps({ blok: Object });

const breakpoints = ref({
  320: {
    itemsToShow: 1,
  },
  425: {
    itemsToShow: 1.6,
  },
  768: {
    itemsToShow: 2.5,
  },
  1480: {
    itemsToShow: 3.2,
  },
  1820: {
    itemsToShow: 3.8,
  },
});

const settings = ref({
  snapAlign: "center",
  wrapAround: true,
});
</script>

<style scoped lang="scss">
:deep(.carousel__viewport) {
  overflow: visible;
}

:deep(.carousel__track) {
  gap: var(--mvpb-spacing-base-4);
}

:deep(.carousel__slide) {
  transition: all 0.3s ease;

  &:hover {
    z-index: 10;
  }
}

:deep(.carousel__prev),
:deep(.carousel__next) {
  height: 50px;
  width: 50px;
  top: 0;
  right: 0;
  left: auto;
  transform: translateY(-120%);

  &:hover {
    color: var(--mvpb-color-primary);
  }
}

:deep(.carousel__prev) {
  transform: translateY(-120%) translateX(-100%);
}

:deep(.carousel__item) {
  transform-origin: center center;
  transition: all 0.3s ease;
}

:deep(.carousel__slide:hover .carousel__item) {
  transform: scale(1.03);
}

// Adjust positioning for edge slides
:deep(.carousel__slide:first-child),
:deep(.carousel__slide:last-child) {
  .carousel__item {
    transform-origin: center left;
  }
}

:deep(.carousel__slide:last-child) {
  .carousel__item {
    transform-origin: center right;
  }
}
</style>
