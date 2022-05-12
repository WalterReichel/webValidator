<script setup>
  import { ref, watch } from 'vue';
  const props = defineProps({
    buttonCaption: { type: String, default: 'Search' },
    placeholder: { type: String, default: '' },
  });
  const emit = defineEmits(['onSearch']);
  const search = ref(null);
  watch(search, () => {
    emit('onSearch', search.value);
  });
</script>

<template>
  <div class="flex w-full flex-row flex-wrap justify-around sm:w-[500px]">
    <input
      v-model="search"
      class="m-0 w-full border px-4 py-3 text-xl focus-visible:outline-none sm:w-[350px]"
      :placeholder="props.placeholder"
      autofocus
    />
    <button class="relative mt-4 inline w-full border-0 bg-iati-blue p-3 text-base uppercase sm:mt-0 sm:w-[150px]">
      {{ props.buttonCaption }}
    </button>
  </div>
</template>
