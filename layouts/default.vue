<template>
  <ScrollProgressComponent />

  <PrimaryNavComponent
    :navigationData="navigationData"
    v-if="$viewport.isGreaterThan('tablet')"
  />

  <div v-else class="mobile-header">
    <NuxtLink aria-label="logo" to="/" class="mobile-logo">
      <LogoComponent />
    </NuxtLink>

    <button
      @click="toggleMobileNav"
      aria-label="Menu Button"
      class="mobile-menu-button"
    >
      <Icon name="uil:align-justify" class="mobile-menu-icon" />
    </button>
  </div>

  <MobileNavComponent :navigationData="navigationData" ref="mobileNavRef" />

  <Transition name="page" mode="out-in">
    <div :key="$route.fullPath">
      <NuxtPage />
      <FooterComponent />
    </div>
  </Transition>

  <PageScreenComponent />
  <BreakpointComponent v-if="isDevelopment" />
</template>

<script setup>
const router = useRouter();
const nuxtApp = useNuxtApp();
const runtimeConfig = useRuntimeConfig();
const mobileNavRef = ref(null);
const navigationData = ref({});

const isDevelopment = runtimeConfig.public.ENV === "development";

const { setLoading } = usePageLoading();

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    setLoading(true);
    next();
  }
});

const toggleMobileNav = () => {
  if (mobileNavRef.value) {
    mobileNavRef.value.toggleNav();
  }
};

onMounted(() => {
  navigationData.value = nuxtApp.$appConfig.header;
});
</script>

<style scoped lang="scss">
.mobile-logo {
  --theme-font-color: var(--mvpb-color-primary);
}

.mobile-logo {
  text-decoration: none;
  color: var(--mvpb-color-dark);
  margin-bottom: 0;
}

.mobile-logo:hover {
  --theme-font-color: var(--mvpb-color-secondary);
}

.mobile-menu-button {
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--dq-color-dark);
  margin: 0;
}

.mobile-menu-icon {
  font-size: 2.3rem;
}

.mobile-header {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--mvpb-spacing-base-3) var(--mvpb-spacing-8) 0
    var(--mvpb-spacing-8);
  z-index: 10;
}

.page-enter-active {
  transition: opacity 1.5s ease-in-out;
}

.page-leave-active {
  transition: opacity 1s ease-in-out;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
}
</style>
