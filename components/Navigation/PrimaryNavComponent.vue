<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <div class="header--main-nav header--container container-wide">
      <div class="header--inner">
        <NuxtLink to="/" class="header--logo">
          <LogoComponent />
        </NuxtLink>

        <nav v-if="navItems">
          <ul class="header--menu-list">
            <li
              v-for="navItem in navItems"
              :key="navItem._uid"
              class="header--menu-list-item"
            >
              <NuxtLink
                v-if="navItem.link.cached_url"
                :to="`/${navItem.link.cached_url}`"
                class="header--menu-list-item-link"
              >
                {{ navItem.link.story.name }}
              </NuxtLink>

              <a
                class="header--menu-list-item-link"
                :href="`#${navItem.anchorLink}`"
                v-if="navItem.anchorLink.length"
                @click.prevent="scrollToSection(navItem.anchorLink)"
              >
                {{ navItem.anchorLink }}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <a
        href="https://calendly.com/ecooptimizer/30min"
        target="_blank"
        class="header--cta"
      >
        <ButtonComponent variant="tertiary"> Book appointment </ButtonComponent>
      </a>
    </div>

    <div class="header--sub-nav">
      <div class="header--container container-wide">
        <div class="header--inner">
          <!-- Sub nav content goes here -->
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const props = defineProps({
  navigationData: {
    type: Object,
    required: false,
  },
});

const navItems = computed(() => props.navigationData);
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
    const header = document.querySelector(".header");
    const headerHeight = header.offsetHeight;

    const sectionPosition = section.getBoundingClientRect().top;
    const offsetPosition = sectionPosition + window.pageYOffset - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
</script>

<style scoped lang="scss">
@use "@/base/breakpoints.scss" as *;

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.header--main-nav {
  padding-top: var(--mvpb-spacing-base-5);
  padding-bottom: var(--mvpb-spacing-base-5);
  background-color: var(--mvpb-color-light);
  transition: padding 0.3s ease;
}

.header--sub-nav {
  padding: var(--mvpb-spacing-base-3) 0;
  background-color: var(--mvpb-color-grey-700);
  width: 100%;
  transition: padding 0.3s ease;
}

.header--inner {
  display: flex;
  align-items: center;
  gap: var(--mvpb-spacing-base-8);
}

.header--cta {
  margin: 0;
  text-decoration: none;
}

/* Scrolled state styles */
.header--scrolled .header--main-nav {
  padding-top: var(--mvpb-spacing-base-2);
  padding-bottom: var(--mvpb-spacing-base-2);
}

.header--scrolled .header--sub-nav {
  padding: var(--mvpb-spacing-base-2) 0;
}

.header--scrolled .header--logo {
  transform: scale(0.95);
}

.header--scrolled {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header--container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header--menu-list {
  display: flex;
  padding: 0;
  gap: var(--mvpb-spacing-base-5);
  margin: 0;
}

.header--menu-list-item {
  margin: 0;
  list-style: none;
}

.header--menu-list-item-link {
  transition: color 0.3s;
  text-transform: capitalize;
  text-decoration: none;
  font-size: var(--mvpb-font-size-4);
  font-family: var(--mvpb-font-primary-semi-bold);
  padding: 0;
  margin: 0;
  display: flex;

  color: var(--mvpb-color-dark);

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(
    to right,
    var(--mvpb-color-primary-dark),
    var(--mvpb-color-primary-dark) 50%,
    var(--mvpb-color-dark) 50%
  );
  background-size: 200% 100%;
  background-position: 100%;
}

.header--menu-list-item-link:hover {
  transition: all 0.5s cubic-bezier(0, 0, 0.23, 1);
  background-position: 0%;
}

.header--logo {
  text-decoration: none;
  margin-bottom: 0;
  display: flex;
  transition: transform 0.3s ease;
}

/* Set global CSS variable for scroll margin */
:root {
  --header-height: auto;
}
</style>
