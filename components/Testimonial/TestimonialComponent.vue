<template>
  <div class="testimonial" :style="testimonialStyles" ref="testimonialRef">
    <div class="testimonial--inner">
      <div class="testimonial--quote-icon">
        <OpenQuoteIcon
          :color="blok.quoteIconColor || 'var(--mvpb-color-quaternary)'"
        />
      </div>
      <div class="testimonial--content">
        <p class="testimonial--text" v-html="renderedContent"></p>
      </div>
      <div class="testimonial--author-container">
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
});

const testimonialRef = ref(null);

const testimonialStyles = computed(() => ({
  "--testimonial-background-color": props.blok.backgroundColor || "#1A1B23",
  "--testimonial-text-color": props.blok.textColor || "#ffffff",
  "--testimonial-author-name-color": props.blok.authorNameColor || "#ffffff",
  "--testimonial-author-title-color": props.blok.authorTitleColor || "#9ca3af",
}));

const renderedContent = computed(() => {
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
  border-radius: var(--mvpb-border-radius, 0.8rem);
  background-color: var(--testimonial-background-color);
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
  padding: var(--mvpb-spacing-6);
  height: 100%;
}

.testimonial--quote-icon {
  margin-bottom: var(--mvpb-spacing-4);
  color: var(--mvpb-color-quaternary);
}

.testimonial--content {
  flex: 1;
  margin-bottom: var(--mvpb-spacing-6);
}

.testimonial--text {
  font-size: var(--mvpb-font-size-5);
  line-height: 1.6;
  font-weight: normal;
  margin: 0;
}

.testimonial--author-container {
  display: flex;
  align-items: center;
  gap: var(--mvpb-spacing-4);
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

@media (min-width: breakpoint(tablet)) {
  .testimonial--inner {
    padding: var(--mvpb-spacing-8);
  }

  .testimonial--text {
    font-size: var(--mvpb-font-size-6);
  }
}
</style>
