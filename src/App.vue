<script setup>
  import LayoutFooter from './components/LayoutFooter.vue';
  import LayoutHeader from './components/LayoutHeader.vue';
</script>

<template>
  <LayoutHeader />
  <router-view></router-view>
  <LayoutFooter />
</template>
