<script>
	import imgSrc1 from "../../assets/images/treatment/01.jpg"
	import imgSrc2 from "../../assets/images/treatment/02.jpg"
	import imgSrc3 from "../../assets/images/treatment/03.jpg"
	import imgSrc4 from "../../assets/images/treatment/04.jpg"
	import imgSrc5 from "../../assets/images/treatment/05.jpg"
	//	import scrloo from "../../assets/js/scroll"
	export default {
		data: function() {
			return {
				img: [
					{ src: imgSrc1 },
					{ src: imgSrc2 },
					{ src: imgSrc3 },
					{ src: imgSrc4 },
					{ src: imgSrc5 },
				],
				imgLength: 0,
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
		methods: {
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
					var scrollHeight = document.documentElement.scrollHeight;
					var scrollTop = document.documentElement.scrollTop;
					var scrollTops = document.body.scrollTop;
					var clientHeight = document.documentElement.clientHeight;
					var clearing = scrollHeight - (scrollTop - scrollTops) - clientHeight; //结算高度
					var clearingIf = document.documentElement.scrollTop + document.body.scrollTop //判断顶部与高度值
					var clearingHeight = scrollHeight - clientHeight;
//					debugger
					if(clearingIf == 0 || clearingIf == clearingHeight) {
						var that = this; //				debugger
						if(this.stewardData.endY >= 0) {
							if(this.currentIndex == 0) {
								return
							}
							this.currentIndex = this.currentIndex - 1;
						} else {
							if(this.currentIndex == this.img.length + 1) {
								return
							}
							this.currentIndex++;
						}
					}
					return

			}*/
		},

	}
</script>
<template>
	<div class="treatment taxa">
		<v-wx-header title="医疗行业节税地" showLeft/>
		<div class="slide">
			<!--<div class="slide-box" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">-->
			<!--<div class="slide-box" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">-->
			<div class="slide-box">
				<div class="slide-img" v-for="(imgs,index) in img">
					<!--<img class="slide-img-01" :src="imgs.src" v-if='index==currentIndex' />-->
					<img class="slide-img-01" :src="imgs.src" />
				</div>
				<!--<div class="Package" v-for="" v-if='currentIndex == img.length'>-->
				<!--	<div class="Package" v-for="" >
					<div class="institution">
						<div class="title01">医疗服务机构——<span>小规模纳税人</span></div>
					</div>
					<div class="institution01">
						<div class="data">
							<li>税种<span>税局征收（税率）</span></li>
							<li>增值税<span>3.00%</span></li>
							<li>城教附加<span>0.3%</span></li>
							<li>水利基金<span>0.06%</span></li>
							<li>印花税<span>0.03%</span></li>
							<li>个税（核定）<span>25.0%</span></li>
							<li>合计<span>28.39%</span></li>
						</div>
						<div class="sign">
							<div class="p01"><span>非</span><br>节税地</div>
						</div>
					</div>
					<div class="institution02">
						<div class="data01">
							<li>税种<span>税局征收（税率）</span></li>
							<li>增值税<span>3.00%</span></li>
							<li>城教附加<span>0.3%</span></li>
							<li>水利基金<span>0.06%</span></li>
							<li>印花税<span>0.03%</span></li>
							<li>个税（核定）<span>2.61%</span></li>
							<li>合计<span>6.00%</span></li>
						</div>
						<div class="wrap01">
							<div class="sign01">
								<div class="p01"><span>安徽</span><br>节税地</div>
							</div>
							<div class="text02">金财互联与当地政府签订战略合作协议，政府背书，保证当地办事高效可靠。</div>
						</div>
					</div>
					<div class="ljb-gather">其他地区28.39%，安徽综合税费6.00%，<span>节约22.39%</span></div>
				</div>
				
				<div class="Package" v-for="" v-if='currentIndex == 2'
					<div class="institution">
						<div class="title01">医疗服务机构——<span>一般纳税人</span></div>
					</div>
					<div class="institution01">
						<div class="data">
							<li>税种<span>税局征收（税率）</span></li>
							<li>增值税<span>6.00%</span></li>
							<li>城教附加<span>0.6%</span></li>
							<li>水利基金<span>0.06%</span></li>
							<li>印花税<span>0.03%</span></li>
							<li>个税（核定）<span>25.00%</span></li>
							<li>合计<span>31.69%</span></li>
						</div>
						<div class="sign">
							<div class="p01"><span>非</span><br>节税地</div>
						</div>
					</div>
					<div class="institution02">
						<div class="data01">
							<li>税种<span>税局征收（税率）</span></li>
							<li>增值税<span>6.00%</span></li>
							<li>城教附加<span>0.60%</span></li>
							<li>水利基金<span>0.06%</span></li>
							<li>印花税<span>0.03%</span></li>
							<li>个税（核定）<span>2.31%</span></li>
							<li>合计<span>9%</span></li>
						</div>
						<div class="wrap01">
							<div class="sign01">
								<div class="p01"><span>安徽</span><br>节税地</div>
							</div>
							<div class="text02">金财互联与当地政府签订战略合作协议，政府背书，保证当地办事高效可靠。</div>
						</div>
					</div>
					<div class="ljb-gather">其他地区31.69%，安徽综合税费9%，<span>节约22.69%</span></div>
				</div>-->
				<button><a href="tel:18998812366" class="icon"><i class="iconfont icon-dianhua"></i><span>联系我们</span></a></button>
			</div>
		</div>
	</div>

</template>

<style scoped>
	.institution {
		padding-top: 0;
	}
	
	.slide-box .Package {
		padding: 1.6rem 1rem 3rem 1rem;
	}
	
	.treatment .slide-img img {
		margin: 0;
		width: 100%;
	}
	
	.slide-box {
		position: relative;
	}
	
	.slide-box button {
		position: absolute;
		bottom: 1.6%;
		left: 50%;
		margin-left: -25%;
		background: #fff;
		border: 1px solid #F17712;
		border-radius: .5rem;
		width: 50%;
		height: 1.3%;
	}
	
	.slide-box a {
		color: #F17712;
	}
	
	.slide-box span {
		margin-left: .8rem;
	}
	
	.slide-box a:focus,
	.slide-box a:hover {
		color: #F17712;
	}
	
	@media (device-width:768px) and (-webkit-min-device-pixel-ratio:2) and (orientation: portrait) {
		/* 兼容ipad*/
		.slide-box span,
		.slide-box i {
			font-size: 3rem;
		}
	}
	
	@media (device-width:1024px) and (-webkit-min-device-pixel-ratio:2) and (orientation: portrait) {
		/* 兼容ipad*/
		.slide-box span,
		.slide-box i {
			font-size: 3.8rem;
		}
	}
</style>