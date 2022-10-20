<script setup>
  import useSWRV from 'swrv';
  import { provide, ref, watch, watchEffect } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import BasicCard from '../components/BasicCard.vue';
  import CaptionedLoadingSpinner from '../components/CaptionedLoadingSpinner.vue';
  import FileStatusInfo from '../components/FileStatusInfo.vue';
  import IconChevron from '../components/IconChevron.vue';
  import ContentContainer from '../components/layout/ContentContainer.vue';
  import DocumentInfo from '../components/report/DocumentInfo.vue';
  import DocumentReport from '../components/report/DocumentReport.vue';
  import StyledLink from '../components/StyledLink.vue';
  import { setPageTitle } from '../state';
  import {
    fetchDocument,
    fetchOrganisationByID,
    fetchValidationReport,
    getDocumentFileName,
    getDocumentURL,
    getOrganisationURL,
    validationReportURL,
  } from '../utils';

  setPageTitle('File validation report');
  const router = useRouter();
  const route = useRoute();
  const loading = ref(true);
  const isTestFile = route.query.isTestFile;

  const { data: documentResponse, error: documentError } = useSWRV(getDocumentURL(route.params?.name), () =>
    fetchDocument(route.params.name)
  );
  const document = ref(null);

  const { data: organisation, error: organisationError } = useSWRV(
    () => (document.value ? getOrganisationURL(document.value.publisher, 'id') : null),
    () => fetchOrganisationByID(document.value.publisher)
  );
  const { data: dataset, error: datasetError } = useSWRV(
    () => validationReportURL(route.params.name, 'name'),
    () => fetchValidationReport(route.params.name, isTestFile)
  );
  provide('organisation', organisation);

  watch(documentResponse, () => {
    if (documentResponse.value) {
      const { data, status, lookupKey } = documentResponse.value;
      if (status === 200) {
        document.value = data;
        if (lookupKey === 'id') {
          window.history.pushState(null, '', `/report/${data.name}`);
        }
      }
      if (status === 404) {
        // TODO: show proper 404 error while staying on this route
        router.push({ name: 'NotFound' });
      }
    }
  });

  watchEffect(() => {
    if (documentError.value) {
      loading.value = false;
      console.log('Document Error: ', documentError.value);
    } else if (organisationError.value) {
      loading.value = false;
      console.log('Organisation Error: ', organisationError.value);
    } else if (document.value && organisation.value) {
      loading.value = false;
    }
    if (datasetError.value) {
      console.log('Data Set Error: ', datasetError.value);
    }
  });
</script>

<template>
  <ContentContainer class="pt-0 pb-8">
    <StyledLink v-if="isTestFile && dataset" :to="`/validate/${dataset.session_id}`" class="mr-2 inline-flex">
      <IconChevron class="mr-2" /> Return to your workspace
    </StyledLink>
    <CaptionedLoadingSpinner v-if="!organisation && !document && !dataset" class="pb-3">
      Loading Document Info ...
    </CaptionedLoadingSpinner>
    <div v-else>
      <h3 class="text-lg">
        <template v-if="organisation">
          <StyledLink :to="`/organisation/${organisation.name}`" class="underline">{{ organisation.title }}</StyledLink>
          -
        </template>
        <StyledLink v-if="document" :to="document.url" :external="true" class="underline">
          {{ getDocumentFileName(document) }}
        </StyledLink>
        <div v-if="dataset && isTestFile" class="font-semibold">{{ dataset.filename }}</div>
      </h3>
      <CaptionedLoadingSpinner v-if="!dataset" class="py-3"> Loading Report ... </CaptionedLoadingSpinner>
      <DocumentInfo v-else :document="document" :report="dataset.report" />
    </div>

    <div class="-mx-3.5 flex flex-wrap">
      <BasicCard>
        <FileStatusInfo />
      </BasicCard>
    </div>

    <CaptionedLoadingSpinner v-if="!dataset" class="py-3"> Loading Report ... </CaptionedLoadingSpinner>
    <DocumentReport v-else :document="document" :report="dataset.report" />
  </ContentContainer>
</template>
