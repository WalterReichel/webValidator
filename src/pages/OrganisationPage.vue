<script setup>
  import useSWRV from 'swrv';
  import { ref, watchEffect } from 'vue';
  import { useRoute } from 'vue-router';
  import {
    fetchOrganisationByName,
    fetchOrganisationDocuments,
    getOrganisationURL,
    getOrganisationDocumentsURL,
  } from '../utils';
  import { setPageTitle } from '../state';
  import BasicCard from '../components/BasicCard.vue';
  import CardHeader from '../components/CardHeader.vue';
  import ContentContainer from '../components/layout/ContentContainer.vue';
  import OrganisationPageInfo from '../components/organisation/OrganisationPageInfo.vue';
  import DocumentList from '../components/organisation/DocumentList.vue';
  import DocumentListItem from '../components/organisation/DocumentListItem.vue';
  import CaptionedLoadingSpinner from '../components/CaptionedLoadingSpinner.vue';

  const layout = setPageTitle('Loading...');
  const route = useRoute();
  const loading = ref(true);

  const { data: organisation, error: organisationError } = useSWRV(getOrganisationURL(route.params.name), () =>
    fetchOrganisationByName(route.params.name)
  );
  const { data: documents, error: documentsError } = useSWRV(
    () => (organisation && organisation.value ? getOrganisationDocumentsURL(organisation.value.org_id) : null),
    () => fetchOrganisationDocuments(organisation.value.org_id)
  );

  watchEffect(() => {
    if (organisationError && organisationError.value) {
      loading.value = false;
      console.error(organisationError.value);
    } else if (organisation && organisation.value) {
      layout.title = organisation.value.title;
    }
  });
  watchEffect(() => {
    if (documentsError && documentsError.value) {
      loading.value = false;
      console.error(documentsError.value);
    } else if (documents && documents.value) {
      loading.value = false;
    }
  });
</script>

<template>
  <ContentContainer>
    <div class="-mx-3.5 flex flex-wrap">
      <BasicCard class="rounded-b-none">
        <template #header>
          <CardHeader>Public data</CardHeader>
        </template>

        <OrganisationPageInfo />

        <div class="-mx-3.5 -mb-3.5">
          <CaptionedLoadingSpinner v-if="loading"> Loading Reports... </CaptionedLoadingSpinner>
          <DocumentList v-else>
            <DocumentListItem v-for="document in documents" :key="document.hash" :document="document" />
          </DocumentList>
        </div>
      </BasicCard>
    </div>
  </ContentContainer>
</template>
