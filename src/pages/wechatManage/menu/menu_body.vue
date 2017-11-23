<template>
   <div>
   <div class = "_menu_body">
    <table>
      <tr>
        <td colspan="2" align="left" style="width:20rem">{{menubody.wechatId}}-{{menubody.menuName}}</td>
        <td align="right"><mt-button type="primary" @click="editMenu">修改</mt-button></td>
      </tr>
      <tr>
        <td align="left" style="width:13rem">{{!menubody.menuCode?'无编码':menubody.menuCode}}</td>
        <td >{{!menubody.menuType?'无类别'
        :(menubody.menuType == 'view_inner'?'链接型-内部'
        :(menubody.menuType == 'view_outter'?'链接型-外部'
        :(menubody.menuType == 'click'?'事件型'
        :(menubody.menuType=='p'?'父菜单'
        :(menubody.menuType == 'inner'?'内部'
        :(menubody.menuType == 'outter'?'外部'
        :'无类别'))))))}}</td>
        <td align="right"><mt-button type="danger" @click="deleteMenu">删除</mt-button></td>
      </tr>
    </table>
   </div>
   <menu-detail :popupVisible = "popupVisible" :menubody = "menubody" v-on:closePopup = "closePopup"
   :currentMenuId="menubody.menuId" currentOp="修改菜单"></menu-detail>
   </div>
</template>
<script>
import menuDetail from './menu_detail.vue'
import {Toast ,MessageBox } from 'mint-ui'
import api from '../../../api/';
export default {
    data() {
    return {
      popupVisible:false,
    }
  },
   props:[
    "menubody"
    ],
  components:{
    menuDetail,
  },
   methods:{
    deleteMenu:function(){
        let that = this;
         MessageBox.confirm('确定要删除这个菜单吗?').then(action => {
               api.deleteWechatMenu(this.menubody).then((response) => {
                  if(response.data.head.errorCode === '0'){
                    Toast("删除成功")
                  }else{
                    Toast(response.data.head.errorMsg)
                  }
               let selectedTab = '';
               if(that.menubody.menuType == 'inner' 
                  || that.menubody.menuType == 'outter'){
                  selectedTab = 'local';
               }else{
                  selectedTab = 'remote';
               }
               that.$emit('fetchData',selectedTab);
              });
              
         });
    },
    editMenu:function(){
        this.popupVisible = true;
    },
    closePopup:function(){
      this.popupVisible = false;
    }
  
   }
}
</script>

<style>
._menu_body table{
  width:100%;
  text-align: center;
  height:5rem;
}
._menu_body .mint-button{
  height:70%;
  line-height:100%;
}
</style>