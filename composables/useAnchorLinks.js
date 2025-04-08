export const useAnchorLinks = () => {
  // Shared state that can be accessed from any component
  const anchorLinks = ref([]);

  // Function to find all elements with data-navid attribute
  const findAnchorLinks = () => {
    if (typeof document === "undefined") return;

    const elements = document.querySelectorAll("[data-navid]");
    const links = [];

    elements.forEach((el) => {
      if (el.getAttribute("data-navid")) {
        links.push({
          id: el.getAttribute("data-navid"),
          name: el.getAttribute("data-navid"),
        });
      }
    });

    anchorLinks.value = links;
  };

  // Function to scroll to a section
  const scrollToSection = (sectionId) => {
    if (typeof document === "undefined") return;

    const section = document.getElementById(sectionId);
    if (!section) return;

    // Get header height for offset calculation
    const header =
      document.querySelector(".header") ||
      document.querySelector(".mobile-header");
    const headerHeight = header ? header.offsetHeight : 0;

    const sectionPosition = section.getBoundingClientRect().top;
    const offsetPosition = sectionPosition + window.pageYOffset - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return {
    anchorLinks,
    findAnchorLinks,
    scrollToSection,
  };
};

// Create a single instance that will be shared across components
export const anchorLinksManager = useAnchorLinks();
