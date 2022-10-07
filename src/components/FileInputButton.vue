<script setup>
  import { ref, watch } from 'vue';
  import StyledButton from './StyledButton.vue';

  const props = defineProps({
    disabled: { type: Boolean, default: false },
    accept: { type: String, default: '*' },
    multiple: { type: Boolean, default: false },
  });
  const emit = defineEmits(['change']);
  const files = ref([]);

  const onChange = (event) => {
    files.value = event.target.files;
  };

  watch(files, () => {
    emit('change', files.value);
  });
</script>
<template>
  <div v-if="!files.length" class="inline-block">
    <label class="bg-iati-green px-5 py-2 uppercase !text-white hover:bg-iati-blue" for="file-upload">
      <slot />
    </label>
    <input
      id="file-upload"
      type="file"
      :accept="props.accept"
      :disabled="props.disabled"
      :multiple="props.multiple"
      class="hidden"
      @change="onChange"
    />
  </div>
  <div v-else class="mt-2 inline-block w-full">
    <p
      v-for="file in files"
      :key="file.name"
      class="inline-block w-full overflow-hidden text-ellipsis whitespace-nowrap"
    >
      {{ file.name }}
    </p>
    <StyledButton class="mt-2 uppercase" @click="files = []">Clear</StyledButton>
  </div>
</template>
