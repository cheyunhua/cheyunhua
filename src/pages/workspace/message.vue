<template>
  <div >

    <div class="message" v-for="list in noticeList" v-on:click="openAgent(list)">
        <div class="messagel"><img src="../../assets/images/common/xx_03.png" ><span v-if="list.isRead==='N'"></span></div>
        <div class="messager">
          <div>{{list.title}}
            <span style="top: 1.2rem;">{{list.sendDate}}</span>
          </div>
          <div class="content">{{list.summary}}<i class="glyphicon glyphicon-menu-right fx-ico-right"></i></div>
        </div>
    </div>
    <mt-popup v-model="agentVisible" position="right" class="mint-popup-3" modal="false">
      <messageagent :agentDetail="agentDetail" v-on:closeAgent="closeAgent" v-on:loadNoticeList="loadNoticeList"></messageagent>
    </mt-popup>
  </div>

</template>


<script>
  import messageagent from './messageagent';
  import api from '../../api/';
  import _track from '../../api/track';
  import 'src/assets/css/workspace/dispose.css';
  export default{
    props:['userId','noticeList'],
    components: {
      messageagent
    },
    //数据绑定
    data: function () {
      return {
        agentVisible:false,
        agentDetail:{},
      }
    },
    //定义额外方法
    methods:{
      loadNoticeList(){
        this.$emit('loadNoticeList');
      },
      openAgent(list){
        this.agentVisible = true;
        this.agentDetail = list;
        //埋点：点击查看某一条消息详情时，记录事件信息
        _track._trackEvent("JCDZ_WX","待办-查看消息内容",list.title,list.id);
        if(this.agentDetail.taskInstId!=null){
          var params={};
          params.taskInstId=this.agentDetail.taskInstId;
          params.remark="阅读消息";
         // params.confirm="Y";
          params.messageType="notice";
          api.sureHandle(params).then((response) => {
            this.loadNoticeList();
          })
        }

      },
      closeAgent(){
        this.agentVisible = false;
      }
    },
    //初始化执行的方法
    created(){
    },
    mounted() {
    }

  }

</script>

<style scoped>
  div.mint-popup-3 {
    width: 100%;
    height: 100%;
    border-radius: 0px;
    margin:0;
    background: #f3f3f3;
  }

</style>
