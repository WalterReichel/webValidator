<script setup>
  import DocumentListItem from './DocumentListItem.vue';

  const headerClassNames = 'hidden border-y border-solid border-gray-300 p-2.5 font-bold sm:block';
  const props = defineProps({ documents: { type: Object, default: () => {} } });
  const documentSort = (sortVariable) => {
    console.log(sortVariable);
  };
</script>

<template>
  <div class="grid grid-cols-1">
    <div class="sticky top-0 grid grid-cols-5 gap-0 bg-white">
      <div class="first:pl-3.5" :class="headerClassNames" @click="documentSort('fileName')">File Name</div>
      <div :class="headerClassNames" @click="documentSort('registryIdentity')">Identified in Registry</div>
      <div :class="headerClassNames" @click="documentSort('validationDate')">Validated</div>
      <div :class="headerClassNames" @click="documentSort('validationStatus')">Validation Status</div>
      <div :class="headerClassNames" @click="documentSort('availabilityInDatastore')">Available in IATI Datastore</div>
    </div>
    <DocumentListItem v-for="document in props.documents" :key="document.hash" :document="document" />
    <!-- <slot /> -->
  </div>
</template>
