const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

function entries() {
  let basePath = './src/js',
    obj = {},
    files = fs.readdirSync(basePath)

  files.forEach(file => {
    let stat = fs.statSync(basePath + '/' + file)
    if (stat.isFile()) {
      let name = file.slice(0, -3)
      obj[name] = basePath + '/' + file
    }
  })

  return obj
}

module.exports = {
  context: __dirname,
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
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(),
    // new webpack.IgnorePlugin( /^\.\/locale$/, /moment$/ ),
    // new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourcemap: false,
      compress: {
        warnings: false
      }
    })
  ],
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
