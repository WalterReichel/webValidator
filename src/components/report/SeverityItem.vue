<script setup>
  import { computed } from 'vue';
  import AppAccordion from '../AppAccordion.vue';
  import CheckBox from '../CheckBox.vue';

  const props = defineProps({ severity: { type: Object, default: null } });
  const label = computed(() => {
    if (props.severity) {
      const { name, types } = props.severity;
      return `${name}: ${types.length} ${types.length == 1 ? 'type' : 'types'}`;
    }

    return '';
  });
  const bgClass = {
    'bg-success': props.severity.id === 'success',
    'bg-warning': props.severity.id === 'warning',
    'bg-error': props.severity.id === 'error',
    'bg-critical': props.severity.id === 'critical',
  };

  console.log(props.severity);

  const onFilter = (severity, checked = false) => {
    console.log(checked ? 'Checked:' : 'Unchecked:', severity);
  };
</script>
<template>
  <AppAccordion>
    <template #title>
      <div :class="bgClass" class="w-full px-4 py-2 text-left text-white">
        <CheckBox
          :id="props.severity.name"
          :label="label"
          :name="props.severity.name"
          :checked="true"
          @checked="onFilter(props.severity.name, true)"
          @unchecked="onFilter(props.severity.name)"
        />
      </div>
    </template>
    <template #content>
      <div class="border border-gray-200 bg-gray-100 px-4">
        <div class="py-2 text-sm text-slate-700">{{ props.severity.description }}</div>
        <CheckBox
          v-for="severityType in props.severity.types"
          :id="severityType.id"
          :key="severityType.id"
          :label="severityType.text"
          :name="severityType.id"
          :checked="severityType.show"
          :label-class="'text-sm'"
          @checked="onFilter(severityType.id, true)"
          @unchecked="onFilter(severityType.id)"
        />
      </div>
    </template>
  </AppAccordion>
</template>
