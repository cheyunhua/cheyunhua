<template>

  <div>
      <header class="fx-header">
          <div class="fx-header-top fx-orange">
              <i class="glyphicon glyphicon-menu-left fx-ico-left" v-on:click="goBack"></i>我的进展
          </div>
      </header>


    <div class="progress-title">
      <div class="progress-icon"></div>
      <label class="progress-label" style="padding-top:1.3em;padding-left: 0.5em;float: left;font-size: 0.9em;">我购买的产品</label>
    </div>

    <div class="item-product" v-for="item in product">
      <div class="progress-left">
        <div class="progress-product-accounting" v-if="item.type == '记账'"><div style="padding-top: 0.55em;padding-left: 0.35em;color: #ffffff">记账</div></div>
        <div class="progress-product-invoice" v-else="item.type == '发票'"><div style="padding-top: 0.55em;padding-left: 0.35em;color: #ffffff">发票</div></div>
      </div>
      <div class="progress-middle">
        <div class="progress-product-title">{{item.title}}</div>
        <div class="progress-product-time">{{item.time}}</div>
      </div>
      <div class="progress-right">
        <div class="progress-product-button" @click="openCheckProgressAgent"><div>查看进展</div></div>
      </div>
    </div>

    <mt-popup v-model="checkProgressPoupVisible" position="right" class="mint-popup-3" modal="false">
      <checkProgress v-on:closeCheckProgressAgent="closeCheckProgressAgent"></checkProgress>
    </mt-popup>
  </div>

</template>
<style>
  .progress-label {
    font-size: 0.8em;
    font-weight:normal;
    color: #A8A8A8;
  }

  .progress-title {
    width: 100%;
    height: 3em;
  }
  .progress-icon {
    float: left;
    width: 0.5em;
    height: 2.5em;
    margin-top: 0.5em;
    background-color: #FF7043;
  }

  .item-product {
    width: 100%;
    height: 4.5em;
    background-color: #ffffff;
    margin-bottom: 0.1em;
  }
  .progress-left {
    height: auto;
    width: 20%;
    float: left;
  }
  .progress-middle {
    height: auto;
    width: 55%;
    float: left;
  }
  .progress-right {
    height: auto;
    width: 25%;
    float: left;
  }
  .progress-product-accounting {  /*记账图标*/
    background-color: #FFA726;
    width: 2.8em;
    height:2.8em;
    border-radius: 2.8em;
    margin: 0.8em 1em 1em 0.8em;
  }
  .progress-product-invoice { /*发票图标*/
    background-color: #2BAF2B;
    width: 2.8em;
    height:2.8em;
    border-radius: 2.8em;
    margin: 0.8em 1em 1em 0.8em;
  }
  .progress-product-title {
    padding-top: 1em;
    font-size: 0.9em;
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .progress-product-time {
    padding-top: 0.5em;
    color: #999999;
    font-size: 0.8em;
  }
  .progress-product-button {
    border: 0.1em solid #FF7043;
    width: 4.5em;
    height: 1.6em;
    margin-top: 1.5em;
    margin-left: 0.2em;
    border-radius: 0.3em;
  }
  .progress-product-button > div {
    font-size: 0.8em;
    color: #FF7043;
    padding-top: 0.18em;
    padding-left: 0.7em;
  }

  .mint-popup-3 {
    width: 100%;
    height: 100%;
    border-radius: 0px;
    margin: 0;
    background: #f3f3f3;
  }
</style>
<script>
  import checkProgress from './myprogress/check_progress.vue';
  export default {
    components: {
      checkProgress
    },
    data () {
      return {
        checkProgressPoupVisible: false,
        product: [
          {
            id: '1',
            title: '记帐报税服务（内资）',
            time: '2017-01-16',
            type: '记账'
          }, {
            id: '2',
            title: '发票认证服务',
            time: '2017-02-12',
            type: '发票'
          }, {
            id: '3',
            title: '小规模纳税人代理记帐（外资）',
            time: '2017-02-19',
            type: '记账'
          }
        ],
          companyNameList: [
          {
            id: '1',
            company: '佛山九牧洁具有限公司'
          }, {
            id: '2',
            company: '金财互联数据服务有限公司'
          }
        ]
      }
    },
    methods: {
      openCheckProgressAgent: function () {
        this.checkProgressPoupVisible = true;
      },

      closeCheckProgressAgent: function () {
        this.checkProgressPoupVisible = false;
      },
      goBack: function () {
          window.history.go(-1);
      }
    },
    computed: {

    }
  }
</script>
