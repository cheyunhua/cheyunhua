<template>
	<div class="feedback-bg">
		<v-wx-header title="投诉建议" showLeft/>
		<!--<v-feedback-head title="投诉建议"></v-feedback-head>-->
		<div class="feedback-content fb-complaints">
			<form id="cpForm" @submit.prevent="cpinuptSubmit" enctype="multipart/form-data">
				<div class="fpi-content">
					<span>投诉问题类型：</span>
					<div class="fpi-input fb-complaints-input">
						<select name="complaintsType">
							<option value="请选择投诉问题类型">请选择投诉问题类型</option>
							<option value="服务质量">服务质量</option>
							<option value="线路异常">线路异常 </option>
							<option value="产品故障">产品故障</option>
							<option value="资费问题">资费问题</option>
							<option value="其他问题">其他问题</option>
						</select>
					</div>
				</div>
				<v-feedback-describe star name="issueDescribe" title="问题描述"></v-feedback-describe>
				<!--<div class="fb-complaints-upload">
					<v-feedback-fbinput name="uploadScreenshot" idName="uploadScreenshot" title="上传截图"></v-feedback-fbinput>
					<div class="upload-button">
						<input type="file" name="upload" id="upload" value="上传截图" @change="changeEvent(this)" />
					</div>
					<button>上传</button>
				</div>-->
				<v-feedback-fbinput name="nsrsbh" idName="identifier" title="纳税人识别号"></v-feedback-fbinput>
				<v-feedback-fbinput star name="linkman" idName="linkman" title="联系人"></v-feedback-fbinput>
				<v-feedback-fbinput star name="mobileNumber" idName="mobileNumber" title="手机号"></v-feedback-fbinput>
				<v-feedback-area-select @provinceselect="provinceOnclick()" @cityselect="cityOnclick()"></v-feedback-area-select>
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
	import { Toast, Indicator, IndexList, IndexSection } from 'mint-ui'
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
				/*imgSize: "",*/
				areaVisible: false,
				cityVisible: false,
				citylists: [

				],
				arealists: [

				],
				areasList: null,
				checkboxValue: "",
			}
		},
		created() {
			this.cdnqueryAllArea();
		},
		mounted() {
			$('#uploadScreenshot').attr("readonly", true);

		},
		methods: {
			testCommon,
			testEmail,
			cpinuptSubmit(event) {
				var post1 = "",
					post2 = "";
				var phone = $('#mobileNumber'),
					linkman = $('#linkman'),
					areas1 = $('#areas1'),
					areas2 = $('#areas2'),
					email = $('#Email');
				/*var imgType = $("#uploadScreenshot").val().toLowerCase().substr($("#uploadScreenshot").val().lastIndexOf(".") + 1);*/
				var formData = new FormData($('#feedbackForm'));
				if(/^\s*$/.test($("#describe").val())) {
					Toast('问题描述不能为空');
					$("#describe").focus();
					return false;
				}
				/*if($("#uploadScreenshot").val()) {
					var imgSize = Math.round(document.getElementById("upload").files[0].size / 1024);
					if(imgType != "jpg" && imgType != "gif" || imgSize > 200) {
						Toast('图片类型错误(仅限大小200kb以内的"jpg"和"gif"文件)');
						$("#uploadScreenshot").focus();
						return false;
					}
				}*/
				if($("#identifier").val()) {
					if($("#identifier").val().length != 15 && $("#identifier").val().length != 18 && $("#identifier").val().length != 20) {
						Toast('纳税人识别号格式错误');
						$("#identifier").focus();
						return false;
					}
				}
				post1 = testCommon(areas1, areas2, linkman, phone);
				if(!post1) { return; }
				post2 = testEmail(email);
				if(!post2) { return; }
				var timestamp = Date.parse(new Date());
				console.log(timestamp);
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
				/*   var checkboxStr = JSON.stringify(jsonuserinfo.buyingInclination);
					var result = checkboxStr.replace(/\[/g,'').replace(/\]/g,'').replace(/"/g,'');
					var checkboxValue = JSON.parse('"'+result+'"');
					jsonuserinfo.buyingInclination = checkboxValue;*/
				this.checkboxValue = jsonuserinfo;
				this.complaintsave();

			},
			complaintsave() {
				let param = this.checkboxValue;
				console.log(param);
				async(this, 'complaintsave', param, res => {
					if(res.head.errorCode == "0") {
						this.$router.push({ path: '/feedback/submitsuccess', query: { title: "投诉" } });
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
				} else if(ProvinceValue == "香港特别行政区") {
					this.citylists.push({ areaName: "香港特别行政区" });
				} else if(ProvinceValue == "澳门特别行政区") {
					this.citylists.push({ areaName: "澳门特别行政区" });
				} else {
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
			/*changeEvent(fileInput) {
				var path = $("#upload").val();
				var pos1 = path.lastIndexOf('/');
				var pos2 = path.lastIndexOf('\\');
				var pos = Math.max(pos1, pos2);
				if(pos < 0) {
					$("#uploadScreenshot").val(path);
				} else {
					$("#uploadScreenshot").val(path.substring(pos + 1));
				}
			},*/
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
	.citypopup {
		width: 100%;
		height: 100%;
	}
	
	.fb-complaints .fpi-input {
		flex: 2.2;
	}
	
	.fb-complaints-input select {
		width: 70% !important;
	}
	
	.fb-complaints-upload {
		position: relative;
	}
	
	.fb-complaints-upload .upload-button {
		position: absolute;
		width: 6rem;
		height: 2.2rem;
		top: 0;
		right: 0;
		z-index: 999;
		overflow: hidden;
	}
	
	#upload {
		opacity: 0;
		font-size: 1.2rem;
	}
	
	.fb-complaints-upload button {
		position: absolute;
		width: 6rem;
		height: 2.25rem;
		top: 0;
		right: 0;
		background: #fff;
		border: 1px solid #807e7e;
		z-index: 99;
	}
	
	#uploadScreenshot {
		border-radius: 0 0.5rem 0.5rem 0;
	}
	
	.feedback-bg .mint-cell {
		margin: 0;
		min-height: 3.6rem;
	}
	
	.feedback-bg .v-modal {
		opacity: 0 !important;
	}
	.fb-complaints select {
		width: 50%;
		margin-right: .6rem;
	}
	.fb-complaints .fpi-province {
		width: 48%;
	}
	
	.fb-complaints .fpi-city {
		width: 48%;
		left: 50%;
	}
</style>