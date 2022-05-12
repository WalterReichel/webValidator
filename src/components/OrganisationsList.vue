<script setup>
  import { computed, ref, onBeforeUpdate } from 'vue';
  import LoadingSpinner from '../components/LoadingSpinner.vue';
  import SearchFilter from './SearchFilter.vue';
  import StyledLink from './StyledLink.vue';

  const props = defineProps({
    isFetching: { type: Boolean, default: false },
    organisations: { type: Array, default: () => [] },
  });

  const searchText = ref(null);
  const organisations = computed(() =>
    searchText.value && props.organisations
      ? props.organisations.filter((org) => new RegExp(searchText.value, 'gi').test(org.title))
      : props.organisations || []
  );

  onBeforeUpdate(() => {
    if (!organisations.value && props.organisations) {
      organisations.value = props.organisations;
    }
  });

  const onSearch = (text) => (searchText.value = text);
</script>

<template>
  <div v-if="props.isFetching" class="mb-4 flex h-full flex-col">
    <div class="flex items-center justify-center">
      <LoadingSpinner />
    </div>
  </div>
  <div v-else class="mb-4">
    <SearchFilter placeholder="Organisation name" @on-search="onSearch" />
    <div class="py-4">
      Found <b>{{ organisations.length }}</b> organisations.
    </div>
    <hr class="mb-4" />
    <div v-for="organisation in organisations" :key="organisation.name">
      <StyledLink :to="`/organisation/${organisation.name}`">{{ organisation.title }}</StyledLink>
    </div>
  </div>
</template>
