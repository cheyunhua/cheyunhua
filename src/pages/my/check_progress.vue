<template>
  <div>
      <div class="ljb-progress">查看进展<div class="iconn03"><a @click="goBack"><i class="iconfont">&#xe626;</i></a></div><div class="iconn003"><a href="#"><i class="iconfont" style="font-size:2.6rem; color:#FFF">&#xe6b2;</i></a></div></div>
      <div class="ljb-content clearfix">
          <li class="li01">2017年<br><span>04</span>月</li>
          <li class="li02">记账</li>
          <li class="li03">记帐报税服务（内资）<br><span>佛山九牧洁具有限公司</span></li>
      </div>
      <div class="progress01">
          <li class="list001"><a class="step01">已完成</a><br><span>收单</span><div class="icon01"><i class="iconfont" style="color:#d9d9d9; font-size:2.6rem;">&#xe648;</i></div><div class="triangle"></div></li>
          <li class="list002"><a class="step02">进行中</a><br><span>记账</span><div class="icon02"><i class="iconfont" style="color:#d9d9d9; font-size:2.6rem;">&#xe648;</i></div></li>
          <li><a class="step03">未开始</a><br><span>报税</span></li>
      </div>
      <div class="ljb-wrap">共收取票据（张）<br><span>50</span></div>
      <div class="ljb-wrap01 clearfix">
          <div class="list01">
              <li><div class="text">销售（张）<br><span>10</span></div></li>
              <li><div class="text">采购（张）<br><span>10</span></div></li>
          </div>
          <div class="list01">
              <li><div class="text">费用（张）<br><span>10</span></div></li>
              <li><div class="text">资金（张）<br><span>10</span></div></li>
          </div>
          <div class="list01">
              <li><div class="text">成本（张）<br><span>10</span></div></li>
              <li><div class="text">工资表（张）<br><span>1</span></div></li>
          </div>
          <div class="list01">
              <li><div class="text">其他（张）<br><span>1</span></div></li>
              <li><div class="text">其他（张）<br><span>1</span></div></li>
          </div>
      </div>

  </div>
</template>
<style>
    .clearfix:after{content:"";display:block;clear:both}
    .clearfix{zoom:1;}
     .ljb-progress{ text-align:center; background-color:#ff7045; color:#FFF; font-size:1.6rem; position:relative; padding:1.2rem 0rem;}
    .ljb-backlog .iconn03,.ljb-evolve .iconn03,.ljb-progress .iconn03{ position:absolute; left:1rem; top:1.6rem;}
    .ljb-progress .iconn003{ position:absolute; right:1rem; top:1rem;}
    .ljb-backlog .iconn03 a,.ljb-evolve .iconn03 a,.ljb-progress .iconn03 a{ color:#FFF;}
    .ljb-content{ background-color:#FFF; color:#707070; padding:0.8rem 0rem 0.8rem 1rem;}
    .ljb-content li{ float:left;}
    .ljb-content .li01{ border-right:0.1rem dotted #a1a1a1; padding:0.4rem 0.8rem 0.4rem 0.6rem;}
    .ljb-content .li02{ background-color:#ffa726; width:3.2rem; height:3.2rem; border-radius:50%; color:#FFF; text-align:center; line-height:3.2rem; margin:0.4rem 0.8rem;}
    .ljb-content .li03{ line-height:1.6rem; padding-top:0.4rem;}
    .ljb-content .li03 span{ color:#999999;}
    .progress01{ margin-top:0.3rem; background-color:#FFF; display:flex; padding:1.6rem 0rem 1.3rem;}
    .progress01 li{ flex:1; text-align:center; line-height:3rem;}
    .progress01 .step01,.progress01 .step02,.progress01 .step03{ width:6rem; height:6rem; border-radius:50%; color:#FFF; text-align:center; line-height:6rem; display:inline-block;}
    .progress01 li span{ color:#b5b5b5;}
    .progress01 .step01{background-color:#2baf2b;}
    .progress01 .step02{background-color:#ffba52;}
    .progress01 .step03{background-color:#949494;}
    .progress01 .list001,.progress01 .list002{position:relative;}
    .progress01 .icon01,.progress01 .icon02{ position:absolute; top:1.4rem; left:80%; margin-left:0.6rem;}
    .progress01 .triangle{ width:0; height:0rem; border-left:1rem solid transparent;border-right:1rem solid transparent;border-bottom:1.4rem solid #ffbf70; position:absolute; botoom:-4rem; left:50%; margin-left:-1rem;}
    .ljb-wrap{ background-color:#ffbf70; padding:1rem 0rem 1rem 1.4rem; color:#737373; line-height:2.4rem;}
    .ljb-wrap span{ color:#212121; font-size:2.2rem;}
</style>
<script>
  export default {
    name: 'page-agent-1',
    props: ['agentDetail'],
    components: {
    },
    data() {
      return {
      }
    },
    methods: {
      goBack: function () {
        console.log("111");
        this.$emit('closeCheckProgressAgent');
        console.log("222");
        //setTimeout('window.history.go(-1)', 500);
      }
    },
    computed: {

    }
  }
</script>
