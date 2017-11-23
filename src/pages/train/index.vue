<template>
  <div>
    <enroll-train :headText="headText" :appCode="appCode" v-if="currentTab==='enrollTrain'"></enroll-train>
    <immc-train></immc-train>
  </div>
</template>

<script type="es6">
  import enrollTrain from './enroll_train.vue'
  import immcTrain from './immc_train.vue'
  import api from '../../api/';
  import { Toast,Indicator  } from 'mint-ui';
  export default{
    name: 'train',
    components: {
      enrollTrain,immcTrain
    },
    data(){
      return {
        headText: '请选择您要预约的培训场次',
        appCode: null,
        currentTab: 'enrollTrain',//当前标签页
      }
    },
    watch: {
      '$route': 'initData'
    },
    methods:{
      initData(){
        console.info("train index页面的code"+api.getQueryString("code"));
        if(api.getQueryString("code")){
          this.appCode = api.getQueryString("code");

          Indicator.open({
            text: '加载中....',
            spinnerType: 'snake'
          });

          var param={};
          param.appCode= this.appCode;
          var that = this;

          api.autoLogin(param).then(function(res){
            if(res.data.head.errorCode=='0'){
              //  that.loginInit(res.data.body);
              //登陆成功
              Indicator.close();
              // that.currentTab = 'addEnterprise';
            }
            else{
              Indicator.close();
              that.$router.push({path:'/bind',query:{resetLogin:0}});
              //不能自动登录
            }
          }) .catch(function(err){
            Indicator.close();
            that.$router.push({path:'/bind',query:{resetLogin:0}});
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
        this.initData();
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
  ._bottom_content{
    color: red;
  }
</style>
