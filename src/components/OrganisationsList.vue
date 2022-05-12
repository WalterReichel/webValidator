<script setup>
  import { ref, onBeforeUpdate } from 'vue';
  import LoadingSpinner from '../components/LoadingSpinner.vue';
  import SearchFilter from './SearchFilter.vue';

  const props = defineProps({
    isFetching: { type: Boolean, default: false },
    organisations: { type: Array, default: () => [] },
  });

  const organisations = ref(props.organisations || []);

  onBeforeUpdate(() => {
    if (!organisations.value && props.organisations) {
      organisations.value = props.organisations;
    }
  });

  const filterOrganisations = (searchText) =>
    props.organisations.filter((org) => new RegExp(searchText, 'gi').test(org.title));

  const onSearch = (searchText) => {
    organisations.value = searchText ? filterOrganisations(searchText) : props.organisations;
  };
</script>

<template>
  <div v-if="props.isFetching" class="mb-4 flex h-full flex-col">
    <div class="flex items-center justify-center">
      <LoadingSpinner />
    </div>
  </div>
  <div v-else class="mb-4">
    <SearchFilter placeholder="Organisation name" @on-search="onSearch" />
    <div class="py-4">Found {{ organisations.length }} organisations.</div>
    <hr />
  </div>
</template>
