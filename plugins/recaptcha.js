import { VueReCaptcha } from "vue-recaptcha-v3";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const options = {
    siteKey: config.public.RECAPTCHA_SITE_KEY || process.env.RECAPTCHA_SITE_KEY,
    loaderOptions: {
      autoHideBadge: true,
      useRecaptchaNet: true,
      renderParameters: {
        hl: "id",
      },
    },
  };

  nuxtApp.vueApp.use(VueReCaptcha, options);
});
