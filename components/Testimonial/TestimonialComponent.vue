<template>
  <div
    class="testimonial"
    :class="layoutClass"
    :style="testimonialStyles"
    ref="testimonialRef"
  >
    <div class="testimonial--inner">
      <div v-if="isOdd" class="testimonial--author-container">
        <div
          v-if="blok.authorImage?.filename"
          class="testimonial--author-image"
        >
          <img
            :src="blok.authorImage.filename"
            :alt="blok.authorName || 'Testimonial author'"
            loading="lazy"
          />
        </div>
        <div class="testimonial--author-info">
          <p class="testimonial--author-name">{{ blok.authorName }}</p>
          <p class="testimonial--author-title">{{ blok.authorTitle }}</p>
        </div>
      </div>

      <div class="testimonial--content-wrapper">
        <div class="testimonial--quote-icon">
          <OpenQuoteIcon
            :color="blok.quoteIconColor || 'var(--mvpb-color-quaternary)'"
          />
        </div>
        <ClientOnly>
          <div class="testimonial--content">
            <!-- Use StoryblokComponent for rendering all content types -->
            <StoryblokComponent
              v-for="contentBlok in blok.content"
              :key="contentBlok._uid"
              :blok="contentBlok"
            />

            <!-- Fallback to legacy text field if no content components -->
            <p
              v-if="!hasContentComponents"
              class="testimonial--text"
              v-html="legacyContent"
            ></p>
          </div>
        </ClientOnly>
      </div>

      <div v-if="!isOdd" class="testimonial--author-container">
        <div
          v-if="blok.authorImage?.filename"
          class="testimonial--author-image"
        >
          <img
            :src="blok.authorImage.filename"
            :alt="blok.authorName || 'Testimonial author'"
            loading="lazy"
          />
        </div>
        <div class="testimonial--author-info">
          <p class="testimonial--author-name">{{ blok.authorName }}</p>
          <p class="testimonial--author-title">{{ blok.authorTitle }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import OpenQuoteIcon from "../Icons/OpenQuoteIcon.vue";

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    default: 0,
  },
});

const testimonialRef = ref(null);
const isOdd = computed(() => props.index % 2 === 0);

const layoutClass = computed(() => ({
  "testimonial--odd": isOdd.value,
  "testimonial--even": !isOdd.value,
}));

const testimonialStyles = computed(() => ({
  "--testimonial-background-color": props.blok.backgroundColor || "#1A1B23",
  "--testimonial-text-color": props.blok.textColor || "#ffffff",
  "--testimonial-author-name-color": props.blok.authorNameColor || "#ffffff",
  "--testimonial-author-title-color": props.blok.authorTitleColor || "#9ca3af",
}));

const hasContentComponents = computed(() => {
  return Array.isArray(props.blok.content) && props.blok.content.length > 0;
});

const legacyContent = computed(() => {
  if (props.blok.content?.type === "doc") {
    return renderRichText(props.blok.content);
  }
  return props.blok.text || "";
});
</script>

<style scoped lang="scss">
@use "@/base/breakpoints.scss" as *;

.testimonial {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: var(--testimonial-text-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
}

.testimonial--inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

.testimonial--content-wrapper {
  padding: var(--mvpb-spacing-base-8);
  border-radius: var(--mvpb-border-radius, 0.8rem);
  background-color: var(--testimonial-background-color);
  flex: 1;
  transition: background-color 0.3s ease;

  .testimonial:hover & {
    background-color: color-mix(
      in srgb,
      var(--testimonial-background-color) 95%,
      white
    );
  }
}

.testimonial--quote-icon {
  margin-bottom: var(--mvpb-spacing-1);
  color: var(--mvpb-color-quaternary);
}

.testimonial--content {
  margin-bottom: var(--mvpb-spacing-6);
}

.testimonial--text {
  font-size: var(--mvpb-font-size-5);
  line-height: 1.6;
  font-weight: normal;
  margin: 0;
  text-align: left; /* Ensure text is left aligned */
}

.testimonial--author-container {
  display: flex;
  align-items: center;
  gap: var(--mvpb-spacing-base-4);
}

.testimonial--author-image {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.testimonial--author-info {
  display: flex;
  flex-direction: column;
}

.testimonial--author-name {
  font-family: var(--mvpb-font-primary-semi-bold);
  font-size: var(--mvpb-font-size-3);
  color: var(--testimonial-author-name-color);
  margin: 0;
}

.testimonial--author-title {
  font-size: var(--mvpb-font-size-2);
  color: var(--testimonial-author-title-color);
  margin: 0;
}

.testimonial--odd .testimonial--author-container {
  margin-bottom: var(--mvpb-spacing-base-6);
}

.testimonial--even .testimonial--author-container {
  margin-top: var(--mvpb-spacing-base-6);
}

@media (min-width: breakpoint(tablet)) {
  .testimonial--text {
    font-size: var(--mvpb-font-size-6);
  }
}
</style>
