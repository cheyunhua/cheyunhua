<script>
	const XLY_SEASON_LOGIN_INFO = 'XLY_SEASON_LOGIN_INFO'
	export default {
		data() {
			return {
				payAmount: 0
			}
		},
		created() {
			this.payAmount = sessionStorage.getItem(XLY_SEASON_LOGIN_INFO);
		},
		mounted() {

		},
		methods: {
			back() {
				this.$router.go(-1);
			},
			/*close() {
				var ua = navigator.userAgent.toLowerCase();
				if(ua.match(/MicroMessenger/i) == "micromessenger") {
					WeixinJSBridge.call('closeWindow');

				} else if(ua.indexOf("alipay") != -1) {
					AlipayJSBridge.call('closeWebview');
				} else
				if(ua.indexOf("baidu") != -1) {
					BLightApp.closeWindow();
				} else
				if(ua.match(/QQ/i) == "qq") {
					mqq.invoke("ui","closeWebViews");
				} else {
					window.close();
					//					mqq.invoke("ui","closeWebViews");
				}
			}*/
		},
	}
</script>

<template>
	<div class="xly-paysuccess">
		<div class="head">
			<i @click="back" class="iconfont icon-back"></i>
			<div class="logo">
				<img src="../../../assets/images/logo.jpg" alt="logo img">
				<span>支付结果</span>
			</div>
		</div>
		<div class="content">
			<div class="paysuccess">
				<img src="../../../assets/images/xly/pay_01.png" alt="" />
				<span>支付成功</span>
			</div>
			<div class="hint">本次交易成功支付<span style="color: red;">{{payAmount}}</span>元</div>
			<!--<div class="btn-paysuccess" @click="close">
				完成
			</div>-->
			<div class="qrcode">
				<h1>恭喜您！报名成功！</h1>
				<img src="../../../assets/images/u110.jpg" />
				<p>温馨提示！请识别上方二维码添加金财学院课程顾问微信，即刻加入训练营大家庭，成功入营之后我们将在24小时内为您开通学习账号，并以手机短信形式告知，请注意查收，愉快的财税学习之旅，即将开启！</p>
			</div>
			<footer class="foot">
				<p>服务热线：400-99-12366</p>
				<p>感谢您使用金财互联的服务</p>
			</footer>
		</div>

	</div>
</template>

<style scoped>
	.xly-paysuccess {
		height: 100%;
		background: #fff;
	}
	
	.head {
		height: 7rem;
		line-height: 7rem;
		border-bottom: 1px solid #797979;
		padding: 0 1rem 0 1.4rem;
	}
	
	.logo {
		float: right;
		transform: translateY(-.3rem);
	}
	
	.logo span {
		color: #666666;
		font-size: 1.6rem;
		font-weight: bold;
		vertical-align: middle;
	}
	
	.logo img {
		width: 5.4rem;
		height: 4.7rem;
		margin-right: .2rem;
	}
	
	.head i {
		font-size: 2.3rem;
		color: #666666;
	}
	
	.content {
		margin-top: 3rem;
		background: #fff;
	}
	
	.paysuccess {
		width: 14rem;
		margin: 0 auto;
		white-space: nowrap;
	}
	
	.paysuccess img {
		width: 6.5rem;
		height: 7rem;
		margin-right: 1.4rem;
	}
	
	.paysuccess span {
		vertical-align: middle;
		color: #000;
		font-size: 1.6rem;
		font-weight: bold;
	}
	
	.hint {
		text-align: center;
		font-weight: bold;
		margin-top: 3rem;
		font-size: 1.4rem;
	}
	
	.btn-paysuccess {
		height: 5rem;
		width: 80%;
		margin: 4.5rem auto 0;
		line-height: 5rem;
		text-align: center;
		background: #0099cc;
		border-radius: .4rem;
		font-weight: bold;
		font-size: 1.6rem;
		color: #fff;
	}
	
	.qrcode {
		margin-top: 2rem;
		text-align: center;
	}
	
	.qrcode h1 {
		font-weight: bold;
		font-size: 1.6rem;
		margin-bottom: 2rem;
	}
	
	.qrcode img {
		width: 10rem;
		height: 10rem;
	}
	
	.qrcode p {
		font-size: 1.4rem;
		color: red;
		text-indent: 2em;
		text-align: left;
		padding: .8rem .6rem;
	}
	
	.foot p {
		color: #333333;
		font-weight: 400;
		font-size: 1.4rem;
		text-align: center;
		padding-bottom: .6rem;
	}
	
	@media (device-width:320px) and (-webkit-min-device-pixel-ratio:2) {
		/* 兼容iphone4、iphone5 */
		.head {
			height: 6.5rem;
			line-height: 6.5rem;
		}
		.content {
			margin-top: 1.2rem;
		}
		.hint {
			margin-top: 1.2rem;
		}
		.btn-paysuccess {
			margin: 2rem auto 0;
			height: 4.4rem;
			line-height: 4.4rem;
		}
		.qrcode {
			margin-top: 1.6rem;
		}
		.qrcode h1 {
			margin-bottom: 1.4rem;
		}
	}
</style>