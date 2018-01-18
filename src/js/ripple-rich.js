let KEY = ''

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
    richers: [
      'rpawRpdVm7rb6k8dXBadHZNWEXd7bEZh9v',
      'rL29PRqMMLoWUVSxYt4FvriMvp7Dp21TGk',
      'rahPVT3BBNv5YaUUedUcXvtoiDhNTzaT5N',
      'r4dJFovm7tjfJXc6DKSfXAesqpNgy2kSRK',
      'r4vm2Kyy2ty7XioK85aAaLeit1HCsUdnx',
      'rwU9Vh5DWRc6fxEofvsxi2UQR85ceSPrxs',
      'rBe13Wkjm69fHb1Ptu5WgZXEyLVFCNe4Xa',
      'rJ2jVcio1WHcs6gd78c7jmewyR6Pji8NAz'
    ],
    balances: {},
    kdb: {
      orderbooks: {
        bids: [],
        asks: []
      },
      fee: 0,
      orders: []
    }
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
    getBalances(account) {
      _fetch(`https://data.ripple.com/v2/accounts/${account}/balances`)
        .then(body => {
          body.balances.forEach(b => {
            if (b.currency === 'XRP') {
              this.balances[account].XRP = Number(b.value)
            }
            if (b.counterparty === 'razqQKzJRdB4UxFPWf5NEpEG3WMkmwgcXA') {
              this.balances[account].CNY = Number(b.value)
            }
          })
          this.triggerUpdate()
        }).catch(error => {
          // setTimeout(() => this.getBalances(), 6000)
          this.error(error)
        })
    },
    getOpenorders(address) {
      _fetch(`ripple/openorders?address=${address}`)
        .then(body => {
          this.balances[address].openorders = body
          this.triggerUpdate()
        }).catch(this.error)
    },
    getKdb() {
      _fetch('ripple/kdb')
        .then(body => {
          this.kdb = body
          this.orderCount = body.orders.length
          setTimeout(() => this.getKdb(), 2000)
        })
    }
  },
  created() {
    this.richers.forEach(rich => {
      this.balances[rich] = {}
      this.getBalances(rich)
      this.getOpenorders(rich)
    })
  }
})

