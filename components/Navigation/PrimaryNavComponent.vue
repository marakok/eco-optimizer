<template>
  <header class="header">
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
            :to="`/${navItem.link.cached_url}`"
            class="header--menu-list-item-link"
          >
            {{ navItem.link.story.name }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
const props = defineProps({
  navigationData: {
    type: Object,
    required: true,
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
  justify-content: space-between;
  align-items: center;
  padding: var(--mvpb-spacing-base-5) var(--mvpb-spacing-6) 0
    var(--mvpb-spacing-6);
  z-index: 9;
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
  font-family: var(--mvpb-font-tertiary-regular);
  list-style: none;
}

.header--menu-list-item-link {
  transition: color 0.3s;
  text-transform: capitalize;
  text-decoration: none;
}

.header--menu-list-item-link:hover {
  text-decoration: none;
}

.header--logo {
  text-decoration: none;
  margin-bottom: 0;
}
</style>
