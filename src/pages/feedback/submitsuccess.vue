<template>
	<div class="feedback-bg">
		<v-feedback-head title="提交成功！"></v-feedback-head>
		<div class="feedback-content sbmsuc">
			<p>我们已经收到您的{{title}}信息，工作人员将会与您联系。感谢您对金财互联的信任和支持。</p>
			<p>如有疑问，可致电400-99-12366。</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title:this.$route.query.title
			}
		}
	}
</script>

<style>
	.sbmsuc {
		margin-top: 4.4rem;
		padding-left: .8rem;
		padding-right: .5rem;
	}
	
	.sbmsuc p {
		margin-bottom: 1.4rem;
		font-size: 1.2rem;
		color: #434343;
	}
</style>