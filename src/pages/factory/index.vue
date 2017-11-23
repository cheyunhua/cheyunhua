<template>
	<div>
	<div class="navHead">
         <div class="navTop">

         	<i class="fa fa-angle-left" v-on:click="goBack"></i>
         	我的服务门店<router-link :to="{path:'map', query:{address: factoryAddress}}"><img src="../../assets/images/common/fw_03.png" style="margin-right: 25%;"></router-link></div>
</div>
	<div class="xxDiv fwmd">
         	<div class="xxDivl fwmd1"><img src="../../assets/images/common/mdfw_03.png"></div>
            <div class="xxDivr">
                <div>{{ factoryName }}</div>
                <div>VIP客户经理： {{ factoryVipPhone }}</div>
              <div class="content">{{ factoryAddress }}</div>
             </div>
</div>
</div>
</template>
<script type="es6">
    import '../../assets/css/we.css'
	import config from '../../api/config'
	import api from '../../api/';
  import _track from '../../api/track';
  import { mapState } from 'vuex';
	import { Toast,Indicator  } from 'mint-ui';

	export default {
	  	data () {
			return {
			factoryId:null,
			factoryName:null,
			factoryAddress:null,
			factoryVipPhone:null,
			cusId:null,
			}
		},
		methods: {
        goBack: function() {
          window.history.go(-1);
        },
		loadfacturyInfo(){
           this.factoryId = this.$route.query.selectStoreDeptCode;
			 this.cusId=this.$route.query.selectCustomerCode;
			 var params={};
			 params.depId=this.factoryId;
			 params.cusId=this.cusId;
          console.log( this.factoryId +",查找门店信息");
      api.queryFactoryInfo(params).then((response) => {
    	  	console.log(response.data.head);
    	  	if(response.data.body){
    	    this.factoryName=response.data.body.depName;
    	    this.factoryAddress=response.data.body.depAddress;
    	    this.factoryVipPhone=response.data.body.vipPhone;
    	   }
          });
        }
		},
		created() {
        var self = this;
        self.loadfacturyInfo();
    },

	watch:{
      '$route':'loadfacturyInfo'
     },

		mounted: function () {

    }
	}
</script>
<style scoped>
	.page-part {
		margin-top: 3rem;
	}
	.mint-button {
		background-color: #4cd964
	}
	.mint-header {
		background-color: #f7f7f8;
    	border-bottom: 1px solid #e7e7e7;
    	color: #3d4145;
	}
	img {
		width:4rem;
		margin-top:0.5rem;
	}
  div{

  }
</style>
