<script setup>
  import { onMounted, ref } from 'vue';
  import { setPageTitle } from '../state';
  import ContentContainer from '../components/ContentContainer.vue';
  import { fetchOrganisations } from '../utils';
  import LoadingSpinner from '../components/LoadingSpinner.vue';

  setPageTitle('Public data viewer');
  const isFetching = ref(true);

  onMounted(() => {
    fetchOrganisations().then((data) => {
      isFetching.value = false;
      console.log(data);
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
    <div v-if="isFetching" class="mb-4 flex h-full flex-col">
      <div class="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    </div>
  </ContentContainer>
</template>
