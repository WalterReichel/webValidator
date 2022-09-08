<script setup>
  import { getFeedbackCategoryLabel } from '../../utils';
  import AppAlert from '../AppAlert.vue';
  import AppBadge from '../AppBadge.vue';
  import CenteredLoadingSpinner from '../CenteredLoadingSpinner.vue';

  const props = defineProps({ message: { type: Object, default: null } });
</script>

<template>
  <CenteredLoadingSpinner v-if="!props.message" />
  <div v-else>
    <AppBadge>{{ getFeedbackCategoryLabel(props.message.category) }}</AppBadge>
    <AppAlert v-for="item in props.message.errors" :key="item.id" class="mt-2" :variant="item.severity">
      {{ item.message }}
    </AppAlert>
  </div>
</template>
