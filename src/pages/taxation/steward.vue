<template>
	<div class="treatment taxa">
		<v-wx-header title="金财管家" showLeft/>
<!--		<div class="slide-box" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">-->
		<div class="slide-box">
		<!--<div class="slide">-->
			<div class="slide-box">
				<div class="slide-img" v-for="(imgs,index) in img">
					<!--<img class="slide-img-01" :src="imgs.src" v-if='index==currentIndex' />-->
					<img class="slide-img-01" :src="imgs.src" />
				</div>
				<!--<div class="Package" v-if='this.currentIndex == 3'>-->
			<!--	<div class="Package">
					<h1>金税管家套餐</h1>
					<div class="Package01">
						<div class="l-aside">
							<div class="p001">增值税申报</div>
							<div class="p002">基础版</div>
							<div class="p003"><span>300</span>元/企业/年</div>
						</div>
						<div class="r-aside">
							<li>进销项发票一键读取</li>
							<li>增值税报表一键生成</li>
							<li>在线申报增值税</li>
							<li>在线缴款、查询、撤销</li>
						</div>
					</div>
					<div class="Package02">
						<div class="l-aside01">
							<div class="p001">所得税年报</div>
							<div class="p002">专业版</div>
							<div class="p003"><span>288</span>元/企业/年</div>
						</div>
						<div class="r-aside01">
							<li>汇算清缴、风险扫描</li>
							<li>节税提醒、财务报表</li>
							<li>产品使用培训视频课程</li>
							<li>操作答疑</li>
						</div>
					</div>
					<div class="Package03">
						<div class="l-aside02">
							<div class="p001">所得税年报 </div>
							<div class="p002">专享版</div>
							<div class="p003"><span>588</span>元/企业/年</div>
						</div>
						<div class="r-aside02">
							<li>包括288套餐内容</li>
							<li>汇算清缴重要政策解读、备案业务等增值视频课程</li>
							<li>远程客服支持</li>
							<li>在线缴款、查询、撤销</li>
						</div>
					</div>
				</div>-->
				<!--<div class="Package" v-if='this.currentIndex == 4'>-->
				<!--<div class="Package">
					<h1>金财管家套餐</h1>
					<div class="Package04">
						<div class="l-aside03">
							<div class="p001">增值税申报</div>
							<div>+</div>
							<div>所得税年报</div>
							<div class="p002">至尚版</div>
							<div class="p003"><span>888&nbsp;&nbsp;</span>元/企业/年</div>
						</div>
						<div class="r-aside03">
							<li>包括588套餐内容</li>
							<li>增加发票认证、增值税申报全功能</li>
							<li>在线专业答疑</li>
							<li>汇算清缴实务辅导1次</li>
							<li>财税精英课程1人/次（暂定杭州、西宁）</li>
						</div>
					</div>
					<div class="Package05">
						<div class="l-aside04">
							<div class="p001">增值税申报</div>
							<div>+</div>
							<div>所得税年报</div>
							<div class="p002">至尊版</div>
							<div class="p003"><span>1288</span>元/企业/年</div>
						</div>
						<div class="r-aside04">
							<li>包括888套餐内容</li>
							<li>汇算清缴实务咨询1次</li>
							<li>财税精英课程2人/次（暂定杭州、西宁）</li>
						</div>
					</div>
				</div>-->
			</div>
		</div>

	</div>

</template>

<script>
	/*import imgSrc1 from "../../assets/images/taxation/01.jpg"
	import imgSrc2 from "../../assets/images/taxation/02.jpg"
	import imgSrc3 from "../../assets/images/taxation/03.jpg"
	import imgSrc4 from "../../assets/images/taxation/04.jpg"
	import imgSrc5 from "../../assets/images/taxation/05.jpg"
	import imgSrc6 from "../../assets/images/taxation/06.jpg"*/
	import config from 'src/api/config'
	export default {
		name: "taxation",
		data: function() {
			return {
				img: [{
					src: ''
				}, {
					src: ''
				}, {
					src: ''
				}, {
					src: ''
				}, {
					src: ''
				}, {
					src: ''
				}],
				imgLength: 0,
				show: true,
				shows: false,
				currentIndex: 0,
				stewardData: {
					startY: "",
					startX: "",
					endX: "",
					endY: "",
					showADID: 1,
					tests: "",
				},
			}
		},
		created() {
			this.wxImgvUrl = config.wxImgvUrl;
			this.getImgurl();
		},
		methods: {
			getImgurl() {
				for(let i=0;i<6;i++) {
					this.img[i].src = this.wxImgvUrl + '/taxation/0'+(i+1)+'.jpg'
				}
			}
			//			点击下键
//			clickBottom() {
//debugger
/*				this.currentIndex++;
				if(!this.shows) {
					this.shows = true
				}

				if(this.currentIndex >= this.imgLength) {
					this.show = false
				}
			},*/
			//			点击上键
//			clickTop() {
//				debugger
/*				this.currentIndex = this.currentIndex - 1;
				if(this.currentIndex == 0) {
					if(this.shows) {
						this.shows = false
					}
				}
				if(!this.show) {
					this.show = true
				}
			},*/
			//			touchStart，touchMove，touchEnd滑动效果
			/*touchStart(event) {
				var touch = event.touches[0];
				var that = this;
				that.stewardData.startY = touch.pageY;
			},
			touchMove(event) {
				var touch = event.touches[0];
				var that = this;
				that.stewardData.tests = touch.pageY;
				this.stewardData.endY = (touch.pageY - this.stewardData.startY);
			},
			touchEnd(event) {
				var that = this;
//				debugger
				if(this.stewardData.endY >= 0) {
					if(this.currentIndex == 0) {
						return
					}
					this.clickTop();
				} else {
					if(this.currentIndex == 4) {
						return
					}
					this.clickBottom();
				}
			}*/
		},
	}
</script>

<style scoped>
    @import url("../../assets/css/slide/slide.css");

	 /* .treatment {
		 height: 100%;
         background-color: white;
	}  */

	.treatment .slide-img img {
		margin-top: 0;
	}

	.treatment .slide-top {
		position: absolute;
		left: 50%;
		margin-left: -2rem;
		font-size: 4rem;
		opacity: 0.5;
		top: 4rem;
	}
	/*滑动下键*/

	.treatment .slide-bottom {
		 position: absolute;
		left: 50%;
		margin-left: -2rem;
		font-size: 4rem;
		opacity: 0.5;
		bottom: 0;
		top: inherit;
	}
	/*html内容*/

	.slide .slide-box .Package {
		padding-top: 3.5rem;
		padding-bottom: 2rem;
	}
	.Package01{
		    margin-top: 1rem;
	}
	.Package04, .Package05{
		/*padding: initial;*/
	}
/*	.Package04 .l-aside03{
		    padding: 5.6rem 1rem 1rem;
	}*/
	.Package04 .r-aside03[data-v-5ec89832], .Package05 .r-aside04[data-v-5ec89832]{
		width: 50%;
	}
	.Package01 .r-aside, .Package02 .r-aside01, .Package03 .r-aside02, .Package04 .r-aside03, .Package05 .r-aside04{
		width: 50%;
	}

	.slide-box:after {
		content: "";
		display: block;
		padding-bottom: 1rem;
		background: #fff;
	}

	.treatment .r-aside04 {
		vertical-align: top;
	}
</style>
