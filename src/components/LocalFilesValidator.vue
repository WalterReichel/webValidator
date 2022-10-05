<script setup>
  import { ref } from 'vue';
  import CardiB from '../components/CardiB.vue';
  import LinkButton from '../components/LinkButton.vue';
  import FileInputButton from './FileInputButton.vue';

  const activeStep = ref(1);
  const files = ref([]);
  const onAddFiles = (_files) => {
    files.value = _files;
    activeStep.value = files.value.length ? 2 : 1;
  };
</script>
<template>
  <div class="-m-2.5 flex flex-wrap pt-4">
    <CardiB heading="Step 1" class="w-[300px]" :class="{ 'border-t-iati-blue': activeStep !== 1 }">
      <p class="text-center">Select your IATI files. You can select multiple files at the same time.</p>
      <FileInputButton
        accept=".xml"
        :multiple="true"
        class="mx-auto mt-auto text-center text-tiny"
        @change="onAddFiles"
      >
        Browse
      </FileInputButton>
    </CardiB>
    <CardiB
      heading="Step 2"
      class="w-[300px]"
      :class="{ 'pointer-events-none opacity-50': activeStep === 1, 'border-t-iati-blue': activeStep !== 2 }"
    >
      <p class="text-center">Upload your IATI files and start validation.</p>
      <LinkButton to="/validate" class="text-tiny"> Upload </LinkButton>
    </CardiB>
    <CardiB
      heading="Step 3"
      class="w-[300px]"
      :class="{ 'pointer-events-none opacity-50': activeStep !== 3, 'border-t-iati-blue': activeStep !== 3 }"
    >
      <p class="mb-4 text-center">
        Your files are being validated - click below to view their progress and, when complete, reports.
      </p>
      <LinkButton to="/validate" class="text-tiny"> View Progress and Reports </LinkButton>
    </CardiB>
  </div>
</template>
