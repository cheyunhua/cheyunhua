<template>
	<div class="tax-ass">
		<v-wx-header title="办税助手" showLeft/>
		<!--<img src="../../../assets/images/tax_assistant/wxHeadquarters/01.jpg" />
		<img src="../../../assets/images/tax_assistant/wxHeadquarters/02.jpg" />
		<img src="../../../assets/images/tax_assistant/wxHeadquarters/03.jpg" />
		<img src="../../../assets/images/tax_assistant/wxHeadquarters/04.jpg" />
		<img src="../../../assets/images/tax_assistant/wxHeadquarters/05.jpg" />-->
        <img v-for="i in 5" :src="wxImgvUrl + '/tax_assistant/wxHeadquarters/0'+i+'.jpg'"/>
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
   .tax-ass img {
   	width: 100%;
   }
</style>
