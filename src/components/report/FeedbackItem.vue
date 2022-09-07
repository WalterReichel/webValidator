<script setup>
  import { getFeedbackCategoryLabel } from '../../utils';
  import CenteredLoadingSpinner from '../CenteredLoadingSpinner.vue';
  import AppBadge from '../AppBadge.vue';

  const props = defineProps({ message: { type: Object, default: null } });
</script>

<template>
  <CenteredLoadingSpinner v-if="!props.message" />
  <div v-else>
    <AppBadge>{{ getFeedbackCategoryLabel(props.message.category) }}</AppBadge>
  </div>
</template>
