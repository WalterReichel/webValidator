<script setup>
  import { cloneDeep } from 'lodash';
  import useSWRV from 'swrv';
  import { computed, provide, ref, watch } from 'vue';
  import {
    fetchGuidanceLinks,
    getDocumentReportCategories,
    getDocumentReportSeverities,
    getGuidanceLinksURL,
  } from '../../utils';
  import ActivityErrors from './ActivityErrors.vue';
  import CategoryItem from './CategoryItem.vue';
  import FileErrors from './FileErrors.vue';
  import SeverityItem from './SeverityItem.vue';

  const props = defineProps({ document: { type: Object, default: null }, report: { type: Object, default: null } });

  const { data: guidanceLinks } = useSWRV(
    () => (props.report && props.report.iatiVersion ? getGuidanceLinksURL(props.report.iatiVersion) : null),
    () => fetchGuidanceLinks(props.report.iatiVersion)
  );
  provide('guidanceLinks', guidanceLinks);
  const activeSeverity = ref(null);
  const activeCategory = ref(null);
  const categories = computed(() => {
    const _categories = !categories.value ? getDocumentReportCategories(props.report) : categories.value;
    return _categories.map((category) => {
      if (activeCategory.value && category.id === activeCategory.value.id) {
        category.show = activeCategory.value.show;
      }

      return category;
    });
  });
  const severities = computed(() => {
    const _severities = !severities.value ? getDocumentReportSeverities(props.report) : severities.value;

    return _severities.map((severity) => {
      if (activeSeverity.value && severity.id === activeSeverity.value.id) {
        severity = activeSeverity.value;
      }

      return severity;
    });
  });
  const hasMessages = computed(() => {
    if (!props.report) return false;

    const { summary } = props.report;
    return Object.keys(summary).some((item) => summary[item] > 0);
  });
  const filteredReport = ref(props.report);
  const fileTypeProps = (report, propsFor = 'file') => {
    // alternative option for propsFor is 'activity'
    if (!report) return { title: '' };
    switch (report.fileType) {
      case 'iati-activities':
        return { type: 'activity', title: propsFor === 'file' ? 'Activity file feedback' : 'Feedback per activity' };
      case 'iati-organisations':
        return {
          type: 'organisation',
          title: propsFor === 'file' ? 'Organisation file feedback' : 'Organisation feedback',
        };

      default:
        return { title: 'Not an IATI file' };
    }
  };

  // watch and filter report by category and severity
  watch([categories, severities], () => {
    const report = cloneDeep(props.report);
    report.errors.forEach((activity) => {
      // filter report by category
      activity.errors = activity.errors.filter((feedback) =>
        categories.value.some((c) => c.show === true && c.id === feedback.category)
      );
      // filter report by severity
      activity.errors.forEach((item) => {
        item.errors = item.errors.filter(
          (feedback) =>
            severities.value.some((sev) => sev.show === true && sev.slug === feedback.severity) && // filter by severity
            severities.value.some((t) => t.types.some((m) => m.show === true && m.id === feedback.id)) // filter by severity message type
        );
      });
    });
    filteredReport.value = report;
  });

  const onFilterBySeverity = (severity) => {
    activeSeverity.value = severity;
  };
  const onFilterByCategory = (category) => {
    activeCategory.value = category;
  };
</script>

<template>
  <div class="-mx-3.5 flex flex-wrap">
    <div v-if="hasMessages" class="relative flex shrink grow flex-col sm:w-full md:basis-1/3">
      <div class="sticky top-0 m-2.5">
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
    <div class="flex shrink grow flex-col" :class="hasMessages ? 'sm:w-full  md:basis-2/3' : 'w-full'">
      <div class="m-2.5">
        <h3 class="text-xl font-bold">Feedback</h3>
        <FileErrors
          v-if="props.report"
          :file-type="fileTypeProps(props.report).type"
          :title="fileTypeProps(props.report).title"
          :report="filteredReport"
          :guidance-links="guidanceLinks"
        />
        <ActivityErrors
          v-if="filteredReport"
          :title="fileTypeProps(props.report, 'activity').title"
          :file-type="fileTypeProps(props.report, 'activity').type"
          :report="filteredReport"
        />
      </div>
    </div>
  </div>
</template>

<style>
  .iati-accordion > button > svg {
    color: #ffffff;
  }
</style>
