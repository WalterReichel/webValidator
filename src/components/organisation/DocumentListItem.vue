<script setup>
  import format from 'date-fns/format';
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import {
    getDocumentDatastoreAvailability,
    getDocumentDownloadStatus,
    getDocumentFileName,
    getDocumentValidationStatus,
    hasProperLink,
  } from '../../utils/document';

  const props = defineProps({ document: { type: Object, default: () => {} } });
  const router = useRouter();
  const dateFormat = 'yyyy-MM-dd HH:mm (z)';
  const formatDate = (date) => (date ? format(new Date(date), dateFormat) : '');

  const fileName = computed(() => getDocumentFileName(props.document) || 'No filename available');
  const validationDate = computed(() => formatDate(props.document.validation_created));
  const validationStatus = computed(() => getDocumentValidationStatus(props.document));
  const validationStatusClass = computed(() => {
    const status = validationStatus.value.value;
    return status !== 'normal' ? `text-${status} font-bold` : 'font-bold';
  });
  const datastoreAvailability = computed(() =>
    getDocumentDatastoreAvailability(props.document, validationStatus.value.value)
  );

  const onClick = () => {
    if (props.document.validation && props.document.hash) {
      router.push(`view/dqf/files/${props.document.id}`); // TODO: change to more friendly URL
    }
  };
</script>

<template>
  <div class="grid cursor-pointer grid-cols-5 gap-0 odd:bg-white even:bg-slate-100 hover:bg-gray-200" @click="onClick">
    <div class="py-2 first:pl-3.5">
      <a v-if="hasProperLink(props.document)" :url="props.document.url" class="hover:underline">{{ fileName }}</a>
      <span v-else>{{ fileName }}</span>
    </div>
    <div class="py-2">
      <span>{{ formatDate(props.document.modified || props.document.first_seen) }}</span>
    </div>
    <div class="py-2">
      <span v-if="validationDate">{{ validationDate }}</span>
      <span v-else>{{ getDocumentDownloadStatus(props.document) }}</span>
    </div>
    <div class="py-2">
      <span :class="validationStatusClass">{{ validationStatus.caption }}</span>
    </div>
    <div class="py-2">
      {{ datastoreAvailability }}
    </div>
  </div>
</template>
