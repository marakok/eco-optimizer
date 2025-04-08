export const useAnchorLinks = () => {
  const anchorLinks = ref([]);
  const isDebugMode = ref(false);

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

  return {
    anchorLinks,
    findAnchorLinks,
  };
};

export const anchorLinksManager = useAnchorLinks();
