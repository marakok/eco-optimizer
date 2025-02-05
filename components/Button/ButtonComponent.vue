<template>
  <button
    class="button"
    :type="type"
    :disabled="disabled"
    :class="classes"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    ref="buttonRef"
  >
    <div class="button--gradient" :style="gradientStyle"></div>
    <small class="button--content">
      <slot></slot>
      <ClientOnly>
        <Icon
          v-if="variant === 'primary'"
          name="uil:arrow-right"
          class="button--icon"
      /></ClientOnly>
    </small>
  </button>
</template>

<script setup>
const props = defineProps({
  variant: { default: "primary", type: String },
  type: { default: "button", type: String },
  disabled: { default: false, type: Boolean },
});

const VALID_VARIANTS = ["primary", "secondary", "tertiary", "quaternary"];

const buttonRef = ref(null);
const mousePosition = reactive({ x: 0, y: 0 });
const isHovering = ref(false);

const gradientStyle = computed(() => {
  if (!isHovering.value || props.variant !== "primary") return { opacity: 0 };

  return {
    opacity: 1,
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, var(--mvpb-color-primary), var(--mvpb-color-primary-dark))`,
  };
});

const handleMouseMove = (event) => {
  if (props.disabled) return;

  const rect = buttonRef.value.getBoundingClientRect();
  mousePosition.x = event.clientX - rect.left;
  mousePosition.y = event.clientY - rect.top;
  isHovering.value = true;
};

const classes = computed(() => ({
  [props.variant]: VALID_VARIANTS.includes(props.variant),
  disabled: props.disabled,
}));

const handleMouseLeave = () => {
  isHovering.value = false;
};
</script>

<style scoped lang="scss">
.button {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: background-color 0.4s, color 0.4s;
  background: none;
  display: flex;
  align-items: center;
  border-radius: var(--mvpb-spacing-base-1);
  justify-content: center;
  gap: var(--mvpb-spacing-base-4);
  border: none;
  margin: 0;
  padding: var(--mvpb-spacing-base-3) var(--mvpb-spacing-base-6);
}

.button.primary {
  border-radius: 25px;
  font-family: var(--mvpb-font-primary-semi-bold);
  background-color: var(--mvpb-color-dark);
  color: var(--mvpb-color-light);
}

.button.primary:hover:not(.disabled),
.button.primary:focus:not(.disabled) {
  background-color: var(--mvpb-color-primary);
}

.button.secondary {
  font-family: var(--mvpb-font-primary-semi-bold);
  background-color: var(--mvpb-color-secondary);
  color: var(--mvpb-color-light);
}

.button.secondary:hover:not(.disabled),
.button.secondary:focus:not(.disabled) {
  background-color: var(--mvpb-color-secondary-dark);
}

.button.tertiary {
  background: none;
  border: 2px solid var(--mvpb-color-dark);
  border-radius: 25px;
  font-family: var(--mvpb-font-primary-semi-bold);
  // background-color: var(--mvpb-color-tertiary);
  color: var(--mvpb-color-dark);
}

.button.tertiary.disabled {
  border-color: var(--mvpb-color-grey-40);
  background-color: var(--mvpb-color-grey-40);
  color: white;
}

.button.tertiary:hover:not(.disabled),
.button.tertiary:focus:not(.disabled) {
  color: var(--mvpb-color-light);
  background-color: var(--mvpb-color-dark);
  border: 2px solid var(--mvpb-color-dark);
}

.button.quaternary {
  font-family: var(--mvpb-font-primary-semi-bold);
  text-decoration: underline;
  color: var(--mvpb-color-dark);
}

.button.quaternary:hover:not(.disabled),
.button.quaternary:focus:not(.disabled) {
  color: var(--mvpb-color-tertiary);
}

.button.disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}

.button.disabled:hover,
.button.disabled:focus {
  background-color: #ccc;
}

.button--content {
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  gap: var(--mvpb-spacing-base-4);
  margin: 0;
}

.button--gradient {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s ease, background 0.5s ease;
  will-change: opacity, background;
}

.button--icon {
  font-size: var(--mvpb-font-size-7);
}
</style>
