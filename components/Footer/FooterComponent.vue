<template>
  <footer class="footer">
    <div class="footer--content container-wide">
      <div class="footer--logo-wrapper">
        <NuxtLink aria-label="Logo" to="/">
          <LogoComponent size="small" class="footer--logo" />
        </NuxtLink>
        <p>
          <small
            >Optimaliseer uw impact met data. Plan een gesprek en ontdek hoe
            data-gedreven inzichten uw duurzame groei kunnen versnellen.</small
          >
        </p>
      </div>
      <div class="footer--contact-wrapper">
        <address class="footer--address">
          <p><small>The A'Dam Toren</small></p>
          <p><small>Overhoeksplein 1</small></p>
          <p><small>1031 KS Amsterdam </small></p>
          <p><small>Floor 13</small></p>
        </address>

        <div class="footer--contact">
          <small>
            <a href="mailto:will@adamgooddate.coach">
              will@adamgooddate.coach
            </a>
          </small>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const nuxtApp = useNuxtApp();
const stories = ref({});

onMounted(() => {
  stories.value = nuxtApp.$stories;
});
</script>

<style scoped lang="scss">
@use "@/base/breakpoints.scss" as *;

.footer {
  background-color: var(--mvpb-color-dark);
  color: var(--mvpb-color-light);
  padding: 0 var(--mvpb-spacing-base-4);
}

.footer--content {
  padding-top: var(--mvpb-spacing-base-12);
  display: flex;
  flex-direction: column;
  gap: var(--mvpb-spacing-base-4);
}

.footer--address {
  margin-bottom: var(--mvpb-spacing-base-6);
}

.footer--address p,
.footer--contact p {
  font-style: normal;
  margin-bottom: 0;
}

.footer a {
  text-decoration: none;
}

.footer--logo {
  display: block;
  margin-bottom: var(--mvpb-spacing-base-8);
}

.footer--address {
  font-size: var(--mvpb-font-size-3);
  font-family: var(--mvpb-font-tertiary-regular);
  text-transform: uppercase;
}

@media (min-width: breakpoint(tablet)) {
  .footer {
    padding: 0 var(--mvpb-spacing-base-12);
  }

  .footer--content {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }

  .footer--logo-wrapper {
    width: 50%;
    flex: 0 0 auto;
  }

  .footer--contact-wrapper {
    flex: 0 0 auto;
  }
}
</style>
