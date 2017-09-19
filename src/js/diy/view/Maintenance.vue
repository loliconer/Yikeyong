<template>
  <div class="view-maintenance">
    <ul class="list" v-if="!showContent">
      <li v-for="(link, i) of links"><a class="link" type="button" @click="getBlog(i)">{{link.name}}</a></li>
    </ul>
    <div class="vm-content" v-else>
      <header class="above">
        <a class="link vm-back" @click="showContent = false">返回</a>
        <span class="vm-title">{{links[index].name}}</span>
        <span class="vm-blank"></span>
      </header>
      <vue-loading v-if="loading"></vue-loading>
      <article class="below blog" v-else v-html="blog"></article>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        links: [
          { name: '电脑各部件的保养', url: 'maintenance-all' }
        ],
        index: 0,
        showContent: false,
        loading: false,
        blog: ''
      }
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
          })
          .catch(error => {
            this.error(error)
            this.loading = false
          })
      }
    }
  }
</script>
