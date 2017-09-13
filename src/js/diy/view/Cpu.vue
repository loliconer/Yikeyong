<template>
  <div class="view-cpu">
    <Part part="cpu" :extra-tabs="extraTabs"></Part>
  </div>
</template>
<script>
  import Part from './components/Part.vue'

  export default {
    data() {
      return {
        extraTabs: {
          overLock: '超频'
        }
      }
    },
    components: { Part }
  }
</script>
