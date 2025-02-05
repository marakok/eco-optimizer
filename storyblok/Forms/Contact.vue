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
        {{ isLoading ? "Bezig met verzenden..." : "Registreren" }}
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
import { useReCaptcha } from "vue-recaptcha-v3";

const props = defineProps({ blok: Object });
const isDoc = ref(props.blok.responseMessage?.type === "doc");
const recaptchaInstance = useReCaptcha();

const inputFields = [
  {
    id: "name",
    title: "Naam *",
    type: "text",
    placeholder: "Uw naam?",
    required: true,
  },
  {
    id: "email",
    title: "E-mail *",
    type: "email",
    placeholder: "Uw e-mailadres?",
    required: true,
  },
];

const messageField = {
  id: "message",
  title: "Message",
  placeholder: "Would you like to leave a message?",
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
  name: "Please enter a name.",
  email: "Please enter a valid email address.",
  message: "Let me know how you are.",
});

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
    try {
      await recaptchaInstance?.recaptchaLoaded();

      const token = await recaptchaInstance?.executeRecaptcha("submit");

      if (!token) {
        throw new Error("Failed to get reCAPTCHA token");
      }

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
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      isSubmitted.value = true;
    } catch (error) {
      console.error("Form submission error:", error);
      // Here you might want to show an error message to the user
    } finally {
      isLoading.value = false;
    }
  }
};

onMounted(async () => {
  try {
    await recaptchaInstance?.recaptchaLoaded();
  } catch (error) {
    console.error("Failed to load reCAPTCHA:", error);
  }
});
</script>

<style scoped lang="scss">
.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--dq-spacing-3);
}

.submit-button {
  margin-top: var(--dq-spacing-3);
  margin-bottom: 0;
}

.thank-you-message {
  &:deep(a) {
    color: var(--dq-color-primary);
  }
}
</style>
