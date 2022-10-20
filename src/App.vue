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

<script>
  import { inject } from 'vue';
  import Plausible from 'plausible-tracker';
  export default {
    setup() {
      const plausible = inject('plausible');
      return {
        plausible,
      };
    },
    mounted() {
      const { trackEvent } = Plausible();
      const requestStart = performance.getEntriesByType('navigation')[0].requestStart;
      trackEvent('TTFB', {
        props: {
          event_category: 'PageSpeed',
          event_label: requestStart,
        },
      });
    },
  };
</script>
