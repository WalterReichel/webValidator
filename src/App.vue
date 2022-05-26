<script setup>
  import { provide } from 'vue';
  import LayoutFooter from './components/layout/LayoutFooter.vue';
  import LayoutHeader from './components/layout/LayoutHeader.vue';
  import { layout } from './state';

  provide('layout', layout);
</script>

<template>
  <LayoutHeader />
  <div class="flex-1">
    <router-view></router-view>
  </div>
  <LayoutFooter />
</template>
