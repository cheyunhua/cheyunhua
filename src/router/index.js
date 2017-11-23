/* 路由配置全写这里 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import scan from '../pages/scan/'
import NotFound from '../pages/errors/NotFound.vue'
import Index from '../pages/index/'
import detail from '../pages/detail/'
import Login from '../pages/login/'
import Logins from '../pages/login/login.vue'
import Factory from '../pages/factory/'
import Customer from '../pages/customer/'
import Map from '../pages/map/'
import Icon from '../pages/icon/icon2'
import icon_common from '../pages/icon/common'
import manService from '../pages/manService/'
import focus from '../pages/about/focus'
import about from '../pages/about/'
import Setting from '../pages/setting/'
import Workspace from '../pages/workspace/'
import Overview from '../pages/overview/'
import Blackpage from '../pages/overview/black_customer.vue'
import bind from '../pages/bind/'
import train from '../pages/train/'
import password from '../pages/password/'
import uploadHZ from '../pages/upload/ca_upload_hz.vue'
import uploadJM from '../pages/upload/ca_upload_jm.vue'
import uploadYs from '../pages/upload/ca_upload.vue'
import sign from '../pages/sign/'
import my from '../pages/my/'
import setting from '../pages/my/setting.vue'
import mycustomerlist from '../pages/my/mycustomerlist/'
import mymessage from '../pages/my/mymessage/'
import myhandle from '../pages/my/myhandle/'
import handleagent from '../pages/my/myhandle/handleagent.vue'
import myprogress from '../pages/my/myprogress/'
import progress from '../pages/my/myprogress/check_progress.vue'
import myinfo from '../pages/my/myinfo/'
import bindcompany from '../pages/my/bindcompany/'
import menu from '../pages/menu/'
import wxIndex from '../pages/wxIndex/'
import enterprisewx from '../pages/enterprisewx/new_file.vue'
import jahy from '../pages/enterprisewx/jahy.vue'
import wxJsAuth from '../pages/wxJsAuth/'
import wxEntry from '../pages/wxEntry/'
import Order from '../pages/order/index.vue'
import OrderPayResult from '../pages/order/order_pay_result.vue'
import OrderPayResultFail from '../pages/order/order_pay_result_fail.vue'
import toPay from '../pages/toPay'

import authlogin from '../pages/login/authlogin.vue'
import relogin from '../pages/login/relogin.vue'

import componentDemo from '../pages/wxIndex/componentDemo'
import jcInformation from '../pages/jcInformation/'
import inforpractice from '../pages/jcInformation/inforPractice'
import productList from '../pages/product/list.vue'
import productDetail from '../pages/product/detail.vue'
import newsContent from '../pages/newsContent/'
import kbgs from '../pages/product/kbgs.vue'
import dljz from '../pages/product/dljz.vue'
import cszx from '../pages/product/cszx.vue'
import cszxDetail from '../pages/product/cszxDetail.vue'
import myorder from '../pages/my/myorder'
import orderdetails from '../pages/my/myorder/orderdetails.vue'
import userDetail from '../pages/my/userDetail/'
import bindPhone from '../pages/my/userDetail/bindPhone'
import taxBusiness from '../pages/icon/taxBusiness/'
import kfuserbind from '../pages/kfuserbind/'

//新添加页面
import taxation from '../pages/taxation/' //财税专区
import steward from '../pages/taxation/steward.vue' //金财管家
import appreciation from '../pages/appreciation' //财富增值treatment
import logistics from '../pages/appreciation/logistics.vue' //物流业treatment
import mobile_it from '../pages/appreciation/mobile_it.vue' //信息技术treatment
import consultancy from '../pages/appreciation/consultancy.vue' //咨询服务treatment
import sharetransfer from '../pages/appreciation/sharetransfer.vue' //股权转让treatment
import otherindustries from '../pages/appreciation/otherindustries.vue' //其他行业treatment
import treatment from '../pages/treatment' //医疗行业节税地
import register from '../pages/register' //喀什注册公司
import invoiceZone from '../pages/invoiceZone' //发票专区
import menuManage from '../pages/wechatManage/menu/menu_manage'
import menuAllot from '../pages/wechatManage/menu/menu_allot'
import menuPreView from '../pages/wechatManage/menu/menu_pre_view'
import appManage from '../pages/wechatManage/app/app_manage'
import feedback from '../pages/feedback' //在线反馈
import product_ordering from '../pages/feedback/product_ordering.vue' //产品订购
import league from '../pages/feedback/league.vue' //合作加盟
import complaints from '../pages/feedback/complaints.vue' //投诉建议
import submitsuccess from '../pages/feedback/submitsuccess.vue' //提交成功
import UsersBind from '../pages/usersbind/'
import DealPace from '../pages/dealpace/'
import DealDetail from '../pages/dealdetail/detail'
import errorPage from '../pages/errors/'
import MySthm from '../pages/mysthm/'
import selectProvince from '../pages/icon/selectProvince' //办税大厅-选择省份
import selectCity from '../pages/icon/taxBusiness/selectCity' //办税大厅-选择城市

import zongBu from '../pages/location/ZongBu'
import zbicon from '../pages/location/ZongBu/zongBuIcon.vue'
import location from '../pages/location/index'
import guangdong from '../pages/location/GuangDong/index'
import gd_ca_index from '../pages/location/GuangDong/ca/index'
import gd_etax from '../pages/location/GuangDong/etax'
import gd_pxfw from '../pages/location/GuangDong/pxfw'
import gd_entTax from '../pages/location/GuangDong/entTax'
import gd_bszn from '../pages/location/GuangDong/bszn'
import gd_bsdt from '../pages/location/GuangDong/bsdt'
import gd_swgc from '../pages/location/GuangDong/swgc'
import gd_grbs from '../pages/location/GuangDong/grbs'
import gd_tax_assistant from '../pages/location/GuangDong/tax_assistant.vue'
import zb_tax_assistant from '../pages/location/wxHeadquarters/tax_assistant.vue'
// import gridChek from '../pages/location/GuangDong/gridChek.vue'
import wxheadquarters from '../pages/location/wxHeadquarters/'
import shenZhen from '../pages/location/ShenZhen/'
import chongQing from '../pages/location/ChongQing/'
import guiZhou from '../pages/location/GuiZhou/'
import qingHai from '../pages/location/QingHai/'
import yunNan from '../pages/location/YunNan/'
import shanDong from '../pages/location/ShanDong/'
import qingdao from '../pages/location/QingDao/'
import sichuan from '../pages/location/SiChuan/'
import heBei from '../pages/location/HeBei/'
import huNan from '../pages/location/HuNan/'
import sz_etax from '../pages/location/ShenZhen/etax'
import sz_pxfw from '../pages/location/ShenZhen/pxfw'
import cq_etax from '../pages/location/ChongQing/etax'
import cq_pxfw from '../pages/location/ChongQing/pxfw'
import gz_etax from '../pages/location/GuiZhou/etax'
import gz_pxfw from '../pages/location/GuiZhou/pxfw'
import qh_etax from '../pages/location/QingHai/etax'
import qh_pxfw from '../pages/location/QingHai/pxfw'
import yn_etax from '../pages/location/YunNan/etax'
import yn_pxfw from '../pages/location/YunNan/pxfw'
import sd_etax from '../pages/location/ShanDong/etax'
import sd_pxfw from '../pages/location/ShanDong/pxfw'
import sd_dzswj from '../pages/location/ShanDong/dzswj'
import sd_zixun from '../pages/location/ShanDong/zixun'
import qd_etax from '../pages/location/QingDao/etax'
import qd_dzswj from '../pages/location/QingDao/dzswj'
import qd_pxfw from '../pages/location/QingDao/pxfw'
import qd_zixun from '../pages/location/QingDao/zixun'
import sc_etax from '../pages/location/SiChuan/etax'
import sc_pxfw from '../pages/location/SiChuan/pxfw'
import hb_etax from '../pages/location/HeBei/etax'
import hb_pxfw from '../pages/location/HeBei/pxfw'
import hn_etax from '../pages/location/HuNan/etax'
import hn_pxfw from '../pages/location/HuNan/pxfw'

import iconx from '../pages/iconX/index'
// iconXservice页面
import gd_ca_net from '../pages/iconXservice/GuangDong/ca/net'
import gd_net from '../pages/iconXservice/GuangDong/net/'
import gd_taxAssistant from '../pages/iconXservice/GuangDong/taxAssistant/'
import zb_taxAssistant from '../pages/iconXservice/ZongBu/taxAssistant/'

// 运营平台驻厅
import ztRoot from '../pages/yyptzt/'
import ztLogin from '../pages/yyptzt/login/'
import ztEntry from '../pages/yyptzt/entry/'
import submitEvaluation from '../pages/yyptzt/submitEvaluation/'
import myServiceEvaluation from '../pages/yyptzt/serviceEvaluation/' // 驻厅我的服务评价
import wxPromotion from '../pages/yyptzt/wxPromotion'
import serviceEvaluation from '../pages/yyptzt/function/serviceEvaluation.vue'
import myQRCode from '../pages/yyptzt/function/myQRCode.vue'

// 全能训练营第一季
import xlySeason1Root from '../pages/xly/season1/'
import xlySeason1Login from '../pages/xly/season1/login'
import xlySeason1PaySuccess from '../pages/xly/season1/paySuccess'

import jcPartner from '../pages/wxIndex/jcPartner' //金财合伙人
import cultivateApply from '../pages/cultivate/cultivateApply' //培训报名
import cultivateSign from '../pages/cultivate/cultivateSign' //培训签到
import cultivateSignNew from '../pages/cultivate/cultivateSignNew' //培训签到(多公司)
import cultivateSignPtport from '../pages/cultivate/cultivateSignPtport' //培训签到(多公司)(运营平台接口)

//新绑定企业信息
import bindIndex from '../pages/bindCompanyInfo'
import bindCompanyInfo from '../pages/bindCompanyInfo/bindCompanyInfo.vue'
import bindCompanyHistory from '../pages/bindCompanyInfo/bindCompanyHistory.vue'
import addBindCompany from '../pages/bindCompanyInfo/addBindCompany.vue'

//页面配置
import wxPageView from '../pages/wxPage/view.vue'
import wxPageViews from '../pages/wxPage/views.vue'

const document = global.document

/* 开启debug模式 */
//Vue.config.debug = true

Vue.use(VueRouter)

const router = new VueRouter({
    //mode: 'history',
    base:
    process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'test' ||
        process.env.NODE_ENV === 'preproduction'
        ? '/wechat/'
        : process.env.NODE_ENV === 'local' ? '/tree/front/' : '/',
    //base: '/vip/',
    //linkActiveClass: 'active',
    //scrollBehavior: () => ({ y: 0 }),
    routes: [
         {
            path: '/views/:pageGroupType',
            component: wxPageViews,
            meta: {
                title: '金财互联',
            },
        },
        {
            path: '/view/:pageType/:wechatCode/:pageCode',
            component: wxPageView,
            meta: {
                title: '金财互联',
            },
        },
        {
            path: '/selectCity',
            component: selectCity,
            meta: {
                title: '选择城市',
            },
        },
        {
            path: '/selectProvince',
            component: selectProvince,
            meta: {
                title: '选择区域',
            },
        },
        {
            path: '/taxBusiness',
            component: taxBusiness,
            meta: {
                title: '财税业务',
            },
        },
        {
            path: '/kfuserbind',
            component: kfuserbind,
            meta: {
                title: '客户绑定',
            },
        },
        {
            path: '/scan',
            component: scan,
            meta: {
                title: '二维码登录',
            },
        },
        {
            path: '/login',
            component: Login,
            meta: {
                title: '金财互联',
            },
        },
        {
            path: '/logins',
            component: Logins,
            meta: {
                title: '金财互联',
            },
        },
        {
            path: '/errorPage',
            component: errorPage,
            meta: {
                title: '金财互联',
            },
        },
        {
            path: '/index',
            component: Index,
            meta: {
                title: '首页',
            },
        },
        {
            path: '/detail',
            component: detail,
            meta: {
                title: '概览',
            },
        },
        {
            path: '/map',
            component: Map,
            meta: {
                title: '门店地点',
            },
        },
        {
            path: '/factory',
            component: Factory,
            meta: {
                title: '我的服务门店',
            },
        },
        {
            path: '/customer',
            component: Customer,
            meta: {
                title: '企业信息',
            },
        },
        {
            path: '/blackpage',
            component: Blackpage,
            meta: {
                title: '概览',
            },
        },
        {
            path: '/icon',
            component: Icon,
            meta: {
                title: '办税大厅',
            },
        },
        {
            path: '/icon_common',
            component: icon_common,
            meta: {
                title: '办税大厅',
            },
        },
        {
            path: '/iconx/:area/:category',
            component: iconx,
            meta: {
                title: '办税大厅',
            },
        },
        // =============================================================================
        // iconXservice页面
        // =============================================================================
        {
            path: '/gd_ca_net',
            component: gd_ca_net,
            meta: {
                title: '国税网点查询',
            },
        },
        {
            path: '/gd_net',
            component: gd_net,
            meta: {
                title: '网点查询',
            },
        },
        {
            path: '/gd_taxAssistant',
            component: gd_taxAssistant,
            meta: {
                title: '办税助手',
            },
        },
        {
            path: '/zb_taxAssistant',
            component: zb_taxAssistant,
            meta: {
                title: '办税助手',
            },
        },
        // end =============================================================================

        {
            path: '/zbicon',
            component: zbicon,
            meta: {
                title: '办税大厅',
            },
        },
        {
            path: '/zongBu',
            component: zongBu,
            meta: {
                title: '办税大厅',
            },
        },
        {
            path: '/location',
            component: location,
            meta: {
                title: '办税大厅',
            },
            children: [
                {
                    path: 'guangdong',
                    component: guangdong,
                    meta: {
                        title: '办税大厅',
                    },
                    children: [
                        {
                            path: 'ca',
                            component: gd_ca_index,
                            meta: {
                                title: '办税大厅',
                            },
                            // children: [{
                            // 		path: 'gzgs',
                            // 		component: gd_ca_gzgs,
                            // 		meta: {
                            // 			title: '办税大厅',
                            // 		},
                            // 	},
                            // 	{
                            // 		path: 'gdgs',
                            // 		component: gd_ca_gdgs,
                            // 		meta: {
                            // 			title: '办税大厅',
                            // 		},
                            // 	},
                            // ]
                        },
                        {
                            path: 'etax',
                            component: gd_etax,
                            meta: {
                                title: '电子税务局',
                            },
                        },
                        {
                            path: 'pxfw',
                            component: gd_pxfw,
                            meta: {
                                title: '培训服务',
                            },
                        },
                        {
                            path: 'entTax',
                            component: gd_entTax,
                            meta: {
                                title: '企业办税',
                            },
                        },
                        {
                            path: 'bszn',
                            component: gd_bszn,
                            meta: {
                                title: '办税指南',
                            },
                        },
                        {
                            path: 'bsdt',
                            component: gd_bsdt,
                            meta: {
                                title: '办税地图',
                            },
                        },
                        {
                            path: 'swgc',
                            component: gd_swgc,
                            meta: {
                                title: '税务广场',
                            },
                        },
                        {
                            path: 'grbs',
                            component: gd_grbs,
                            meta: {
                                title: '个人办税',
                            },
                        },
                        {
                            path: 'taxAssistant',
                            component: gd_taxAssistant,
                            meta: {
                                title: '办税助手',
                            },
                        },
                        {
                            path: 'gridChek',
                            component: gd_net,
                            meta: {
                                title: '网点查询',
                            },
                        },
                    ],
                },
                {
                    path: 'shenzhen',
                    component: shenZhen,
                    meta: {
                        title: '办税大厅',
                    },
                    children: [
                        {
                            path: 'etax',
                            component: sz_etax,
                            meta: {
                                title: '办税专区',
                            },
                        },
                        {
                            path: 'pxfw',
                            component: sz_pxfw,
                            meta: {
                                title: '培训服务',
                            },
                        },
                    ],
                },
                {
                    path: 'chongqing',
                    component: chongQing,
                    meta: {
                        title: '办税大厅',
                    },
                    children: [
                        {
                            path: 'etax',
                            component: cq_etax,
                            meta: {
                                title: '办税专区',
                            },
                        },
                        {
                            path: 'pxfw',
                            component: cq_pxfw,
                            meta: {
                                title: '培训服务',
                            },
                        },
                    ],
                },
                {
                    path: 'guizhou',
                    component: guiZhou,
                    meta: {
                        title: '办税大厅',
                    },
                    children: [
                        {
                            path: 'etax',
                            component: gz_etax,
                            meta: {
                                title: '办税专区',
                            },
                        },
                        {
                            path: 'pxfw',
                            component: gz_pxfw,
                            meta: {
                                title: '培训服务',
                            },
                        },
                    ],
                },
                {
                    path: 'qinghai',
                    component: qingHai,
                    meta: {
                        title: '办税大厅',
                    },
                    children: [
                        {
                            path: 'etax',
                            component: qh_etax,
                            meta: {
                                title: '办税专区',
                            },
                        },
                        {
                            path: 'pxfw',
                            component: qh_pxfw,
                            meta: {
                                title: '培训服务',
                            },
                        },
                    ],
                },
                {
                    path: 'yunnan',
                    component: yunNan,
                    meta: {
                        title: '办税大厅',
                    },
                    children: [
                        {
                            path: 'etax',
                            component: yn_etax,
                            meta: {
                                title: '办税专区',
                            },
                        },
                        {
                            path: 'pxfw',
                            component: yn_pxfw,
                            meta: {
                                title: '培训服务',
                            },
                        },
                    ],
                },
                {
                    path: 'shandong',
                    component: shanDong,
                    meta: {
                        title: '办税大厅',
                    },
                    children: [
                        {
                            path: 'etax',
                            component: sd_etax,
                            meta: {
                                title: '办税专区',
                            },
                        },
                        {
                            path: 'dzswj',
                            component: sd_dzswj,
                            meta: {
                                title: '办税专区',
                            },
                        },
                        {
                            path: 'pxfw',
                            component: sd_pxfw,
                            meta: {
                                title: '服务',
                            },
                        },
                        {
                            path: 'zixun',
                            component: sd_zixun,
                            meta: {
                                title: '服务',
                            },
                        },
                    ],
                },
                {
                    path: 'qingdao',
                    component: qingdao,
                    meta: {
                        title: '办税大厅',
                    },
                    children: [
                        {
                            path: 'etax',
                            component: qd_etax,
                            meta: {
                                title: '办税专区',
                            },
                        },
                        {
                            path: 'dzswj',
                            component: qd_dzswj,
                            meta: {
                                title: '办税专区',
                            },
                        },
                        {
                            path: 'pxfw',
                            component: qd_pxfw,
                            meta: {
                                title: '培训服务'
                            },
                        },
                        {
                            path: 'zixun',
                            component: qd_zixun,
                            meta: {
                                title: '服务',
                            },
                        },
                    ],
                },
                {
                    path: 'sichuan',
                    component: sichuan,
                    meta: {
                        title: '办税大厅',
                    },
                    children: [
                        {
                            path: 'etax',
                            component: sc_etax,
                            meta: {
                                title: '办税专区',
                            },
                        },
                        {
                            path: 'pxfw',
                            component: sc_pxfw,
                            meta: {
                                title: '培训服务',
                            },
                        },
                    ],
                },
                {
                    path: 'hebei',
                    component: heBei,
                    meta: {
                        title: '办税大厅',
                    },
                    children: [
                        {
                            path: 'etax',
                            component: hb_etax,
                            meta: {
                                title: '办税专区',
                            },
                        },
                        {
                            path: 'pxfw',
                            component: hb_pxfw,
                            meta: {
                                title: '培训服务',
                            },
                        },
                    ],
                },
                {
                    path: 'hunan',
                    component: huNan,
                    meta: {
                        title: '办税大厅',
                    },
                    children: [
                        {
                            path: 'etax',
                            component: hn_etax,
                            meta: {
                                title: '办税专区',
                            },
                        },
                        {
                            path: 'pxfw',
                            component: hn_pxfw,
                            meta: {
                                title: '培训服务',
                            },
                        },
                    ],
                },
                {
                    path: 'wxheadquarters',
                    component: wxheadquarters,
                    meta: {
                        title: '办税大厅',
                    },
                    children: [
                        {
                            path: 'taxAssistant',
                            component: zb_taxAssistant,
                            meta: {
                                title: '办税助手',
                            },
                        },
                    ],
                },
            ],
        },

        {
            path: '/manService',
            component: manService,
            meta: {
                title: '进入人工服务',
            },
        },
        {
            path: '/about',
            component: about,
            meta: {
                title: '金财互联',
            },
        },
        {
            path: '/appManage',
            component: appManage,
            meta: {
                requiresAuth: false,
                title: '公众号管理',
            },
        },
        {
            path: '/menuManage',
            component: menuManage,
            meta: {
                requiresAuth: false,
                title: '菜单管理',
            },
        },
        {
            path: '/focus',
            component: focus,
            meta: {
                title: '欢迎关注',
            },
        },
        {
            path: '/bind',
            component: bind,
            meta: {
                title: '绑定企业信息',
            },
        },
        {
            path: '/train',
            component: train,
            meta: {
                title: '培训报名',
            },
        },
        {
            path: '/password',
            component: password,
            meta: {
                title: '设置密码',
            },
        },
        {
            path: '/uploadYs',
            component: uploadYs,
            meta: {
                title: '上传',
            },
        },
        {
            path: '/uploadHZ',
            component: uploadHZ,
            meta: {
                title: '上传',
            },
        },
        {
            path: '/uploadJM',
            component: uploadJM,
            meta: {
                title: '上传',
            },
        },
        {
            path: '/sign',
            component: sign,
            meta: {
                title: '签到',
            },
        },
        {
            path: '/my',
            component: my,
            meta: {
                requiresAuth: false,
                title: '我的',
            },
        },
        {
            path: '/setting',
            component: setting,
            meta: {
                requiresAuth: true,
                title: '设置',
            },
        },
        {
            path: '/menuAllot',
            component: menuAllot,
            meta: {
                requiresAuth: false,
                title: '菜单分配',
            },
        },

        {
            path: '/mycustomerlist',
            component: mycustomerlist,
            meta: {
                requiresAuth: true,
                title: '企业列表',
            },
        },
        {
            path: '/mymessage',
            component: mymessage,
            meta: {
                requiresAuth: true,
                title: '消息列表',
            },
        },
        {
            path: '/myhandle',
            component: myhandle,
            meta: {
                requiresAuth: true,
                title: '待办事项',
            },
        },
        {
            path: '/handleagent',
            component: handleagent,
            meta: {
                requiresAuth: true,
                title: '单据数据确认',
            },
        },
        {
            path: '/myprogress',
            component: myprogress,
            meta: {
                requiresAuth: false,
                title: '我的进展',
            },
        },
        {
            path: '/progress',
            component: progress,
            meta: {
                requiresAuth: false,
                title: '查看进展',
            },
        },
        {
            path: '/myinfo',
            component: myinfo,
            meta: {
                requiresAuth: false,
                title: '个人信息',
            },
        },
        {
            path: '/bindcompany',
            component: bindcompany,
            meta: {
                requiresAuth: false,
                title: '绑定企业',
            },
        },
        {
            path: '/menu',
            component: menu,
            meta: {
                requiresAuth: true,
                title: '微信菜单',
            },
        },
        {
            path: '/menuPreView',
            component: menuPreView,
            meta: {
                requiresAuth: true,
                title: '菜单预览',
            },
        },
        {
            path: '/inforpractice',
            component: inforpractice,
            meta: {
                requiresAuth: true,
                title: '',
            },
        },
        {
            path: '/jcInformation',
            component: jcInformation,
            meta: {
                requiresAuth: true,
                title: '金财资讯',
            },
        },
        {
            path: '/enterprisewx',
            component: enterprisewx,
            meta: {
                requiresAuth: false,
                title: '老板专区',
            },
        },
        {
            path: '/jahy',
            component: jahy,
            meta: {
                requiresAuth: false,
                title: '建筑安装行业',
            },
        },
        {
            path: '/invoiceZone',
            component: invoiceZone,
            meta: {
                requiresAuth: false,
                title: '发票专区',
            },
        },
        {
            path: '/feedback',
            component: feedback,
            meta: {
                requiresAuth: false,
                title: '在线反馈',
            },
        },
        {
            path: '/feedback/product_ordering',
            component: product_ordering,
            meta: {
                requiresAuth: false,
                title: '产品订购',
            },
        },
        {
            path: '/feedback/league',
            component: league,
            meta: {
                requiresAuth: false,
                title: '合作加盟',
            },
        },
        {
            path: '/feedback/complaints',
            component: complaints,
            meta: {
                requiresAuth: false,
                title: '投诉建议',
            },
        },
        {
            path: '/feedback/submitsuccess',
            component: submitsuccess,
            meta: {
                requiresAuth: false,
                title: '提交成功',
            },
        },
        {
            path: '/wxJsAuth',
            component: wxJsAuth,
            meta: {
                requiresAuth: true,
                title: '微信js授权demo',
            },
        },
        {
            path: '/',
            component: Index,
            meta: {
                requiresAuth: true,
                title: '金财互联',
            },
        },

        {
            path: '/wx',
            component: wxEntry,
            meta: {
                requiresAuth: false,
                title: '金财互联',
            },
        },
        // {
        //     path: '/wxindex',
        //     component: wxIndex,
        //     meta: {
        //         requiresAuth: false,
        //         title: '首页',
        //     },
        // },
        {
            path: '/demo',
            component: componentDemo,
            meta: {
                requiresAuth: false,
                title: '组件demo',
            },
        },
        {
            path: '/taxation',
            component: taxation,
            meta: {
                requiresAuth: true,
                title: '财税专区',
            },
        },
        {
            path: '/jcPartner',
            component: jcPartner,
            meta: {
                requiresAuth: false,
                title: '金财合伙人',
            },
        },
        {
            path: '/Order',
            component: Order,
            meta: {
                title: '确认订单',
            },
        },
        {
            path: '/OrderPayResult',
            component: OrderPayResult,
            meta: {
                title: '支付结果',
            },
        },
        {
            path: '/OrderPayResultFail',
            component: OrderPayResultFail,
            meta: {
                title: '支付结果',
            },
        },
        {
            path: '/steward',
            component: steward,
            meta: {
                requiresAuth: true,
                title: '金财管家',
            },
        },
        {
            path: '/product/kbgs',
            component: kbgs,
            meta: {
                requiresAuth: false,
                title: '开办公司',
            },
        },
        {
            path: '/product/dljz',
            component: dljz,
            meta: {
                requiresAuth: false,
                title: '财税外包',
            },
        },
        {
            path: '/product/cszx',
            component: cszx,
            meta: {
                requiresAuth: false,
                title: '财税咨询',
            },
        },
        {
            path: '/product/cszxDetail',
            component: cszxDetail,
            meta: {
                requiresAuth: false,
                title: '财税咨询',
            },
        },

        {
            path: '/product/list',
            component: productList,
            meta: {
                requiresAuth: false,
                title: '',
            },
        },
        {
            path: '/product/detail',
            component: productDetail,
            meta: {
                requiresAuth: false,
                title: '商品详情',
            },
        },
        {
            path: '/newsContent',
            component: newsContent,
            meta: {
                requiresAuth: false,
                title: '新闻详情',
            },
        },
        {
            path: '/myorder',
            component: myorder,
            meta: {
                requiresAuth: false,
                title: '我的订单',
            },
        },
        {
            path: '/orderdetails',
            component: orderdetails,
            meta: {
                requiresAuth: false,
                title: '订单详情',
            },
        },
        {
            path: '/userDetail',
            component: userDetail,
            meta: {
                requiresAuth: false,
                title: '用户信息',
            },
        },
        {
            path: '/bindPhone',
            component: bindPhone,
            meta: {
                requiresAuth: false,
                title: '绑定手机',
            },
        },
        {
            path: '/toPay',
            component: toPay,
            meta: {
                requiresAuth: false,
                title: '去付款',
            },
        },
        {
            path: '/authlogin',
            component: authlogin,
            meta: {
                requiresAuth: false,
                title: '授权登录',
            },
        },
        {
            path: '/relogin',
            component: relogin,
            meta: {
                requiresAuth: false,
                title: '重新登录',
            },
        },
        {
            path: '/appreciation',
            component: appreciation,
            meta: {
                requiresAuth: false,
                title: '财富增值',
            },
        },
        {
            path: '/logistics',
            component: logistics,
            meta: {
                requiresAuth: false,
                title: '物流业',
            },
        },
        {
            path: '/mobile_it',
            component: mobile_it,
            meta: {
                requiresAuth: false,
                title: '信息技术（含动漫）',
            },
        },
        {
            path: '/consultancy',
            component: consultancy,
            meta: {
                requiresAuth: false,
                title: '咨询服务',
            },
        },
        {
            path: '/sharetransfer',
            component: sharetransfer,
            meta: {
                requiresAuth: false,
                title: '股权转让',
            },
        },
        {
            path: '/otherindustries',
            component: otherindustries,
            meta: {
                requiresAuth: false,
                title: '其他行业',
            },
        },
        {
            path: '/treatment',
            component: treatment,
            meta: {
                requiresAuth: false,
                title: '医疗行业节税地',
            },
        },
        {
            path: '/register',
            component: register,
            meta: {
                requiresAuth: false,
                title: '喀什注册公司',
            },
        },
        {
            path: '/userbind',
            component: UsersBind,
            meta: {
                requiresAuth: false,
                title: '用户绑定',
            },
        },
        {
            path: '/dealPace',
            component: DealPace,
            meta: {
                requiresAuth: true,
                title: '进度查询',
            },
            children: [
                {
                    path: ':id',
                    component: DealDetail,
                    meta: {
                        requiresAuth: true,
                        title: '进度查询',
                    },
                },
            ],
        },
        {
            path: '/mysthm',
            component: MySthm,
            meta: {
                requiresAuth: true,
                title: '我的税通号码',
            },
        },
        {
            path: '/cultivateApply',
            component: cultivateApply,
            meta: {
                requiresAuth: true,
                title: '培训报名',
            },
        },
        {
            path: '/cultivateSign',
            component: cultivateSign,
            meta: {
                requiresAuth: true,
                title: '培训签到',
            },
        },
        {
            path: '/cultivateSignNew',
            component: cultivateSignNew,
            meta: {
                requiresAuth: true,
                title: '培训签到',
            },
        },
        {
            path: '/cultivateSignPtport',
            component: cultivateSignPtport,
            meta: {
                requiresAuth: true,
                title: '培训签到',
            },
        },
        {
            path: '/yyptzt',
            component: ztRoot,
            meta: {
                requiresAuth: true,
                title: '金财互联',
            },
            children: [
                {
                    path: 'login',
                    component: ztLogin,
                    meta: {
                        title: '登录',
                    },
                },
                {
                    path: 'entry',
                    component: ztEntry,
                    meta: {
                        title: '金财互联',
                    },
                },
                {
                    path: 'submitEvaluation',
                    component: submitEvaluation,
                    meta: {
                        title: '服务人员评价',
                    },
                },
                {
                    path: 'myQRCode',
                    component: myQRCode,
                    meta: {
                        title: '我的二维码',
                    },
                },
                {
                    path: 'serviceEvaluation',
                    component: serviceEvaluation,
                    meta: {
                        title: '服务评价',
                    },
                },
                {
                    path: 'ztse',
                    component: myServiceEvaluation,
                    meta: {
                        title: '我的服务评价',
                    },
                },
                {
                    path: 'wxPromotion',
                    component: wxPromotion,
                    meta: {
                        title: '我的微信推广',
                    },
                },
            ],
        },
        {
            path: '/bindCompanyInfo',
            component: bindIndex,
            meta: {
                title: '绑定企业信息',
            },
            children: [
                {
                    path: 'bindCompanyInfo',
                    component: bindCompanyInfo,
                    meta: {
                        title: '绑定企业信息',
                    },
                },
                {
                    path: 'bindCompanyHistory',
                    component: bindCompanyHistory,
                    meta: {
                        title: '绑定企业信息',
                    },
                },
                {
                    path: 'addBindCompany',
                    component: addBindCompany,
                    meta: {
                        title: '新增绑定企业',
                    },
                },
            ],
        },
        {
            path: '/xlys1',
            component: xlySeason1Root,
            meta: {
                title: '金财互联',
            },
            children: [
                {
                    path: 'login',
                    component: xlySeason1Login,
                    meta: {
                        title: '金财互联',
                    },
                },
                {
                    path: 'paySuccess',
                    component: xlySeason1PaySuccess,
                    meta: {
                        title: '金财互联',
                    },
                },
            ],
        },
        {
            path: '*',
            redirect: '/wx',
        },
    ],
})

router.afterEach(route => {
    // document.title = `${route.meta.title} - 金财互联`;
    document.title = `${route.meta.title}`
})

router.beforeEach((to, from, next) => {
    console.log(to)
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const auth = store.state.account.auth
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        /*   if (!auth.check()) {
		 next({
		 path: '/login',
		 query: { redirect_url: to.fullPath },
		 })
		 return
		 } else {*/
        next()
        //  }
    } else {
        next()
    }
})

export default router
