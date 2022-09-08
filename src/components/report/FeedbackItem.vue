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
  const codelistLink = computed(() =>
    'codelist' in props.item ? `${GUIDANCE_LINK_URL}/${version.value}/codelists/${props.item.codelist}` : ''
  );
</script>

<template>
  <AppAlert class="mt-2" :variant="props.item.severity">
    <div>
      <span class="float-right">
        {{ props.item.id }}
        <a v-if="isGuidanceAvailable" :href="guidanceLink" target="_blank" title="Open guidance in a new window">
          (see guidance)
        </a>
        <a v-if="codelistLink" href="codelistLink" target="_blank" title="Open guidance in a new window">
          (see guidance)
        </a>
      </span>
      {{ props.item.message }}
    </div>
  </AppAlert>
</template>
