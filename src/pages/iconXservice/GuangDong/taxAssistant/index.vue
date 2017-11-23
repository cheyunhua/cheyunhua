<template>
	<div class="tax-ass">
		<v-wx-header title="办税助手" showLeft/>
        <img v-for="i in 5" onerror="this.style.display='none'" :src="wxImgvUrl + '/tax_assistant/guangdong/0'+i+'.jpg'"/>
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

<style>
	.tax-ass img {
		width: 100%;
		height: 100%;
	}
</style>
