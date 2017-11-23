<template>
<mt-popup
  v-model="popupVisible"
  :modal = "false"
  position="right" class="mint-popup-menu">
 <div class="wrapper" style=" width:100%" >
     <div class="row fx-white index-content" >
          <div class="col-xs-12" style="text-align:center;">{{currentOp}}</div>
     </div>
        <div class="row fx-white index-content" >
          <div class="col-xs-3 menu_show_name" >名称</div>
          <div class="col-xs-3 menu_show_name_val" ><input  style="font-size: 14px;" v-model="menubody.menuName"  placeholder="请输入菜单名"/></div>
        </div>
        <div class="row fx-white index-content" >
          <div class="col-xs-3 menu_show_name">类型</div>
          <div class="col-xs-3 menu_show_name_val ">
          <select v-model="menubody.menuType">  
              <option v-for="menuType in menuTypeList" v-bind:value="menuType.value">  
              {{ menuType.text }}  
              </option>  
        </select>  
         </div>
       </div>
        <div v-if = "menubody && (menubody.menuType != 'p' && menubody.menuType !='click') "  class="row fx-white index-content">
          <div class="col-xs-3 menu_show_name">链接</div>
          <div class="col-xs-3" style="width: 70%;margin-left: 0rem;">
             <textarea  style="font-size: 14px; width:100%" v-model="menubody.menuUrl"  
             placeholder="请输入链接"> 
               </textarea>
          </div>
        </div>
        <div v-if = "menubody && (menubody.menuType == 'inner'||menubody.menuType == 'outter')"  
        class="row fx-white index-content">
          <div class="col-xs-3 menu_show_name">编码</div>
          <div class="col-xs-3" style="width: 70%;margin-left: 0rem;">
             <input   style="font-size: 14px;" v-model="menubody.menuCode"  placeholder="请输入菜单代码" /></div>
          </div>
        <div  v-if = "menubody && menubody.menuType == 'click'" class="row fx-white index-content">
          <div class="col-xs-3 menu_show_name" >key</div>
          <div class="col-xs-3" style="width: 70%;margin-left: 0rem;">
          <input    style="font-size: 14px;" v-model="menubody.menuKey"  placeholder="请输入key值" /></div>
        </div>
         <div class="row fx-white index-content" >
          <div class="col-xs-3 menu_show_name" >名称</div>
          <div class="col-xs-3 menu_show_name_val" ><input  style="font-size: 14px;" v-model="menubody.wechatId"  placeholder="请输入关键字"/></div>
        </div>
      </div>
      <div style="text-align:center">
       <mt-button  @click="addOrEditMenu" 
       style="margin-right:10px;" type="primary">确认
       </mt-button>
       <mt-button @click.native="closePopup"  style="margin-right:10px;"  
       type="default">关闭</mt-button>
      
       </div>
</mt-popup>
</template>
<script>
import {Toast ,MessageBox } from 'mint-ui'
import api from '../../../api/';
export default {
    data() {
    return {
       menuTypeList:[{'value':'click','text':'远端-事件型'}
       ,{'value':'view_inner','text':'远端-连接型-内部'}
       ,{'value':'view_outter','text':'远端-连接型-外部'}
       ,{'value':'p','text':'远端-父菜单'}
       ,{'value':'inner','text':'本地-内部'}
       ,{'value':'outter','text':'本地-外部'}
      ],

    }
  },
   props:[
    "menubody",
    "popupVisible",
    "currentMenuId",
    "currentOp",
    ],
   methods:{
    addOrEditMenu:function(){
            if(this.currentMenuId ==''||!this.currentMenuId){
              api.insertWechatMenu(this.menubody).then((response) => {
               if(response.data.head.errorCode === '0'){
                  Toast("新增完成")
               }else{
                  Toast(response.data.head.errorMsg)
               }
                this.$emit('closePopup',1)
              });
            }else{
               api.updateWechatMenu(this.menubody).then((response) => {
               if(response.data.head.errorCode === '0'){
                  Toast("修改完成")
               }else{
                  Toast(response.data.head.errorMsg)
               }
                this.$emit('closePopup',1)
              });
            }
      
    },
    closePopup:function(){
      this.$emit('closePopup')
    }
  
   }
}
</script>

<style>
.mint-popup-menu {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 0px;
    margin:0;
    font-family: 微软雅黑;
    margin: 0px;
    padding-top: 6rem;
}

.menu_show_name{
  line-height: 38px;
  background: #f17712;
  color: white;
  font-size: 1.0rem;
   text-align:center;
}
.menu_show_name_val{
  line-height: 38px;
  width:100%;
  margin-left: 0rem;
}
</style>