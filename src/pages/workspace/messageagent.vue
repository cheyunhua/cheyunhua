<template>
          <div>
            <header class="fx-header">
              <div class="fx-header-top fx-orange">
                <i class="glyphicon glyphicon-menu-left fx-ico-left" v-on:click="goBack"></i>消息明细
              </div>
            </header>
             <div class="wrapper">
    <div class="time fx-white">
      <div style="font-size: 1.7rem">
        <center><strong >{{agentDetail.title==null?"":agentDetail.title}}</strong></center>
       <div class="date">{{agentDetail.data==null?"":agentDetail.data}}</div>
      </div>
    </div>
    <div class="time fx-white" style="height: 50em;margin-top: -1em;">
      <div class="message_content">
        {{agentDetail.content==null?"":agentDetail.content}}
      </div>
      <div class="message_content" v-if='agentDetail.expressType==null?false:(agentDetail.expressType=="0"||agentDetail.expressType=="2"?true:false)'>
        <li style="font-size: 1em">地址：{{agentDetail.expressAddress}}</li>
        <li style="font-size: 1em">联系人：{{agentDetail.expressUser}}</li>
        <li style="font-size: 1em">联系电话：{{agentDetail.expressPhone}}</li>
      </div>
    </div>
   <!-- <div class="fx-button">
      <mt-button size="large" type="default" @click.native="sureHandle">确认已读</mt-button>
    </div>-->
   <!-- <div class="fx-button">
      <mt-button size="large" type="default" >取消</mt-button>
    </div>-->
  </div>
          </div>
</template>

<script>
  import api from '../../api/';
  import _track from '../../api/track';
  import { Toast,Indicator  } from 'mint-ui';
  export default {
    name: 'page-agent',
    props:['agentDetail'],
    components: {
    },
    data() {
      return {
        vipManagerName: '',
        depAddress: '',
        vipPhone: '',
        storeName: '',
      };
    },
    created() {
    },
    methods:{
      loadCustomer(){
        api.querycustomerBycusId({cusId:this.agentDetail.cusId}).then((response) => {
          var cusInfo=response.data.body;
          if(cusInfo){
            this.vipManagerName=cusInfo.customerDepInfoList[0].vipManagerName;
            this.vipPhone=cusInfo.customerDepInfoList[0].vipPhone;
            this.depAddress=cusInfo.customerDepInfoList[0].depAddress;
            this.storeName=cusInfo.customerDepInfoList[0].storeDeptName;
          }
        });
      },
      loadNoticeList(){
        this.$emit('loadNoticeList');
      },
      goBack(){
        this.$emit('closeAgent');
      },
      sureHandle(){
        if(this.agentDetail.id!=null){
          var params={};
          params.id=this.agentDetail.id;
          params.remark="阅读消息";
          params.confirm="Y";
          params.messageType="notice";
          _track._trackEvent("JCDZ_WX","消息阅读确认",JSON.stringify(params));
          api.sureHandle(params).then((response) => {
            if(response.data!=null){
            if(response.data.head.errorCode==="0"){
              Toast("处理完毕");
              this.loadNoticeList();
              this.$emit('closeAgent');
            }
          }
        })
        }
      }
    },
    watch: {
      agentDetail:function () {
        //下载客户信息
/*        if(this.agentDetail.expressType!=null&&this.agentDetail.expressType==='0'){
          this.loadCustomer();
        }*/
      }
    },
    mounted:function() {

    },
    updated(){
    }
  };
</script>
<style scoped>
  @import '../../assets/css/agent.css';

</style>
