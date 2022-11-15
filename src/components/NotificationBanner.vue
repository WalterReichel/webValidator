<script setup>
  import StyledLink from '../components/StyledLink.vue';
</script>

<template>
  <div v-if="showBanner" class="flex flex-col items-center justify-center bg-yellow-200 p-1" @click="toggleTooltip">
    <p class="p-1 font-bold text-black">
      New Features Launched - 15 November 2022 -
      <StyledLink
        to="https://iatistandard.org/en/news/easier-checks-for-data-errors-with-improved-iati-validator/"
        :external="true"
        >Announcement</StyledLink
      >
    </p>
    <p>
      <StyledLink to="https://github.com/IATI/validator-web/releases/tag/v2.5.0" :external="true">v2.5.0</StyledLink> of
      the Validator is here! All reports are being regenerated today, so please be patient while the new format becomes
      available for your files.
    </p>
  </div>
</template>

<script>
  export default {
    name: 'NotificationBanner',
    computed: {
      showBanner() {
        return import.meta.env.VUE_ENV_SHOW_MAINTENANCE_BANNER === 'true';
      },
    },
  };
</script>
