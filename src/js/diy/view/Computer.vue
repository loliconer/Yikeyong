<template>
  <div class="view-computer">
    <div class="img-wrap" v-for="img of imgs">
      <img class="lozad" :data-src="img.url" :width="img.width" :height="img.height">
    </div>
  </div>
</template>
<script>
  import lozad from 'lozad'

  export default {
    data() {
      return {
        imgs: [
          {
            url: '//ww2.sinaimg.cn/large/0060lm7Tly1fjtkyjo6chj30m80etqip.jpg',
            width: 800,
            height: 533
          },
          {
            url: '//ww4.sinaimg.cn/large/0060lm7Tly1fjtkyp07y3j30m80godxt.jpg',
            width: 800,
            height: 600
          },
          {
            url: '//ww3.sinaimg.cn/large/0060lm7Tly1fjtkytatawj30m80et7kf.jpg',
            width: 800,
            height: 533
          },
          {
            url: '//ww4.sinaimg.cn/large/0060lm7Tly1fjtkytppvqj30q00ef7lg.jpg',
            width: 936,
            height: 519
          },
          {
            url: '//ww4.sinaimg.cn/large/0060lm7Tly1fjtkyv3f2zj30m80go4k7.jpg',
            width: 800,
            height: 600
          },
          {
            url: '//ww4.sinaimg.cn/large/0060lm7Tly1fjtkyvm57wj30m80gox06.jpg',
            width: 800,
            height: 600
          },
          {
            url: '//ww2.sinaimg.cn/large/0060lm7Tly1fjtkyx0hs7j30pk0lz4qh.jpg',
            width: 920,
            height: 791
          },
          {
            url: '//ww2.sinaimg.cn/large/0060lm7Tly1fjtkyyhu1sj30m80et4df.jpg',
            width: 800,
            height: 533
          },
          {
            url: '//ww1.sinaimg.cn/large/0060lm7Tly1fjtkyzwy0tj30m80ettm8.jpg',
            width: 800,
            height: 533
          },
          {
            url: '//ww1.sinaimg.cn/large/0060lm7Tly1fjtkz22di0j30m80gonjz.jpg',
            width: 800,
            height: 600
          }
        ]
      }
    },
    mounted() {
      const imgs = this.$el.querySelectorAll('.img-wrap img')
      imgs.forEach(img => {
        const imgWidth = img.getAttribute('width'),
          imgHeight = img.getAttribute('height')

        if (img.width < imgWidth) {
          img.height = img.width / imgWidth * imgHeight
        }
      })
      const observer = lozad()
      observer.observe()
    }
  }
</script>
