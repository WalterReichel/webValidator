<script setup>
  const props = defineProps({ variant: { type: String, default: 'default' } });

  const bgClass = {
    'bg-iati-blue': props.variant === 'default',
    'bg-success': props.variant === 'success',
    'bg-warning': props.variant === 'warning',
    'bg-error': props.variant === 'error',
    'bg-critical': props.variant === 'critical',
  };
</script>

<template>
  <span
    class="mr-1 inline-block whitespace-nowrap rounded px-1.5 py-1 text-center align-baseline text-[75%] font-bold leading-none text-white"
    :class="bgClass"
  >
    <slot />
  </span>
</template>
