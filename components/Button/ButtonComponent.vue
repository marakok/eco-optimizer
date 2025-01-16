<template>
  <button class="button" v-bind="$props" :class="classes">
    <small class="button--content"><slot></slot></small>
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
  cursor: pointer;
  transition: background-color 0.1s;
  text-transform: uppercase;
  background: none;
  display: flex;
  align-items: center;
  border-radius: var(--mvpb-spacing-base-1);
  justify-content: center;
  gap: var(--mvpb-spacing-base-4);
  border: none;
  padding: var(--mvpb-spacing-base-3) var(--mvpb-spacing-base-6);
}

.button.primary {
  font-family: var(--mvpb-font-tertiary-semi-bold);
  background-color: var(--mvpb-color-primary);
  color: var(--mvpb-color-light);
}

.button.primary:hover:not(.disabled),
.button.primary:focus:not(.disabled) {
  background-color: var(--mvpb-color-primary-dark);
}

.button.secondary {
  font-family: var(--mvpb-font-tertiary-semi-bold);
  background-color: var(--mvpb-color-secondary);
  color: var(--mvpb-color-light);
}

.button.secondary:hover:not(.disabled),
.button.secondary:focus:not(.disabled) {
  background-color: var(--mvpb-color-secondary-dark);
}

.button.tertiary {
  font-family: var(--mvpb-font-tertiary-semi-bold);
  background-color: var(--mvpb-color-tertiary);
  color: var(--mvpb-color-dark);
}

.button.tertiary:hover:not(.disabled),
.button.tertiary:focus:not(.disabled) {
  background-color: var(--mvpb-color-tertiary-dark);
}

.button.quaternary {
  font-family: var(--mvpb-font-tertiary-semi-bold);
  background-color: var(--mvpb-color-quaternary);
  color: var(--mvpb-color-dark);
}

.button.quaternary:hover:not(.disabled),
.button.quaternary:focus:not(.disabled) {
  background-color: var(--mvpb-color-quaternary-dark);
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  gap: var(--mvpb-spacing-base-4);
  margin: 0;
}

.button--icon {
  font-size: 1.4rem;
  line-height: 1;
}
</style>
