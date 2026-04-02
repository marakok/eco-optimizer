<template>
  <SectionComponent :section="section">
    <div class="contact-section">
      <ContactForm />
    </div>
  </SectionComponent>
</template>

<script setup>
const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.contact-section {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
</style>
