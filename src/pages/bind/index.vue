<template>
  <div>
    <login-enterprise v-on:enterAddStep="enterAddStep"  v-on:enterBindStep="enterBindStep" v-if="currentTab==='loginEnterprise'" :headText="headText" ></login-enterprise>
    <bind-enterprise v-on:enterLoginStep="enterLoginStep" v-on:enterAddStep="enterAddStep" :needBindList="needBindList" v-if="currentTab==='bindEnterprise'" :headText="headText" :enterpriseList="enterpriseList" :code="param.appCode"></bind-enterprise>
    <add-enterprise v-on:enterLoginStep="enterLoginStep"  v-on:enterBindStep="enterBindStep" v-on:sureAdd="sureAdd" v-if="currentTab==='addEnterprise'" :headText="headText" :beforeView="beforeView"></add-enterprise>
    <immc-enterprise></immc-enterprise>
  </div>
</template>
<script type="es6">
  import loginEnterprise from './login_enterprise.vue'
  import bindEnterprise from './bind_enterprise.vue'
  import addEnterprise from './add_enterprise.vue'
  import immcEnterprise from './immc_enterprise.vue'

  import Vue from 'vue';
  import api from '../../api/';
  import { Toast,Indicator  } from 'mint-ui';

  const WX_USER_ID = 'wx.user.id';
  const WX_USER_CODE = 'wx.user.code';
  const WX_USER_ENCODE = 'wx.user.encode';
  const WX_USER_CUSTSTORELIST = 'wx.user.custStoreList';
  const WX_USER_TOKEN="wx.user.token";
  const WX_USER_PHONE='wx.user.userPhone'
  const localStorage = global.localStorage;
  export default{
    name: 'bind',
    data(){
      return{
        headText: '绑定企业信息后，可享受一对一专属服务。',
        currentTab:'loginEnterprise',
        needBindList: null,//需要绑定的企业
        enterpriseList:[],//企业列表
        beforeView: 'enterLoginStep',//记住上一页 默认是登录页
        param:{
        appCode:'',
        wechatCode:'',
        }

      }
    },
    components: {
      loginEnterprise,bindEnterprise,addEnterprise,immcEnterprise
    },
    methods:{
      enterAddStep(){//进入添加企业界面
        this.beforeView = 'enterBindStep';//记住上一页
        this.currentTab = 'addEnterprise';
      },
      enterLoginStep(){//进入登录关联页面
        this.currentTab = 'loginEnterprise';
      },
      enterBindStep(){//进入确认绑定企业页面
        this.currentTab = 'bindEnterprise';
      },
      sureAdd(needBindList){//添加新的要绑定的企业列表
        if(needBindList){
          this.needBindList = needBindList;
        }
      },
      loginInit(data){

      /*Vue.set(state.auth, 'userId', data.userId);
      Vue.set(state.auth, 'encode', data.encode);
      Vue.set(state.auth, 'custStoreList', data.cusList==undefined?"":JSON.stringify(data.cusList));*/
      localStorage.setItem(WX_USER_ID, data.userId);
      localStorage.setItem(WX_USER_TOKEN,data.token);
      localStorage.setItem(WX_USER_ENCODE, data.encode);
      localStorage.setItem(WX_USER_PHONE, data.userPhone);
      localStorage.setItem(WX_USER_CODE, data.code);
      localStorage.setItem(WX_USER_CUSTSTORELIST, data.cusList==undefined?"":JSON.stringify(data.cusList));
      },
      autoLogin(){
        console.info("index页面的code"+api.getQueryString("code"));
        this.param.appCode = api.getQueryString("code");
        this.param.wechatCode = api.getQueryString("state");
        if(this.param.appCode != null && this.param.appCode != ''){

          Indicator.open({
            text: '自动登录中....',
            spinnerType: 'snake'
          });

          var that = this;
//          that.currentTab = 'bindEnterprise';
          api.autoLogin(this.param).then(function(res){
            if(res.data.head.errorCode == '0'){
              that.loginInit(res.data.body);
              //登陆成功
              Indicator.close();
              that.currentTab = 'bindEnterprise';
            }
            else{
              Indicator.close();
              //不能自动登录
            }
          }) .catch(function(err){

            Indicator.close();

            //系统异常
            Toast({
              message: '系统异常:'+err,
              duration: 3000
            });
          })
        }
      }

    },
    mounted(){
      this.autoLogin();
    }
  }
</script>
<style>
  ._head_content{
    font-size: 1.5rem;
    margin-top: 0.8rem;
  }
  ._head{
    margin-top: 1rem;
    text-align: center;
    font-size: 2rem;
    height: 2rem;
  }
  ._body{
    background-color: white;
    height: 100%;
    margin-top: 0.8rem;
  }
  ._bottom{
    background-color: #f3f3f3;
    text-align: center;
  }
  ._bottom_content a{
    color: red;
  }
</style>
