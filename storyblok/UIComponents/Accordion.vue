<template>
  <div v-editable="blok" class="accordion" :style="accordionStyles">
    <UAccordion
      size="xl"
      :items="items"
      :ui="{
        wrapper: 'accordion--wrapper',
        container: 'accordion--container',
      }"
    >
      <template #default="{ item, open }">
        <p
          class="accordion--label"
          :class="{ open: open }"
          :style="{
            color: item.textColor || 'inherit',
            backgroundColor: item.backgroundColor || 'transparent',
          }"
        >
          <span class="accordion--label-text">{{ item.label }}</span>
          <span class="accordion--label-arrow">
            <Icon name="uil:angle-right" />
          </span>
        </p>
      </template>

      <template #item="{ item, open, index }">
        <div
          class="accordion--content"
          :class="{ open: open }"
          :style="{
            backgroundColor: item.backgroundColor || 'transparent',
            color: item.textColor || 'inherit',
          }"
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

const items = ref([]);

const accordionStyles = computed(() => ({
  "--accordion-background-color": props.blok.backgroundColor || "transparent",
  "--accordion-text-color": props.blok.textColor || "inherit",
  "--theme-font-color": props.blok.textColor || "inherit",
}));

onMounted(() => {
  items.value = props.blok.items.map((item) => ({
    label: item.label,
    defaultOpen: item.defaultOpen || false,
    content: item.content,
    backgroundColor: item.backgroundColor || null,
    textColor: item.textColor || null,
  }));
});
</script>

<style scoped lang="scss">
.accordion {
  --border-radius: var(--mvpb-border-radius, 0.8rem);

  position: relative;
  background-color: var(--accordion-background-color);
  color: var(--accordion-text-color);
}

:deep(.accordion--wrapper) {
  display: flex;
  flex-direction: column;
  gap: var(--mvpb-spacing-base-4);
}

:deep(.accordion--container) {
  margin-bottom: 0;
  background-color: transparent;
  overflow: hidden;
  border-radius: var(--border-radius);
}

:deep(.accordion--container > div) {
  overflow: hidden;
}

.accordion--label {
  font-family: var(--mvpb-font-primary-regular);
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--mvpb-spacing-base-4) var(--mvpb-spacing-base-6);
  margin: 0;
  font-size: var(--mvpb-font-size-5);
  border-radius: var(--border-radius);
  z-index: 1;
}

.accordion--label.open {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.accordion--label-text {
  position: relative;
  display: inline-block;
  transition: transform 0.3s ease-out;
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

.accordion--content {
  position: relative;
  margin-top: -1px;
  padding: var(--mvpb-spacing-base-4) var(--mvpb-spacing-base-6)
    var(--mvpb-spacing-base-6);
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
  z-index: 0;
  opacity: 0;
  height: 0;
  overflow: hidden;
}

.accordion--content.open {
  opacity: 1;
  height: auto;
  overflow: visible;
}

.accordion--content-inner {
  transform-origin: top;
}

.accordion-fade-enter-active,
.accordion-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.accordion-fade-enter-from,
.accordion-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
