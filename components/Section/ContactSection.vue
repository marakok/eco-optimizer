<template>
  <SectionComponent :section="section">
    <div class="contact-wrapper">
      <div class="contact-content">
        <h2 v-if="section.content?.heading" class="contact-heading">
          <span v-html="section.content.heading"></span>
        </h2>
        <p v-if="section.content?.subheading" class="contact-subheading">
          {{ section.content.subheading }}
        </p>
        <div class="contact-form">
          <ContactForm />
        </div>
      </div>
      <div v-if="section.content?.contactInfo" class="contact-info">
        <div v-if="section.content.contactInfo.phone" class="info-item">
          <PhoneIcon />
          <div>
            <p class="info-label">Telefoon</p>
            <a :href="`tel:${section.content.contactInfo.phone}`" class="info-value">
              {{ section.content.contactInfo.phone }}
            </a>
          </div>
        </div>
        <div v-if="section.content.contactInfo.email" class="info-item">
          <MailIcon />
          <div>
            <p class="info-label">Email</p>
            <a :href="`mailto:${section.content.contactInfo.email}`" class="info-value">
              {{ section.content.contactInfo.email }}
            </a>
          </div>
        </div>
        <div v-if="section.content.contactInfo.address" class="info-item">
          <LocationIcon />
          <div>
            <p class="info-label">Adres</p>
            <p class="info-value">{{ section.content.contactInfo.address }}</p>
          </div>
        </div>
      </div>
    </div>
  </SectionComponent>
</template>

<script setup>
import PhoneIcon from '~/components/Icons/PhoneIcon.vue';
import MailIcon from '~/components/Icons/MailIcon.vue';
import LocationIcon from '~/components/Icons/LocationIcon.vue';

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.contact-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

.contact-content {
  @media (max-width: 968px) {
    order: 1;
  }
}

.contact-heading {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  color: var(--mvpb-color-light);

  :deep(strong) {
    color: var(--mvpb-color-primary);
  }
}

.contact-subheading {
  font-size: 1.125rem;
  margin-bottom: 2rem;
  color: var(--mvpb-color-grey-30);
  line-height: 1.6;
}

.contact-form {
  width: 100%;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 968px) {
    order: 2;
  }
}

.info-item {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;

  :deep(svg) {
    width: 24px;
    height: 24px;
    color: var(--mvpb-color-primary);
    flex-shrink: 0;
    margin-top: 0.25rem;
  }
}

.info-label {
  font-size: 0.875rem;
  color: var(--mvpb-color-grey-20);
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 1.125rem;
  color: var(--mvpb-color-light);
  line-height: 1.6;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: var(--mvpb-color-primary);
  }
}
</style>
