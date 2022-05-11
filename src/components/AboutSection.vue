<template>
  <section class="my-11 px-7">
    <h3 class="my-4 text-lg font-bold" :v-if="title">{{ title }}</h3>
    <slot />
  </section>
</template>

<script>
  export default {
    props: { title: { type: String, default: '' } },
  };
</script>
