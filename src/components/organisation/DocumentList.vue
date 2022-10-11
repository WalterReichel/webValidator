<script setup>
  import { reactive } from 'vue';
  import { processedTableDocumentFields } from '../../utils';
  import DocumentListItem from './DocumentListItem.vue';

  const state = reactive({
    sortKey: '',
  });
  function onSortKeyChange(sortVariable) {
    state.sortKey = sortVariable;
  }
  const headerClassNames = 'hidden border-y border-solid border-gray-300 p-2.5 font-bold sm:block';
  const props = defineProps({ documents: { type: Object, default: () => {} } });
  const documentSort = () => {
    return processedTableDocumentFields(props.documents, state.sortKey, false);
  };
</script>

<template>
  <div class="grid grid-cols-1">
    <div class="sticky top-0 grid grid-cols-5 gap-0 bg-white">
      <div class="first:pl-3.5" :class="headerClassNames" @click="onSortKeyChange('fileName')">File Name</div>
      <div :class="headerClassNames" @click="onSortKeyChange('registryIdentity')">Identified in Registry</div>
      <div :class="headerClassNames" @click="onSortKeyChange('validationDate')">Validated</div>
      <div :class="headerClassNames" @click="onSortKeyChange('validationStatus')">Validation Status</div>
      <div :class="headerClassNames" @click="onSortKeyChange('availabilityInDatastore')">
        Available in IATI Datastore
      </div>
    </div>
    <DocumentListItem v-for="document in documentSort()" :key="document.hash" :document="document" />
  </div>
</template>
