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
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tab: -1,
        mdContent: '',
        loading: false
      }
    },
    props: {
      titles: {
        type: Array,
        'default': ['头条', '技术知识', '天梯', '品牌']
      },
      part: String
    },
    computed: {
      isMarkdown() {
        return [1, 3].includes(this.tab)
      }
    },
    watch: {
      tab(val) {
        if (this.isMarkdown) {
          //if (this.mdContent !== '') return

          let url
          if (val === 1) {
            url = `/article-diy/${this.part}.html`
          }
          if (val === 3) {
            url = `/article-diy/${this.part}-brands.html`
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
              this.loading = true
            })
        }
      }
    },
    created() {

    }
  }
</script>
