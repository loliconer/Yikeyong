<template>
  <div class="view-main">
    <vue-tab :titles="navs"></vue-tab>

    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        navs: ['CPU', '主板', '显卡', '内存', '硬盘', '电源', '机箱', '显示器']
      }
    },
    components: {}
  }
</script>
