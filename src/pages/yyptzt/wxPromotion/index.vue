<template>
	<div class="wxtg zt-page">
		<!--<v-wx-header title="我的微信推广" showLeft/>-->
		<!-- <v-zt-header title="我的微信推广" showLeft /> -->
		<div class="wxPromotion-label">
			<div class="wxPromotion-label-text">
				我的微信推广
			</div>
			<div class="wxPromotion-label-select">
				<!--<el-select v-model="date" size="small" @change="changeDate" popper-class="wxtg-select">
					<el-option v-for="item in options" :key="item.value" :value="item.value">
					</el-option>
				</el-select>-->
				<div class="block">
					<!--<el-date-picker :clearable="false" :editable="false" @change="changeDate" v-model="options" type="month" placeholder="选择月" :picker-options="pickerOptions0" @focus="blur">-->
					<el-date-picker :clearable="false" :editable="false" @change="changeDate" v-model="options" type="month" placeholder="选择月" @focus="blur">
					</el-date-picker>
				</div>
			</div>
		</div>
		<div class="wxPromotion-nav">
			<mt-button size="small" v-bind:style="this.tabActive=='fansData'?'color: #fff;background: #f17712;':''" @click.native.prevent="tabActive = 'fansData'">粉丝数据统计</mt-button>
			<mt-button size="small" v-bind:style="this.tabActive=='fansDetail'?'color: #fff;background: #f17712;':''" @click.native.prevent="tabActive = 'fansDetail'">粉丝明细</mt-button>
		</div>
		<div class="wxPromotion-tab" @touchstart="rotateUp">
			<mt-tab-container v-model="tabActive">
				<mt-tab-container-item id="fansData">
					<div class="fansData">
						<div class="fansData-add">
							净新增推广粉丝数：<span style="color: #ee7713;">{{addFansCount}}</span>
						</div>
						<div class="fansData-cancel">
							取消关注粉丝数：<span style="color: #ee7713;">{{cancenlfansCount}}</span>
						</div>
					</div>
					<div align="center">
						<table border="1" width="90%" bordercolor="#c9c9c9"  font-weight="normal">
							<tr>
								<th>日期</th>
								<th>新增/取关</th>
								<th>净增</th>
								<th>绑定企业</th>
							</tr>
							<tr v-for="item in fansData">
								<td>{{item.subscribeDate}}</td>
								<td>{{item.newFansDate}}/{{item.cancelFansDate}}</td>
								<td>{{item.newFansDate - item.cancelFansDate}}</td>
								<td>{{item.bindEnterps}}</td>
							</tr>
						</table>
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="fansDetail">
					<mt-loadmore :bottom-method="loadAll" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="fill">
						<div class="fansDetail">
							<div class="fansDetail-item" v-for="item in fansDetail">
								<div class="fansDetail-item-left">
									<img :src="item.headimgurl" />
								</div>
								<div class="fansDetail-item-middle">
									<div class="fansDetail-item-middle-name">
										{{item.nickname}}
									</div>
									<div class="fansDetail-item-middle-area">
										{{item.province}}{{item.city}}
									</div>
								</div>
								<div class="fansDetail-item-right">
									{{new Date(item.subscribeTime).toLocaleDateString().split('/').join('-')}}
								</div>
							</div>
						</div>
						<div class="pushDown" v-if="buttonShow">
							<div style="font-size: 1.3rem;" v-show="bottomStatus !== 'loading'"><span class="pushDown-text" v-bind:style="!rotate?'transform: rotate(0deg) translateY(.2rem);':'transform: rotate(180deg);'" v-if="arrowShow">︾</span>{{loadText}}</div>
							<span v-show="bottomStatus === 'loading'">
                           <mt-spinner style="margin: 0 auto;" type="snake"></mt-spinner>
                            </span>
						</div>
					</mt-loadmore>
					<vBlackData v-if="noData"></vBlackData>
				</mt-tab-container-item>
			</mt-tab-container>
		</div>

	</div>
</template>

<script>
	import ElementUI from 'element-ui';
	import api from '../../../api/';
	import { TabContainer, TabContainerItem } from 'mint-ui';
	import { Toast, Indicator, MessageBox } from 'mint-ui';
	import { Loadmore } from 'mint-ui';
	import Vue from 'vue';
	import img from '../../../assets/images/touxiang.png';
	const ZT_LOGIN_INFO = 'ZT_LOGIN_INFO'
	const ZT_PROMOTION_INFO = 'ZT_PROMOTION_INFO'
	Vue.component(Loadmore.name, Loadmore);
	Vue.component(TabContainer.name, TabContainer);
	Vue.component(TabContainerItem.name, TabContainerItem);
	export default {
		data() {
			return {
				addFansCount: '0',
				cancenlfansCount: '0',
				date: '选项1',
				tabActive: 'fansData',
				options: '',
				/*pickerOptions0: {
					disabledDate(time) {
						return time.getTime() > Date.now() - 8.64e7;
					}
				},*/
				fansData: [],
				fansDetail: [],
				fill: false,
				allLoaded: false,
				enterLoad: '',
				pageSize: '',
				pageIndex: '1',
				buttonShow: '',
				loadText: '',
				arrowShow: '',
				rotate: false,
				bottomStatus: '',
				noData: '',
			}
		},
		methods: {
			blur() {
				document.activeElement.blur();
			},
			changeDate(val) {
				this.options = val;
				this.fansDetail = [];
				this.pageIndex = "1";
				this.subscribeUserCount();
				this.subscribeUserInfo();
			},
			rotateUp() {
				//下拉箭头上下方向判断
				if(this.tabActive == 'fansData') {
					return;
				}
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
			loadAll() {
				if(this.enterLoad) {
					this.pageIndex++;
					this.subscribeUserInfo();
				}
			},
			handleBottomChange(status) {
				this.bottomStatus = status;
			},
			subscribeUserCount() {
				var ztLoginInfo = localStorage.ZT_LOGIN_INFO;
				ztLoginInfo = JSON.parse(ztLoginInfo);
				let params = {};
				params = {
					"userId": ztLoginInfo.userId,
					"subDate": this.options,
				}
				api.subscribeUserCount(params).then((response) => {
					if(response.data.head.errorCode == 0) {
						this.fansData = response.data.body.fansDayList;
						this.addFansCount = response.data.body.subs - response.data.body.unSubs;
						this.cancenlfansCount = response.data.body.unSubs;

					}
				}).catch((response) => {
					Indicator.close();
					Toast('哎呀！网络出了点问题，请稍后重试！');
				});
			},
			subscribeUserInfo() {
				var ztLoginInfo = localStorage.ZT_LOGIN_INFO;
				ztLoginInfo = JSON.parse(ztLoginInfo);
				let params = {};
				params = {
					"userId": ztLoginInfo.userId,
					"subDate": this.options,
					"pageSize": this.pageSize,
					"pageIndex": this.pageIndex,
				}
				api.subscribeUserInfo(params).then((response) => {
					this.$refs.loadmore.onBottomLoaded();
					if(response.data.head.errorCode == 0) {
						if(response.data.body.data.length == 0) {
							this.noData = true;
							this.buttonShow = false;
							this.allLoaded = true;
							return
						}
						this.buttonShow = true;
						this.noData = false;
						var length = response.data.body.data.length;
						for(let i = 0; i < length; i++) {
							this.fansDetail.push(response.data.body.data[i])
						}
						if(this.fansDetail.length == response.data.body.pager.recordCount) {
							this.enterLoad = false;
							this.arrowShow = false;
							this.allLoaded = true;
							this.loadText = "已加载完全";
						}
					}
				}).catch((response) => {
					Indicator.close();
					Toast('哎呀！网络出了点问题，请稍后重试！');
				});
			},
			getCurYear() {
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				if(month <= 9){
				var curTime = year + '-0' + month;
				}else {
					var curTime = year + '-' + month;
				}
				return curTime;
			},
			/*getSession() {
				var ztLoginInfo = localStorage.ZT_LOGIN_INFO;
				ztLoginInfo = JSON.parse(ztLoginInfo);
				let params = {};
				params = {
					"userId": ztLoginInfo.userId,
					"subDate": this.options,
				}
				api.subscribeUserCount(params).then((response) => {
					if(response.data.head.errorCode == 0) {
						if(!(ZT_PROMOTION_INFO + this.options)) {
							localStorage.setItem(ZT_PROMOTION_INFO + this.options, JSON.stringify(response.data.body))
						}
						this.fansData = (ZT_PROMOTION_INFO + this.options).fansDayList;
						this.addFansCount = (ZT_PROMOTION_INFO + this.options).subs - (ZT_PROMOTION_INFO + this.options).unSubs;
						this.cancenlfansCount = (ZT_PROMOTION_INFO + this.options).unSubs;
					}
				}).catch((response) => {
					Indicator.close();
					Toast('哎呀！网络出了点问题，请稍后重试！');
				});
			}*/
		},
		created() {
			this.pageSize = Math.round(window.screen.height / 120);
			//			this.getCurYear();
			this.options = this.getCurYear();

		},
		activated() {
			this.enterLoad = true;
			this.buttonShow = false;
			this.pageIndex = '1';
			this.loadText = '上拉加载';
			this.arrowShow = true;
			this.allLoaded = false;
			this.fansDetail = [];
			this.tabActive = 'fansData';
			this.subscribeUserCount();
			this.subscribeUserInfo();
			this.noData = false;
		}
	}
</script>

<style scoped>
	.wxtg {
		background: #fff;
		height: 100%
	}

	.wxtg .wxPromotion-label {
		height: 3.4em;
		width: 100%;
		line-height: 3.4em;
		background-color: #ffffff;
		/* float: left; */
        padding: 0 1em;
	}

	.wxtg .wxPromotion-label-text {
		float: left;
		width: 50%;
        height: 100%;
		border-bottom: 1px solid #E3E3E3;
		color: #000;
	}

	.wxtg .wxPromotion-label-select {
		float: left;
		width: 50%;
		height: 100%;
		border-bottom: 1px solid #E3E3E3;
	}

	.el-select {
		height: auto;
		width: 80%;
	}

	.el-select>.el-input {
		height: 1em;
	}

	.el-select-dropdown__item.selected.hover {
		background-color: #FF7043;
	}

	.el-select-dropdown__item.selected {
		background-color: #FF7043;
	}

	.el-select-dropdown__item {
		height: 2em;
		line-height: 2em;
		padding: 0 0 0 0.3em;
		font-size: 1rem;
	}

	.wxtg .wxPromotion-tab {
		float: left;
		width: 100%;
		background: #ffffff;
	}

	.wxtg .wxPromotion-nav {
		width: 75%;
		height: 3.4rem;
		background: rgba(242, 242, 242, 1);
		margin: 1.5rem auto 0;
		border-radius: 1.2rem;
        overflow: hidden;
	}

	.wxtg .mint-button::after {
		background: transparent;
	}

	.wxtg .wxPromotion-nav button {
		width: 50%;
		border: none;
		background: transparent;
		margin: 0;
		box-shadow: none;
		color: #333333;
		padding: 0;
		height: 100%;
		border-radius: 0;
		margin-right: -.5rem;
	}

	.wxtg .wxPromotion-nav button:nth-child(1) {
		border-radius: 1.2rem 0 0 1.2rem;
	}

	.wxtg .wxPromotion-nav button:nth-child(2) {
		border-radius: 0 1.2rem 1.2rem 0;
	}

	.wxtg .nav-button-show {
		color: #fff;
		background: #f17712;
	}

	.wxtg .fansData .mint-tab-container-item {
		background-color: #ffffff;
	}

	.wxtg .fansData {
		height: auto;
		width: 90%;
		margin: 1.5em auto 3.5em;
		color: #6a6a6a;
	}

	.wxtg .fansData-add {
		float: left;
		width: 55%;
		color: #6a6a6a;
		font-size: 1.35rem;
	}

	.wxtg .fansData-cancel {
		float: left;
		width: 45%;
		text-align: right;
		font-size: 1.35rem;
	}

	.wxtg table td,
	th {
		text-align: center;
		font-weight: normal;
		height: 3.4rem;
		white-space: nowrap;
		color:#000;
	}

	.fansDetail {
		padding-top: 0.5em;
	}

	.fansDetail-item {
		width: 92%;
		height: 4.5em;
		margin: 0 auto;
		display: block;
		border-bottom: 0.1em solid #E3E3E3;
	}

	.fansDetail-item-left {
		float: left;
		width: 22%;
		height: 4.5em;
	}

	.fansDetail-item-left>img {
		height: 3.5em;
		width: 3.5em;
		margin-top: 0.5em;
		display: block;
		overflow: hidden;
	}

	.fansDetail-item-middle {
		float: left;
		width: 46%;
		height: auto;
	}

	.fansDetail-item-middle-name {
		margin-top: 0.5em;
		font-size: 0.9em;
	}

	.fansDetail-item-middle-area {
		margin-top: 1em;
		color: #ababab;
		font-size: 0.85em;
	}

	.fansDetail-item-right {
		margin-top: 1em;
		float: left;
		width: 32%;
		height: auto;
		font-size: 0.63em;
	}

	.wxPromotion-label-select .el-date-editor {
		width: 100%;
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

	.center tr {
		height: 4rem;
	}
</style>
<style type="text/css">
	.wxtg .wxPromotion-nav .mint-button-text {
		margin: 0;
		font-weight: 400;
		font-size: 1.4rem;
	}

	.wxtg-select .el-select-dropdown__list {
		height: 14rem;
	}
	.wxtg .el-input__inner {
		-webkit-appearance: inherit;
	}
</style>
