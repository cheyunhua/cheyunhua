<script type="es6">
	export default {
		name:'to-top',
		data() {
			return {
				showButton: false
			}
		},
		mounted() {
			var that = this;
			window.addEventListener('scroll', () => {
				if(window.scrollY > 100){
					that.showButton = true;
				} else {
					that.showButton = false;
				}
			}, false);
		},
		methods: {
			returnTop() {
				console.log('toTop')
				window.scrollTo(0, 0);
			}
		}
	}
</script>

<template>
	<div @click="returnTop" v-show="showButton" class="toTop"></div>
</template>

<style scoped>
	.toTop {
    position: fixed;
    bottom: 4.5rem;
    right: 2rem;
    z-index: 100;
    width: 35px;
    height: 35px;
    background-image: url('../assets/images/scroll-to-top-icon.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
	}
</style>
