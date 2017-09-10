<template>
  <div id="app">
    <vue-beauty-alert ref="alert"></vue-beauty-alert>

    <header class="header">
      <nav class="nav">
        <router-link class="nav-link" v-for="nav of navs" :to="nav.url">{{nav.name}}</router-link>
      </nav>
    </header>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        navs: [
          { name: '首页', url: '/index.html' },
          { name: 'CPU', url: '/cpu.html' },
          { name: '主板', url: '/mother-board.html' },
          { name: '显卡', url: '/graphics-card.html' },
          { name: '内存', url: '/memory.html' },
          { name: '硬盘', url: '/hard-disk.html' },
          { name: '电源', url: '/power.html' },
          { name: '机箱', url: '/computer-case.html' },
          { name: '显示器', url: '/monitor.html' }
        ]
      }
    }
  }
</script>
