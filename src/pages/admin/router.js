import VueRouter from 'vue-router'
import store from './store'
import Login from './view/Login.vue'
import Main from './view/Main.vue'
import Menus from './view/Menus.vue'

const routes = [
  { path: '/', redirect: '/index.html' },
  { path: '/login.html', component: Login,
    meta: {
      skipAuth: true
    }
  },
  { path: '/index.html', component: Main },
  { path: '/user', component: Main,
    children: [
      { path: 'menus.html', component: Menus }
    ]
  },
  {
    path: '*',
    component: {
      render(h) {
        return h('div', {}, 'Page not found')
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/admin',
  linkActiveClass: 'focus',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    if (to.hash) {
      return { selector: to.hash }
    }

    return { y: 0 }
  },
  routes
})

export function hook(userPromise) {
  router.beforeEach((to, from, next) => {
    if (to.path === '/login.html') return next()

    userPromise.then(() => {
      if (store.getters.isAdmin) return next()

      next({ path: '/login.html' })
    })
  })
}

export default router
