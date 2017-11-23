<template>
  <div  class="order-details-body">
    <div class="toptitle" ><span class="dot iconfont icon-jiantou" v-on:click="goBack()"></span>订单详情</div>

    <div class="order-number">订单号：{{orderCode}}</div>
    <!--
    <div class="business-info-label">企业信息</div>
    <div class="business-info">
      <div class="business-info-item">姓名：{{userName}}</div>
      <div class="business-info-item">手机号码：{{userPhone}}</div>
      <div class="business-info-item">邮箱：{{userEmail}}</div>
      <div class="business-info-item">公司名称：{{cusName}}</div>
    </div>
    -->
    <div class="product-info-label">商品（服务）信息</div>

    <div class="item-product-info" v-for="goods in orderdetails.goodsGroup">
      <div>
        <div class="product-info-left">
          <div class="product-img"><img :src="goods.photoGroup[0].photoUrl"></div>
        </div>
        <div class="product-info-right">
          <div class="product-title">{{goods.name}}</div>
          <div class="product-price">单价：{{goods.price}}元</div>
        </div>
      </div>
      <div class="product-bottom-area">地区：{{goods.areaName}}</div>
      <div class="product-bottom-servicetime" v-if="(!goods.serviceStartDate)||(!goods.serviceEndDate)">服务次数：{{servicesNumebr}}次</div>
      <div class="product-bottom-servicetime" v-else>服务期限：{{formatDate(goods.serviceStartDate)}}至{{formatDate(goods.serviceEndDate)}}</div>
    </div>

    <div class="product-total-price">合计：{{orderdetails.payAmount}}元</div>

    <div class="footer">
      <div class="footer-buttom">
        <div class="footer-buttom-1" v-show="orderState == 'waitPay'" @click="getAuthorization">立即付款</div>
        <div class="footer-buttom-2" v-show="orderState == 'waitPay'" @click="cancelOrder">取消订单</div>
        <div class="footer-buttom-1" v-show="orderState == 'waitDeal'" >待处理</div>
        <div class="footer-buttom-1" v-show="orderState == 'inService'">服务中</div>
        <div class="footer-buttom-1" v-show="orderState == 'complete'">已完成</div>
        <div class="footer-buttom-1" v-show="orderState == 'canceled'">已取消</div>
      </div>
    </div>

  </div>
</template>
<style>
.order-details-body {
  background-color: #ffffff !important;
}
.order-number {
  margin: 0.5em 0 0.5em 1em;
}
.business-info-label {
  margin: 0.5em 0 0.5em 1em;
}
.business-info {
  margin: 0.5em 0.2em 0.5em 0.2em;
  border: 0.1em solid #E3E3E3;
}
.business-info-item {
  margin: 0.5em 0 0.5em 2em;
}
.product-info-label {
  margin: 0.5em 0 0.5em 1em;
}
.item-product-info {
  margin: 0 0.2em 0 0.2em;
  height: auto;
  width: auto;
  border: 0.1em solid #E3E3E3;
}
.product-info-left {
  float: left;
  height: 5em;
  width: 40%;
}
.product-info-right {
  float: left;
  height: 5em;
  width: 60%;
}
.product-title {
  margin: 0.5em 0 0 0.5em;
  color: #555555;
}
.product-price {
  margin: 0.5em 0 0 0.5em;
  color: #555555;
}
.product-img {
  margin: 0.5em 0 0 0.5em;
  height: 4em;
  width: 6em;
  /*border: 0.1em solid #000000;*/
}
.product-img > img {
  height: 4em;
  width: 6em;
}
.product-bottom-area {
  font-size: 0.9em;
  margin: 0.5em 0 0.5em 0.5em;
}
.product-bottom-servicetime {
  font-size: 0.9em;
  margin: 0 0 0.5em 0.5em;
}
.product-total-price {
  float: right;
  margin: 1em 1em 4em 0;
  color: #FF9800;
}
.footer {
  position:fixed;
  bottom:0;
  height: 3em;
  width: 100%;
  border-top: 0.1em solid #E3E3E3;
}
.footer-buttom {
  float: right;
  width: 60%;
}
.footer-buttom-1 {
  float: right;
  background-color: #E51C23;
  color: #ffffff;
  height: 3em;
  width: 50%;
  text-align: center;
  padding-top: 0.6em;
}
.footer-buttom-2 {
  float: right;
  background-color: #FFBB54;
  color: #ffffff;
  height: 3em;
  width: 50%;
  text-align: center;
  padding-top: 0.6em;
}
</style>
<script>
    import {mapState} from 'vuex';
    import api from '../../../api/index';
    import config from '../../../api/config';
    import {Toast, Indicator, MessageBox} from 'mint-ui';
    const localStorage = global.localStorage;
    const WX_USER_CUSTSTORELIST = 'wx.user.custStoreList';
    const WX_USER_TOPAY_ORDER = 'wx.user.wait.topay.order'; //去付款的订单
    const ORDER_DETAILS = 'order.details';
    const WX_USER_ORDER = 'wx.user.order';
    const WX_USER_PHONE = 'wx.user.userPhone'
    const WX_USER_ID = 'wx.user.id';
    export default{
        name: 'page-navbar',
        //数据绑定
        data: function () {
            return {
                selected: '',
                orderdetails: '',
                orderCode: '',
                //userName: '',
                //userPhone: '',
                //userEmail: '',
                //cusName: '',
                servicesNumebr : '1',
                validityDate : '',
                goodsName: '',
                priceAcmount : '',
                billPrice: '',
                goodsAreaCode: '',
                orderState: ''
            }
        },
        computed: {

        },
        //定义额外方法
        methods: {
            loadOrderDetails(){
                this.orderdetails = JSON.parse(localStorage.getItem(ORDER_DETAILS));

                this.orderCode = this.orderdetails.orderCode;
                /*
                this.validityDate = this.orderdetails.validityDate;
                this.goodsName = this.orderdetails.goodsName;
                this.priceAcmount = this.orderdetails.priceAcmount;
                this.billPrice = this.orderdetails.billPrice;
                this.goodsAreaCode = this.orderdetails.goodsAreaCode;
                */
                console.log("loadOrderDetails---------");

                switch(this.orderdetails.orderStatus){
                  case 0 :
                    this.orderState = 'waitPay';
                  break;
                  case 1 :
                    this.orderState = 'waitDeal';
                  break;
                  case 2 :
                    this.orderState = 'inService';
                  break;
                  case 3 :
                    this.orderState = 'complete';
                  break;
                  case 4 :
                    this.orderState = 'canceled';
                  break;
                }
            },
            //获取授权
            getAuthorization(){
              localStorage.setItem(WX_USER_TOPAY_ORDER, this.orderdetails==undefined?"":JSON.stringify(this.orderdetails));

              let wechatCode = localStorage.getItem("wx.user.wechat.code");
              let retUrl = "http://"+config.wxUrl+"/auth/wechatCommonService"
              +"/wechatDomainAuth?menuCode=WAIT_PAY&wechatCode="+wechatCode+"&pay=212";
              console.log(retUrl);
              window.location.href = retUrl;

            },
            cancelOrder(){
              var that = this;
              MessageBox.confirm('确定取消订单?').then(action => {
                var params = {};
                params.orderCode = that.orderdetails.orderCode;
                api.cancelOrder(params).then((response) => {
                  if(response.data.head.errorCode === '0'){
                    //Toast("取消订单成功！");
                    localStorage.setItem('wx.order.waitpay.state','1');
                    //重新加载数据
                    that.loadOrderListFromService();
                  }else{
                    Toast(response.data.head.errorMsg);
                  }

                }).catch((response) => {

                });
              });

            },
            goBack() {
                window.history.go(-1);
            },
            //查询个人订单新接口
            loadOrderListFromService(){
                console.log("取消订单-查询个人订单新接口");
                localStorage.removeItem(WX_USER_ORDER);
                var params = {};
                params.userId = localStorage.getItem(WX_USER_ID);
                //params.userId = '000000000000';
                params.pageSize = '1000';
                params.pageIndex = '1';

                Indicator.open({text: '取消订单成功',spinnerType: 'fading-circle'});

                api.queryPersonalOrderPage(params).then((response) => {
                  console.log("取消订单-查询个人订单新接口-请求成功");
                    var orderList = response.data.body.data;
                    if(response.data.head.errorCode == '0'){
                      //重新加载订单，存到本地缓存
                      console.log("取消订单-重新加载订单，存到本地缓存");
                      localStorage.removeItem(WX_USER_ORDER);
                      localStorage.setItem(WX_USER_ORDER,orderList==undefined?"":JSON.stringify(orderList));
                      window.history.go(-1);
                      Indicator.close();
                    }
                }).catch((response) => {

                });
            },
            formatDate(timeStamp){
              var d = new Date(timeStamp);
              var year = d.getFullYear();
              var month = d.getMonth()+1;
              var date = d.getDate();
              //var hour = d.getHours();
              //var minute = d.getMinutes();
              //var second = d.getSeconds();
              //return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
              return year + "年" + month + "月" + date + "日";
            }
        },
        //初始化执行的方法
        created(){


        },
        watch:{
        },
        //通过路由的before钩子解决router-view缓存页面问题
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.loadOrderDetails();
            });
        },
        mounted() {
        }
    }
</script>
