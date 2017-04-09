const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

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
  context: __dirname,
  // devtool: false,
  entry: entries(),
  output: {
    path: "public/js",
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  resolve: {
    /*自动扩展文件名后缀，require模块的时候可以省略后缀*/
    extensions: ['', '.json', '.js'],
    fallback: [path.join(__dirname, './node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  babel: {
    plugins: ['transform-runtime']
  }
};
