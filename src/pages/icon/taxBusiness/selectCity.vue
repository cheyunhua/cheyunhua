<template>
	<div>
		<div class="toptitle" ><span class="dot iconfont icon-jiantou" v-on:click="goBack"></span>选择城市</div>

		<div class="selectCity-location-item">
			<div class="selectCity-location-item-label">当前定位：</div>
			<!--<div class="selectCity-location-item-current" v-if="false">
			111
		</div>-->
		<div class="selectCity-location-item-current" v-if="wxJsSdkConfig">
			{{guessCity}}
		</div>
		<div class="selectCity-location-item-current" v-else>
			<i class="iconfont icon-shuaxin"></i>
		</div>
		<!--<div class="selectCity-location-item-refresh"><i class="iconfont icon-shuaxin" @click="getLocation"></i></div>-->
		<div class="selectCity-location-item-refresh"><i class="iconfont icon-shuaxin" @click="wxConfig"></i></div>
	</div>

	<div class="selectCity-location-label">
		<div class="selectCity-location-label-item-allCity">
			<div class="selectCity-location-label-item-allCity-1">所有城市</div><div class="selectCity-location-label-item-allCity-2">(请您选择所在城市)</div>
		</div>
		<div class="selectCity-location-label-item-lastCity">
			<div class="selectCity-location-label-item-lastCity-1">上次选择：</div>
			<div class="selectCity-location-label-item-lastCity-2"><div>{{lastCity.xzqhMc}}</div></div>
		</div>
	</div>

	<div class="selectCity-showCity">
		<div v-for="province in xzqhList">
			<div class="selectCity-province">
				<div>{{province.xzqhMc}}</div>
			</div>
			<div class="selectCity-cityList">
				<div class="selectCity-city" @click="selectCity(province,city)" v-for="city in province.children" >
					<div>{{city.xzqhMc}}</div>
				</div>
			</div>
		</div>
	</div>

</div>
</template>
<style>
.selectCity-location-item .v-modal {
	display: none;
}
.selectCity-location-item {
	float: left;
	height: 2.8em;
	width: 100%;
	line-height:2.8em;
	background: #ffffff;
	border-bottom: 0.1em solid #E3E3E3;
}
.selectCity-location-item-label {
	float: left;
	height: auto;
	width: 30%;
	padding-left: 0.5em;
}
.selectCity-location-item-current {
	float: left;
	height: auto;
	width: 20%;
}
.selectCity-location-item-current > i {
	display: inline-block;
	color: gray;
	animation:refreshFun 1s infinite linear;
}
@keyframes refreshFun {
	0%{
		transform: rotate(20deg);
	}
	25%{
		transform: rotate(90deg);
	}
	50%{
		transform: rotate(180deg);
	}
	75%{
		transform: rotate(270deg);
	}
	100%{
		transform: rotate(360deg);
	}

}
.selectCity-location-item-refresh {
	float: left;
	height: auto;
	width: 50%;
	padding-left: 7em;
}
.selectCity-location-item-refresh > i {
	font-size: 1.3em;
	color: #FF7043;
}
.selectCity-location-label {
	background: #F3F3F3;
	float: left;
	height: 3em;
	width: 100%;
	line-height:3em;
}
.selectCity-location-label-item-allCity {
	float: left;
	height: auto;
	width: 58%;
	padding-left: 0.5em;
}
.selectCity-location-label-item-allCity-1 {
	float: left;
	font-size:0.95em;
	color:#6E6E6E;
}
.selectCity-location-label-item-allCity-2 {
	float: left;
	font-size:0.85em;
	color:#9D9D9D;
}
.selectCity-location-label-item-lastCity {
	float: left;
	height: auto;
	width: 42%;
}
.selectCity-location-label-item-lastCity-1 {
	float: left;
	height: auto;
	width: auto;
	font-size:0.95em;
	color:#9D9D9D;
}
.selectCity-location-label-item-lastCity-2 {
	height: auto;
	width: auto;
}
.selectCity-location-label-item-lastCity-2 > div {
	font-size: 0.95em;
	margin-top: 0.6em;
	height: 1.8em;
	line-height: 1.8em;
	width: 4.2em;
	background: #FF7043;
	color: #ffffff;
	border-radius: 0.1em;
	overflow:hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.selectCity-showCity {
	float: left;
	background: #ffffff;
	height: auto;
	width: 100%;
}
.selectCity-province {
	float: left;
	height: 2.8em;
	width: 94%;
	margin-left: 0.5em;
	border-bottom: 0.1em solid #E3E3E3;
}
.selectCity-province > div {
	float: left;
	padding-top:0.9em;
	font-size: 1.2em;
	color: #000000;
}
.selectCity-cityList {
	float: left;
	height: auto;
	width: 100%;
	margin-left: 0.5em;
}
.selectCity-city {
	float: left;
	height: auto;
	width: auto;
	margin: 0.5em 0.4em 0 0em;
	background: #FF7043;
	border-radius: 0.1em;
}
.selectCity-city > div {
	margin: 0.1em 0.1em 0.1em 0.1em;
	font-size: 0.95em;
	color: #ffffff;
}
</style>
<script>
var wx = require('weixin-js-sdk');
import { MessageBox ,Toast } from 'mint-ui';
import api from '../../../api/';
const WX_USER_WECHAT_CODE = "wx.user.wechat.code";
const WX_USER_PROVINCECODE ='wx.user.provinceCode';  //当前微信号 所在省份
//const localStorage = global.localStorage;
export default {
	data () {
		return {
			wxJsSdkConfig: false,
			lastCity:'',
			funType:'',
			shengDm:'',
			guessCity : '',
			guessCityid : '',
			selectedCity: '',
			xzqhList: []
		}
	},
	methods: {
		fetchData(){
			this.lastCity = this.$route.query.lastCity;
			this.funType = this.$route.query.funType;
			this.shengDm = this.$route.query.shengDm;
			console.log("lastCity:" + this.lastCity.xzqhMc + "\tfunType:" + this.funType + "\tshengDm:" + this.shengDm);
			this.reloadCity();//获取当前省份的城市列表
		},
		goBack: function () {
			//sessionStorage.setItem("selectCityGoBackFlag",1);  //标志  选择城市页  返回
			window.history.go(-1);
		},
		selectCity: function(province,city){
			console.log("你选择了"+ province.xzqhMc + "的" + city.xzqhMc);
			this.selectedCity = city;

			var param = {};
			param.xzqhDm = city.xzqhDm;

			param.gnLx = this.funType;

			console.log("===this.$route.query.funType======"+this.$route.query.funType);
			console.log("===this.funType======"+this.funType);
			console.log("地区代码：" + param.xzqhDm + "\t" +"功能类型:" + param.gnLx);
			var _this = this;

			api.ysGetXzqhGncd(param).then((response) => {
				console.log("=========");
				if(response.data.head.errorCode == '0'){
					if(response.data.body.length == 0){
						MessageBox.alert("该地区尚未开通("+ param.gnLx +")功能，请选择其他地区", "提示");
						//localStorage.removeItem("taxBusiness.selectCity." + province.xzqhDm);
					}else{
						localStorage.setItem("taxBusiness.selectCity." + province.xzqhDm, city==undefined?"":JSON.stringify(city));
						_this.goBack();
					}
				}
			}).catch((response) => {

			});

			//this.$emit('loadCityFuns',xzqhDm,this.funType);
		},
		wxConfig() {
			//设置false
			this.wxJsSdkConfig = false;
			let that = this;
			const url = encodeURIComponent(window.location.href.split('#')[0]);
			var param = {};
			//param.wechatCode = 'WECHAT_CUS2';//微信区域编码，登录或js微信说全后会存在缓存里
			//param.wechatCode = localStorage.getItem(WX_USER_WECHAT_CODE);
			//	            param.wechatCode = '021bZ5Ap1BwFsn0YkBDp1bn6Ap1bZ5Af';
			param.wechatCode = localStorage.getItem(WX_USER_WECHAT_CODE);
			//Toast("WX_USER_WECHAT_CODE:" + param.wechatCode);
			param.url = url;
			api.getWechatJsAuth(param)
			.then(function (d) {
				var wxInfo = d.data.body;
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: wxInfo.appId, // 必填，公众号的唯一标识
					timestamp: wxInfo.timestamp, // 必填，生成签名的时间戳
					nonceStr: wxInfo.nonceStr, // 必填，生成签名的随机串
					signature: wxInfo.signature,// 必填，签名，见附录1
					jsApiList: ["scanQRCode", "chooseImage", "chooseWXPay", "getLocation"]
					// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
				wx.ready(function () {
					that.wxJsSdkConfig = true;
					that.getLocation();
				});
			})
			.catch(function (err) {
				//     Toast({
				//         message: '初始化微信JS接口失败:' + err,
				//         duration: 3000
				//     })
			})
		},
		getLocation: function () {
			if (!this.wxJsSdkConfig) {
				Toast("微信配置初始化中，请稍后再试！");
				return;
			}
			let _this = this;
			wx.getLocation({
				type: 'wgs84',
				success: function (res) {
					//将经纬度转为城市
					//res.latitude = '113.2759952545166';
					//res.longitude = '23.117055306224895';
					$.ajax({
						url: 'http://api.map.baidu.com/geocoder/v2/?ak=btsVVWf0TM1zUBEbzFz6QqWF&callback=renderReverse&location=' + res.latitude + ',' + res.longitude + '&output=json&pois=1',
						type: "get",
						dataType: "jsonp",  //类型
						success: (res => {
							_this.guessCity = res.result.addressComponent.city;
							_this.guessCityid = res.result.addressComponent.adcode;
							//将区的行政区划编码变成市的行政区划编码
							_this.guessCityid = _this.guessCityid.substring(0,_this.guessCityid.length-2)+'00';
						}),
						error: (err => {
							Toast({
								message: '当前城市定位失败:' + err.message,
								duration: 3000
							})
						})
					});

				},
				/*  fail: function (req) {
				alert('fail');
			}*/
		});
	},
	reloadCity(){
		var _this = this;
		var param = {};
		param.shengDm = this.shengDm;
		console.log("taxBusiness---------selectCity-------------" + param.shengDm);
		api.ysLoadCity(param).then((response) => {
			//Toast("选择城市请求----");
			if(response.data.head.errorCode == '0'){
				console.log("请求成功===xzqhDm==="+ response.data.body[0].xzqhMc);
				_this.xzqhList = response.data.body;
			}
		}).catch((response) => {

		});
	}
},
	computed: {

	},
	mounted(){
		//this.reloadCity();
	},
	created(){
		//this.wxConfig();

		//Toast("上次选择的城市---:" + this.lastCity.xzqhMc);
	},
	beforeRouteEnter (to, from, next) {
		next(vm => {
			console.log("selectCity===========");
			vm.wxConfig();
			vm.fetchData();
		});
	},
}
</script>
