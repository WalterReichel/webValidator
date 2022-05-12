<script setup>
  import StyledLink from './StyledLink.vue';

  const props = defineProps({ organisation: { type: Object, default: () => {} } });
</script>

<template>
  <div>
    <StyledLink :to="`/organisation/${props.organisation.name}`">{{ props.organisation.title }}</StyledLink>
  </div>
</template>
