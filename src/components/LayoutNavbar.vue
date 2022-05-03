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
    <div class="navbar-collapse collapse" :class="{ show: showMobileNav }">
      <div class="navbar-menu mt-6 flex justify-end">
        <a href="/" class="navbar-menu--item"> Home </a>
        <a href="#" class="navbar-menu--item"> About Validator </a>
        <a href="#" class="navbar-menu--item"> Check data </a>
        <a href="#" class="navbar-menu--item"> Public data viewer </a>
        <a
          href="https://developer.iatistandard.org/api-details#api=iati-validator-v2"
          target="_blank"
          class="navbar-menu--item"
        >
          Public API
        </a>
      </div>
    </div>
  </nav>
</template>

<style>
.navbar .navbar-menu {
  margin-top: 1.9rem;
  transition: 2s ease;
}

.navbar-menu--item {
  display: block;
  position: relative;
  color: #121212;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 1rem;
  margin-left: 20px;
  padding: 0;
}

.navbar-menu--item:first-child {
  margin-left: 0;
}

.navbar-menu--item::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 3px;
  bottom: -20px;
  left: 0;
  background-color: #81c3d6;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.navbar-menu--item--active {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.navbar-menu--item--active::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.navbar-menu--item:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.navbar-collapse.collapse {
  display: block;
  transition: 2s ease;
}

.navbar-collapse.collapse.show {
  display: block;
}

@media (max-width: 1150px) {
  .navbar .navbar--header {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .navbar .navbar-menu {
    flex-direction: column;
  }
  .navbar-menu--item {
    margin-left: 0;
    text-align: center;
    margin-bottom: 20px;
  }
  .navbar-collapse.collapse {
    display: none;
  }
}
</style>
