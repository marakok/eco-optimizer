<template>
  <SectionComponent :section="section">
    <div class="faq-container">
      <h2 v-if="section.content?.heading" class="faq-heading">
        <span v-html="section.content.heading"></span>
      </h2>
      <p v-if="section.content?.subheading" class="faq-subheading">
        {{ section.content.subheading }}
      </p>
      <div class="faq-accordion">
        <div
          v-for="(faq, index) in section.content?.faqs"
          :key="index"
          class="faq-item"
          :class="{ 'is-open': openIndex === index }"
        >
          <button
            class="faq-question"
            @click="toggleFaq(index)"
            :aria-expanded="openIndex === index"
          >
            <span>{{ faq.question }}</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              class="faq-icon"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <div class="faq-answer-wrapper">
            <div class="faq-answer">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="section.content?.buttonText" class="faq-cta">
        <ButtonComponent
          :href="section.content.buttonUrl"
          variant="primary"
        >
          {{ section.content.buttonText }}
        </ButtonComponent>
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

const openIndex = ref(null);

const toggleFaq = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>

<style scoped lang="scss">
.faq-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.faq-heading {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--mvpb-color-light);

  :deep(strong) {
    color: var(--mvpb-color-primary);
  }
}

.faq-subheading {
  font-size: 1.125rem;
  text-align: center;
  color: var(--mvpb-color-grey-30);
  margin-bottom: 3rem;
  line-height: 1.6;
}

.faq-accordion {
  margin-bottom: 3rem;
}

.faq-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:first-child {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
}

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  background: none;
  border: none;
  color: var(--mvpb-color-light);
  font-size: 1.125rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: var(--mvpb-color-primary);
  }

  span {
    flex: 1;
    padding-right: 1rem;
  }
}

.faq-icon {
  flex-shrink: 0;
  transition: transform 0.3s ease;
  color: var(--mvpb-color-primary);

  .is-open & {
    transform: rotate(180deg);
  }
}

.faq-answer-wrapper {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s ease;

  .is-open & {
    max-height: 500px;
  }
}

.faq-answer {
  padding: 0 0 1.5rem 0;
  color: var(--mvpb-color-grey-30);
  line-height: 1.7;
  font-size: 1rem;
}

.faq-cta {
  text-align: center;
}
</style>
