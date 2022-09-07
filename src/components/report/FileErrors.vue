<script setup>
  import { computed } from 'vue';
  import { getFileErrorsMessageTypeCount, getReportErrorsByIdentifier } from '../../utils';
  import AppAccordion from '../AppAccordion.vue';
  import AppAlert from '../AppAlert.vue';
  import AppBadge from '../AppBadge.vue';
  import FeedbackItem from './FeedbackItem.vue';

  const props = defineProps({
    title: { type: String, default: '' },
    report: { type: Object, default: null },
    fileType: { type: String, default: 'activity' }, // options are activity and organisation
    guidanceLinks: { type: Object, default: null },
  });
  const messages = computed(() => getReportErrorsByIdentifier(props.report));

  const messageTypes = ['critical', 'error', 'warning', 'info', 'success']
    .map((messageType) => ({ type: messageType, count: getFileErrorsMessageTypeCount(messages.value, messageType) }))
    .filter((messageType) => messageType.count > 0);
</script>

<template>
  <AppAccordion v-if="(props.report && props.report.summary.critical === 0) || messages.length" :open="true">
    <template #title>
      <div class="flex w-full items-center bg-slate-300 px-4 py-2 text-left">
        <span class="mr-2">{{ props.title }}</span>
        <AppBadge v-for="messageType in messageTypes" :key="messageType.type" :variant="messageType.type">
          {{ messageType.count }}
        </AppBadge>
      </div>
    </template>
    <template #content>
      <div class="border border-gray-200 p-4">
        <AppAlert v-if="!messages.length" variant="success">
          <span>
            Congratulations! This IATI {{ props.fileType }} file has successfully passed IATI XML schema validation!
          </span>
        </AppAlert>
        <FeedbackItem v-for="(message, index) in messages" v-else :key="index" :message="message" />
      </div>
    </template>
  </AppAccordion>
</template>
