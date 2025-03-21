<template>
  <header class="header">
    <div class="container header--container">
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
            >
              {{ navItem.anchorLink }}
            </a>
          </li>
        </ul>
      </nav>
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
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: var(--mvpb-spacing-base-5) var(--mvpb-spacing-8)
    var(--mvpb-spacing-base-5) var(--mvpb-spacing-8);
  z-index: 9;
  gap: var(--mvpb-spacing-6);
  background-color: var(--mvpb-color-light);
}

.header--container {
  display: flex;
  align-items: center;
  gap: var(--mvpb-spacing-10);
}

.header--menu {
  background-color: var(--mvpb-color-light);
}

.header--menu-list {
  display: flex;
  gap: var(--mvpb-spacing-base-6);
  padding: 0;
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
  font-size: var(--mvpb-font-size-3);
  font-family: var(--mvpb-font-primary-semi-bold);
  padding: 0;
  margin: 0;
  display: flex;
}

.header--menu-list-item-link:hover {
  text-decoration: none;
}

.header--logo {
  text-decoration: none;
  margin-bottom: 0;
  display: flex;
}
</style>
