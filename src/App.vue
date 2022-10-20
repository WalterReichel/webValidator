<script setup>
  import Plausible from 'plausible-tracker';
  import { onMounted, provide } from 'vue';
  import LayoutFooter from './components/layout/LayoutFooter.vue';
  import LayoutHeader from './components/layout/LayoutHeader.vue';
  import { layout } from './state';

  provide('layout', layout);

  onMounted(() => {
    const { trackEvent } = Plausible();
    const requestStart = performance.getEntriesByType('navigation')[0].requestStart;
    trackEvent('TTFB', {
      props: {
        event_category: 'PageSpeed',
        event_label: requestStart,
      },
    });
  });
</script>

<template>
  <LayoutHeader />
  <div class="flex-1">
    <router-view></router-view>
  </div>
  <LayoutFooter />
</template>
