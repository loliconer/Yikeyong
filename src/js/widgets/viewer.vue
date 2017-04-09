<template>
    <div class="viewer-container overlay" v-show="bShowViewer">
        <div class="viewer-canvas">
            <div class="img-wrap" :style="imgStyle"></div>
        </div>
        <div class="viewer-footer">
            <ul class="viewer-toolbar">
                <li class="fa fa-plus" @click="ratio += 0.1"></li>
                <li class="fa fa-minus" @click="ratio = Math.max(ratio -= 0.1,0.1)"></li>
                <li class="font-14" @click="ratio = 1">1:1</li>
                <li class="fa fa-chevron-left" @click="prev"></li>
                <li class="fa fa-play viewer-play"></li>
                <li class="fa fa-chevron-right" @click="next"></li>
                <li class="fa fa-reply" @click="degree -= 90"></li>
                <li class="fa fa-share" @click="degree += 90"></li>
            </ul>
            <div class="viewer-navbar"></div>
        </div>
        <div class="viewer-close" @click="close"></div>
    </div>
</template>

<script>
    import utils from "../lib/utils";

    var prototype = {};
    var EVENT_MOUSEDOWN = "mousedown touchstart pointerdown MSPointerDown",
            EVENT_MOUSEMOVE = "mousemove touchmove pointermove MSPointerMove",
            EVENT_MOUSEUP = "mouseup touchend touchcancel pointerup pointercancel MSPointerUp MSPointerCancel",
            EVENT_WHEEL = "wheel mousewheel DOMMouseScroll";

    export default{
        data(){
            return {
                bShowViewer: false,
                index: 0,
                jsonData: null,
                type: "",
                images: {
                    base: "beauty/校园女生",
                    files: [ "nvsheng0001.jpg" ]
                },
                ratio: 1,
                degree: 0
            }
        },
        computed: {
            imgStyle () {
                return {
                    transform: `scale(${this.ratio}) rotate(${this.degree}deg)`,
                    background: `url(/spa/img/${this.images.base}/${this.images.files[ this.index ]}) no-repeat center`
                }
            }
        },
        methods: {
            show ( type ) {
                let _this = this;
                this.type = type;
                if ( this.jsonData ) {
                    this.images = this.jsonData[ this.type ];
                } else {
                    utils.fetchGet( '/public/js/images.json', function ( body ) {
                        _this.jsonData = body;
                        _this.images = _this.jsonData[ _this.type ];
                    } );
                }

                this.bShowViewer = true;
            },
            close () {
                this.index = 0;
                this.reset();
                this.bShowViewer = false;
            },
            prev () {
                if ( this.index === 0 ) return;

                this.reset();
                this.index--;
            },
            next () {
                if ( this.index === this.images.files.length - 1 ) return;

                this.reset();
                this.index++;
            },
            reset () {
                this.ratio = 1;
                this.degree = 0;
            }
        }
    }
</script>
