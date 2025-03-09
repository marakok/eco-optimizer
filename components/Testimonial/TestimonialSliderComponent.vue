<template>
  <div class="testimonial-slider" :style="sliderStyles" ref="sliderRef">
    <Carousel
      :breakpoints="breakpoints"
      :autoplay="autoplay"
      :pauseAutoplayOnHover="true"
      :transition="600"
      :wrapAround="true"
      :snapAlign="'center'"
    >
      <Slide
        v-for="(testimonial, index) in testimonials"
        :key="index"
        class="testimonial-slide"
      >
        <TestimonialComponent :blok="testimonial" :index="index" />
      </Slide>

      <template #addons>
        <Navigation v-if="showNavigation" />
      </template>
    </Carousel>
  </div>
</template>

<script setup>
const props = defineProps({
  testimonials: {
    type: Array,
    default: () => [],
  },
  backgroundColor: {
    type: String,
    default: "transparent",
  },
  autoplay: {
    type: Number,
    default: 5000, // 5 seconds
  },
  showNavigation: {
    type: Boolean,
    default: false,
  },
  animate: {
    type: Boolean,
    default: false,
  },
});

const sliderRef = ref(null);

const breakpoints = ref({
  320: {
    itemsToShow: 1,
    snapAlign: "center",
  },
  768: {
    itemsToShow: 1.5,
    snapAlign: "center",
  },
  1024: {
    itemsToShow: 2.2,
    snapAlign: "center",
  },
  1280: {
    itemsToShow: 2.8,
    snapAlign: "center",
  },
  1440: {
    itemsToShow: 3.2,
    snapAlign: "center",
  },
});

const sliderStyles = computed(() => ({
  "--slider-background-color": props.backgroundColor || "#000", // Default to black background like in your screenshot
}));
</script>

<style scoped lang="scss">
@use "@/base/breakpoints.scss" as *;

.testimonial-slider {
  position: relative;
  width: 100%;
  background-color: var(--slider-background-color, transparent);
  padding: var(--mvpb-spacing-6) 0;
}

.testimonial-slide {
  padding: 0 var(--mvpb-spacing-2);
  height: auto;
  display: flex;

  @media (min-width: breakpoint(tablet)) {
    padding: 0 var(--mvpb-spacing-1);
  }
}

:deep(.carousel__viewport) {
  overflow: visible;
}

:deep(.carousel__slide) {
  transition: all 0.3s ease;
  text-align: left;

  &:hover {
    z-index: 10;
  }
}

:deep(.carousel__prev),
:deep(.carousel__next) {
  height: 50px;
  width: 50px;
  color: var(--mvpb-color-light);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;

  top: 50%;
  transform: translateY(-50%);

  &:hover {
    color: var(--mvpb-color-primary);
    background-color: rgba(255, 255, 255, 0.3);
  }

  @media (min-width: breakpoint(tablet)) {
    top: 50%;
  }
}

:deep(.carousel__prev) {
  left: -25px;

  @media (min-width: breakpoint(tablet)) {
    left: -25px;
  }
}

:deep(.carousel__next) {
  right: -25px;

  @media (min-width: breakpoint(tablet)) {
    right: -25px;
  }
}

:deep(.carousel__pagination) {
  margin-top: var(--mvpb-spacing-6);
}

:deep(.carousel__pagination-button) {
  &::after {
    background-color: var(--mvpb-color-grey-40);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  &:hover::after {
    background-color: var(--mvpb-color-tertiary);
  }
}

:deep(.carousel__pagination-button--active) {
  &::after {
    background-color: var(--mvpb-color-primary) !important;
    transform: scale(1.2);
  }
}
</style>
