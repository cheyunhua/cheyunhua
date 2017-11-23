<template>
          <div>
            <i class="fa fa-angle-left" v-on:click="goBack()" style="font-size: 3rem; width: 4rem;height: 4rem;left: 0rem;cursor: pointer;float: left;margin-top: -40px;margin-bottom: 29px;color: white"></i>
            <div class="wrapper">
    <div class="time fx-white" style="margin-top: -35px">
      <div class="time-left">
       <strong style="font-size: 1.5rem">
      <!-- {{agentDetail.name==null?"":agentDetail.name}}- -->
       {{agentDetail.title==null?"":agentDetail.title}}</strong>
        <!--<p style="color: #999;font-size: 1.2rem;">{{(agentDetail.contents&&agentDetail.contents.length<1)?"暂无内容简要":agentDetail.contents}}</p>-->
      </div>
      <div class="time-right" style="color: #999;font-size: 1.2rem">{{agentDetail.dates==null?"":agentDetail.dates}}</div>
      <div></div>
    </div>

    <div class="daiban-text fx-white">
      <div class="row">
        <div class="col-xs-4" style="padding-left: 0em;text-align: left">取单人:</div>
        <div class="col-xs-8">{{agentDetail.vars.public.receivOrderUserName==null?"":agentDetail.vars.public.receivOrderUserName}}</div>
        <!--<div class="col-xs-8">测试</div>-->
      </div>
      <div class="row">
        <div class="col-xs-4" style="padding-left: 0em;text-align: left">取单时间:</div>
        <div class="col-xs-8">{{agentDetail.createTime==null?"":agentDetail.createTime}}</div>
      </div>
      <div class="row">
        <div class="col-xs-4" style="padding-left: 0em;text-align: left">取单方式:</div>
        <div class="col-xs-8">{{agentDetail.vars.public.expressType==null?"上门取单":(agentDetail.vars.public.expressType=='0'?'快递取单':'上门取单')}}</div>
      </div>
      <!--<p>取单人&nbsp;&nbsp;&nbsp;: VIP客户经理XiaoyuYang(133&nbsp;8888&nbsp;9999)</p>
      <p>取单时间: 2017-02-07</p>
      <p>取单方式: b当面交接</p>-->
    </div>
    <div v-if="agentDetail.vars.public.fileCoding">
      <indent :selecttxm="agentDetail.vars.public.fileCoding" :selectHandleCode="agentDetail.processInstId" :flagType="1"></indent>
    </div>
    <div class="fx-button">
      <mt-button size="large" type="default" @click.native="pushHandle" style="background: #f17712;color: white">确认</mt-button>
    </div>
    <div class="fx-button">
      <mt-button size="large" type="default" @click.native="backHandle" style="margin-top:20px;color: black">拒绝</mt-button>
    </div>
  </div></div>
</template>

<script>
  import indent from '../overview/indent';
  import api from '../../api/';
  import _track from '../../api/track';
  import { Toast,Indicator,MessageBox  } from 'mint-ui';
  export default {
    name: 'page-agent',
    props:['agentDetail'],
    components: {
      indent,
    },
    data() {
      return {
        selecttxm:"",
        selectHandleCode:"",
      };
    },
    created() {
    },
    methods:{
      goBack(){
        this.$emit('closeAgent');
      },
      loadHandleList(){
        this.$emit('loadHandleList');
      },
      pushHandle(){
        MessageBox.confirm('确定该操作吗?').then(action => {
            if(this.agentDetail.taskInstId!=null){
              var params={};
              params.taskInstId=this.agentDetail.taskInstId;
              params.remark="推送";
              params.confirm="Y";
              params.messageType="todo";
              params.tranType="1";
              _track._trackEvent("JCDZ_WX","待办-确定",this.agentDetail.title,this.agentDetail.taskInstId);
              api.sureHandle(params).then((response) => {
                if(response.data!=null){
                if(response.data.head.errorCode==="0"){
                  Toast('签收成功!');
                  this.loadHandleList();
                  this.$emit('closeAgent');
                }
              }
            })
            }
      });
      },
      backHandle(){
        MessageBox.confirm('确定该操作吗?').then(action => {
                  if(this.agentDetail.taskInstId!=null){
                    var params={};
                    params.taskInstId=this.agentDetail.taskInstId;
                    params.remark="回退";
                    params.confirm="Y";
                    params.messageType="todo";
                    params.tranType="0";
                    _track._trackEvent("JCDZ_WX","待办-拒绝",this.agentDetail.title,this.agentDetail.taskInstId);
                    api.sureHandle(params).then((response) => {
                      if(response.data!=null){
                      if(response.data.head.errorCode==="0"){
                        //Toast(response.data.head.errorMsg);
                          Toast('拒绝成功！');
                        this.loadHandleList();
                        this.$emit('closeAgent');
                      }else{
                        Toast(response.data.head.errorMsg);
                        this.$emit('closeAgent');
                      }
                    }
                  })
                  }
              });
          }
    },
    watch: {
    },
    mounted() {

    },
    updated(){
    }
  };
</script>
<style scoped>
  @import '../../assets/css/agent.css';
  .mint-button--large{
    width: 90%;
    margin-left: 5%;
    border-radius: 0.8rem;
  }
</style>
