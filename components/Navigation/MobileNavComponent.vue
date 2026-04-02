<template>
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
          :key="navItem.id"
          class="mobile-nav-item"
        >
          <NuxtLink
            :to="navItem.url"
            @click="closeNav"
          >
            {{ navItem.label }}
          </NuxtLink>
        </li>
      </ul>

      <template
        v-if="
          anchorLinksManager.anchorLinks.value &&
          anchorLinksManager.anchorLinks.value.length > 0
        "
      >
        <p class="mobile-nav-list-header">On this page</p>
        <ul class="mobile-nav-list">
          <li
            v-for="anchor in anchorLinksManager.anchorLinks.value"
            :key="anchor.id"
            class="mobile-nav-item"
          >
            <a
              class="mobile-nav-list--subnav-link"
              :href="`#${anchor.id}`"
              @click.prevent="scrollToSection(anchor.id)"
            >
              {{ anchor.name }}
            </a>
          </li>
        </ul>
      </template>

      <div class="mobile-nav-footer">
        <a
          href="https://calendly.com/ecooptimizer/30min"
          target="_blank"
          class="footer--cta"
        >
          <ButtonComponent variant="tertiary">
            Book appointment
          </ButtonComponent>
        </a>
      </div>
    </nav>
  </div>
</template>

<script setup>
const props = defineProps({
  navigationData: {
    type: Object,
    required: false,
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

const isScrolled = ref(false);

const handleScroll = () => {
  if (typeof window !== "undefined") {
    isScrolled.value = window.scrollY > 100;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);

  if (section) {
    const header = document.querySelector(".mobile-header");
    const headerHeight = isScrolled.value
      ? header.offsetHeight
      : header.offsetHeight * 0.7;

    const sectionPosition = section.getBoundingClientRect().top;
    const offsetPosition = sectionPosition + window.pageYOffset - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    isOpen.value = false;
  }
};
</script>

<style scoped lang="scss">
@use "@/base/breakpoints.scss" as *;

.mobile-nav-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 500;
  pointer-events: none;

  &.is-open {
    pointer-events: auto;
  }
}

.footer--cta {
  margin: 0;
  text-decoration: none;
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

.mobile-nav-list-header {
  font-size: var(--mvpb-font-size-4);
  color: var(--mvpb-color-grey-700);
  padding: var(--mvpb-spacing-4);
  text-transform: uppercase;
  margin: 0;
}

.mobile-nav-list {
  list-style: none;
  padding: 0;
  margin: 0;

  &--subnav {
    text-indent: var(--mvpb-spacing-4);
  }
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

.mobile-nav-item {
  text-transform: capitalize;
  padding: 0 var(--mvpb-spacing-4);
}

.mobile-nav-footer {
  margin-top: auto;
  padding: var(--mvpb-spacing-4);
}

.mobile-nav-list--subnav-link {
  display: block;
  text-indent: var(--mvpb-spacing-2);
}
</style>
