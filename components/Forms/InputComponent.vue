<template>
  <div class="form-element">
    <label :for="blok.id" class="form-element--label">{{ blok.title }}</label>
    <input
      class="input-component"
      v-bind="$props"
      :placeholder="blok.placeholder"
      :class="{ 'invalid-input': !isValid && isSubmitted }"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <small v-if="!isValid && isSubmitted" class="error-message">
      {{ errorMessage }}
    </small>
  </div>
</template>

<script setup>
const props = defineProps({
  blok: Object,
  modelValue: String,
  isValid: {
    type: Boolean,
    default: true,
  },
  isSubmitted: {
    type: Boolean,
    default: false,
  },
  errorMessage: String,
});

defineEmits(["update:modelValue"]);
</script>

<style scoped lang="scss">
.form-element {
  display: flex;
  flex-direction: column;
  width: 100%;

  &--label {
    text-transform: uppercase;
    margin: 0 0 var(--mvpb-spacing-base-2) var(--mvpb-spacing-base-8);
    color: var(--form-label-color);
  }

  &:not(:last-child) {
    margin-bottom: var(--mvpb-spacing-1);
  }
}

.input-component {
  text-indent: var(--mvpb-spacing-base-8);
  min-height: 60px;
  border: none;
  color: var(--form-text-color);
  background: var(--mvpb-color-grey-800);
  border-radius: 35px;
  margin-bottom: 0;

  &:focus {
    outline: 1px solid var(--mvpb-color-grey-900);
  }

  &::placeholder {
    color: var(mvpb-color-grey-900);
  }
}

.error-message {
  color: #ff0000;
  font-size: 0.8em;
  margin-top: 5px;
}
</style>
