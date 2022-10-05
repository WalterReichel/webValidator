<script setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import ContentContainer from '../components/layout/ContentContainer.vue';
  import { setPageTitle } from '../state';
  import FileStatusInfo from '../components/FileStatusInfo.vue';

  setPageTitle('Validation results');
  const route = useRoute();

  const tempWorkspaceID = ref(route.params.tempWorkspaceID);

  console.log(tempWorkspaceID);
</script>

<template>
  <ContentContainer class="pb-8">
    <p class="mb-4">Your personal workspace is</p>
    <FileStatusInfo />
  </ContentContainer>
</template>
