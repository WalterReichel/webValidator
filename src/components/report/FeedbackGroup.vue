<script setup>
  import AppAccordion from '../AppAccordion.vue';

  const props = defineProps({ activity: { type: Object, default: null } });
</script>
<template>
  <AppAccordion :open="false" class="mb-4">
    <template #title>
      <div class="w-full bg-slate-300 px-4 py-2 text-left">
        {{ props.activity.title }}
      </div>
    </template>
    <template #content>
      <div class="border border-gray-200 px-4">Activity Content Goes Here</div>
    </template>
  </AppAccordion>
</template>
