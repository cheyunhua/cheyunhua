<template>

	<div class="ztse zt-page">
		<!--<v-wx-header title="我的服务评价" showLeft/>-->
		<!-- <v-zt-header title="我的服务评价" showLeft /> -->
		<div class="nav">
			<mt-button size="small" v-bind:style="this.active=='tab-container1'?'color: #fff;background: #f17712;':''" @click.native.prevent="active = 'tab-container1'">最近7天</mt-button>
			<mt-button size="small" v-bind:style="this.active=='tab-container2'?'color: #fff;background: #f17712;':''" @click.native.prevent="active = 'tab-container2'">全部</mt-button>
		</div>
		<div class="page-tab-container" @touchstart="rotateUp">
			<div class="page-loadmore-wrapper" ref="wrapper">

				<mt-tab-container v-model="active">
					<mt-tab-container-item id="tab-container1">
						<mt-loadmore v-if="this.active=='tab-container1'" :bottom-method="loadNear" @bottom-status-change="handleBottomChange" :bottom-all-loaded="nearLoaded" ref="loadmore" :autoFill="fill">
							<v-zt-evaluation v-for="listNear in listsNear" :nsrsbh="listNear.taxIdentifNumber" :company="listNear.cusName" :linkman="listNear.userName" :phone="listNear.mobilePhone" :time="new Date(listNear.evaluatTime).toLocaleDateString().split('/').join('-')"></v-zt-evaluation>
							<div class="pushDown" v-if="nearButtonShow">
								<div style="font-size: 1.3rem;" v-show="bottomStatus !== 'loading'"><span class="pushDown-text" v-bind:style="!rotate?'transform: rotate(0deg) translateY(.4rem);':'transform: rotate(180deg) translateY(.4rem);'" v-if="nearArrowShow">︾</span>{{loadNearText}}</div>
								<span v-show="bottomStatus === 'loading'">
                           <mt-spinner style="margin: 0 auto;" type="snake"></mt-spinner>
                                </span>
							</div>
						</mt-loadmore>
						<vBlackData v-if="nearNoData"></vBlackData>
					</mt-tab-container-item>
					<mt-tab-container-item id="tab-container2">
						<mt-loadmore v-if="this.active=='tab-container2'" :bottom-method="loadAll" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="fill">
							<v-zt-evaluation v-for="listAll in listsAll" :nsrsbh="listAll.taxIdentifNumber" :company="listAll.cusName" :linkman="listAll.userName" :phone="listAll.mobilePhone" :time="new Date(listAll.evaluatTime).toLocaleDateString().split('/').join('-')"></v-zt-evaluation>
							<div class="pushDown" v-if="allButtonShow">
								<div style="font-size: 1.3rem;" v-show="bottomStatus !== 'loading'"><span class="pushDown-text" v-bind:style="!rotate?'transform: rotate(0deg) translateY(.4rem);':'transform: rotate(180deg) translateY(.4rem);'" v-if="allArrowShow">︾</span>{{loadAllText}}</div>
								<span v-show="bottomStatus === 'loading'">
                           <mt-spinner style="margin: 0 auto;" type="snake"></mt-spinner>
                                </span>
							</div>
						</mt-loadmore>
						<vBlackData v-if="allNoData"></vBlackData>
					</mt-tab-container-item>
				</mt-tab-container>

			</div>

		</div>
	</div>
</template>

<script>
	import { Loadmore } from 'mint-ui';
	import { TabContainer, TabContainerItem } from 'mint-ui';
	import { Toast, Indicator, MessageBox } from 'mint-ui';
	import Vue from 'vue';
	import api from '../../../api/'
	const ZT_LOGIN_INFO = 'ZT_LOGIN_INFO'
	Vue.component(Loadmore.name, Loadmore);
	Vue.component(TabContainer.name, TabContainer);
	Vue.component(TabContainerItem.name, TabContainerItem);
	export default {
		data() {
			return {
				list: [],
				lista: [],
				listb: [],
				listsNear: [],
				listsAll: [],
				active: 'tab-container1',
				allLoaded: '',
				bottomStatus: '',
				fill: false,
				rotate: false,
				aPromiseNear: [],
				aPromiseAll: [],
				pageSize: '',
				nearPageIndex: '',
				allPageIndex: '',
				nearEnterLoad: '',
				allEnterLoad: '',
				loadNearText: '',
				loadAllText: '',
				nearArrowShow: '',
				allArrowShow: '',
				nearButtonShow: '',
				allButtonShow: '',
				nearNoData: '',
				allNoData: '',
				nearLoaded: ''
			}
		},
		methods: {
			handleBottomChange(status) {
				this.bottomStatus = status;
			},

			loadNear() {
				//7天 上拉加载
				if(this.nearEnterLoad) {
					this.nearPageIndex++;
					this.serviceEvaluationList("7", this.nearPageIndex);
				}
			},
			loadAll() {
				//全部 上拉加载
				if(this.allEnterLoad) {
					this.allPageIndex++;
					this.serviceEvaluationList("all", this.allPageIndex);
				}
			},
			rotateUp() {
				//下拉箭头上下方向判断
				var that = this;
				var y = event.changedTouches[0].clientY;
				$('.mint-loadmore-content').on('touchmove', function(ev) {
					var _y = event.changedTouches[0].clientY;
					if(y - _y > 0) {
						that.rotate = true;
					} else {
						that.rotate = false;
					}
				})
				$('.mint-loadmore-content').on('touchend', function() {
					that.rotate = false;
				})
			},
			serviceEvaluationList(type, index) {
				Indicator.open({
					text: "查询中！请稍候",
					spinnerType: 'snake'
				});
				var ztLoginInfo = localStorage.ZT_LOGIN_INFO;
				ztLoginInfo = JSON.parse(ztLoginInfo);
				let param = {};
				param.userId = ztLoginInfo.userId;
				param.type = type;
				param.pageSize = this.pageSize;
				param.pageIndex = index;

				var ajax = api.serviceEvaluationList(param).then((response) => {
					Indicator.close();
					this.$refs.loadmore.onBottomLoaded();
					if(response.data.head.errorCode == '0') {
						var listLength = response.data.body.data.length;
						//7天 加载数据控制
						if(this.active == 'tab-container1') {
							if(response.data.body.data.length == 0) {
								this.nearNoData = true;
								this.nearButtonShow = false;
								this.nearLoaded = true;
								return
							}
							this.nearButtonShow = true;
							this.nearNoData = false;
							for(let i = 0; i < listLength; i++) {
								this.lista.push(response.data.body.data[i]);
							}
							this.list = this.lista;
							if(this.lista.length == response.data.body.pager.recordCount) {
								this.nearEnterLoad = false;
								this.nearArrowShow = false;
								this.nearLoaded = true;
								this.loadNearText = "已加载完全";
							}
						}
						//全部 加载数据控制
						if(this.active == 'tab-container2') {
							if(response.data.body.data.length == 0) {
								this.allNoData = true;
								this.allButtonShow = false;
								this.allLoaded = true;
								return
							}
							this.allButtonShow = true;
							this.allNoData = false;
							for(let i = 0; i < listLength; i++) {
								this.listb.push(response.data.body.data[i]);
							}
							this.list = this.listb;
							if(this.listb.length == response.data.body.pager.recordCount) {
								this.allEnterLoad = false;
								this.allArrowShow = false;
								this.allLoaded = true;
								this.loadAllText = "已加载完全";
							}
						}
						//无传递值时置空
						for(let item of this.list) {
							if(!item.taxIdentifNumber) {
								item.taxIdentifNumber = "";
							}
							if(!item.cusName) {
								item.cusName = "";
							}
							if(!item.userName) {
								item.userName = "";
							}
							if(!item.mobilePhone) {
								item.mobilePhone = "";
							}
							if(!item.evaluatTime) {
								item.evaluatTime = "";
							}
						}

					}

					if(this.active == 'tab-container1') {
						return this.lista;
					}
					return this.listb;
				}).catch((response) => {
					Indicator.close();
					Toast('哎呀！网络出了点问题，请稍后重试！');
				});
				return ajax;
			},
			getAllInfo() {
				var that = this;
				if(this.listb.length == 0) {
					//获取全部的数据
					this.aPromiseAll = Promise.resolve(this.serviceEvaluationList("all", this.allPageIndex));
					this.aPromiseAll.then(function(result) { that.listsAll = result });
				}
			},
			init() {
				var that = this;
				//自动获取pageSize，铺面屏幕
				this.pageSize = Math.round(window.screen.height / 120);
				//获取7天的数据
				this.aPromiseNear = Promise.resolve(this.serviceEvaluationList("7", this.nearPageIndex));
				this.aPromiseNear.then(function(result) { that.listsNear = result });
			}
		},
		watch: {
			//首次进入全部时加载数据
			active(curVal, oldVal) {
				if(curVal == 'tab-container2') {
					this.getAllInfo();
				}
			}
		},
		created() {

		},
		activated() {
			//进入页面时重新初始化
			this.active = 'tab-container1';
			this.listsNear = [];
			this.listsAll = [];
			this.lista = [];
			this.listb = [];
			this.list = [];
			this.nearPageIndex = '1';
			this.allPageIndex = '1';
			this.nearEnterLoad = true;
			this.allEnterLoad = true;
			this.loadNearText = '上拉加载';
			this.loadAllText = '上拉加载';
			this.nearButtonShow = false;
			this.allButtonShow = false;
			this.nearArrowShow = true;
			this.allArrowShow = true;
			this.nearNoData = false;
			this.allNoData = false;
			this.nearLoaded = false;
			this.allLoaded = false;
			this.init();
		}
	}
</script>

<style scoped>
	.ztse {
		background: #fff;
	}

	.ztse .nav {
		width: 75%;
		height: 3.4rem;
		background: rgba(242, 242, 242, 1);
		margin: 1.5rem auto 0;
		border-radius: 1.2rem;
		overflow: hidden;
	}

	.ztse .nav button {
		width: 50%;
		border: none;
		background: transparent;
		margin: 0;
		box-shadow: none;
		color: #333333;
		padding: 0;
		height: 100%;
		margin-right: -.5rem;
	}

	.ztse .nav button:nth-child(1) {
		border-radius: 1.2rem 0 0 1.2rem;
	}

	.ztse .nav button:nth-child(2) {
		border-radius: 0 1.2rem 1.2rem 0;
	}

	.ztse .nav .mint-button-text {
		margin: 0;
	}

	.ztse .nav-button-show {
		color: #fff;
		background: #f17712;
	}

	.page-tab-container {
		padding: 1rem 2rem;
		background: #fff;
	}

	.pushDown {
		width: 15rem;
		height: 3rem;
		line-height: 3rem;
		text-align: center;
		margin: 2rem auto;
		background: rgba(242, 242, 242, 1);
		position: relative;
	}

	.pushDown-text {
		display: inline-block;
		position: absolute;
		left: 2.4rem;
	}
</style>
<style type="text/css">
	.ztse .nav .mint-button-text {
		margin: 0;
		font-weight: 400;
		font-size: 1.4rem;
	}

	.pushDown .mint-spinner-snake {
		margin: 0 auto;
	}

	.ztse .mint-button:after {
		display: none;
	}
</style>
