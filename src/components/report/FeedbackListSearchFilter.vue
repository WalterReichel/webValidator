<script setup>
  import { ref, watch } from 'vue';
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

  watch(
    () => props.searchText,
    (newValue) => (search.value = newValue)
  );
</script>

<template>
  <div class="mb-4 mt-2 flex w-full flex-row flex-wrap justify-around">
    <input
      v-model="search"
      class="m-0 w-full border px-4 py-3 text-lg focus-visible:outline-none"
      :placeholder="props.placeholder"
      autofocus
    />
  </div>
</template>
