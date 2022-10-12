<script setup>
  import { ref, watch } from 'vue';
  import CardiB from '../components/CardiB.vue';
  import LinkButton from '../components/LinkButton.vue';
  import AppAlert from './AppAlert.vue';
  import LoadingSpinner from './LoadingSpinner.vue';
  import StyledButton from './StyledButton.vue';

  const props = defineProps({ workspaceID: { type: String, default: '' } });
  const activeStep = ref(1);
  const requestStatus = ref(''); // 'pending' | 'draft' | 'success' | 'error' = 'draft'
  const urls = ref('');
  const incorrectURLs = ref([]);

  watch(urls, () => {
    if (urls.value) {
      activeStep.value = 2;
      requestStatus.value = 'draft';
    } else if (activeStep.value !== 1) {
      activeStep.value = 1;
      requestStatus.value = '';
    }

    if (incorrectURLs.value.length) {
      incorrectURLs.value = [];
    }
  });

  const uploadFiles = () => {
    // const _files = Array.prototype.slice.call(files.value); TODO: remove when sure it's not needed
    // const handleError = () => {
    //   requestStatus.value = 'error';
    // };
    // TODO: fetch and upload files
  };
</script>
<template>
  <div class="-m-2.5 flex flex-wrap pt-4">
    <CardiB heading="Step 1" class="w-[300px]" :class="{ 'border-t-iati-blue': activeStep !== 1 }">
      <p class="text-center">
        Add a web address (URL) of your IATI XMLfile. You can add multiple files by seperating them with |
      </p>
      <input
        v-model="urls"
        type="text"
        placeholder="Enter web address"
        class="mt-2 border border-solid border-iati-green p-2 pl-4"
      />
      <p v-if="incorrectURLs.length" class="pt-2 text-sm text-warning">
        You have one or more incorrect web addresses: "{{ incorrectURLs.join(', ') }}"
      </p>
    </CardiB>
    <CardiB
      heading="Step 2"
      class="w-[300px]"
      :class="{ 'pointer-events-none opacity-50': activeStep === 1, 'border-t-iati-blue': activeStep !== 2 }"
    >
      <p class="text-center">Fetch the files from the web.</p>
      <div v-if="requestStatus && requestStatus !== 'draft'" class="my-3 text-sm">
        <AppAlert v-if="requestStatus === 'error'" variant="error">
          File(s) uploading failed. Check your files and try again.
        </AppAlert>
        <AppAlert v-else-if="requestStatus === 'success'" variant="success">
          File(s) have been uploaded successfully
        </AppAlert>
        <AppAlert v-else variant="default">
          <div class="flex flex-col items-center">
            <LoadingSpinner class="w-8" />
          </div>
          <div class="text-center">
            Your files are uploading now. Large files could be uploading for more than few minutes.
          </div>
        </AppAlert>
      </div>
      <StyledButton class="text-tiny uppercase" :disabled="requestStatus !== 'draft'" @click="uploadFiles">
        Fetch
      </StyledButton>
    </CardiB>
    <CardiB
      heading="Step 3"
      class="w-[300px]"
      :class="{ 'pointer-events-none opacity-50': activeStep !== 3, 'border-t-iati-blue': activeStep !== 3 }"
    >
      <p class="mb-4 text-center">
        Your URLs are being validated - click below to view their progress and, when complete, reports.
      </p>
      <LinkButton :to="`/validate/${props.workspaceID}`" class="text-tiny"> View Progress and Reports </LinkButton>
    </CardiB>
  </div>
</template>
