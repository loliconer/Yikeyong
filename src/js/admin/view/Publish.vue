<template>
  <div class="view-publish">
    <div class="panel">
      <form class="grid" @submit.prevent="addBlog">
        <div class="row-inline">
          <div class="cell">
            <input class="input" type="text" name="title" placeholder="文章标题" required>
          </div>
        </div>

        <div class="row-inline">
          <div class="cell">
            <input class="input" type="text" name="name" placeholder="文件名" required>
          </div>
        </div>

        <div class="row-inline">
          <div class="cell">
            <input class="input" type="text" name="path" value="/blog/post" placeholder="路径" required>
          </div>
        </div>

        <div class="row">
          <div class="cell">
            <textarea class="textarea" name="intro" rows="8" cols="80" placeholder="文章简介"></textarea>
          </div>
        </div>

        <div class="row row-submit-left">
          <button class="btn" type="submit">保存</button>
          <vue-loading v-show="loading"></vue-loading>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loading: false,
        canSubmit: true
      }
    },
    methods: {
      addBlog(ev) {
        if(this.loading) return

        this.loading = true

        utils.fetch({
          type: 'form',
          url: '/api/blog',
          data: new FormData(ev.target)
        }).then(body => {
          this.loading = false

          this.success('保存成功')
          ev.target.reset()
        }).catch(error => {
          this.loading = false
          this.error(error.error)
        })
      }
    },
    created() {
    }
  }
</script>
