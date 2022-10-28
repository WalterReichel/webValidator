<script setup>
  import { ref, watchEffect } from 'vue';
  import { debounce } from '../utils';

  const props = defineProps({
    buttonCaption: { type: String, default: 'Search' },
    placeholder: { type: String, default: '' },
    defaultSearch: { type: String, default: '' },
    showButton: { type: Boolean, default: true },
  });
  const emit = defineEmits(['onSearch']);
  const search = ref(props.defaultSearch);

  watchEffect(() => {
    const searchText = search.value.trim();
    debounce(() => emit('onSearch', searchText), 250)();
  });
  const onSearch = () => emit('onSearch', search.value.trim());
</script>

<template>
  <div class="flex w-full flex-row flex-wrap justify-around sm:w-[500px]">
    <input
      v-model="search"
      class="m-0 w-full border px-4 py-3 text-lg focus-visible:outline-none sm:w-[350px]"
      :placeholder="props.placeholder"
      autofocus
    />
    <button
      v-if="props.showButton"
      class="relative mt-4 inline w-full border-0 bg-iati-blue p-3 text-base uppercase sm:mt-0 sm:w-[150px]"
      @click="onSearch"
    >
      {{ props.buttonCaption }}
    </button>
  </div>
</template>
