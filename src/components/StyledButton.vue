<script setup>
  const emit = defineEmits(['click']);
</script>

<template>
  <button
    class="mx-auto mt-auto inline-block bg-iati-green px-5 py-2 uppercase !text-white hover:bg-iati-blue disabled:cursor-not-allowed disabled:opacity-75"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>
