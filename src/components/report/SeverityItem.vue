<script setup>
  import { computed, ref } from 'vue';
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
  const selectAll = ref(true);
  const severityTypes = computed(() => {
    return props.severity.types.map((_type) => {
      _type.show = selectAll;

      return _type;
    });
  });
  const bgClass = {
    'bg-success': props.severity.id === 'success',
    'bg-warning': props.severity.id === 'warning',
    'bg-error': props.severity.id === 'error',
    'bg-critical': props.severity.id === 'critical',
  };

  console.log(props.severity);

  const onToggleSeverity = () => (selectAll.value = !selectAll.value);
</script>
<template>
  <AppAccordion>
    <template #title>
      <div :class="bgClass" class="w-full px-4 py-2 text-left text-white">
        <CheckBox
          :id="props.severity.name"
          :label="label"
          :name="props.severity.name"
          :checked="selectAll"
          @checked="onToggleSeverity"
          @unchecked="onToggleSeverity"
        />
      </div>
    </template>
    <template #content>
      <div class="border border-gray-200 bg-gray-100 px-4">
        <div class="py-2 text-sm text-slate-700">{{ props.severity.description }}</div>
        <CheckBox
          v-for="severityType in severityTypes"
          :id="severityType.id"
          :key="severityType.id"
          :label="`${severityType.text} (${severityType.count})`"
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
