<template>
  <div
    ref="cardRef"
    class="card"
    :class="{
      'card--clickable': isClickable,
      'card--landscape': isLandscape,
      'card--reversed': isLandscape && reverseOrder,
    }"
  >
    <div class="card--inner" :style="cardInnerStyles">
      <div
        v-if="image"
        class="card--image-container"
        :class="{ 'image-only': isImageOnly }"
      >
        <img
          :src="image"
          :alt="imageAlt || 'Card image'"
          class="card--image"
          loading="lazy"
        />
      </div>
      <div
        class="card--content"
        :style="cardContentStyles"
        v-if="text || $slots.default"
      >
        <div class="card--text" v-if="text" v-html="text"></div>
        <slot v-else />

        <ButtonComponent
          v-if="isClickable && ctaText"
          class="card--cta"
          type="button"
          :variant="ctaVariant || 'primary'"
          >{{ ctaText }}</ButtonComponent
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  image: {
    type: String,
    default: null,
  },
  imageAlt: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: null,
  },
  backgroundColor: {
    type: String,
    default: 'var(--mvpb-color-light)',
  },
  fontColor: {
    type: String,
    default: null,
  },
  isClickable: {
    type: Boolean,
    default: false,
  },
  isLandscape: {
    type: Boolean,
    default: false,
  },
  reverseOrder: {
    type: Boolean,
    default: false,
  },
  ctaText: {
    type: String,
    default: null,
  },
  ctaVariant: {
    type: String,
    default: 'primary',
  },
});

const cardRef = ref(null);
const hasColumnParent = ref(false);

const cardInnerStyles = computed(() => ({
  "--card-background-color": props.backgroundColor,
  "--card-font-color": props.fontColor,
}));

const cardContentStyles = computed(() => ({
  "--card-content-padding": hasColumnParent.value
    ? "var(--mvpb-spacing-1)"
    : "0",
}));

const isImageOnly = computed(() => {
  return props.image && !props.text && !props.$slots.default;
});

onMounted(() => {
  hasColumnParent.value =
    cardRef.value?.closest(".column") !== null ||
    cardRef.value?.closest(".carousel__slide") !== null;
});

defineExpose({ cardRef });
</script>

<style scoped lang="scss">
@use "@/utilities/richText.scss";

.card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1000;
  overflow: hidden;
  transform-origin: 50% 50%;

  &--clickable:hover {
    transform: scale(1.03);
    z-index: 1001;
  }

  &--landscape .card--inner {
    flex-direction: row;

    .card--text {
      padding-bottom: var(--mvpb-spacing-1);
    }
  }

  &--landscape.card--reversed .card--inner {
    flex-direction: row-reverse;
  }
}

.card--inner {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  border-radius: var(--mvpb-spacing-base-2);
  overflow: hidden;
  color: var(--card-font-color, var(--theme-font-color));
  background-color: var(
    --card-background-color,
    var(--mvpb-color-bright-white)
  );
}

.card--cta {
  margin-top: var(--mvpb-spacing-3);
}

.card--image-container {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;

  &.image-only {
    aspect-ratio: 4 / 2;
    height: 100%;
  }

  .card--landscape & {
    width: 40%;
    aspect-ratio: 4 / 2;
    height: auto;
  }
}

.card--image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card--content {
  @extend .mvpb-rich-text;

  padding: var(--mvpb-spacing-1) var(--card-content-padding);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .card--text {
    max-width: 65ch;
    text-align: left;
  }

  .card--landscape & {
    width: 60%;
  }
}
</style>
