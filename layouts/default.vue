<template>
  <ScrollProgressComponent />

  <PrimaryNavComponent
    v-if="$viewport.isGreaterThan('tablet')"
    :navigation-data="navigationItems"
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

  <MobileNavComponent ref="mobileNavRef" :navigation-data="navigationItems" />

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
import { anchorLinksManager } from "~/composables/useAnchorLinks";

const router = useRouter();
const runtimeConfig = useRuntimeConfig();
const mobileNavRef = ref(null);
const navigationItems = ref([]);

const isDevelopment = runtimeConfig.public.ENV === "development";

const { isLoading, setLoading } = usePageLoading();

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

const { data: configData } = await useAsyncData("config", async () => {
  const { data } = await useStoryblokApi().get("cdn/stories/config", {
    resolve_links: "url",
    version:
      runtimeConfig.public.ENV === "development" ||
      runtimeConfig.public.ENV === "staging"
        ? "draft"
        : "published",
  });

  return data.story.content.header_menu;
});

navigationItems.value = configData.value;

// Enable debug mode in development
if (isDevelopment) {
  anchorLinksManager.setDebugMode(true);
}

// Function to detect all anchor links (more reliable)
const detectPageAnchors = () => {
  // First try with data-navid attributes
  anchorLinksManager.findAnchorLinks();

  // Then also check for section IDs as fallback
  anchorLinksManager.findSectionsByIds();

  if (isDevelopment) {
    console.log("Current anchor links:", anchorLinksManager.anchorLinks.value);
  }
};

// Function to schedule anchor detection with multiple attempts
const scheduleAnchorDetection = () => {
  // Try immediately
  detectPageAnchors();

  // Try again after DOM updates (multiple times with increasing delays)
  setTimeout(detectPageAnchors, 100);
  setTimeout(detectPageAnchors, 500);
  setTimeout(detectPageAnchors, 1000);

  // One final check after all content should be loaded
  setTimeout(detectPageAnchors, 2000);
};

// Listen for route changes to update anchor links
router.afterEach(() => {
  // Reset anchor links when changing routes
  anchorLinksManager.anchorLinks.value = [];

  // Schedule detection after navigation
  nextTick(() => {
    scheduleAnchorDetection();
  });
});

// Watch for page loading state changes
watch(
  () => isLoading.value,
  (newValue) => {
    if (!newValue) {
      // When page finishes loading, detect anchors
      scheduleAnchorDetection();
    }
  }
);

// Force a check when component is mounted
onMounted(() => {
  // Initial detection with short delay to ensure DOM is ready
  setTimeout(() => {
    scheduleAnchorDetection();

    // Force a manual update with test data if no links found after 2.5 seconds
    // (debugging only, remove in production)
    if (isDevelopment) {
      setTimeout(() => {
        if (!anchorLinksManager.anchorLinks.value.length) {
          console.warn(
            "No anchor links found after timeout, consider checking your markup"
          );
        }
      }, 2500);
    }
  }, 10);
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
  padding: var(--mvpb-spacing-base-4) var(--mvpb-spacing-2)
    var(--mvpb-spacing-base-4) var(--mvpb-spacing-2);
  z-index: 10;
  background-color: var(--mvpb-color-light);
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
