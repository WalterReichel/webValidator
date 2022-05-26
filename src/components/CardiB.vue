<script setup>
  import BasicCard from './BasicCard.vue';
  import CardHeader from './CardHeader.vue';

  const props = defineProps({ heading: { type: String, default: '' } });
</script>

<template>
  <BasicCard class="shrink grow basis-auto rounded-none border-0 border-t-4 border-t-iati-green p-5 shadow-md">
    <template v-if="props.heading" #header>
      <CardHeader class="border-b border-dashed border-b-iati-green bg-white pt-0 text-center">
        <h3 class="text-xl">{{ props.heading }}</h3>
      </CardHeader>
    </template>
    <div class="-mx-3.5">
      <slot />
    </div>
  </BasicCard>
</template>
