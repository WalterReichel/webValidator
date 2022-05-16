<template>
  <router-link v-if="!external" :to="to" class="text-iati-grey"><slot /></router-link>
  <a v-else :href="to" target="_blank" class="text-iati-grey"><slot /></a>
</template>

<script>
  export default {
    props: {
      to: { type: String, default: '#' },
      external: { type: Boolean, default: false },
    },
  };
</script>
