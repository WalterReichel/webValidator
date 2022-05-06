<script setup>
  import { computed } from 'vue';

  const year = computed(() => new Date().getFullYear());
</script>

<template>
  <footer class="block bg-secondary">
    <div class="flex w-full flex-col justify-between px-4 py-10 lg:mx-auto lg:max-w-[1140px] lg:flex-row lg:px-2">
      <div class="flex flex-col items-center p-2 lg:items-start">
        <a href="https://iatistandard.org" class="h-20 w-80 bg-logo-white bg-contain bg-no-repeat"></a>
      </div>
      <div class="flex flex-col p-2">
        <h2 class="text-lg font-bold uppercase text-white">Useful links</h2>
        <ul class="mt-0 mb-2 list-none pl-0 text-center text-white lg:text-left">
          <li class="underline">
            <a href="https://iatistandard.org/en/contact/">Contact</a>
          </li>
          <li class="underline">
            <a href="https://iatistandard.org/en/privacy-policy/">Privacy policy</a>
          </li>
        </ul>
      </div>
      <div class="flex flex-col p-2 lg:flex-row">
        <div class="text-center text-white">
          <p class="m-0 text-sm">Part of the <b>IATI Unified Platform</b></p>
          <p class="m-0 text-sm">
            Code licensed under the
            <a class="underline" href="https://www.gnu.org/licenses/agpl-3.0.en.html">GNU AGPL</a>.
          </p>
          <p class="m-0 text-sm">
            Documentation licensed under
            <a class="underline" href="https://creativecommons.org/licenses/by/4.0/">CC BY 3.0</a>.
          </p>
          <br />
        </div>
      </div>
    </div>
    <div class="border-t border-tertiary px-6 py-4">
      <div class="flex w-full flex-col justify-between lg:mx-auto lg:max-w-[1140px] lg:flex-row">
        <p class="lg-pb-0 float-left inline-block pb-4 text-white">Copyright IATI {{ year }}. All rights reserved</p>
        <div class="float-right">
          <a href="https://twitter.com/IATI_aid" class="inline-block h-9 w-9 bg-twitter"></a>
          <a
            href="https://www.youtube.com/channel/UCAVH1gcgJXElsj8ENC-bDQQ"
            class="ml-2.5 inline-block h-9 w-9 bg-youtube"
          ></a>
          <a
            href="https://www.linkedin.com/company/international-aid-transparency-initiative/"
            class="ml-2.5 inline-block h-9 w-9 bg-linkedin"
          ></a>
        </div>
      </div>
    </div>
  </footer>
</template>
