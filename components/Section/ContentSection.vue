<template>
  <SectionComponent :section="section">
    <div class="content-section">
      <div v-if="section.content?.richText" v-html="section.content.richText" class="rich-text" />
      <div v-if="section.content?.items" class="content-grid">
        <CardComponent
          v-for="(item, index) in section.content.items"
          :key="index"
          :title="item.title"
          :description="item.description"
          :icon="item.icon"
        />
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
@use "@/base/breakpoints.scss" as *;

.content-section {
  width: 100%;
}

.rich-text {
  line-height: 1.8;
}

.content-grid {
  display: grid;
  gap: var(--mvpb-spacing-6);
  grid-template-columns: 1fr;
}

@media (min-width: breakpoint(tablet)) {
  .content-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: breakpoint(desktop)) {
  .content-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
