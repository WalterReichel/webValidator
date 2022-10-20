<template>
  <div ref="tooltipRef">
    <div
      :class="{ hidden: !tooltipShow }"
      class="z-500 break-words rounded-lg border-0 bg-black text-center text-sm font-normal leading-normal no-underline"
    >
      <div class="p-1 text-white">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
  import { createPopper } from '@popperjs/core';

  export default {
    name: 'VueTooltip',
    props: {
      showTooltip: { type: Boolean, default: false },
      copyIconRef: { type: Object, default: null },
    },
    data() {
      return {
        tooltipTarget: this.copyIconRef,
        tooltipShow: this.showTooltip,
      };
    },
    watch: {
      $props: {
        handler: function (val) {
          if (val.showTooltip) {
            this.tooltipShow = true;
            if (this.copyIconRef) {
              createPopper(this.copyIconRef, this.$refs.tooltipRef, {
                placement: 'top',
              });
            }
          } else {
            this.tooltipShow = false;
          }
        },
        deep: true,
      },
    },
  };
</script>
