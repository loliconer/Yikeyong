const fs = require('fs')

let app = process.argv[2], title = process.argv[3]
let name = app.split('/').join('-')

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <title>${title} | 亦可用</title>
  <link rel="icon" href="/img/favicon.ico" type="image/x-icon">
  <link rel="stylesheet" href="/css/vendor/lovue.min.css">
  <script src="/js/vendor/iconfont.js"></script>
  <script src="/js/vendor/vue.runtime.js"></script>
  <script src="/js/vendor/lovue.min.js"></script>
</head>
<body>
<app></app>
</body>
</html>
`

if (app.includes('/')) {
  const htmlDir = `public/${app.split('/')[0]}`
  if (!fs.existsSync(htmlDir)) fs.mkdirSync(htmlDir)
}
fs.writeFile(`public/${app}.html`, html, () => {})

const js = `import 'src/js/lib/common'
import App from './App.vue'

new Vue({
  render: h => h(App)
}).$mount('app')
`

fs.mkdirSync(`src/pages/${app}`, {
  recursive: true
})

fs.writeFile(`src/pages/${app}/app.js`, js, () => {})

const less = `@import (reference) "~src/less/Bootstrapping/Mixins";
`
fs.writeFile(`src/pages/${app}/app.less`, less, () => {})

const vue = `<template>
  <div id="app">
    <yky-nav></yky-nav>

    <div class="container">
    </div>
    
    <yky-footer></yky-footer>
  </div>
</template>

<script>
  import './app.less'

  export default {
    name: 'App',
    data() {
      return {}
    }
  }
</script>
`
fs.writeFile(`src/pages/${app}/App.vue`, vue, () => {})

