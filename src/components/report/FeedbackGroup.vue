<script setup>
  import AppAccordion from '../AppAccordion.vue';

  const props = defineProps({ activity: { type: Object, default: null } });
</script>
<template>
  <AppAccordion :open="false" class="mb-4">
    <template #title>
      <div class="w-full bg-slate-100 px-4 py-2 text-left">
        {{ props.activity.title || 'Untitled Activity' }}
      </div>
    </template>
    <template #content>
      <div class="border border-gray-100 px-4">Activity Content Goes Here</div>
    </template>
  </AppAccordion>
</template>
