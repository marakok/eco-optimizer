<template>
  <footer class="footer">
    <div class="footer--content container-wide">
      <div class="footer--logo-wrapper">
        <NuxtLink aria-label="Logo" to="/">
          <LogoComponent class="footer--logo" />
        </NuxtLink>
        <p class="footer--text">
          <small
            >Optimaliseer uw impact met data. Plan een gesprek en ontdek hoe
            data-gedreven inzichten uw duurzame groei kunnen versnellen.</small
          >
        </p>
      </div>
      <div class="footer--nav-wrapper">
        <p class="footer--nav-title">
          <strong>Contact</strong>
        </p>
        <small class="footer--text">
          <p class="footer--link"><PhoneIcon />+31 6 20994203</p></small
        >
        <small class="footer--text">
          <a href="mailto:info@ecooptimizer.co" class="footer--link"
            ><MailIcon />info@ecooptimizer.co</a
          ></small
        >
        <small class="footer--text">
          <p class="footer--link"><LocationIcon />Eindhoven</p></small
        >
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
  background-color: var(--mvpb-color-grey-60);
  padding: 0 var(--mvpb-spacing-base-4);
}

.footer--content {
  padding: var(--mvpb-spacing-base-12) 0;
  display: flex;
  flex-direction: column;
  gap: var(--mvpb-spacing-base-4);
}

.footer--nav-wrapper {
  display: flex;
  flex-direction: column;
}

.footer--text {
  color: var(--mvpb-color-grey-10);
}

.footer--link {
  display: flex;
  align-items: center;
  gap: var(--mvpb-spacing-base-2);
  margin-bottom: 0;
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
  color: var(--mvpb-color-dark);
}

.footer--nav-title {
  margin-bottom: var(--mvpb-spacing-base-8);
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
