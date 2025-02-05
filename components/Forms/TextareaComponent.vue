<template>
  <div class="form-element">
    <label :for="blok.id" class="form-element--label">{{ blok.title }}</label>
    <span>
      <textarea
        class="textarea-component"
        v-bind="$props"
        :class="{ 'invalid-input': !isValid && isSubmitted }"
        @input="$emit('update:modelValue', $event.target.value)"
      ></textarea>
    </span>
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
    margin: 0 0 var(--mvpb-spacing-base-2) 0;
    color: var(--form-label-color);
  }
}

.textarea-component {
  padding: var(--mvpb-spacing-base-4);
  border: 2px solid var(--mvpb-color-grey-40);
  color: var(--form-text-color);
  background: var(--form-input-bg-color);
  width: 100%;
  min-height: 100px;
  resize: vertical;
  border-radius: var(--mvpb-spacing-base-1);

  &:focus,
  &:hover {
    border-color: var(--mvpb-color-tertiary);
  }

  &::placeholder {
    color: var(--form-placeholder-color);
  }

  &:not(:placeholder-shown):invalid {
    border-color: #ff0000;
    border-bottom: 1px dotted #ff0000;
  }
}

.error-message {
  color: #ff0000;
  font-size: 0.8em;
  margin-top: 5px;
}
</style>
