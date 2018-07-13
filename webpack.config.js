const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const argv = require('yargs').argv

function entries() {
  let basePath = './src/js',
    obj = {},
    files = fs.readdirSync(basePath)

  files.forEach(file => {
    let stat = fs.statSync(basePath + '/' + file)
    let name = file.slice(0, -3)

    if (stat.isFile()) {
      obj[name] = basePath + '/' + file
    }
  })

  return obj
}

let _entries = {}, plugins, devtool
if (argv.env) {
  argv.env.file.split(',').forEach(file => {
    _entries[file] = `./src/js/${file}.js`
  })
} else {
  _entries = entries()
}

if (argv.mode === 'development') {
  plugins = [
    new VueLoaderPlugin()
  ]
}
if (argv.mode === 'production') {
  devtool = 'cheap-module-source-map'
  plugins = [
    new VueLoaderPlugin(),
    new UglifyJSPlugin({ sourceMap: true }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production')}
    })
  ]
}

module.exports = {
  // devtool: false,
  entry: entries(),
  output: {
    path: __dirname + '/public/js',
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  stats: {
    entrypoints: false
  },
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: { loader: 'vue-loader' }
      },
      {
        test: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node-modules/,
        use: { loader: 'babel-loader' }
      }
    ]
  },
  devtool,
  plugins
}
