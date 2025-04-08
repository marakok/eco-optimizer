// composables/useAnchorLinks.js
import { ref } from "vue";

export const useAnchorLinks = () => {
  // Shared state that can be accessed from any component
  const anchorLinks = ref([]);
  const isDebugMode = ref(false);

  // Function to find all elements with data-navid attribute
  const findAnchorLinks = () => {
    if (typeof document === "undefined") return;

    const elements = document.querySelectorAll("[data-navid]");
    const links = [];

    if (isDebugMode.value) {
      console.log(`Found ${elements.length} elements with data-navid`);
    }

    elements.forEach((el) => {
      const navid = el.getAttribute("data-navid");
      if (navid) {
        links.push({
          id: navid,
          name: navid,
        });

        if (isDebugMode.value) {
          console.log(`Found anchor: ${navid}`);
        }
      }
    });

    anchorLinks.value = links;

    if (isDebugMode.value) {
      console.log("Updated anchor links:", anchorLinks.value);
    }
  };

  // Find sections by ID as fallback (for when data-navid might not be enough)
  const findSectionsByIds = () => {
    if (typeof document === "undefined") return;

    const sections = document.querySelectorAll("section[id]");
    const links = [];

    if (isDebugMode.value) {
      console.log(`Found ${sections.length} sections with id`);
    }

    sections.forEach((section) => {
      const id = section.getAttribute("id");
      if (id) {
        // Avoid duplicates
        if (!anchorLinks.value.some((link) => link.id === id)) {
          links.push({
            id: id,
            name: id,
          });

          if (isDebugMode.value) {
            console.log(`Found section id: ${id}`);
          }
        }
      }
    });

    // Combine with existing links
    anchorLinks.value = [...anchorLinks.value, ...links];
  };

  // Function to scroll to a section
  const scrollToSection = (sectionId) => {
    if (typeof document === "undefined") return;

    // Try to find the element by id first
    let section = document.getElementById(sectionId);

    // If not found, try to find by data-navid
    if (!section) {
      section = document.querySelector(`[data-navid="${sectionId}"]`);
    }

    if (!section) {
      if (isDebugMode.value) {
        console.warn(
          `Could not find section with id or data-navid: ${sectionId}`
        );
      }
      return;
    }

    // Get header height for offset calculation
    const header =
      document.querySelector(".header") ||
      document.querySelector(".mobile-header");
    const headerHeight = header ? header.offsetHeight : 0;

    const sectionPosition = section.getBoundingClientRect().top;
    const offsetPosition = sectionPosition + window.scrollY - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  // Enable or disable debug mode
  const setDebugMode = (enabled) => {
    isDebugMode.value = enabled;
  };

  return {
    anchorLinks,
    findAnchorLinks,
    findSectionsByIds,
    scrollToSection,
    setDebugMode,
  };
};

// Create a single instance that will be shared across components
export const anchorLinksManager = useAnchorLinks();
