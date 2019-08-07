const path = require('path')
const fs = require('fs')

function findEntries(dir, target, parents = []) {
  const files = fs.readdirSync(dir, {
    withFileTypes: true
  })
  let result = {}

  for (let file of files) {
    if (file.name === target) {
      result[parents.join('/')] = `${dir}/app.js`
      continue
    }

    if (file.isDirectory()) {
      result = {
        ...result,
        ...findEntries(`${dir}/${file.name}`, target, [...parents, file.name])
      }
    }
  }

  return result
}

class ReplaceVendorsPlugin {
  constructor() {}

  apply(compiler) {
    compiler.hooks.compilation.tap(this.constructor.name, compilation => {
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(this.constructor.name, htmlPluginData => {
        htmlPluginData.html = htmlPluginData.html.replace('vue.runtime.js', 'vue.runtime.min.js')
        return htmlPluginData
      })
    })
  }
}

module.exports = {
  css: {
    loaderOptions: {
      less: {
        strictMath: 'on'
      }
    }
  },
  pages: findEntries('./src/pages', 'app.js'),
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8091',
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  },
  configureWebpack: {
    externals: {
      vue: 'Vue'
    },
    resolve: {
      extensions: ['*', '.js', '.vue', '.json'],
      alias: {
        src: path.join(__dirname, 'src')
      }
    },
    plugins: process.env.NODE_ENV === 'production' ? [
      new ReplaceVendorsPlugin()
    ] : []
  }
}
