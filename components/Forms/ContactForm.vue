<template>
  <form @submit.prevent="handleSubmit" class="contact-form">
    <div class="form-group">
      <InputComponent
        v-model="formData.name"
        label="Name"
        name="name"
        type="text"
        required
        :error="errors.name"
      />
    </div>

    <div class="form-group">
      <InputComponent
        v-model="formData.email"
        label="Email"
        name="email"
        type="email"
        required
        :error="errors.email"
      />
    </div>

    <div class="form-group">
      <TextareaComponent
        v-model="formData.message"
        label="Message"
        name="message"
        required
        :error="errors.message"
      />
    </div>

    <div class="form-actions">
      <ButtonComponent type="submit" variant="primary" :disabled="isSubmitting">
        {{ isSubmitting ? 'Sending...' : 'Send Message' }}
      </ButtonComponent>
    </div>

    <div v-if="submitSuccess" class="success-message">
      Thank you for your message! We'll get back to you soon.
    </div>

    <div v-if="submitError" class="error-message">
      {{ submitError }}
    </div>
  </form>
</template>

<script setup>
const formData = reactive({
  name: '',
  email: '',
  message: '',
});

const errors = reactive({
  name: '',
  email: '',
  message: '',
});

const isSubmitting = ref(false);
const submitSuccess = ref(false);
const submitError = ref('');

const { executeRecaptcha } = useGoogleRecaptcha();
const route = useRoute();

const handleSubmit = async () => {
  isSubmitting.value = true;
  submitSuccess.value = false;
  submitError.value = '';

  Object.keys(errors).forEach(key => errors[key] = '');

  try {
    const recaptchaToken = await executeRecaptcha('submit');

    const response = await $fetch('/api/submit', {
      method: 'POST',
      body: {
        ...formData,
        pageUri: route.fullPath,
        recaptchaToken,
      },
    });

    if (response.success) {
      submitSuccess.value = true;
      formData.name = '';
      formData.email = '';
      formData.message = '';
    } else {
      submitError.value = response.error || 'Failed to send message. Please try again.';
    }
  } catch (error) {
    console.error('Form submission error:', error);
    submitError.value = 'An error occurred. Please try again later.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped lang="scss">
.contact-form {
  width: 100%;
}

.form-group {
  margin-bottom: var(--mvpb-spacing-4);
}

.form-actions {
  margin-top: var(--mvpb-spacing-6);
}

.success-message {
  margin-top: var(--mvpb-spacing-4);
  padding: var(--mvpb-spacing-3);
  background-color: var(--mvpb-color-pastel-green);
  color: var(--mvpb-color-dark);
  border-radius: 4px;
}

.error-message {
  margin-top: var(--mvpb-spacing-4);
  padding: var(--mvpb-spacing-3);
  background-color: var(--mvpb-color-salmon-fish);
  color: var(--mvpb-color-light);
  border-radius: 4px;
}
</style>
