<script setup>
  import ContentContainer from '../components/layout/ContentContainer.vue';
  import { setPageTitle } from '../state';

  setPageTitle('Check data');
</script>

<template>
  <ContentContainer class="pb-8">
    <p class="mb-4">Upload your IATI file and receive validation feedback.</p>
  </ContentContainer>
</template>
