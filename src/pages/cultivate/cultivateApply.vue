<template>
	<div class="cultivate-apply">
		<v-wx-header title="培训报名" showLeft/>
		<div class="apple-userinfo">
			<img :src="wechatImage" alt="" />
			<span>{{ wechatName }}</span>
		</div>
		<div class="personalInfo-form">

			<!--				<div class="personalInfo-item">
					<div class="personalInfo-item-label">
						<span>&nbsp;公司名称:</span>
					</div>
					<div class="personalInfo-item-input">
						<input type="text" placeholder="请输入公司名称"  v-model="company" ref="input" @focus="closeSelectAreaAgent()"/>
					</div>
				</div>-->
			<div class="personalInfo-item">
				<div class="personalInfo-item-label">
					<span><span style="color:#FF9E0F">*</span>报名地区：</span>
				</div>
				<div class="personalInfo-item-selectArea" @click="openSelectAreaAgent">
					<div class="province">
						{{province}}
					</div>
					<div class="city">
						{{city}}
					</div>
					<div class="selectIcon">
						<i class="iconfont icon-jiantou-copy1"></i>
					</div>
				</div>
			</div>
			<div class="personalInfo-item topline">
				<div class="personalInfo-item-label">
					<span><span style="color:#FF9E0F">*</span>报名场次：</span>
				</div>
				<div class="personalInfo-item-input">
					<input class="apply-theme-input" type="text" placeholder="请选择报名场次	" v-model="theme" ref="input" @click="openthemeselect" @focus="closeSelectAreaAgent()" readonly="readonly" />
					<div class="selectIcon positionIcon">
						<i class="iconfont icon-jiantou-copy1"></i>
					</div>
				</div>

			</div>
			<div class="personalInfo-item">
				<div class="personalInfo-item-label">
					<span><span style="color:#FF9E0F">*</span>姓&nbsp;&nbsp;&nbsp;&nbsp;名&nbsp;&nbsp;&nbsp;：</span>
				</div>
				<div class="personalInfo-item-input">
					<input type="text" placeholder="请输入您的姓名" v-model="name" ref="input" @focus="closeSelectAreaAgent()" v-bind:class="this.existApplyText.length>0?'noselect':''"/>
				</div>
			</div>
			<div class="personalInfo-item">
				<div class="personalInfo-item-label">
					<span><span style="color:#FF9E0F">*</span>手机号码：</span>
				</div>
				<div class="personalInfo-item-input">
					<input type="number" placeholder="请输入您的手机号" v-model="phone" ref="input" @focus="closeSelectAreaAgent()" v-bind:class="this.existApplyText.length>0?'noselect':''"/>
				</div>
			</div>
			<div class="personalInfo-item">
				<div class="personalInfo-item-label">
					<span><span style="color:#FF9E0F">*</span>参加人数：</span>
				</div>
				<div class="personalInfo-item-input" @click="openapplynumselect">
					<input type="number" placeholder="请选择参加培训人数" v-model="applynum" ref="input" @focus="closeSelectAreaAgent()" />
					<div class="selectIcon positionIcon">
						<i class="iconfont icon-jiantou-copy1"></i>
					</div>
				</div>
			</div>
			<div class="apply-buttom">
				<mt-button size="large" v-bind:class="this.existApplyText.length>0?'apply_none':'apply'" @click="submitForm">{{buttonText}}</mt-button>
			</div>
			<div class="showSelectArea">
				<mt-popup v-model="selectAreaPoupVisible" position="bottom" class="mint-popup-3" popup-transition="popup-fade" :modal="false">
					<selectArea @closeSelectAreaAgent="closeSelectAreaAgent" @setCity="setCity"></selectArea>
				</mt-popup>
			</div>
			<div class="showSelectArea">
				<mt-popup v-model="applynumselect" position="bottom" class="mint-popup-3" popup-transition="popup-fade" :modal="false">
					<selectApplynum @closeapplynumselect="closeapplynumselect" @setApplynum='setApplynum'></selectApplynum>
				</mt-popup>
			</div>
			<div class="showSelectArea">
				<mt-popup v-model="selectTheme" position="bottom" class="mint-popup-3" popup-transition="popup-fade" :modal="false">
					<theme @closethemeselect="closethemeselect" @setTheme="setTheme"></theme>
				</mt-popup>
			</div>
		</div>
	</div>
</template>

<script>
	import selectArea from '../feedback/selectArea.vue';
	import selectApplynum from './applynum'
	import theme from './theme'
	export default {
		components: {
			selectArea,
			selectApplynum,
			theme
		},
		data() {
			return {
				wechatName: '',
				wechatImage: '',
				selectAreaPoupVisible: false,
				applynumselect: false,
				province: '',
				city: '',
				applynum: '',
				phone: '',
				name: '',
				theme: '',
				buttonText: '提交',
				existApplyText: '',
				selectTheme: false
			}
		},
		methods: {
			setCity(province, city) {
				this.province = province;
				this.city = city;
			},
			setApplynum(applynum) {
				this.applynum = applynum;
			},
			openSelectAreaAgent() {
				this.selectAreaPoupVisible = true;
			},
			closeSelectAreaAgent() {
				this.selectAreaPoupVisible = false;
			},
			openapplynumselect() {
				this.applynumselect = true;
			},
			closeapplynumselect() {
				this.applynumselect = false;
			},
			openthemeselect() {
				this.selectTheme = true;
			},
			closethemeselect() {
				this.selectTheme = false;
			},
			setTheme(theme) {
				this.theme = theme;
			},
			submitForm() {
				if(!this.name) {
					Toast("姓名不能为空！");
					return;
				}
				if(!this.phone) {
					Toast("手机号不能为空！");
					return;
				}
				if(!this.checkPhone(this.phone)) {
					Toast("手机号码有误，请重填");
					return;
				}
				if(this.province == "省份" || this.city == "城市") {
					Toast("请选择订购地区");
					return;
				}

				let param = {};
				param.buyingInclination = this.goodsInfo.goodsName + '(' + this.goodsDetails.goodsSku + ')',
					console.log("订购意向:" + param.buyingInclination);
				param.EcompanyName = this.company;
				param.linkman = this.name;
				param.mobileNumber = this.phone;
				param.Email = '';
				param.issueDescribe = '';
				param.leagueContent = '';
				param.productRemark = '';
				param.complaintsType = '';
				async(this, 'productsave', param, res => {
					if(res.head.errorCode == "0") {
						this.$router.push({ path: '/feedback/submitsuccess', query: { title: "订单" } });
					}
				})
			},
			checkPhone(phone) {
				if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
					return false;
				}
			},
		},
		created() {
			this.province = '省份';
			this.city = '城市';
			this.wechatImage = this.$route.query.wechatImage != undefined ? this.$route.query.wechatImage : 'http://p.qlogo.cn/bizmail/Tib8C2jsaHlAd4slsEKpj03OicPznv6bVEBL6ZTz3EHxlF3atOEFHvoQ/0';
			this.wechatName = this.$route.query.wechatName != undefined ? this.$route.query.wechatName : 'Hi';
		},
	}
</script>

<style scoped>
	.apple-userinfo {
		width: 8.5rem;
		margin: 1.6rem auto;
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
	
	.personalInfo-form {}
	
	.topline {
		margin-bottom: 1.6rem;
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
		height: auto;
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
		margin-top: .4em;
	}
	
	.noselect {
		-webkit-user-select: none;
	}
	
	.apply-buttom {
		height: auto;
		width: 100%;
		margin-top: 5.4rem;
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
		background-color: #2EF821;
	}
	
	.personalInfo-item-selectArea {
		float: left;
		width: 70%;
		height: auto;
		padding-top: 1.4rem;
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
	
	.showSelectArea .mint-popup-3 {
		height: 40% !important;
		width: 100%;
		background: none;
	}
	
	.showSelectArea .selectArea-page {
		padding-bottom: 3.4%;
		bottom: 0;
		background: #fff;
	}
	
	.picker {
		background: #fff;
		border-top: 1px solid #E3E3E3;
	}
	
	.apply-theme-input {
		color: #B6B6B6;
	}
</style>
<style>
	.cultivate-apply .mint-button-text {
		font-weight: 400;
		font-size: 1.8rem;
	}
</style>