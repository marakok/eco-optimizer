<template>
  <div
    ref="cardRef"
    v-editable="blok"
    class="card"
    :class="{
      'card--clickable': isClickable,
      'card--landscape': blok.isLandscape,
      'card--reversed': blok.isLandscape && blok.reverseOrder,
    }"
  >
    <div class="card--inner" :style="cardInnerStyles">
      <div
        v-if="blok.image?.filename"
        class="card--image-container"
        :class="{ 'image-only': isImageOnly }"
      >
        <img
          :src="blok.image.filename"
          aria-label="Card image"
          class="card--image"
          loading="lazy"
        />
      </div>
      <div
        class="card--content"
        :style="cardContentStyles"
        v-if="blok.text && renderedText.length"
      >
        <div class="card--text" v-html="renderedText"></div>

        <ButtonComponent
          v-if="isClickable"
          class="card--cta"
          type="button"
          :variant="props.blok.ctaVariant || 'primary'"
          >{{ blok.ctaText }}</ButtonComponent
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
  isClickable: {
    type: Boolean,
    required: false,
  },
});

const cardRef = ref(null);
const hasColumnParent = ref(false);

const cardInnerStyles = computed(() => ({
  "--card-background-color":
    props.blok.backgroundColor || "var(--mvpb-color-light)",
  "--card-font-color": props.blok.fontColor,
}));

const cardContentStyles = computed(() => ({
  "--card-content-padding": hasColumnParent.value
    ? "var(--mvpb-spacing-1)"
    : "0",
}));

const renderedText = computed(() => {
  return props.blok.text ? renderRichText(props.blok.text) : "";
});

const isImageOnly = computed(() => {
  return (
    props.blok.image?.filename &&
    (!props.blok.text || !renderedText.value.length)
  );
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
