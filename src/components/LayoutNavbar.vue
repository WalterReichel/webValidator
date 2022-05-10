<script setup>
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const path = ref(route.path);
  watch(
    () => route.path,
    async (_path) => (path.value = _path)
  );

  let showMobileNav = ref(false);
  const toggleNavbar = () => (showMobileNav.value = !showMobileNav.value);

  const classes = {
    menuItem: 'relative mb-5 block p-0 text-center text-base uppercase tracking-widest text-gray-7 lg:mb-0',
    menuItemAfter:
      'after:absolute after:-bottom-5 after:left-0 after:h-1 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-out after:hover:origin-bottom-left after:hover:scale-x-100',
    menuItemActive: 'origin-bottom-left scale-x-100 after:origin-bottom-left after:scale-x-100',
  };
  classes.menuItemAll = `${classes.menuItem} ${classes.menuItemAfter}`;
</script>

<template>
  <nav
    class="relative z-5 mx-0 my-12 flex max-w-[1200px] flex-wrap items-center justify-between overflow-hidden bg-white p-4 shadow-md sm:py-4 sm:px-12 lg:mx-auto lg:flex-nowrap"
  >
    <div class="flex w-full justify-between lg:w-auto">
      <a
        class="relative m-0 block h-10 w-44 bg-logo-colour bg-contain bg-no-repeat sm:mb-auto sm:h-14 sm:w-64"
        href="https://iatistandard.org"
        title="To the main IATI Standard website"
      ></a>
      <button
        class="flex items-center lg:hidden"
        type="button"
        data-toggle="collapse"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="toggleNavbar"
      >
        <span class="inline-block h-6 w-6 bg-menu-icon"></span>
      </button>
    </div>
    <div
      class="grow basis-full items-center transition-height duration-500 ease-in-out lg:block lg:h-auto"
      :class="[showMobileNav ? 'h-60' : 'h-0']"
    >
      <div class="mt-6 flex cursor-pointer flex-col lg:flex-row lg:justify-end">
        <router-link to="/" :class="['ml-0', classes.menuItemAll, path === '/' && classes.menuItemActive]">
          Home
        </router-link>
        <router-link to="/about" :class="['ml-5', classes.menuItemAll, path === '/about' && classes.menuItemActive]">
          About Validator
        </router-link>
        <router-link
          to="/validate"
          :class="['ml-5', classes.menuItemAll, path === '/validate' && classes.menuItemActive]"
        >
          Check data
        </router-link>
        <router-link
          to="/organisations"
          :class="['ml-5', classes.menuItemAll, path === '/organisations' && classes.menuItemActive]"
        >
          Public data viewer
        </router-link>
        <a
          href="https://developer.iatistandard.org/api-details#api=iati-validator-v2"
          target="_blank"
          :class="['ml-5', classes.menuItemAll]"
        >
          Public API
        </a>
      </div>
    </div>
  </nav>
</template>
