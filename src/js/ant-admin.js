import router from './ant-admin/router'
import VCustomSvg from './ant-admin/components/Svg.vue'
import VIcon from './ant-admin/components/Icon.vue'

new Vue({
  router,
  data: {
    trigger: false,
    menus: [
      { title: 'Dashboard', icon: 'dashboard',
        subs: [
          { title: '分析页', url: '/dashboard/analysis' },
          { title: '监控页', url: '/dashboard/monitor' },
          { title: '工作台', url: '/dashboard/workplace' }
        ]
      },
      { title: '表单页', icon: 'edit-square', subs: [] },
      { title: '列表页', icon: 'table', subs: [] },
      { title: '详情页', icon: 'detail', subs: [] },
      { title: '结果页', icon: 'check-circle', subs: [] },
      { title: '异常页', icon: 'error', subs: [] },
    ],
    asideCollapsed: false
  },
  components: { VCustomSvg, VIcon },
  methods: {
    triggerUpdate() {
      this.trigger = !this.trigger
    },
    toggleMenu(menu) {
      if (this.asideCollapsed) return

      menu._expand = !menu._expand

      if (menu._expand) {
        menu.height = 44 * (menu.subs.length + 1)
      } else {
        menu.height = 44
      }

      this.triggerUpdate()
    }
  }
}).$mount('app')
