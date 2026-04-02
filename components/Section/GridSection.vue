<template>
  <SectionComponent :section="section">
    <div class="grid-section">
      <div v-if="section.content?.items" class="grid-container">
        <TileComponent
          v-for="(item, index) in section.content.items"
          :key="index"
          :title="item.title"
          :description="item.description"
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

.grid-section {
  width: 100%;
}

.grid-container {
  display: grid;
  gap: var(--mvpb-spacing-4);
  grid-template-columns: 1fr;
}

@media (min-width: breakpoint(tablet)) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: breakpoint(desktop)) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
