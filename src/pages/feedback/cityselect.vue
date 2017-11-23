<template>
		<div class="cityselect">{{cityName}}</div>
</template>

<script>
	export default {
        props:{
        	cityName: {
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
	.cityselect {
		border-bottom:1px solid #d9d9d9;
		height: 3.6rem;
		line-height: 3.6rem;
		padding: 0 1rem;
	}
	
	.cityselect:last-child {
		border-bottom: none;
	}
</style>