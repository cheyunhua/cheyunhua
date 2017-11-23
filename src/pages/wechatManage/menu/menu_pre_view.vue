<template>
<div>
    <div class="toptitle" ><span class="dot iconfont icon-jiantou" @click="goBack"></span>{{currentWechatName}}
    <span style="position: absolute;right: 2rem;" @click="pushMenu"> 发布</span></div>
    <div class = "_menu_center_plane"></div>
    <div class="_menu_pre_view_bottom">
      <div class = "_menu_parent"
       :style ="{width: currentMenuList.length == 1 ? '100%':
       (currentMenuList.length == 2 ? '50%':
       (currentMenuList.length == 3 ? '33.33%':'0%'))}"
       v-for="(menubody,index) in currentMenuList">
      <li class = "_menu_children_li" v-for="menuChildren in menubody.sub_button">
        {{menuChildren.name}}
      </li>
      <li　class = "_menu_parent_li" @click="showChildrem(index)" ref="_this_menu"> {{menubody.name}}</li>
      </div>

    </div>
</div>
</template>
<script>
import api from '../../../api/';
import {Toast} from 'mint-ui'
export default {
    data() {
     return {
     currentWechatName:'金财互联广东',
     currentWechatId:'',
     currentMenuList:[],
    }
  },
   methods:{
      goBack:function() {
            window.history.go(-1);
            },
      pushMenu:function(){
          this.publishToWeChat();
      },
      fetchData:function(){
       this.currentWechatName = this.$route.query.wechatName;
       this.currentWechatId = this.$route.query.wechatId;
       var param = {};
      // param.pageSize = 100;
       param.wechatId = this.currentWechatId;
       let that = this;
       api.preViewMenuList(param).then((response) =>{
            if(response.data.head.errorCode === '0'){
                  that.initDate(response.data.body);
                }else{
                  Toast('分配失败');
               }
       });
      
      },
      initDate(listObj){
       var currentMenu = {};
       let that = this;
       this.currentMenuList = [];

         listObj.forEach(function(obj){
         console.log(obj);
         if(obj.indexY == 0){
           var tempParam = {};
           tempParam.name = obj.name;
           if(obj.type == 'p'){
              tempParam.sub_button =[];
           }else if(obj.type == 'view_outter' || obj.type == 'view_inner'){
            if(obj.url.indexOf("http://mp.weixin.qq.com") == 0 
                 || obj.url.indexOf("https://mp.weixin.qq.com") == 0){
                tempParam.url = obj.url
              }else{
                tempParam.url = obj.url + (obj.urlParam.replace(/ /g,''));
              }
              tempParam.type = 'view';
           }else if(obj.type == 'click'){
              tempParam.key = obj.key;
              tempParam.type = obj.type;
           }else{
            console.log("type类型不存在")
           }
           that.currentMenuList.push(tempParam);
         }else{
            var tempParam = {};
             tempParam.name = obj.name;
             if(obj.type == 'p'){
                console.log("子菜单type不支持父菜单类型");
             }else if(obj.type == 'view_outter' || obj.type == 'view_inner'){
              if(obj.url.indexOf("http://mp.weixin.qq.com") == 0 
                 || obj.url.indexOf("https://mp.weixin.qq.com") == 0){
                tempParam.url = obj.url;
              }else{
                tempParam.url = obj.url + (obj.urlParam.replace(/ /g,''));
              }
                tempParam.type = 'view';
             }else if(obj.type == 'click'){
                tempParam.key = obj.key;
                tempParam.type = obj.type;
             }else{
                console.log("type类型不存在")
             }
             that.currentMenuList[obj.indexX].sub_button.splice(0,0,tempParam);
         }

       });
         $("._menu_center_plane").unbind();
         $("._menu_center_plane").bind('click',function(){
            $("._menu_children_li").hide();
         });
      },
      showChildrem:function(index){
         this.$refs._this_menu.forEach(function(obj,i){
               if(i==index){
                 $(obj).siblings('li').toggle();
               }else{
                 $(obj).siblings('li').hide();
               }
         });    
      },
      publishToWeChat(){
        var param = {};
        param.wechatId = this.currentWechatId;
        param.button = this.currentMenuList;
        api.publishToWeChat(param).then((response)=>{
           if(response.data.head.errorCode === '0'){
                  Toast("发布成功")
                }else{
                  Toast(response.data.head.errorMsg);
               }
        });
      }
   },
      beforeRouteEnter (to, from, next) {
          next(vm => {
              vm.fetchData();
          });
      },
}
</script>

<style>
._menu_pre_view_bottom{
  /*height:20rem;*/
  width:100%;
  background-color: #fff;
  position: fixed;
  bottom: 0px;
}
._menu_parent{
  display:inline-block;
}
._menu_parent li{
  height:4rem;
  line-height: 4rem;
  text-align: center;
  border:2px solid #f1f1f1;
  font-size:2rem;
}
._menu_children_li{
  display:none;
}

@media screen and (max-height:600px){
._menu_center_plane{
  height:43rem;
  width:100%;
  background-color: #fff;
}
}
@media screen and (min-height:630px){
._menu_center_plane{
  height:48rem;
  width:100%;
  background-color: #fff;
}
}
</style>