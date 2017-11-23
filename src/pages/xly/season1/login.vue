<script>
	import selectArea from '../../feedback/selectArea.vue';
	import { Toast, Indicator } from 'mint-ui';
	import api from '../../../api/'
	const XLY_SEASON_LOGIN_INFO = 'XLY_SEASON_LOGIN_INFO'
	export default {
		components: {
			selectArea,
		},
		data() {
			return {
				selectAreaPoupVisible: false,
				area: '',
				name: '',
				phone: '',
				openId:'',
			}
		},
		created() {
			this.openId = this.$route.query.openId != undefined ? this.$route.query.openId : '';
		},
		mounted() {
			this.paintCanvasTop()
			this.paintCanvasBottom()
		},
		methods: {
			setCity(province, city) {
				/*this.province = province;
				this.city = city;*/
				this.area = province + city
			},
			openSelectAreaAgent() {
				this.selectAreaPoupVisible = true;
				this.$refs.cl.cancle();
				//				this.$refs.selectArea.$emit('cancle');
			},
			closeSelectAreaAgent() {
				this.selectAreaPoupVisible = false;
			},
			confirmSignUp() {
				if(!this.name) {
					Toast('姓名不能为空');
					return
				}
				if(this.name.length > 50) {
					Toast('用户名长度不能超过50个字符');
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
				if(this.area == '省份城市') {
					Toast('城市不能为空');
					return
				}
				Indicator.open({
					text: "报名中！请稍候",
					spinnerType: 'snake'
				});
				let param = {};
				param = {
					"cusName": this.name,
					"mobilePhone": this.phone,
					"cusAddress": this.area,
					"payOpenId":this.openId
				}
				api.confirmSignUp(param).then((response) => {
					if(response.data.head.errorCode == 0) {
						location.href = response.data.body.payUrl;
						sessionStorage.setItem(XLY_SEASON_LOGIN_INFO, response.data.body.payAmount);
//						Toast(response.data.head.errorMsg);
					}
					if(response.data.head.errorCode == '22020008') {
						Toast(response.data.head.errorMsg);
					}
					if(response.data.head.errorCode == '0110119') {
						Toast(response.data.head.errorMsg);
					}
					Indicator.close();
				}).catch((response) => {
					Indicator.close();
					Toast('哎呀！网络出了点问题，请稍后重试！');
				});
			},
			fillCircle(ctx, x, y, radius, color) {
				ctx.beginPath()
				ctx.fillStyle = color
				ctx.arc(x, y, radius, 0, 2 * Math.PI)
				ctx.fill()
			},
			paintCanvasTop() {
				let canvas = document.getElementById('xly-top')
				let righX = canvas.width = window.innerWidth
				let ctx = canvas.getContext('2d')
				ctx.globalAlpha = 0.9
				ctx.globalCompositeOperation = 'multiply'

				this.fillCircle(ctx, righX - 15, -15, 50, '#8695E6')
				this.fillCircle(ctx, righX - 55, 10, 10, '#CCD2F0')

			},
			paintCanvasBottom() {
				let canvas = document.getElementById('xly-bottom')
				let righX = canvas.width = window.innerWidth
				let bottomY = canvas.height
				let ctx = canvas.getContext('2d')
				ctx.globalAlpha = 0.9
				ctx.globalCompositeOperation = 'multiply'

				this.fillCircle(ctx, righX - 20, bottomY - 40, 70, '#FEE54B')
				this.fillCircle(ctx, righX - 80, 40, 20, '#99E0D0')
				this.fillCircle(ctx, window.innerWidth / 2 + 30, bottomY - 30, 10, '#CED2F7')

				this.fillCircle(ctx, 10, bottomY - 10, 50, '#FF9A8E')
				this.fillCircle(ctx, 65, bottomY - 40, 25, '#9ECAF7')
				this.fillCircle(ctx, 100, bottomY + 5, 20, '#FCA230')

			},

		},
	}
</script>

<template>
	<div class="xly-page">
		<canvas height="40" id="xly-top"></canvas>

		<main>
			<div class="logo">
				<img src="../../../assets/images/logo.jpg" alt="logo img">
				<span>金财学院</span>
			</div>
			<div class="title">
				<p>《财税全能训练营》第一季</p>
				<p>开营报名</p>
			</div>
			<div class="fields">
				<div class="field">
					<label for="name" class="required">姓名:</label>
					<input type="text" id="name" v-model="name">
				</div>
				<div class="field">
					<label for="tel" class="required">手机:</label>
					<input type="tel" id="tel" v-model="phone">
				</div>
				<div class="field" @click="openSelectAreaAgent">
					<label for="city" class="city-field">城市:</label>
					<!--<input type="text" id="city" v-model="area" readonly="readonly">-->
					<span id="city">{{area}}</span>
					<i style="float: right;line-height: 2.3;" class="iconfont icon-jiantou-copy1"></i>
				</div>
			</div>
			<mt-button size="large" @click="confirmSignUp()">确认报名</mt-button>
		</main>
		<div class="showSelectArea">
			<mt-popup v-model="selectAreaPoupVisible" position="bottom" class="mint-popup-3" popup-transition="popup-fade" :modal="false">
				<selectArea ref="cl" @closeSelectAreaAgent="closeSelectAreaAgent" @setCity="setCity"></selectArea>
			</mt-popup>
		</div>
		<canvas height="120" id="xly-bottom"></canvas>
	</div>
</template>

<style scoped>
	.mint-button {
		width: 50%;
		margin: 0 auto;
		background-color: #F17712;
		color: white;
		font-weight: normal;
		border-radius: 3rem;
	}
	
	.fields {
		width: 90%;
		margin: 4rem auto;
	}
	
	.field {
		border-bottom: 1px solid #ccc;
		color: gray;
		line-height: 2;
		margin-top: 1rem;
	}
	
	.field>label,
	.field>input {
		font-size: 1.8rem;
		font-weight: normal;
	}
	
	input {
		width: 80%;
	}
	
	#city {
		width: 80%;
		font-size: 1.8rem;
		font-weight: normal;
	}
	
	label::before {
		content: '*';
		color: white;
	}
	
	.required::before {
		color: #E46E11;
	}
	
	.logo,
	.title {
		color: #E46E11;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.title {
		flex-direction: column;
		margin: 1rem 0;
	}
	
	.title>p:first-child {
		font-size: 2.5rem;
		font-weight: bold;
	}
	
	.title>p:last-child {
		font-size: 2.3rem;
	}
	
	.logo>img {
		width: 3.5rem;
		height: 3.5rem;
	}
	
	.logo>span {
		font-size: 2.3rem;
		letter-spacing: .3rem;
		padding: 1rem;
	}
	
	.xly-page {
		display: flex;
		flex-direction: column;
		height: 100%;
		height: 100vh;
		background-color: white;
	}
	
	main {
		flex: auto;
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
</style>