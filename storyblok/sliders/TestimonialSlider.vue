<template>
  <div v-editable="blok" class="testimonial-slider-wrapper">
    <div class="testimonial-slider-container">
      <TestimonialSliderComponent
        :testimonials="blok?.testimonials || []"
        :backgroundColor="blok.backgroundColor || '#000'"
        :autoplay="blok.autoplay ? parseInt(blok.autoplaySpeed) : 0"
        :showNavigation="blok.showNavigation !== false"
        :showPagination="blok.showPagination !== false"
        :animate="blok.animate"
      />
    </div>

    <div class="testimonial-slider-footnote" v-if="blok.footNote">
      <div class="footnote-content">
        <component
          v-if="blok.icon"
          :is="getIconComponent()"
          class="footnote-icon"
          :style="{ color: blok.iconColor || 'currentColor' }"
        />
        <div
          class="footnote-text"
          :style="{ color: blok.footNoteColor || 'inherit' }"
          v-html="renderRichText(blok.footNote)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { renderRichText } from "@storyblok/vue";
import * as Icons from "#/Icons";

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

const getIconComponent = () => {
  if (!props.blok.icon) return null;
  return Icons[props.blok.icon] || null;
};
</script>

<style scoped lang="scss">
@use "@/base/breakpoints.scss" as *;

.testimonial-slider-wrapper {
  --icon-size: 30px;
  --spacing: calc(var(--mvpb-spacing-base-12) * 2.5);

  position: relative;
  margin: var(--spacing) 0 var(--mvpb-spacing-base-12) 0;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.testimonial-slider-container {
  width: 100%;
}

.testimonial-slider-footnote {
  align-self: flex-end;

  .footnote-content {
    display: flex;
    gap: var(--mvpb-spacing-base-2);
  }

  .footnote-icon {
    flex-shrink: 0;
    width: var(--icon-size);
    height: var(--icon-size);
  }

  .footnote-text {
    font-size: var(--mvpb-font-size-2);
    line-height: 1.4;

    :deep(p) {
      margin: 0;
      font-size: inherit;
    }
  }
}

@media (min-width: breakpoint(desktop)) {
  .testimonial-slider-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .testimonial-slider-container {
    grid-column: 1 / -1;
  }

  .testimonial-slider-footnote {
    grid-column: 2;
    justify-self: end;
    margin-right: 0;
  }
}

@media (max-width: breakpoint(tablet)) {
  .testimonial-slider-footnote {
    align-self: center;
    margin-top: var(--mvpb-spacing-base-6);
    margin-right: 0;
    width: 100%;
    padding: 0 var(--mvpb-spacing-base-4);

    .footnote-content {
      justify-content: center;
    }
  }
}
</style>
