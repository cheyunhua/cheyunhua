<template>
	<div class="fpi-content">
		<span><b v-if="star">*</b>{{title}}：</span>
		<div class="fpi-input">
			<input type="text" :name="name" :id="idName"  value="" />
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			idName: {
				type: String,
				required: true
			},
			name: {
				type: String,
				required: true
			},
			title: {
				type: String,
				required: true
			},
			star: Boolean,
		},
		data() {
			return {

			}
		}
	}
</script>

<style>
	.fpi-content {
		display: flex;
		display: -webkit-flex;
		margin-bottom: 1.6rem;
	}
	
	.fpi-content span {
		flex: 1;
		-webkit-flex: 1;
		font-size: 1.4rem;
		color: #000;
	}
	
	.fpi-content b {
		color: red;
		font-weight: 400;
		font-size: 1.4rem;
	}
	
	.fpi-input {
		flex: 2.6;
		-webkit-flex: 2.6;
	}
	
	.fpi-input input {
		width: 100%;
		border: 1px solid #535353;
		color: #000;
		font-size: 1.4rem;
		padding: .2rem .2rem;
		border-radius: 0;
		height: 2.8rem;
	}
	
	@media (device-width:320px) and (-webkit-min-device-pixel-ratio:2) {
    /* 兼容iphone4、iphone5 */
     .fpi-content span {
		flex: 1;
		font-size: 1.4rem;
		color: #000;
		vertical-align: middle;
	}
	
	.fpi-content b {
		color: red;
		font-weight: 400;
		font-size: 1.2rem;
	}
	
	.fpi-input {
		flex: 2.4 !important;
		-webkit-flex: 2.4 !important;
	}
	
	.fb-complaints .fpi-input {
		flex: 1.6 !important;
		-webkit-flex: 1.6 !important;
	}
	
	.fpi-input input {
		font-size: 1.2rem;
		height: 2.2rem;
	}
}
</style>