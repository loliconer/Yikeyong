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
      error(text) {
        this.$msg({
          message: text,
          type: 'error'
        })
      },
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
        }).catch(error => this.error(error))
      },
      getRowActionsDef() {
        let self = this
        let { menus, fathers } = this

        return [{
          type: 'btn',
          handler(row) {
            self.bShowAddForm = true
            self.current = Object.assign({}, row)
            document.querySelector('.content-wrapper').scrollTop = 0
          },
          name: '修改'
        }, {
          type: 'primary',
          handler(row) {
            self.$root.$refs.alert.show({
              type: 'confirm',
              text: '确认删除？'
            }, () => {
              utils.asyncFetch({
                type: 'delete',
                url: `menu/${row.id}`
              }).then(() => {
                self.$msg('删除成功')

                for (let i = 0, l = menus.length; i < l; i++) {
                  if (menus[i].id === row.id) {
                    menus.splice(i, 1)
                  }
                }

                if (!row.father) {
                  for (i = 0, l = fathers.length; i < l; i++) {
                    if (fathers[i].id === row.id) {
                      fathers.splice(i, 1)
                    }
                  }
                }
              }).catch(error => self.error(error))
            })
          },
          name: '删除'
        }]
      },
      getSearchDef() {
        return {
          offset: 0,
          props: ['name']
        }
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
          utils.asyncFetch({
            type: 'put',
            url: `menu/${current.id}`,
            data: current
          }).then(body => {
            this.$msg('保存成功')
            this.canSubmit = true
            this.bShowSaveLoading = false
            this.bShowAddForm = false
            ev.target.reset()
            for (let i = 0, l = menus.length; i < l; i++) {
              if (menus[i].id === current.id) {
                this.menus.splice(i, 1, body)
              }
            }
          }).catch(error => this.error(error))
        } else {
          utils.asyncFetch({
            type: 'form',
            url: 'menu',
            data: new FormData(ev.target),
            vm: this
          }).then(body => {
            this.$msg('保存成功')
            this.canSubmit = true
            this.bShowSaveLoading = false
            this.bShowAddForm = false
            ev.target.reset()
            this.menus.push(body)
          }).catch(error => this.error(error))
        }
      }
    },
    created() {
      this.getMenus()
    }
  }
</script>
