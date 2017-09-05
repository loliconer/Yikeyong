import store from '../store'

import Main from '../view/Main.vue'

const routes = [
  {
    path: '/diy.html',
    component: Main
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/spa',
  linkActiveClass: 'focus',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    if (to.hash) return { selector: to.hash }

    return { y: 0 }
  },
  routes
})

export default router
