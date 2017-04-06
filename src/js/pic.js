import Viewer from "./vue/viewer.vue";
import Navbar from "./vue/navbar.vue";

new Vue( {
    el: "#app",
    data: {
        type: null
    },
    components: { Viewer, Navbar },
    methods: {
        view ( type ) {
            this.$refs.viewer.show( type );
        }
    }
} );