<script setup>
  import { reactive, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { fetchOrganisationByName } from '../utils';
  import { setPageTitle } from '../state';
  import BasicCard from '../components/BasicCard.vue';
  import CardHeader from '../components/CardHeader.vue';
  import ContentContainer from '../components/ContentContainer.vue';
  import OrganisationPageInfo from '../components/OrganisationPageInfo.vue';

  const layout = setPageTitle('Loading...');
  const route = useRoute();

  const state = reactive({});

  const fetchOrganisationPlusDocuments = (organisationName) => {
    fetchOrganisationByName(organisationName).then((data) => {
      state.organisation = data;
      if (data) layout.title = data.title;
    });
  };

  fetchOrganisationPlusDocuments(route.params.name);

  watch(state, () => {
    console.log(state.organisation);
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
      </BasicCard>
    </div>
  </ContentContainer>
</template>
