<template>
	<div class="cultivate-sign">
		<v-wx-header title="培训签到"/>
		<div class="apple-userinfo">
			<img :src="wechatImage" alt="" />
			<span>{{ wechatName }}</span>
		</div>
		<div class="personalInfo-form" v-if="fillForm">

			<div class="personalInfo-item">
				<div class="personalInfo-item-label">
					<span><span style="color:#FF9E0F">*</span>签到区域：</span>
				</div>
				<div class="personalInfo-item-selectArea">
					<div class="areaName">
						{{areaName}}
					</div>
				</div>
			</div>
			<div class="personalInfo-item topline">
				<div class="personalInfo-item-label">
					<span><span style="color:#FF9E0F">*</span>培训场次：</span>
				</div>
				<div class="personalInfo-item-input theme-input">
					<!--<input type="text" placeholder="" v-model="theme" ref="input" @focus="closeSelectAreaAgent()" readonly="readonly" />-->
					<div class="themeText" v-if="hasSceneId">{{theme}}</div>
					<div class="themeText" v-else @click="openthemeselect">{{theme}}</div>
					<div class="selectIcon positionIcon" v-if="show">
						<i class="iconfont icon-jiantou-copy1"></i>
					</div>
				</div>

			</div>
			<div class="personalInfo-item">
				<div class="personalInfo-item-label">
					<span><span style="color:#FF9E0F">*</span>姓&nbsp;&nbsp;&nbsp;&nbsp;名&nbsp;&nbsp;&nbsp;：</span>
				</div>
				<div class="personalInfo-item-input">
					<input type="text" placeholder="请输入您的姓名" v-model="name" ref="input" @focus="closeSelectAreaAgent()" :readonly="this.existSignText.length>0?'true':false" v-bind:class="this.existSignText.length>0?'noselect':''" />
				</div>
			</div>
			<div class="personalInfo-item">
				<div class="personalInfo-item-label">
					<span><span style="color:#FF9E0F">*</span>手机号码：</span>
				</div>
				<div class="personalInfo-item-input">
					<input type="number" placeholder="请输入您的手机号" v-model="phone" ref="input" @focus="closeSelectAreaAgent()" :readonly="this.existSignText.length>0?'true':false" v-bind:class="this.existSignText.length>0?'noselect':''" />
				</div>
			</div>
			<div class="personalInfo-item">
				<div class="personalInfo-item-label personalInfo-identifier">
					<span class="identifier"><span class="identifier-star" style="color:transparent">*</span><span class="identifier-text">识&nbsp;别&nbsp;号&nbsp;：</span></span>
				</div>
				<div class="personalInfo-item-input identifier-input">
					<input type="text" placeholder="请输入纳税人识别号" v-model="nsrsbh[0]" ref="input" @focus="closeSelectAreaAgent()" :readonly="this.existSignText.length>0?'true':false" v-bind:class="this.existSignText.length>0?'noselect':''" />
				</div>
			</div>
			<div class="personalInfo-item">
				<div class="personalInfo-item-label">
					<span><span style="color:#FF9E0F">*</span>公司名称：</span>
				</div>
				<div class="personalInfo-item-input">
					<input type="text" placeholder="请输入公司名称" v-model="company[0]" ref="input" @focus="closeSelectAreaAgent()" :readonly="this.existSignText.length>0?'true':false" v-bind:class="this.existSignText.length>0?'noselect':''" />
				</div>
			</div>
			<div style="margin-top:.5rem ;" v-if='pushCompany' v-for="(list,index) in lists">
				<div class="personalInfo-item">
					<div class="personalInfo-item-label personalInfo-identifier">
						<span class="identifier"><span class="identifier-star" style="color:transparent">*</span><span class="identifier-text">识&nbsp;别&nbsp;号&nbsp;：</span></span>
					</div>
					<div class="personalInfo-item-input identifier-input">
						<input type="text" placeholder="请输入纳税人识别号" v-model="nsrsbh[index+1]" ref="input" @focus="closeSelectAreaAgent()" :readonly="this.existSignText?'true':false" v-bind:class="this.existSignText?'noselect':''" />
					</div>
				</div>
				<div class="personalInfo-item">
					<div class="personalInfo-item-label">
						<span><span style="color:transparent">*</span>公司名称：</span>
					</div>
					<div class="personalInfo-item-input">
						<input type="text" placeholder="请输入公司名称" v-model="company[index+1]" ref="input" @focus="closeSelectAreaAgent()" :readonly="this.existSignText?'true':false" v-bind:class="this.existSignText?'noselect':''" />
					</div>
				</div>
			</div>
			<div class="add-sign-company" @click="addCompany" v-if="!existSignText.length>0">
				<span class="addIcon"><b>+</b></span>
				<span class="add-company">增加签到公司</span>
			</div>
			<div class="apply-buttom" v-if="showbutton">
				<mt-button size="large" v-bind:class="this.existSignText.length>0?'sign_none':'sign'" @click="sureSign">{{buttonText}}</mt-button>
			</div>
		</div>
		<div class="signInfo-show" v-else>
			<div class="signInfo-show-content">
				<div><span>签到地区：</span><span>{{areaName}}</span></div>
				<div class="signInfo-show-line"><span>培训场次：</span><span>{{theme}}</span></div>
			</div>
			<div class="signInfo-show-content">
				<div><span>姓名：</span><span>{{name}}</span></div>
				<div><span>手机号码：</span><span>{{phone}}</span></div>
				<div v-for="addlist in addlists">
					<div><span>识别号：</span><span>{{addlist.nsrsbh}}</span></div>
					<div><span>公司名称：</span><span>{{addlist.company}}</span></div>
				</div>
			</div>
			<div class="apply-buttom" v-if="showbutton">
				<mt-button size="large" class="sign_none">{{buttonText}}</mt-button>
			</div>
		</div>
		<div class="showSelect" v-if="!hasSceneId">
			<mt-popup v-model="selectTheme" position="bottom" class="mint-popup-3" popup-transition="popup-fade" :modal="false">
				<theme @closethemeselect="closethemeselect" @setTheme="setTheme" @setSceneId="setSceneId" @setArea="setArea" @noSelect="noSelect"></theme>
			</mt-popup>
		</div>
	</div>
</template>

<script>
	import api from '../../api/';
	import { Toast, Indicator, MessageBox } from 'mint-ui';
	import theme from './theme'
	import ElementUI from 'element-ui'
	export default {
		components: {
			theme
		},
		data() {
			return {
				wechatName: '',
				wechatImage: '',
				signId: '',
				sceneId: '',
				province: '',
				city: '',
				company: [],
				phone: '',
				name: '',
				theme: '请选择培训场次',
				areaName: '',
				buttonText: '签到',
				existSignText: '',
				nsrsbh: [],
				openId: '',
				companyId: '',
				pushCompany: false,
				lists: 0,
				fillForm: true,
				addlists: [],
				areaCode: '',
				selectTheme: false,
				hasSceneId: true,
				show:'',
				showbutton:true,
			}
		},
		methods: {
			openthemeselect() {
				if(this.existSignText.length > 0) {
					return;
				}
				this.selectTheme = true;
			},
			closethemeselect() {
				this.selectTheme = false;
			},
			setTheme(theme) {
				this.theme = theme;
			},
			setSceneId(sceneId) {

				this.sceneId = sceneId;
			},
			setArea(areaName) {
				this.areaName = areaName;
			},
			closeSelectAreaAgent() {
				this.selectTheme = false;
				this.existSignText.length > 0 ? this.blur() : '';
			},
			blur() {
				document.activeElement.blur();
			},
			noSelect() {
					this.show = false;
					this.hasSceneId = true;
					this.showbutton = false;
					this.theme = "无培训场次";
			},
			sureSign() {
				var singInfoLength = '';
				if(this.company.length > this.nsrsbh.length) {
					singInfoLength = this.company.length;
				} else {
					singInfoLength = this.nsrsbh.length;
				}
				if(this.existSignText.length > 0) {
					return
				}
				if(!this.name) {
					Toast('姓名不能为空');
					return
				}
				if(!this.phone) {
					Toast('手机号码不能为空');
					return
				}
				if(!(/^1[34578]\d{9}$/.test(this.phone))) {
					Toast('手机号码格式不正确');
					return
				}
				for(let i = 0; i < singInfoLength; i++) {
					if (this.nsrsbh[i] == undefined) {
						this.nsrsbh[i] = '';
					}
					if(this.nsrsbh[i].length == 0) {
						/*Toast('纳税人识别号不能为空');
						return*/
					} else if(this.nsrsbh[i].length != 12 && this.nsrsbh[i].length != 15 && this.nsrsbh[i].length != 18 && this.nsrsbh[i].length != 20) {
						Toast('纳税人识别号格式错误');
						return;
					}
				}
				if(!this.company[0]) {
					Toast('公司名称不能为空');
					return
				}

				Indicator.open({
					text: "签到中！请稍候",
					spinnerType: 'snake'
				});
				//调用签到接口
				var params = {};
				var singInfo = [];
				
				for(let i = 0; i < singInfoLength; i++) {
					var info = {};
					if(this.nsrsbh[i] == undefined) {
						this.nsrsbh[i] = '';
					}
					if(this.company[i] == undefined) {
						this.company[i] = '';
					}
					info.openId = this.openId;
					info.sceneId = this.sceneId;
					info.userName = this.name;
					info.companyId = this.companyId;
					info.userPhone = this.phone;
					info.companyName = this.company[i];
					info.nsrsbh = this.nsrsbh[i];
					singInfo.push(info);
				}
				params.singInfo = singInfo;
				api.userSignList(params).then((response) => {
					if(response.data.head.errorCode == '0') {
						Indicator.close();
						this.$message({
							message: '签到成功',
							type: 'success',
							customClass: 'messageAl'
						});
						this.buttonText = '已签到';
						this.existSignText = '亲！今天签到过了(∩_∩)'
						this.show = false;
					} else if(response.data.head.errorCode == '1') {
						Indicator.close();
						this.$message({
							message: response.data.head.errorMsg,
							type: 'error',
							customClass: 'messageAl'
						});
					} else if(response.data.head.errorCode == '2') {
						Indicator.close();
						this.$message({
							message: response.data.head.errorMsg,
							type: 'error',
							customClass: 'messageAl'
						});
					}
				}).catch((response) => {
					Indicator.close();
					Toast('哎呀！网络出了点问题，请稍后重试！');
				});
			},
			//查询上一次签到信息
			querySignInfoDistinct() {
				Indicator.open({
					text: "检测是否已签到！请稍候",
					spinnerType: 'snake'
				});
				var params = {};
				var that = this;
				params.openId = this.openId;
				params.sceneId = this.sceneId;

				api.querySignInfoList(params).then((response) => {
					if(response.data.head.errorCode == '0') {
						Indicator.close();
						this.fillForm = false;
						this.name = response.data.body.userTrainInfo[0].userName;
						this.phone = response.data.body.userTrainInfo[0].userPhone;
						for(let i = 0; i < response.data.body.userTrainInfo.length; i++) {
							this.addlists.push({ company: response.data.body.userTrainInfo[i].companyName, nsrsbh: response.data.body.userTrainInfo[i].nsrsbh });
						}
						this.theme = response.data.body.trainInfo.trainTheme;
						this.areaName = response.data.body.trainInfo.areaName;
						this.buttonText = '已签到';
						this.existSignText = '亲！今天签到过了(∩_∩)'

					} else {
						this.fillForm = true;
						this.theme = response.data.body.trainInfo.trainTheme;
						this.areaName = response.data.body.trainInfo.areaName;
						//this.$message.info(response.data.head.errorMsg);
					}

					Indicator.close();
				}).catch((response) => {
					Indicator.close();
					Toast('哎呀！网络出了点问题，请稍后重试！');
				});
			},
			addCompany() {
				this.pushCompany = true;
				this.lists++;
			},
			addlistsValues() {
            //有场次id时 显示返回场次；无场次id时开启场次选择
				if(this.sceneId) {
					this.hasSceneId = true;
					this.show = false
				} else {
					this.hasSceneId = false;
					this.show = true;
				}
			}
		},
		created() {
			this.areaName = '省份	城市';
			this.wechatImage = this.$route.query.wechatImage != undefined ? this.$route.query.wechatImage : 'http://p.qlogo.cn/bizmail/Tib8C2jsaHlAd4slsEKpj03OicPznv6bVEBL6ZTz3EHxlF3atOEFHvoQ/0';
			this.wechatName = this.$route.query.wechatName != undefined ? this.$route.query.wechatName : 'Hi';
			this.signId = this.$route.query.signId != undefined ? this.$route.query.signId : '';
			this.openId = this.$route.query.openId != undefined ? this.$route.query.openId : '';
			this.sceneId = this.$route.query.sceneId != undefined ? this.$route.query.sceneId : '';
			this.companyId = this.$route.query.companyId != undefined ? this.$route.query.companyId : '';
			if(this.sceneId) {
				this.querySignInfoDistinct();
			}
			this.addlistsValues();
		},
	}
</script>

<style scoped>
	.apple-userinfo {
		width: 8.5rem;
		margin: .8rem auto;
		text-align: center;
		color: #8A8A8A;
	}
	
	.apple-userinfo img {
		height: 8.5rem;
		width: 8.5rem;
		border-radius: 50%;
		border: 1px solid #e3e3e3;
		margin-bottom: .4rem;
	}
	
	.personalInfo-form .mint-button-text {
		font-size: 1.8rem;
		font-weight: 400;
	}
	
	.topline {
		margin-bottom: .6rem;
	}
	
	.personalInfo-item {
		width: 100%;
		height: 5rem;
		background: #ffffff;
		border-bottom: 0.1em solid #E3E3E3;
	}
	
	.personalInfo-item-label {
		float: left;
		width: 30%;
		height: 5rem;
		text-align: left;
	}
	
	.personalInfo-item-label>span {
		line-height: 5rem;
		margin-left: 1.3rem;
		color: #8A8A8A
	}
	
	.personalInfo-item-input {
		float: left;
		width: 70%;
		height: auto;
		position: relative;
	}
	
	.positionIcon {
		position: absolute;
		right: 0;
		top: 0;
		color: #B6B6B6;
		width: 10%;
		height: 5rem;
		line-height: 5rem;
	}
	/*placeholder颜色*/
	
	*::-webkit-input-placeholder {
		color: #DDDDDE;
	}
	
	*:-moz-placeholder {
		color: #DDDDDE;
	}
	
	*:-ms-input-placeholder {
		/* IE10+ */
		color: #DDDDDE;
	}
	
	.personalInfo-item-input>input {
		width: 90%;
		height: 2.5em;
		margin-top: 0.4em;
	}
	
	.noselect {
		-webkit-user-select: none;
	}
	
	.apply-buttom {
		height: auto;
		width: 100%;
		margin-top: 1.4rem;
	}
	
	.mint-button {
		background-color: #F0870C;
		color: #ffffff;
		border-radius: 0 !important;
		height: 4.6rem;
	}
	
	.mint-button-text {
		font-weight: 400;
		font-size: 1.8rem;
	}
	
	.mint-button::after {
		background: none;
	}
	
	.personalInfo-item-selectArea {
		float: left;
		width: 70%;
		height: auto;
		padding-top: 1.4rem;
	}
	
	.personalInfo-item-selectArea .areaName {
		float: left;
		width: 100%;
		/*color: #B6B6B6;*/
		overflow-y: auto;
		white-space: nowrap;
	}
	
	.personalInfo-item-selectArea .province {
		float: left;
		width: 30%;
		color: #B6B6B6;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.personalInfo-item-selectArea .city {
		float: left;
		width: 30%;
		color: #B6B6B6;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.personalInfo-item-selectArea .selectIcon {
		float: right;
		width: 10%;
		color: #B6B6B6;
	}
	
	.personalInfo-item-selectArea .selectLabel {
		float: right;
		text-align: right;
		width: 30%;
		color: #B6B6B6;
	}
	
	.showSelect .mint-popup-3 {
		height: 40% !important;
		width: 100%;
		background: none;
	}
	
	.showSelect .selectArea-page {
		padding-bottom: 3.4%;
		bottom: 0;
		background: #fff;
	}
	
	.picker {
		background: #fff;
		border-top: 1px solid #E3E3E3;
	}
	
	.sign_none {
		background: #dadada;
		cursor: pointer;
	}
	
	.theme-input {
		/*color: #B6B6B6;*/
	}
	
	.themeText {
		height: 5rem;
		line-height: 5rem;
		overflow-y: auto;
		white-space: nowrap;
	}
	
	.identifier .identifier-text {
		white-space: nowrap;
		letter-spacing: .03rem;
	}
	
	.cultivate-sign .addIcon {
		position: relative;
		height: 2.2rem;
		width: 2.2rem;
		border-radius: 50%;
		background: #F76C07;
		margin-right: 1rem;
		line-height: 1.8rem;
	}
	
	.cultivate-sign .addIcon b {
		color: #f3f3f3;
		font-size: 2.4rem;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
	}
	
	.add-sign-company {
		display: flex;
		text-align: center;
		align-items: center;
		justify-content: center;
		margin-top: 1rem;
	}
	
	.add-company {
		color: #F76C07;
	}
	
	.signInfo-show .signInfo-show-content {
		background: #fff;
		padding: 1rem 0 .2rem .6rem;
	}
	
	.signInfo-show div {
		margin-bottom: 1rem;
	}
	
	.signInfo-show-line {
		margin-bottom: 1rem;
	}
	
	.selectTheme-page {
		padding-bottom: 3.4%;
		background: #fff;
	}
</style>
<style>
	.cultivate-sign .mint-button-text {
		font-weight: 400;
		font-size: 1.8rem;
	}
	
	.messageAl {
		top: 50% !important;
		margin-top: -2rem;
	}
	
	.cultivate-sign .picker {
		padding-bottom: 3.4%;
	}
</style>