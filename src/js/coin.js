new Vue({
  el: '#app',
  data: {
    boughtTicker: {},
    bought: [
      {
        name: 'xrp',
        cost: 2.25,
        count: 7997.491,
        basePrice: 1.2378
      },
      {
        name: 'ifc',
        cost: 0.001265,
        count: 5000000,
        basePrice: 0.00072
      },
      {
        name: 'etc',
        cost: 138.1,
        count: 39.94,
        basePrice: 105.22
      },
      {
        name: 'bts',
        cost: 2.284,
        count: 7987,
        basePrice: 0.848
      },
      {
        name: 'pgc',
        cost: 1.6,
        count: 3498.5,
        basePrice: 1.022
      }
    ],
    asset: 0,
    baseAsset: 36989.80,
    cash: 9046.04,
    coins: ['btc', 'eth', 'ltc', 'etc', 'ans', 'game', 'lsk', 'ppc', 'vrc', 'vtc', 'rss',
    'xpm', 'fz', 'xas', 'ktc', 'blk', 'tfc', 'bts', 'rio', 'xrp', 'pgc', 'wdc', 'nxt',
    'max', 'zcc', 'mryc', 'qec', 'lkc', 'gooc', 'plc', 'hlb', 'skt', 'zet', 'ytc', 'peb',
    'mtc', 'jbc', 'met', 'dnc', 'doge', 'eac', 'ifc'],
    infos: {
      btc: { name: '比特币' },
      eth: { name: '以太坊' },
      ltc: { name: '莱特币' },
      etc: { name: '以太经典' },
      ans: { name: '小蚁股' },
      game: { name: '游戏点' },
      lsk: { name: 'LISK' },
      ppc: { name: '点点币' },
      vrc: { name: '维理币' },
      vtc: { name: '绿币' },
      rss: { name: '红贝壳' },
      xpm: { name: '质数币' },
      fz: { name: '冰河币' },
      xas: { name: '阿希币' },
      ktc: { name: '肯特币' },
      blk: { name: '黑币' },
      tfc: { name: '传送币' },
      bts: { name: '比特股', bought: true },
      rio: { name: '里约币' },
      xrp: { name: '瑞波币', bought: true },
      pgc: { name: '乐园通', bought: true },
      wdc: { name: '世界币' },
      nxt: { name: '未来币' },
      max: { name: '最大币' },
      zcc: { name: '招财币' },
      mryc: { name: '美人鱼币' },
      qec: { name: '企鹅链' },
      lkc: { name: '幸运币' },
      gooc: { name: '谷壳币' },
      plc: { name: '保罗币' },
      hlb: { name: '活力币' },
      skt: { name: '鲨之信' },
      zet: { name: '泽塔币' },
      ytc: { name: '一号币' },
      peb: { name: '普银' },
      mtc: { name: '猴宝币' },
      jbc: { name: '聚宝币' },
      met: { name: '美通币' },
      dnc: { name: '暗网币' },
      doge: { name: '狗狗币' },
      eac: { name: '地球币' },
      ifc: { name: '无限币', bought: true }
    },
    allTickers: {}
  },
  computed: {
    totalCost() {
      return this.bought.reduce((prev, current) => {
        return Number((prev + current.count * current.cost).toFixed(2))
      }, 0)
    }
  },
  methods: {
    ajax(option, callback) {
      let xmlhttp = new XMLHttpRequest()
      xmlhttp.open(option.method || 'get', option.url, true)
      xmlhttp.send()

      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          callback(JSON.parse(xmlhttp.responseText))
        }
      }
    },
    getTicker(coin) {
      this.ajax({
        url: `/api/v1/ticker/?coin=${coin}`
      }, body => {
        this.boughtTicker[coin] = body

        let sum = this.cash
        this.bought.forEach(c => {
          if (this.boughtTicker[c.name]) {
            console.log(Number((c.count * this.boughtTicker[c.name].last).toFixed(2)))
            sum += Number((c.count * this.boughtTicker[c.name].last).toFixed(2))
          }
        })
        this.asset = Number(sum.toFixed(2))

        this.$forceUpdate()
      })
    },
    getBoughtCoins() {
      this.bought.forEach(coin => {
        this.getTicker(coin.name)
      })
    },
    getAllTickers() {
      this.ajax({
        url: '/api/v1/allticker/'
      }, body => {
        this.allTickers = body
      })
    }
  },
  created() {
    this.getAllTickers()
    this.getBoughtCoins()
    setInterval(() => {
      this.getBoughtCoins()
    }, 60 * 1000)
    setInterval(() => {
      this.getAllTickers()
    }, 100 * 1000)
  }
})
