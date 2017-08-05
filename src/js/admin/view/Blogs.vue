<template>
  <div class="vue-blogs">
    <vue-table :source="blogs" :columns="columns">
      <template slot="op" scope="scope">
        <button class="btn" type="button" @click="deleteBlog(scope.value.rowid)">删除</button>
      </template>
    </vue-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogs: [],
      columns: [
        {
          title: '标题',
          prop: 'title'
        },
        {
          title: '日期',
          prop: 'date'
        },
        {
          title: '文件名',
          prop: 'name'
        },
        {
          title: '操作',
          prop: 'op',
          custom: true
        }
      ]
    }
  },
  methods: {
    getBlogs() {
      utils.fetch('/api/blogs')
        .then(body => {
          this.blogs = body
        })
        .catch(this.error)
    },
    deleteBlog(id) {
      this.$root.$refs.alert.show({
        type: 'confirm',
        text: '确认删除？'
      }, () => {
        utils.fetch({
          type: 'delete',
          url: `/api/blog/${id}`
        }).then(() => {
          this.success('删除成功')
          setTimeout(() => this.getBlogs(), 1000)
        }).catch(this.error)
      })
    }
  },
  created() {
    this.getBlogs()
  }
}
</script>
