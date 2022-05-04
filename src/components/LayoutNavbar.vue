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
    navbar:
      'max-w-[1200px] overflow-hidden z-5 bg-white shadow-md relative flex flex-wrap lg:flex-nowrap items-center justify-between mx-8 my-12 lg:mx-auto p-4 sm:py-4 sm:px-12',
    navbarIcon: 'relative block bg-no-repeat bg-contain bg-logo-colour m-0 w-44 h-10 sm:w-64 sm:h-14 sm:mb-auto',
    navbarMenuWrapper: 'lg:block lg:h-auto transition-height duration-500 ease-in-out basis-full grow items-center',
    navbarMenu: 'mt-6 flex lg:justify-end flex-col lg:flex-row cursor-pointer',
    menuItem: 'text-center mb-5 lg:mb-0 block relative uppercase tracking-widest text-base p-0 text-gray-7',
    menuItemAfter:
      'after:absolute after:w-full after:h-1 after:-bottom-5 after:left-0 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out after:bg-primary after:hover:scale-x-100 after:hover:origin-bottom-left',
    menuItemActive: 'scale-x-100 origin-bottom-left after:scale-x-100 after:origin-bottom-left',
  };
  classes.menuItemAll = `${classes.menuItem} ${classes.menuItemAfter}`;
</script>

<template>
  <nav :class="[classes.navbar]">
    <div class="flex justify-between w-full lg:w-auto">
      <a :class="[classes.navbarIcon]" href="https://iatistandard.org" title="To the main IATI Standard website"></a>
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
    <div :class="[classes.navbarMenuWrapper, showMobileNav ? 'h-60' : 'h-0']">
      <div :class="[classes.navbarMenu]">
        <router-link to="/" :class="['ml-0', classes.menuItemAll, path === '/' ? classes.menuItemActive : '']">
          Home
        </router-link>
        <router-link
          to="/about"
          :class="['ml-5', classes.menuItemAll, path === '/about' ? classes.menuItemActive : '']"
        >
          About Validator
        </router-link>
        <router-link
          to="/validate"
          :class="['ml-5', classes.menuItemAll, path === '/validate' ? classes.menuItemActive : '']"
        >
          Check data
        </router-link>
        <router-link
          to="/organisations"
          :class="['ml-5', classes.menuItemAll, path === '/organisations' ? classes.menuItemActive : '']"
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
