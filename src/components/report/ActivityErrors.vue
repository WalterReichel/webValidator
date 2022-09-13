<script setup>
  import { computed, ref } from 'vue';
  import { getReportErrorsByIdentifier } from '../../utils';
  import AppAccordion from '../AppAccordion.vue';
  import AppPagination from '../AppPagination.vue';
  import FeedbackGroup from './FeedbackGroup.vue';

  const props = defineProps({ report: { type: Object, default: null }, title: { type: String, default: '' } });
  const data = computed(() => getReportErrorsByIdentifier(props.report, 'activity'));
  const page = ref(1);
  const PAGE_LIMIT = 10;
  const pageData = computed(() => {
    const min = (page.value - 1) * PAGE_LIMIT;
    const max = min + PAGE_LIMIT;
    return data.value.filter((_item, index) => index < max && index >= min);
  });

  const onNext = () => {
    const nextPage = page.value + 1;
    const maxPages = data.value.length / PAGE_LIMIT;
    if (nextPage < maxPages) page.value = nextPage;
  };
  const onPrevious = () => {
    const previousPage = page.value - 1;
    if (previousPage >= 1) page.value = previousPage;
  };
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
        <FeedbackGroup v-for="activity in pageData" :key="activity.identifier" :activity="activity" />
        <AppPagination @next="onNext" @previous="onPrevious">
          <span class="text-sm">Page {{ page }} of {{ Math.ceil(data.length / PAGE_LIMIT) }}</span>
        </AppPagination>
      </div>
    </template>
  </AppAccordion>
</template>
