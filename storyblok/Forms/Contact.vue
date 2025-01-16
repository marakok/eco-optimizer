<template>
  <div class="contact-form-container">
    <form
      v-if="!isSubmitted"
      @submit.prevent="submitForm"
      class="contact-form"
      :style="formStyles"
      novalidate
    >
      <InputComponent
        v-for="field in inputFields"
        :key="field.id"
        :blok="field"
        v-model="form[field.id]"
        :isValid="isFieldValid[field.id]"
        :isSubmitted="isSubmitted"
        :errorMessage="fieldErrorMessages[field.id]"
      />

      <TextareaComponent
        :blok="messageField"
        v-model="form.message"
        :isValid="isFieldValid.message"
        :isSubmitted="isSubmitted"
        :errorMessage="fieldErrorMessages.message"
      />

      <ButtonComponent
        type="submit"
        class="submit-button"
        :variant="buttonVariant"
        :class="{ 'button-disabled': !isFormValid }"
        :disabled="isLoading || !isFormValid"
      >
        {{ isLoading ? "Submitting..." : "Submit" }}
      </ButtonComponent>
    </form>

    <div v-else class="thank-you-message">
      <div
        v-if="isDoc"
        :style="`color: ${
          props.blok.responseMessageTextColor || 'var(--mvpb-color-light)'
        }`"
        v-html="renderRichText(props.blok.responseMessage)"
      ></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ blok: Object });
const isDoc = ref(props.blok.responseMessage?.type === "doc");

const inputFields = [
  {
    id: "name",
    title: "Name *",
    type: "text",
    placeholder: "What's your name",
    required: true,
  },
  {
    id: "email",
    title: "Email *",
    type: "email",
    placeholder: "What's your email?",
    required: true,
  },
];

const messageField = {
  id: "message",
  title: "Message *",
  placeholder: "How can we help?",
  required: true,
};

const form = reactive({
  name: "",
  email: "",
  message: "",
});

const isFieldValid = reactive({
  name: true,
  email: true,
  message: true,
});

const fieldErrorMessages = reactive({
  name: "Name is required.",
  email: "Please enter a valid email address.",
  message: "Please enter a message.",
});

const { executeRecaptcha } = useGoogleRecaptcha();

const isSubmitted = ref(false);
const isLoading = ref(false);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isFormValid = computed(() => {
  const requiredFields = [...inputFields, messageField].filter(
    (field) => field.required
  );
  const allRequiredFieldsFilled = requiredFields.every(
    (field) => form[field.id].trim() !== ""
  );
  const allFieldsValid = Object.values(isFieldValid).every(
    (isValid) => isValid === true
  );
  const isEmailValid = emailRegex.test(form.email);

  return allRequiredFieldsFilled && allFieldsValid && isEmailValid;
});

const validateForm = () => {
  let isValid = true;
  [...inputFields, messageField].forEach((field) => {
    if (field.required && !form[field.id].trim()) {
      isFieldValid[field.id] = false;
      isValid = false;
    } else if (field.id === "email") {
      isFieldValid.email = emailRegex.test(form.email);
      if (!isFieldValid.email) isValid = false;
    } else {
      isFieldValid[field.id] = true;
    }
  });
  return isValid;
};

const formStyles = computed(() => ({
  "--form-label-color": props.blok.labelColor || "inherit",
  "--form-text-color": props.blok.inputTextColor || "inherit",
  "--form-input-bg-color":
    props.blok.inputBackgroundColor || "var(--mvpb-color-light)",
  "--form-placeholder-color": props.blok.placeholderColor || "primary",
}));

const buttonVariant = computed(() => props.blok.buttonType || "primary");

const submitForm = async () => {
  if (validateForm()) {
    isLoading.value = true;
    const { token } = await executeRecaptcha("submit");

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          pageUri: window.location.href,
          recaptchaToken: token,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      isSubmitted.value = true;
    } finally {
      isLoading.value = false;
    }
  }
};
</script>

<style scoped lang="scss">
.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--dq-spacing-3);
}

.submit-button {
  margin-top: var(--dq-spacing-3);
}

.thank-you-message {
  &:deep(a) {
    color: var(--dq-color-primary);
  }
}
</style>
