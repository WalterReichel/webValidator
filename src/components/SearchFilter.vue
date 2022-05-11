<script setup>
  const props = defineProps({
    buttonCaption: { type: String, default: 'Search' },
    placeholder: { type: String, default: '' },
  });
</script>

<template>
  <div class="flex w-[500px] flex-row flex-wrap justify-around">
    <input
      type="text"
      class="m-0 w-[350px] border px-4 py-3 text-xl focus-visible:outline-none"
      :placeholder="props.placeholder"
      autofocus
    />
    <button class="relative inline w-[150px] border-0 bg-iati-blue p-3 text-base uppercase">
      {{ props.buttonCaption }}
    </button>
  </div>
</template>
