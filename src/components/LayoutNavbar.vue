<script setup>
import { ref } from 'vue';

let showMobileNav = ref(false);
const toggleNavbar = () => (showMobileNav.value = !showMobileNav.value);
</script>

<template>
  <nav
    class="max-w-[1200px] overflow-hidden z-5 bg-white shadow-md relative flex flex-wrap lg:flex-nowrap items-center justify-between mx-8 my-12 lg:mx-auto p-4 sm:py-4 sm:px-12"
  >
    <div class="flex justify-between w-full lg:w-auto">
      <a
        class="relative block bg-no-repeat bg-contain bg-logo-colour m-0 w-44 h-10 sm:w-64 sm:h-14 sm:mb-auto"
        href="https://iatistandard.org"
        title="To the main IATI Standard website"
      ></a>
      <button
        class="flex lg:hidden items-center"
        type="button"
        data-toggle="collapse"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="toggleNavbar"
      >
        <span class="inline-block bg-menu-icon w-6 h-6"></span>
      </button>
    </div>
    <div
      class="lg:block transition duration-2000 ease basis-full grow items-center"
      :class="[showMobileNav ? 'block' : 'hidden']"
    >
      <div class="transition-height duration-500 ease-in-out mt-6 flex lg:justify-end flex-col lg:flex-row">
        <a
          href="/"
          class="ml-0 text-center mb-5 lg:mb-0 block relative uppercase tracking-widest text-base p-0 text-gray-7 after:absolute after:w-full after:h-1 after:-bottom-5 after:left-0 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out after:bg-primary after:hover:scale-x-100 after:hover:origin-bottom-left"
        >
          Home
        </a>
        <a
          href="#"
          class="text-center mb-5 lg:mb-0 block relative uppercase tracking-widest text-base p-0 ml-5 text-gray-7 after:absolute after:w-full after:h-1 after:-bottom-5 after:left-0 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out after:bg-primary after:hover:scale-x-100 after:hover:origin-bottom-left"
        >
          About Validator
        </a>
        <a
          href="#"
          class="text-center mb-5 lg:mb-0 block relative uppercase tracking-widest text-base p-0 ml-5 text-gray-7 after:absolute after:w-full after:h-1 after:-bottom-5 after:left-0 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out after:bg-primary after:hover:scale-x-100 after:hover:origin-bottom-left"
        >
          Check data
        </a>
        <a
          href="#"
          class="text-center mb-5 lg:mb-0 block relative uppercase tracking-widest text-base p-0 ml-5 text-gray-7 after:absolute after:w-full after:h-1 after:-bottom-5 after:left-0 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out after:bg-primary after:hover:scale-x-100 after:hover:origin-bottom-left"
        >
          Public data viewer
        </a>
        <a
          href="https://developer.iatistandard.org/api-details#api=iati-validator-v2"
          target="_blank"
          class="text-center mb-5 lg:mb-0 block relative uppercase tracking-widest text-base p-0 ml-5 text-gray-7 after:absolute after:w-full after:h-1 after:-bottom-5 after:left-0 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out after:bg-primary after:hover:scale-x-100 after:hover:origin-bottom-left"
        >
          Public API
        </a>
      </div>
    </div>
  </nav>
</template>

<style>
.navbar-menu--item--active {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.navbar-menu--item--active::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>
