<template>
	<div class="selectApplynum-page">
		<div class="picker-toolbar">
			<div><span class="mint-datetime-action mint-datetime-cancel" @click="cancleApplynum">取消</span></div>
			<span class="mint-datetime-action mint-datetime-confirm" @click="selectApplynum">确定</span>
		</div>
		<mt-picker :slots="slots" @change="valuesChange" :valueKey="slots.valueKey"></mt-picker>
	</div>
</template>

<script>
	import { Picker } from 'mint-ui';
	export default {
		data() {
			return {
				slots: [{ values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] }]
			}
		},
		methods: {
			valuesChange(picker, values) {
				this.setApplynum(values[0]);
			},
			cancleApplynum() {
				this.$emit('closeapplynumselect');
			},
			selectApplynum() {
				this.$emit('closeapplynumselect');
			},
			setApplynum(applynum) {
				this.$emit('setApplynum',applynum);
			},
		}
	}
</script>

<style scoped>
	.selectApplynum-page {
		position: fixed;
		height: auto;
		width: 100%;
		bottom: 5%;
	}
	
	.picker-toolbar {
		background: #FF7043 !important;
	}
	
	.mint-datetime-action {
		color: #ffffff;
	}
	.picker {
		background: #fff;
	}
	
	.selectApplynum-page {
		bottom: 0;
	}
</style>