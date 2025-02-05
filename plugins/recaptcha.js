import { VueReCaptcha } from "vue-recaptcha-v3";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  if (!config.public.RECAPTCHA_SITE_KEY) {
    console.warn("RECAPTCHA_SITE_KEY is not defined in runtime config");
    return;
  }

  const options = {
    siteKey: config.public.RECAPTCHA_SITE_KEY,
    loaderOptions: {
      useRecaptchaNet: true,
      explicitRender: true,
    },
  };

  nuxtApp.vueApp.use(VueReCaptcha, options);
});
