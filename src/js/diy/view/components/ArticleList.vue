<template>
  <div class="view-article-list">
    <ul class="list" v-if="!showContent">
      <li v-for="(link, i) of links"><a class="link" type="button" @click="getBlog(i)">{{link.name}}</a></li>
    </ul>
    <div class="va-content" v-else>
      <header class="above">
        <a class="link va-back" @click="showContent = false">返回</a>
        <span class="va-title">{{links[index].name}}</span>
        <span class="va-blank"></span>
      </header>
      <vue-loading v-if="loading"></vue-loading>
      <article class="below blog" v-else v-html="blog"></article>
    </div>
  </div>
</template>
<script>
  import lozad from 'lozad'

  export default {
    data() {
      return {
        index: 0,
        showContent: false,
        loading: false,
        blog: ''
      }
    },
    props: {
      links: Array
    },
    methods: {
      getBlog(i) {
        this.index = i
        this.showContent = true
        this.loading = true
        fetch(`/article-diy/${this.links[i].url}.html`)
          .then(res => {
            if (res.ok) return res.text()
          })
          .then(body => {
            this.blog = body
            this.loading = false

            this.$nextTick(() => {
              const imgs = this.$el.querySelectorAll('.blog img')
              imgs.forEach(img => {
                const imgWidth = img.getAttribute('width'),
                  imgHeight = img.getAttribute('height')

                if (img.width < imgWidth) {
                  img.height = img.width / imgWidth * imgHeight
                }
              })
              const observer = lozad()
              observer.observe()
            })
          })
          .catch(error => {
            this.error(error)
            this.loading = false
          })
      }
    }
  }
</script>
