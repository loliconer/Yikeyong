<template>
  <div class="view-main">
    <nav-bar></nav-bar>

    <div class="container">
      <div class="c-left">
        <admin-sidebar></admin-sidebar>
      </div>
      <div class="c-right content-wrapper">
        <n-progress parent=".content-wrapper"></n-progress>
        <transition name="router" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  import './Main.less'
  import NavBar from './components/NavBar.vue'
  import Sidebar from './components/Sidebar.vue'
  import NProgress from './components/NProgress.vue'

  export default {
    components: {
      [NavBar.name]: NavBar,
      [Sidebar.name]: Sidebar,
      NProgress
    }
  }
</script>
