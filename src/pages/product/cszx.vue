<template>
  <div>
    <div class="fx-header-top fx-orange">
      <i class="glyphicon glyphicon-menu-left fx-ico-left" aria-hidden="true"
			 v-on:click="goBack()"></i>{{Title}}
    </div>
    <div class="listPng02">
  		<li>
  		  <a @click="$router.push('/product/cszxDetail?goodsCategoryId=967ce253c8854350bc2649281f06b18c&id=1')">
    			<span class="iconfont color01 icon-gongsizhuce-copy"></span>
    			<span class="txt">土地增值税清算审核报告</span>
  			</a>
  		</li>
  		<li>
  		  <a @click="$router.push('/product/cszxDetail?goodsCategoryId=967ce253c8854350bc2649281f06b18c&id=2')">
    			<span class="iconfont color02 icon-gongsibiangeng01"></span>
    			<span class="txt">企业所得税汇算清缴报告</span>
  			</a>
  		</li>
  		<li>
  		  <a @click="$router.push('/product/cszxDetail?goodsCategoryId=967ce253c8854350bc2649281f06b18c&id=3')">
    			<span class="iconfont color03 icon-gongsizhuxiao"></span>
    			<span class="txt">个人所得税汇算清缴报告</span>
  			</a>
  		</li>
  		<li>
  		     <a @click="$router.push('/product/cszxDetail?goodsCategoryId=967ce253c8854350bc2649281f06b18c&id=4')">
  			<span class="iconfont color04 icon-daiban"></span>
  			<span class="txt">企业注销清算审核报告</span>
  			</a>
  		</li>
  		<li>
  		     <a @click="$router.push('/product/cszxDetail?goodsCategoryId=967ce253c8854350bc2649281f06b18c&id=5')">
  			<span class="iconfont color04 icon-baobiao"></span>
  			<span class="txt">股权转让税款清算报告</span>
  			</a>
  		</li>
  		<li>
  		     <a @click="$router.push('/product/cszxDetail?goodsCategoryId=967ce253c8854350bc2649281f06b18c&id=6')">
  			<span class="iconfont color04 icon-daiban"></span>
  			<span class="txt">企业资产损失报告</span>
  			</a>
  		</li>

	</div>
  </div>

</template>

<script type="es6">
  import { Toast,Indicator,MessageBox  } from 'mint-ui';
  import api from '../../api/';
  export default{
    data(){
      return{
        Title: '财税咨询',
      }
    },
    methods:{
      goBack: function() {
        window.history.go(-1);
      },
  },
	created() {
	},

	watch:{
	 },

	mounted: function () {

	}
}
</script>

<style>

</style>
