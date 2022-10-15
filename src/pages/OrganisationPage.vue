<script setup>
  import useSWRV from 'swrv';
  import { ref, watchEffect, reactive } from 'vue';
  import { useRoute } from 'vue-router';
  import VueMultiselect from 'vue-multiselect';
  import {
    fetchOrganisationByName,
    fetchOrganisationDocuments,
    getOrganisationURL,
    getOrganisationDocumentsURL,
    sortOptions,
    getDocumentCount,
    documentValidationStatus,
    getStatusColor,
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

  const state = reactive({
    selected: null,
  });

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
      console.log(organisationError.value);
    } else if (organisation && organisation.value) {
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
</script>

<template>
  <ContentContainer>
    <div>
      <CaptionedLoadingSpinner v-if="!organisation" class="pb-3"> Loading Info ... </CaptionedLoadingSpinner>
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
          <div class="flex justify-between p-3">
            <div v-if="documents && documents.length" class="">
              <span>{{ documents.length }} files</span>
              <span v-for="status in documentValidationStatus(documents)" :key="status">
                | <label :class="getStatusColor(status)">{{ status }}</label
                >: {{ getDocumentCount(documents, status) }}
              </span>
            </div>
            <VueMultiselect
              v-model="state.selected"
              :options="documents && documents.length ? sortOptions(documents).map((option) => option.label) : []"
              placeholder="Sort by"
              class="mr-7 !w-1/3"
            ></VueMultiselect>
          </div>
          <CaptionedLoadingSpinner v-if="loading" class="pb-3"> Loading Reports... </CaptionedLoadingSpinner>
          <DocumentList
            v-else-if="!loading && documents && documents.length"
            :key="Math.random()"
            :documents="documents"
            :sortvariable="state.selected"
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
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
