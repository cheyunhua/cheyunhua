<template>
  <div>
      <header class="fx-header">
          <div class="fx-header-top fx-orange">
              <i class="glyphicon glyphicon-menu-left fx-ico-left" v-on:click="goBack"></i>单据交接确认
          </div>
      </header>
      <div class="backlog02">
          <div class="p1">一般纳税人代理记账（内资）</div>
          <div class="p2">201705—单据交接确认</div>
          <div class="iconn04">2017-05-06</div>
      </div>
      <div class="backlog03">
          <li><span>取单人&nbsp;&nbsp;&nbsp;：</span><input type="text" value="李晓峰（VIP客户经理）"></li>
          <li><span>联系电话：</span><input type="text" value="139-3766-2855"></li>
          <li><span>取单时间：</span><input type="text" value="2017-05-06"></li>
          <li><span>取单方式：</span><input type="text" value="当面交接"></li>
      </div>
      <div class="backlog04">共收取票据（张）<span>50</span></div>
      <div class="backlog05 clearfix">
          <div class="list01">
              <li><div class="text">销售（张）<span>10</span></div></li>
              <li><div class="text">采购（张）<span>10</span></div></li>
          </div>
          <div class="list01">
              <li><div class="text">费用（张）<span>10</span></div></li>
              <li><div class="text">资金（张）<span>10</span></div></li>
          </div>
          <div class="list01">
              <li><div class="text">成本（张）<span>10</span></div></li>
              <li><div class="text01">工资表（张）<span>1</span></div></li>
          </div>
          <div class="list01">
              <li><div class="text">其他（张）<span>1</span></div></li>
          </div>
      </div>
      <div class="backlog06">
          <div class="btn01"><a href="#">确认</a></div></li>
          <div class="btn02"><a href="#">拒绝</a></div></li>
      </div>

  </div>
</template>
<style>
    .ljb-confirm{ text-align:center; background-color:#ff7045; color:#FFF; font-size:1.6rem; position:relative; padding:1.2rem 0rem;}
    .ljb-confirm .iconn03{ position:absolute; left:1rem; top:1.6rem;}
    .ljb-confirm .iconn03 a{ color:#FFF;}
    .backlog02{ margin-top:1rem; background-color:#FFF; position:relative;}
    .backlog02{border-bottom:0.1rem solid #e3e3e3;border-top:0.1rem solid #e3e3e3;}
    .backlog01 .p1,.backlog02 .p1{ color:#878787; border-left:1rem solid #ff7045; padding:1rem;}
    .backlog01 .p2,.backlog02 .p2{ color:#ff7043; padding-left:2.6rem;}
    .backlog02 .p2{ padding-bottom:1rem;}
    .backlog01 .p3,.backlog02 .p3{ color:#919191; padding:1rem 0rem 1.4rem 2.6rem; font-size:1.2rem;}
    .backlog01 .iconn04{ position:absolute; right:1.6rem; top:3.6rem;}
    .backlog02 .iconn04{ position:absolute; right:1.6rem; top:1rem; color:#878787;}
    .backlog03{ background-color:#FFF; padding-left:2.6rem; border-bottom:0.1rem solid #e3e3e3; margin-top:0.4rem;}
    .backlog03 li{ border-bottom:0.1rem solid #e3e3e3; padding:1rem 0rem;}
    .backlog03 li span{ color:#acacac;}
    .backlog03 li input{ border:0rem; text-indent:0.4rem;}
    .backlog03 li:nth-of-type(4){ border:0rem;}
    .backlog04{ background-color:#ffcb8c; padding:1.2rem 0rem 1.2rem 2.6rem; color:#737373; margin-top:0.2rem;}
    .backlog04 span{ color:#212121; font-size:2.6rem; padding-left:2rem;}
    .backlog05{ background-color:#FFF; padding:1rem 1.8rem 0rem;}
    .backlog05 .list01 li,.ljb-wrap01 .list01 li{ float:left; width:49%; border-bottom:0.1rem dotted #e3e3e3; padding:1rem 0rem;}
    .backlog05 .list01 li:nth-of-type(1),.ljb-wrap01 .list01 li:nth-of-type(1){border-right:0.1rem dotted #e3e3e3;}
    .backlog05 .list01 li .text,.backlog05 .list01 li .text01,.ljb-wrap01 .list01 li .text,.ljb-wrap01 .list01 li .text01{ color:#acacac; padding-left:1rem;}
    .ljb-wrap01 .list01 li .text{ line-height:2rem;}
    .backlog05 .list01 li .text span,.ljb-wrap01 .list01 li .text span{ color:#ff5b28; font-size:1.6rem;}
    .backlog05 .list01 li .text span{padding-left:0.6rem;}
    .backlog05 .list01 li .text01 span,.ljb-wrap01 .list01 li .text01 span{ color:#ff5b28; font-size:1.6rem; padding-left:0.2rem;}
    .backlog06{ padding:1.2rem 1.6rem;}
    .backlog06 .btn01 a{background-color:#ff7045; margin-bottom:1rem;}
    .backlog06 .btn02 a{background-color:#cfcfcf; color:#757575;}
    .backlog06 a{ width:100%; height:4rem;  display:inline-block; color:#FFF; text-align:center; line-height:4rem; border-radius:0.3rem; font-size:1.6rem;}
</style>
<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      goBack: function () {
        window.history.go(-1);
      }
    },
    computed: {
    }
  }
</script>
