import store from '../store'

import Main from '../view/Main.vue'
import Cpu from '../view/Cpu.vue'
import Memory from '../view/Memory.vue'
import HardDisk from '../view/HardDisk.vue'
import GraphicsCard from '../view/GraphicsCard.vue'
import MotherBoard from '../view/MotherBoard.vue'
import Maintenance from '../view/Maintenance.vue'

const routes = [
  {
    path: '/',
    redirect: '/index.html'
  },
  {
    path: '/index.html',
    component: Main
  },
  {
    path: '/cpu.html',
    component: Cpu
  },
  {
    path: '/memory.html',
    component: Memory
  },
  {
    path: '/hard-disk.html',
    component: HardDisk
  },
  {
    path: '/graphics-card.html',
    component: GraphicsCard
  },
  {
    path: '/mother-board.html',
    component: MotherBoard
  },
  {
    path: '/maintenance.html',
    component: Maintenance
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/diy',
  linkActiveClass: 'focus',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    if (to.hash) return { selector: to.hash }

    return { y: 0 }
  },
  routes
})

export default router
