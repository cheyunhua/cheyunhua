<template>
  <div class="qyxdiv" style="background: #f3f3f3">
    <ul v-if="!agentVisible">
      <li v-for="list in handleList" v-on:click="openAgent(list)">
        <!--<div>{{list.name}}-{{list.title}}<span>{{list.createTime}}</span></div>-->
        <div>{{list.title.length > 13 ? list.title.substring(0, 13) + '...' : list.title }}
          <span style="top: 1.2rem;">{{list.createTime}}</span>
        </div>
       <!-- <div class="content">{{(list.contents&&list.contents.length<1)?"暂无内容简要":list.contents}}<i class="fa fa-angle-right"></i></div>-->
      </li>
    </ul>
    <div v-if="agentVisible">
      <handleagent :agentDetail="agentDetail" v-on:closeAgent="closeAgent" v-on:loadHandleList="loadHandleList"></handleagent>
    </div>
  </div>

</template>

<script>
  import handleagent from './handleagent';
  import _track from '../../api/track';
  export default{
      props:['userId','handleList'],
      components: {
        handleagent
      },
      //数据绑定
      data(){
        return {
          agentVisible:false,
          agentDetail:{},
      }
      },
      //定义额外方法
      methods: {
          openAgent(list){
            this.agentVisible = true;
            this.agentDetail = list;
            //埋点：查看待办消息详情时，记录事件信息
            _track._trackEvent("JCDZ_WX","概览-查看待办",this.agentDetail.serviceName,this.agentDetail.id);
          },
          closeAgent(){
            this.agentVisible = false;
          },
          loadHandleList(){
            this.$emit('loadHandleList');
          }
      },
      //初始化执行的方法
      created(){
      },
      mounted() {
    },
    watch:{

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
