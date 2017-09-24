<template>
  <div class="view-mother-board">
    <Part part="mother-board">
      <template slot="headline">
        <article-list :links="links"></article-list>
      </template>
    </Part>
  </div>
</template>
<script>
  import Part from './components/Part.vue'
  import ArticleList from './components/ArticleList.vue'

  export default {
    data() {
      return {
        links: [
          { name: '高端主板EVGA Classified SR-2', url: 'mb-evga-classified-sr2' }
        ]
      }
    },
    components: { Part, ArticleList }
  }
</script>
