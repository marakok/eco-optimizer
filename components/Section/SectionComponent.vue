<template>
  <section
    :id="getSectionId()"
    :data-navid="section.title || null"
    class="section"
    :class="[sectionHeightClass, sectionClasses]"
    :style="sectionStyles"
    ref="sectionRef"
  >
    <ClientOnly>
      <component :is="icon" class="section--icon" v-if="section.content?.sectionIcon" />

      <div class="section--background" :style="backgroundStyles">
        <div
          class="section--background-color"
          :class="backgroundPositionClass"
          :style="{
            backgroundColor: section.accent_color || 'var(--theme-accent-color)',
          }"
          ref="backgroundRef"
        />
      </div>
    </ClientOnly>

    <div
      class="section--inner"
      :class="[containerSizeClass, contentPositionClass]"
    >
      <div class="section--content">
        <div
          v-if="section.title"
          class="section--content-title-container"
          :class="sectionTitlePositionClass"
        >
          <p class="section--title">
            {{ section.title }}
          </p>
        </div>

        <slot />
      </div>
    </div>
  </section>
</template>

<script setup>
import * as Icon from "#/Icons";

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
});

const sectionRef = ref(null);
const backgroundRef = ref(null);

const icon = computed(() => {
  if (props.section.content?.sectionIcon) return Icon[props.section.content.sectionIcon];
});

const sectionStyles = computed(() => ({
  "--theme-font-color": props.section.text_color || "var(--mvpb-color-dark)",
  "--section-height": getSectionHeight(),
  "--theme-background-color": props.section.background_color || "transparent",
  "--section-title-color": props.section.content?.sectionTitleColor || "var(--theme-font-color)",
}));

const backgroundStyles = computed(() => ({
  "--theme-accent-color": props.section.accent_color || "var(--theme-accent-color)",
}));

const sectionClasses = computed(() => ({
  "has-background-color": props.section.background_color,
}));

const containerSizeClass = computed(() => {
  switch (props.section.content?.containerSize) {
    case "small":
      return "container-small";
    case "medium":
      return "container";
    default:
      return "container-large";
  }
});

const sectionTitlePositionClass = computed(() => {
  switch (props.section.content?.sectionTitlePosition) {
    case "center":
      return "section--title-center";
    case "right":
      return "section--title-right";
    case "gridRight":
      return "section--title-grid-right";
    default:
      return "section--title-left";
  }
});

const sectionHeightClass = computed(() => {
  const height = props.section.content?.height || "auto";
  return `section--height-${height}`;
});

const getSectionHeight = () => {
  const height = props.section.content?.height;
  switch (height) {
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
      return "auto";
  }
};

const backgroundPositionClass = computed(() => {
  if (props.section.content?.backgroundType !== "half") return "";

  switch (props.section.content?.backgroundPosition) {
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
  switch (props.section.content?.contentPosition) {
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
  }
});

const getSectionId = () => {
  const sectionTypeMap = {
    features: 'features',
    team: 'team',
    faq: 'faq',
    contact: 'contact',
  };

  return sectionTypeMap[props.section.type] || props.section.title || null;
};
</script>

<style scoped lang="scss">
@use "@/base/breakpoints.scss" as *;

.section {
  --section-padding-y: calc(var(--mvpb-spacing-16) * 1.6);
  --section-padding-x: 0;

  position: relative;
  min-height: var(--section-height, auto);
  color: var(--theme-font-color);
  padding: var(--section-padding-y) var(--section-padding-x);

  &.edgeless {
    padding-left: 0;
    padding-right: 0;
  }

  &.section--height-auto {
    min-height: auto;
  }
}

.section--icon {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 1;
}

.section--title {
  text-transform: uppercase;
  font-family: var(--mvpb-font-primary-semi-bold);
  color: var(--section-title-color);
  margin: var(--mvpb-spacing-6) 0 0 0;
}

.section--content-title-container {
  margin-bottom: var(--mvpb-spacing-3);

  &.section--title-left {
    text-align: left;
  }

  &.section--title-center {
    text-align: center;
  }
}

@media (min-width: breakpoint(tablet)) {
  .section--content-title-container {
    margin-bottom: var(--mvpb-spacing-6);

    &.section--title-right {
      text-align: right;
    }

    &.section--title-grid-right {
      display: grid;
      grid-template-columns: 1fr 1fr;

      .section--title {
        margin-left: var(--mvpb-spacing-6);
        grid-column: 2;
      }
    }
  }
}

@media (min-width: breakpoint(tablet)) {
  .section {
    --section-padding-y: var(--mvpb-spacing-8);
  }
}

.section--background {
  position: absolute;
  background-color: var(--theme-background-color);

  &.edgeless {
    inset: 0;
  }

  &:not(&.edgeless) {
    top: 0;
    right: var(--mvpb-spacing-3);
    bottom: 0;
    left: var(--mvpb-spacing-3);
  }

  &:not(&.edgeless) {
    right: var(--section-padding-x);
    left: var(--section-padding-x);
  }
}

.section--background-color {
  position: absolute;
  transition: width 0.5s ease, height 0.5s ease;
}

.section--inner {
  position: relative;
  z-index: 1;
  display: flex;
  min-height: var(--section-height, auto);

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
