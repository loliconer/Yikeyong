<template>
  <div class="view-part">
    <vue-tab :titles="titles" :cur="tab" @select="i => tab = i"></vue-tab>
    <div class="loading-wrap" v-if="loading">
      <vue-loading></vue-loading>
    </div>
    <div class="part-content" v-else>
      <div class="panel panel-concept" v-if="tab === 1">
        <div style="text-align: center;" v-if="concept === ''">暂无内容</div>
        <div class="blog" v-html="concept" v-else></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tab: -1,
        concept: '',
        loading: false
      }
    },
    props: {
      titles: {
        type: Array,
        'default': ['头条', '技术知识', '天梯']
      },
      part: String
    },
    watch: {
      tab(val) {
        if (val === 1) {
          if (this.concept !== '') return

          this.loading = true
          fetch(`/article-diy/${this.part}.html`)
            .then(res => {
              if (res.ok) return res.text()
            })
            .then(body => {
              this.concept = body
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
