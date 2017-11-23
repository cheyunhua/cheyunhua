// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: process.env.NODE_ENV === 'production'?require('./buildprod.env.js')
    :(process.env.NODE_ENV === 'test'?require('./buildtest.env.js')
    :(process.env.NODE_ENV === 'dev'?require('./builddev.env.js')
    :(process.env.NODE_ENV === 'local'?require('./buildlocal.env.js')
    :require('./buildpreprod.env.js')))),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    //assetsPublicPath: '/vip/',
    assetsPublicPath:(process.env.NODE_ENV === 'production'|| process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'preproduction' || process.env.NODE_ENV === 'dev')?"/wechat/"
    :(process.env.NODE_ENV === 'local'?'/tree/front/':"/") ,
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8011,
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
    proxyTable: {
    //过网关
    //微信模块+授权模块
        '/wechatAuth' :{
            target: 'http://10.10.0.206:8989',
            changeOrigin: true
        },
      '/wechat' :{
        target: 'http://10.10.0.206:8989',
        changeOrigin: true
      },
    /* '/wechat' :{
        target: 'http://wx.jchl.com/gateway',
        changeOrigin: true
      },*/
      '/ehall' :{
        target: 'http://10.10.0.206:8989',
        changeOrigin: true
      },
      '/auth' :{
        target: 'http://10.10.0.206:8989',
        changeOrigin: true
      },
      '/activity' :{
        target: 'http://10.10.0.206:9001/gateway',
        changeOrigin: true
      },
      '/customer' :{
        target: 'http://10.10.0.206:8989',
        changeOrigin: true
      },
      '/front': {
        target: 'http://10.10.0.206:8620',
        changeOrigin: true
        // pathRewrite: {
        //   '^/front': '/front'
        // }
      },
      //订单模块
      '/ordercenter':{
         target: 'http://10.10.0.206:8989',
         changeOrigin: true
      },
      //商品模块
      '/product':{
         target: 'http://10.10.0.206:8989',
         changeOrigin: true
      },

      //cdn代理 --开发需要时放开
      '/weChatMall':{
         target: 'http://cdn.jchl.com',
         changeOrigin: true
      },
      '/outter':{
         target: 'http://10.10.0.206:8530',
         changeOrigin: true
      },
      //不过网关
    /*  '/wechat':{
            target: 'http://10.10.0.206:8620',
            changeOrigin: true，
            pathRewrite: {
                '^/wechat/': '/'
            }
       },
        '/wechatAuth/':{
            target: 'http://10.10.0.206:8630',
            changeOrigin: true,
            pathRewrite: {
                '^/wechatAuth/': '/'
            }
        },
        '/order':{
            target: 'http://10.10.0.206:8550',
            changeOrigin: true,
            pathRewrite: {
                '^/order': '/'
            }
        },
         '/product':{
            target: 'http://10.10.0.206:8540',
            changeOrigin: true,
            pathRewrite: {
                '^/product': '/'
            }
        },*/
        '/cms':{
            target: 'http://10.10.0.206:8989',
            changeOrigin: true
        },
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
