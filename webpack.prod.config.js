const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const UglifyEsPlugin = require('uglify-es-webpack-plugin')

function entries() {
  let basePath = './src/js',
    obj = {},
    files = fs.readdirSync(basePath)

  files.forEach(file => {
    let stat = fs.statSync(basePath + '/' + file)
    let name = file.slice(0, -3)

    if (stat.isFile() && name !== 'admin') {
      obj[name] = basePath + '/' + file
    }
  })

  return obj
}

module.exports = {
  entry: entries(),
  output: {
    path: __dirname + '/public/js',
    publicPath: '/',
    filename: '[name].bundle.js'
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
        use: [{ loader: 'vue-loader' }]
      },
      {
        test: /\.js$/,
        use: [{ loader: 'babel-loader' }]
      }
    ]
  },
  plugins: [
    new UglifyEsPlugin({ compress: { warnings: false } }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};
