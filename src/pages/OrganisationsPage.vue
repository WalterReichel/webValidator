<script setup>
  import { inject, onMounted, ref } from 'vue';
  import { setPageTitle } from '../state';
  import ContentContainer from '../components/ContentContainer.vue';
  import { fetchOrganisations } from '../utils';
  import OrganisationsList from '../components/OrganisationsList.vue';

  const cache = inject('cache');

  setPageTitle('Public data viewer');
  const isFetching = ref(true);
  const organisations = ref(null);

  onMounted(() => {
    cache.get('ORGANISATIONS').then((cachedData) => {
      if (cachedData) {
        organisations.value = cachedData;
        isFetching.value = false;
      } else {
        fetchOrganisations().then((data) => {
          isFetching.value = false;
          organisations.value = data;
          cache.set('ORGANISATIONS', data);
        });
      }
    });
  });
</script>

<template>
  <ContentContainer>
    <p class="mb-4">
      Search for an organisation and access the validation results on their public IATI data. The organisation list and
      the public IATI data is regularly refreshed from the IATI Registry. New organisations and IATI files will not
      immediately be visible here, but after at most a day.
    </p>
    <OrganisationsList :is-fetching="isFetching" :organisations="organisations" />
  </ContentContainer>
</template>
