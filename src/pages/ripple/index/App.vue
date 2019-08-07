<template>
  <div id="app">
    <yky-nav></yky-nav>

    <div class="container">
      <section class="sec-balances">
        <v-radio-group :source="gateways" v-model="gateway"></v-radio-group>
        <v-button v-show="!kdb.connected" @click="restart">重启</v-button>

        <v-icon :icon="kdb.connected ? 'link' : 'unlink'"></v-icon>

        <span>余额：</span>
        <span>XRP: {{balances.XRP}}</span>
        <span>CNY: {{balances.CNY}}</span>
        <span>Fee: {{kdb.fee}}</span>
        <span>总资产：{{asset}}</span>
      </section>

      <section class="sec-orders">
        <table class="table bordered">
          <thead>
          <tr>
            <th>Direction</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="o of kdb.orders">
            <td>{{o.direction}}</td>
            <td>{{o.direction === 'buy' ? (1 / Number(o.price)).toFixed(5) : o.price}}</td>
            <td>{{o.amount}}</td>
            <td>
              <v-button :loading="o.loading" @click="cancelOrder(o)">撤单</v-button>
            </td>
          </tr>
          </tbody>
        </table>
      </section>

      <section class="sec-buy-sell">
        <div class="cell-buy">
          <v-button :loading="loadings.fastBuy" @click="fastOrder('buy')">快速挂单</v-button>
          <v-input type="number" placeholder="数量" v-model.number="amount"></v-input>
          <v-input type="number" placeholder="价格" v-model.number="price"></v-input>
          <v-button :loading="loadings.buy" @click="openOrder('buy')">买</v-button>
        </div>

        <div class="cell-sell">
          <v-button :loading="loadings.fastSell" @click="fastOrder('sell')">快速挂单</v-button>
          <v-input type="number" placeholder="数量" v-model.number="amount"></v-input>
          <v-input type="number" placeholder="价格" v-model.number="price"></v-input>
          <v-button :loading="loadings.sell" @click="openOrder('sell')">卖</v-button>
        </div>
      </section>

      <section class="sec-order-books">
        <div class="o-bids">
          <table class="table bordered">
            <thead>
            <tr>
              <th>Address</th>
              <th>Size</th>
              <th>Price</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="bid of kdb.orderbooks.bids">
              <td>{{bid.address}}</td>
              <td>{{bid.size}}</td>
              <td>{{bid.price}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="o-asks">
          <table class="table bordered">
            <thead>
            <tr>
              <th>Price</th>
              <th>Size</th>
              <th>Address</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="ask of kdb.orderbooks.asks">
              <td>{{ask.price}}</td>
              <td>{{ask.size}}</td>
              <td>{{ask.address}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>

    <yky-footer></yky-footer>
  </div>
</template>

<script>
  import './app.less'
  import {$fetch} from 'lovue/dist/utils.esm'

  export default {
    name: 'App',
    data() {
      return {
        gateways: [
          { name: 'China', value: 'china' },
          { name: 'Fox', value: 'fox' }
        ],
        gateway: 'china',
        balances: {},
        kdb: {
          orderbooks: {
            bids: [],
            asks: []
          },
          fee: 0,
          orders: [],
          connected: true
        },
        openOrders: [],
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
        },
        transactions: []
      }
    },
    methods: {
      async getBalances() {
        const myAddress = 'rHJ9vCnbfF2VzMBoaQnTA2J6stWZGNeJun'
        const counterparty = 'razqQKzJRdB4UxFPWf5NEpEG3WMkmwgcXA'

        // const body = await
      },
      async getKdb() {
        const body = await $fetch.get(`ripple/kdb?gateway=${this.gateway}`).catch(this.error)
        if (body === undefined) return this.kdb.connected = false

        this.kdb = body
        this.orderCount = body.orders.length
        this.setTitle()
        setTimeout(() => this.getKdb(), 2000)
      },
      setTitle() {
        document.title = `${this.kdb.orderbooks.bids[0].price} / ${this.kdb.orderbooks.asks[0].price} | Ripple`
      },
      restart() {
        $fetch.get('/api/ripple/restart').catch(this.error)
      },
      async cancelOrder(order) {
        if (order.loading) return
        order.loading = true

        const body = await $fetch.delete(`/api/ripple/orders/${order.sequence}`).catch(this.error)
        order.loading = false
        if (body === undefined) return

        this.success('取消成功')
      },
      fastOrder(dir) {
        if (dir === 'buy') this.fastBuy()
        if (dir === 'sell') this.fastSell()
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
    },
    created() {
      this.getBalances()
      this.getKdb()
    }
  }
</script>
