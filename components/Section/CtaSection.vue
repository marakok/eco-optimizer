<template>
  <SectionComponent :section="section">
    <div class="cta-wrapper">
      <div class="cta-content">
        <h2 v-if="section.content?.heading" class="cta-heading">
          {{ section.content.heading }}
        </h2>
        <ul v-if="section.content?.bulletPoints" class="cta-bullets">
          <li v-for="(point, index) in section.content.bulletPoints" :key="index">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="white" />
              <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>{{ point }}</span>
          </li>
        </ul>
        <ButtonComponent
          v-if="section.content?.buttonText"
          :href="section.content.buttonUrl"
          variant="secondary"
          class="cta-button"
        >
          {{ section.content.buttonText }}
        </ButtonComponent>
      </div>
      <div v-if="section.content?.imageUrl" class="cta-visual">
        <img :src="section.content.imageUrl" :alt="section.content.imageAlt || 'Dashboard'" />
      </div>
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

<style scoped lang="scss">
.cta-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.cta-content {
  @media (max-width: 968px) {
    order: 1;
  }
}

.cta-heading {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 2rem;
  line-height: 1.2;
  color: white;
}

.cta-bullets {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;

  li {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.25rem;
    font-size: 1.125rem;
    color: white;
    font-weight: 500;

    svg {
      flex-shrink: 0;
      color: var(--mvpb-color-tertiary);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.cta-button {
  background: var(--mvpb-color-primary) !important;
  color: var(--mvpb-color-dark) !important;
  font-weight: 700;
  padding: 1rem 2.5rem;
  font-size: 1.125rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(113, 226, 0, 0.3);
  }
}

.cta-visual {
  width: 100%;

  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 968px) {
    order: 2;
  }
}
</style>
