<template>
  <div class="view-main blog"></div>
</template>
<script>
  export default {
    data() {
      return {
      }
    },
    created() {
      fetch('/article-diy/diy.html')
        .then(res => {
          if (res.ok) return res.text()
        })
        .then(body => this.$el.innerHTML = body)
        .catch(this.error)
    }
  }
</script>
