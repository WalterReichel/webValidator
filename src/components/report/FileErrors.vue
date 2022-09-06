<script setup>
  import AppAccordion from '../AppAccordion.vue';
  import AppBadge from '../AppBadge.vue';
  import { getFileErrorsMessageTypeCount } from '../../utils';

  const props = defineProps({ title: { type: String, default: '' }, errors: { type: Object, default: null } });

  const messageTypes = ['critical', 'error', 'warning', 'info', 'success']
    .map((messageType) => ({ type: messageType, count: getFileErrorsMessageTypeCount(props.errors, messageType) }))
    .filter((messageType) => messageType.count > 0);
</script>

<template>
  <AppAccordion :open="true">
    <template #title>
      <div class="w-full bg-slate-300 px-4 py-2 text-left">
        {{ props.title }}
        <AppBadge v-for="messageType in messageTypes" :key="messageType.type" :variant="messageType.type">
          {{ messageType.count }}
        </AppBadge>
      </div>
    </template>
    <template #content>
      <div class="border border-gray-200 px-4">Content Goes Here</div>
    </template>
  </AppAccordion>
</template>
