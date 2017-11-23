<template>
	<div class="selectTheme-page">
		<div class="picker-toolbar">
			<div><span class="mint-datetime-action mint-datetime-cancel" @click="cancleTheme">取消</span></div>
			<span class="mint-datetime-action mint-datetime-confirm" @click="selectTheme">确定</span>
		</div>
		<mt-picker :slots="slots" @change="valuesChange" :valueKey="slots.valueKey"></mt-picker>
	</div>
</template>

<script>
	import { Picker } from 'mint-ui';
	import { Toast, Indicator, MessageBox } from 'mint-ui';
	import api from '../../api/';
	const localStorage = global.localStorage;
	export default {
		data() {
			return {
				slots: [{ values: [] }],
				sceneId: '',
				selectList: '',
				areacode: '',
				select:'',
			}
		},
		methods: {
			valuesChange(picker, values) {
				this.setTheme(values[0]);
				console.log('=====' + this.slots.values)
				for(let i = 0; i < this.selectList.length; i++) {
					if(this.selectList[i].theme == values[0]) {
						this.setArea(this.selectList[i].area);
						this.setSceneId(this.selectList[i].sceneId);
					}
				}

			},
			cancleTheme() {
				this.$emit('closethemeselect');
			},
			selectTheme() {
				this.$emit('closethemeselect');
			},
			setTheme(theme) {
				if(theme) {
					this.$emit('setTheme', theme);
				}
			},
			setArea(areaName) {
				this.$emit('setArea', areaName);
			},
			setSceneId(sceneId) {
				this.$emit('setSceneId', sceneId);
			},
			noSelect() {
				this.$emit('noSelect');
			},
			/*getTheme() {
				var theme = ["广州汇算清缴培训活动第六期"]
				this.slots[0].values = theme;
			},*/
			queryTrainInfo() {
				var selectList = sessionStorage.selectList;
				var _this = this;
				var theme = [];
				
				if(selectList) {
					selectList = JSON.parse(selectList);
					console.log(selectList);
					if (selectList.length == 0 )
					{
						_this.noSelect();
						return
					}
					_this.selectList = selectList;
					console.log("sessionStorage 不为空" + _this.selectList[0].theme);
					_this.setArea(this.selectList[0].area)
					for(let i = 0; i < this.selectList.length; i++) {
						theme.push(this.selectList[i].theme);
						_this.slots[0].values = theme;
					}
				} else {
					Indicator.open({
						text: "正在获取场次！请稍候",
						spinnerType: 'snake'
					});
					var params = {};
					params.areacode = this.areacode;
					api.queryTrainInfo(params).then((response) => {
						if(response.data.head.errorCode == '0') {
							console.log("jinlaile1")
							Indicator.close();
							_this.selectList = response.data.body;
							sessionStorage.setItem("selectList", JSON.stringify(_this.selectList));
							_this.queryTrainInfo();
						} else {
							Toast(response.data.head.errorMsg);
							//this.$message.info(response.data.head.errorMsg);
						}
						Indicator.close();
					}).catch((response) => {
						console.log("jinlaile2")
						Indicator.close();
						Toast('哎呀！网络出了点问题，请稍后重试！');
					});
				}
			}
		},
		created() {
			//			this.getTheme();
			this.areacode = this.$route.query.areacode != undefined ? this.$route.query.areacode : '';
			this.queryTrainInfo();

		}
	}
</script>

<style scoped>
	.selectTheme-page {
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
	
	.selectTheme-page {
		bottom: 0;
	}
</style>