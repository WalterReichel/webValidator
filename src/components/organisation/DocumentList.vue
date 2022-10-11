<script setup>
  import { reactive } from 'vue';
  import { processedTableDocumentFields } from '../../utils';
  import DocumentListItem from './DocumentListItem.vue';

  const state = reactive({
    sortKey: '',
    sortDirection: '',
  });
  function onSortKeyChange(sortVariable, direction) {
    state.sortKey = sortVariable;
    state.sortDirection = direction;
  }

  const headerClassNames = 'hidden border-y border-solid border-gray-300 p-2.5 font-bold sm:block';
  const props = defineProps({ documents: { type: Object, default: () => {} } });
  const documentSort = () => {
    return processedTableDocumentFields(props.documents, state.sortKey, state.sortDirection);
  };
</script>

<template>
  <div class="grid grid-cols-1">
    <div class="sticky top-0 grid grid-cols-5 gap-0 bg-white">
      <div class="first:pl-3.5" :class="headerClassNames">
        File Name
        <span>
          <svg
            class="h-6 w-6 text-gray-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            @click="onSortKeyChange('fileName', 'ascending')"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M18 15l-6-6l-6 6h12" />
          </svg>
          <svg
            class="h-6 w-6 text-gray-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            @click="onSortKeyChange('fileName', 'descending')"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M18 15l-6-6l-6 6h12" transform="rotate(180 12 12)" />
          </svg>
        </span>
      </div>
      <div :class="headerClassNames">
        Identified in Registry
        <span>
          <svg
            class="h-6 w-6 text-gray-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            @click="onSortKeyChange('registryIdentity', 'ascending')"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M18 15l-6-6l-6 6h12" />
          </svg>
          <svg
            class="h-6 w-6 text-gray-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            @click="onSortKeyChange('registryIdentity', 'descending')"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M18 15l-6-6l-6 6h12" transform="rotate(180 12 12)" />
          </svg>
        </span>
      </div>
      <div :class="headerClassNames" @click="onSortKeyChange('validationDate')">Validated</div>
      <div :class="headerClassNames" @click="onSortKeyChange('validationStatus')">Validation Status</div>
      <div :class="headerClassNames" @click="onSortKeyChange('availabilityInDatastore')">
        Available in IATI Datastore
      </div>
    </div>
    <DocumentListItem v-for="document in documentSort()" :key="document.hash" :document="document" />
  </div>
</template>
