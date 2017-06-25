new Vue({
  el: '#app',
  data: {
    boughtTicker: {},
    bought: [
      {
        name: 'ktc',
        cost: 4.12,
        count: 120
      },
      {
        name: 'ifc',
        cost: 0.001161,
        count: 499500
      },
      {
        name: 'doge',
        cost: 0.0233,
        count: 49950
      },
      {
        name: 'peb',
        cost: 0.284,
        count: 1998
      },
      {
        name: 'xrp',
        cost: 2.25,
        count: 3990
      },
      {
        name: 'bts',
        cost: 2.284,
        count: 999
      },
      {
        name: 'met',
        cost: 0.178,
        count: 9990
      },
      {
        name: 'ytc',
        cost: 0.256,
        count: 3996
      }
    ],
    asset: 0,
    cash: 1403.57,
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
      ktc: { name: '肯特币', bought: true },
      blk: { name: '黑币' },
      tfc: { name: '传送币' },
      bts: { name: '比特股', bought: true },
      rio: { name: '里约币' },
      xrp: { name: '瑞波币', bought: true },
      pgc: { name: '乐园通' },
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
      ytc: { name: '一号币', bought: true },
      peb: { name: '普银', bought: true },
      mtc: { name: '猴宝币' },
      jbc: { name: '聚宝币' },
      met: { name: '美通币', bought: true },
      dnc: { name: '暗网币' },
      doge: { name: '狗狗币', bought: true },
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
            sum += Number((c.count * this.boughtTicker[c.name].sell).toFixed(2))
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
