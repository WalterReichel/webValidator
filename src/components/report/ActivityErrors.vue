<script setup>
  import AppAccordion from '../AppAccordion.vue';

  const props = defineProps({ errors: { type: Object, default: null }, title: { type: String, default: '' } });
  console.log(props);
</script>

<template>
  <AppAccordion :open="false">
    <template #title>
      <div class="mt-4 w-full bg-slate-300 px-4 py-2 text-left">
        {{ props.title }}
      </div>
    </template>
    <template #content>
      <div class="border border-gray-200 px-4">Activity Errors</div>
    </template>
  </AppAccordion>
</template>
