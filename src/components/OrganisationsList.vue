<script setup>
  import { computed, ref } from 'vue';
  import StyledLink from './StyledLink.vue';
  import LoadingSpinner from '../components/LoadingSpinner.vue';
  import OrganisationSearchFilter from './OrganisationSearchFilter.vue';
  import OrganisationAlphabetNavigator from './OrganisationAlphabetNavigator.vue';

  const props = defineProps({
    isFetching: { type: Boolean, default: false },
    organisations: { type: Array, default: () => [] },
  });

  const organisations = ref(props.organisations || []);
  const anchors = computed(() =>
    (props.organisations || []).reduce((items, curr) => {
      const firstChar = curr.title.split('')[0].toLowerCase();
      return isNaN(Number(firstChar)) && !items.map((item) => item.anchor).includes(firstChar)
        ? items.concat({ anchor: firstChar, name: curr.name })
        : items;
    }, [])
  );

  const getAnchor = (id) => anchors.value.find((item) => item.name === id);
  const isAnchored = (id) => !!getAnchor(id);

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
    <span :id="123"></span>
    <div v-for="organisation in organisations" :key="organisation.name">
      <span v-if="isAnchored(organisation.name)" :id="getAnchor(organisation.name).anchor"></span>
      <StyledLink :to="`/organisation/${organisation.name}`">{{ organisation.title }}</StyledLink>
    </div>
  </div>
</template>
