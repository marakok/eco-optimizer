<template>
  <section
    v-if="!blok.hide"
    :id="blok.sectionTitle || null"
    v-editable="blok"
    class="section"
    :class="[sectionHeightClass, sectionClasses]"
    :style="sectionStyles"
    ref="sectionRef"
  >
    <ClientOnly>
      <component :is="icon" class="section--icon" v-if="blok.sectionIcon" />

      <div class="section--background" :style="backgroundStyles">
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

    <div
      class="section--inner"
      :class="[containerSizeClass, contentPositionClass]"
    >
      <div class="section--content">
        <div
          v-if="blok.sectionTitle"
          class="section--content-title-container"
          :class="sectionTitlePositionClass"
        >
          <p class="section--title">
            {{ blok.sectionTitle }}
          </p>
        </div>

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
import * as Icon from "#/Icons";

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

const sectionRef = ref(null);
const backgroundRef = ref(null);

const icon = computed(() => {
  if (props.blok.sectionIcon) return Icon[props.blok.sectionIcon];
});

const sectionStyles = computed(() => ({
  "--theme-font-color": props.blok.textColor || "var(--mvpb-color-dark)",
  "--section-height": getSectionHeight(),
  "--theme-background-color": props.blok.backgroundColor || "transparent",
  "--section-title-color":
    props.blok.sectionTitleColor || "var(--theme-font-color)",
}));

const backgroundStyles = computed(() => ({
  "--theme-accent-color": props.blok.accentColor || "var(--theme-accent-color)",
}));

const sectionClasses = computed(() => ({
  "has-background-color": props.blok.backgroundColor,
}));

const containerSizeClass = computed(() => {
  switch (props.blok.containerSize) {
    case "small":
      return "container-small";
    case "medium":
      return "container";
    default:
      return "container-large";
  }
});

const sectionTitlePositionClass = computed(() => {
  switch (props.blok.sectionTitlePosition) {
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
  }
});
</script>

<style scoped lang="scss">
@use "@/base/breakpoints.scss" as *;

.section {
  --section-padding-y: calc(var(--mvpb-spacing-16) * 1.6);
  --section-padding-x: 0;

  position: relative;
  min-height: var(--section-height, 75vh);
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
  transition: width 0.5s ease, height 0.5s ease; /* Add smooth transitions */
}

.section--inner {
  position: relative;
  z-index: 1;
  display: flex;
  min-height: var(--section-height, 75vh);

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
