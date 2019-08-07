<template>
  <nav class="nav-bar">
    <a class="n-logo" href="/"><img src="/img/logo.png"></a>
    <div class="n-right">
      <div class="menu"></div>
      <div class="v-dropdown-wrap n-avatar">
        <div class="d-trigger"><img class="avatar" :src="user.avatar"></div>
        <div class="v-dropdown align-right">
          <div class="d-item">{{user.username}}</div>
          <div class="d-item"><a href="/accounts/changepasswd/">修改密码</a></div>
          <div class="d-item"><a @click="logout">注销登录</a></div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
  import './NavBar.less'
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'nav-bar',
    data() {
      return {}
    },
    computed: mapState(['user']) ,
    methods: {
      ...mapMutations({
        clearUserInfo: 'LOGOUT'
      }),
      async logout() {
        await $fetch.delete('session')

        this.clearUserInfo()
        this.$router.replace('/login.html')
      }
    }
  }
</script>
