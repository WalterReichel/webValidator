<script setup>
  import { computed, inject } from 'vue';
  import AppAlert from '../AppAlert.vue';
  import { GUIDANCE_LINK_URL } from '../../utils';

  const props = defineProps({ item: { type: Object, default: null }, version: { type: String, default: '' } });
  const guidanceLinks = inject('guidanceLinks');

  const version = computed(() => props.version.replace('.', ''));
  const isGuidanceAvailable = computed(
    () => guidanceLinks.value && guidanceLinks.value.version && props.item.id in guidanceLinks.value.content
  );
  const guidanceLink = computed(() => {
    if (isGuidanceAvailable.value) {
      const { id } = props.item;
      const { content } = guidanceLinks.value;
      if ('url' in content[id]) {
        return content[id].url;
      }
      if ('path' in content[id]) {
        return `${GUIDANCE_LINK_URL}/${version.value}/${content[id].path}`;
      }
    }

    return '';
  });
</script>

<template>
  <AppAlert class="mt-2" :variant="props.item.severity">
    <a v-if="isGuidanceAvailable" :href="guidanceLink" target="_blank" title="Open guidance in a new window">
      (see guidance)
    </a>
    {{ props.item.message }}
  </AppAlert>
</template>
