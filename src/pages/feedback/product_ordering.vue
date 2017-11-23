<template>
	<div class="product-ordering">
		<v-wx-header title="产品订购" showLeft/>
		<div class="product-info">
			<div class="product-info-left">
				<div class="product-img" v-if="goodsInfo.goodsImg"><img :src="goodsInfo.goodsImg"></div>
				<div class="product-img" v-else><img src="../../assets/images/my/raw_1492603345.jpeg"></div>
			</div>
			<div class="product-info-right">
				<div class="product-info-title">
					{{goodsInfo.goodsName}}
				</div>
				<div class="product-info-content">
					<div>{{goodsInfo.goodsDescribe}}</div>
				</div>
			</div>

			<div class="personalInfo-form">

				<div class="personalInfo-item">
					<div class="personalInfo-item-label">
						<span><span style="color:#FF9E0F">*</span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</span>
					</div>
					<div class="personalInfo-item-input">
						<input type="text" placeholder="请输入您的姓名" v-model="name" ref="input" @focus="closeSelectAreaAgent()"/>
					</div>
				</div>
				<div class="personalInfo-item">
					<div class="personalInfo-item-label">
						<span><span style="color:#FF9E0F">*</span>手&nbsp;机&nbsp;号:</span>
					</div>
					<div class="personalInfo-item-input">
						<input type="number" placeholder="请输入您的手机号"  v-model="phone" ref="input" @focus="closeSelectAreaAgent()"/>
					</div>
				</div>
				<div class="personalInfo-item">
					<div class="personalInfo-item-label">
						<span>&nbsp;公司名称:</span>
					</div>
					<div class="personalInfo-item-input">
						<input type="text" placeholder="请输入公司名称"  v-model="company" ref="input" @focus="closeSelectAreaAgent()"/>
					</div>
				</div>
				<div class="personalInfo-item">
					<div class="personalInfo-item-label">
						<span><span style="color:#FF9E0F">*</span>订购地区:</span>
					</div>
					<div class="personalInfo-item-selectArea" @click="openSelectAreaAgent">
						<div class="province">
							{{province}}
						</div>
						<div class="city">
							{{city}}
						</div>
						<div class="selectIcon" >
							<i class="iconfont icon-jiantou-copy1"></i>
						</div>
						<div class="selectLabel">
							请选择
						</div>
					</div>
				</div>
				<div class="product-buttom">
					<mt-button size="large" @click="submitForm">提&nbsp;&nbsp;&nbsp;交</mt-button>
				</div>

			</div>

		</div>

	<div class="showSelectArea">
		<mt-popup v-model="selectAreaPoupVisible" position="bottom" class="mint-popup-3" popup-transition="popup-fade" :modal="false">
            <selectArea ref="cl" @closeSelectAreaAgent="closeSelectAreaAgent" @setCity="setCity"></selectArea>
    </mt-popup>
	</div>

	</div>
</template>
<script>
import { Button ,Popup,Toast } from 'mint-ui';
import selectArea from  './selectArea.vue';
import api from '../../api/';
import async from 'src/api/async';
export default {
	components: {
		selectArea
	},
	data () {
		return {
			screenWidthDefault: document.body.scrollHeight,  //屏幕默认高度
			screenWidth: document.body.scrollHeight,  //屏幕高度 - 可变化
			goodsDetails:[],
			goodsInfo:{
				goodsImg:'',
				goodsName: '',
				goodsDescribe:'',
			},
			name:'',
			phone:'',
			company:'',
			province:'',
			city:'',
			selectAreaPoupVisible: false,
		}
	},
	methods: {
		initPage(){
			//this.goodsInfo.goodsDescribe = '商品描述';
			var goodsSku = localStorage.getItem("goodsSku");
			if(goodsSku == null || goodsSku ===''){
				Toast("立即订购商品已失效，请重新订购！");
				return;
			}
			var goodsSkuParam = {'goodsSku':goodsSku};
			let _this = this;
			api.queryGoodInfoBySku(goodsSkuParam).then((response) => {
				if(response.data.head.errorCode === '0'){
					_this.goodsDetails = response.data.body;
					_this.goodsInfo.goodsImg = _this.goodsDetails.photos[0].photoUrl;
					_this.goodsInfo.goodsName = _this.goodsDetails.goodsName;

					_this.goodsInfo.goodsDescribe = _this.goodsDetails.goodsIntroduction;
					console.log("商品介绍：" + _this.goodsDetails.goodsIntroduction);
				}
				else{
					Toast(response.data.head.errorMsg);
				}
			})
			.catch((response) => {

			});
		},
		submitForm(){
			if( !this.name){
				Toast("姓名不能为空！");
				return;
			}
			if( !this.phone ){
				Toast("手机号不能为空！");
				return;
			}
			if(!this.checkPhone(this.phone)){
				Toast("手机号码有误，请重填");
				return;
			}
			if( this.province == "省份" || this.city == "城市" ){
				Toast("请选择订购地区");
				return;
			}

			let param = {};
			param.buyingInclination = this.goodsInfo.goodsName + '('+this.goodsDetails.goodsSku + ')',
			console.log("订购意向:"+ param.buyingInclination);
			param.EcompanyName = this.company;
			param.linkman = this.name;
			param.mobileNumber = this.phone;
			param.Email = '';
			param.province = this.province;
			param.city = this.city;
			param.issueDescribe = '';
			param.leagueContent = '';
			param.productRemark = '';
			param.complaintsType = '';
			async(this, 'productsave', param, res => {
				if(res.head.errorCode == "0") {
					this.$router.push({path:'/feedback/submitsuccess',query:{title:"订单"}});
				}
			})
		},
		checkPhone(phone){
			if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){
	      return false;
	    }else{
				return true;
			}
		},
		setCity(province,city){
			this.province = province;
			this.city = city;
		},
		openSelectAreaAgent(){
			this.selectAreaPoupVisible = true;
			this.$refs.cl.cancle();
		},
		closeSelectAreaAgent(){
			this.selectAreaPoupVisible = false;
		},
		getDistance() {
			var screenHeight = window.screen.height;
			var screenDistance = 0;
			if ($('body').height() < screenHeight && screenHeight - $('body').height()<200) {
				screenDistance = screenHeight - $('body').height();
			}
			var distance = screenHeight - 311.5 - 41 - screenDistance;
			$('.product-buttom').css('margin-top',distance);
			window.onresize = () => {
			this.getDistance();
		}
		}
	},
	mounted(){
		var _this = this
		//监听软键盘打开与关闭
		window.onresize = () => {
			this.screenWidth = document.body.scrollHeight;
		}
		this.getDistance();
	},
	watch:{
		screenWidth (val) {
			this.screenWidth = val;
			if( ( this.screenWidthDefault - 100 )> this.screenWidth ){
				//Toast("屏幕变小");
				this.selectAreaPoupVisible = false;
			}else{
				//Toast("屏幕复原");
				this.selectAreaPoupVisible = false;
			}
		}
	},
	created(){
		this.province = '省份';
		this.city = '城市';
	},
	beforeRouteEnter (to, from, next) {
			next(vm => {
				vm.initPage();
			});
	},
}
</script>
<style scoped>
.product-ordering {
	position: relative;
	height: 100%;
	width: 100%;
}
.product-info {
	margin-top: 0.5em;
	width: 100%;
	height: 5.2em;
	background-color: #ffffff;
}
.product-info-left {
	float: left;
	width: 35%;
	height: auto;
}
.product-img {
	padding-top: 0.5em;
  margin: 0 0 0 0.5em;
  height: 5em;
  width: 6em;
  /*border: 0.1em solid #000000;*/
}
.product-info-right {
	float: left;
	width:65%;
	height: auto;
}
.product-info-title  {
	margin-top: 0.2em;
	color: #FF9E0F;
}
.product-info-content {
	width: 100%;
	height: 3em;
}
.product-info-content > div {
	padding-top: 0.4em;
	color: #B7B8B9;
	float: left;
	font-size: 0.8em;
	width: 100%;
	height: 3em;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	/* autoprefixer: off */
	-webkit-box-orient: vertical;
	/* autoprefixer: on */
}
.personalInfo-form {
	padding-top: 5.6em;
}
.personalInfo-item {
	width: 100%;
	height: 3em;
	background: #ffffff;
	border-bottom: 0.1em solid #E3E3E3;
}
.personalInfo-item-label {
	float: left;
	width: 30%;
	height: auto;
	text-align:left;
}
.personalInfo-item-label > span {
	line-height: 3em;
	margin-left: 1em;
	color: #9B9B9C
}
.personalInfo-item-input {
	float: left;
	width: 70%;
	height: auto;
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
.personalInfo-item-input > input {
	width:90%;
	height: 2.5em;
	margin-top: 0.2em;
}
.product-buttom {

	height: auto;
	width: 100%;


}
.mint-button {
	background-color: #FF7042;
	color: #ffffff;
}
.mint-button::after {
	background-color: #2EF821;
}
.personalInfo-item-selectArea {
	float: left;
	width: 70%;
	height: auto;
	padding-top: 0.8em;
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
</style>
