<script setup>
  import { reactive, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { fetchOrganisationByName, fetchOrganisationDocuments } from '../utils';
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

  const state = reactive({ organisation: null, documents: [], loading: true });

  const fetchOrganisationPlusDocuments = (organisationName) => {
    fetchOrganisationByName(organisationName)
      .then((data) => {
        state.organisation = data;
        if (data) layout.title = data.title;

        fetchOrganisationDocuments(data.org_id)
          .then((documents) => {
            state.documents = documents;
            state.loading = false;
          })
          .catch((error) => {
            state.documents = [];
            state.loading = false;
            console.log(error);
          });
      })
      .catch((error) => {
        state.organisation = '';
        state.loading = false;
        console.log(error);
      });
  };

  fetchOrganisationPlusDocuments(route.params.name);

  watch(state, () => {
    console.log(state.documents);
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
          <CaptionedLoadingSpinner v-if="state.loading"> Loading Reports... </CaptionedLoadingSpinner>
          <DocumentList v-else>
            <DocumentListItem v-for="document in state.documents" :key="document.hash" :document="document" />
          </DocumentList>
        </div>
      </BasicCard>
    </div>
  </ContentContainer>
</template>
