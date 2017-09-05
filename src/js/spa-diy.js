import router from './diy/router'
import store from './diy/store'
import {sync} from 'vuex-router-sync'
import App from './diy/app.vue'

sync(store, router)

new Vue({
  router,
  store,
  ...App
}).$mount('app')
