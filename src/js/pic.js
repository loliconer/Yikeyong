import Viewer from "./widgets/viewer.vue";
import Navbar from "./widgets/navbar.vue";

new Vue({
  el: "#app",
  data: {
    type: null
  },
  components: { Viewer, Navbar },
  methods: {
    view (type) {
      this.$refs.viewer.show(type);
    }
  }
});
