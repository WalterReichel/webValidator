<script setup>
  import { computed } from 'vue';
  import { getReportErrorsByIdentifier } from '../../utils';
  import AppAccordion from '../AppAccordion.vue';
  import FeedbackGroup from './FeedbackGroup.vue';

  const props = defineProps({ report: { type: Object, default: null }, title: { type: String, default: '' } });
  const data = computed(() => getReportErrorsByIdentifier(props.report, 'activity'));
</script>

<template>
  <AppAccordion :open="false">
    <template #title>
      <div class="w-full bg-slate-300 px-4 py-2 text-left">
        {{ props.title }}
      </div>
    </template>
    <template #content>
      <div class="border border-gray-200 px-4 pt-4">
        <FeedbackGroup v-for="activity in data" :key="activity.identifier" :activity="activity" />
      </div>
    </template>
  </AppAccordion>
</template>
