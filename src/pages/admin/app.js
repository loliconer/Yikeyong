import {$fetch} from 'lovue/dist/utils.esm'
import router, {hook as routerHook} from './router'
import store from './store'
import App from './App.vue'

window.$fetch = $fetch

const userPromise = store.dispatch('init')
routerHook(userPromise)

userPromise.then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('app')
})
