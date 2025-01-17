<template>
  <div
    v-editable="blok"
    class="rich-text"
    :class="classes"
    :style="styles"
    ref="contentRef"
  >
    <div
      class="rich-text-content"
      :class="{ 'animate-in': blok.animate, 'full-width': blok.fullWidth }"
      :style="contentContainerStyles"
      v-html="renderedContent"
      @click="handleClick"
      ref="animatedContent"
    ></div>

    <a
      v-if="blok.cta?.linktype === 'url'"
      :href="blok.cta?.url"
      class="rich-text--cta"
      target="_blank"
    >
      <ButtonComponent
        type="button"
        ref="animatedButton"
        :variant="props.blok.ctaVariant || 'tertiary'"
        >{{ blok.ctaText }}</ButtonComponent
      >
    </a>

    <NuxtLink
      v-else-if="blok.cta?.cached_url.length"
      :to="`/${blok.cta.cached_url}`"
      class="rich-text--cta"
      :class="[ctaClasses, { 'animate-in': blok.animate }]"
    >
      <ButtonComponent
        type="button"
        ref="animatedButton"
        :variant="props.blok.ctaVariant || 'tertiary'"
        >{{ blok.ctaText }}</ButtonComponent
      >
    </NuxtLink>
  </div>
</template>

<script setup>
import { inView, animate } from "motion";

const props = defineProps({
  blok: {
    type: Object,
    default: () => ({
      animate: false,
    }),
  },
});

const router = useRouter();
const contentRef = ref(null);
const animatedContent = ref(null);
const animatedButton = ref(null);

const classes = computed(() => ({
  "no-margin": props.blok.noVerticalSpacing,
  [`rich-text--${props.blok.alignment}`]: !!props.blok.alignment,
  [`rich-text--justify-${props.blok.justify}`]: !!props.blok.justify,
}));

const ctaClasses = computed(() => ({
  [`rich-text--cta--${props.blok.ctaAlignment}`]: !!props.blok.ctaAlignment,
}));

const textSizeMultiplier = computed(() => {
  const level = props.blok.textSizeMultiplier || 0;
  return 1 + level * 0.1;
});

const handleClick = (event) => {
  const anchor = event.target.closest("a");

  if (!anchor) return;

  if (
    anchor.getAttribute("uuid") ||
    anchor.getAttribute("href").startsWith("/")
  ) {
    event.preventDefault();
    router.push(anchor.getAttribute("href"));
  } else {
    window.open(href, "_blank");
  }
};

const styles = computed(() => ({
  "--richtext-font-color": props.blok.fontColor,
  "--richtext-font-size-multiplier": textSizeMultiplier.value,
  "--richtext-background-color": props.blok.backgroundColor || "transparent",
  "--container-width": props.blok.containerWidth,
}));

const contentContainerStyles = computed(() => ({
  padding: props.blok.backgroundColor ? "var(--mvpb-spacing-base-6)" : 0,
}));

const renderedContent = computed(() => {
  return renderRichText(props.blok.content);
});

onMounted(() => {
  if (props.blok.animate && contentRef.value) {
    if (animatedButton.value) {
      nextTick(() => {
        animatedButton.value.$el.style.opacity = "0";
        animatedButton.value.$el.style.transform = "translateY(50px)";
      });
    }

    animatedContent.value.style.opacity = "0";
    animatedContent.value.style.transform = "translateY(50px)";

    inView(
      contentRef.value,
      () => {
        if (animatedButton.value) {
          animate(
            animatedButton.value.$el,
            { opacity: 1, transform: "translateY(0px)" },
            {
              duration: 0.6,
              easing: [0.25, 0.1, 0.25, 1.0], // Cubic bezier easing
            }
          );
        }
        animate(
          animatedContent.value,
          { opacity: 1, transform: "translateY(0px)" },
          {
            duration: 0.6,
            easing: [0.25, 0.1, 0.25, 1.0], // Cubic bezier easing
          }
        );
      },
      {
        amount: 0.9,
      }
    );
  }
});
</script>

<style scoped lang="scss">
@use "@/utilities/richText.scss";

.rich-text {
  display: flex;
  flex-direction: column;
  gap: var(--mvpb-spacing-base-5);
  color: var(--richtext-font-color, var(--theme-font-color));
  font-size: calc(1em * var(--richtext-font-size-multiplier, 1));

  &:not(.no-margin) {
    margin: var(--mvpb-spacing-2) 0;
  }

  &--left {
    align-items: flex-start;
    text-align: left;
  }

  &--center {
    align-items: center;
    text-align: center;
  }

  &--right {
    align-items: flex-end;
    text-align: right;
  }

  &--justify-middle {
    align-items: center;
  }

  &--justify-right {
    align-items: flex-end;
  }
}

.rich-text--cta {
  display: block;
  width: fit-content;
  text-decoration: none;
  margin: 0;

  &.animate-in {
    will-change: transform, opacity;
  }

  &--left {
    align-self: flex-start;
  }

  &--center {
    align-self: center;
  }

  &--right {
    align-self: flex-end;
  }
}

.rich-text-content {
  max-width: var(--container-width, 75ch);
  position: relative;
  z-index: 1;
  border-radius: var(--mvpb-spacing-base-2);

  &.full-width {
    width: 100%;
  }

  &.animate-in {
    will-change: transform, opacity;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: var(--richtext-background-color);
    z-index: -1;
  }

  @extend .mvpb-rich-text;
}
</style>
