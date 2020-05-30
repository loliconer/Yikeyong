<template>
  <aside class="admin-sidebar">
    <div class="s-folder">III</div>
    <div class="s-nav">
      <div class="n-title">
        <span>-</span>
        <span>系统</span>
      </div>
      <ul class="n-items">
        <li class="n-item">
          <router-link class="n-link" to="/index.html">控制面板</router-link>
        </li>
        <li class="n-item">
          <router-link class="n-link" to="/user/menus.html">菜单管理</router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>
<script>
import './Sidebar.less'

export default {
  name: 'admin-sidebar'
}
</script>
