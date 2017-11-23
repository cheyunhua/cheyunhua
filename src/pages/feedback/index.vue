<template>
	<div class="feedback-bg">
		<v-wx-header title="在线反馈" showLeft/>
		<!--<v-feedback-head title="在线反馈"></v-feedback-head>-->
		<div class="feedback-content">
			<div class="feedback-top">
				<p class="feedback-po">请选择您需要的服务类型：</p>
				<button @click="$router.push('/feedback/product_ordering')">产品订购</button>
				<button @click="$router.push('/feedback/complaints')">投诉建议</button>
				<button @click="$router.push('/feedback/league')">招商加盟</button>
			</div>
			<div class="feedback-bottom">
				<p class="feedback-to">需要更多服务，您还可以：</p>
				<button><i class="icon iconfont icon-zixun11"></i>点击联系人工客服</button>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style>
	.feedback-bg {
		background: #fff;
		height: 100%;
		min-height: 50rem;
		position: relative;
	}
	
	.feedback-bg input {
		-webkit-appearance: none;
	}
	
	.feedback-bg textarea {
		-webkit-appearance: none;
	}
	
	.feedback-content {
		width: 85%;
		margin: 0 auto;
		color: #555;
		margin-top: 4rem;
	}
	
	.feedback-content p {
		font-size: 1.4rem;
		font-weight: 400;
	}
	
	.feedback-po {
		margin: 0 0 2.6rem;
	}
	
	.feedback-to {
		margin: 0 0 1.8rem;
	}
	
	.feedback-content button {
		display: block;
		border: .1rem solid #777;
		border-radius: .5rem;
		background: #fff;
		width: 75%;
		height: 4rem;
		margin: 0 auto;
		margin-bottom: 1.8rem;
	}
	
	.feedback-bottom {
		margin-top: 12rem;
		padding-bottom: 2rem;
	}
</style>