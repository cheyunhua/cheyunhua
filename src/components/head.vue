<template>
  <div class="page-tabbar">
    <div class="page-wrap">
      <mt-tab-container class="page-tabbar-container" v-model="selected">
       <!-- <mt-tab-container-item id="overview" @click="track()"  v-on:track="track">-->
        <mt-tab-container-item id="overview"   v-on:track="track">
            <overview-page  v-on:changeCusId2="changeCusId2" ></overview-page>
        </mt-tab-container-item>
        <mt-tab-container-item id="workspace">
          <workspace-page  v-on:countAllLength="countAllLength"  :cusId="cusId"></workspace-page>
        </mt-tab-container-item>
        <mt-tab-container-item id="setting">
          <setting-page></setting-page>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="overview" style="background-color: #fafafa">
        <div v-on:click="track('/overview','概览')">
         <img :src="selected=='overview'?bq_04:bq_03" style="width: 32px;height: 31px">
        <!--<i slot="icon" class="iconfont icon-workspace" ></i>-->
        <div style="margin-top: 10px;color: black">概览</div>
        </div>
      </mt-tab-item>
      <mt-tab-item  id="workspace" style="background-color: #fafafa">
        <div v-on:click="track('/todo','待办')">
          <img :src="selected=='workspace'?bq_01:bq_05" :style="'width: 32px;height: 31px'">
          <!--<i slot="icon" class="iconfont icon-qiye" ></i>-->
          <div :style="allLength>0?'margin-top: 10px;color: black;margin-left: 12px;':'margin-top: 10px;color: black;'">待办<span class="floatspan" v-if="allLength>0">{{allLength}}</span></div>
        </div>
      </mt-tab-item>
      <mt-tab-item  id="setting" style="background-color: #fafafa">
        <div v-on:click="track('/setting','设置')">
          <img :src="selected=='setting'?bq_06:bq_02" style="width: 32px;height: 31px">
          <!--<i slot="icon" class="iconfont icon-wo" ></i>-->
          <div style="margin-top: 10px;color: black">设置</div>
        </div>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script type="es6">
  import _track from '../api/track';
  import bq_01 from '../assets/images/common/bq_01.png';
  import bq_02 from '../assets/images/common/bq_02.png';
  import bq_03 from '../assets/images/common/bq_03.png';
  import bq_04 from '../assets/images/common/bq_04.png';
  import bq_05 from '../assets/images/common/bq_05.png';
  import bq_06 from '../assets/images/common/bq_07.png';
  export default {
  name: 'page-tabbar',
  data() {
    return {
      selected: 'overview',
      allLength:0,
      cusId:'0',
      bq_01:bq_01,
      bq_02:bq_02,
      bq_03:bq_03,
      bq_04:bq_04,
      bq_05:bq_05,
      bq_06:bq_06,
    };
  },
  methods:{
    countAllLength(count){
      this.allLength = count;
    },
    changeCusId2(cusId){
      this.cusId = cusId;
    },
    track(url,des){
      document.title=des;
      _track._trackPageview(false,url,des);
    }
  }
};
</script>

<style>
  .page-tabbar {
    overflow: hidden;
    height: 100vh;
  }

  .page-wrap {
    overflow: auto;
    height: 100%;
    padding-bottom: 100px;
  }
  .floatspan{
    width: 1.2rem;
    height: 1.2rem;
    line-height: 1.2rem;
    background: #e25704;
    border-radius: 50%;
    font-size: 0.6rem;
    color: #fff;
    text-align: center;
    position: relative;
    display: inline-block;
    top: -3.8rem;
    right: 0.4rem;
  }
</style>
