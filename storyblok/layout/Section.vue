<template>
  <section
    v-if="!blok.hide"
    v-editable="blok"
    class="section"
    :class="[sectionHeightClass, sectionClasses]"
    :style="sectionStyles"
    ref="sectionRef"
  >
    <ClientOnly>
      <div
        class="section--background"
        :class="sectionBorderClass"
        :style="[backgroundStyles, borderStyles]"
      >
        <div
          class="section--background-color"
          :class="backgroundPositionClass"
          :style="{
            backgroundColor: blok.accentColor || 'var(--theme-accent-color)',
          }"
          ref="backgroundRef"
        />
      </div>
    </ClientOnly>

    <div class="section--inner container" :class="contentPositionClass">
      <div class="section--content">
        <p v-if="blok.sectionTitle" class="section--title">
          {{ blok.sectionTitle }}
        </p>
        <StoryblokComponent
          v-for="nestedBlok in blok.body"
          :key="nestedBlok._uid"
          :blok="nestedBlok"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { inView } from "motion";

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

const sectionRef = ref(null);
const backgroundRef = ref(null);

const sectionStyles = computed(() => ({
  "--theme-font-color": props.blok.textColor || "var(--mvpb-color-dark)",
  "--section-height": getSectionHeight(),
  "--theme-background-color": props.blok.backgroundColor || "transparent",
  "--section-padding-x": props.blok.removeHorizontalPadding
    ? "0"
    : "var(--mvpb-spacing-3)",
  "--section-padding-y": props.blok.removeVerticalPadding
    ? "0"
    : "var(--mvpb-spacing-3)",
  "--section-margin-bottom": props.blok.removeVerticalSpacing
    ? "0"
    : "var(--mvpb-spacing-3)",
}));

const backgroundStyles = computed(() => ({
  "--theme-accent-color": props.blok.accentColor || "var(--theme-accent-color)",
}));

const sectionClasses = computed(() => ({
  "has-background-color": props.blok.backgroundColor,
}));

const sectionHeightClass = computed(() => {
  switch (props.blok.height) {
    case "100":
      return "section--height-100";
    case "90":
      return "section--height-90";
    case "80":
      return "section--height-80";
    case "75":
      return "section--height-75";
    case "66":
      return "section--height-66";
    case "50":
      return "section--height-50";
    case "33":
      return "section--height-33";
    case "25":
      return "section--height-25";
    case "20":
      return "section--height-20";
    case "10":
      return "section--height-10";
    case "auto":
      return "section--height-auto";
    default:
      return "section--height-75";
  }
});

const sectionBorderClass = computed(() => ({
  edgeless: props.blok.edgeless,
  "has-border": props.blok.hasBorder,
  "border-radius": props.blok.borderRadius,
}));

const borderStyles = computed(() => ({
  "--border-color": props.blok.borderColor || "var(--theme-accent-color)",
}));

const getSectionHeight = () => {
  switch (props.blok.height) {
    case "100":
      return "100vh";
    case "90":
      return "90vh";
    case "80":
      return "80vh";
    case "75":
      return "75vh";
    case "66":
      return "66vh";
    case "50":
      return "50vh";
    case "33":
      return "33vh";
    case "25":
      return "25vh";
    case "20":
      return "20vh";
    case "10":
      return "10vh";
    case "auto":
      return "auto";
    default:
      return "75vh";
  }
};

const backgroundPositionClass = computed(() => {
  if (props.blok.backgroundType !== "half") return "";

  switch (props.blok.backgroundPosition) {
    case "right":
      return "section--background-color--right";
    case "top":
      return "section--background-color--top";
    case "bottom":
      return "section--background-color--bottom";
    default:
      return "section--background-color--left";
  }
});

const contentPositionClass = computed(() => {
  switch (props.blok.contentPosition) {
    case "top-left":
      return "section--inner--top-left";
    case "top-center":
      return "section--inner--top-center";
    case "top-right":
      return "section--inner--top-right";
    case "center-left":
      return "section--inner--center-left";
    case "center-right":
      return "section--inner--center-right";
    case "bottom-left":
      return "section--inner--bottom-left";
    case "bottom-center":
      return "section--inner--bottom-center";
    case "bottom-right":
      return "section--inner--bottom-right";
    default:
      return "section--inner--center";
  }
});

onMounted(() => {
  if (sectionRef.value) {
    inView(
      sectionRef.value,
      () => {
        // Your existing animation logic
      },
      { amount: 0.5 }
    );
  }
});
</script>

<style scoped lang="scss">
@use "@/base/breakpoints.scss" as *;

.section {
  position: relative;
  min-height: var(--section-height, 75vh);
  color: var(--theme-font-color);
  margin-bottom: var(--section-margin-bottom);
  padding: var(--mvpb-spacing-3) 0;

  &.edgeless {
    padding-left: 0;
    padding-right: 0;
  }

  &.section--height-auto {
    min-height: auto;
  }

  &.has-background-color {
    padding-left: var(--mvpb-spacing-base-4);
    padding-right: var(--mvpb-spacing-base-4);
  }
}

.section--title {
  text-transform: uppercase;
  font-family: var(--mvpb-font-primary-semi-bold);
  color: var(--theme-font-color);
  margin: var(--mvpb-spacing-6) 0 0 0;
}

@media (min-width: breakpoint(tablet)) {
  .section {
    padding: var(--section-padding-y) var(--section-padding-x);

    &.has-background-color {
      padding: var(--section-padding-y) var(--section-padding-x);
    }
  }
}

.section--background {
  position: absolute;
  background-color: var(--theme-background-color);

  &.has-border {
    border: 2px solid var(--border-color, var(--theme-accent-color));
  }

  &.edgeless {
    inset: 0;
    border-left: 0;
    border-right: 0;
  }

  &:not(&.edgeless) {
    top: 0;
    right: var(--mvpb-spacing-3);
    bottom: 0;
    left: var(--mvpb-spacing-3);
  }

  &.border-radius {
    border-radius: var(--mvpb-border-radius);
  }

  &:not(&.edgeless) {
    top: var(--section-padding-y);
    right: var(--section-padding-x);
    bottom: var(--section-padding-y);
    left: var(--section-padding-x);
  }
}

.section--background-color {
  position: absolute;
  transition: width 0.5s ease, height 0.5s ease; /* Add smooth transitions */
}

.section--inner {
  position: relative;
  z-index: 1;
  display: flex;
  min-height: var(--section-height, 75vh);
  padding: 0 var(--mvpb-spacing-base-8);

  &--top-left {
    align-items: flex-start;
  }

  &--top-center {
    .section--content {
      display: flex;
      justify-content: center;
    }
  }

  &--top-right {
    .section--content {
      display: flex;
      justify-content: flex-end;
    }
  }

  &--center-left {
    align-items: center;
  }

  &--center {
    justify-content: center;
    align-items: center;
  }

  &--center-right {
    justify-content: flex-end;
    align-items: center;

    .section--content {
      display: flex;
      justify-content: flex-end;
    }
  }

  &--bottom-left {
    justify-content: flex-start;
    align-items: flex-end;
  }

  &--bottom-center {
    align-items: flex-end;

    .section--content {
      display: flex;
      justify-content: center;
    }
  }

  &--bottom-right {
    align-items: flex-end;

    .section--content {
      display: flex;
      justify-content: flex-end;
    }
  }

  &--center {
    align-items: center;

    .section--content {
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
  }
}

.section--content {
  width: 100%;
  height: 100%;
  max-width: 100%;
}
</style>
