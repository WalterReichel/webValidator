<script setup>
  import useSWRV from 'swrv';
  import { provide, ref, watch, watchEffect } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import AppAlert from '../components/AppAlert.vue';
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
  const errors = ref([]);
  const dataset = ref(null);
  const document = ref(null);

  const { data: documentResponse, error: documentError } = useSWRV(
    !isTestFile ? getDocumentURL(route.params?.name) : null,
    () => fetchDocument(route.params.name)
  );

  const { data: organisation, error: organisationError } = useSWRV(
    () => document.value && getOrganisationURL(document.value.publisher, 'id'),
    () => fetchOrganisationByID(document.value.publisher)
  );
  const { data: datasetResponse, error: datasetError } = useSWRV(
    () =>
      !isTestFile
        ? document.value && validationReportURL(route.params.name, 'name')
        : validationReportURL(route.params.name, 'id'),
    () => fetchValidationReport(route.params.name, isTestFile)
  );
  provide('organisation', organisation);

  watch(documentResponse, () => {
    if (documentResponse.value) {
      const { data, status, lookupKey } = documentResponse.value;
      if (status === 200) {
        document.value = data;
        if (lookupKey === 'id') {
          router.push(`/report/${data.name}`);
        }
        loading.value = !dataset.value;
      }
      if (status === 404 && !isTestFile) {
        const message = `There is no report with name "${route.params.name}"`;
        const sourceError = errors.value.find((error) => error.source === 'document');
        if (sourceError) {
          sourceError.value = message;
        } else {
          errors.value = errors.value.concat({ source: 'document', message });
        }
        loading.value = false;
      }
    }
  });

  watchEffect(() => {
    if (documentError.value) {
      loading.value = !dataset.value;
      console.log('Document Error: ', documentError.value);
    } else if (organisationError.value) {
      loading.value = !(dataset.value && document.value);
      console.log('Organisation Error: ', organisationError.value);
    } else if (document.value && organisation.value) {
      loading.value = !dataset.value;
    }
    if (datasetError.value) {
      loading.value = !document.value;
      console.log('Data Set Error: ', datasetError.value);
    }
  });
  watchEffect(() => {
    if (datasetResponse.value) {
      const { data, status } = datasetResponse.value;
      if (status === 200) {
        dataset.value = data;
        loading.value = false;
      }
      if (status === 404) {
        const message = 'This file does not have a validation report';
        const reportError = errors.value.find((error) => error.source === 'report');
        if (reportError) {
          reportError.value = message;
        } else {
          errors.value = errors.value.concat({ source: 'report', message });
        }
        loading.value = false;
      }
    }
  });
</script>

<template>
  <ContentContainer class="pt-0 pb-8">
    <StyledLink v-if="isTestFile && dataset" :to="`/validate/${dataset.session_id}`" class="mr-2 inline-flex">
      <IconChevron class="mr-2" /> Return to your workspace
    </StyledLink>
    <div v-if="organisation || document || dataset">
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
      <DocumentInfo v-if="dataset && dataset.report" :document="document" :report="dataset.report" />
    </div>

    <CaptionedLoadingSpinner v-if="loading && !errors.length" class="pb-3">
      {{ !organisation ? 'Loading Document Info ...' : 'Loading Report ...' }}
    </CaptionedLoadingSpinner>

    <AppAlert v-if="errors.length" variant="error" class="mt-1">
      <p v-for="error in errors" :key="error.source" class="font-bold">{{ error.message }}</p>
      <ul class="list-disc px-4 pt-4 text-tiny">
        <li>
          <a class="cursor-pointer text-iati-green hover:underline" @click="router.back()">
            Go back to the previous page
          </a>
        </li>
        <li>
          <StyledLink to="/">Go to home the page</StyledLink>
        </li>
      </ul>
    </AppAlert>

    <div v-if="!loading && !errors.length" class="-mx-3.5 flex flex-wrap">
      <BasicCard>
        <FileStatusInfo />
      </BasicCard>
    </div>
    <CaptionedLoadingSpinner v-if="!dataset && !errors.length" class="py-3">
      Loading Report ...
    </CaptionedLoadingSpinner>
    <DocumentReport v-if="(dataset && document) || dataset" :document="document" :report="dataset.report" />
  </ContentContainer>
</template>
