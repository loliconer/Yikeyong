import Viewer from './widgets/viewer.vue'

new Vue({
  el: '#app',
  data: {
    type: null
  },
  components: { Viewer },
  methods: {
    view (type) {
      this.$refs.viewer.show(type)
    }
  }
})
