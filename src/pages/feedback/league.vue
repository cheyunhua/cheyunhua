<template>
	<div class="feedback-bg">
		<v-wx-header title="合作加盟" showLeft/>
		<!--<v-feedback-head title="合作加盟"></v-feedback-head>-->
		<div class="feedback-content">
			<form id="lgForm" @submit.prevent="lginuptSubmit">
				<v-feedback-area-select @provinceselect="provinceOnclick()" @cityselect="cityOnclick()"></v-feedback-area-select>
				<v-feedback-fbinput star name="EcompanyName" idName="EcompanyName" title="公司名称"></v-feedback-fbinput>
				<v-feedback-fbinput star name="linkman" idName="linkman" title="联系人"></v-feedback-fbinput>
				<v-feedback-fbinput star name="mobileNumber" idName="mobileNumber" title="手机号"></v-feedback-fbinput>
				<v-feedback-fbinput name="Email" idName="Email" title="Email"></v-feedback-fbinput>
				<v-feedback-describe name="leagueContent" title="内容"></v-feedback-describe>
				<input class="feedback-submit" type="submit" value="提交" />
			</form>
		</div>
		<mt-popup v-model="areaVisible" position="right" class="citypopup" :modal="false">
			<v-wx-header title="选择省份" showareaLeft @backselect="closearea()" />
			<mt-index-list>
				<areaselect v-for="arealist in arealists" :areaName="arealist.areaName"></areaselect>
			</mt-index-list>
		</mt-popup>

		<mt-popup v-model="cityVisible" position="right" class="mint-popup-3" :modal="false">
			<v-wx-header title="选择城市" showareaLeft @backselect="closecity()" />
			<mt-index-list>
			<cityselect v-for="citylist in citylists" :cityName="citylist.areaName"></cityselect>
			</mt-index-list>
		</mt-popup>
	</div>
</template>

<script>
	import Vue from 'vue';
	import async from 'src/api/async'
	import testCommon from 'src/assets/js/testcommon'
	import testEmail from 'src/assets/js/testemail'
	import { Toast, Indicator, IndexList, IndexSection  } from 'mint-ui'
	import areaselect from './areaselect'
	import cityselect from './cityselect'
	Vue.component(IndexList.name, IndexList);
	Vue.component(IndexSection.name, IndexSection);
	export default {
		components: {
			areaselect,
			cityselect
		},
		data() {
			return {
				areaVisible: false,
				cityVisible: false,
				citylists: [

				],
				arealists: [

				],
				areasList: null,
			}
		},
		created() {
			this.cdnqueryAllArea();
		},
		methods: {
			testCommon,
			testEmail,
			lginuptSubmit(event) {
				var post1 = "",
					post2 = "";
				var phone = $('#mobileNumber'),
					linkman = $('#linkman'),
					areas1 = $('#areas1'),
					areas2 = $('#areas2'),
					email = $('#Email');
				var formData = new FormData($('#feedbackForm'));
				post1 = testCommon(areas1, areas2, linkman, phone);
				if(!post1) { return; }
				if(!$("#EcompanyName").val()) {
					Toast('公司名称不能为空');
					$("#EcompanyName").focus();
					return false;
				}
				post2 = testEmail(email);
				if(!post2) { return; }
	/*			var timestamp = Date.parse(new Date());
				console.log(timestamp);*/
			
                $.fn.serializeObject = function() {
					var o = {};
					var a = this.serializeArray();
					$.each(a, function() {
						if(o[this.name]) {
							if(!o[this.name].push) {
								o[this.name] = [o[this.name]];
							}
							o[this.name].push(this.value || '');
						} else {
							o[this.name] = this.value || '';
						}
					});
					return o;
				};
					var jsonuserinfo = $('form').serializeObject();
                    this.checkboxValue = jsonuserinfo;
                    this.cooperatesave();
			},
			cooperatesave() {
				let param = this.checkboxValue;
				async(this, 'cooperatesave', param, res => {
					if(res.head.errorCode == "0") {
						this.$router.push({path:'/feedback/submitsuccess',query:{title:"咨询"}});
					}
            })
			},
			cdnqueryAllArea() {
				var _this = this;
				var areasList = sessionStorage.areasList;
				var areaencode = this.$route.query.encode;
				if(areasList) {
					areasList = JSON.parse(areasList);
					_this.areasList = areasList;
					for(var i = 0; i < areasList.length; i++) {
						this.arealists.push({ areaName: areasList[i].areaName });
						if(areaencode && areaencode == areasList[i].subArea.areaCode) {
							$("#areas1 .fpi-input-province").val(areasList[i].areaName);
							$("#areas1 .fpi-input-province").html(areasList[i].areaName);
							$("#areas2 .fpi-input-province").val(areasList[i].subArea.areaName);
							$("#areas2 .fpi-input-province").html(areasList[i].subArea.areaName);
						}
					}
				} else {
					let param = {};
					async(this, 'cdnqueryAllArea', param, res => {
						_this.areasList = res.body;
						sessionStorage.setItem("areasList", JSON.stringify(_this.areasList));
						cdnqueryAllArea();
					})
				}
			},
			provinceOnclick() {
				var areasList = this.areasList;
				this.areaVisible = true;
				$("#areas2").empty().append("<option class='fpi-input-city'value='请选择城市'>请选择城市</option>");
				var that = this;
				$(".areaselect").on("click", function() {
					var provinceValue = $(this).html();
					$("#areas1 .fpi-input-province").html(provinceValue);
					$("#areas1 .fpi-input-province").val(provinceValue);
					that.areaVisible = false;
					that.citySetup();
				})
			},
			citySetup() {
				this.citylists = [];
				var areasList = this.areasList;
				var ProvinceValue = $("#areas1 .fpi-input-province").val();
				if(ProvinceValue == "北京市") {
					this.citylists.push({ areaName: "北京市" });
				} else if(ProvinceValue == "天津市") {
					this.citylists.push({ areaName: "天津市" });
				} else if(ProvinceValue == "上海市") {
					this.citylists.push({ areaName: "上海市" });
				} else if(ProvinceValue == "重庆市") {
					this.citylists.push({ areaName: "重庆市" });
				} else if(ProvinceValue == "台湾省") {
					this.citylists.push({ areaName: "台湾市区" });
				}else if(ProvinceValue == "香港特别行政区") {
					this.citylists.push({ areaName: "香港特别行政区" });
				}else if(ProvinceValue == "澳门特别行政区") {
					this.citylists.push({ areaName: "澳门特别行政区" });
				}else {
					for(var i = 0; i < areasList.length; i++) {
						if(areasList[i].areaName == ProvinceValue) {
							var areaCity = areasList[i].subArea;
							for(var j = 0; j < areaCity.length; j++) {
								this.citylists.push({ areaName: areaCity[j].areaName });
							}
						}
					}
				}
			},
			cityOnclick() {
				this.cityVisible = true;
				var that = this;
				$(".cityselect").on("click", function() {
					var provinceValue = $(this).html();
					$("#areas2 .fpi-input-city").html(provinceValue);
					$("#areas2 .fpi-input-city").val(provinceValue);
					that.cityVisible = false;
				})
			},
			closearea() {
				this.areaVisible = false;
			},
			openarea() {
				this.areaVisible = true;
			},
			closecity() {
				this.cityVisible = false;
			},
			opencity() {
				this.cityVisible = true;
			},
		},
		activated() {
			this.areaVisible = false;
			this.cityVisible = false;
		}
	}
</script>

<style>

</style>