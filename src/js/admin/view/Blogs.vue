<template>
  <div class="view-blogs">
    <button class="btn" type="button" @click="startAdd">添加新文章</button>
    <form class="grid" v-show="showForm" @submit.prevent="addOrUpdateBlog">
      <div class="row-inline">
        <div class="cell">
          <input class="input" type="text" name="title" v-model="current.title" placeholder="文章标题" required>
        </div>
      </div>

      <div class="row-inline">
        <div class="cell">
          <input class="input" type="text" name="name" v-model="current.name" placeholder="文件名" required>
        </div>
      </div>

      <div class="row-inline">
        <div class="cell">
          <input class="input" type="text" name="path" v-model="current.path" placeholder="路径" required>
        </div>
      </div>

      <div class="row">
        <div class="cell">
          <textarea class="textarea" name="intro" rows="8" cols="80" v-model="current.intro" placeholder="文章简介"></textarea>
        </div>
      </div>

      <div class="row row-submit-left">
        <button class="btn" type="submit">保存</button>
        <vue-loading v-show="loading"></vue-loading>
      </div>
    </form>

    <vue-table :source="blogs" :columns="columns">
      <template slot="op" slot-scope="scope">
        <button class="btn" type="button" @click="deleteBlog(scope.value.rowid)">删除</button>
        <button class="btn" type="button" @click="startEdit(scope.value)">编辑</button>
      </template>
    </vue-table>
  </div>
</template>

<script>
import { fetch as _fetch } from 'lovue-utils'

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
      ],
      showForm: false,
      loading: false,
      current: {}
    }
  },
  methods: {
    getBlogs() {
      _fetch('/api/blogs')
        .then(body => {
          this.blogs = body
        })
        .catch(this.error)
    },
    startAdd() {
      this.current = {
        path: '/blog/post'
      }
      this.showForm = true
    },
    startEdit(blog) {
      this.current = Object.assign({}, blog)
      this.showForm = true
    },
    addOrUpdateBlog() {
      if (this.loading) return
      this.loading = true

      _fetch({
        type: this.current.rowid ? 'put' : 'post',
        url: this.current.rowid ? `/api/blogs/${this.current.rowid}` : '/api/blogs',
        data: this.current
      }).then(() => {
        this.success(this.current.rowid ? '更新成功' : '添加成功')
        this.loading = false
        this.showForm = false
        setTimeout(() => this.getBlogs(), 1000)
      }).catch(error => {
        this.error(error)
        this.loading = false
      })
    },
    deleteBlog(id) {
      this.$root.$refs.alert.show({
        type: 'confirm',
        text: '确认删除？'
      }, () => {
        _fetch({
          type: 'delete',
          url: `/api/blogs/${id}`
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
