<script setup>
  import LayoutFooter from './components/LayoutFooter.vue';
  import LayoutHeader from './components/LayoutHeader.vue';
</script>

<template>
  <LayoutHeader />
  <div class="flex-1">
    <router-view></router-view>
  </div>
  <LayoutFooter />
</template>
