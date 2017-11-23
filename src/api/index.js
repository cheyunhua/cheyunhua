import axios from 'axios'
import config from './config'
import utilConfig from './util'
import {commonParams, options} from '../common/js/config'
import jsonp from '../common/js/jsonp'
const WX_USER_TOKEN = 'wx.user.token'
const devName = ''
const wechat='wechat'
const wechatAuth='wechatAuth'
// 微信url
const wxUrl = config.wxUrl
const wxAppId = config.wxAppId
const appId = config.appId

var guidGenerator = function() {
	return(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
var getUUID = function() {
	return(guidGenerator() + guidGenerator() + guidGenerator() + guidGenerator() + guidGenerator() + guidGenerator() + guidGenerator() + guidGenerator())
}

export default {
	// 获取url参数封装方法
	getQueryString(name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
		var r = window.location.search.substr(1).match(reg)
		if(r != null) return unescape(r[2]);
		return null
	},

    authlogin(param) {
        var url = 'http://'+config.wxUrl + devName + '/auth/wechatCommonService/wechatAuthLogin?requestId=' + getUUID() +'&appId=' + appId+'&wechatCode='+param.wechatCode+'&menuCode='+param.menuCode
        return url;
    },


    getQrCode(param) {
        var method = '/'+wechat + devName + '/thirdparty/ocsp/scan/getQrCode?requestId=' + getUUID() +'&appId=' +appId
        return axios.post(method, JSON.stringify(param), config)
    },


    loginscan(param) {
        var method = '/'+wechat + devName + '/thirdparty/ocsp/scan/loginscan?requestId=' + getUUID() +'&appId=' + appId
        return axios.post(method, JSON.stringify(param), config)
    },
    listenscan(param) {
        var method = '/'+wechat + devName + '/thirdparty/ocsp/scan/listenscan?requestId=' + getUUID() +'&appId=' + appId
        return axios.post(method, JSON.stringify(param), config)
    },
	captcha(param) {
		var method = '/'+wechat + devName + '/front/loginService/getValidateCode?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	wechatCaptcha(param) {
		var method = '/'+wechatAuth + devName + '/auth/wechatCommonService/getWxCaptcha?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	unifiedLogin(param) {
		var method = '/'+wechatAuth + devName + '/auth/wechatCommonService/unifiedLogin?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	getBindCaptcha(param) {
		var method = '/'+wechatAuth + devName + '/auth/wechatCommonService/getBindCaptcha?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	login(param) {
		var method = '/'+wechat + devName + '/front/loginService/login?requestId=' + getUUID() + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	wechatLogin() {
		var url = config.baseURL + '/'+wechatAuth + devName + '/auth/wechatCommonService/wechatLogin?requestId=' + getUUID() + '&appId=' + appId
		return url
	},
	loginAsync() {
		var url = config.baseURL + '/'+wechatAuth + devName + '/auth/wechatCommonService/autoLogin?requestId=' + getUUID() + '&appId=' + appId
		return url
	},
	queryUserInfoByUserId(param) {
		var method = '/'+wechat + devName + '/front/chatWebService/getUserInfoByUserId?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
    queryCustfoByUserId(param) {//根据userid查询企业信息
        var method = '/'+wechat + devName + '/front/chatWebService/getCustInfoByUserId?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
        return axios.post(method, JSON.stringify(param), config)
    },
	// 待办查询
	querywaitHandleLists(param) {
		var method = '/'+wechat + devName + '/front/waitHandleService/waitHandleLists?requestId=' + getUUID() + '&appId=' + appId + '&token=' + global.localStorage.getItem(WX_USER_TOKEN)
		return axios.post(method, JSON.stringify(param), config)
	},
	// 确认待办
	sureHandle(param) {
		var method = '/'+wechat + devName + '/front/waitHandleService/sureHandle?requestId=' + getUUID() + '&appId=' + appId + '&token=' + global.localStorage.getItem(WX_USER_TOKEN)
		return axios.post(method, JSON.stringify(param), config)
	},
	// 查询取单
	queryIndentLists(param) {
		var method = '/'+wechat + devName + '/front/InvokerService/takeSingle?requestId=' + getUUID() + '&appId=' + appId + '&token=' + global.localStorage.getItem(WX_USER_TOKEN)
		return axios.post(method, JSON.stringify(param), config)
	},
	// 查询取单
	queryIndentListsBywqd(param) {
		var method = '/'+wechat + devName + '/front/InvokerService/takeSingleByGdIdNew?requestId=' + getUUID() + '&appId=' + appId + '&token=' + global.localStorage.getItem(WX_USER_TOKEN)
		return axios.post(method, JSON.stringify(param), config)
	},
	// 查询记账
	queryTallyLists(param) {
		var method = '/accProxy' + devName + '/front/InvokerService/getAccounting?requestId=' + getUUID() + '&appId=' + appId + '&token=' + global.localStorage.getItem(WX_USER_TOKEN)

        //method = utilConfig.getSelectTransformUrl('/front/InvokerService/getAccounting');

        param.token = global.localStorage.getItem(WX_USER_TOKEN);

        return axios.post(method, JSON.stringify(param), config)
	},
	// 查询记账
	queryTallyListsByBeiJing(param) {
		var method = '/accProxy' + devName + '/front/InvokerService/getAccountingByBeiJing?requestId=' + getUUID() + '&appId=' + appId + '&token=' + global.localStorage.getItem(WX_USER_TOKEN)
	   // method = utilConfig.getSelectTransformUrl('/front/InvokerService/getAccountingByBeiJing');
	    param.token = global.localStorage.getItem(WX_USER_TOKEN);
		return axios.post(method, JSON.stringify(param), config)
	},
	// 查询记账
	queryTallyListsByYZF(param) {
		var method = '/accProxy' + devName + '/front/InvokerService/getAccountingByYZF?requestId=' + getUUID() + '&appId=' + appId + '&token=' + global.localStorage.getItem(WX_USER_TOKEN)
		 //method = utilConfig.getSelectTransformUrl('/front/InvokerService/getAccountingByYZF');
	     param.token = global.localStorage.getItem(WX_USER_TOKEN);
		return axios.post(method, JSON.stringify(param), config)
	},
	// 查询报税
	queryDutiableLists(param) {
		var method = '/accProxy' + devName + '/front/InvokerService/getTaxReturn?requestId=' + getUUID() + '&appId=' + appId + '&token=' + global.localStorage.getItem(WX_USER_TOKEN)
        //method = utilConfig.getSelectTransformUrl('/front/InvokerService/getTaxReturn');
        param.token = global.localStorage.getItem(WX_USER_TOKEN);
        return axios.post(method, JSON.stringify(param), config)
	},
    // 查询报税
    queryDutiableListsByYZF (param) {
        var method = '/accProxy' + devName + '/front/InvokerService/getTaxReturnByYZF?requestId=' + getUUID() + '&appId=' + appId + '&token=' + global.localStorage.getItem(WX_USER_TOKEN)
        //method = utilConfig.getSelectTransformUrl('/front/InvokerService/getTaxReturnByYZF');
	    param.token = global.localStorage.getItem(WX_USER_TOKEN);
        return axios.post(method, JSON.stringify(param), config)
    },
	// 查询企业服务信息
	queryCusServiceLists(param) {
		console.info(JSON.stringify(config))
		var method = '/'+wechat + devName + '/front/CusService/cusServiceLists?requestId=' + getUUID() + '&appId=' + appId + '&token=' + global.localStorage.getItem(WX_USER_TOKEN)
		return axios.post(method, JSON.stringify(param), config)
	},
	queryFactoryInfo(param) {
		var method = '/'+wechat + devName + '/front/chatWebService/queryFactoryInfo?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	// 根据企业id查询企业信息
	querycustomerBycusId(param) {
		var method = '/'+wechat + devName + '/front/chatWebService/queryCustomerBycusId?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	accessImcc(param) {
		var method = '/'+wechat + devName + '/front/onlineService/onlienInterface?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	startManService() {
		var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + wxAppId + '&redirect_uri=http%3A%2F%2F' + wxUrl + '%2Fthirdparty%2Focsp%2FstartManService&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
		return url
	},
	// 根据手机号码查询企业列表
	queryCustomerListByMobile(param) {
		var method = '/'+wechat + devName + '/front/CusService/queryCustomerListByMobile?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	// 根据纳税人或企业号查询
	queryCustomerByNo(param) {
		var method = '/'+wechat + devName + '/front/CusService/queryCustomerByNo?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	// 绑定联系人和客户（目前只能单个绑定）
	bindWeChatCustomer(param) {
		var method = '/'+wechat + devName + '/front/CusService/bindWeChatCustomer?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	// 绑定联系人和客户（目前只能单个绑定）--同步
	bindWeChatCustomerAsync() {
		var url = config.baseURL + '/'+wechat + devName + '/front/CusService/bindWeChatCustomer?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return url
	},
	// 查询报名列表
	pageTrainDataAddress(param) {
		var method = '/'+wechat + devName + '/front/trainService/pageTrainDataAddress?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	// 预约报名
	enrollTrain(param) {
		var method = '/'+wechat + devName + '/front/trainService/enrollTrain?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	localLogin(param) {
		// param.wechatCode = 'WECHAT_CUS'
		var method = '/'+wechatAuth + devName + '/auth/wechatCommonService/localLogin?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
    autoLogin(param) {
        // param.wechatCode = 'WECHAT_CUS'
        var method = '/'+wechatAuth + devName + '/auth/wechatCommonService/autoLogin?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
        return axios.post(method, JSON.stringify(param), config)
    },
	// 绑定企业之后发送消息到微信客户端
	bindAfterSendMsg(param) {
		var method = '/'+wechat + devName + '/front/CusService/bindAfterSendMsg?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	// 退出登录
	logout() {
		var param = {}
		param.token = global.localStorage.getItem(WX_USER_TOKEN)
		console.log(param)
		var method = '/'+wechat + devName + '/front/chatWebService/unBingingWechat?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	// 人工客服
	startArtificiallyService(param) {
		var method = '/'+wechat + devName + '/thirdparty/ocsp/startArtificiallyService?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	// ca查询
	queryCaFile(param) {
		var method = '/'+wechat + devName + '/thirdparty/ocsp/wechatCaFileService/queryCaFile?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		// var method = '/thirdparty/ocsp/wechatCaFileService/queryCaFile?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	// ca删除
	deleteCaFile(param) {
		var method = '/'+wechat + devName + '/thirdparty/ocsp/wechatCaFileService/deleteCaFile?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		// var method ='/thirdparty/ocsp/wechatCaFileService/deleteCaFile?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
    // 客服用户绑定
    userBind(param) {
        var method = '/'+wechat + devName + '/thirdparty/ocsp/wechatUserSignService/userBind?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
        return axios.post(method, JSON.stringify(param), config)
    },
	// 人员签到
	signIn(param) {
		var method = '/'+wechat + devName + '/thirdparty/ocsp/wechatUserSignService/userSign?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	//人员签到（多公司）
	userSignList(param) {
		var method = '/'+wechat + devName + '/thirdparty/ocsp/wechatUserSignService/userSignList?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	//人员签到（多公司）（运营平台接口）
	saveTrainSign(param) {
		var method = '/customer' + devName + '/front/trainService/saveTrainSign?requestId=' + getUUID() + '&token=02a979437f28491696c3abb66ee990b50001230d5fe5d529f7b435' + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	// 人员上次签到信息（多公司）
    querySignInfoList(param) {
        var method = '/'+wechat + devName + '/thirdparty/ocsp/wechatUserSignService/querySignInfoList?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
        return axios.post(method, JSON.stringify(param), config)
    },
    // 人员签到区域、场次选择
    queryTrainInfo(param) {
        var method = '/'+wechat + devName + '/thirdparty/ocsp/wechatUserSignService/queryTrainInfo?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
        return axios.post(method, JSON.stringify(param), config)
    },
    // 人员上次签到信息（多公司）(运营平台接口)
    queryTrainSignByOpenid(param) {
        var method = '/customer' + devName + '/front/trainService/queryTrainSignByOpenId?requestId=' + getUUID() + '&token=02a979437f28491696c3abb66ee990b50001230d5fe5d529f7b435' + '&appId=' + appId
        return axios.post(method, JSON.stringify(param), config)
    },
    // 人员签到区域、场次选择（运营平台接口）
    queryTrainListByAppId(param) {
        var method = '/customer' + devName + '/front/trainService/queryTrainListByAppId?requestId=' + getUUID() + '&token=02a979437f28491696c3abb66ee990b50001230d5fe5d529f7b435' + '&appId=' + appId
        return axios.post(method, JSON.stringify(param), config)
    },
    // 人员签到区域、场次选择（运营平台接口）
    queryTrainInfoById(param) {
        var method = '/customer' + devName + '/front/trainService/queryTrainInfoById?requestId=' + getUUID() + '&token=02a979437f28491696c3abb66ee990b50001230d5fe5d529f7b435' + '&appId=' + appId
        return axios.post(method, JSON.stringify(param), config)
    },
	// 人员上次签到信息
    querySignInfo(param) {
        var method = '/'+wechat + devName + '/thirdparty/ocsp/wechatUserSignService/querySignInfo?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
        return axios.post(method, JSON.stringify(param), config)
    },

    // 人员上次签到信息新
    querySignInfoDistinct(param) {
        var method = '/'+wechat + devName + '/thirdparty/ocsp/wechatUserSignService/querySignInfoDistinct?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
        return axios.post(method, JSON.stringify(param), config)
    },
    //签到成功消息推送
    sendTrainInfo(param) {
        var method = '/'+wechat + devName + '/thirdparty/ocsp/wechatUserSignService/sendTrainInfo?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
        return axios.post(method, JSON.stringify(param), config)
    },
	//获取微信js授权
	//param:{wechatCode:区域编码;url:当前页面url}
	getWechatJsAuth(param) {
		var method = '/'+wechat + devName + '/thirdparty/ocsp/getWechatWebJs?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config);
	},
	//获取全国城市列表
	getCityLevelArea(param) {
		var method = '/'+wechat + devName +
			'/thirdparty/ocsp/locationAreaService/queryCityLevelArea?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
    },
     //根据站点编码查询站点信息
     getSiteBycode(param){
        var method = '/cms' + devName + '/front/ContentService/getSiteBycode?requestId=' + getUUID() +'&appId='+appId
        return axios.post(method, JSON.stringify(param), config)
     },
	//根据站点栏目代码查询资讯列表
	getFrontArticleList(param) {
		var method = '/cms' + devName + '/front/ContentService/getFrontArticleList?requestId=' + getUUID() + '&appId='+ appId
		return axios.post(method, JSON.stringify(param), config)
	},
	//根据查询资讯列表返回的link地址访问资讯明细
	getEcmContent(param) {
		var method = '/cms' + devName + '/front/ContentService/getEcmContent?requestId=' + getUUID() + '&appId='+ appId
		return axios.post(method, JSON.stringify(param), config)
    },
	//根据站点编码和栏目编码直接获取内容详情
	getDirectEcmContent(param) {
		var method = '/cms' + devName + '/front/ContentService/getDirectEcmContent?requestId=' + getUUID() + '&appId='+ appId
		return axios.post(method, JSON.stringify(param), config)
    },
	//查看内容明细后需更新点击量
	updateClikcNum(param) {
		var method = '/cms' + devName + '/front/ContentService/updateClikcNum?requestId=' + getUUID() + '&appId='+ appId
		return axios.post(method, JSON.stringify(param), config)
	},
	//4.2.2	根据商品分类查询商品
	queryGoodsByGoodsCategoryId(param) {
		var method = '/'+wechat + devName + '/thirdparty/ocsp/productService/queryGoodsByGoodsCategoryId?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	//4.2.1	根据商品号码查询商品
	queryGoodsByGoodsNumber(param) {
		var method = '/'+wechat + devName + '/thirdparty/ocsp/productService/queryGoodsByGoodsNumber?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	//4.2.3	根据商品号码查询商品
	goodsPurchaseAtOnce(param) {
		var method = '/'+wechat + devName + '/thirdparty/ocsp/productService/goodsPurchaseAtOnce?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	//获取类目列表
	queryCategory(param) {
		var method = '/'+wechat + devName + '/thirdparty/ocsp/wechatGoodsService/queryCategory?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	//获取商品属性
	queryGoodInfo(param) {
		var method = '/'+wechat + devName + '/thirdparty/ocsp/wechatGoodsService/queryGoodInfo?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	//获取商品价格
	queryGoodsSku(param) {
		var method = '/'+wechat + devName + '/thirdparty/ocsp/wechatGoodsService/queryGoodsSku?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	//查询全国区域（非嵌套型）
	queryAllAreaNotNestSub(param) {
		var method = '/'+wechat + devName + '/thirdparty/ocsp/locationAreaService/queryAllAreaNotNestSub?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	//查询全国区域（嵌套型）
	queryAllArea(param) {
		var method = '/'+wechat + devName + '/thirdparty/ocsp/locationAreaService/queryAllArea?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	//获取微信公众号列表
	getWechatAppList(param) {
		var method = '/'+wechatAuth + devName + '/auth/wechatCommonService/menu/getWeChatAPPList?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	//通过wechatId获取微信菜单
	getWechatMenuByWechatId(param) {
		var method = '/'+wechatAuth + devName + '/auth/wechatCommonService/menu/getWechatMenuByWechatId?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	//发布菜单
	createPushMenue(param) {
		var method = '/'+wechatAuth + devName + '/auth/wechatCommonService/menu/createMenue?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	/*
	//4.1.3   取消订单
	cancelOrder(param) {
		var method = '/order' + devName + '/front/orderService/cancelOrder?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	//4.1.5   查看个人订单详情
	queryPersonalOrder(param) {
		var method = '/order' + devName + '/front/orderService/selectOrdersByPhone?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	*/
	//运营平台新接口 - 查看个人订单
	queryPersonalOrderPage(param){
		var method = '/ordercenter' + devName + '/front/orderService/queryPersonalOrderPage?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
	//运营平台新接口 - 取消订单
	cancelOrder(param){
		var method = '/ordercenter' + devName + '/front/orderService/cancelOrder?requestId=' + getUUID() + '&token=' + global.localStorage.getItem(WX_USER_TOKEN) + '&appId=' + appId
		return axios.post(method, JSON.stringify(param), config)
	},
  	//运营平台新接口 - 创建订单
  	createOrder(param){
    	var method = '/ordercenter' + devName + "/front/orderService/createOrder?requestId="+getUUID()+"&appId="+appId+"&token=" + global.localStorage.getItem(WX_USER_TOKEN);
    	return axios.post(method, JSON.stringify(param), config)
  	},
  	//运营平台新接口 - 已存在订单支付
  	unPayOrderToPay(param){
    	var method = '/'+wechat + devName +"/front/orderCenterService/unPayOrderToPay?requestId="+getUUID()+"&appId="+appId+"&token=" + global.localStorage.getItem(WX_USER_TOKEN);
    	return axios.post(method, JSON.stringify(param), config)
  	},
  	//运营平台新接口 - 创建订单并支付
  	addOrderAndPay(param){
    	var method = '/'+wechat + devName + "/front/orderCenterService/addOrderAndPay?requestId="+getUUID()+"&appId="+appId+"&token=" + global.localStorage.getItem(WX_USER_TOKEN);
    	return axios.post(method, JSON.stringify(param), config)
  	},
  	//运营平台新接口 - 获取选择的商品详情
  	queryGoodInfoBySku(param){
    	var method = '/'+wechat  + devName + "/thirdparty/ocsp/wechatGoodsService/queryGoodInfoBySku?requestId="+getUUID()+"&appId="+appId+"&token=" + global.localStorage.getItem(WX_USER_TOKEN);
    	return axios.post(method, JSON.stringify(param), config)
  	},
	getGoodsDetails(param) {
		var method =  '/'+wechat + devName + "/thirdparty/ocsp/productService/getGoodsDetails?requestId="+getUUID()+"&appId="+appId+"&token=" + global.localStorage.getItem(WX_USER_TOKEN) ;
		return axios.post(method, JSON.stringify(param), config);
	},
	/*
	addMallOrder(param){
    var method = '/wechat' + devName + "/front/orderService/addOrderAndPay?requestId="+getUUID()+"&appId="+appId+"&token=" + global.localStorage.getItem(WX_USER_TOKEN);
    return axios.post(method, JSON.stringify(param), config)
  },
	orderPay(param) {
		var method = '/wechat' + devName + "/front/orderService/orderPay?requestId="+getUUID()+"&appId="+appId+"&token=" + global.localStorage.getItem(WX_USER_TOKEN);
		return axios.post(method, JSON.stringify(param), config)
	},
	*/
	//根据站点编码查询站点信息
	getEcmCategoryBycode(param) {
		var method = '/cms' + devName + "/front/ContentService/getEcmCategoryBycode?requestId=" + getUUID() + "&appId=" + appId + "&token=" + global.localStorage.getItem(WX_USER_TOKEN);
		return axios.post(method, JSON.stringify(param), config)
	},
	//热点推荐接口
	getFrontHotArticleList(param) {
		var method = '/cms' + devName + "/front/ContentService/getFrontHotArticleList?requestId=" + getUUID() + "&appId=" + appId + "&token=" + global.localStorage.getItem(WX_USER_TOKEN);
		return axios.post(method, JSON.stringify(param), config)
	},
	//修改手机
	wechatUpdateUserPhone(param) {
		var method = '/'+wechat + devName + "/front/CusService/wechatUpdateUserPhone?requestId=" + getUUID() + "&appId=" + appId + "&token=" + global.localStorage.getItem(WX_USER_TOKEN);
		return axios.post(method, JSON.stringify(param), config)
	},
	//修改昵称
	wechatUpdateUserNikeName(param) {
		var method = '/'+wechat + devName + "/front/CusService/wechatUpdateUserNikeName?requestId=" + getUUID() + "&appId=" + appId + "&token=" + global.localStorage.getItem(WX_USER_TOKEN);
		return axios.post(method, JSON.stringify(param), config)
	},
	//修改邮箱
	wechatUpdateUserEmail(param) {
		var method = '/'+wechat + devName + "/front/CusService/wechatUpdateUserEmail?requestId=" + getUUID() + "&appId=" + appId + "&token=" + global.localStorage.getItem(WX_USER_TOKEN);
		return axios.post(method, JSON.stringify(param), config)
	},
	uploadCaFileForys(param) {
		var method = '/'+wechat + devName + "/thirdparty/ocsp/wechatYsCaFileService/uploadCaFile?requestId=" + getUUID() + "&appId=" + appId + "&token=" + global.localStorage.getItem(WX_USER_TOKEN);
		return axios.post(method, JSON.stringify(param), config)
	},
	queryCaFileForys(param) {
		var method = '/'+wechat + devName + "/thirdparty/ocsp/wechatYsCaFileService/queryCaFile?requestId=" + getUUID() + "&appId=" + appId + "&token=" + global.localStorage.getItem(WX_USER_TOKEN);
		return axios.post(method, JSON.stringify(param), config)
	},
	deleteCaFileForys(param) {
		var method = '/'+wechat + devName + "/thirdparty/ocsp/wechatYsCaFileService/deleteCaFile?requestId=" + getUUID() + "&appId=" + appId + "&token=" + global.localStorage.getItem(WX_USER_TOKEN);
		return axios.post(method, JSON.stringify(param), config)
	},
	cdnqueryAllArea(param) {
		var method = config.cdnUrl+'/weChatMall' + devName + "/json/areaJson/queryAllArea.json?requestId=" + getUUID() + "&appId=" + appId + "&token=" + global.localStorage.getItem(WX_USER_TOKEN);
		return axios.get(method, JSON.stringify(param), config)
	},
	//产品订购
	productsave(param) {
		var method = '/'+wechat + devName + "/thirdparty/ocsp/form/productsave?requestId=" + getUUID() + "&appId=" + appId + "&token=" + global.localStorage.getItem(WX_USER_TOKEN);
		return axios.post(method, JSON.stringify(param), config)
	},
    //投诉建议
	complaintsave(param) {
		var method = '/'+wechat + devName + "/thirdparty/ocsp/form/complaintsave?requestId=" + getUUID() + "&appId=" + appId + "&token=" + global.localStorage.getItem(WX_USER_TOKEN);
		return axios.post(method, JSON.stringify(param), config)
	},
	//合作加盟
	cooperatesave(param) {
		var method = '/'+wechat + devName + "/thirdparty/ocsp/form/cooperatesave?requestId=" + getUUID() + "&appId=" + appId + "&token=" + global.localStorage.getItem(WX_USER_TOKEN);
		return axios.post(method, JSON.stringify(param), config)
	},
	//查询评价人员列表
	serviceEvaluationList(param) {
		var method = '/ehall' + devName + "/front/evaluationService/serviceEvaluationList?requestId=" + getUUID() + "&appId=" + appId + "&token=13d07da1e42c46ccbb2a354f7ada87bf000124e037aefc2d953b8a";
		return axios.post(method, JSON.stringify(param), config)
	},
	//粉丝数据统计
	subscribeUserCount(param) {
		var method = '/ehall' + devName + "/front/evaluationService/subscribeUserCount?requestId=" + getUUID() + "&appId=" + appId + "&token=13d07da1e42c46ccbb2a354f7ada87bf000124e037aefc2d953b8a";
		return axios.post(method, JSON.stringify(param), config)
	},
	//粉丝明细
	subscribeUserInfo(param) {
		var method = '/ehall' + devName + "/front/evaluationService/subscribeUserInfo?requestId=" + getUUID() + "&appId=" + appId + "&token=13d07da1e42c46ccbb2a354f7ada87bf000124e037aefc2d953b8a";
		return axios.post(method, JSON.stringify(param), config)
    },
	confirmSignUp(param) {
		var method = '/activity' + devName + "/front/activityService/confirmSignUp?requestId=" + getUUID() + "&appId=" + appId + "&token=" + global.localStorage.getItem(WX_USER_TOKEN);
		return axios.post(method, JSON.stringify(param), config)
	},
    // 查询驻厅人员信息
    wechatUserInfoInHall(param) {
        let method = '/wechat' + devName + '/thirdparty/ocsp/wechatUserSignService/wechatUserInfoInHall?requestId=' + getUUID() + '&appId=' + appId + "&token=" + global.localStorage.getItem(WX_USER_TOKEN)
        return axios.post(method, JSON.stringify(param), config)
    },
    // 保存服务人员的评价
    servicePersonEvaluation(param) {
        let method = '/ehall' + devName + '/front/evaluationService/servicePersonEvaluation?requestId=' + getUUID() + '&appId=' + appId + "&token=" + global.localStorage.getItem(WX_USER_TOKEN)
        return axios.post(method, JSON.stringify(param), config)
    },
    // openid查询评价人员信息
    queryEvalPersonInfoByOpenId(param) {
        let method = '/ehall' + devName + '/front/evaluationService/queryEvalPersonInfoByOpenId?requestId=' + getUUID() + '&appId=' + appId + "&token=" + global.localStorage.getItem(WX_USER_TOKEN)
        return axios.post(method, JSON.stringify(param), config)
    },
    // 发送评价成功消息
    sendserviceEvaluation(param) {
        let method = '/wechat' + devName + '/thirdparty/ocsp/wechatUserSignService/sendserviceEvaluation?requestId=' + getUUID() + '&appId=' + appId + "&token=" + global.localStorage.getItem(WX_USER_TOKEN)
        return axios.post(method, JSON.stringify(param), config)
    },
	//--------翼税迁移---------
	//城市接口
	ysLoadCity(param){
        var method = '/'+wechat + devName + "/front/omniTransferService/loadCity?requestId=" + getUUID() + "&appId=" + appId + "&token=" + global.localStorage.getItem(WX_USER_TOKEN);
        return axios.post(method, JSON.stringify(param), config)
	},
	//功能菜单接口
	ysGetXzqhGncd(param){
        var method = '/'+wechat + devName + "/front/omniTransferService/getXzqhGncd?requestId=" + getUUID() + "&appId=" + appId + "&token=" + global.localStorage.getItem(WX_USER_TOKEN);
        return axios.post(method, JSON.stringify(param), config)
	},
	//-----后台管理-----start-
	// 分页查询微信号配置信息
    pageQueryWechatApp(param) {
        var method = utilConfig.getInterUrl(wechatAuth,'/back/appManageService/queryAllWechatAppConfig');
        return axios.post(method, JSON.stringify(param), config)
    },
    // 更新微信号配置信息  wechat_app
    updateWechatAppConfig(param) {
        var method = utilConfig.getInterUrl(wechatAuth,'/back/appManageService/updateWechatAppConfig');
        return axios.post(method, JSON.stringify(param), config)
    },
    // 根据wechatId删除微信号配置信息  wechat_app
    deleteWechatAppByPrimaryKey(param) {
        var method = utilConfig.getInterUrl(wechatAuth,'/back/appManageService/deleteByPrimaryKey');
        return axios.post(method, JSON.stringify(param), config)
    },
    // 新增微信号配置信息  wechat_app
    insertWechatApp(param) {
        var method = utilConfig.getInterUrl(wechatAuth,'/back/appManageService/insertWechatApp');
        return axios.post(method, JSON.stringify(param), config)
    },
	//查询菜单
	pageWxMenus(param){
		var method = utilConfig.getInterUrl(wechatAuth,'/back/wechatMenuService/pageWxMenus');
		return axios.post(method, JSON.stringify(param), config)
	},
	//新增菜单
	insertWechatMenu(param){
		var method = utilConfig.getInterUrl(wechatAuth,'/back/wechatMenuService/insertWechatMenu');
		return axios.post(method, JSON.stringify(param), config)
	},
	//修改
	updateWechatMenu(param){
       var method = utilConfig.getInterUrl(wechatAuth,'/back/wechatMenuService/updateWechatMenu');
	   return axios.post(method, JSON.stringify(param), config)
	},
	//删除
	deleteWechatMenu(param){
       var method = utilConfig.getInterUrl(wechatAuth,'/back/wechatMenuService/deleteWechatMenu');
	   return axios.post(method, JSON.stringify(param), config)
	},
	//查找分配列表
	pageInUseWxMenus(param){
       var method = utilConfig.getInterUrl(wechatAuth,'/back/wechatMenuService/pageInUseWxMenus');
	   return axios.post(method, JSON.stringify(param), config)
	},
	//分配
	distMenu(param){
       var method = utilConfig.getInterUrl(wechatAuth,'/back/wechatMenuService/distMenu');
	   return axios.post(method, JSON.stringify(param), config)
	},
	//删除
	removeAppMenu(param){
       var method = utilConfig.getInterUrl(wechatAuth,'/back/wechatMenuService/removeAppMenu');
	   return axios.post(method, JSON.stringify(param), config)
	},
	//修改
	modifyAppMenu(param){
       var method = utilConfig.getInterUrl(wechatAuth,'/back/wechatMenuService/modifyAppMenu');
	   return axios.post(method, JSON.stringify(param), config)
	},
	resetWxAppMenu(param){
	   var method = utilConfig.getInterUrl(wechatAuth,'/back/wechatMenuService/resetAppMenu');
	   return axios.post(method, JSON.stringify(param), config)
	},
	preViewMenuList(param){
	   var method = utilConfig.getInterUrl(wechatAuth,'/back/wechatMenuService/preViewMenuList');
	   return axios.post(method, JSON.stringify(param), config)
	},
	publishToWeChat(param){
	   var method = utilConfig.getInterUrl(wechatAuth,'/back/wechatMenuService/publishToWeChat');
	   return axios.post(method, JSON.stringify(param), config)
	},

	//-----后台管理----end--
	//-----------------翼税服务---------------------start---------------
   //查询纳税人信息
  queryUserBindInfo(param){
      var method = utilConfig.getInterUrl(wechat,'/front/omniTransferService/yswxNsrInfo');
    return axios.post(method, JSON.stringify(param), config)
  },

	//绑定纳税人
	finalBindNsr(param){
      var method = utilConfig.getInterUrl(wechat,'/front/omniTransferService/yswxBdNsr');
	    return axios.post(method, JSON.stringify(param), config)
	},

  //  //用户绑定登记
  //  userBindLogin(params) {
  //    var method = '/front'+  '/omniTransferService/yswxNsrInfo?requestId=' + getUUID() + '&appId=' + appId
  //    return axios.post(method, JSON.stringify(params), config)
  //  },
  //  //纳税人绑定
  //  finalBind(params) {
  //    console.log(params)
  //    var method = 'front' + '/omniTransferService/yswxBdNsr?requestId=' + getUUID() + '&appId=' + appId
  //    return axios.post(method, JSON.stringify(params), config)
  //  },
  // 办理进度
  getDealPace(params) {
    var method = utilConfig.getInterUrl(wechat,'/front/omniTransferService/applyStatus')
    // let method = '/mock/applyStatus/res.json'
    return axios.post(method, JSON.stringify(params), config)
  },
  //我的税通号码
  sendYsSthm(params) {
    let method = utilConfig.getInterUrl(wechat,'/front/omniTransferService/sendYsSthm')
    // let method = '/mock/yssthm/res.json'
    return axios.post(method, JSON.stringify(params), config)
  },
  //判断是否已经绑定
   isBinding(params) {
     let method = utilConfig.getInterUrl(wechat,'/front/omniTransferService/isBinding')
    //  let method = '/mock/isbinded.json'
     return axios.post(method, JSON.stringify(params), config)
   },
   //------------------------------翼税服务--------------end-------------



  //-------------页面配置------start------------------------
  //查询单个页面配置信息
  queryPageConfig(params) {
     let method = utilConfig.getInterUrl(wechat,'/front/pageService/queryPageConfig')
     return axios.post(method, JSON.stringify(params), config)
  },
  queryPageGoupConfig(params){
	let method = utilConfig.getInterUrl(wechat,'/front/pageService/queryPageGoupConfig')
    return axios.post(method, JSON.stringify(params), config)
  }
  //-------------页面配置------end--------------------------
}
