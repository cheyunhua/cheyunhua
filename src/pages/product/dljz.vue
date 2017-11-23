<template>
  <div>
    <div class="fx-header-top fx-orange">
      <i class="glyphicon glyphicon-menu-left fx-ico-left" aria-hidden="true"
			 v-on:click="goBack()"></i>{{Title}}
    </div>
    <div class="listPng02">
  		<li>
  		  <a @click="$router.push('/product/list?goodsCategoryId=10000000000000012&title=小规模纳税人')">
    			<span class="iconfont color03 icon-xiaoguimonashuirenqiyedailijizhang "></span>
    			<span class="txt">小规模纳税人</span>
  			</a>
  		</li>
  		<li>
  		  <a @click="$router.push('/product/list?goodsCategoryId=10000000000000011&title=一般纳税人')">
    			<span class="iconfont color05 icon-yibannashuirenqiyedailijizhang"></span>
    			<span class="txt">一般纳税人</span>
  			</a>
  		</li>
  		<li>
  		  <a @click="$router.push('/product/list?goodsCategoryId=10000000000000010&title=进出口企业')">
    			<span class="iconfont color06 icon-chongzhizhuanqu1"></span>
    			<span class="txt">进出口企业</span>
  			</a>
  		</li>
  		<li>
  		     <a @click="$router.push('/product/list?goodsCategoryId=10000000000000013&title=单项代办')">
  			<span class="iconfont color08 icon-daiban"></span>
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
        Title: '财税外包',
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
