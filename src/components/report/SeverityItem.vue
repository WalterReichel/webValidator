<script setup>
  import AppAccordion from '../AppAccordion.vue';
  import CheckBox from '../CheckBox.vue';

  const props = defineProps({ severity: { type: Object, default: null } });
  const bgClass = {
    'bg-success': props.severity.id === 'success',
    'bg-warning': props.severity.id === 'warning',
    'bg-error': props.severity.id === 'error',
    'bg-critical': props.severity.id === 'critical',
  };

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
          :label="props.severity.name"
          :name="props.severity.name"
          :checked="true"
          @checked="onFilter(props.severity.name, true)"
          @unchecked="onFilter(props.severity.name)"
        />
      </div>
    </template>
    <template #content> Content Goes Here </template>
  </AppAccordion>
</template>
