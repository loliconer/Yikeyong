<template>
  <div class="view-users">
    <div class="panel">
      <button class="btn" type="button" @click="openAddForm">添加新菜单</button>
      <form class="form" v-show="bShowAddForm" @submit.prevent="addMenu">
        <div class="row row-inline">
          <div class="cell">
            <input class="input" type="text" name="name" placeholder="菜单名" required v-model="current.name">
          </div>
          <div class="cell">
            <input class="input auto-width" type="text" name="url" placeholder="路径" :size="(current.url ? current.url.length : 0)+1" v-model="current.url">
          </div>
          <div class="cell" v-if="!current.id">
            <select class="select" name="father" v-model.number="current.father">
              <option v-for="f of fathers" :value="f.id">{{f.name}}</option>
            </select>
          </div>
          <div class="cell cell-h">
            <button class="btn" type="submit">保存</button>
            <vue-loading v-show="bShowSaveLoading"></vue-loading>
          </div>
        </div>
      </form>
    </div>

    <div class="panel">
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        bShowAddForm: false,
        bShowSaveLoading: false,
        canSubmit: true,
        menus: [],
        fathers: [],
        current: {}
      }
    },
    methods: {
      getMenus() {
        utils.fetch({
          type: 'get',
          url: 'menus'
        }).then(body => {
          for (let key in body) {
            if (body.hasOwnProperty(key)) {
              let menu = body[key]
              menu.id = Number.parseInt(key)
              this.menus.push(menu)

              if (!menu.father && !menu.url) {
                this.fathers.push(menu)
              }
            }
          }
        }).catch(this.error)
      },
      openAddForm() {
        this.bShowAddForm = true
        this.current = {}
      },
      addMenu(ev) {
        if(!this.canSubmit) return

        let { current, menus } = this

        this.canSubmit = false
        this.bShowSaveLoading = true

        if (current.id) {
          utils.fetch({
            type: 'put',
            url: `menu/${current.id}`,
            data: current
          }).then(body => {
            this.success('保存成功')
            this.canSubmit = true
            this.bShowSaveLoading = false
            this.bShowAddForm = false
            ev.target.reset()
            for (let i = 0, l = menus.length; i < l; i++) {
              if (menus[i].id === current.id) {
                this.menus.splice(i, 1, body)
              }
            }
          }).catch(this.error)
        } else {
          utils.fetch({
            type: 'form',
            url: 'menu',
            data: new FormData(ev.target)
          }).then(body => {
            this.success('保存成功')
            this.canSubmit = true
            this.bShowSaveLoading = false
            this.bShowAddForm = false
            ev.target.reset()
            this.menus.push(body)
          }).catch(this.error)
        }
      }
    },
    created() {
      // this.getMenus()
    }
  }
</script>
