<template>
		<div class="fpi-content">
			<span><b v-if="star">*</b>{{title}}：</span>
			<div class="fpi-input">
				<textarea id="describe" :name="name" rows="4" cols=""></textarea>
			</div>
		</div>
</template>

<script>export default {
	props: {
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
}</script>

<style>

	
	.fpi-input textarea {
		width: 100%;
		resize: both;
		border-radius: 0.1rem;
		font-size: 1.2rem;
		color: #000;
		height: auto;
		padding: .2rem .2rem;
		border-color: #535353
	}
	
</style>