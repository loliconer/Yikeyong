<template>
  <div class="view-part">
    <vue-tab :titles="titles" :cur="tab" @select="i => tab = i"></vue-tab>
    <div class="loading-wrap" v-if="loading">
      <vue-loading></vue-loading>
    </div>
    <div class="part-content" v-else>
      <div class="panel panel-md" v-if="isMarkdown">
        <div style="text-align: center;" v-if="mdContent === ''">暂无内容</div>
        <div class="blog" v-html="mdContent" v-else></div>
      </div>
      <slot name="headline" v-if="tab === 0"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tab: -1,
        isMarkdown: false,
        mdContent: '',
        loading: false,
        defaultTabs: {
          headline: '头条',
          base: '技术知识',
          ladder: '天梯',
          brands: '品牌'
        },
        tabs: {}
      }
    },
    props: {
      extraTabs: Object,
      part: String
    },
    computed: {
      titles() {
        return Object.values(this.tabs)
      }
    },
    watch: {
      tab(val) {
        this.isMarkdown = false
        let url
        let cur = Object.keys(this.tabs)[val]
        if (cur === 'base') {
          this.isMarkdown = true
          url = `/article-diy/${this.part}.html`
        }
        if (cur === 'brands') {
          this.isMarkdown = true
          url = `/article-diy/${this.part}-brands.html`
        }
        if (cur === 'overLock') {
          this.isMarkdown = true
          url = `/article-diy/${this.part}-over-lock.html`
        }

        this.loading = true
        fetch(url)
          .then(res => {
            if (res.ok) return res.text()
          })
          .then(body => {
            this.mdContent = body
            this.loading = false
          })
          .catch(error => {
            this.error(error)
            this.loading = false
          })
      }
    },
    created() {
      this.tabs = Object.assign(this.defaultTabs, this.extraTabs)
    }
  }
</script>
