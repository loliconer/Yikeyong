<template>
  <div class="view-users">
    <div class="panel">
      <v-button>添加新菜单</v-button>
    </div>

    <div class="panel"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      menus: [],
      fathers: [],
      current: {}
    }
  },
  methods: {
    openAddForm () {
      this.current = {}
    }
  }
}
</script>
