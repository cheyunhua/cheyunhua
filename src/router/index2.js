/* 路由配置全写这里 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'src/store'

import Index from 'src/pages/index/';
import NotFound from 'src/pages/errors/NotFound.vue';
import Login from 'src/pages/login/';
import Logins from 'src/pages/login/login.vue';
import wxEntry from 'src/pages/wxEntry/';


const scan = r=>require.ensure([],() => r(require('src/pages/scan/')),'');

const kfuserbind = r=>require.ensure([],() => r(require('src/pages/kfuserbind/')),'');

const detail = r=>require.ensure([],() => r(require('src/pages/detail/')),'');

const Factory = r=>require.ensure([],() => r(require('src/pages/factory/')),'');
const Customer = r=>require.ensure([],() => r(require('src/pages/customer/')),'');
const Map = r=>require.ensure([],() => r(require('src/pages/map/')),'');
const Icon = r=>require.ensure([],() => r(require('src/pages/icon/icon2')),'');
const icon_common = r=>require.ensure([],() => r(require('src/pages/icon/common')),'');
const iconx = r=>require.ensure([],() => r(require('src/pages/iconX/index')),'');
const gd_ca_gzgs = r=>require.ensure([],() => r(require('src/pages/iconXservice/GuangDong/ca/GuangZhou_GuoShui')),'');
const gd_ca_gdgs = r=>require.ensure([],() => r(require('src/pages/iconXservice/GuangDong/ca/GuangDong_GuoShui')),'');
const gd_networkQuery = r=>require.ensure([],() => r(require('src/pages/iconXservice/GuangDong/networkQuery/index')),'');
const manService = r=>require.ensure([],() => r(require('src/pages/manService/')),'');
const focus = r=>require.ensure([],() => r(require('src/pages/about/focus')),'');
const about = r=>require.ensure([],() => r(require('src/pages/about/')),'');
const Setting = r=>require.ensure([],() => r(require('src/pages/setting/')),'');
const Workspace = r=>require.ensure([],() => r(require('src/pages/workspace/')),'');
const Overview = r=>require.ensure([],() => r(require('src/pages/overview/')),'');
const Blackpage = r=>require.ensure([],() => r(require('src/pages/overview/black_customer.vue')),'');
const bind = r=>require.ensure([],() => r(require('src/pages/bind/')),'');
const train = r=>require.ensure([],() => r(require('src/pages/train/')),'');
const password = r=>require.ensure([],() => r(require('src/pages/password/')),'');
const uploadHZ = r=>require.ensure([],() => r(require('src/pages/upload/ca_upload_hz.vue')),'');
const uploadJM = r=>require.ensure([],() => r(require('src/pages/upload/ca_upload_jm.vue')),'');
const uploadYs = r=>require.ensure([],() => r(require('src/pages/upload/ca_upload.vue')),'');
const sign = r=>require.ensure([],() => r(require('src/pages/sign/')),'');
const my = r=>require.ensure([],() => r(require('src/pages/my/')),'');
const setting = r=>require.ensure([],() => r(require('src/pages/my/setting.vue')),'');
const mycustomerlist = r=>require.ensure([],() => r(require('src/pages/my/mycustomerlist/')),'');
const mymessage = r=>require.ensure([],() => r(require('src/pages/my/mymessage/')),'');
const myhandle = r=>require.ensure([],() => r(require('src/pages/my/myhandle/')),'');
const handleagent = r=>require.ensure([],() => r(require('src/pages/my/myhandle/handleagent.vue')),'');
const myprogress = r=>require.ensure([],() => r(require('src/pages/my/myprogress/')),'');
const progress = r=>require.ensure([],() => r(require('src/pages/my/myprogress/check_progress.vue')),'');
const myinfo = r=>require.ensure([],() => r(require('src/pages/my/myinfo/')),'');
const bindcompany = r=>require.ensure([],() => r(require('src/pages/my/bindcompany/')),'');
const menu = r=>require.ensure([],() => r(require('src/pages/menu/')),'');
const wxIndex = r=>require.ensure([],() => r(require('src/pages/wxIndex/')),'');
const enterprisewx = r=>require.ensure([],() => r(require('src/pages/enterprisewx/new_file.vue')),'');
const jahy = r=>require.ensure([],() => r(require('src/pages/enterprisewx/jahy.vue')),'');
const wxJsAuth = r=>require.ensure([],() => r(require('src/pages/wxJsAuth/')),'');

const Order = r=>require.ensure([],() => r(require('src/pages/order/index.vue')),'');
const OrderPayResult = r=>require.ensure([],() => r(require('src/pages/order/order_pay_result.vue')),'');
const OrderPayResultFail = r=>require.ensure([],() => r(require('src/pages/order/order_pay_result_fail.vue')),'');
const toPay = r=>require.ensure([],() => r(require('src/pages/toPay')),'');

const authlogin = r=>require.ensure([],() => r(require('src/pages/login/authlogin.vue')),'');
const relogin = r=>require.ensure([],() => r(require('src/pages/login/relogin.vue')),'');

const componentDemo = r=>require.ensure([],() => r(require('src/pages/wxIndex/componentDemo')),'');
const jcInformation = r=>require.ensure([],() => r(require('src/pages/jcInformation/')),'');
const inforpractice = r=>require.ensure([],() => r(require('src/pages/jcInformation/inforPractice')),'');
const productList = r=>require.ensure([],() => r(require('src/pages/product/list.vue')),'');
const productDetail = r=>require.ensure([],() => r(require('src/pages/product/detail.vue')),'');
const newsContent = r=>require.ensure([],() => r(require('src/pages/newsContent/')),'');
const kbgs = r=>require.ensure([],() => r(require('src/pages/product/kbgs.vue')),'');
const dljz = r=>require.ensure([],() => r(require('src/pages/product/dljz.vue')),'');
const cszx = r=>require.ensure([],() => r(require('src/pages/product/cszx.vue')),'');
const cszxDetail = r=>require.ensure([],() => r(require('src/pages/product/cszxDetail.vue')),'');
const myorder = r=>require.ensure([],() => r(require('src/pages/my/myorder')),'');
const orderdetails = r=>require.ensure([],() => r(require('src/pages/my/myorder/orderdetails.vue')),'');
const userDetail = r=>require.ensure([],() => r(require('src/pages/my/userDetail/')),'');
const bindPhone = r=>require.ensure([],() => r(require('src/pages/my/userDetail/bindPhone')),'');
const taxBusiness = r=>require.ensure([],() => r(require('src/pages/icon/taxBusiness/')),'');

//新添加页面
const taxation = r=>require.ensure([],() => r(require('src/pages/taxation/')),''); //财税专区
const steward = r=>require.ensure([],() => r(require('src/pages/taxation/steward.vue')),''); //金财管家
const appreciation = r=>require.ensure([],() => r(require('src/pages/appreciation')),''); //财富增值treatment
const logistics = r=>require.ensure([],() => r(require('src/pages/appreciation/logistics.vue')),''); //物流业treatment
const mobile_it = r=>require.ensure([],() => r(require('src/pages/appreciation/mobile_it.vue')),''); //信息技术treatment
const consultancy = r=>require.ensure([],() => r(require('src/pages/appreciation/consultancy.vue')),''); //咨询服务treatment
const sharetransfer = r=>require.ensure([],() => r(require('src/pages/appreciation/sharetransfer.vue')),''); //股权转让treatment
const otherindustries = r=>require.ensure([],() => r(require('src/pages/appreciation/otherindustries.vue')),''); //其他行业treatment
const treatment = r=>require.ensure([],() => r(require('src/pages/treatment')),''); //医疗行业节税地
const register = r=>require.ensure([],() => r(require('src/pages/register')),''); //喀什注册公司
const invoiceZone = r=>require.ensure([],() => r(require('src/pages/invoiceZone')),''); //发票专区
const menuManage = r=>require.ensure([],() => r(require('src/pages/wechatManage/menu/menu_manage')),'');
const menuAllot = r=>require.ensure([],() => r(require('src/pages/wechatManage/menu/menu_allot')),'');
const menuPreView = r=>require.ensure([],() => r(require('src/pages/wechatManage/menu/menu_pre_view')),'');
const appManage = r=>require.ensure([],() => r(require('src/pages/wechatManage/app/app_manage')),'');
const feedback = r=>require.ensure([],() => r(require('src/pages/feedback')),''); //在线反馈
const product_ordering = r=>require.ensure([],() => r(require('src/pages/feedback/product_ordering.vue')),''); //产品订购
const league = r=>require.ensure([],() => r(require('src/pages/feedback/league.vue')),''); //合作加盟
const complaints = r=>require.ensure([],() => r(require('src/pages/feedback/complaints.vue')),''); //投诉建议
const submitsuccess = r=>require.ensure([],() => r(require('src/pages/feedback/submitsuccess.vue')),''); //提交成功
const UsersBind = r=>require.ensure([],() => r(require('src/pages/usersbind/')),'');
const DealPace = r=>require.ensure([],() => r(require('src/pages/dealpace/')),'');
const DealDetail = r=>require.ensure([],() => r(require('src/pages/dealdetail/detail')),'');
const errorPage = r=>require.ensure([],() => r(require('src/pages/errors/')),'');
const MySthm = r=>require.ensure([],() => r(require('src/pages/mysthm/')),'');
const selectProvince = r=>require.ensure([],() => r(require('src/pages/icon/selectProvince')),''); //办税大厅-选择省份
const selectCity = r=>require.ensure([],() => r(require('src/pages/icon/taxBusiness/selectCity')),''); //办税大厅-选择城市

const location = r=>require.ensure([],() => r(require('src/pages/location/index')),'');
const guangdong = r=>require.ensure([],() => r(require('src/pages/location/GuangDong/index')),'');
const gd_ca_index = r=>require.ensure([],() => r(require('src/pages/location/GuangDong/ca/index')),'');
const gd_etax = r=>require.ensure([],() => r(require('src/pages/location/GuangDong/etax')),'');
const gd_pxfw = r=>require.ensure([],() => r(require('src/pages/location/GuangDong/pxfw')),'');
const gd_tax_assistant = r=>require.ensure([],() => r(require('src/pages/location/GuangDong/tax_assistant.vue')),'');
const zb_tax_assistant = r=>require.ensure([],() => r(require('src/pages/location/wxHeadquarters/tax_assistant.vue')),'');
// const gridChek = r=>require.ensure([],() => r(require('src/pages/location/GuangDong/gridChek.vue'
const wxheadquarters = r=>require.ensure([],() => r(require('src/pages/location/wxHeadquarters/')),'');
const shenZhen = r=>require.ensure([],() => r(require('src/pages/location/ShenZhen/')),'');
const chongQing = r=>require.ensure([],() => r(require('src/pages/location/ChongQing/')),'');
const guiZhou = r=>require.ensure([],() => r(require('src/pages/location/GuiZhou/')),'');
const qingHai = r=>require.ensure([],() => r(require('src/pages/location/QingHai/')),'');
const yunNan = r=>require.ensure([],() => r(require('src/pages/location/YunNan/')),'');
const shanDong = r=>require.ensure([],() => r(require('src/pages/location/ShanDong/')),'');
const qingdao = r=>require.ensure([],() => r(require('src/pages/location/QingDao/')),'');
const sichuan = r=>require.ensure([],() => r(require('src/pages/location/SiChuan/')),'');
const heBei = r=>require.ensure([],() => r(require('src/pages/location/HeBei/')),'');
const huNan = r=>require.ensure([],() => r(require('src/pages/location/HuNan/')),'');
const sz_etax = r=>require.ensure([],() => r(require('src/pages/location/ShenZhen/etax')),'');
const sz_pxfw = r=>require.ensure([],() => r(require('src/pages/location/ShenZhen/pxfw')),'');
const cq_etax = r=>require.ensure([],() => r(require('src/pages/location/ChongQing/etax')),'');
const cq_pxfw = r=>require.ensure([],() => r(require('src/pages/location/ChongQing/pxfw')),'');
const gz_etax = r=>require.ensure([],() => r(require('src/pages/location/GuiZhou/etax')),'');
const gz_pxfw = r=>require.ensure([],() => r(require('src/pages/location/GuiZhou/pxfw')),'');
const qh_etax = r=>require.ensure([],() => r(require('src/pages/location/QingHai/etax')),'');
const qh_pxfw = r=>require.ensure([],() => r(require('src/pages/location/QingHai/pxfw')),'');
const yn_etax = r=>require.ensure([],() => r(require('src/pages/location/YunNan/etax')),'');
const yn_pxfw = r=>require.ensure([],() => r(require('src/pages/location/YunNan/pxfw')),'');
const sd_etax = r=>require.ensure([],() => r(require('src/pages/location/ShanDong/etax')),'');
const sd_pxfw = r=>require.ensure([],() => r(require('src/pages/location/ShanDong/pxfw')),'');
const qd_etax = r=>require.ensure([],() => r(require('src/pages/location/QingDao/etax')),'');
const qd_pxfw = r=>require.ensure([],() => r(require('src/pages/location/QingDao/pxfw')),'');
const sc_etax = r=>require.ensure([],() => r(require('src/pages/location/SiChuan/etax')),'');
const sc_pxfw = r=>require.ensure([],() => r(require('src/pages/location/SiChuan/pxfw')),'');
const hb_etax = r=>require.ensure([],() => r(require('src/pages/location/HeBei/etax')),'');
const hb_pxfw = r=>require.ensure([],() => r(require('src/pages/location/HeBei/pxfw')),'');
const hn_etax = r=>require.ensure([],() => r(require('src/pages/location/HuNan/etax')),'');
const hn_pxfw = r=>require.ensure([],() => r(require('src/pages/location/HuNan/pxfw')),'');

const jcPartner = r=>require.ensure([],() => r(require('src/pages/wxIndex/jcPartner')),'');
const document = global.document

/* 开启debug模式 */
//Vue.config.debug = true

Vue.use(VueRouter)

const router = new VueRouter({
	//mode: 'history',
	base: process.env.NODE_ENV === 'production' ||
		process.env.NODE_ENV === 'test' ||
		process.env.NODE_ENV === 'preproduction' ?
		'/wechat/' : process.env.NODE_ENV === 'local' ? '/tree/front/' : '/',
	//base: '/vip/',
	//linkActiveClass: 'active',
	//scrollBehavior: () => ({ y: 0 }),
	routes: [
		{
				path: '/selectCity',
				component: selectCity,
				meta: {
					title: '选择城市'
				}
		},
		{
				path: '/selectProvince',
				component: selectProvince,
				meta: {
					title: '选择区域'
				}
		},
		{
			path: '/taxBusiness',
			component: taxBusiness,
			meta: {
				title: '财税业务'
			}
		},
		{
			path: '/scan',
			component: scan,
			meta: {
				title: '二维码登录'
			}
		},

        {
            path: '/kfuserbind',
            component: kfuserbind,
            meta: {
                requiresAuth: false,
                title: '客服用户绑定',
            },
        },

		{
			path: '/login',
			component: Login,
			meta: {
				title: '金财互联'
			}
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
        {
            path: '/gd_ca_gzgs',
            component: gd_ca_gzgs,
            meta: {
                title: '办税大厅',
            },
        },
        {
            path: '/gd_ca_gdgs',
            component: gd_ca_gdgs,
            meta: {
                title: '办税大厅',
            },
        },
        {
            path: '/gd_nq',
            component: gd_networkQuery,
            meta: {
                title: '网点查询',
            },
        },
		{
			path: '/location',
			component: location,
			meta: {
				title: '办税大厅',
			},
			children: [{
					path: 'guangdong',
					component: guangdong,
					meta: {
						title: '办税大厅',
					},
					children: [{
							path: 'ca',
							component: gd_ca_index,
							meta: {
								title: '办税大厅',
							},
							children: [{
									path: 'gzgs',
									component: gd_ca_gzgs,
									meta: {
										title: '办税大厅',
									},
								},
								{
									path: 'gdgs',
									component: gd_ca_gdgs,
									meta: {
										title: '办税大厅',
									},
								},
							]
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
							path: 'taxAssistant',
							component: gd_tax_assistant,
							meta: {
								title: '办税助手'
							}
						},
						{
							path: 'gridChek',
							component: gd_networkQuery,
							meta: {
								title: '网点查询'
							}
						},
					]
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
					]
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
					]
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
					]
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
					]
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
					]
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
							path: 'pxfw',
							component: sd_pxfw,
							meta: {
								title: '培训服务',
							},
						},
					]
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
							path: 'pxfw',
							component: qd_pxfw,
							meta: {
								title: '培训服务',
							},
						},
					]
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
					]
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
					]
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
					]
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
							component: zb_tax_assistant,
							meta: {
								title: '办税助手',
							},
						},
					]
				},
			]
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
				title: '确认订单'
			}
		},
		{
			path: '/OrderPayResult',
			component: OrderPayResult,
			meta: {
				title: '支付结果'
			}
		},
		{
			path: '/OrderPayResultFail',
			component: OrderPayResultFail,
			meta: {
				title: '支付结果'
			}
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
			path: '/kfuserbind',
			component: UsersBind,
			meta: {
				requiresAuth: false,
				title: '用户绑定'
			},
		},
		{
			path: '/dealPace',
			component: DealPace,
			meta: {
				requiresAuth: true,
				title: '进度查询'
			},
			children: [{
				path: ':id',
				component: DealDetail,
				meta: {
					requiresAuth: true,
					title: '进度查询'
				}
			}]
		},
		{
			path: '/mysthm',
			component: MySthm,
			meta: {
				requiresAuth: true,
				title: '我的税通号码'
			}
		},

		{
			path: '*',
			redirect: '/wx'
		},

	],
})

router.afterEach(route => {
	// document.title = `${route.meta.title} - 金财互联`;
	document.title = `${route.meta.title}`
})

router.beforeEach((to, from, next) => {
	console.log(to)
	if(to.matched.some(record => record.meta.requiresAuth)) {
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
