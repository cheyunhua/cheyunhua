<template>
  <div>
    <div class="fx-header-top fx-orange">
      <i class="glyphicon glyphicon-menu-left fx-ico-left" aria-hidden="true"
			 v-on:click="goBack()"></i>{{Title}}
    </div>
    <div class="listPng02">
  		<li>
  		  <a @click="$router.push('/product/list?goodsCategoryId=10000000000000009&title=公司注册')">
    			<span class="iconfont color01 icon-gongsizhuce-copy"></span>
    			<span class="txt">公司注册</span>
  			</a>
  		</li>
  		<li>
  		  <a @click="$router.push('/product/list?goodsCategoryId=10000000000000006&title=公司变更')">
    			<span class="iconfont color02 icon-gongsibiangeng01"></span>
    			<span class="txt">公司变更</span>
  			</a>
  		</li>
  		<li>
  		  <a @click="$router.push('/product/list?goodsCategoryId=10000000000000007&title=公司注销')">
    			<span class="iconfont color03 icon-gongsizhuxiao"></span>
    			<span class="txt">公司注销</span>
  			</a>
  		</li>
  		<li>
  		     <a @click="$router.push('/product/list?goodsCategoryId=10000000000000005&title=单项代办')">
  			<span class="iconfont color04 icon-daiban"></span>
  			<span class="txt">单项代办</span>
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
        Title: '开办公司',
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
