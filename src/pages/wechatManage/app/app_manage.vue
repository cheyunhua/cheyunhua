<template>
<div>
    <div class="toptitle" ><span class="dot iconfont icon-jiantou" @click="goBack"></span>公众号管理
    <span style="position: absolute;right: 2rem;" @click="menuManage">菜单管理&gt</span></div>
     <div class="_app_search">
      <mt-button class="pull-right"  @click="addAppConfig"
       style="height:2rem;" type="primary" >新增公众号
       </mt-button>
           <input v-model="currentAppName" style="width:75%" placeholder="请输入名称或编码"/> <mt-button
       type="default" style="height:2rem" @click="fetchData">搜索</mt-button>
      
        </div>
   <!--  <div class = "_app_head_add pull-right">
      <mt-button  @click="addAppConfig"
      style="margin-right:10px;" type="primary">新增公众号
      </mt-button>
      </div> -->

     <div class = "_app_list" v-for="appBody in appList">
          <app-body :appbody = "appBody"  @fetchData="fetchData"></app-body>
     </div>
     <app-detail :popupVisible = "popupVisible" :appbody = "currentApp" v-on:closePopup = "closePopup" @fetchData="fetchData" currentOp="新增"></app-detail>
</div>
</template>
<script>
import appBody from './app_body.vue'
import appDetail from './app_detail.vue'
import api from '../../../api/'
import {Toast ,MessageBox } from 'mint-ui'
export default {
    data() {
        return {
          popupVisible:false,
          appList:[],
          currentAppName:'',
          currentApp:{
            captchaCodeId:'000001',
            type:'1',
            demain:'app',
            isValid:'Y'
          },
        }
  },
  components:{
    appBody,
    appDetail,
  },
   methods:{
      goBack:function() {
                window.history.go(-1);
            },
      fetchData:function(obj){
          let pageIndex = '1';
          let pageSize = '100';
          var param = {};
          param.pageIndex = pageIndex;
          param.pageSize = pageSize;
          param.name = this.currentAppName;
          api.pageQueryWechatApp(param).then((response) =>{
                if(response.data.head.errorCode === '0'){
                  this.appList = response.data.body.data;
                  return;
              }else{
                  Toast('分页查询微信号配置信息失败！');
              }
          });
         //this.appList = this.testParam.appList;
      },
      addAppConfig:function(){
        this.popupVisible = true;
      },
      closePopup:function(){

        this.popupVisible = false;
      },
      menuManage:function(){
       this.$router.push('menuManage');
      }
   },
   beforeRouteEnter (to, from, next) {
          next(vm => {
              vm.fetchData();
          });
      },
  mounted() {

      },
   watch:{

      }
}
</script>

<style>
._app_list{
  width:100%;
  padding-left: 1rem;
  padding-right: 1rem;
  border-bottom:solid 0.1rem white;
}
._app_search{
   padding:2rem 2rem 2rem 2rem;
  border:solid 0.1rem white;
  border-radius: 0.1rem;
}
</style>
