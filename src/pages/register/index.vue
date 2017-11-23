<template>
	<div class="register">
		 <v-wx-header :title="Title" showLeft/>
		 <img v-for="i in [2,3,4,5,6,7]" :src="wxImgvUrl +'/register/register_0'+i+'.jpg'">
	</div>

</template>

<script>
	import config from 'src/api/config'

	export default {
		    data(){
		      return{
		        Title: '喀什注册公司',
		        wxImgvUrl:null,
		    }
		},
		created() {
		    this.wxImgvUrl = config.wxImgvUrl;
		},
	}
</script>

<style>
.register img{
	width: 100%;
}
</style>