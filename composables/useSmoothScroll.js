import Lenis from "lenis";

export const useSmoothScroll = () => {
  const scrollLenis = ref(null);

  onMounted(() => {
    scrollLenis.value = new Lenis({
      duration: 1.2,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });
  });

  return { scrollLenis };
};
