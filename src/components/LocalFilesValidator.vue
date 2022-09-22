<script setup>
  import CardiB from '../components/CardiB.vue';
  import LinkButton from '../components/LinkButton.vue';
</script>
<template>
  <div class="-m-2.5 flex flex-wrap pt-4">
    <CardiB heading="Step 1" class="w-[300px] text-left">
      <p class="text-center">Select your IATI files. You can select multiple files at the same time.</p>
      <LinkButton to="/validate" class="text-tiny"> Browse </LinkButton>
    </CardiB>
    <CardiB heading="Step 2" class="w-[300px] text-left">
      <p class="text-center">Upload your IATI files and start validation.</p>
      <LinkButton to="/validate" class="text-tiny"> Upload </LinkButton>
    </CardiB>
    <CardiB heading="Step 3" class="w-[300px] text-left">
      <p class="mb-4 text-center">
        Your files are being validated - click below to view their progress and, when complete, reports.
      </p>
      <LinkButton to="/validate" class="text-tiny"> View Progress and Reports </LinkButton>
    </CardiB>
  </div>
</template>
