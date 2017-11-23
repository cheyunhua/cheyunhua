<template>
  <div>
  <mt-header  title = "微信菜单">
  <mt-button  v-if = "status != 0" slot = "left" @click = "goBack">&lt返回</mt-button>
  <mt-button  slot = "right" v-if = "status != 2" @click = "doNext">{{currentStatus()}}&gt</mt-button>
  </mt-header>
  <div class = "menu_app_select">
  <select v-model="currentWechatId">  
   <option v-for="wechatApp in wechatAppList" v-bind:value="wechatApp.wechatId">  
              {{ wechatApp.appId }}  
   </option>  
</select>  
</div>
<mt-popup
  v-model="popupVisible"
  :modal = "false"
  position="right" class="mint-popup-11">
 <div class="wrapper" style=" width:100%" >
        <div class="row fx-white index-content" >
          <div class="col-xs-3 menu_show_name" >名称</div>
          <div class="col-xs-3 menu_show_name_val" ><input  style="font-size: 14px;" v-model="currentMenu.name"  placeholder="请输入菜单名"/></div>
        </div>
        <div class="row fx-white index-content" >
          <div class="col-xs-3 menu_show_name">类型</div>
          <div class="col-xs-3 menu_show_name_val ">
          <select v-model="currentMenu.type">  
              <option v-for="menuType in menuTypeList" v-bind:value="menuType.value">  
              {{ menuType.text }}  
              </option>  
        </select>  
         </div>
       </div>
        <div v-if = "currentMenu && currentMenu.type == 'view'"  class="row fx-white index-content">
          <div class="col-xs-3 menu_show_name">链接</div>
          <div class="col-xs-3" style="width: 70%;margin-left: 0rem;">
             <textarea  style="font-size: 14px; width:100%" v-model="currentMenu.url"  
             placeholder="请输入链接"> 
               </textarea>
          </div>
        </div>
        <div  v-if = "currentMenu && currentMenu.type == 'click'" class="row fx-white index-content" s>
          <div class="col-xs-3 menu_show_name" >key</div>
          <div class="col-xs-3 menu_show_name_val">
          <input    style="font-size: 14px;" v-model="currentMenu.key"  placeholder="请输入key值" /></div>
        </div>
      </div>
      <div style="text-align:center">
       <mt-button v-if = "currentMenuStatus.opSel == 0" @click="addParentMenu()" 
       style="margin-right:10px;" type="primary">确认
       </mt-button>
       <mt-button v-if = "currentMenuStatus.opSel == 1" @click="addChildMenu()" 
       style="margin-right:10px;"  type="primary">确认
       </mt-button>
       <mt-button @click.native="closePopup()"  style="margin-right:10px;"  
       type="default">关闭</mt-button>
       <mt-button v-if = "addOrModify == 1" @click="deleteMenu()" 
       type="danger">删除</mt-button>
       </div>
</mt-popup>
<div v-if = "status == 0">
  <ul style="width:100%">
  <li v-for = "(menu,index_i) in menuList" class = "menu_parent_panel_li">
    <span class = "menu_parent_panel_li_span" @click = "editMenu(index_i,0,0,menu)" > 
    {{menu.name}}--{{menu.type == 'view' ?
     '链接' : (menu.type == 'click' ? '事件' : '父菜单')}}</span>
    <ul v-if = "menu.sub_button">
      <li v-for = "(menu_sub,index_j) in menu.sub_button" class = "menu_child_panel_li" >
        <span class = "menu_child_panel_li_span" @click = "editMenu(index_i,index_j,1,menu_sub)"> 
        {{menu_sub.name}}--{{menu_sub.type == 'view' 
        ? '链接' : (menu_sub.type == 'click' ? '事件' : '父菜单')}}</span>
      </li>
      <li v-if = "(!menu.type  || menu.type == '') && menu.sub_button && menu.sub_button.length < 5">
         <span class = "menu_child_add_li_span"  
         @click = "editMenu(index_i,menu.sub_button.length,1)">添加子菜单</span>
      </li>
    </ul>
  </li>
   <li v-if = "menuList && menuList.length < 3" >
         <span class = "menu_parent_add_li_span" 
         @click = "editMenu(menuList.length,0,0)" >添加父菜单</span>
      </li>
</ul>

</div>

<div v-if = "status == 1" class = " menu_pre_panel_footer">
  <menu-view v-if = "currentMenuInfo.menuChild_first"
  :menuList.sync = "currentMenuInfo.menuChild_first" 
  :currentWidth.sync = "currentWidth"></menu-view>
  <menu-view v-if = "currentMenuInfo.menuChild_second"
  :menuList.sync = "currentMenuInfo.menuChild_second" 
  :currentWidth.sync = "currentWidth"></menu-view>
  <menu-view v-if = "currentMenuInfo.menuChild_third"
  :menuList.sync = "currentMenuInfo.menuChild_third" 
  :currentWidth.sync = "currentWidth"></menu-view>
</div>
  </div>
</template>

<script>
import menuView from './menu_view.vue'
import {Toast ,MessageBox } from 'mint-ui'
import api from '../../api/';
export default {
    data () {
    return {
      currentWechatId:'1',//当前所选公众号
      currentMenuInfo:{
         menuChild_first:{},
         menuChild_second:{},
         menuChild_third:{},
      },
      currentMenu:{
        name:'',
        type:'',
        url:'',
        key:'',
        sub_button:[],
      },
      menuTypeList:[{'value':'click','text':'事件型'},{'value':'view','text':'连接型'},{'value':'','text':'父菜单'}],
      popupVisible:false,
      currentWidth:"32%",
      currentOp:0,
      currentMenuStatus:{
         parent:0,
         child:0,
         opSel:0,//0父，1子
      },
      addOrModify:0,//0新增 1 修改
      status:'0',
      menuList:'',
      wechatAppList:[{'wechatCode':'WECHAT_CUS'}],
    }
  },
  components:{
    menuView
  },
   methods:{
    currentStatus(){
      if(this.status == 1){
        return '发布';
      }
      else{
        return '预览';
      }
    },
    //下一步
    doNext(){
      this.status ++;
      this.status == 1 ? this.preView() : this.pushMenu();
    },
    //上一步
    goBack(){
      this.status --;
    },
    //预览
    preView(){
      Toast("预览");
      console.log("预览");
      this.initCurrentMenuInfo();
    },
    //发布
    pushMenu(){
       Toast("发布");
       console.log("发布");
       MessageBox.confirm('确定要发布菜单吗?').then(action => {
        var param = {};
        param.wechatId = this.currentWechatId;
        param.button = this.menuList;
        api.createPushMenue(param).then((response) => {
          if(response.data.head.errorCode == '0'){
            Toast("发布成功");
          }else{
            Toast(response.data.head.errorMsg);
          }
        });
         });
    },
    loadCurrentWechatInfo(val){
      this.initMenuList();
      console.log(this.currentMenuInfo);
      if(this.currentMenuInfo.menuChild_first){
         this.currentWidth = "100%";
      }
      if(this.currentMenuInfo.menuChild_second){
          this.currentWidth = "49%";
      }
      if(this.currentMenuInfo.menuChild_third){
          this.currentWidth = "32.33%";
      }
      
    },
    transaleValue(obj){
      var param = {};
      if(obj){
      param.name = obj.name;
      param.url = obj.url;
      param.key = obj.key;
      param.sub_button = obj.sub_button;
      return param;
    }else{
      return undefined;
    }
    },
     addParentMenu(){
      console.log("添加父菜单");
      var param ={};
      this.menuList[this.currentMenuStatus.parent]={};
      param.name=this.currentMenu.name; 

      if(this.currentMenu.type != ''){
      param.type=this.currentMenu.type;
      }
      if(this.currentMenu.type == 'view'){
        param.url=this.currentMenu.url; 
      }else if(this.currentMenu.type == 'click'){
        param.key=this.currentMenu.key;  
      }else{
        param.sub_button=this.currentMenu.sub_button; 
      }
      this.menuList[this.currentMenuStatus.parent] = param;
      this.popupVisible = false;
      this.initCurrentMenu();
    },
      addChildMenu(){
      console.log("添加字菜单");
      var param ={};
      this.menuList[this.currentMenuStatus.parent].sub_button[this.currentMenuStatus.child] = {};
      param.name=this.currentMenu.name; 
      if(this.currentMenu.type != ''){
      param.type=this.currentMenu.type;
      }
      if(this.currentMenu.type == 'view'){
        param.url=this.currentMenu.url; 
      }else if(this.currentMenu.type == 'click'){
        param.key=this.currentMenu.key;  
      }else{
        param.sub_button=this.currentMenu.sub_button; 
       }
      this.menuList[this.currentMenuStatus.parent].sub_button[this.currentMenuStatus.child] = param;
      this.popupVisible = false;
      this.initCurrentMenu();
    },
    editMenu(parent,child,val,obj){
     this.popupVisible = true; 
     this.currentMenuStatus.parent = parent;
     this.currentMenuStatus.child = child;
     this.currentMenuStatus.opSel = val;
     if(obj){
       this.currentMenu.name = obj.name;
       this.currentMenu.type = !obj.type?'':obj.type;
       this.currentMenu.url = obj.url;
       this.currentMenu.key = obj.key;
       this.currentMenu.sub_button = obj.sub_button;
       this.addOrModify = 1;
     }else{
       this.addOrModify = 0;
     }
    },
    initCurrentMenuInfo(){
          if(this.menuList.length == 1){
               this.currentWidth = "100%";
          }else if(this.menuList.length == 2){
               this.currentWidth = "49%";
          }else{
               this.currentWidth = "32.33%";
          }
          this.currentMenuInfo.menuChild_first = this.transaleValue(this.menuList[0]);
          this.currentMenuInfo.menuChild_second = this.transaleValue(this.menuList[1]);
          this.currentMenuInfo.menuChild_third = this.transaleValue(this.menuList[2]);
    },
    initCurrentMenu(){
      this.currentMenu.name = ''; 
      this.currentMenu.type = ''; 
      this.currentMenu.url = ''; 
      this.currentMenu.key = ''; 
      this.currentMenu.sub_button = []; 
    },
    deleteMenu(){
      MessageBox.confirm('确定要删除这个菜单吗?').then(action => {
          if(this.currentMenuStatus.opSel == 0){
             this.menuList.splice(this.currentMenuStatus.parent,1);
          }else{
            this.menuList[this.currentMenuStatus.parent].sub_button.splice(this.currentMenuStatus.child,1);
          }
         this.popupVisible = false;
         this.initCurrentMenu();
   });
    
    },
    closePopup(){
       this.popupVisible = false;
       this.initCurrentMenu();
    },
    initWechatAppList(){
      api.getWechatAppList({}).then((response) => {
        console.log(response);
        if(response.data.head.errorCode == '0'){
          this.wechatAppList = response.data.body;
          this.currentWechatId = this.wechatAppList[0].wechatId;
          this.initMenuList();
        }else{
          Toast(response.data.head.errorMsg);
        }
        

      });
    },
    initMenuList(){
      api.getWechatMenuByWechatId({wechatId:this.currentWechatId})
      .then((response) => {
         if(response.data.head.errorCode == '0'){
          this.menuList = response.data.body.button;
          this.initCurrentMenuInfo();
         }else{
           Toast(response.data.head.errorMsg);
         }

      }) 

    }
   },
   mounted(){
     this.initWechatAppList();
   },
   watch:{
    currentWechatId(val){
      console.log("当前为chatId="+val);
      this.loadCurrentWechatInfo(val);
    },
   
   }
 }

</script>

<style>
.menu_pre_panel_footer{
  width:100%; 
  position: fixed; 
  bottom: 0px; 
}
.sub_menu_list_div{
   display: inline-block;
}
.menu_app_select{
  margin: 2rem 0rem 2rem 0rem;
  padding-left:3rem;
}

/* 体*/
.menu_parent_panel_li_span{
  display:block;
  line-height: 3rem;
  width:100%;
  height:3rem;
  background-color:rgb(247, 112, 70);
  padding-left: 1rem;
  color: #fff;
}
.menu_child_panel_li{
 
  width:100%;
}
.menu_child_panel_li_span{
   line-height: 2rem;
   display:block;
   height:2rem;
   background-color: white;
   padding-left: 2.4rem;
}
.menu_child_add_li_span{
   display:block;
   border: 1px dashed yellow;
   height:2rem;
   line-height: 2rem;
   padding-left: 2.4rem;
}
.menu_parent_add_li_span{
   display:block;
   border: 1px dashed black;
   height:3rem;
   line-height: 3rem;
   padding-left: 1rem;
}
.mint-popup-11 {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 0px;
    margin:0;
    font-family: 微软雅黑;
    margin: 0px;
    padding-top: 8rem;
}
.menu_show_name{
  line-height: 38px;
  background: #f17712;
  color: white;
   text-align:center;
}
.menu_show_name_val{
  line-height: 38px;
  width:100%;
  margin-left: 0rem;
}
</style>
