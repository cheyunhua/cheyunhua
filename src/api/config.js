import Qs from 'qs'
//  baseURL 请求后台网关地址  wxUrl 微信url   trackUrl 埋点js地址
export default{
  url: '/route',
  baseURL: process.env.NODE_ENV === 'test' ? 'http://twx.jchl.com/gateway'
      : (process.env.NODE_ENV === 'production' ? 'http://wx.jchl.com/gateway'
      : (process.env.NODE_ENV === 'dev' ? 'http://app.esv.com.cn/gateway'
      : (process.env.NODE_ENV === 'preproduction' ? 'http://prwx.jchl.com/gateway'
      : (process.env.NODE_ENV === 'local' ? 'http://appserver.wintax.cn/tree/back'
      :'http://localhost:8011')))),
      // :'http://10.10.11.199:8620')))),
      // :'http://10.10.0.206:8620')))),
      // :(process.env.NODE_ENV === 'preproduction'?'http://pxwx.jchl.com/gateway':'http://localhost:8011')),

  wxUrl: process.env.NODE_ENV === 'test' ? 'twx.jchl.com'
      : (process.env.NODE_ENV === 'production' ? 'wx.jchl.com'
      : (process.env.NODE_ENV === 'dev' ? 'app.esv.com.cn/wechatAuth'
      : (process.env.NODE_ENV === 'preproduction' ? 'prwx.jchl.com' : 'twx.jchl.com'))),
      // :(process.env.NODE_ENV === 'preproduction'?'pxwx.jchl.com':'twx.jchl.com')),
  wxAppId: process.env.NODE_ENV === 'test' ? 'wxf4165bbc217ec388'
      : (process.env.NODE_ENV === 'production' ? 'wx35102306dfc2506e'
      : (process.env.NODE_ENV === 'dev' ? 'wx6f6e12681df4bd95'
      : (process.env.NODE_ENV === 'preproduction' ? 'wxb9f690e3746e23b2' : 'wxf4165bbc217ec388'))),
      // :(process.env.NODE_ENV === 'preproduction'?'wxcb49043c3aee1b8c':'wxf4165bbc217ec388')),
  trackUrl: process.env.NODE_ENV === 'test' ? 'http://omni.esv.com.cn/behavior/script/maidian.js'
    : (process.env.NODE_ENV === 'production' ? 'http://xwfx.jchl.com/maidian.js'
    : (process.env.NODE_ENV === 'dev' ? 'http://omni.esv.com.cn/behavior/script/maidian.js'
    : (process.env.NODE_ENV === 'preproduction' ? 'http://xwfx.jchl.com/maidian.js' : 'http://omni.esv.com.cn/behavior/script/maidian.js'))),
  cmsImgvUrl: process.env.NODE_ENV === 'test' ? 'http://test.pxpt.wintax.cn/resource'
    : (process.env.NODE_ENV === 'production' ? 'http://cms-cdn.jchl.com/vfs_home'
    : (process.env.NODE_ENV === 'dev' ? 'http://test.pxpt.wintax.cn/resource'
    : (process.env.NODE_ENV === 'preproduction' ? 'http://cms-cdn.jchl.com/vfs_home' : 'http://test.pxpt.wintax.cn/resource'))),
  wxImgvUrl: process.env.NODE_ENV === 'test' ? 'http://twx.jchl.com/resource'
    : (process.env.NODE_ENV === 'production' ? 'http://wx.jchl.com/resource'
    : (process.env.NODE_ENV === 'dev' ? 'http://app.esv.com.cn/wxresource'
    : (process.env.NODE_ENV === 'preproduction' ? 'http://prwx.jchl.com/resource' : 'http://app.esv.com.cn/wxresource'))),
  cdnUrl: process.env.NODE_ENV === 'test' ? 'http://tcdn.jchl.com'
    : (process.env.NODE_ENV === 'production' ? 'http://cdn.jchl.com'
    : (process.env.NODE_ENV === 'dev' ? 'http://dcdn.jchl.com'
    : (process.env.NODE_ENV === 'preproduction' ? 'http://cdn.jchl.com' : 'http://10.10.0.213:8912/wxresource'))),
  xyUrl: process.env.NODE_ENV === 'test' ? 'http://test.jchl.com:28080/mobile/index'
         : (process.env.NODE_ENV === 'production' ? 'http://xy.jchl.com/mobile/index'
            : (process.env.NODE_ENV === 'dev' ? 'http://tq.jchl.com/mobile/index'
                : (process.env.NODE_ENV === 'preproduction' ? 'http://xy.jchl.com/mobile/index' : 'http://tq.jchl.com/mobile/index'))),
    encodeUrl: process.env.NODE_ENV === 'test' ? 'http://t.vanvy.cn:8082/Web/Im/mobile.html'
        : (process.env.NODE_ENV === 'production' ? 'http://t.vanvy.cn:8082/Web/Im/mobile.html'
            : (process.env.NODE_ENV === 'dev' ? 'http://t.vanvy.cn:8082/Web/Im/mobile.html'
                : (process.env.NODE_ENV === 'preproduction' ? 'http://t.vanvy.cn:8082/Web/Im/mobile.html' : 'http://t.vanvy.cn:8082/Web/Im/mobile.html'))),

    appId: '000101',
  method: 'POST',
/* transformRequest: [function (data) {
// 为了避免qs格式化时对内层对象的格式化先把内层的对象转为
   data = JSON.stringify(data);
// 由于使用的form-data传数据所以要格式化
   data = Qs.stringify(data);
   return data;
   }],
*/
//  ...mapActions([USER_SIGNIN]),
  transformResponse: [function (data) {
    return data
  }],
  headers: {'Content-Type': 'application/json; charset=utf-8'},
  params: {
  },
  paramsSerializer: function (params) {
    return Qs.stringify(params)
  },
  data: {
  },
  timeout: 20000,
  withCredentials: false, // default
  responseType: 'json', // default
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },
  onDownloadProgress: function (progressEvent) {
   // Do whatever you want with the native progress event
  },
  maxContentLength: 2000,
  validateStatus: function (status) {
    return status >= 200 && status < 300// default
  },
  maxRedirects: 5// default
}
