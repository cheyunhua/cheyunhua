<template>
  <div class="navTit">
    <div>
      <div class="navHead">
        <div class="navTop">
          <a v-for="(item,index) in items" v-on:click="changeTab(item)" :class="item.tab===currentItem.tab?'hoveTab':'Tab'" >
            {{item.itemName}}<span>{{item.num}}</span>
          </a>
         <!-- <a href="#" class="daib" v-on:click="changeTab($items[0])">待办<span>1</span></a>
          <a href="#" v-on:click="changeTab($items[1])">消息<span>4</span></a>-->
        </div>
        <handle v-if="currentItem.tab=='handle'"   :userId="userId" :handleList="handleList" v-on:loadHandleList="loadHandleList"></handle>
        <message v-if="currentItem.tab=='message'"   :userId="userId" :noticeList="noticeList" v-on:loadNoticeList="loadNoticeList" ></message>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '../../api/';
  import _track from '../../api/track';
  import handle from './handle';
  import message from './message';
  import * as types from '../../store/mutation-types';
  const localStorage = global.localStorage;
  const WX_USER_ID = 'wx.user.id';//用户id
  export default {
    props:['cusId'],
    components: {
      handle,
      message
    },
    data () {
      return {
        items: null,
        currentItem: {},
//        userId: "33c48a5109ec41f8aad1ed4648cd936b",
        userId: localStorage.getItem(WX_USER_ID),
        handleListLength: 0,
        noticeListLength: 0,
        handleList:[],
        noticeList:[],
      }
    },
    mounted:function(){
      this.items = [ {'tab':'handle','itemName':'待办','status':'0','num':'0'},
        {'tab':'message','itemName':'消息','status':'1','num':'0'}
      ];
      this.loadHandleList();
      this.loadNoticeList();
      this.currentItem=this.items[0];
    },
    created(){

    },
    methods: {
      goBack: function() {
        window.history.go(-1);
      },
      changeTab(item){
        this.currentItem = item;
        if(this.currentItem.status==="0"){
          this.loadHandleList();
            _track._trackPageview(false,"/todo/todomessage","待办-待办消息");
        }
        if(this.currentItem.status==="1"){
          this.loadNoticeList();
          _track._trackPageview(false,"/todo/message","待办-提醒消息");
        }
      },
      loadHandleList(){
      // debugger;
        /* var handleMap = {};
         handleMap.title="取单";
         handleMap.dates="2017-03-03";
         handleMap.contents="测试测试22222222";
         var handleMap2 = {};
         handleMap2.title="取单";
         handleMap2.dates="2017-03-04";
         handleMap2.contents="测试测试22222222";
         var handleMap3 = {};
         handleMap3.title="取单";
         handleMap3.dates="2017-03-05";
         handleMap3.contents="测试测试22222222";
         this.handleList.push(handleMap);
         this.handleList.push(handleMap2);
         this.handleList.push(handleMap3);*/
        var params={};
        params.userId=this.userId;
//        params.cusId = localStorage.getItem("his_customer");
        if(this.cusId==="0"){
          return;
        }
        params.cusId = this.cusId;
        params.pageIndex="1";
        params.pageSize="20";
        params.messageType="todo";
        api.querywaitHandleLists(params).then((response) => {
        if(response.data.head.errorCode=='0'){
          var resultBean = response.data.body;
          this.handleList =  resultBean.tasks;
          console.log('handleList:'+this.handleList);
          if(this.handleList instanceof Array){
            this.countHandleListLength(this.handleList.length);
          }else{
            this.countHandleListLength(0);
          }
         // this.$emit('countHandleListLength', this.handleList.length );
        }
        else{
          this.handleList = [];
          this.countHandleListLength(this.handleList.length);
        }
      })
      .catch((response) => {
          //commit(types.ACCOUNT_LOGIN_SUBMIT_FAILURE, response.data);
        });
      },
      loadNoticeList(){
        var params={};
//      params.userId="33c48a5109ec41f8aad1ed4648cd936b";
        params.userId=this.userId;
//        params.cusId = localStorage.getItem("his_customer");
        if(this.cusId==="0"){
          return;
        }
        params.cusId = params.cusId = this.cusId;;
        params.pageIndex="1";
        params.pageSize="20";
        params.messageType="notice";
        params.clientInfoValue="public_wechat_jcdz_entrepreneur";
//        var  result = '[{"userId":"d42e1afdbf5040f3b792c849267ef8a7","isRead":"N","isConfirm":"N","cusId":"464b7fa2c95d4ea4a4e95e8f0ac881e4","content":"201705会计期间记账报税流程服务工作即将开始，VIP客户经理将于3个工作日内来收取各种票据，请提前准备，以确保贵司的记账报税流程工作能够顺利进行。","taskInstId":"9eb089db4ada43048289cc7229b9c624","title":"记账报税流程-单据准备","num":0}]';
//        this.noticeList =  eval('('+result+')');
        api.querywaitHandleLists(params).then((response) => {
          console.log('querywaitHandleLists');
        if(response.data.head.errorCode=='0'){
          var resultBean = response.data.body;
          this.noticeList =  resultBean.data;
          var noReadCount =this.noticeList.length;
          for(var i=0;i<this.noticeList.length;i++){
            if(this.noticeList[i].isRead==="Y"){
              noReadCount--;
            }
          }
          console.log('noReadCount:'+noReadCount);
          this.countNoticeListLength(noReadCount);
//          this.$emit('countNoticeListLength', this.noticeList.length );
        }
        else{
          this.noticeList = [];
          this.countNoticeListLength(this.noticeList.length);
        }
      })
      .catch((response) => {
          //commit(types.ACCOUNT_LOGIN_SUBMIT_FAILURE, response.data);
        });
      },
      countHandleListLength(count){
      //debugger;
      console.log(count);
        this.items[0].num = count;
        this.handleListLength=count;
        this.$emit('countAllLength', (this.handleListLength) );
      },
      countNoticeListLength(count){
     //  debugger;
        this.items[1].num = count;
        this.noticeListLength=count;
        this.$emit('countAllLength', (this.handleListLength) );
      },
    },
    watch:{
      cusId:function () {
        this.loadHandleList();
        this.loadNoticeList();
        }
    }
  };
</script>
<style scoped>
  @import '../../assets/css/font-awesome.min.css';
  @import '../../assets/css/module.css';
  .hoveTab{
    display: inline-block;
    text-decoration: none;
    color: #fff;
    width: 7.6rem;
    border: 0.1rem solid #d04e00;
    height: 2.8rem;
    line-height: 2.8rem;
    border-radius: 0.2rem;
    position: relative;
    background: #d04e00;
    margin-left: 5px;
  }
  .Tab{
    display: inline-block;
    text-decoration: none;
    color: #fff;
    width: 7.6rem;
    border: 0.1rem solid #d04e00;
    height: 2.8rem;
    line-height: 2.8rem;
    border-radius: 0.2rem;
    position: relative;
    margin-left: 5px;
  }

</style>
