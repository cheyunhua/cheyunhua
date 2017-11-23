<template>
	<div class="sharetransfer">
		<v-wx-header title="股权转让" showLeft/>
		<!--<img src="../../assets/images/sharetransfer/01.jpg" alt="" />
		<img src="../../assets/images/sharetransfer/02.jpg" alt="" />
		<img src="../../assets/images/sharetransfer/03.jpg" alt="" />-->
        <img v-for="i in 3" :src="wxImgvUrl + '/sharetransfer/0'+i+'.jpg'"/>
		<div class="sharetransfer-tel" v-bind:style="{background:'url('+wxImgvUrl +'/sharetransfer/04.jpg)no-repeat'}">
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
	.sharetransfer img {
		width: 100%;
		height: 100%;
	}
	
	.sharetransfer-tel {
		background-size: 100% 100% !important;
		position: relative;
		margin-top: -1px;
	}
	
	.sharetransfer-tel:after {
		content: "";
		display: block;
		padding-bottom: 95%;
	}
	
	.sharetransfer-tel button {
		position: absolute;
		bottom: 40%;
		left: 50%;
		margin-left: -25%;
		background: #fff;
		border: 1px solid #F17712;
		border-radius: .5rem;
		width: 50%;
		height: 9.4%;
	}
	
	.sharetransfer-tel a {
		color: #F17712;
	}
	
	.sharetransfer-tel span {
		margin-left: .8rem;
	}
	
	.sharetransfer-tel a:focus,
	.sharetransfer-tel a:hover {
		color: #F17712;
	}
	
	@media (device-width:768px) and (-webkit-min-device-pixel-ratio:2) and (orientation: portrait) {
		/* 兼容ipad*/
		.sharetransfer-tel span,
		.sharetransfer-tel i {
			font-size: 3rem;
		}
	}
	
	@media (device-width:1024px) and (-webkit-min-device-pixel-ratio:2) and (orientation: portrait) {
		/* 兼容ipad*/
		.sharetransfer-tel span,
		.sharetransfer-tel i {
			font-size: 3.8rem;
		}
	}
</style>