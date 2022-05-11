<script setup>
  import LoadingSpinner from '../components/LoadingSpinner.vue';
  import SearchFilter from './SearchFilter.vue';
  const props = defineProps({ isFetching: { type: Boolean, default: false } });
</script>

<template>
  <div v-if="props.isFetching" class="mb-4 flex h-full flex-col">
    <div class="flex items-center justify-center">
      <LoadingSpinner />
    </div>
  </div>
  <div v-else class="mb-4">
    <SearchFilter placeholder="Organisation name" />
  </div>
</template>
