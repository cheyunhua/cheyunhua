<template>
  <div class="_sign_back" :style="sign_style">
    <div class="_sign_backtrans">
      <div >
        <div class="user"></div>
        <div class="_headimg"
             :style="{backgroundImage: 'url(' + wechatImage + ')'}"></div>
        <div class="_user-name" v-if="wechatName">{{ wechatName }}</div>
      </div>

      <div class="wrapper" style="margin-top: 70px;">

        <div class="row fx-white index-content" style="padding: 0rem 1.2rem;margin-bottom: 5px;border-bottom: none">
          <div class="col-xs-4" style="margin-left: -1.27rem;;    line-height: 38px;background: #f17712;    color: white;">姓名</div>
          <div class="col-xs-3" style="width: 70%;margin-left: 0rem;"><input    style="font-size: 14px;  width: 100%;      margin-top: 0.6em;" v-model="userInfo.userName"  placeholder="请输入姓名" :readonly="this.existSignText.length>0?'true':false"/></div>
        </div>

        <div class="row fx-white index-content" style="padding: 0rem 1.2rem;margin-bottom: 5px;border-bottom:none">
          <div class="col-xs-4" style="margin-left: -1.27rem;;    line-height: 38px;background: #f17712;    color: white;">手机号码</div>
          <div class="col-xs-3" style="width: 70%;margin-left: 0rem;"><input    style="font-size: 14px;  width: 100%;     margin-top: 0.6em;" v-model="userInfo.userPhone"  placeholder="请输入手机号码"  :readonly="this.existSignText.length>0?'true':false"/></div>
        </div>
        <div class="row fx-white index-content" style="padding: 0rem 1.2rem;margin-bottom: 5px;border-bottom:none">
          <div class="col-xs-4" style="margin-left: -1.27rem;;    line-height: 38px;background: #f17712;    color: white;">公司名称</div>
          <div class="col-xs-3" style="width: 70%;margin-left: 0rem;"><input    style="font-size: 14px;  width: 100%;     margin-top: 0.6em;" v-model="userInfo.companyName"  placeholder="请输入公司名" :readonly="this.existSignText.length>0?'true':false" /></div>
        </div>

      </div>
      <!--<p class="tooltip-info" style=""><span>{{existSignText}}</span></p>-->
      <div v-bind:class="this.existSignText.length>0?'login_none':'login'" v-on:click="sureSign();">{{buttonText}}</div>
    </div>
  </div>
</template>

<script>
  import api from '../../api/';
  import { Toast,Indicator,MessageBox  } from 'mint-ui';
  import ElementUI from 'element-ui'
  export default{
    name: 'signin',
    data(){
        return{
          sign_style:{
            width: window.screen.width + 'px',
            height: window.screen.height + 'px',
          },
          buttonText: '签到',
//          userInfo: {userName:'小明',userPhone:'15360056521',companyName:'test1'},//签到信息
          userInfo: {},//签到信息
//          wechatImage: 'http://p.qlogo.cn/bizmail/Tib8C2jsaHlAd4slsEKpj03OicPznv6bVEBL6ZTz3EHxlF3atOEFHvoQ/0',
          wechatImage: '',//微信登录头像
          wechatName: '',//微信登录名
          signId: '',//签到随机码
          existSignText:'',
          sceneId:'' //按场次签到
        }
    },
    created(){
      this.signId = this.$route.query.signId != undefined ? this.$route.query.signId : '';
      this.wechatImage = this.$route.query.wechatImage != undefined ? this.$route.query.wechatImage : 'http://p.qlogo.cn/bizmail/Tib8C2jsaHlAd4slsEKpj03OicPznv6bVEBL6ZTz3EHxlF3atOEFHvoQ/0';
      this.wechatName = this.$route.query.wechatName != undefined ? this.$route.query.wechatName : 'Hi';

      this.sceneId = this.$route.query.sceneId != undefined ? this.$route.query.sceneId : '';

      //检测是否已签到
        if(this.sceneId!=''){

          this.querySignInfoDistinct();

        }else{
            this.querySignInfo();
        }

    },
    methods:{
      //签到
      sureSign(){
        if(this.existSignText.length>0){
          return
        }
        if(!this.userInfo.userName){
          this.$message.error('姓名不能为空');
          return
        }
        if(!this.userInfo.userPhone){
          this.$message.error('手机号码不能为空');
          return
        }
        if(!(/^1[34578]\d{9}$/.test(this.userInfo.userPhone))){
          this.$message.error('手机号码格式不正确');
          return
        }
        if(!this.userInfo.companyName){
          this.$message.error('公司名称不能为空');
          return
        }

        Indicator.open({
          text: "签到中！请稍候",
          spinnerType: 'snake'
        });
        //调用签到接口
        var params = {};
        params.id = this.signId;
        params.userName = this.userInfo.userName;
        params.userPhone = this.userInfo.userPhone;
        params.companyName = this.userInfo.companyName;
        api.signIn(params).then((response) => {
          if (response.data.head.errorCode == '0') {
            Indicator.close();
            this.$message.success('签到成功');
            this.buttonText = '已签到';
            this.existSignText = '亲！今天签到过了(∩_∩)'
          }else{
            Indicator.close();
            this.$message.error(response.data.head.errorMsg);
          }
        }).catch((response) => {
          Indicator.close();
          this.$message.error('哎呀！网络出了点问题，请稍后重试！');
        });
      },
      //查询上一次签到信息
      querySignInfo(){
        Indicator.open({
          text: "检测是否已签到！请稍候",
          spinnerType: 'snake'
        });
        var params = {};
        params.id = this.signId;
        api.querySignInfo(params).then((response) => {
          if (response.data.head.errorCode == '0') {
            Indicator.close();
            this.userInfo.userName = response.data.body.userName;
            this.userInfo.userPhone = response.data.body.userPhone;
            this.userInfo.companyName = response.data.body.companyName;
            this.buttonText = '已签到';
            this.existSignText = '亲！今天签到过了(∩_∩)'
          }else{
            Indicator.close();
            //this.$message.info(response.data.head.errorMsg);
          }
        }).catch((response) => {
          Indicator.close();
          this.$message.error('哎呀！网络出了点问题，请稍后重试！');
        });
      },


        //查询上一次签到信息(按场次)
        querySignInfoDistinct(){
            Indicator.open({
                text: "检测是否已签到！请稍候",
                spinnerType: 'snake'
            });
            var params = {};
            params.id = this.signId;
            api.querySignInfo(params).then((response) => {
                if (response.data.head.errorCode == '0') {
                    Indicator.close();
                    this.userInfo.userName = response.data.body.userName;
                    this.userInfo.userPhone = response.data.body.userPhone;
                    this.userInfo.companyName = response.data.body.companyName;
                    this.buttonText = '已签到';
                    this.existSignText = '亲！今天签到过了(∩_∩)'
                }else{
                    Indicator.close();
                    //this.$message.info(response.data.head.errorMsg);
                }
            }).catch((response) => {
                Indicator.close();
                this.$message.error('哎呀！网络出了点问题，请稍后重试！');
            });
        }
    }
  }
</script>

<style>
  ._sign_back{
    background-image: url('../../assets/images/sign/sign_back.png');
    background-size:115%;
    background-repeat: no-repeat;
  }
  ._sign_backtrans{
    /*background: rgba(0,0,0,.6);*/
  }
  ._headimg {
    position: absolute;
    top: 50px;
    bottom: 0;
    left: 50%;
    z-index: 1;
    width: 120px;
    height: 120px;
    margin: 0 0 -40px -60px;
    border-radius: 50%;
    border: 1px solid #ddd;
    background-color: #eee;
    background-size: cover;
    background-position: center center;
    filter: none;
  }

  ._user-name {
    padding: 10px 0 50px;
    line-height: 32px;
    text-align: center;
    color: white;
  }
  ._sign_login{
    width: 93%;
    height: 3.2rem;
    line-height: 3.2rem;
    text-align: center;
    margin: 2rem auto;
    background: #f17712;
    color: #fff;
    font-size: 2rem;
    border-radius: 0.4rem;
    cursor: pointer;
  }
  ._sign_existSignText{
    width: 60%;
    margin-left: 25%;
    font-size: 1em;
  }
  .tooltip-info{
    font-size: 1em;
    /*color: #f8b500;*/
    color: #ffffff;
    height: 20px;
    line-height: 15px;
    margin-left: 30%;
  }
</style>
