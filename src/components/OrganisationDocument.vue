<script setup>
  const props = defineProps({ document: { type: Object, default: () => {} } });

  console.log(props);
</script>

<template>
  <tr>
    <td class="py-2 first:pl-3.5">abtbritain-activities.xml</td>
    <td class="py-2">2022-01-24 12:19 (GMT+3)</td>
    <td class="py-2">2022-01-24 12:27 (GMT+3)</td>
    <td class="py-2">Warning</td>
    <td>Yes - 2022-05-13 12:49 (GMT+3)</td>
  </tr>
</template>
