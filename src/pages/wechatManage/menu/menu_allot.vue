<template>
<div>
    <div class="toptitle" ><span class="dot iconfont icon-jiantou" @click="goBack"></span>分派菜单
     <span style="position: absolute;right: 2rem;" @click="viewMenu"> 预览</span></div>
     <div class = "_wechat_app_list">
       <div class = "_wechat_info _wechat_app_select">
           <select v-model="currentWechatId">  
              <option v-for="wechatApp in wechatAppList" v-bind:value="wechatApp.wechatId">  
              {{ wechatApp.name }}  
            </option>  
        </select>  
       </div>
       <div class = "_wechat_info _wechat_all_allot_back pull-right">
       <mt-button  type="danger" @click = "resetMenu">重置</mt-button>
       </div>
     </div>
    <div class = "_menu_allot_plane">
        <mt-navbar v-model="selectedTab" >
          <mt-tab-item id="inUse">已分配</mt-tab-item>
          <mt-tab-item id="noUse">未分配</mt-tab-item>
        </mt-navbar>
         <div class="_menu_allot_search">
           <input v-model="currentMenuName" style="width:75%" placeholder="请输入名称或编码"/> <mt-button
       type="default" style="height:2rem" @click="fetchData(selectedTab)">搜索</mt-button>
        </div>
        <div class = "_menu_list_allot" v-for="menubody in menuList">
          <menu-body-allot :menubody = "menubody" 
          :popupVisible = "popupVisible" 
          :wechatId="currentWechatId"
          @closePopup="closePopup"
          @openPopup="openPopup"
          @fetchData="fetchData"></menu-body-allot>
        </div>
    </div>
</div>
</template>
<script>
import menuBodyAllot from './menu_body_allot.vue';
import {Toast ,MessageBox } from 'mint-ui'
import api from '../../../api/';
export default {
    data() {
        return {
            selectedTab:'inUse',
            popupVisible:false,
            currentWechatId:'',
            currentMenuName:'',
            menuList:[],
            menubody:{},
            wechatAppList:[],
        }
  },
  components:{
  menuBodyAllot
  },
   methods:{
      goBack:function() {
                window.history.go(-1);
      },
      fetchData:function(obj){
        if(obj == 'inUse'){
           this.getInUseMenuList();
        }else{
           this.getNoUseMenuList();
        }

      },
      viewMenu:function(){
       var wechatName = this.getwechatNameById(this.currentWechatId);
       console.log(wechatName);
       this.$router.push({path:'/menuPreView',query:{wechatId:this.currentWechatId,wechatName:wechatName}})
      },
      getwechatNameById(id){

        for(var i=0;i<this.wechatAppList.length;i++){
           if(this.wechatAppList[i].wechatId == id){
             return this.wechatAppList[i].name;
           }
        }
        return '未命名'
      },
      closePopup:function(){
       this.popupVisible =false;
      },
      openPopup:function(){
         this.popupVisible =true;
      },
       resetMenu:function(){
        let that = this;
          MessageBox.confirm('确定要重置该微信菜单吗?').then(action => {
            var param = {};
            param.wechatId = that.currentWechatId;
            api.resetWxAppMenu(param).then((response) =>{
                if(response.data.head.errorCode === '0'){
                  Toast('重置成功');
                  this.fetchData("inUse");
                }else{
                  Toast('重置失败');
               }

            });
          });
       },
       loadWechatAppList:function(){
          var param = {};
          param.pageSize = 100;
          api.pageQueryWechatApp(param).then((response) =>{
                if(response.data.head.errorCode === '0'){
                  this.wechatAppList = response.data.body.data;
                  this.currentWechatId = this.wechatAppList[0].wechatId;
                }else{
                  Toast('加载wechatApp信息失败');
               }
          });
       },
       getNoUseMenuList:function(){
         if(this.selectedTab != 'noUse'){
          return;
        }
             var param = {};
             param.pageSize = 100;
             param.menuType = "remote";
             param.menuName = this.currentMenuName;
             let that = this;
              api.pageWxMenus(param).then((response) => {
               if(response.data.head.errorCode === '0'){
                console.log(response.data.body)
                  that.menuList = response.data.body.data;
                  console.log(that.menuList.length);
               }
              });
       },
       getInUseMenuList:function(){
        if(this.selectedTab != 'inUse'){
          return;
        }
            var param = {};
            param.pageSize = 100;
            param.wechatId = this.currentWechatId;
            param.menuName = this.currentMenuName;
            let that = this;
            api.pageInUseWxMenus(param).then((response) => {
               if(response.data.head.errorCode === '0'){
                console.log(response.data.body)
                  that.menuList = response.data.body.data;
                  console.log(that.menuList.length);
               }
              });
       }
   },
   beforeRouteEnter (to, from, next) {
          next(vm => {
              vm.fetchData(vm.selectedTab);
          });
      },
  mounted() {
      this.loadWechatAppList();
      },
   watch:{
       selectedTab(val){
          this.fetchData(val);
       },
       currentWechatId(val){
          this.fetchData("inUse");
       }
      }
}
</script>

<style>
._wechat_info{
display:inline-block;
}
._wechat_app_list{
  height:4rem;
  padding:1rem 0.3rem 0.2rem 0.3rem;
}
._wechat_app_list .mint-button{
  height:2rem;
}
._menu_list_allot{
  width:100%;
  padding-left: 1rem;
  padding-right: 1rem;
  border-bottom:solid 0.1rem white;
}
._menu_allot_search{
   padding:2rem 2rem 2rem 2rem;
  border:solid 0.1rem white;
  border-radius: 0.1rem;
}
</style>