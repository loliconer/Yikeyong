import Viewer from "./vue/viewer.vue";

!function() {
    new Vue({
        el:"body",
        data: {
            type: null
        },
        components:{ Viewer },
        methods: {
            view ( type ) {
                this.$refs.viewer.show( type );
            }
        }
    });
}();