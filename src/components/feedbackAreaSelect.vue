<template>
		<div class="fpi-content">
			<span><b>*</b>所在区域：</span>
			<div class="fpi-input">
				<div @click="provinceselect" class="fpi-province"></div>
				<select name="province" 
					    id="areas1"
					    >
					<option class="fpi-input-province" value="请选择省份">请选择省份</option>
				</select>
				<div class="fpi-city" @click="cityselect"></div>
				<select name="city" 
					    id="areas2"
					    >
					<option class="fpi-input-city" value="请选择城市">请选择城市</option>
				</select>
			</div>
		</div>
</template>

<script>export default {
	props: {
		
	},
	methods: {
        provinceselect: function () {
            this.$emit('provinceselect')
        },
        cityselect: function () {
            this.$emit('cityselect')
        }
    }
}
</script>

<style>
	.fpi-input {
		flex: 2.6;
		-webkit-flex: 2.6;
		display: flex;
		display: -webkit-flex;
		position: relative;
	}
	.fpi-input select {
		width:50%;
		margin-right: 1rem;
		font-size: 1.4rem;
		color: #000;
		overflow: hidden;
		outline: none;
		height: 2.4rem;
		border-color: #535353;
	}
	.fpi-input select option {
		font-size: 1.4rem;
		opacity: 0;
	}
     .fpi-province {
      	width: 48%;
      	position: absolute;
      	height: 2.4rem;
      	z-index: 99;
      }
      .fpi-city {
      	width: 48%;
      	position: absolute;
      	height: 2.4rem;
      	z-index: 99;
      	left: 50%;
      }
      
      @media (device-width:320px) and (-webkit-min-device-pixel-ratio:2) {
    /* 兼容iphone4、iphone5 */
      .fpi-input select {
		height: 2rem;
		margin-right: .6rem;
	}
	.fpi-province {
      	height: 2rem;
      }
      .fpi-city {
      	height: 2rem;
      }
}
</style>