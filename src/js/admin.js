import router, {hook as routerHook} from './admin/router'
import store from './admin/store'
import {sync} from 'vuex-router-sync'
import App from './admin/App.vue'

sync(store, router)
const userPromise = store.dispatch('initUserInfo')
routerHook(userPromise)

userPromise.then(() => {
  new Vue({
    router,
    store,
    components: { App }
  }).$mount('app')
})
