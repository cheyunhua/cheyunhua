<template>
	<div class="feedbackform">
		<h1>{{title}}</h1>
		<div class="feedback-line"></div>
	</div>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				required: true
			}
		},
		data() {
			return {

			}
		}
	}
</script>

<style>
	.feedbackform h1 {
		font-size: 2rem;
		font-weight: 400;
		color: #555;
		text-align: center;
		padding-top: 3rem;
		padding-bottom: 2rem;
	}
	
	.feedback-line {
		height: .1rem;
		width: 85%;
		margin: 0 auto;
		background: #777;
		margin-bottom: 1.6rem;
	}
</style>