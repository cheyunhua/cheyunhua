/**
 * util api
 */
import config from './config'
const wxUrl = config.wxUrl
const wxAppId = config.wxAppId
const appId = config.appId
const WX_USER_TOKEN = 'wx.user.token'
const devName = ''
const devToken ='';
var guidGenerator = function() {
	return(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
var getUUID = function() {
	return(guidGenerator() + guidGenerator() + guidGenerator() + guidGenerator() + guidGenerator() + guidGenerator() + guidGenerator() + guidGenerator())
}

export default {
 // 获取url参数封装方法
  calculateLoginTime(loginTime){

       loginTime = (!loginTime || loginTime == null) ? new Date().getTime():loginTime;
       console.log("时间loginTime"+loginTime);
       var current_time = new Date().getTime();
       console.log("时间current_time"+current_time);
       console.log("时间"+(current_time - loginTime));
       return (current_time - loginTime < 7*24*1000*60*60);
     },

    getInterUrl(appName,url){
   	return '/'+appName + devName + url+"?requestId="+getUUID()+"&appId="+appId+"&token=" +(!devToken?global.localStorage.getItem(WX_USER_TOKEN):devToken);
    },

    getSelectTransformUrl(url){
        let appName = process.env.NODE_ENV === 'test' ? '/accProxy'
      : (process.env.NODE_ENV === 'production' ? '/wechat2'
      : (process.env.NODE_ENV === 'dev' ? '/accProxy'
      : (process.env.NODE_ENV === 'preproduction' ? '/accProxy'
      : (process.env.NODE_ENV === 'local' ? '/accProxy'
      :'/accProxy'))));
    return appName + devName + url+"?requestId="+getUUID()+"&appId="+appId+"&token=" +(!devToken?global.localStorage.getItem(WX_USER_TOKEN):devToken);
   }
}
