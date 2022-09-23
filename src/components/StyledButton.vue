<script setup>
  const emit = defineEmits(['click']);
</script>

<template>
  <button
    class="mx-auto mt-auto inline-block bg-iati-green px-5 py-2 uppercase !text-white hover:bg-iati-blue"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>
