<template>
	<div class="bdqyxx">
		<v-wx-header title="绑定企业信息" showLeft/>
		<div class="bdqyxx-bind-warn">
			用户绑定企业信息后，可享受一对一专属服务
		</div>
		<div class="bdqyxx-bind-name">
			已绑定的企业
		</div>
		<div class="bdqyxx-bind">

			<div class="bdqyxx-bindnone-tip">
				<span>无绑定任何企业信息</span>
			</div>
			<!--<div class="bdqyxx-add-tip">
				广州市华远建筑工程设计有限公司
			</div>-->
		</div>

		<div class="bdqyxx-add-name">
			<span>已添加的企业</span>
			<button @click="$router.push('/bindCompanyInfo/addBindCompany')"><span class="addIcon"><b>+</b></span><span style="font-size: 1.6rem;">添加企业</span></button>
		</div>
		<div class="bdqyxx-add">
			<!--<div class="bdqyxx-addnone-tip">
				<span>无添加任何企业信息</span>
			</div>-->
			<div class="bdqyxx-add-tip">
				广州市华远建筑工程设计有限公司
			</div>
		</div>
		<div class="bdqyxx-submit" v-bind:style="this.verifyPass?'background:#f29f3f':''" @click="bindSubmit">
			确认绑定
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				verifyPass: false
			}
		},
		methods: {
           bindSubmit() {
           	 if(!this.verifyPass) {
           	 	return
           	 }
           	 alert(" 绑定成功");
           },
		}
	}
</script>
<style scoped>
	.bdqyxx .bdqyxx-bind {
		height: 10rem;
		width: 100%;
		background: #ffffff;
		margin-top: .2rem;
		overflow-y: auto;
	}

	.bdqyxx-bind-warn {
		text-align: center;
		font-size: 1.6rem;
		color: #F76C07;
		padding-top: 1.1rem;
	}

	.bdqyxx-bind-name {
		font-size: 1.4rem;
		color: #8A8A8A;
		margin-top: 1.2rem;
		padding-left: 2rem;
	}

	.bdqyxx-bindnone-tip {
		text-align: center;
		padding-top: 2.2rem;
		color: #8A8A8A;
		font-size: 1.6rem;
	}

	.bdqyxx-addnone-tip {
		text-align: center;
		padding-top: 4.2rem;
		color: #8A8A8A;
		font-size: 1.6rem;
	}

	.bdqyxx-add-tip {
		color: #8A8A8A;
		padding: 1.5rem 0 0 2rem;
		font-size: 1.6rem;
	}

	.bdqyxx-add {
		height: 17.6rem;
		background: #fff;
		overflow-y: auto;
	}

	.bdqyxx-add-name {
		margin: 3rem 0 .4rem;
	}

	.bdqyxx-add-name>span {
		font-size: 1.4rem;
		color: #8A8A8A;
		padding-left: 2rem;
		padding-top: 1.8rem;
		display: inline-block;
	}

	.bdqyxx-add-name button {
		border: 1px solid #F29F3F;
		background: transparent;
		width: 50%;
		height: 4rem;
		text-align: center;
		line-height: 4rem;
		color: #F29F3F;
		float: right;
		margin-right: 4.5rem;
		border-radius: .4rem;
		transform: translateY(-.2rem);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.bdqyxx-submit {
		margin-top: 3.4rem;
		background: #BFBFBF;
		color: #fff;
		font-size: 1.8rem;
		height: 4.6rem;
		line-height: 4.6rem;
		text-align: center;
	}

	.bdqyxx-add-name .addIcon {
		position: relative;
		height: 2.2rem;
		width: 2.2rem;
		border-radius: 50%;
		background: #f29f3f;
		margin-right: 1rem;
		line-height: 2rem;
	}

	.bdqyxx-add-name b {
		color: #fff;
		font-size: 2.2rem;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
	}
</style>
