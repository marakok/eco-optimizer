<template>
  <SectionComponent :section="section">
    <div class="features-container">
      <h2 v-if="section.content?.heading" class="features-heading">
        {{ section.content.heading }}
      </h2>
      <div class="features-grid">
        <div
          v-for="(feature, index) in section.content?.features"
          :key="index"
          class="feature-card"
        >
          <div class="feature-icon" v-if="feature.icon">
            <component :is="getIconComponent(feature.icon)" />
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </SectionComponent>
</template>

<script setup>
import LocationIcon from '~/components/Icons/LocationIcon.vue';
import LightningIcon from '~/components/Icons/LightningIcon.vue';
import GraphIcon from '~/components/Icons/GraphIcon.vue';
import StarIcon from '~/components/Icons/StarIcon.vue';

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
});

const getIconComponent = (iconName) => {
  const icons = {
    location: LocationIcon,
    lightning: LightningIcon,
    graph: GraphIcon,
    star: StarIcon,
  };
  return icons[iconName] || StarIcon;
};
</script>

<style scoped lang="scss">
.features-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.features-heading {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: center;
  color: var(--mvpb-color-light);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.feature-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-4px);
  }
}

.feature-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 1.5rem;
  color: var(--mvpb-color-primary);

  :deep(svg) {
    width: 100%;
    height: 100%;
  }
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--mvpb-color-light);
}

.feature-description {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--mvpb-color-grey-30);
}
</style>
