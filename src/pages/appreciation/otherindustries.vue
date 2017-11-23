<template>
	<div class="otherindustries">
		<v-wx-header title="其他行业" showLeft/>
		<!--<img src="../../assets/images/otherindustries/01.jpg" alt="" />
		<img src="../../assets/images/otherindustries/02.jpg" alt="" />
		<img src="../../assets/images/otherindustries/03.jpg" alt="" />
		<img src="../../assets/images/otherindustries/04.jpg" alt="" />
		<img src="../../assets/images/otherindustries/05.jpg" alt="" />-->
        <img v-for="i in 5" :src="wxImgvUrl + '/otherindustries/0'+i+'.jpg'"/>
		
		<div class="otherindustries-tel" v-bind:style="{background:'url('+wxImgvUrl +'/otherindustries/06.jpg)no-repeat'}">
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
	.otherindustries img {
		width: 100%;
		height: 100%;
	}
	
	.otherindustries-tel {
		background-size: 100% 100% !important;
		position: relative;
		margin-top: -1px;
	}
	
	.otherindustries-tel:after {
		content: "";
		display: block;
		padding-bottom: 94.5%;
	}
	
	.otherindustries-tel button {
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
	
	.otherindustries-tel a {
		color: #F17712;
	}
	
	.otherindustries-tel span {
		margin-left: .8rem;
	}
	
	.otherindustries-tel a:focus,
	.otherindustries-tel a:hover {
		color: #F17712;
	}
	
	@media (device-width:768px) and (-webkit-min-device-pixel-ratio:2) and (orientation: portrait) {
		/* 兼容ipad*/
		.otherindustries-tel span,
		.otherindustries-tel i {
			font-size: 3rem;
		}
	}
	
	@media (device-width:1024px) and (-webkit-min-device-pixel-ratio:2) and (orientation: portrait) {
		/* 兼容ipad*/
		.otherindustries-tel span,
		.otherindustries-tel i {
			font-size: 3.8rem;
		}
	}
</style>