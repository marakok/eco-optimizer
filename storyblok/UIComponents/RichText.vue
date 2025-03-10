<template>
  <div
    v-editable="blok"
    class="rich-text"
    :class="classes"
    :style="styles"
    ref="richTextRef"
  >
    <div
      class="rich-text-content"
      :class="{ 'full-width': blok.fullWidth }"
      :style="contentContainerStyles"
      v-html="processedContent"
      @click="handleClick"
    ></div>

    <a
      v-if="blok.cta?.linktype === 'url'"
      :href="blok.cta?.url"
      class="rich-text--cta"
      target="_blank"
    >
      <ButtonComponent type="button" :variant="blok.ctaVariant || 'tertiary'">{{
        blok.ctaText
      }}</ButtonComponent>
    </a>

    <NuxtLink
      v-else-if="blok.cta?.cached_url?.length"
      :to="`/${blok.cta.cached_url}`"
      class="rich-text--cta"
      :class="ctaClasses"
    >
      <ButtonComponent type="button" :variant="blok.ctaVariant || 'tertiary'">{{
        blok.ctaText
      }}</ButtonComponent>
    </NuxtLink>
  </div>
</template>

<script setup>
import { computed, onMounted, nextTick, ref, h, render } from "vue";
import { renderRichText } from "@storyblok/vue";
import * as Icons from "#/Icons";

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

const richTextRef = ref(null);
const router = useRouter();

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

// Replace icon placeholders in content
const processedContent = computed(() => {
  if (!props.blok.content) return "";

  let htmlContent = renderRichText(props.blok.content);

  // Replace icon tags <IconName /> with the actual icon component
  Object.keys(Icons).forEach((iconName) => {
    // Handle both raw tag and HTML-encoded tag formats
    const iconRegexRaw = new RegExp(`<${iconName}\\s*\\/>`, "g");
    const iconRegexEncoded = new RegExp(`&lt;${iconName}\\s*\\/&gt;`, "g");

    const replacement = `<span class="inline-icon" data-icon="${iconName}"></span>`;

    htmlContent = htmlContent.replace(iconRegexRaw, replacement);
    htmlContent = htmlContent.replace(iconRegexEncoded, replacement);
  });

  return htmlContent;
});

const handleClick = (event) => {
  const anchor = event.target.closest("a");

  if (!anchor) return;

  if (
    anchor.getAttribute("uuid") ||
    anchor.getAttribute("href")?.startsWith("/")
  ) {
    event.preventDefault();
    router.push(anchor.getAttribute("href"));
  } else if (anchor.getAttribute("href")) {
    window.open(anchor.getAttribute("href"), "_blank");
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

// Add the icon components after the component is mounted
onMounted(() => {
  nextTick(() => {
    if (!richTextRef.value) return;

    const iconPlaceholders = richTextRef.value.querySelectorAll(".inline-icon");

    iconPlaceholders.forEach((placeholder) => {
      const iconName = placeholder.dataset.icon;
      if (Icons[iconName]) {
        const IconComponent = Icons[iconName];

        // Create the icon element directly using the render function
        const iconVNode = h(IconComponent);

        // Create a wrapper element
        const wrapper = document.createElement("span");
        wrapper.style.display = "inline-flex";
        wrapper.style.verticalAlign = "middle";
        wrapper.style.alignItems = "center";
        wrapper.style.marginBottom = "0";

        // Replace the placeholder with the wrapper
        placeholder.parentNode.replaceChild(wrapper, placeholder);

        // Render the icon into the wrapper
        render(iconVNode, wrapper);
      }
    });
  });
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

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: var(--richtext-background-color);
    z-index: -1;
  }

  @extend .mvpb-rich-text;

  :deep(p) {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  :deep(.inline-icon) {
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
    margin: 0 0.25rem;
    height: 1em;
  }
}
</style>
