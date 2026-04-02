<template>
  <SectionComponent :section="section">
    <div class="mid-hero-wrapper">
      <div v-if="section.content?.imageUrl" class="mid-hero-image">
        <img :src="section.content.imageUrl" :alt="section.content.imageAlt || 'Dashboard'" />
      </div>
      <div class="mid-hero-content">
        <h2 v-if="section.content?.heading" class="mid-hero-heading">
          <span v-html="section.content.heading"></span>
        </h2>
        <div v-if="section.content?.text" class="mid-hero-text">
          <p v-for="(paragraph, index) in section.content.text" :key="index">
            {{ paragraph }}
          </p>
        </div>
        <ul v-if="section.content?.bulletPoints" class="mid-hero-bullets">
          <li v-for="(point, index) in section.content.bulletPoints" :key="index">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>{{ point }}</span>
          </li>
        </ul>
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
.mid-hero-wrapper {
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

.mid-hero-image {
  width: 100%;

  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 968px) {
    order: 2;
  }
}

.mid-hero-content {
  @media (max-width: 968px) {
    order: 1;
  }
}

.mid-hero-heading {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  color: var(--mvpb-color-dark);

  :deep(strong) {
    color: var(--mvpb-color-quaternary);
  }
}

.mid-hero-text {
  margin-bottom: 2rem;

  p {
    font-size: 1.0625rem;
    line-height: 1.7;
    color: var(--mvpb-color-deep-grey);
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.mid-hero-bullets {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 1rem;
    font-size: 1rem;
    color: var(--mvpb-color-deep-grey);

    svg {
      flex-shrink: 0;
      margin-top: 0.2rem;
      color: var(--mvpb-color-primary);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
