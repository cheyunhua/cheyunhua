<template>
<mt-popup
  v-model="popupVisible"
  :modal = "false"
  position="right" class="mint-popup-app">
 <div class="wrapper" style=" width:100%" >
     <div class="row fx-white index-content" >
          <div class="col-xs-12" style="text-align:center;">{{currentOp}} - {{stepValue}}</div>
     </div>
        <div class = "_app_config_1" v-if = "selectTab == 1">
         <div class="row fx-white index-content" >
          <div class="col-xs-4 menu_show_name" >微信号</div>
          <div class="col-xs-8 menu_show_name_val" ><input  style="font-size: 14px;" v-model="appbody.wechatId"  placeholder="请输入微信号" :disabled="currentOp == '修改'"/></div>
        </div>
        <div class="row fx-white index-content" >
          <div class="col-xs-4 menu_show_name" >名称</div>
          <div class="col-xs-8 menu_show_name_val" ><input  style="font-size: 14px;" v-model="appbody.name"  placeholder="请输入公众号名"/></div>
        </div>
        <div class="row fx-white index-content" >
          <div class="col-xs-4 menu_show_name" >微信编码</div>
          <div class="col-xs-8 menu_show_name_val" ><input  style="font-size: 14px;" v-model="appbody.wechatCode"  placeholder="请输入微信编码"/></div>
        </div>
        <div class="row fx-white index-content" >
          <div class="col-xs-4 menu_show_name" >区域编码</div>
          <div class="col-xs-8 menu_show_name_val" ><input  style="font-size: 14px;" v-model="appbody.provinceCode"  placeholder="请输入区域编码"/></div>
        </div>
          <div class="row fx-white index-content" >
          <div class="col-xs-4 menu_show_name">类型</div>
          <div class="col-xs-8 menu_show_name_val ">
          <select v-model="appbody.type">
              <option v-for="appType in appTypeList" v-bind:value="appType.value">
              {{ appType.text }}
              </option>
         </select>
         </div>
       </div>
       <div class="row fx-white index-content" v-if = "appbody.type == 2">
          <div class="col-xs-4 menu_show_name" >agentId</div>
          <div class="col-xs-8 menu_show_name_val" ><input  style="font-size: 14px;width:100%;" v-model="appbody.agentId"  placeholder="请输入企业号agentId"/></div>
        </div>
         <div class="row fx-white index-content" >
          <div class="col-xs-4 menu_show_name">验证码</div>
          <div class="col-xs-8 menu_show_name_val ">
          <select v-model="appbody.captchaCodeId">
              <option v-for="captchaCode in captchaCodeList" v-bind:value="captchaCode.value">
              {{ captchaCode.text }}
              </option>
         </select>
         </div>
       </div>
        </div>
        <div class = "_app_config_1" v-if = "selectTab == 2">
        <div class="row fx-white index-content" >
              <div class="col-xs-4 menu_show_name" >appId</div>
              <div class="col-xs-8 menu_show_name_val" ><input  style="font-size: 14px;" v-model="appbody.appId"  placeholder="请输入微信号appId"/></div>
        </div>
        <div class="row fx-white index-content" >
          <div class="col-xs-4 menu_show_name" >token</div>
          <div class="col-xs-8 menu_show_name_val" ><input  style="font-size: 14px;" v-model="appbody.token"  placeholder="请输入微信token"/></div>
        </div>
        <div class="row fx-white index-content" >
          <div class="col-xs-4 menu_show_name" >密钥</div>
          <div class="col-xs-8 menu_show_name_val" ><textarea  style="font-size: 14px;width:100%;height:6.5rem" v-model="appbody.secret"  placeholder="请输入微信secret"></textarea></div>
        </div>
         <div class="row fx-white index-content" >
             <div class="col-xs-4 menu_show_name" >域名</div>
             <div class="col-xs-8 menu_show_name_val" >
             <textarea  style="font-size: 14px;width:100%;height:6.5rem" v-model="appbody.wxDomain"
              placeholder="请输入微信domain"></textarea></div>
         </div>
       </div>
       <div class = "_app_config_0" v-if = "selectTab == 3">
        <div  class="row fx-white index-content">
          <div class="col-xs-4 menu_show_name">安全域名</div>
          <div class="col-xs-8" style="width: 66%;margin-left: 0rem;">
             <textarea  style="font-size: 14px; width:100%;height:6.5rem" v-model="appbody.currentDomain"
             placeholder="请输入微信安全域名">
               </textarea>
          </div>
        </div>
        <div  class="row fx-white index-content">
          <div class="col-xs-4 menu_show_name">登录地址</div>
          <div class="col-xs-8" style="width: 66%;margin-left: 0rem;">
             <textarea   style="font-size: 14px;width:100%;height:6.5rem" v-model="appbody.loginUrl"  placeholder="请输入登陆地址" ></textarea>
             </div>
          </div>
       <div class="row fx-white index-content" >
          <div class="col-xs-4 menu_show_name">应用状态</div>
          <div class="col-xs-8 menu_show_name_val ">
          <select v-model="appbody.isValid">
              <option v-for="isUse in isUseList" v-bind:value="isUse.value">
              {{ isUse.text }}
              </option>
         </select>
         </div>
       </div>
       <div  class="row fx-white index-content">
          <div class="col-xs-4 menu_show_name">备注</div>
          <div class="col-xs-8" style="width: 66%;margin-left: 0rem;">
             <textarea   style="font-size: 14px;width:100%;height:6.5rem" v-model="appbody.remark"  placeholder="请输入备注" ></textarea>
             </div>
          </div>
      </div>
      </div>
      <div style="text-align:center">
       <mt-button @click.native="closePopup"  style="margin-right:10px;"
       type="default">取消</mt-button>
       <mt-button  @click="changeSelectTab(-1)" v-if="selectTab > 0"
       style="margin-right:10px;" type="default">上一步
       </mt-button>
       <mt-button  @click="addOrEditApp" v-if="selectTab == 3"
       style="margin-right:10px;" type="primary">确认
       </mt-button>
       <mt-button  @click="changeSelectTab(1)" v-if="selectTab < 3"
       style="margin-right:10px;" type="primary">下一步
       </mt-button>
       </div>
</mt-popup>
</template>
<script>
import {Toast ,MessageBox } from 'mint-ui'
import api from '../../../api/';
export default {
    data() {
    return {
      appTypeList:[{'value':1,'text':'服务号'},{'value': 2,'text':'企业号'}],
      captchaCodeList:[{'value':'000001','text':'图片验证码'},{'value':'000002','text':'短信验证码'}],
      isUseList:[{'value':'Y','text':'启用'},{'value':'N','text':'禁用'}],
      selectTab:1,
      stepValue:'I',
    }
  },
   props:[
    "appbody",
    "popupVisible",
    "currentOp",
    ],
   methods:{
    addOrEditApp:function(){
        let param = this.appbody;
        param.domain = this.appbody.wxDomain;  // 将wxDomian映射回wxWechapAppConfig domian字段
        if(this.currentOp === '新增'){
            api.insertWechatApp(param).then((response) => {
                if(response.data.head.errorCode === '0'){
                    Toast("新增成功！");
                    this.$emit('fetchData');
                }else{
                    Toast(`${response.data.head.errorMsg}`);
                }
            });
        }else if(this.currentOp === '修改'){
            api.updateWechatAppConfig(param).then((response) =>{
                if(response.data.head.errorCode === '0'){
                    Toast("更新完成！");
                }else{
                    Toast("更新失败，请重新或者稍后重试！");
                 }
         });
        }
        this.selectTab = 1;
        this.$emit('closePopup')
    },
    closePopup:function(){
      this.selectTab = 1;
      this.$emit('closePopup')
    },
     changeSelectTab:function(ob){
      this.selectTab =  this.selectTab + ob;
     }
   },
   watch:{
    selectTab(val){
      if(val == 1){
        this.stepValue ='I';
      }else if(val == 2){
        this.stepValue ='II';
      }else{
        this.stepValue ='III';
      }
    }
   }
}
</script>

<style>
.mint-popup-app {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 0px;
    font-size: 0.1rem;
    margin:0;
    font-family: 微软雅黑;
    margin: 0px;
    padding-top: 0rem;
}
.mint-popup-app textarea{
    padding:0.1rem 0.1rem 0.1rem 0.1rem;
}
.mint-popup-app input{
  width:100%;
}
</style>
