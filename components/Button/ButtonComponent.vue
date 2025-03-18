<template>
  <button class="button" :type="type" :disabled="disabled" :class="classes">
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

const classes = computed(() => ({
  [props.variant]: VALID_VARIANTS.includes(props.variant),
  disabled: props.disabled,
}));
</script>

<style scoped lang="scss">
.button {
  --border-radius: 35px;

  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: background-color 0.4s, color 0.4s;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--mvpb-spacing-base-4);
  border: none;
  margin: 0;
  min-height: 50px;
  padding: var(--mvpb-spacing-base-5) var(--mvpb-spacing-base-6);
}

.button.primary {
  border-radius: var(--border-radius);
  font-family: var(--mvpb-font-primary-semi-bold);
  background-color: var(--mvpb-color-evening);
  color: var(--mvpb-color-light);
}

.button.primary:hover:not(.disabled),
.button.primary:focus:not(.disabled) {
  background-color: color-mix(in srgb, var(--mvpb-color-evening), black 20%);
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
  border-radius: var(--border-radius);
  font-family: var(--mvpb-font-primary-semi-bold);
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
  font-size: var(--mvpb-font-size-input);
  gap: var(--mvpb-spacing-base-4);
  margin: 0;
}

.button--icon {
  font-size: var(--mvpb-font-size-7);
}
</style>
