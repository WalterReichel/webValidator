<script setup>
  import AppAccordion from '../AppAccordion.vue';

  const props = defineProps({ title: { type: String, default: '' }, errors: { type: Object, default: null } });
  console.log(props);
</script>

<template>
  <AppAccordion :open="true">
    <template #title>
      <div class="w-full bg-slate-300 px-4 py-2 text-left">{{ props.title }}</div>
    </template>
    <template #content>
      <div class="border border-gray-200 px-4">Content Goes Here</div>
    </template>
  </AppAccordion>
</template>
