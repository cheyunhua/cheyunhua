<template>
    <div>

    </div>
</template>
<style>

</style>
<script>
    import { Toast,Indicator  } from 'mint-ui';
    import api from '../../api/';
    const WX_USER_WECHAT_CODE = 'wx.user.wechat.code';
    const localStorage = global.localStorage;
  export default{
    data(){
      return {
        msg: 'hello vue'
      }
    },
      created(){

          Indicator.open({
              text: '重新授权登录中...',
              spinnerType: 'snake'
          });

          var params={};

          params.wechatCode=localStorage.getItem(WX_USER_WECHAT_CODE)
          params.menuCode='RE_LOGIN'

          window.location.href=api.authlogin(params);

          //api.authlogin(params);
      }
  }
</script>
