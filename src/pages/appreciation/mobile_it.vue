<template>
	<div class="mobile_it">
		<v-wx-header title="信息技术（含动漫）" showLeft/>
		<!--<img src="../../assets/images/mobile_it/01.jpg" alt="" />
		<img src="../../assets/images/mobile_it/02.jpg" alt="" />
		<img src="../../assets/images/mobile_it/03.jpg" alt="" />
		<img src="../../assets/images/mobile_it/04.jpg" alt="" />
		<img src="../../assets/images/mobile_it/05.jpg" alt="" />-->
        <img v-for="i in 5" :src="wxImgvUrl + '/mobile_it/0'+i+'.jpg'"/>
		<div class="mobile_it-tel" v-bind:style="{background:'url('+wxImgvUrl +'/mobile_it/06.jpg)no-repeat'}">
			<button><a href="tel:18998812366" class="icon"><i class="iconfont icon-dianhua"></i><span>联系我们</span></a></button>
		</div>
	</div>
</template>

<script>
	import config from 'src/api/config'
	export default {
		data() {
			return {

			}
		},
		created() {
			this.wxImgvUrl = config.wxImgvUrl;
		}
	}
</script>

<style scoped>
	.mobile_it img {
		width: 100%;
		height: 100%;
	}
	
	.mobile_it-tel {
		background-size: 100% 100% !important;
		position: relative;
		margin-top: -1px;
	}
	
	.mobile_it-tel:after {
		content: "";
		display: block;
		padding-bottom: 100.3%;
	}
	
	.mobile_it-tel button {
		position: absolute;
		bottom: 21%;
		left: 50%;
		margin-left: -25%;
		background: #fff;
		border: 1px solid #F17712;
		border-radius: .5rem;
		width: 50%;
		height: 9%;
	}
	
	.mobile_it-tel a {
		color: #F17712;
	}
	
	.mobile_it-tel span {
		margin-left: .8rem;
	}
	
	.mobile_it-tel a:focus,
	.mobile_it-tel a:hover {
		color: #F17712;
	}
	
	@media (device-width:768px) and (-webkit-min-device-pixel-ratio:2) and (orientation: portrait) {
		/* 兼容ipad*/
		.mobile_it-tel span,
		.mobile_it-tel i {
			font-size: 3rem;
		}
	}
	
	@media (device-width:1024px) and (-webkit-min-device-pixel-ratio:2) and (orientation: portrait) {
		/* 兼容ipad*/
		.mobile_it-tel span,
		.mobile_it-tel i {
			font-size: 3.8rem;
		}
	}
</style>