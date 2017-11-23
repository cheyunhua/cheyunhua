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
          <div class="col-xs-3 menu_show_name_val" ><span class="_menu_name_text">{{menubody.menuName}}</span></div>
        </div>
        <div class="row fx-white index-content">
          <div class="col-xs-3 menu_show_name">类型</div>
          <div class="col-xs-3 menu_show_name_val">
           <span class="_menu_name_text">{{ menubody.menuType }}
          </span>
          </div>
       </div>
        <div  class="row fx-white index-content">
          <div class="col-xs-3 menu_show_name">indexX</div>
          <div class="col-xs-3" style="width: 70%;margin-left: 0rem;">
             <input  style="font-size: 14px;" v-model="menubody.indexX"  
             placeholder="请输入x位置"/> 
          </div>
        </div>
        <div  class="row fx-white index-content">
          <div class="col-xs-3 menu_show_name">indexY</div>
          <div class="col-xs-3" style="width: 70%;margin-left: 0rem;">
             <input   style="font-size: 14px;" v-model="menubody.indexY"  placeholder="请输入y位置" />
             </div>
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
      menuTypeList:[{'value':'click','text':'远端-事件型'},{'value':'view','text':'远端-连接型'}
      ,{'value':'p','text':'远端-父菜单'},{'value':'inner','text':'本地-内部'},{'value':'outter','text':'本地-外部'}],
    }
  },
   props:[
    "menubody",
    "popupVisible",
    "currentOp",
    "wechatId"
    ],
   methods:{
  /*  getMenuType:function(){
      return (!this.menubody.menuType?'无类别'
          :(this.menubody.menuType == 'view_inner'?'链接型-内部'
          :(this.menubody.menuType == 'view_outter'?'链接型-外部'
          :(this.menubody.menuType == 'p'?'父菜单'
          :(this.menubody.menuType == 'click'?'事件型':'无类别')))));
    },*/
    addOrEditMenu:function(){  
          if(this.currentOp == '新增分配'){
            this.menubody.wechatId = this.wechatId;
           // debugger;
            api.distMenu(this.menubody).then((response) =>{
                if(response.data.head.errorCode === '0'){
                  Toast("分配成功");
                }else{
                  Toast('分配失败');
               }
               this.$emit('fetchData','noUse');
               this.$emit('closePopup');
          });
          }else{
             api.modifyAppMenu(this.menubody).then((response) =>{
                if(response.data.head.errorCode === '0'){
                  Toast("修改成功");
                }else{
                  Toast('修改失败');
               }
                this.$emit('fetchData','noUse');
                this.$emit('closePopup');
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
._menu_name_text{
  display:block;
  width:20rem;
}
</style>