<template>
  <div class="form-element">
    <label v-if="label" :for="name" class="form-element--label">
      {{ label }}
    </label>
    <textarea
      class="textarea-component"
      :id="name"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :value="modelValue"
      :class="{ 'invalid-input': error || (!isValid && isSubmitted) }"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
    <small v-if="error || (!isValid && isSubmitted)" class="error-message">
      {{ error || errorMessage }}
    </small>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  label: String,
  name: String,
  placeholder: String,
  required: Boolean,
  error: String,
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
  margin-bottom: var(--mvpb-spacing-base-2);

  &--label {
    text-transform: uppercase;
    margin: 0 0 var(--mvpb-spacing-base-2) var(--mvpb-spacing-base-8);
    color: var(--form-label-color);
  }
}

.textarea-component {
  padding-left: var(--mvpb-spacing-base-8);
  min-height: 175px;
  border: none;
  color: var(--form-text-color);
  background: var(--mvpb-color-grey-800);
  border-radius: 35px;
  width: 100%;
  padding-top: var(--mvpb-spacing-base-6);

  &:focus {
    outline: 1px solid var(--mvpb-color-grey-900);
  }

  &::placeholder {
    color: var(mvpb-color-grey-900);
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
