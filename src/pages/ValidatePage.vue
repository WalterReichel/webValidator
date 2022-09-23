<script setup>
  import ContentContainer from '../components/layout/ContentContainer.vue';
  import { setPageTitle } from '../state';
  import CheckBox from '../components/CheckBox.vue';
  import { ref } from 'vue';
  import LocalFilesValidator from '../components/LocalFilesValidator.vue';
  import RemoteFIlesValidator from '../components/RemoteFIlesValidator.vue';

  setPageTitle('Check data');

  const fileSource = ref('upload');
</script>

<template>
  <ContentContainer class="pb-8">
    <p class="mb-4">Upload your IATI file and receive validation feedback.</p>
    <CheckBox
      id="upload"
      label="I have a file(s) to upload"
      name="fileSource"
      type="radio"
      :checked="true"
      @checked="fileSource = 'upload'"
    />
    <CheckBox
      id="remote"
      type="radio"
      label="I have a URL to a remote file(s)"
      name="fileSource"
      @checked="fileSource = 'remote'"
    />
    <LocalFilesValidator v-if="fileSource === 'upload'" />
    <RemoteFIlesValidator v-if="fileSource === 'remote'" />
  </ContentContainer>
</template>
