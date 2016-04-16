var webpack = require( 'webpack' );

module.exports = {
    context: __dirname,
    devtool: false,
    entry: {
        // index: './src/public/js/index.js'
    },
    output: {
        path: __dirname + "/src/public/js",
        filename: '[name].bundle.js'
    },
    resolve: {
        moduleDirectories: [
            'js',
            'node_modules'
        ],
        /*自动扩展文件名后缀，require模块的时候可以省略后缀*/
        extensions: [ '', '.json', '.js', '.less' ]
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoErrorsPlugin(),
        // new webpack.IgnorePlugin( /^\.\/locale$/, /moment$/ ),
        /*new webpack.DefinePlugin( {
            "process.env": {
                "NODE_ENV": JSON.stringify( 'development' )
            }
        } ),*/
        // new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
        // new webpack.optimize.UglifyJsPlugin( { mangle: false, sourcemap: false } ),
        // new webpack.optimize.CommonsChunkPlugin( 'common.js' )
    ]
};