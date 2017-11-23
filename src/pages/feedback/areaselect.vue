<template>
		<div class="areaselect">{{areaName}}</div>
</template>

<script>
	export default {
        props:{
        	areaName: {
				type: String,
				required: true
			},
        },
		components: {
        },
		data() {
			return{
				
			}
		}
	}
</script>

<style>
	.areaselect {
		border-bottom:1px solid #d9d9d9;
		height: 3.6rem;
		line-height: 3.6rem;
		padding: 0 1rem;
	}
	
	.areaselect:last-child {
		border-bottom: none;
	}
	
	.feedback-bg .mint-indexlist-content {
		height: 93% !important;
	}
	.feedback-bg .mint-indexlist {
		height:100% !important;	}
</style>