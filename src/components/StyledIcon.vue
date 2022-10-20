<template>
  <span>
    <span :class="[icon, activeClass]"></span>
  </span>
</template>

<script>
  export default {
    props: {
      icon: { type: String, default: '' },
    },
    data() {
      return {
        activeClass: 'inline-block h-4 w-4',
      };
    },
  };
</script>
