<template>

	<div class="taxBusiness-page">

		<div class="my-toptitle">
			<div class="taxBusiness-selectCity" @click="openSelectCityPage">{{lastCity.xzqhMc.length >= 5 ? lastCity.xzqhMc.substring(0, 3) + '...' : lastCity.xzqhMc}}<i class="iconfont icon-jiantou-copy" v-show="isShowIcon"></i></div>
			<div class="taxBusiness-title">{{funType}}</div>
			<!--<div class="taxBusiness-menuIcon"><i class="iconfont icon-ruanjian" @click="openShowMenuAgent"></i></div>-->
			<div class="taxBusiness-menuIcon"><span @click="openShowMenuAgent">功能列表<i class="iconfont icon-jiantou-copy"></i></span></div>
		</div>

		<!-- tab-container -->
		<div class="taxBusiness-content">
			<mt-tab-container v-model="selectedTax" swipeable>
				<mt-tab-container-item id="gsTab">
					<div class="taxBusiness-ul">
						<div class="taxBusiness-li" v-for="(item,index) in funs" v-if="item.gdsbz == '1'">
							<div class="taxBusiness-fun" @click="openFun(item.fwdz)">
								<div class="taxBusiness-img" v-bind:style="{background: imgBackground[index%25]}">
									<img :src=' wxImgvUrl +"/jchl/funs/" + item.tbLj'>
								</div>
								<p>{{item.gnmc}}</p>
							</div>
						</div>
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="dsTab">
					<div class="taxBusiness-ul">
						<div class="taxBusiness-li" v-for="(item,index) in funs" v-if="item.gdsbz == '2'">
							<div class="taxBusiness-fun" @click="openFun(item.fwdz)">
								<div class="taxBusiness-img" v-bind:style="{background: imgBackground[index%25]}">
									<img :src=' wxImgvUrl + "/jchl/funs/" + item.tbLj'>
								</div>
								<p>{{item.gnmc}}</p>
							</div>
						</div>
					</div>
				</mt-tab-container-item>
			</mt-tab-container>
		</div>

		<div class="taxBusiness-footer">
			<mt-navbar v-model="selectedTax">
				<mt-tab-item id="gsTab">国税</mt-tab-item>
				<mt-tab-item id="dsTab">地税</mt-tab-item>
			</mt-navbar>
		</div>

		<div class="showMenu-popup">
			<mt-popup v-model="showMenuPoupVisible" position="bottom" class="mint-popup-3" modal="false" popup-transition="popup-fade">
				<showMenu @closeShowMenuAgent="closeShowMenuAgent" @fetchData="fetchData" @chooseFun="chooseFun"></showMenu>
			</mt-popup>
		</div>
		<!--
		<mt-popup v-model="selectCityPoupVisible" position="bottom" class="mint-popup-3" :modal="false" popup-transition="popup-fade">
			<selectCity @closeSelectCityAgent="closeSelectCityAgent" :lastCity="lastCity" :funType="funType" @setCityFuns="setCityFuns" @setCity="setCity" v-if="lastCity || funType" ref="selectCityMethod" :modal="false"></selectCity>
		</mt-popup>
		-->
	</div>
</template>
<style scoped>
	.v-modal {}
	
	.taxBusiness-page {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	
	.my-toptitle,
	.taxBusiness-content,
	.taxBusiness-footer {
		position: absolute;
		left: 0;
		right: 0;
	}
	
	.taxBusiness-content {
		margin-top: 4.2rem;
		overflow: auto;
	}
	
	.taxBusiness-footer {
		position: fixed;
		height: 3em;
		bottom: 0;
		z-index: 1;
	}
	
	.my-toptitle {
		position: fixed;
		float: left;
		width: 100%;
		background-color: #ff7043;
		height: 4.2rem;
		color: #fff;
		font-size: 1.8rem;
		z-index: 1;
		top: 0;
	}
	
	.taxBusiness-selectCity {
		float: left;
		height: auto;
		width: 30%;
		line-height: 4.2rem;
		padding-left: 1em;
	}
	
	.taxBusiness-title {
		float: left;
		height: auto;
		width: 40%;
		text-align: center;
		line-height: 4.2rem;
	}
	
	.taxBusiness-menuIcon {
		float: left;
		height: auto;
		width: 30%;
		line-height: 4.2rem;
		text-align: right;
		padding-right: .4rem;
	}
	
	.taxBusiness-menuIcon i {
		margin-left: .4rem;
	}
	
	.taxBusiness-page .mint-tab-item {
		color: #B0B0B0;
	}
	
	.taxBusiness-page .mint-navbar .mint-tab-item.is-selected {
		border-bottom: 3px solid #FF7043 !important;
		color: #fff !important;
	}
	
	.taxBusiness-page .mint-navbar {
		/*position: absolute;
	width: 100%;
	bottom: 0;
	height: 2.5em;
	*/
		height: 3em;
		line-height: 3em;
	}
	
	.taxBusiness-page .mint-navbar .mint-tab-item.is-selected {
		/*border-top: 3px solid #FF7043 !important;*/
		background: #ff7043
	}
	
	.taxBusiness-page .mint-tab-item-label {}
	
	.taxBusiness-page .mint-navbar .mint-tab-item {
		padding-top: 0.8em !important;
	}
	
	.taxBusiness-page .mint-tab-container-item {
		margin-bottom: 6rem;
	}
	
	.taxBusiness-page .showMenu-popup .mint-popup-3 {
		height: auto !important;
		width: 100%;
		background-color: rgba(0, 0, 0, 0);
	}
	
	.taxBusiness-page .showMenu-popup .mint-popup {
		background: #000 !important;
	}
	
	.taxBusiness-ul {
		height: 100%;
		width: 100%
	}
	
	.taxBusiness-li {
		margin-top: 1em;
		margin-bottom: 2em;
		float: left;
		height: auto;
		width: 33.33333333333333%;
	}
	
	.taxBusiness-fun {
		width: 7em;
		height: 4em;
		text-align: center;
		margin: 0 auto;
	}
	
	.taxBusiness-img {
		width: 56%;
		height: 100%;
		display: block;
		margin: 0 auto;
		border-radius: 45%;
		box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
	}
	
	.taxBusiness-img img {
		margin-top: 0.55em;
		width: 65%;
		height: 65%;
	}
	
	.taxBusiness-fun>p {
		padding-top: 0.5em;
		color: #000000;
	}
	/*
.taxBusiness-img{
background-color:#ee683e
}
*/
</style>
<style>
	.taxBusiness-page .mint-tab-item-label {
		font-size: 1.4rem !important;
		line-height: 1.5;
	}
</style>
<script>
	import showMenu from './showMenu.vue'
	import api from '../../../api/';
	import config from '../../../api/config'
	import { Popup, Navbar, TabItem, TabContainer, TabContainerItem, Toast, Indicator } from 'mint-ui';
	const localStorage = global.localStorage;
	export default {
		components: {
			showMenu
		},
		data() {
			return {
				shengDm: '', //区域公众号 省代码
				wxImgvUrl: config.wxImgvUrl,
				lastCity: '',
				funType: '',
				funs: [],
				showMenuPoupVisible: false,
				selectCityPoupVisible: false,
				selectedTax: 'gsTab',
				isShowIcon: true,
				//功能图标颜色
				imgBackground: ['#ee683e', '#6863db', '#01c38e', '#ff933e', '#35b7b5', '#6396db', '#35b7b5', '#3563a3', '#dd4e6c', '#6863db', '#ee683e', '#01c38e', '#ff933e', '#ee683e', '#6863db', '#01c38e', '#ff933e', '#35b7b5', '#6396db', '#35b7b5', '#3563a3', '#dd4e6c', '#6863db', '#ee683e', '#01c38e', '#ff933e'],
			}
		},
		methods: {
			fetchData: function(obj) {
				if(obj) {
					console.log("选择功能类型：" + obj);
					console.log("地区代码:" + this.lastCity.xzqhDm);
					this.closeShowMenuAgent();
					return;
				}
				console.log("刷新数据" + this.$route.query.funType);
				var city = localStorage.getItem("taxBusiness.selectCity." + this.shengDm);
				if(!city) {
					city = {};
				} else {
					city = JSON.parse(city);
				}
				this.lastCity = city;
				console.log("初始化:" + city);
				this.funType = this.$route.query.funType;
				this.loadCityFuns();
			},
			chooseFun: function(obj) {
				this.loadCityFuns(this.lastCity.xzqhDm, obj);
				this.funType = obj;
				this.closeShowMenuAgent();
			},
			loadCityFuns: function(xzqhDm, funType) {
				var param = {};
				param.xzqhDm = '';
				param.gnLx = '';
				if(xzqhDm && funType) {
					param.xzqhDm = xzqhDm;
					param.gnLx = funType;
					this.funType = funType;
				} else {
					param.xzqhDm = this.lastCity.xzqhDm;
					param.gnLx = this.funType;
				}
				var _this = this;
				console.log("loadCityFuns-----------" + "\txzqhDm:" + param.xzqhDm + "\tfunType:" + param.gnLx);
				api.ysGetXzqhGncd(param).then((response) => {
					console.log("====loadCityFuns===start==" + response.data.head.errorCode);
					if(response.data.head.errorCode == '0') {
						console.log("请求成功！++++++++++++地区功能");
						_this.funs = response.data.body;
					}
					console.log("====loadCityFuns===end==");
				}).catch((response) => {

				});

			},
			setCityFuns: function(funs, city) {
				console.log("setCityFuns====" + city.xzqhMc);
				this.funs = funs;
				//bugger  设置无效？
				//this.lastCity = city;
				this.setCity(city);
				this.closeSelectCityAgent(city);
			},
			setCity: function(city) {
				console.log("setCity===========" + city.xzqhMc);
				this.lastCity = city;
				console.log("setCity===========after" + this.lastCity.xzqhMc);
			},
			openShowMenuAgent: function() {
				this.showMenuPoupVisible = true;
			},
			closeShowMenuAgent: function() {
				this.showMenuPoupVisible = false;
			},
			goBack: function() {
				window.history.go(-1);
			},
			openSelectCityPage: function(flag) {
				if(this.lastCity.xzqhDm == '440300' && flag) { //深圳
					console.log("openSelectCityPage--深圳");
					return;
				}
				if(this.lastCity.xzqhDm == '500100' && flag) { //重庆
					console.log("openSelectCityPage--重庆");
					return;
				}
				if(this.$route.query.shengDm == '370200' && flag) { //青岛
					console.log("openSelectCityPage--青岛");
					return;
				}
				var city = localStorage.getItem("taxBusiness.selectCity." + this.shengDm);
				if(!city) {
					city = {};
				} else {
					city = JSON.parse(city);
				}
				this.lastCity = city;
				this.$router.push({ path: '/selectCity', query: { lastCity: this.lastCity, funType: this.funType, shengDm: this.shengDm } });
			},
			closeSelectCityAgent: function(city) {
				//如果未选择城市就退出去   办税专区
				var city = localStorage.getItem("taxBusiness.selectCity." + this.shengDm);
				console.log("选择city返回-----" + city);
				if(!city) {
					this.selectCityPoupVisible = false;
					window.history.go(-1);
				} else {
					this.selectCityPoupVisible = false;
					console.log("======3333========" + city);
					//this.setCity(city);
					this.lastCity = JSON.parse(city);
					console.log("======4444========" + city);
				}
			},
			openFun: function(funUrl) {
				Indicator.open({ text: '加载中...', spinnerType: 'triple-bounce' });
				console.log("办税功能地址:" + funUrl);
				window.setTimeout(function() {
					window.location.href = funUrl;
					Indicator.close();
				}, 100);
			},
			getLocation: function() {
				console.log("刷新地理位置");
			}
		},
		computed: {

		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				//如果没有选择城市就跳到  选择城市的page
				if(vm.$route.query.shengDm == '500000') { //办税大厅 重庆区域编码 为 500100
					vm.shengDm = '500100';
				} else {
					vm.shengDm = vm.$route.query.shengDm;
				}
				vm.funType = vm.$route.query.funType;
				var selectCity = localStorage.getItem("taxBusiness.selectCity." + vm.shengDm);
				console.log("进入index :\t" + selectCity);
				var shengDm = vm.shengDm;
				var funType = vm.$route.query.funType;
				console.log("url参数 :\tshengDm" + shengDm + "\tfunType" + funType);
				if(shengDm == '440300') {
					var city = {};
					city.xzqhDm = '440300';
					city.xzqhMc = '深圳市';
					vm.isShowIcon = false;
					vm.lastCity = city;
					vm.loadCityFuns(shengDm, funType);
					localStorage.setItem("taxBusiness.selectCity." + shengDm, city == undefined ? "" : JSON.stringify(city));
					return;
				}
				if(shengDm == '500100') {
					var city = {};
					city.xzqhDm = '500100';
					city.xzqhMc = '重庆市';
					vm.isShowIcon = false;
					vm.lastCity = city;
					vm.loadCityFuns(shengDm, funType);
					localStorage.setItem("taxBusiness.selectCity." + shengDm, city == undefined ? "" : JSON.stringify(city));
					return;
				}
				if(shengDm == '370200') {
					var city = {};
					city.xzqhDm = '370200';
					city.xzqhMc = '青岛';
					vm.isShowIcon = false;
					vm.lastCity = city;
					vm.loadCityFuns(shengDm, funType);
					localStorage.setItem("taxBusiness.selectCity." + shengDm, city == undefined ? "" : JSON.stringify(city));
					return;
				}
				vm.isShowIcon = true;
				//进来 没有城市缓存跳转到选择城市页面
				console.log("路由to：" + to.path + "\tfrom:" + from.path);
				if(!selectCity) {
					if(from.path == '/selectCity') { //从选择城市页进来(不选择城市返回)，则直接返回到上一页(办税大厅)
						window.history.go(-1);
					} else { // 从办税大厅的具体功能进来
						console.log("========openSelectCityPage========");
						var flag = false;
						vm.openSelectCityPage(flag);
					}
					return;
				}

				vm.fetchData();

			});
		},
	}
</script>