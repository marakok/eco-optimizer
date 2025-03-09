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
        <TestimonialComponent :blok="testimonial" />
      </Slide>

      <template #addons>
        <Navigation v-if="showNavigation" />
        <Pagination v-if="showPagination" />
      </template>
    </Carousel>
  </div>
</template>

<script setup>
const props = defineProps({
  testimonials: {
    type: Array,
    required: true,
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
    default: true,
  },
  showPagination: {
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
  "--slider-background-color": props.backgroundColor,
}));
</script>

<style scoped lang="scss">
@use "@/base/breakpoints.scss" as *;

.testimonial-slider {
  position: relative;
  width: 100%;
  background-color: var(--slider-background-color, transparent);
  padding: var(--mvpb-spacing-3) 0;
}

.testimonial-slide {
  padding: 0 var(--mvpb-spacing-2);
  height: auto;
  display: flex;

  @media (min-width: breakpoint(tablet)) {
    padding: 0 var(--mvpb-spacing-3);
  }
}

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
  color: var(--mvpb-color-dark);
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;

  &:hover {
    color: var(--mvpb-color-primary);
    background-color: white;
  }

  @media (min-width: breakpoint(tablet)) {
    top: 50%;
    transform: translateY(-50%);
  }
}

:deep(.carousel__prev) {
  @media (min-width: breakpoint(tablet)) {
    left: -25px;
    right: auto;
  }
}

:deep(.carousel__next) {
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
