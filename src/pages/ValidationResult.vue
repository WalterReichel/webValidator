<script setup>
  import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { timer } from 'rxjs';
  import ContentContainer from '../components/layout/ContentContainer.vue';
  import { setPageTitle } from '../state';
  import FileStatusInfo from '../components/FileStatusInfo.vue';
  import { fetchTempWorkspace, fileStatus } from '../utils';
  import CaptionedLoadingSpinner from '../components/CaptionedLoadingSpinner.vue';

  setPageTitle('Validation results');
  const route = useRoute();
  const workspaceID = route.params.tempWorkspaceID;
  const workspaceData = ref([]);
  const subscribeTimer = ref();

  onMounted(() => {
    subscribeTimer.value = timer(100, 2500).subscribe(() => loadData());
  });

  onBeforeUnmount(() => {
    subscribeTimer?.value.unsubscribe();
  });

  watch(workspaceData, () => {
    // check that workspace valition returned data
    if (!workspaceData.value.length) {
      return;
    }
    // check that all returned data has a report
    for (const idd of workspaceData.value) {
      if (idd.report === null) {
        return;
      }
    }

    console.log('unsubscribe');
    subscribeTimer?.value.unsubscribe();
  });

  const loadData = () => {
    fetchTempWorkspace(workspaceID)
      .then((data) => {
        console.log('testing', workspaceID);
        // TODO: handle email
        // if (!this.email.value && data.email) {
        //   this.email.setValue(data.email);
        //   this.emailMode = 'saved';
        // }
        for (const element of data) {
          element.class = fileStatus(element);
        }

        workspaceData.value = data;
      })
      .catch((error) => window.console.error('Faild to load iati data', error));
  };
</script>

<template>
  <ContentContainer class="pb-8">
    <p class="mb-4">Your personal workspace is</p>
    <FileStatusInfo />
    <CaptionedLoadingSpinner v-if="!workspaceData.length">Loading</CaptionedLoadingSpinner>
  </ContentContainer>
</template>
