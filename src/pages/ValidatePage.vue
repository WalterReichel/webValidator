<script setup>
  import { computed, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import CheckBox from '../components/CheckBox.vue';
  import IconChevron from '../components/IconChevron.vue';
  import ContentContainer from '../components/layout/ContentContainer.vue';
  import LocalFilesValidator from '../components/LocalFilesValidator.vue';
  import RemoteFIlesValidator from '../components/RemoteFIlesValidator.vue';
  import StyledLink from '../components/StyledLink.vue';
  import { setPageTitle } from '../state';

  setPageTitle('Check data');

  const route = useRoute();
  const workspaceID = computed(() => route.query.tempWorkspaceID);

  const fileSource = ref('upload');
</script>

<template>
  <ContentContainer class="pb-8">
    <div v-if="workspaceID" class="mb-6 inline-flex">
      <StyledLink :to="`/validate/${workspaceID}`" class="mr-2 inline-flex">
        <IconChevron class="mr-2" /> Return to your workspace
      </StyledLink>
    </div>
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
