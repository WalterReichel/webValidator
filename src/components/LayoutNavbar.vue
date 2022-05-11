<script setup>
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import Logo from './AppLogo.vue';
  import NavbarTogo from './NavbarTogo.vue';

  const route = useRoute();
  const path = ref(route.path);
  const showMobileNav = ref(false);
  watch(
    () => route.path,
    async (_path) => (path.value = _path)
  );

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
      <Logo />
      <NavbarTogo @toggle-navbar="showMobileNav = !showMobileNav" />
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
