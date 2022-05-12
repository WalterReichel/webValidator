<script setup>
  import { ref } from 'vue';
  import LoadingSpinner from '../components/LoadingSpinner.vue';
  import OrganisationSearchFilter from './OrganisationSearchFilter.vue';
  import OrganisationAlphabetNavigator from './OrganisationAlphabetNavigator.vue';
  import OrganisationsListItem from './OrganisationsListItem.vue';

  const props = defineProps({
    isFetching: { type: Boolean, default: false },
    organisations: { type: Array, default: () => [] },
  });

  const organisations = ref(props.organisations || []);

  const onFilter = (results) => (organisations.value = results);
</script>

<template>
  <div v-if="props.isFetching" class="mb-4 flex h-full flex-col">
    <div class="flex items-center justify-center">
      <LoadingSpinner />
    </div>
  </div>
  <div v-else class="mb-4">
    <OrganisationSearchFilter :organisations="props.organisations" @on-search="onFilter" @on-init.once="onFilter" />
    <OrganisationAlphabetNavigator />
    <div class="pb-4">
      Found <b>{{ organisations.length }}</b> organisations.
    </div>
    <hr class="mb-2" />
    <OrganisationsListItem
      v-for="organisation in organisations"
      :key="organisation.name"
      :organisation="organisation"
    />
  </div>
</template>
