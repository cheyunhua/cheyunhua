<template>
	<div class="selectArea-page">
		<div class="picker-toolbar">
			<div><span class="mint-datetime-action mint-datetime-cancel" @click="cancleArea">取消</span></div>
			<span class="mint-datetime-action mint-datetime-confirm" @click="selectArea">确定</span>
		</div>
		<div>
			<mt-picker :slots="slots" @change="onValuesChange" :valueKey="slots.valueKey"></mt-picker>
		</div>
	</div>
</template>
<script>
	import { Picker } from 'mint-ui';
	import async from 'src/api/async';
	const localStorage = global.localStorage;
	export default {
		data() {
			return {
				areasList: null,
				slots: [{
					flex: 1,
					values: [],
					className: 'slot1',
					textAlign: 'center'
				}, {
					divider: true,
					content: '-',
					className: 'slot2'
				}, {
					flex: 1,
					values: ["11"],
					className: 'slot3',
					textAlign: 'center'
				}],
				initialize: false
			}
		},
		methods: {
			onValuesChange(picker, values) {
				console.log("province:" + values[0] + "\t" + "city:" + values[1]);
				this.slots[2].values = this.getCity(values[0]);
				this.setCity(values[0], values[1]);
				if(typeof(values[0]) == "undefined" || typeof(values[1]) == "undefined") {
					this.setCity("省份", "城市");
				}
				if(this.initialize) {
					this.setCity("省份", "城市");
				}
			},
			cancle() {
				this.initialize = false;
			},
			setCity(province, city) {
				this.$emit('setCity', province, city);
			},
			getProvince() {
				var province = [];
				for(var property in this.areasList)
					province.push(this.areasList[property].areaName);
				return province;
			},
			initCity() {
				var areasList = sessionStorage.areasList; //从session里面取，
				var _this = this;
				if(areasList) {
					areasList = JSON.parse(areasList);
					this.areasList = areasList;
					console.log("sessionStorage 不为空" + this.areasList[0].areaName);
					this.slots[0].values = _this.getProvince();
				} else {
					let param = {};

					async(this, 'cdnqueryAllArea', param, res => {
						this.initialize = true;
						_this.areasList = res.body;
						_this.slots[0].values = _this.getProvince();
						sessionStorage.setItem("areasList", JSON.stringify(_this.areasList));
					})
				}
			},
			getCity(province) {
				//console.log("province:" + province);
				var subArea = [];
				var city = [];
				for(var property in this.areasList) {
					if(this.areasList[property].areaName == province) {
						subArea = this.areasList[property].subArea;
						if(province == "北京市" || province == "天津市" || province == "上海市" || province == "重庆市" || province == "香港特别行政区" || province == "澳门特别行政区") {
							city.push(province);
							return city;
						}
						if(province == "台湾省") {
							city.push("台湾市区");
							return city;
						}
						for(var subBroperty in subArea) {
							city.push(subArea[subBroperty].areaName);
						}
						return city;
					}
				}

			},
			cancleArea() {
				this.$emit('closeSelectAreaAgent');
			},
			selectArea() {
				this.$emit('closeSelectAreaAgent');
			}
		},
		created() {
			//初始化城市数据
			this.initCity();

			//this.slots[0].values = this.getProvince();
			//this.slots[2].values = Object.values(cityData)[0] ;
		},
		computed: {

		}
	}
</script>
<style scoped>
	.selectArea-page {
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
</style>