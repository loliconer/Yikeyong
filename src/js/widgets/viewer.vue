<template>
  <div class="overlay vue-popup-viewer" v-show="bShowViewer">
    <div class="v-canvas">
      <div class="img-wrap" :style="imgStyle"></div>
    </div>

    <svg class="icon-close" @click="close">
      <use xlink:href="/img/icons.svg#icon-close"></use>
    </svg>

    <div class="v-footer">
      <ul class="v-toolbar">
        <li class="icon" @click="ratio += 0.1">
          <svg class="icon-plus"><use xlink:href="/img/icons.svg#icon-plus"></use></svg>
        </li>
        <li class="icon" @click="ratio = Math.max(ratio -= 0.1,0.1)">
          <svg class="icon-minus"><use xlink:href="/img/icons.svg#icon-minus"></use></svg>
        </li>
        <li class="icon-text" @click="ratio = 1">1:1</li>
        <li class="icon" @click="prev">
          <svg class="icon-arrow-down dir-left"><use xlink:href="/img/icons.svg#icon-arrow-down"></use></svg>
        </li>
        <li class="icon" @click="next">
          <svg class="icon-arrow-down dir-right"><use xlink:href="/img/icons.svg#icon-arrow-down"></use></svg>
        </li>
      </ul>
      <div class="v-navbar"></div>
    </div>
  </div>
</template>

<script>
  import utils from "../lib/utils"

  let prototype = {}
  let EVENT_MOUSEDOWN = "mousedown touchstart pointerdown MSPointerDown",
    EVENT_MOUSEMOVE = "mousemove touchmove pointermove MSPointerMove",
    EVENT_MOUSEUP = "mouseup touchend touchcancel pointerup pointercancel MSPointerUp MSPointerCancel",
    EVENT_WHEEL = "wheel mousewheel DOMMouseScroll"

  export default{
    data() {
      return {
        bShowViewer: false,
        index: 0,
        jsonData: null,
        type: "",
        images: {
          base: "beauty/校园女生",
          files: ["nvsheng0001.jpg"]
        },
        ratio: 1,
        degree: 0
      }
    },
    computed: {
      imgStyle() {
        return {
          transform: `scale(${this.ratio}) rotate(${this.degree}deg)`,
          background: `url(/pictures/${this.images.base}/${this.images.files[this.index]}) no-repeat center`
        }
      }
    },
    methods: {
      show(type) {
        this.type = type;
        if (this.jsonData) {
          this.images = this.jsonData[this.type];
        } else {
          utils.fetch('/js/images.json')
            .then(body => {
              this.jsonData = body
              this.images = body[type]
            }).catch(error => {
              console.log(error)
          })
        }

        this.bShowViewer = true
      },
      close () {
        this.index = 0
        this.reset()
        this.bShowViewer = false
      },
      prev () {
        if (this.index === 0) return

        this.reset()
        this.index--
      },
      next () {
        if (this.index === this.images.files.length - 1) return

        this.reset()
        this.index++
      },
      reset () {
        this.ratio = 1
        this.degree = 0
      }
    }
  }
</script>
