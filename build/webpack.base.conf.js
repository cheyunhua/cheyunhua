var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var webpack = require("webpack")
var env = process.env.NODE_ENV
// check env & config/index.js to decide whether to enable CSS source maps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd
/*var CopyWebpackPlugin = require('copy-webpack-plugin');

new CopyWebpackPlugin([{
  from: __dirname + '/src/assets/images/focus'
}])*/

module.exports = {
  entry: {
    index: './src/main.js'
  },
  externals: {
    'BMap': 'BMap'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: (process.env.NODE_ENV === 'production'
      || process.env.NODE_ENV === 'test'
      || process.env.NODE_ENV === 'preproduction'
      || process.env.NODE_ENV === 'dev'
      || process.env.NODE_ENV === 'local') ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.json'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'api': path.resolve(__dirname, '../src/api')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
/*    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: [
          path.join(projectRoot, 'src')
        ],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: [
          path.join(projectRoot, 'src')
        ],
        exclude: /node_modules/
      }
    ],*/
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          path.join(projectRoot, 'src')
        ],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('font/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),


  ],
}
