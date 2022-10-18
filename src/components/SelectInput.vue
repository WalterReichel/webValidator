<script setup>
  import VueMultiselect from 'vue-multiselect';

  const props = defineProps({
    options: { type: Array, default: () => [] },
  });
</script>
<template>
  <VueMultiselect :options="props.options" />
</template>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style>
  .multiselect__option--highlight,
  .multiselect__option--highlight:after {
    background: #155366;
  }
  .multiselect__option--selected.multiselect__option--highlight {
    background: #81c3d6;
  }
  .multiselect__option--selected.multiselect__option--highlight:after {
    background: #81c3d6;
  }
  .multiselect__option--group-selected.multiselect__option--highlight {
    background: #81c3d6;
  }
</style>
