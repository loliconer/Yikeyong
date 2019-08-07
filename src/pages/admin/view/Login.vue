<template>
  <div class="view-login">
    <header class="l-title">后台管理系统</header>
    <form class="l-form" @submit.prevent="login">
      <v-row>
        <v-input name="username" autocomplete="off" placeholder="用户名" required effect></v-input>
      </v-row>
      <v-row>
        <v-input type="password" name="password" placeholder="密码" required effect></v-input>
      </v-row>
      <v-row class="row-submit">
        <v-button submit>登录</v-button>
      </v-row>
    </form>
  </div>
</template>
<script>
  import './Login.less'
  import { mapMutations, mapGetters } from 'vuex'

  export default {
    name: 'Login',
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['isAdmin'])
    },
    methods: {
      ...mapMutations({ setUserInfo: 'SET_USER_INFO' }),
      async login(ev) {
        Indicator.open()
        const body = await $fetch.form('session', new FormData(ev.target)).catch(this.error)
        Indicator.close()
        if (body === undefined) return

        this.setUserInfo(body)
        this.$router.push('/index.html')
      }
    },
    mounted() {
      /*_fetch({
        type: 'get',
        url: 'csrf'
      }, body => {
        sessionStorage.csrf = body
      })*/
    }
  }
</script>
