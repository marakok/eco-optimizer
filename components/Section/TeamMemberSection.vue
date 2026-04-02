<template>
  <SectionComponent :section="section">
    <div class="team-member-container">
      <div class="team-member-content">
        <h2 v-if="section.content?.heading" class="team-member-heading">
          {{ section.content.heading }}
        </h2>
        <h3 v-if="section.content?.name" class="team-member-name">
          {{ section.content.name }}
        </h3>
        <p v-if="section.content?.title" class="team-member-title">
          {{ section.content.title }}
        </p>
        <div v-if="section.content?.bio" class="team-member-bio">
          <p v-for="(paragraph, index) in section.content.bio" :key="index">
            {{ paragraph }}
          </p>
        </div>
        <ButtonComponent
          v-if="section.content?.buttonText"
          :href="section.content.buttonUrl"
          variant="primary"
        >
          {{ section.content.buttonText }}
        </ButtonComponent>
      </div>
      <div class="team-member-visual">
        <div v-if="section.content?.imageUrl" class="team-member-photo">
          <img :src="section.content.imageUrl" :alt="section.content.name || 'Team Member'" />
        </div>
        <div v-if="section.content?.contact" class="team-member-contact">
          <a v-if="section.content.contact.email" :href="`mailto:${section.content.contact.email}`" class="contact-item">
            <MailIcon />
          </a>
          <a v-if="section.content.contact.linkedin" :href="section.content.contact.linkedin" target="_blank" rel="noopener" class="contact-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a v-if="section.content.contact.phone" :href="`tel:${section.content.contact.phone}`" class="contact-item">
            <PhoneIcon />
          </a>
        </div>
      </div>
    </div>
  </SectionComponent>
</template>

<script setup>
import MailIcon from '~/components/Icons/MailIcon.vue';
import PhoneIcon from '~/components/Icons/PhoneIcon.vue';

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.team-member-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

.team-member-content {
  @media (max-width: 968px) {
    order: 2;
  }
}

.team-member-heading {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--mvpb-color-grey-10);
  margin-bottom: 1rem;
}

.team-member-name {
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--mvpb-color-dark);
}

.team-member-title {
  font-size: 1.125rem;
  color: var(--mvpb-color-deep-grey);
  margin-bottom: 2rem;
}

.team-member-bio {
  margin-bottom: 2rem;

  p {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--mvpb-color-deep-grey);
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.team-member-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  @media (max-width: 968px) {
    order: 1;
  }
}

.team-member-photo {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  overflow: hidden;
  border: 8px solid var(--mvpb-color-grey-60);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.team-member-contact {
  display: flex;
  gap: 1rem;
}

.contact-item {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--mvpb-color-grey-60);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--mvpb-color-dark);
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background: var(--mvpb-color-primary);
    color: white;
  }

  :deep(svg) {
    width: 20px;
    height: 20px;
  }
}
</style>
