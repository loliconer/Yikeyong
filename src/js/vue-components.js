if (!NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach
}

function createMenu() {
  const panels = document.querySelectorAll('.panel[id]')
  const aside = document.querySelector('aside.c-left')
  const list = document.createElement('ul')
  list.classList.add('list')
  const frag = document.createDocumentFragment()
  const offsetTops = []

  panels.forEach(panel => {
    offsetTops.push(panel.offsetTop)

    const li = document.createElement('li')
    const a = document.createElement('a')
    a.href = `#${panel.id}`
    a.innerHTML = panel.firstChild.innerHTML
    li.appendChild(a)
    frag.appendChild(li)
  })
  list.appendChild(frag)
  aside.appendChild(list)
  return offsetTops
}

function updateLinks(links) {
  let hash = location.hash

  links.forEach(link => {
    link.classList.remove('focus')
    if (link.getAttribute('href') === hash) {
      link.classList.add('focus')
    }
  })
}

new Vue({
  el: '#app',
  data: {
    diploma: {
      chuzhong: '初中',
      gaozhong: '高中',
      benke: '本科',
      shuoshi: '硕士',
      boshi: '博士'
    },
    buildings: [
      {
        name: '一公寓',
        layers: 5,
        age: 80
      },
      {
        name: '二公寓',
        layers: 10,
        age: 40
      },
      {
        name: '研究生公寓',
        layers: 6,
        age: 3
      }
    ],
    buildingColumns: [
      {
        title: '楼栋名称',
        prop: 'name'
      },
      {
        title: '层数',
        prop: 'layers',
        sortable: true
      },
      {
        title: '楼龄',
        prop: 'age'
      },
      {
        title: '操作',
        custom: true,
        prop: 'operation'
      }
    ],
    bShowWindow: false,
    cars: [
      {
        name: '布加迪',
        value: 'Bugatti'
      },
      {
        name: '法拉利',
        value: 'Ferrari'
      },
      {
        name: '兰博基尼',
        value: 'Lamborghini'
      },
      {
        name: '迈凯伦',
        value: 'McLaren'
      }],
    bought: [
      {
        name: '布加迪',
        value: 'Bugatti'
      },
      {
        name: '法拉利',
        value: 'Ferrari'
      },
      {
        name: '五菱',
        value: 'fiveLing',
        custom: true
      }
    ],
    bought2: {
      name: '布加迪',
      value: 'Bugatti'
    },
    items: {
      name: 'IT',
      children: [
        {
          name: 'Front End',
          children: [
            {
              name: 'Lib',
              children: [
                {
                  name: 'Vue'
                },
                {
                  name: 'React'
                },
                {
                  name: 'Angular'
                }
              ]
            }
          ]
        },
        {
          name: 'Back End'
        }
      ]
    },
    trigger: false,
    password: '',
    loadingSubmit: false
  },
  methods: {
    alertOne () {
      this.$refs.alert.show('这是提示内容')
    },
    alertTwo () {
      this.$refs.alert.show({
        text: '这是提示内容',
        type: 'confirm'
      })
    },
    toggleEv(ev) {
      console.log(ev.target.checked)
    },
    uploadFile(file) {
      const form = new FormData()
      form.append('evFile', file)
    },
    selectTab(i) {
      console.log(i)
    },
    getSlice(slice) {
      console.log(slice)
    },
    getSelectedBuildings(rows) {
      console.log(rows)
    },
    msgSuccess() {
      this.success('成功')
    },
    msgWarn() {
      this.warn('警告')
    },
    msgInfo() {
      this.info('提示')
    },
    msgError() {
      this.error('错误')
    },
    getCars(cars) {
      console.log(cars)
    },
    selectItem(items) {
      console.log(items)
      this.trigger = !this.trigger
    },
    unselectItem(items) {
      console.log(items)
      this.trigger = !this.trigger
    }
  },
  mounted() {
    setTimeout(() => {
      const offsetTops = createMenu()
      const links = document.querySelectorAll('aside.c-left ul.list a')

      updateLinks(links)
      window.onhashchange = () => updateLinks(links)

      window.addEventListener('scroll', () => {
        for (let i = 0; i < offsetTops.length - 1; i++) {
          if (offsetTops[i] - 100 < pageYOffset && pageYOffset < offsetTops[i + 1] - 100) {
            links.forEach((link, index) => {
              link.classList.remove('focus')
              index === i && link.classList.add('focus')
            })
          }
        }
      })
    }, 400)
  }
})
