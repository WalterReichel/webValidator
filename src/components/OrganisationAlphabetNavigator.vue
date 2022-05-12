<script setup>
  const alphabet = Array.from(Array(26)).map((e, i) => String.fromCharCode(i + 65));

  const navigate = (event) => {
    const id = event.target.innerHTML;
    const target = window.document.getElementById(id.toLowerCase());
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
</script>

<template>
  <div class="sticky top-0 hidden flex-row justify-between bg-white py-4 sm:flex">
    <span class="cursor-pointer" @click="navigate">123</span>
    <span v-for="letter in alphabet" :key="letter" class="cursor-pointer" @click="navigate">{{ letter }}</span>
  </div>
</template>
