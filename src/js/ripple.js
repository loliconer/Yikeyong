let KEY = ''
let firstQuery = true

const _fetch = option => {
  if (typeof option === 'string') {
    option = {
      type: 'get',
      url: option
    };
  } else {
    option.type = option.type || 'get';
  }

  let allOptions = {
    get: {},
    post: {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Key': KEY
      },
      body: JSON.stringify(option.data)
    },
    delete: {
      headers: {
        'Auth-Key': KEY
      },
      method: 'delete'
    }
  };

  let requestOption = allOptions[option.type];

  requestOption.credentials = 'same-origin';
  requestOption.headers = requestOption.headers || {};
  requestOption.headers['Accept'] = 'application/json';

  let url;
  if (option.url.startsWith('/') || option.url.startsWith('http')) {
    url = option.url;
  } else {
    url = `/api/${option.url}`;
  }
  let request = new Request(url, requestOption);

  return new Promise((resolve, reject) => {
    fetch(request).then(res => {
      if (res.ok) return res.json()
      throw res
    }).then(body => {
      if (body.result === 'success') {
        resolve(body)
        return
      }
      if (body.code === 0) {
        resolve(body.data);
      } else {
        throw body.data || body.msg || body
      }
    }).catch(err => reject(err));
  })
};

new Vue({
  el: '#app',
  data: {
    trigger: false,
    balances: {},
    kdb: {
      orderbooks: {
        bids: [],
        asks: []
      },
      fee: 0,
      orders: []
    },
    amount: 200,
    price: 0,
    orderCount: 0,
    asset: 0,
    tab: 0,
    showContainer: false,
    loadings: {
      fastBuy: false,
      fastSell: false,
      buy: false,
      sell: false
    }
  },
  watch: {
    orderCount() {
      if (firstQuery) {
        firstQuery = false
      } else {
        this.warn('有更新')
        this.sendEmail()
      }
    }
  },
  methods: {
    triggerUpdate() {
      this.trigger = !this.trigger
    },
    enter(ev) {
      KEY = ev.target.value
      sessionStorage.authKey = KEY
      this.showContainer = true

      this.getBalances()
      this.getKdb()
    },
    getBalances() {
      _fetch('https://data.ripple.com/v2/accounts/rHJ9vCnbfF2VzMBoaQnTA2J6stWZGNeJun/balances')
        .then(body => {
          body.balances.forEach(b => {
            if (b.currency === 'XRP') {
              this.balances.XRP = Number(b.value)
            }
            if (b.counterparty === 'razqQKzJRdB4UxFPWf5NEpEG3WMkmwgcXA') {
              this.balances.CNY = Number(b.value)
            }
          })

          const firstAsk = this.kdb.orderbooks.asks[0]
          if (firstAsk) {
            this.asset = Number(this.balances.CNY + (this.balances.XRP - 40) * Number(firstAsk.price)).toFixed(2)
          }

          this.triggerUpdate()

          setTimeout(() => this.getBalances(), 6000)
        }).catch(error => {
          setTimeout(() => this.getBalances(), 6000)
        })
    },
    getKdb() {
      _fetch('ripple/kdb')
        .then(body => {
          this.kdb = body
          this.orderCount = body.orders.length
          setTimeout(() => this.getKdb(), 2000)
        })
    },
    cancelOrder(order) {
      if (order.loading) return
      order.loading = true
      this.triggerUpdate()
      _fetch({
        type: 'delete',
        url: `ripple/orders/${order.sequence}`,
        data: {
          key: KEY
        }
      }).then(() => {
        this.success('取消成功')
        order.loading = false
        this.triggerUpdate()
      }).catch(error => {
        this.error(error)
        order.loading = false
        this.triggerUpdate()
      })
    },
    submitOrder(options) {
      return _fetch({
        type: 'post',
        url: 'ripple/order',
        data: {
          direction: options.direction,
          amount: options.amount || this.amount,
          price: options.price || this.price,
          key: KEY
        }
      }).then(() => {
        this.success('提交成功')
        this.amount = 200
        this.price = 0
      }).catch(this.error)
    },
    buy() {
      if (this.loadings.buy) return
      this.loadings.buy = true
      this.submitOrder({ direction: 'buy' })
        .then(() => this.loadings.buy = false)
        .catch(() => this.loadings.buy = false)
    },
    sell() {
      if (this.loadings.sell) return
      this.loadings.sell = true
      this.submitOrder({ direction: 'sell' })
        .then(() => this.loadings.sell = false)
        .catch(() => this.loadings.sell = false)
    },
    openOrder(dir) {
      if (dir === 'buy') this.buy()
      if (dir === 'sell') this.sell()
    },
    fastBuy() {
      if (this.loadings.fastBuy) return
      this.loadings.fastBuy = true
      let price = +this.kdb.orderbooks.bids[0].price + 0.0001

      this.submitOrder({
        direction: 'buy',
        amount: 50,
        price
      }).then(() => this.loadings.fastBuy = false)
        .catch(() => this.loadings.fastBuy = false)
    },
    fastSell() {
      if (this.loadings.fastSell) return
      this.loadings.fastSell = true
      let price = +this.kdb.orderbooks.asks[0].price - 0.0001

      this.submitOrder({
        direction: 'sell',
        amount: 50,
        price
      }).then(() => this.loadings.fastSell = false)
        .catch(() => this.loadings.fastSell = false)
    },
    fastOrder(dir) {
      if (dir === 'buy') this.fastBuy()
      if (dir === 'sell') this.fastSell()
    },
    sendEmail() {
      _fetch({
        type: 'post',
        url: 'ripple/email',
        data: {
          xrp: this.balances.XRP,
          cny: this.balances.CNY,
          asset: this.asset,
          bid: this.kdb.orderbooks.bids[0].price,
          ask: this.kdb.orderbooks.asks[0].price
        }
      }).then(() => {})
    },
    selectTab(i) {
      this.tab = i
    }
  },
  created() {
    if (sessionStorage.authKey) {
      KEY = sessionStorage.authKey
      this.showContainer = true

      this.getBalances()
      this.getKdb()
    }
  }
})
