<template>
	<div class="showMenu-page">
		<div>
			<div class="showMenu-page-item" style="border-radius: 0.5em 0.5em 0 0;border-top: 0;">选择功能类型</div>
			<div class="showMenu-page-item" @click="chooseFunType('纳税服务')">纳税服务</div>
			<div class="showMenu-page-item" @click="chooseFunType('个人办税')">个人办税</div>
			<div class="showMenu-page-item" @click="chooseFunType('涉税事项')">涉税事项</div>
			<div class="showMenu-page-item" @click="chooseFunType('申报缴款')">申报缴款</div>
			<div class="showMenu-page-item" @click="chooseFunType('发票中心')">发票中心</div>

			<div style="padding-top:1em;">
				<div class="showMenu-page-item-cancel" @click="closeAgent">取消</div>
			</div>
		</div>
	</div>
</template>
<style>
.showMenu-page {
	position: fixed;
	height: auto;
	width: 100%;
	bottom: 5%;
}
.showMenu-page-item {
	width: 90%;
	height: 3em;
	line-height: 3em;
	text-align: center;
	color: #5F646E;
	background: #ffffff;
	margin:0 auto;
	border-top: 0.1em solid #ababab;
	font-size: 1.2em;
}
.showMenu-page-item-cancel {	
	margin-bottom: 1em;
	width: 90%;
	height: 3em;
	line-height: 3em;
	text-align: center;
	color: #ffffff;
	background: #F6383A;
	margin:0 auto;
	font-size: 1.2em;
}
</style>
<script>
  export default {

    data () {
      return {
      	lala : ''
      }
    },
    methods: {
    	closeAgent: function (){
    		this.$emit('closeShowMenuAgent');
    	},
    	chooseFunType: function (obj){
			this.$emit('chooseFun',obj);
    	}
    },
    computed: {

    }
  }
</script>