<template>
  <div v-editable="blok" class="accordion">
    <UAccordion
      size="xl"
      :items="blok.items"
      :ui="{ wrapper: 'accordion--wrapper', container: 'accordion--container' }"
    >
      <template #default="{ item, open, index }">
        <p
          class="accordion--label"
          :class="{ open: open }"
          :style="{
            color: item.textColor || 'inherit',
            backgroundColor: item.backgroundColor || null,
          }"
        >
          <span class="accordion--label-text">{{ item.label }}</span>
          <span class="accordion--label-arrow"
            ><Icon name="uil:angle-right"
          /></span>
        </p>
      </template>

      <template #item="{ item, open }">
        <div
          :class="['accordion--content', { open: open }]"
          :style="{
            color: item.textColor || 'inherit',
            backgroundColor: item.backgroundColor || null,
          }"
          class="accordion--container"
        >
          <Transition name="accordion-fade">
            <div v-if="open" class="accordion--content-inner">
              <StoryblokComponent
                v-for="contentBlok in item.content"
                :key="contentBlok._uid"
                :blok="contentBlok"
              />
            </div>
          </Transition>
        </div>
      </template>
    </UAccordion>
  </div>
</template>

<script setup>
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.accordion {
  position: relative;
  background-color: var(--accordion-background-color);
  color: var(--accordion-text-color);
}

:deep(.accordion--container > div) {
  overflow: hidden;
  transition: height 0.3s ease-out;
}

.accordion--content {
}

:deep(div) {
  padding: 0;
}

.accordion--label {
  font-family: var(--mvpb-font-primary-regular);
  transition: transform 0.3s ease-out;
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--mvpb-spacing-base-3) 0 var(--mvpb-spacing-base-3)
    var(--mvpb-spacing-base-1);
  margin: 0;
  font-size: var(--mvpb-font-size-5);
}

.accordion--label-text {
  position: relative;
  display: inline-block;
}

.accordion--label-arrow {
  display: flex;
  transition: transform 0.2s ease-out;
}

.accordion--label.open {
  .accordion--label-arrow {
    transform: rotate(90deg);
  }
}

.accordion-fade-enter-active,
.accordion-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.accordion-fade-enter-from,
.accordion-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
