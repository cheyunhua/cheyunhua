<template>
<div>
    <div class="toptitle" ><span class="dot iconfont" @click="distMenu">分配菜单</span>菜单管理
     <span style="position: absolute;right: 2rem;" @click="addMenu"> 新增菜单</span></div>
    <div class = "_menu_manager_plane">
        <mt-navbar v-model="selectedTab" >
          <mt-tab-item id="local">本地菜单</mt-tab-item>
          <mt-tab-item id="remote">远端菜单</mt-tab-item>
        </mt-navbar>
        <div class="_menu_search">
          <input v-model="currentMenuName" style="width:75%" placeholder="请输入名称或编码"/> <mt-button
       type="default" style="height:2rem" @click="fetchData(selectedTab)">搜索</mt-button>
        </div>
        <div class = "_menu_list" v-for="menubody in menuList">
          <menu-body :menubody = "menubody" v-on:fetchData="fetchData"></menu-body>
        </div>
    </div>
     <menu-detail :popupVisible = "popupVisible" :menubody = "currentMenu" v-on:closePopup = "closePopup" currentMenuId="" currentOp="新增菜单"></menu-detail>
</div>
</template>
<script>
import menuBody from './menu_body.vue';
import menuDetail from './menu_detail.vue';
import {Toast} from 'mint-ui';
import api from '../../../api/';
export default {
    data() {
        return {
            selectedTab:'local',
            popupVisible:false,
            menuList:[],
            currentMenu:{
              menuType:'p'
            },
            currentMenuName:''
        }
  },
  components:{
    menuBody,
    menuDetail
  },
   methods:{
      goBack:function() {
                window.history.go(-1);
            },
      distMenu:function(){
            this.$router.push({path:'/menuAllot'});
            },
      fetchData:function(obj){
            var param = {};
             param.pageSize = 100;
             param.menuType = obj;
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
      addMenu:function(){
       this.currentMenu.menuName = '';
       this.currentMenu.menuUrl = '';
       this.currentMenu.menuKey = '';
       this.currentMenu.menuCode = '';
       this.popupVisible = true;
      },
       closePopup:function(obj){
        if(obj){
           this.fetchData(this.selectedTab);
        }
       this.popupVisible = false;
    }
   },
   beforeRouteEnter (to, from, next) {
          next(vm => {
              vm.fetchData(vm.selectedTab);
          });
      },
  mounted() {
          
      },
   watch:{
       selectedTab(val){
          this.fetchData(val); 
       },
      }
}
</script>

<style>
._menu_list{
  width:100%;
  padding-left: 1rem;
  padding-right: 1rem;
  border-bottom:solid 0.1rem white;
}
._menu_search{
  padding:2rem 2rem 2rem 2rem;
  border:solid 0.1rem white;
  border-radius: 0.1rem;
}
._menu_search input{
  height:2rem;
}
</style>