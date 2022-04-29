<template>
  <nav class="navbar navbar-light relative flex flex-nowrap items-center justify-between mx-auto my-12 py-4 px-12">
    <div class="navbar--header">
      <a class="navbar-brand" href="https://iatistandard.org" title="To the main IATI Standard website"></a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
    <div class="navbar-collapse collapse">
      <div class="navbar-menu flex justify-end">
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
.navbar {
  overflow: hidden;
  z-index: 5;
  max-width: 1200px;
  background-color: #fff;
  -webkit-box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.15);
  box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.15);
}

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

.navbar-brand {
  position: relative;
  background-image: url(../assets/svg/logo-colour.svg);
  background-repeat: no-repeat;
  background-size: contain;
  height: 60px;
  width: 260px;
  display: block;
  margin-bottom: auto;
}

.navbar-toggler {
  display: none;
  align-items: center;
}

.navbar-collapse.collapse {
  display: block;
  transition: 2s ease;
}

.navbar-collapse.collapse.show {
  display: block;
}

.navbar-toggler .navbar-toggler-icon {
  background-image: url('../assets/icons/menu.svg');
}

.navbar-toggler-icon {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  content: '';
  background: 50%/100% 100% no-repeat;
}

@media (max-width: 600px) {
  .navbar {
    padding: 1em;
  }
  .navbar-brand {
    width: 171px;
    height: 40px;
    margin: 0;
  }
}

@media (max-width: 1150px) {
  .navbar {
    flex-wrap: wrap;
    margin-right: 2em;
    margin-left: 2em;
  }
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
  .navbar-toggler {
    display: inherit;
    border: none;
  }
  .navbar-collapse.collapse {
    display: none;
  }
}
</style>
