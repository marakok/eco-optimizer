<template>
  <Teleport to="body">
    <div class="mobile-nav-wrapper" :class="{ 'is-open': isOpen }">
      <div class="mobile-nav-overlay" @click="closeNav"></div>
      <nav class="mobile-nav">
        <div class="mobile-nav-header">
          <NuxtLink to="/" @click="closeNav" class="mobile-nav-logo">
            <LogoComponent />
          </NuxtLink>
        </div>
        <ul class="mobile-nav-list" v-if="navItems?.length">
          <li
            v-for="navItem in navItems"
            :key="navItem._uid"
            class="mobile-nav-item"
          >
            <ul>
              <li class="mobile-subnav-item">
                <NuxtLink
                  :to="`/${navItem.link.cached_url}`"
                  class="mobile-subnav-link"
                  @click="closeNav"
                >
                  {{ navItem.link.story.name }}
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
        <div class="mobile-nav-footer">
          <NuxtLink to="/contact" class="mobile-subnav-link" @click="closeNav">
            <ButtonComponent variant="primary">Contact us</ButtonComponent>
          </NuxtLink>
        </div>
      </nav>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  navigationData: {
    type: Object,
    required: true,
  },
});

const navItems = computed(() => props.navigationData);
const isOpen = ref(false);
const openCategory = ref(null);

const toggleNav = () => {
  isOpen.value = !isOpen.value;
  if (!isOpen.value) {
    openCategory.value = null;
  }
};

const closeNav = () => {
  isOpen.value = false;
  openCategory.value = null;
};

defineExpose({ toggleNav });
</script>

<style scoped lang="scss">
@use "@/base/breakpoints.scss" as *;

.mobile-nav-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100000;
  pointer-events: none;

  &.is-open {
    pointer-events: auto;
  }
}

.mobile-subnav-link {
  text-decoration: none;
  transition: color 0.3s;
  color: var(--mvpb-color-dark);
}

.mobile-subnav-link:hover {
  text-decoration: none;
  color: var(--mvpb-color-tertiary);
}

.mobile-nav-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;

  .is-open & {
    opacity: 1;
  }
}

.mobile-nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 80%;
  max-width: 300px;
  height: 100%;
  background-color: var(--mvpb-color-light);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  .is-open & {
    transform: translateX(0);
  }
}

.mobile-nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--mvpb-spacing-4);
}

.mobile-nav-logo {
  text-decoration: none;
  color: var(--mvpb-color-dark);
}

.mobile-nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toggle-icon {
  transition: transform 0.3s ease;

  &.is-open {
    transform: rotate(180deg);
  }
}

.mobile-subnav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: var(--mvpb-color-pastel-yellow);
  overflow: hidden;
}

.mobile-subnav-item {
  // padding: var(--mvpb-spacing-4);
}

.mobile-nav-footer {
  margin-top: auto;
  padding: var(--mvpb-spacing-4);
}
</style>
