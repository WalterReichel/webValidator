<script setup>
  import { computed } from 'vue';
  import { getDocumentReportCategories, getDocumentReportSeverities, getReportErrorsByIdentifier } from '../../utils';
  import ActivityErrors from './ActivityErrors.vue';
  import CategoryItem from './CategoryItem.vue';
  import FileErrors from './FileErrors.vue';
  import SeverityItem from './SeverityItem.vue';

  const props = defineProps({ document: { type: Object, default: null }, report: { type: Object, default: null } });

  const categories = computed(() => getDocumentReportCategories(props.report));
  const severities = computed(() => getDocumentReportSeverities(props.report));

  const onFilterBySeverity = (severity) => {
    console.log(severity);
  };
  const onFilterByCategory = (category) => {
    console.log(category);
  };
</script>

<template>
  <div class="-mx-3.5 flex flex-wrap">
    <div class="shrink-0 grow-0 basis-1/3">
      <div class="m-2.5">
        <h3 class="text-xl font-bold">Filters</h3>
        <div class="bg-slate-300">
          <div class="px-4 py-2">
            <h4 class="text-base font-bold">View by message type</h4>
            <div class="text-sm text-slate-700">Click to show or hide individual message types</div>
          </div>
          <SeverityItem
            v-for="severity in severities"
            :key="severity.id"
            :severity="severity"
            @select="onFilterBySeverity"
          />
          <div class="px-4 pt-2">
            <h4 class="text-base font-bold">View by category</h4>
          </div>
          <div class="px-4 py-2">
            <CategoryItem
              v-for="category in categories"
              :key="category.id"
              :category="category"
              @select="onFilterByCategory"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="shrink-0 grow-0 basis-2/3">
      <div class="m-2.5">
        <h3 class="text-xl font-bold">Feedback</h3>
        <FileErrors v-if="props.report" :title="'File Errors Go Here'" :report="props.report" />
        <ActivityErrors v-if="props.report" :errors="getReportErrorsByIdentifier(props.report, 'activity')" />
      </div>
    </div>
  </div>
</template>
