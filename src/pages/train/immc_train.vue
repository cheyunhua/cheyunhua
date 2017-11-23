<template>
  <div class="_bottom">
    <!--<span >报名不成功？请联系<span class="_bottom_content" v-on:click="startManService()">人工客服</span>解决。</span>-->
    <span >绑定不成功？请拨打<span class="_bottom_content"><a href="tell://400-99-12366">400-99-12366</a></span>解决。</span>
  </div>
</template>
<style>
.immc-label {
  font-size: 0.95em;
}
</style>
<script type="es6">
  import api from '../../api/';
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
        this.param.appCode = api.getQueryString("code");
        this.param.wechatCode = api.getQueryString("state");
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
