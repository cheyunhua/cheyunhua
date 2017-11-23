<template>
   <div>
   <div class = "_app_body">
    <table>
      <tr>
        <td colspan="2" align="left" style="width:20rem">{{appbody.name}}</td>
        <td align="right"><mt-button type="primary" @click="editApp">修改</mt-button></td>
      </tr>
      <tr>
        <td align="left" class="wechat-wechatCode" style="width:15rem">{{appbody.wechatCode}}</td>
        <td class="wechat-type">{{!appbody.type?'未知类型':(appbody.type == 1?
        '服务号':(appbody.type == 2 ?'企业号':'错误类型'))}}</td>
        <td align="right"><mt-button type="danger" @click="deleteApp">删除</mt-button></td>
      </tr>
    </table>
   </div>
   <app-detail :popupVisible = "popupVisible" :appbody = "appbody" v-on:closePopup = "closePopup"
   currentOp="修改"></app-detail>
   </div>
</template>
<script>
import appDetail from './app_detail.vue'
import {Toast ,MessageBox } from 'mint-ui'
import api from '../../../api/';
export default {
    data() {
      return {
        popupVisible:false,
      }
  },
   props:[
    "appbody"
    ],
  components:{
     appDetail
  },
   methods:{
    deleteApp:function(){
         MessageBox.confirm('确定要删除这个公众号吗?').then(action => {
         let param = this.appbody;
         api.deleteWechatAppByPrimaryKey(param).then((response) =>{
             if(response.data.head.errorCode === '0'){
                Toast('删除成功！');
                this.$emit('fetchData');
            }else{
                Toase(`删除失败，失败原因:${response.data.head.errorMsg}`);
            }
         });
    });
    },
    editApp:function(){
        this.popupVisible = true;
    },
    closePopup:function(){
      console.log("进来了")
      this.popupVisible = false;
    }

   }
}
</script>

<style>
._app_body table{
  width:100%;
  text-align: center;
  height:5rem;
}

._app_body .mint-button{
  height:70%;
  line-height:100%;
}
</style>
