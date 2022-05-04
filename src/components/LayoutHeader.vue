<script setup>
  import LayoutNavbar from './LayoutNavbar.vue';
</script>

<template>
  <div class="header pb-8 mb-4">
    <LayoutNavbar />
    <div class="main-title w-3/4 mx-auto">
      <h2 class="text-left pl-4 font-medium">IATI Validator</h2>
    </div>
  </div>
</template>

<style>
  .header {
    background: linear-gradient(0deg, #124555 4%, #155366 20%);
    position: relative;
    margin-top: -12.5em;
    padding-top: 15rem;
  }
  .header::after {
    content: '';
    background-image: url('../assets/images/marque-white.png');
    background-size: 70%;
    background-repeat: no-repeat;
    background-position: top right;
    opacity: 0.25;
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    width: 100%;
    height: 100%;
  }
  .header h2 {
    font-size: 50px;
    border-left: 5px solid #81c3d6;
    color: #ffffff;
  }
  @media (max-width: 600px) {
    .header .main-title {
      width: 100%;
      padding-left: 15px;
    }
    .main-title h2 {
      font-size: 45px;
    }
  }
</style>
