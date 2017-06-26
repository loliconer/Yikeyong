<template>
  <div class="view-publish">
    <div class="panel">
      <form class="form" @submit.prevent="addBlog">
        <div class="row row-inline">
          <div class="cell">
            <input class="input" type="text" name="title" placeholder="文章标题" required>
          </div>
        </div>

        <div class="row">
          <div class="cell">
            <textarea class="textarea" name="brief" rows="8" cols="80" placeholder="文章简介"></textarea>
          </div>
        </div>

        <div class="row row-submit-left">
          <button class="btn" type="submit">保存</button>
          <vue-loading v-show="bShowAddLoading"></vue-loading>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        bShowAddLoading: false,
        canSubmit: true
      }
    },
    methods: {
      error(text) {
        this.$msg({
          message: text,
          type: 'error'
        })
      },
      addBlog(ev) {
        if(!this.canSubmit) return

        this.canSubmit = false
        this.bShowAddLoading = true

        utils.fetch({
          type: 'form',
          url: '/api/blog',
          data: new FormData(ev.target)
        }).then(body => {
          this.canSubmit = true
          this.bShowAddLoading = false

          this.$msg('保存成功')
          ev.target.reset()
        }).catch(error => {
          this.canSubmit = true
          this.bShowAddLoading = false
          this.error(error.error)
        })
      }
    },
    created() {
    }
  }
</script>
