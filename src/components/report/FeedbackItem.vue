<script setup>
  import AppAlert from '../AppAlert.vue';

  const props = defineProps({ item: { type: Object, default: null } });
</script>

<template>
  <AppAlert class="mt-2" :variant="props.item.severity">
    {{ props.item.message }}
  </AppAlert>
</template>
