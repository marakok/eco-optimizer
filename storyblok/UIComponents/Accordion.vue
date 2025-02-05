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
        <p class="accordion--label" :class="{ open: open }">
          <span class="accordion--label-text">{{ item.label }}</span>
          <span class="accordion--label-arrow"
            ><Icon name="uil:angle-right"
          /></span>
        </p>
      </template>

      <template #item="{ item, open }">
        <div class="accordion--content" :class="{ open: open }">
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
  "--accordion-border-color": props.blok.backgroundColor
    ? darkenColor(props.blok.backgroundColor, 30)
    : "var(--mvpb-color-dark)",
}));

onMounted(() => {
  items.value = props.blok.items.map((item) => ({
    label: item.label,
    defaultOpen: item.defaultOpen || false,
    content: item.content,
  }));
});
</script>

<style scoped lang="scss">
.accordion {
  position: relative;
  background-color: var(--accordion-background-color);
  color: var(--accordion-text-color);
}

:deep(.accordion--container:not(:last-child)) {
  border-bottom: 1px solid var(--accordion-border-color, var(--mvpb-color-dark));
}

:deep(.accordion--container > div) {
  overflow: hidden;
  transition: height 0.3s ease-out;
}

.accordion--content {
  padding: 0 0 var(--mvpb-spacing-base-3) var(--mvpb-spacing-base-3);
}

.accordion--content-inner {
  transform-origin: top;
  transition: opacity 0.3s, transform 0.3s;
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
  transition: transform 0.3s ease-out;
}

.accordion--label:not(.open):hover {
  .accordion--label-text {
    transform: translateX(var(--mvpb-spacing-base-2));
  }
}

.accordion--label-arrow {
  display: flex;
  transition: transform 0.2s ease-out;
}

.accordion--label.open {
  transform: translateX(var(--mvpb-spacing-base-2));

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
