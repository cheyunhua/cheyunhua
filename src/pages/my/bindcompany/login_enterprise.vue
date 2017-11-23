<template>
  <div>
    <div class="fx-header-top fx-orange">
      绑定企业
    </div>
    <div class="_head">
      <div class="_head_content">{{headText}}</div>
    </div>
    <div class="_body">
      <div class="wrapper" style="padding: 0rem;">
        <div class="row fx-white index-content">
          <div class="col-xs-4" style="margin-left: -22px;">联系人</div>
          <div class="col-xs-3"><input   placeholder="请输入姓名" style="font-size: 14px;" v-model="params.userName" /></div>
        </div>
        <div class="row fx-white index-content">
          <div class="col-xs-4" style="margin-left: -22px;">手机号码</div>
          <div class="col-xs-3"><input   placeholder="请输入手机号码" style="font-size: 14px;" v-model="params.mobilePhone"  /></div>
        </div>
        <div class="row fx-white index-content">
          <div class="col-xs-4" style="margin-left: -22px;">验证码</div>
          <div class="col-xs-3"><input   placeholder="请输入验证码" style="font-size: 14px;" v-model="params.captchaCode"/></div>
          <div class="col-xs-4 fc-color-orange" v-on:click="captcha()"  :style="this.stop==true?'border: 0.1rem solid #dadada;color:#dadada;float: right;':'float: right'" ><font size="1.8rem" >{{validText}}</font></div>
        </div>
      </div>
    </div>
    <div class="page-part">
      <!--<div class="login" v-on:click="nextStep();">{{loginText}}</div>-->
     <div class="login" v-on:click="userLogin();">{{loginText}}</div>
    </div>
  </div>

</template>

<script type="es6">
  import Vue from 'vue';
  import VueRouter from 'vue-router';
  import api from '../../../api/';
  import { Toast,Indicator  } from 'mint-ui';
   import { mapState } from 'vuex';
  export default{
    name: 'loginEnterprise',
    props: ['headText'],
    data(){
      return{
        validText: '获取验证码',
        loginText: '下一步',
        existEnterprise: true,
        timer: 60,       //默认倒数30秒
        stop : false,   //默认是停止的，但界面加载之后会变成false
        Interval: null,  //setInterval的对象
        params:{
          mobilePhone:'',//手机号码
          captchaCode:'',//验证码
          code:'',//code
          userName:'',//联系人
          wechatCode:'',//微信区域编码
        }
      }
    },
    mounted(){
      console.info("login_enter页面的code"+api.getQueryString("code"));
      if(api.getQueryString("code")){
        this.params.code = api.getQueryString("code");
        this.params.wechatCode = api.getQueryString("state");
      }
    },
    beforeCreate() {
          this.$store.dispatch('accountLoginInit');
      },
    computed: mapState({
          success: state => state.account.login.success,
           failure: state => state.account.login.failure,
         loginTime: state=>state.account.login.loginTime,
      }),
      watch: {
        success: 'successWatcher',
        failure: 'failureWatcher',
        loginTime:'successWatcher',
      },
    methods:{
      //进入下一步
      nextStep(){
        if(!this.existEnterprise){
          this.$emit('enterAddStep');
        }else{
          this.$emit('enterBindStep');
        }
      },
      goBack(){
        this.$router.go(-1);
      },
      update () {
        if(this.timer <= 0){
          this.timer = 60;
          this.validText="重新发送";
          clearInterval(this.Interval);
          this.stop=false;
        }else{
          this.timer--;
          this.validText="重新发送("+this.timer+'s)';
        }
      },
      startTimer () {
        //如果是false就开始倒计时，如果是true就停止倒计时
        if(this.stop == false) {
          this.Interval = setInterval(this.update,1000);
        }else{
          clearInterval(this.Interval);
        }
        this.stop = !this.stop;
      },
      successWatcher(val, oldVal) {
      //埋点:登陆成功后，记录个人信息
      /*_track._track_setUser(localStorage.getItem("wx.user.id"),localStorage.getItem("wx.user.userPhone"),'001','WX');*/
      console.log('登陆成功,'+this.$route.query.resetLogin);
      if(this.$route.query.resetLogin=='0'){
      this.$router.push('/train');
      }else{
            this.$emit('enterBindStep');
            }
        },
        failureWatcher() {
          console.log('登陆失败')
          },
      captcha() {
        if(this.stop==true){
          Toast('收不到短信,请在'+this.timer+'s'+'重新发送');
              return;
          }
        if(!this.params.mobilePhone){
          Toast('号码不能为空');
          return
        }
        if(!(/^1[34578]\d{9}$/.test(this.params.mobilePhone))){
                 Toast('号码格式不正确');
                 return
        }
        this.isCatchCode=0;
        //调用store中的accountLoginSubmit方法
        this.params.phone=this.params.mobilePhone;
        this.$store.dispatch('wechatCaptcha', this.params);
        this.startTimer();
      },
      userLogin() {
        //this.loading();
        if(!this.params.userName){
          Toast('联系人不能为空');
          return
        }
        if(!this.params.mobilePhone){
          Toast('号码不能为空');
          return
        }
        if(!(/^1[34578]\d{9}$/.test(this.params.mobilePhone))){
                 Toast('号码格式不正确');
                 return
                   }
          try{
            if(this.isCatchCode==1){
          Toast('请先获取验证码');
          return;
          }
          }catch(e){
            console.log("提示失败");
          }
        if(!this.params.captchaCode){
          Toast('验证码不能为空');
          return;
        }
//        this.onLogin = true;

        //调用store中的accountLoginSubmit方法
        this.$store.dispatch('accountWechatLoginSubmit', this.params);
        //跳转

      }
    }
  }
</script>

<style>
  .page-part{
    background-color: #f3f3f3;
  }

</style>
