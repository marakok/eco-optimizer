import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide("gsap", gsap);
  nuxtApp.vueApp.provide("ScrollTrigger", ScrollTrigger);

  return {
    provide: {
      gsap: gsap,
      ScrollTrigger: ScrollTrigger,
    },
  };
});
