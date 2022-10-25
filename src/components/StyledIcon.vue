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
        activeClass: 'inline-block h-3 w-3',
      };
    },
  };
</script>
