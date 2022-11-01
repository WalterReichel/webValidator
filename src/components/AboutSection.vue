<template>
  <section class="my-11 px-7">
    <h2 class="my-4 text-lg font-bold" :v-if="title">{{ title }}</h2>
    <div class="text-base">
      <slot />
    </div>
  </section>
</template>

<script>
  export default {
    props: { title: { type: String, default: '' } },
  };
</script>
