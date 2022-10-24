<script setup>
  import useSWRV from 'swrv';
  import { ref, watchEffect } from 'vue';
  import { useRoute } from 'vue-router';
  import {
    fetchOrganisationByName,
    fetchOrganisationDocuments,
    getOrganisationURL,
    getOrganisationDocumentsURL,
    sortOptions,
    getDocumentCount,
    documentValidationStatus,
    getStatusColor,
    getDefaultSortingCriteria,
  } from '../utils';
  import placeholderImage from '../assets/images/placeholder-organization.png';
  import { setPageTitle } from '../state';
  import BasicCard from '../components/BasicCard.vue';
  import CardHeader from '../components/CardHeader.vue';
  import ContentContainer from '../components/layout/ContentContainer.vue';
  import FileStatusInfo from '../components/FileStatusInfo.vue';
  import DocumentList from '../components/organisation/DocumentList.vue';
  import CaptionedLoadingSpinner from '../components/CaptionedLoadingSpinner.vue';
  import BasicAlert from '../components/BasicAlert.vue';
  import StyledLink from '../components/StyledLink.vue';
  import SelectInput from '../components/SelectInput.vue';

  const layout = setPageTitle('Loading...');
  const route = useRoute();
  const loading = ref(true);
  const selected = ref('');
  const organisation = ref(null);
  const errorMessage = ref(null);

  const { data: organisationResponse, error: organisationError } = useSWRV(getOrganisationURL(route.params.name), () =>
    fetchOrganisationByName(route.params.name)
  );

  watchEffect(() => {
    if (organisationResponse.value) {
      const { data, status } = organisationResponse.value;
      if (status === 200) {
        organisation.value = data;
      }
      if (status === 404) {
        errorMessage.value = `An organisation with name "${route.params.name}" was not found`;
      }
    }
  });

  const { data: documents, error: documentsError } = useSWRV(
    () => (organisation.value && organisation.value ? getOrganisationDocumentsURL(organisation.value.org_id) : null),
    () => fetchOrganisationDocuments(organisation.value.org_id)
  );

  watchEffect(() => {
    if (organisationError && organisationError.value) {
      loading.value = false;
      console.log(organisationError.value);
    } else if (organisation.value && organisation.value) {
      layout.title = organisation.value.title;
    }
  });
  watchEffect(() => {
    if (documentsError && documentsError.value) {
      loading.value = false;
      console.log(documentsError.value);
    } else if (documents && documents.value) {
      loading.value = false;
    }
  });
  watchEffect(() => {
    if (documents && documents.value) {
      selected.value = getDefaultSortingCriteria(documents.value);
    }
  });
</script>

<template>
  <ContentContainer>
    <div>
      <CaptionedLoadingSpinner v-if="!organisation && !errorMessage" class="pb-3">
        Loading Info ...
      </CaptionedLoadingSpinner>
      <BasicAlert v-else>{{ errorMessage }}</BasicAlert>
      <div v-if="organisation && organisation.image_url" class="mb-5 max-w-[200px]">
        <img
          :src="organisation.image_url"
          :alt="organisation.name"
          @error="(event) => (event.target.src = placeholderImage)"
        />
      </div>
      <div v-if="organisation && organisation.description">
        <h3 class="font-bold">Description</h3>
        <p class="my-3">{{ organisation.description }}</p>
      </div>
    </div>

    <div class="-mx-3.5 flex flex-wrap">
      <BasicCard class="rounded-b-none">
        <template #header>
          <CardHeader>Public data</CardHeader>
        </template>

        <p class="pb-3 text-base font-bold">IATI files published in the IATI Registry</p>
        <FileStatusInfo />

        <div class="-mx-3.5 -mb-3.5">
          <div class="flex flex-col p-3 sm:flex-row sm:justify-between">
            <div v-if="documents && documents.length" class="py-2">
              <span>{{ documents.length }} {{ documents.length === 1 ? 'file' : 'files' }}</span>
              <span v-for="status in documentValidationStatus(documents)" :key="status">
                | <label :class="getStatusColor(status)">{{ status }}</label
                >: {{ getDocumentCount(documents, status) }}
              </span>
            </div>
            <div class="flex flex-col sm:mt-0 sm:flex-row">
              <label class="whitespace-nowrap sm:py-2">Sort by:</label>
              <SelectInput
                v-model="selected"
                :options="documents && documents.length ? sortOptions(documents).map((option) => option.label) : []"
                placeholder="Sort by"
                :allow-empty="false"
                :selected-label="''"
                :deselect-label="''"
                class="min-w-[300px] sm:ml-1"
              />
            </div>
          </div>
          <CaptionedLoadingSpinner v-if="loading && !errorMessage" class="pb-3">
            Loading Reports...
          </CaptionedLoadingSpinner>
          <BasicAlert v-else-if="errorMessage">No data</BasicAlert>
          <DocumentList
            v-else-if="!loading && documents && documents.length"
            :key="Math.random()"
            :documents="documents"
            :sortvariable="selected"
          >
          </DocumentList>
          <div v-else-if="documentsError || organisationError" class="m-3.5">
            <BasicAlert>
              Couldn't fetch the documents. Please try again later. If the problem persists, email support at
              <StyledLink to="mailto:support@iatistandard.org" :external="true">support@iatistandard.org</StyledLink>
            </BasicAlert>
          </div>
        </div>
      </BasicCard>
    </div>
  </ContentContainer>
</template>
