<script setup>
  import { reactive, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { fetchOrganisationByName } from '../utils';
  import { setPageTitle } from '../state';

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

<template>Organisation Page Goes Here</template>
