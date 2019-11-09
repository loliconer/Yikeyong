import 'src/js/lib/common'
import App from './App.vue'

new Vue({
  render: h => h(App)
}).$mount('app')

Vue.config.errorHandler = function (error) {
  alert(error)
}
window.onerror = function (msg) {
  alert(msg)
}
