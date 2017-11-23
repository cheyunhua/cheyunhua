<template>
<div>
			<div class="fx-header-top fx-orange">
				<i class="glyphicon glyphicon-menu-left fx-ico-left" aria-hidden="true" v-on:click="goBack()"></i>企业信息
			</div>
		<div class="wrapper">
			<ul style="display: block">
				<li v-on:click="onDetail('企业名称',cusName)"><i>企业名称:</i><span>{{ cusName }}</span></li>
				<li v-on:click="onDetail('所属地区',cusAdree)"><i>所属地区:</i><span>{{ cusAdree }}</span></li>
				<li v-on:click="onDetail('联系人',cusConName+' '+cusConPhone)"><i>联系人:</i><span>{{ cusConName }}&nbsp;{{ cusConPhone }}</span></li>
			</ul>
			<ul style="margin-top:0.8rem;display: block">
				<li v-on:click="onDetail('服务门店',facName)"><i>服务门店:</i><span>{{ facName }}</span></li>
        <li v-on:click="onDetail('门店地址',facAddress)"><i>门店地址:</i><span>{{ facAddress }}</span><router-link :to="{path:'map', query:{address: facAddress}}"><img src="../../assets/images/common/qyx_03.png"></router-link></li>
				<li v-on:click="onDetail('VIP客户经理',facVipName+' '+facVipPhone)"><i>VIP客户经理:</i><span>{{ facVipName }}&nbsp;{{ facVipPhone }}</span></li>
			</ul>
		</div>
</div>
</template>
<script type="es6">
    import '../../assets/css/enterprise.css'
	import config from '../../api/config'
	import api from '../../api/';
	import { mapState } from 'vuex';
	import { Toast,Indicator  } from 'mint-ui';
  import _track from '../../api/track';

    export default {
	  	data () {
			return {
				cusId:null,
				cusName:null,
				cusAdree:null,
				cusConName:null,
				cusConPhone:null,
				facId:null,
				facName:null,
				facVipName:null,
				facVipPhone:"空",
				facAddress:'空',
			}
		},

		methods: {
      onDetail(objName,objValue){
        _track._trackEvent("JCDZ_WX","设置-企业信息",objName,objValue);
      },
			 goBack: function() {
          window.history.go(-1);
        },
		loadCustomer(){
	   this.cusId=this.$route.query.cusId;
       console.log(this.cusId+",查找个企业信息");
      	api.querycustomerBycusId({cusId:this.cusId}).then((response) => {
            console.log(response.data);

            var cusInfo=response.data.body;
            if(cusInfo){
            this.cusName=cusInfo.cusName;
            this.cusAdree=cusInfo.cusAreaDetail;
            this.cusConName=cusInfo.contactList[0].contactName;
            this.cusConPhone=cusInfo.contactList[0].mobilePhone;
            this.facName=cusInfo.customerDepInfoList[0].storeDeptName;
            this.facVipName=cusInfo.customerDepInfoList[0].vipManagerName;
            this.facVipPhone=cusInfo.customerDepInfoList[0].vipPhone;
            this.facAddress=cusInfo.customerDepInfoList[0].depAddress;
          }
        });

		},
		},
		created() {
        var self = this;
        self.loadCustomer();
        },
	   watch:{
      '$route':'loadCustomer'
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
	body{
	    background: #f3f3f3;
	}
	ul li span{
	display:inline-flex;
	/*text-align:center;*/
	width:64%;
	}
.wrapper {
     padding: 0rem;
}
</style>
