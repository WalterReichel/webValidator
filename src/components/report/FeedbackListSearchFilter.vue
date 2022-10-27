<script setup>
  import { ref, watch, watchEffect } from 'vue';
  import { debounce } from '../../utils';

  const props = defineProps({
    buttonCaption: { type: String, default: 'Search' },
    placeholder: { type: String, default: '' },
    searchText: { type: String, default: '' },
  });
  const emit = defineEmits(['onFilter']);
  const search = ref(props.searchText);

  watch(
    search,
    debounce(() => emit('onFilter', search.value.trim()), 250)
  );

  watchEffect(() => {
    if (props.searchText) {
      emit('onFilter', props.searchText);
    }
  });
</script>

<template>
  <div class="mb-4 mt-2 flex w-full flex-row flex-wrap justify-around">
    <input
      v-model="search"
      class="m-0 w-full border border-iati-blue px-4 py-2 text-base focus-visible:outline-none"
      :placeholder="props.placeholder"
      autofocus
    />
  </div>
</template>
