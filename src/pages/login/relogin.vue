<template>
    <div>
    </div>
</template>
<style>

</style>
<script>
    import { mapState } from 'vuex';
    import { Toast,Indicator  } from 'mint-ui';
    import api from '../../api/';
    import config from 'src/api/config'
    const WX_USER_TOKEN="wx.user.token";
    const WX_USER_CODE = 'wx.user.code';
    const WX_USER_WECHAT_CODE = "wx.user.wechat.code";
    const WX_USER_PROVINCECODE='wx.user.provinceCode';
    const localStorage = global.localStorage;
  export default{
    data(){
      return {
          params: {
              appCode: '',
              wechatCode: '',
              isHasWxInfo: '',
              redirectUrl:''
          },
      }
    },
      computed: mapState({
          loginTime: state => state.account.login.loginTime,
      }),
      watch: {
          loginTime(val){
              Indicator.close();
              console.log('自动登录成功时间'+val);

              window.location.href= decodeURI(this.params.redirectUrl)+"&wxtoken="+localStorage.getItem(WX_USER_TOKEN);
          }
      },
      created(){

      this.autoLogin();

      },
      methods: {
          autoLogin() {

              Indicator.open({
                  text: '页面跳转中...',
                  spinnerType: 'snake'
              });

              this.params.redirectUrl = api.getQueryString('redirectUrl');
              if (!this.params.redirectUrl) {
                  this.params.redirectUrl = this.$route.query.redirectUrl;
              }

              this.params.appCode = api.getQueryString('code');
              if (!this.params.appCode) {
                  this.params.appCode = this.$route.query.code;
              }
              if (this.params.appCode) {
                  localStorage.setItem(WX_USER_CODE, this.params.appCode);
              }

              this.params.wechatCode = api.getQueryString('state');
              if (!this.params.wechatCode) {
                  this.params.wechatCode = this.$route.query.state;

              }
              this.params.isHasWxInfo = '0';

              if (this.params.wechatCode) {
                  localStorage.setItem(WX_USER_WECHAT_CODE, this.params.wechatCode);
              }
              var provinceCode = api.getQueryString('provinceCode');
              if (!provinceCode) {
                  provinceCode = this.$route.query.provinceCode;
              }
              if (provinceCode) {
                  localStorage.setItem(WX_USER_PROVINCECODE, provinceCode);
              }
                  if (this.params.appCode != null && this.params.appCode != '') {
                      console.log("自动登录");
                      this.$store.dispatch('autoWechatLogin', this.params);


                  }


          }
      }

      }
</script>
