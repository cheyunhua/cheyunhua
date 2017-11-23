<template>
	<div class="appreciation">
		<v-wx-header :title="Title" showLeft/>
		<img v-for="i in 2" :src="wxImgvUrl +'/appreciation/0'+i+'.jpg'">
		<div class="appreciation-content" v-bind:style="{background:'url('+wxImgvUrl +'/appreciation/002.jpg)no-repeat'}">
			<img @click="$router.push('/logistics')" class="apc-img01" :src="wxImgvUrl +'/appreciation/v01.png'">
			<img @click="$router.push('/treatment')" class="apc-img02" :src="wxImgvUrl +'/appreciation/c02.jpg'">
			<img @click="$router.push('/mobile_it')" class="apc-img03" :src="wxImgvUrl +'/appreciation/v03.png'">
			<img @click="$router.push('/consultancy')" class="apc-img04" :src="wxImgvUrl +'/appreciation/v04.png'">
			<img @click="$router.push('/sharetransfer')" class="apc-img05" :src="wxImgvUrl +'/appreciation/c05.jpg'">
			<img @click="$router.push('/otherindustries')" class="apc-img06" :src="wxImgvUrl +'/appreciation/v06.png'">
		</div>
		<img v-for="i in [4]" :src="wxImgvUrl +'/appreciation/0'+i+'.jpg'">
		<div class="appreciation-tel" v-bind:style="{background:'url('+wxImgvUrl +'/appreciation/05.jpg)no-repeat'}">
			<button><a href="tel:18998812366" class="icon"><i class="iconfont icon-dianhua"></i><span>联系我们</span></a></button>
		</div>
	</div>

</template>

<script>
	import config from 'src/api/config'
	export default {
		data() {
			return {
				Title: '财富增值',
				wxImgvUrl: null,
			}
		},
		created() {
			this.wxImgvUrl = config.wxImgvUrl;

		},
	}
</script>

<style scoped>
	.appreciation img {
		width: 100%;
		height: 100%;
	}

	.appreciation-tel {
		background-size: 100% 100% !important;
		position: relative;
        /* margin-bottom: 2rem; */
	}

	.appreciation-tel:after {
		content: "";
		display: block;
		padding-bottom: 132.5%;
	}

	.appreciation-tel button {
		position: absolute;
		bottom: 15%;
		left: 50%;
		margin-left: -25%;
		background: #fff;
		border: 1px solid #F17712;
		border-radius: .5rem;
		width: 50%;
		height: 7%;
	}

	.appreciation-tel a {
		color: #F17712;
	}

	.appreciation-tel span {
		margin-left: .8rem;
	}

	.appreciation-tel a:focus,
	.appreciation-tel a:hover {
		color: #F17712;
	}

	.appreciation-content {
		background-size: 100% 100% !important;
		position: relative;
	}

	.appreciation-content:after {
		content: "";
		display: block;
		padding-bottom: 102%;
	}

	.appreciation-content img {
		position: absolute;
		height: 20%;
		width: 20%;
	}

	.appreciation-content .apc-img01 {
		position: absolute;
		top: 26.8%;
		left: 5.6%;
	}
	.appreciation-content .apc-img02 {
		position: absolute;
		top: 26.8%;
		left: 40%;
	}
	.appreciation-content .apc-img03 {
		position: absolute;
		top: 26.8%;
		left: 74.8%;
	}

	.appreciation-content .apc-img04 {
		position: absolute;
		top: 62.8%;
		left: 5.6%;
	}

	.appreciation-content .apc-img05 {
		position: absolute;
		top: 62.8%;
		left: 40%;
	}

	.appreciation-content .apc-img06 {
		position: absolute;
		top: 62.8%;
		left: 74.8%;
	}
	@media (device-width:768px) and (-webkit-min-device-pixel-ratio:2) and (orientation: portrait) {
		/* 兼容ipad*/
		.appreciation-tel span,
		.appreciation-tel i {
			font-size: 3rem;
		}
	}

	@media (device-width:1024px) and (-webkit-min-device-pixel-ratio:2) and (orientation: portrait) {
		/* 兼容ipad*/
		.appreciation-tel span,
		.appreciation-tel i {
			font-size: 3.8rem;
		}
	}
</style>
