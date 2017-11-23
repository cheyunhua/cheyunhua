<script>
	export default {
		data: function() {
			return {
				show: true,
				shows: false,
				currentIndex: 0,
				stewardData: {
					startY: "",
					startX: "",
					endX: "",
					endY: "",
					showADID: 1,
					tests: "",
				},
			}
		},
		props: {
			img: {
				type: Array,
				required: true
			},
			imgLength: {
				type: Number,
				required: true
			},
		},
		methods: {
			//			点击下键
			clickBottom() {
//debugger
				this.currentIndex++;
				if(!this.shows) {
					this.shows = true
				}
				
				if(this.currentIndex >= this.imgLength) {
					this.show = false
				}
			},
			//			点击上键
			clickTop() {
//				debugger
				this.currentIndex = this.currentIndex - 1;
				if(this.currentIndex == 0) {
					if(this.shows) {
						this.shows = false
					}
				}
				if(!this.show) {
					this.show = true
				}
			},
			//			touchStart，touchMove，touchEnd滑动效果
			touchStart(event) {
				var touch = event.touches[0];
				var that = this;
				that.stewardData.startY = touch.pageY;
			},
			touchMove(event) {
				var touch = event.touches[0];
				var that = this;
				that.stewardData.tests = touch.pageY;
				this.stewardData.endY = (touch.pageY - this.stewardData.startY);
			},
			touchEnd(event) {
				var that = this;
				debugger
				if(this.stewardData.endY >= 0) {
					if(this.currentIndex == 0) {
						return
					}
					this.clickTop();
				} else {
					if(this.currentIndex == 3) {
						return
					}
					this.clickBottom();
				}
			}
		}
	}
</script>
<template>
	<div class="slide">
		<!--<div class="slide" v-on={touchstart:touchStart,touchmove:touchMove,touchend:touchEnd}>-->
		<!--<div class="slide-box" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">-->
		<div class="slide-box">
			<div class="slide-img" v-for="(imgs,index) in img">
				<!--<transition name="fade">-->
					<img class="slide-img-01" :src="imgs.src" v-if='index==currentIndex' />
				<!--</transition>-->
			</div>
		</div>
		<i class="slide-top glyphicon glyphicon-chevron-up" v-on:click="clickTop" v-if="shows"></i>
		<i class="slide-bottom glyphicon glyphicon-chevron-down" v-on:click="clickBottom" v-if="show"></i>
	</div>

</template>

<style>
	#app,
	.slide-wrapper,
	.slide {
		height: 100%;
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .2s
	}
	
	.fade-enter,
	.fade-leave-to
	/* .fade-leave-active in below version 2.1.8 */
	
	{
		opacity: 0
	}
	
	.slide-img img {
		margin-top: 4rem;
		width: 100%;
	}
	
	.slide {
		position: relative;
		background-color: white;
	}
	/*滑动上键*/
	
	.slide .slide-top {
		position: absolute;
		left: 50%;
		margin-left: -2rem;
		font-size: 4rem;
		opacity: 0.5;
		top: 2rem;
	}
	/*滑动下键*/
	
	.slide .slide-bottom {
		position: absolute;
		left: 50%;
		margin-left: -2rem;
		font-size: 4rem;
		opacity: 0.5;
		bottom: 2rem;
		top: inherit;
	}
</style>