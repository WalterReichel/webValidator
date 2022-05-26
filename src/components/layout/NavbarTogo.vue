<template>
  <button
    class="flex items-center lg:hidden"
    type="button"
    data-toggle="collapse"
    aria-controls="navbarNavAltMarkup"
    aria-expanded="false"
    aria-label="Toggle navigation"
    @click="$emit('toggleNavbar')"
  >
    <span class="inline-block h-6 w-6 bg-menu-icon"></span>
  </button>
</template>
