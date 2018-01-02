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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(option.data)
    },
    form: {
      method: 'post',
      body: option.data
    },
    put: {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(option.data)
    },
    putForm: {
      method: 'put',
      body: option.data
    },
    delete: {
      method: 'delete'
    }
  };

  let requestOption = allOptions[option.type];

  requestOption.credentials = 'same-origin';
  requestOption.headers = requestOption.headers || {};
  requestOption.headers['Accept'] = 'application/json';
  if (option.type !== 'get') {
    requestOption.headers['X-CSRFToken'] = sessionStorage.csrf;
  }

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
        throw config$1.errorMsg[body.code] || body.msg || body
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
    asset: 0
  },
  watch: {
    orderCount() {
      this.warn('有更新')
      this.sendEmail()
    }
  },
  methods: {
    triggerUpdate() {
      this.trigger = !this.trigger
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
        })
    },
    getKdb() {
      _fetch(`ripple/kdb`)
        .then(body => {
          this.kdb = body
          this.orderCount = body.orders.length
          setTimeout(() => this.getKdb(), 2000)
        })
    },
    cancelOrder(sequence) {
      _fetch({
        type: 'delete',
        url: `ripple/orders/${sequence}`
      }).then(() => {
        this.success('取消成功')
      })
    },
    openOrder(dir) {
      _fetch({
        type: 'post',
        url: 'ripple/order',
        data: {
          direction: dir,
          amount: this.amount,
          price: this.price
        }
      }).then(() => {
        this.success('提交成功')
        this.amount = 200
        this.price = 0
      })
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
    }
  },
  mounted() {
    this.getBalances()
    this.getKdb()
  }
})
