<template>
  <SectionComponent :section="section">
    <div class="hero-wrapper">
      <div class="hero-content">
        <h1 v-if="section.content?.heading" class="hero-heading">
          <span v-html="section.content.heading"></span>
        </h1>
        <p v-if="section.content?.subheading" class="hero-subheading">
          {{ section.content.subheading }}
        </p>
        <div class="hero-cta">
          <ButtonComponent
            v-if="section.content?.buttonText"
            :href="section.content.buttonUrl"
            :variant="section.content.buttonVariant || 'primary'"
          >
            {{ section.content.buttonText }}
          </ButtonComponent>
          <a
            v-if="section.content?.secondaryButtonText"
            :href="section.content.secondaryButtonUrl || '#'"
            class="hero-link"
          >
            {{ section.content.secondaryButtonText }}
          </a>
        </div>
      </div>
      <div v-if="section.content?.imageUrl || section.content?.statsCard" class="hero-visual">
        <div v-if="section.content?.imageUrl" class="hero-image">
          <img :src="section.content.imageUrl" :alt="section.content.imageAlt || 'Dashboard'" />
        </div>
        <div v-if="section.content?.statsCard" class="stats-card">
          <div class="stats-card-header">
            <div class="stats-icon">
              <div class="stats-chart"></div>
            </div>
            <span class="stats-number">{{ section.content.statsCard.number }}</span>
          </div>
          <p class="stats-text">{{ section.content.statsCard.text }}</p>
        </div>
      </div>
    </div>
    <div v-if="section.content?.showScrollIndicator" class="scroll-indicator">
      <div class="scroll-circle">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14m0 0l7-7m-7 7l-7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
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
.hero-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 600px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    min-height: auto;
  }
}

.hero-content {
  text-align: left;
}

.hero-heading {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  color: var(--mvpb-color-dark);

  :deep(strong) {
    color: var(--mvpb-color-primary);
    position: relative;
    display: inline-block;

    &::before {
      content: '';
      position: absolute;
      left: -8px;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 100%;
      background: var(--mvpb-color-primary);
    }
  }
}

.hero-subheading {
  font-size: clamp(1rem, 2vw, 1.125rem);
  margin-bottom: 2rem;
  line-height: 1.6;
  color: var(--mvpb-color-deep-grey);
  max-width: 500px;
}

.hero-cta {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.hero-link {
  color: var(--mvpb-color-primary);
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
}

.hero-visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-image {
  width: 100%;
  max-width: 600px;

  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }
}

.stats-card {
  position: absolute;
  top: 20px;
  right: -20px;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  min-width: 200px;

  @media (max-width: 968px) {
    position: static;
    margin-top: 2rem;
  }
}

.stats-card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.stats-icon {
  width: 40px;
  height: 40px;
  background: var(--mvpb-color-grey-60);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stats-chart {
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, var(--mvpb-color-primary) 0%, var(--mvpb-color-secondary) 100%);
  border-radius: 4px;
}

.stats-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--mvpb-color-dark);
}

.stats-text {
  font-size: 0.875rem;
  color: var(--mvpb-color-deep-grey);
  line-height: 1.4;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s infinite;
}

.scroll-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--mvpb-color-dark);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-10px);
  }
}
</style>
