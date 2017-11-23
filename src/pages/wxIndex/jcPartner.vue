<template>
	<div class="jcPartner">
		<v-wx-header title="金财合伙人" showLeft/>
		<img v-for="i in 9" :src="wxImgvUrl + '/jcPartner/0'+i+'.jpg'" />
		<img v-for="i in [10,11,12,13,14,15]" :src="wxImgvUrl + '/jcPartner/'+i+'.jpg'" />
		<!--	<img src="../../assets/images/jcPartner/16.jpg" alt="" />-->
		<div class="jcPartner-form">
			<div class="jcPartner-form-content">
				<div class="jcPartner-form-title"><span>///</span>
					<h1>我要成为金财事业合伙人</h1><span>///</span></div>
				<div class="jcPartner-input">
					<span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span><input type="text" v-model="name" />
				</div>
				<div class="jcPartner-input">
					<span>手&nbsp;机&nbsp;号&nbsp;：</span><input type="text" v-model="phone" />
				</div>
				<div class="jcPartner-input">
					<span>公司全称：</span><input type="text" v-model="company" />
				</div>
				<div class="jcPartner-input">
					<span>所在地区：</span><input type="text" v-model="area" />
				</div>
				<input @click="submitForm" class="jcPartner-submit" type="submit" value="立即提交" />
			</div>
		</div>
	</div>
</template>

<script>
	import { Button, Popup, Toast } from 'mint-ui';
	import async from 'src/api/async';
	import config from 'src/api/config'
	export default {
		data() {
			return {
				name: '',
				phone: '',
				company: '',
				area: '',
			}
		},
		methods: {
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
				if(!this.company) {
					Toast("公司全称不能为空！");
					return;
				}
				if(!this.area) {
					Toast("请填写所在地区");
					return;
				}
				let param = {};
				param.EcompanyName = this.company;
				param.linkman = this.name;
				param.mobileNumber = this.phone;
				param.province = this.area;
				param.city = '';
				param.buyingInclination = '金财事业合伙人'
				async(this, 'productsave', param, res => {
					if(res.head.errorCode == "0") {
						this.$router.push({ path: '/feedback/submitsuccess', query: { title: "咨询" } });
					}
				})
			},
			checkPhone(phone) {
				if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
					return false;
				} else {
					return true;
				}
			},
		},
		created() {
			this.wxImgvUrl = config.wxImgvUrl;
		}
	}
</script>

<style scoped>
	.jcPartner img {
		width: 100%;
	}
	
	.jcPartner-form {
		background: #ffd686;
		text-align: center;
		position: relative;
	}
	
	.jcPartner-form:after {
		content: '';
		display: block;
		padding-bottom: 95%;
	}
	
	.jcPartner-form-title span {
		color: #fff;
		font-size: 1.4rem;
		letter-spacing: -.1rem;
	}
	
	.jcPartner-input span {
		float: left;
		width: 30%;
		text-align: left;
		color: #626262;
		font-size: 1.4rem;
	}
	
	.jcPartner-input input {
		float: left;
		width: 70%;
		color: #626262;
		font-size: 1.4rem;
	}
	
	.jcPartner-form-title h1 {
		display: inline-block;
		margin: 0 .6rem;
		font-size: 2.1rem;
		color: #000;
		font-family: "microsoft yahei";
		font-weight: 700;
		letter-spacing: -.01rem;
	}
	
	.jcPartner-form-title {
		margin-bottom: 11%;
		margin-top: 8%;
	}
	
	.jcPartner-input {
		padding: 2%;
		width: 73%;
		background: #fff;
		margin: 0 auto 3.5%;
		overflow: hidden;
		height: 10%;
	}
	
	.jcPartner-form-content {
		position: absolute;
		width: 100%;
		height: 100%;
	}
	
	.jcPartner-submit {
		background: #ffa300;
		color: #352e26;
		width: 73%;
		height: 10%;
	}
	
	@media (device-width:320px) and (-webkit-min-device-pixel-ratio:2) {
		/* 兼容ipad*/
		.jcPartner-form-title h1 {
			font-size: 1.9rem;
		}
		.jcPartner-form-title span {
			font-size: 1.3rem;
		}
		.jcPartner-input input {
			width: 65%;
		}
		.jcPartner-input span {
			width: 35%;
		}
	}
	
	@media (device-width:768px) and (-webkit-min-device-pixel-ratio:2) and (orientation: portrait) {
		/* 兼容ipad*/
		.jcPartner-form-title h1 {
			font-size: 4.2rem;
		}
		.jcPartner-form-title span {
			font-size: 3rem;
		}
		.jcPartner-input input {
			font-size: 3rem;
		}
		.jcPartner-input span {
			font-size: 3rem;
		}
		.jcPartner-submit {
			font-size: 3rem;
		}
	}
	
	@media (device-width:1024px) and (-webkit-min-device-pixel-ratio:2) and (orientation: portrait) {
		/* 兼容ipad*/
		.jcPartner-form-title h1 {
			font-size: 5.6rem;
		}
		.jcPartner-form-title span {
			font-size: 3.8rem;
		}
		.jcPartner-input input {
			font-size: 3.8rem;
		}
		.jcPartner-input span {
			font-size: 3.8rem;
		}
		.jcPartner-submit {
			font-size: 3.8rem;
		}
	}
</style>