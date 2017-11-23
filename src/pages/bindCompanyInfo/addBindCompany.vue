<template>
	<div class="ab-company">
		<v-wx-header title="新增绑定企业" showLeft/>
		<div class="abc-content">
			<div class="abc-nav">
				<mt-button size="small" v-bind:style="this.active=='nsrsbh'?'color: #fff;background:#f29f3f;':''" @click.native.prevent="active = 'nsrsbh'">纳税人识别号</mt-button>
				<mt-button size="small" v-bind:style="this.active=='company'?'color: #fff;background:#f29f3f;':''" @click.native.prevent="active = 'company'">企业名称</mt-button>
			</div>
			<div class="abc-page-tab">

				<mt-tab-container v-model="active">
					<mt-tab-container-item id="nsrsbh">
						<div class="abc-input">
							<el-input v-model="nsrInput" style="width: 77%;" size="large" placeholder="请输入纳税人识别号" @blur="checkAll"></el-input>
							<button class="check" @click="checkNum">检测</button>
						</div>
						<div class="abc-input" v-if="this.addcompany">
							<div>公司名称：{{addcompany}}</div>
						</div>
					</mt-tab-container-item>
					<mt-tab-container-item id="company">
						<div class="abc-input">
							<el-input v-model="nsrInit" size="large" placeholder="请输入内容"></el-input>
						</div>
						<div class="abc-input">
							<el-input v-model="companyInput" size="large" placeholder="请输入企业名称"></el-input>
						</div>
					</mt-tab-container-item>
				</mt-tab-container>
			</div>
		</div>
		<div class="abc-submit" v-bind:style="this.verifyPass?'background:#f29f3f':''" @click="addSubmit">
			确认添加
		</div>
		<div class="abc-warn">如果纳税人识别号不存在，请添加完整企业名称</div>
	</div>
</template>
<script>
	import ElementUI from 'element-ui'
	import { TabContainer, TabContainerItem } from 'mint-ui';
	import Vue from 'vue';
	import { Toast, Indicator, MessageBox } from 'mint-ui';
	Vue.component(TabContainer.name, TabContainer);
	Vue.component(TabContainerItem.name, TabContainerItem);
	export default {
		data() {
			return {
				active: 'nsrsbh',
				nsrInput: '',
				nsrInit: '',
				companyInput: '',
				addcompany: '',
				verifyPass: false,
			}
		},
		methods: {
			checkNum() {
				if(!this.nsrInput) {
					Toast('纳税人识别号不能为空');
					return
				}
				if(this.nsrInput.length != 12 && this.nsrInput.length != 15 && this.nsrInput.length != 18 && this.nsrInput.length != 20) {
					Toast('纳税人识别号格式错误');
					return;
				}
				this.active = 'company';
				this.nsrInit = this.nsrInput
			},
			checkAll() {
				if(!this.nsrInit) {
					this.verifyPass = false;
					return
				}
				if(!this.companyInput) {
					this.verifyPass = false;
					return
				}
				this.verifyPass = true;
			},
			addSubmit() {
				if(!this.verifyPass) {
					return;
				}
				if(this.nsrInit.length != 12 && this.nsrInit.length != 15 && this.nsrInit.length != 18 && this.nsrInit.length != 20) {
					Toast('纳税人识别号格式错误');
					return;
				}
				alert("添加成功")
			},
			　a(curVal, oldVal) {
				alert("添加成功")

			}
		},
		watch: {
			companyInput: 'checkAll',
			nsrInit: 'checkAll'
		}
	}
</script>
<style scoped>
	.abc-content {
		background: #fff;
		padding-top: 2rem;
	}
	
	.abc-input {
		width: 90%;
		margin: 0 auto 2rem;
	}
	
	.abc-nav {
		width: 70%;
		height: 4rem;
		background: #d4d4d4;
		margin: 0 auto 2rem;
		border-radius: .4rem;
		overflow: hidden;
	}
	
	.abc-nav button {
		width: 50%;
		border: none;
		background: transparent;
		margin: 0;
		box-shadow: none;
		color: #fff;
		padding: 0;
		height: 100%;
		margin-right: -.5rem;
	}
	
	.abc-nav button:nth-child(1) {
		border-radius: .4rem 0 0 .4rem;
	}
	
	.abc-nav button:nth-child(2) {
		border-radius: 0 .4rem .4rem 0;
	}
	
	.check {
		width: 21%;
		height: 4rem;
		line-height: 4rem;
		text-align: center;
		background: rgb(255, 112, 69);
		border: 1px solid rgb(255, 112, 69);
		border-radius: .4rem;
		color: #fff;
	}
	
	.check:active {
		opacity: .8;
	}
	
	.abc-page-tab {
		height: 14rem;
	}
	
	.abc-submit {
		margin-top: 2.2rem;
		background: #BFBFBF;
		color: #fff;
		font-size: 1.8rem;
		height: 4.6rem;
		line-height: 4.6rem;
		text-align: center;
	}
	
	.abc-warn {
		text-align: center;
		color: #8A8A8A;
		font-size: 1.4rem;
		margin-top: .9rem;
	}
</style>
<style type="text/css">
	.ab-company .mint-button-text {
		margin: 0;
		font-weight: 400;
		font-size: 1.6rem;
	}
	
	.ab-company .mint-button:after {
		display: none;
	}
	
	.ab-company .el-input--large .el-input__inner {
		height: 4rem;
	}
</style>