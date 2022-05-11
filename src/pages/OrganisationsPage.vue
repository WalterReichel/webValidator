<script setup>
  import { setPageTitle } from '../state';
  import ContentContainer from '../components/ContentContainer.vue';

  setPageTitle('Public data viewer');
</script>

<template>
  <ContentContainer>
    <p>
      Search for an organisation and access the validation results on their public IATI data. The organisation list and
      the public IATI data is regularly refreshed from the IATI Registry. New organisations and IATI files will not
      immediately be visible here, but after at most a day.
    </p>
  </ContentContainer>
</template>
