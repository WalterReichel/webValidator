<script setup>
  const emits = defineEmits(['next', 'previous']);
</script>

<template>
  <div class="px-4 text-center">
    <button class="mr-1 rounded-md border border-slate-200 p-4" @click="emits('previous')">
      <svg
        class="w-3 rotate-90 transform transition-all duration-200"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 10"
        aria-hidden="true"
      >
        <path d="M15 1.2l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <slot />
    <button class="ml-1 rounded-md border border-slate-200 p-4" @click="emits('next')">
      <svg
        class="w-3 -rotate-90 transform transition-all duration-200"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 10"
        aria-hidden="true"
      >
        <path d="M15 1.2l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </div>
</template>
