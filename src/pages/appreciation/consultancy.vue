<template>
	<div class="consultancy">
		<v-wx-header title="咨询服务" showLeft/>
        <img v-for="i in 4" :src="wxImgvUrl + '/consultancy/0'+i+'.jpg'"/>
		
		<div class="consultancy-tel" v-bind:style="{background:'url('+wxImgvUrl +'/consultancy/05.jpg)no-repeat'}">
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
	.consultancy img {
		width: 100%;
		height: 100%;
	}
	
	.consultancy-tel {
		background-size: 100% 100% !important;
		position: relative;
	}
	
	.consultancy-tel:after {
		content: "";
		display: block;
		padding-bottom: 103%;
	}
	
	.consultancy-tel button {
		position: absolute;
		bottom: 19%;
		left: 50%;
		margin-left: -25%;
		background: #fff;
		border: 1px solid #F17712;
		border-radius: .5rem;
		width: 50%;
		height: 9%;
	}
	
	.consultancy-tel a {
		color: #F17712;
	}
	
	.consultancy-tel span {
		margin-left: .8rem;
	}
	
	.consultancy-tel a:focus,
	.consultancy-tel a:hover {
		color: #F17712;
	}
	
	@media (device-width:768px) and (-webkit-min-device-pixel-ratio:2) and (orientation: portrait) {
		/* 兼容ipad*/
		.consultancy-tel span,
		.consultancy-tel i {
			font-size: 3rem;
		}
	}
	
	@media (device-width:1024px) and (-webkit-min-device-pixel-ratio:2) and (orientation: portrait) {
		/* 兼容ipad*/
		.consultancy-tel span,
		.consultancy-tel i {
			font-size: 3.8rem;
		}
	}
</style>