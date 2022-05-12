<script setup>
  import { ref } from 'vue';
  import StyledLink from './StyledLink.vue';
  import LoadingSpinner from '../components/LoadingSpinner.vue';
  import OrganisationSearchFilter from './OrganisationSearchFilter.vue';

  const props = defineProps({
    isFetching: { type: Boolean, default: false },
    organisations: { type: Array, default: () => [] },
  });

  const organisations = ref(props.organisations || []);
  const alphabet = (() => {
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    return alpha.map((x) => String.fromCharCode(x));
  })();

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
    <div class="py-4">
      Found <b>{{ organisations.length }}</b> organisations.
    </div>
    <hr class="mb-2" />
    <div class="mb-2 flex flex-row justify-between">
      <span v-for="letter in alphabet" :key="letter" class="cursor-pointer">{{ letter }}</span>
      <span class="cursor-pointer">123</span>
    </div>
    <div v-for="organisation in organisations" :key="organisation.name">
      <StyledLink :to="`/organisation/${organisation.name}`">{{ organisation.title }}</StyledLink>
    </div>
  </div>
</template>
