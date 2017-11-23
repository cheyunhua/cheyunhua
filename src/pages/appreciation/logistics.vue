<template>
	<div class="logistics">
		<v-wx-header title="物流业" showLeft/>
	<!--	<img src="../../assets/images/logistics/01.jpg" alt="" />
		<img src="../../assets/images/logistics/02.jpg" alt="" />
		<img src="../../assets/images/logistics/03.jpg" alt="" />-->
        <img v-for="i in 3" :src="wxImgvUrl + '/logistics/0'+i+'.jpg'"/>
		
		<div class="logistics-tel" v-bind:style="{background:'url('+wxImgvUrl +'/logistics/04.jpg)no-repeat',backgroundSize:'100% 100%'}">
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
	.logistics img {
		width: 100%;
		height: 100%;
	}
	
	.logistics-tel {
		position: relative;
	}
	
	.logistics-tel:after {
		content: "";
		display: block;
		padding-bottom: 100%;
	}
	
	.logistics-tel button {
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
	.logistics-tel a {
		color: #F17712;
	}
	
	.logistics-tel span {
		margin-left: .8rem;
	}
	
	.logistics-tel a:focus,
	.logistics-tel a:hover {
		color: #F17712;
	}
	
	@media (device-width:768px) and (-webkit-min-device-pixel-ratio:2) and (orientation: portrait) {
		/* 兼容ipad*/
		.logistics-tel span,
		.logistics-tel i {
			font-size: 3rem;
		}
	}
	
	@media (device-width:1024px) and (-webkit-min-device-pixel-ratio:2) and (orientation: portrait) {
		/* 兼容ipad*/
		.logistics-tel span,
		.logistics-tel i {
			font-size: 3.8rem;
		}
	}
</style>