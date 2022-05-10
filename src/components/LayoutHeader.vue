<script setup>
  import LayoutNavbar from './LayoutNavbar.vue';
</script>

<template>
  <div
    class="relative mb-4 -mt-48 bg-gradient-iati pb-8 pt-36 after:absolute after:top-0 after:right-0 after:block after:h-full after:w-full after:bg-header-image after:bg-90% after:bg-right-top after:bg-no-repeat after:opacity-25 lg:after:bg-50%"
  >
    <LayoutNavbar />
    <div class="mx-auto max-w-[1200px] pl-3.5 lg:pl-0">
      <h2 class="border-l-4 border-solid border-primary pl-4 text-left text-4xl font-medium text-white lg:text-5xl">
        IATI Validator
      </h2>
    </div>
  </div>
</template>
