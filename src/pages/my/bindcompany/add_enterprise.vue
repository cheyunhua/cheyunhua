<template>
  <div>
    <div class="fx-header-top fx-orange">
      <i class="glyphicon glyphicon-menu-left fx-ico-left" aria-hidden="true" v-on:click="goBack()"></i>添加要绑定的企业
    </div>
    <div class="_head">
      <div class="_head_content">{{headText}}</div>
    </div>
    <div class="_body">
      <div class="wrapper">
        <div class="row fx-white index-content">
          <div class="tabInput">
            <div v-bind:class="selectTab=='selectLeftTab'?'select':''"  v-on:click="putTab('selectLeftTab',leftText)" id="tabLeft"><p class="tabP">纳税人识别号</p></div><div v-bind:class="selectTab=='selectRightTab'?'select':''" v-on:click="putTab('selectRightTab',rightText)" id="tabRight" ><p class="tabP">社会信用代码</p></div>
          </div>
        </div>
        <div class="row fx-white index-content">
          <div class="col-xs-3" style="width: 85%;"><input    v-bind:placeholder="noText" onfocus="select();" style="font-size: 14px;width: 100%;" v-model="no" /></div>
          <div class="col-xs-4 fc-color-orange" v-on:click="autoGet()" style="margin-left: -22px;padding: 0px; width: 4rem;float: right;"><font size="2rem" >{{autoGetText}}</font></div>
        </div>
        <div class="row fx-white index-content">
          <div class="col-xs-3" style="width: 85%;"><input   placeholder="" style="font-size: 14px;width: 100%;" v-model="custName" readonly/></div>
        </div>
      </div>
    </div>
    <div class="page-part">
      <!-- 如果企业信息为空的时候 按钮不可点击-->
      <div  v-bind:class="this.needBindCus==null?'login_none':'login'" v-on:click="sureAdd" >{{loginText}}</div>
    </div>
  </div>

</template>

<script type="es6">
    const localStorage = global.localStorage;
    const WX_USER_ID = 'wx.user.id';
  import { Toast,Indicator,MessageBox  } from 'mint-ui';
  import api from '../../../api/';
  import _track from '../../../api/track';
  export default{
    name: 'addEnterprise',
    props: ['headText','beforeView'],
    data(){
      return{
        loginText: '确认添加',
        autoGetText: '检测',
        noText: '请输入纳税人识别号',
        leftText: '请输入纳税人识别号',
        rightText: '请输入统一社会信用代码',
        selectTab: 'selectLeftTab',
        no: null,//纳税人识别号或者企业号
        custName: null,//企业名称
        needBindCus: null,//需要绑定的企业
      }
    },
    methods:{
      putTab(tabName,tabText){
        this.selectTab = tabName;
        this.noText = tabText;
        this.custName=null;
        this.no=null;
        this.needBindCus=null;
      },
      goBack(){
//        this.$emit(this.beforeView);
        this.$emit('enterBindStep');
      },
      sureAdd(){
        if(!this.needBindCus){
            Toast({
              message: '请先检测企业',
              duration: 2000
            });
            return ;
        }
        this.$emit('enterBindStep');
        this.$emit('sureAdd',this.needBindCus);
      },
      autoGet(){
        if(!this.no){
          Toast({
            message: this.noText,
            duration: 2000
          });
          return ;
        }
        Indicator.open({
          text: "加载中,请稍后",
          spinnerType: 'snake'
        });
        let params ={};
        params.no = this.no;
        params.userId=localStorage.getItem(WX_USER_ID);
        api.queryCustomerByNo(params).then((response) => {
          if(response.data.head.errorCode=='0'){
            Indicator.close();
            let result = response.data.body;
//            result = {"cusId":"0048305247d248e1afdd305088746270","cusName":"0301pyCompany37","creditCode":"","areaCode":"440103","capitalAuthority":0,"inputChannel":"门店","inputTime":1490684758000,"taxerProperty":"common","createUser":"42ea9ef6309940ef933fefe822f8d406","createDate":1488337388000,"updateUser":"42ea9ef6309940ef933fefe822f8d406","updateDate":1488339862000,"taxIdentificationNumber":"900000301000037"};
            let newCustInfo = {};
            this.needBindCus = {};
            newCustInfo.custId = result.cusId;
            newCustInfo.custName = result.cusName;
            newCustInfo.label = result.cusName;
            newCustInfo.value =   {'custId':result.cusId,'cusName':result.cusName}
            newCustInfo.checked='checked';//默认选中
            this.needBindCus = newCustInfo;
            this.custName = result.cusName;
          }else{
            Indicator.close();
            Toast( response.data.head.errorMsg);
            /*let result = {"cusId":"0048305247d248e1afdd305088746270","cusName":"0301pyCompany37","creditCode":"","areaCode":"440103","capitalAuthority":0,"inputChannel":"门店","inputTime":1490684758000,"taxerProperty":"common","createUser":"42ea9ef6309940ef933fefe822f8d406","createDate":1488337388000,"updateUser":"42ea9ef6309940ef933fefe822f8d406","updateDate":1488339862000,"taxIdentificationNumber":"900000301000037"};
            let newCustInfo = {};
            this.needBindCus = {};
            newCustInfo.custId = result.cusId;
            newCustInfo.custName = result.cusName;
            newCustInfo.label = result.cusName;
            newCustInfo.value = result.cusId;
            this.needBindCus = newCustInfo;
            this.custName = result.cusName;*/
        }
        }).catch((response) => {
              Indicator.close();
              Toast("访问超时");
          });
      }
    }
  }

</script>

<style>
  .page-part{
    background-color: #f3f3f3;
  }
  .tabInput{
    margin-top: 3rem;
  }
  #tabLeft.select{
    color: rgb(255, 255, 255);
    position: absolute;
    left: 12%;
    top: 2rem;
    width: 38%;
    height: 40px;
    background: inherit;
    background-color: rgba(240, 101, 18, 1);
    box-sizing: border-box;
    border-width: 2px;
    border-style: solid;
    border-color: rgba(240, 101, 18, 1);
    border-radius: 12px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  #tabLeft{
    color: #F06512;
    position: absolute;
    left: 12%;
    top: 2rem;
    width: 38%;
    height: 40px;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    border-width: 2px;
    border-style: solid;
    border-color: rgba(240, 101, 18, 1);
    border-radius: 12px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  #tabRight{
    color: #F06512;
    position: absolute;
    left: 50%;
    top: 2rem;
    width: 38%;
    height: 40px;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    border-width: 2px;
    border-style: solid;
    border-color: rgba(240, 101, 18, 1);
    border-radius: 12px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  #tabRight.select{
    color: rgb(255, 255, 255);
    position: absolute;
    left: 50%;
    top: 2rem;
    width: 38%;
    height: 40px;
    background: inherit;
    background-color: rgba(240, 101, 18, 1);
    box-sizing: border-box;
    border-width: 2px;
    border-style: solid;
    border-color: rgba(240, 101, 18, 1);
    border-radius: 12px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .tabP{
    margin-top: 0.6rem;
    font-size: 1.5rem;
    text-align: center;
  }

</style>
