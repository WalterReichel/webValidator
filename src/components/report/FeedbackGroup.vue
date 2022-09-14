<script setup>
  import { computed } from 'vue';
  import AppAccordion from '../AppAccordion.vue';
  import AppBadge from '../AppBadge.vue';
  import FeedbackList from './FeedbackList.vue';
  import { getFileErrorsMessageTypeCount } from '../../utils';

  const props = defineProps({ activity: { type: Object, default: null } });
  const messages = computed(() => props.activity.errors.filter((message) => message.errors.length));
  const messageTypes = computed(() =>
    ['critical', 'error', 'warning', 'info', 'success']
      .map((messageType) => ({
        type: messageType,
        count: getFileErrorsMessageTypeCount(props.activity.errors, messageType),
      }))
      .filter((messageType) => messageType.count > 0)
  );

  const cleanIdentifier = (identifier) => {
    const newLineIndex = identifier.indexOf('\n');
    return newLineIndex !== -1 ? identifier.substring(0, newLineIndex) : identifier;
  };
</script>
<template>
  <AppAccordion :open="false" class="mb-4">
    <template #title>
      <div class="w-full bg-slate-100 px-4 py-2 text-left">
        <div class="font-medium">
          {{ props.activity.title || 'Untitled Activity' }}
        </div>
        <div class="text-sm">
          {{ cleanIdentifier(props.activity.identifier) }}
          <AppBadge
            v-for="messageType in messageTypes"
            :key="messageType.type"
            :variant="messageType.type"
            class="relative top-[-2px]"
          >
            {{ messageType.count }}
          </AppBadge>
        </div>
      </div>
    </template>
    <template #content>
      <div class="border border-gray-100 px-4 py-2">
        <FeedbackList v-for="(message, index) in messages" :key="index" :message="message" class="pb-2" />
        <span v-if="!messages.length">There is no feedback to display</span>
      </div>
    </template>
  </AppAccordion>
</template>
