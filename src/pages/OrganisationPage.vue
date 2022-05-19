<script setup>
  import { reactive, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { fetchOrganisationByName, fetchOrganisationDocuments } from '../utils';
  import { setPageTitle } from '../state';
  import BasicCard from '../components/BasicCard.vue';
  import CardHeader from '../components/CardHeader.vue';
  import ContentContainer from '../components/layout/ContentContainer.vue';
  import OrganisationPageInfo from '../components/OrganisationPageInfo.vue';
  import OrganisationDocuments from '../components/OrganisationDocuments.vue';
  import OrganisationDocument from '../components/OrganisationDocument.vue';
  import LoadingSpinner from '../components/LoadingSpinner.vue';

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
      <BasicCard>
        <template #header>
          <CardHeader>Public data</CardHeader>
        </template>

        <OrganisationPageInfo />

        <div class="-mx-3.5">
          <div v-if="state.loading" class="flex items-center justify-center">
            <LoadingSpinner />
          </div>
          <OrganisationDocuments v-else>
            <OrganisationDocument v-for="document in state.documents" :key="document.hash" :document="document" />
          </OrganisationDocuments>
        </div>
      </BasicCard>
    </div>
  </ContentContainer>
</template>
