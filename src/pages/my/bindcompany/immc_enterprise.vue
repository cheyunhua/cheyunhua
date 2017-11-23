<template>
  <div class="_bottom">
    <span >绑定不成功？请联系<span class="_bottom_content" v-on:click="startManService()">人工客服</span>解决。</span>
  </div>
</template>
<script type="es6">
  import api from '../../../api/';
  import { Toast,Indicator,MessageBox  } from 'mint-ui';

  export default{
    name: 'immcEnterprise',
    data(){
      return{
           param:{
              appCode:'',
              wechatCode:'',
        }

      }
    },
    methods:{
    startManService(){
             Indicator.open({
                     text: '请求中....',
                     spinnerType: 'snake'
                   });
        this.param.appCode = localStorage.getItem("wx.user.code");
        this.param.wechatCode = localStorage.getItem("wx.user.wechat.code");
       api.startArtificiallyService(this.param)
                            .then((response) => {
                            debugger;
                    Indicator.close();
         if(response.data.head.errorCode=='0'){
           console.log("进入人工服务");
           WeixinJSBridge.call("closeWindow");
         }else{
            console.log("进入人工服务失败");
              Toast("请稍后重试！");
         }

       }).catch((response) => {
              Indicator.close();
                   Toast("请稍后重试！");
                 });
    },
    }
  }
</script>
