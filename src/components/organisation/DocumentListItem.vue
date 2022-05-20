<script setup>
  import format from 'date-fns/format';
  import { computed } from 'vue';
  import { getDocumentFileName, hasProperLink } from '../../utils/document';

  const props = defineProps({ document: { type: Object, default: () => {} } });
  const dateFormat = 'yyyy-MM-dd HH:mm (z)';
  const formatDate = (date) => (date ? format(new Date(date), dateFormat) : '');

  const fileName = computed(() => getDocumentFileName(props.document) || 'No filename available');
  const registryDate = computed(() => formatDate(props.document.modified || props.document.first_seen));
  const validationDate = computed(() => formatDate(props.document.validation_created));
</script>

<template>
  <tr class="odd:bg-white even:bg-slate-100">
    <td class="py-2 first:pl-3.5">
      <a v-if="hasProperLink(props.document)" :url="props.document.url" class="hover:underline">{{ fileName }}</a>
      <span v-else>{{ fileName }}</span>
    </td>
    <td class="py-2">
      <span>{{ registryDate }}</span>
    </td>
    <td class="py-2">
      <span v-if="validationDate">{{ validationDate }}</span>
    </td>
    <td class="py-2">Warning</td>
    <td>Yes - 2022-05-13 12:49 (GMT+3)</td>
  </tr>
</template>
