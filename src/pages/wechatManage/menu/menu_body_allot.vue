<template>
   <div>
   <div class = "_menu_body_allot">
    <table>
      <tr>
        <td colspan="2" align="left" style="width:20rem">{{menubody.wechatId}}-{{menubody.menuName}}</td>
        <td align="right"><mt-button v-if = "menubody.indexX != undefined" type="primary" @click="editOrAllotMenu(1)">修改</mt-button>
        <mt-button v-if = "menubody.indexX  == undefined" type="primary" @click="editOrAllotMenu(2)">分配</mt-button></td>
      </tr>
      <tr>
        <td align="left"v-if="menubody.indexX != undefined">{{menubody.indexX}}-{{menubody.indexY}}</td>
        <td align="left"v-if="menubody.indexX == undefined">&nbsp;</td>
        <td >{{!menubody.menuType?'无类别'
        :(menubody.menuType == 'view_inner'?'链接型'
        :(menubody.menuType == 'view_outter'?'链接型'
        :(menubody.menuType == 'click'?'事件型'
        :(menubody.menuType=='p'?'父菜单'
        :(menubody.menuType == 'inner'?'内部'
        :(menubody.menuType == 'outter'?'外部'
        :'无类别'))))))}}</td>
        <td align="right"><mt-button v-if = "menubody.indexX != undefined" type="danger" @click="backAllotMenu">回收</mt-button></td>
      </tr>
    </table>
   </div>
   <menu-detail-allot :popupVisible = "popupVisible" :menubody = "menubody" @closePopup="closePopup"
   @fetchData="fetchData" :currentOp="currentOp" :wechatId="wechatId"></menu-detail-allot> 
   </div>
</template>
<script>
import menuDetailAllot from './menu_detail_allot.vue';
import {Toast ,MessageBox } from 'mint-ui'
import api from '../../../api/';
export default {
    data() {
    return {
      "currentOp":'新增分配',
      "popupVisible":false
    }
  },
   props:[
    "menubody",
    "wechatId"
    ],
  components:{
   menuDetailAllot
  },
   methods:{
    backAllotMenu:function(){
         MessageBox.confirm('确定要回收这个菜单吗?').then(action => {
           this.menubody.wechatId = this.wechatId;
            api.removeAppMenu(this.menubody).then((response) =>{
                if(response.data.head.errorCode === '0'){
                  Toast("回收成功");

                }else{
                  Toast('回收失败');
               }
               this.$emit('fetchData','inUse');
          });
         
    });
    },
    fetchData:function(obj){
         this.$emit('fetchData','obj');
    },
    editOrAllotMenu:function(val){
      if(val == 1){
        this.currentOp = '修改分配'
      }else{
         this.currentOp = '新增分配'
      }
      this.popupVisible = true;

    },
    closePopup:function(){
      this.popupVisible =false;
    }
  
   }
}
</script>

<style>
._menu_body_allot table{
  width:100%;
  text-align: center;
  height:5rem;
}
._menu_body_allot .mint-button{
   height:70%;
   line-height:100%;
}
._menu_body_allot td {

}
</style>