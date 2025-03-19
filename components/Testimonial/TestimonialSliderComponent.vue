<template>
  <div class="testimonial-slider" :style="sliderStyles" ref="sliderRef">
    <Carousel
      :breakpoints="breakpoints"
      :autoplay="autoplay"
      :pauseAutoplayOnHover="true"
      :transition="600"
      :wrapAround="false"
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

const sliderStyles = computed(() => ({
  "--slider-background-color": props.backgroundColor || "#000", // Default to black background like in your screenshot
}));
</script>

<style scoped lang="scss">
@use "@/base/breakpoints.scss" as *;

.testimonial-slider {
  --size: 50px;

  position: relative;
  width: 75%;
  background-color: var(--slider-background-color, transparent);
}

.testimonial-slide {
  padding: 0 var(--mvpb-spacing-2);
  height: auto;
  display: flex;

  @media (min-width: breakpoint(tablet)) {
    padding: 0 var(--mvpb-spacing-1);
  }
}

:deep(.carousel) {
  padding-bottom: calc(var(--mvpb-spacing-base-12) * 2.2);
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
  position: absolute;
  height: var(--size);
  width: var(--size);
  color: var(--mvpb-color-grey-20);
  border-radius: 50%;

  top: auto;
  bottom: 0;

  @media (min-width: breakpoint(desktop)) {
    transform: translateY(100%);
  }

  &:hover {
    color: var(--mvpb-color-light);
    outline: 2px solid var(--mvpb-color-grey-700);
  }
}

:deep(.carousel__prev) {
  left: -25px;

  @media (min-width: breakpoint(tablet)) {
    left: -25px;
  }
}

:deep(.carousel__next) {
  left: var(--size);

  @media (min-width: breakpoint(tablet)) {
    left: var(--size);
  }
}

:deep(.carousel__pagination) {
  margin-top: var(--mvpb-spacing-6);
}

:deep(.carousel__pagination-button) {
  &::after {
    background-color: var(--mvpb-color-grey-20);
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
