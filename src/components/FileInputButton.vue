<script setup>
  const props = defineProps({
    disabled: { type: Boolean, default: false },
    accept: { type: String, default: '*' },
    multiple: { type: Boolean, default: false },
  });

  const onChange = (event) => {
    console.log(event.target.files);
  };
</script>
<template>
  <div class="mx-auto mt-auto inline-block">
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
</template>
