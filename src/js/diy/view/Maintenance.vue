<template>
  <div class="view-maintenance">
    <article-list :links="links"></article-list>
  </div>
</template>
<script>
  import ArticleList from './components/ArticleList.vue'

  export default {
    data() {
      return {
        links: [
          { name: '电脑各部件的保养', url: 'maintenance-all' }
        ]
      }
    },
    components: { ArticleList }
  }
</script>
