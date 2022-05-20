<script setup>
  import { computed } from 'vue';
  import { getDocumentFileName } from '../../utils';

  const props = defineProps({ document: { type: Object, default: () => {} } });

  const fileName = computed(() => getDocumentFileName(props.document) || 'No filename available');
</script>

<template>
  <tr class="odd:bg-white even:bg-slate-100">
    <td class="py-2 first:pl-3.5">{{ fileName }}</td>
    <td class="py-2">2022-01-24 12:19 (GMT+3)</td>
    <td class="py-2">2022-01-24 12:27 (GMT+3)</td>
    <td class="py-2">Warning</td>
    <td>Yes - 2022-05-13 12:49 (GMT+3)</td>
  </tr>
</template>
