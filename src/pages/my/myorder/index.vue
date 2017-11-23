<template>
  <div class="myOrder-page">
  <div id="myOrder">
    <div class="toptitle" ><span class="dot iconfont icon-jiantou" v-on:click="goBack()"></span>我的订单</div>

      <mt-navbar v-model="selectedTab" >
        <mt-tab-item id="all">全部</mt-tab-item>
        <mt-tab-item id="waitPay">待付款</mt-tab-item>
        <mt-tab-item id="waitDeal">待处理</mt-tab-item>
        <mt-tab-item id="inService">服务中</mt-tab-item>
        <mt-tab-item id="complete">已完成</mt-tab-item>
        <mt-tab-item id="canceled">已取消</mt-tab-item>
      </mt-navbar>
  </div>
      <!-- tab-container -->
      <mt-tab-container style="padding-top: 1em;" v-model="selectedTab" id="myOrderTab">
        <mt-tab-container-item id="all">
          <div class="item-order" v-for="item in allOrder">
            <div class="item-order-top">
              <div class="item-order-top-left">
                <div class="item-order-number">订单号：{{item.orderCode}}</div>
              </div>
              <div class="item-order-top-right">
                <div class="item-order-time">{{formatDate(item.orderTime)}}</div>
              </div>
            </div>
            <div class="item-order-middle" v-for="goods in item.goodsGroup">
              <div class="item-order-middle-left">
                <div class="item-order-img"><img :src="goods.photoGroup[0].photoUrl"></div>
              </div>
              <div class="item-order-middle-middle">
                <div class="item-order-title">{{goods.goodsName}}</div>
              </div>
              <div class="item-order-middle-right">
                <div class="item-order-state" v-if="item.orderStatus == '0'">待付款</div>
                <div class="item-order-state" v-else-if="item.orderStatus == '1' ">待处理</div>
                <div class="item-order-state" v-else-if="item.orderStatus == '2' ">服务中</div>
                <div class="item-order-state" v-else-if="item.orderStatus == '3' ">已完成</div>
                <div class="item-order-state" v-else-if="item.orderStatus == '4' ">已取消</div>
                <div class="item-order-state" v-else-if="item.orderStatus == '5' ">已终止</div>
              </div>
            </div>
            <div class="item-order-bottom">
              <div class="item-order-bottom-left">
                <div>应付：￥{{item.payAmount}}</div>
              </div>
              <div class="item-order-bottom-middle">
                <div class="item-button" @click="gotoOrderDetails(item)"><div>查看详情</div></div>
              </div>
              <div class="item-order-bottom-right">
                <div class="item-button" v-show="item.orderStatus == '0'"><div>&nbsp;&nbsp;&nbsp;付款</div></div>
              </div>
            </div>
          </div>
          <vBlackData v-if="allOrder == '' ||allOrder == null "></vBlackData>
        </mt-tab-container-item>
        <mt-tab-container-item id="waitPay">
            <div class="item-order" v-for="item in waitPayOrder">
                <div class="item-order-top">
                    <div class="item-order-top-left">
                        <div class="item-order-number">订单号：{{item.orderCode}}</div>
                    </div>
                    <div class="item-order-top-right">
                        <div class="item-order-time">{{formatDate(item.orderTime)}}</div>
                    </div>
                </div>
                <div class="item-order-middle" v-for="goods in item.goodsGroup">
                    <div class="item-order-middle-left">
                        <div class="item-order-img"><img :src="goods.photoGroup[0].photoUrl"></div>
                    </div>
                    <div class="item-order-middle-middle">
                        <div class="item-order-title">{{goods.goodsName}}</div>
                    </div>
                    <div class="item-order-middle-right">
                        <div class="item-order-state">待付款</div>
                    </div>
                </div>
                <div class="item-order-bottom">
                    <div class="item-order-bottom-left">
                        <div>应付：￥{{item.payAmount}}</div>
                    </div>
                    <div class="item-order-bottom-middle">
                        <div class="item-button" @click="gotoOrderDetails(item)"><div>查看详情</div></div>
                    </div>
                    <div class="item-order-bottom-right">
                        <div class="item-button" @click="getAuthorization(item)"><div>&nbsp;&nbsp;&nbsp;付款</div></div>
                    </div>
                </div>
            </div>
            <vBlackData v-if="waitPayOrder==''|| waitPayOrder == null"></vBlackData>
        </mt-tab-container-item>
        <mt-tab-container-item id="waitDeal">
            <div class="item-order" v-for="item in waitDealOrder">
                <div class="item-order-top">
                    <div class="item-order-top-left">
                        <div class="item-order-number">订单号：{{item.orderCode}}</div>
                    </div>
                    <div class="item-order-top-right">
                        <div class="item-order-time">{{formatDate(item.orderTime)}}</div>
                    </div>
                </div>
                <div class="item-order-middle" v-for="goods in item.goodsGroup">
                    <div class="item-order-middle-left">
                        <div class="item-order-img"><img :src="goods.photoGroup[0].photoUrl"></div>
                    </div>
                    <div class="item-order-middle-middle">
                        <div class="item-order-title">{{goods.goodsName}}</div>
                    </div>
                    <div class="item-order-middle-right">
                        <div class="item-order-state">待处理</div>
                    </div>
                </div>
                <div class="item-order-bottom">
                    <div class="item-order-bottom-left">
                        <div>应付：￥{{item.payAmount}}</div>
                    </div>
                    <div class="item-order-bottom-middle">
                        <div class="item-button" @click="gotoOrderDetails(item)"><div>查看详情</div></div>
                    </div>
                </div>
            </div>
            <vBlackData v-if="waitDealOrder=='' || waitDealOrder == null"></vBlackData>
        </mt-tab-container-item>
        <mt-tab-container-item id="inService">
            <div class="item-order" v-for="item in inServiceOrder">
                <div class="item-order-top">
                    <div class="item-order-top-left">
                        <div class="item-order-number">订单号：{{item.orderCode}}</div>
                    </div>
                    <div class="item-order-top-right">
                        <div class="item-order-time">{{formatDate(item.orderTime)}}</div>
                    </div>
                </div>
                <div class="item-order-middle" v-for="goods in item.goodsGroup">
                    <div class="item-order-middle-left">
                        <div class="item-order-img"><img :src="goods.photoGroup[0].photoUrl"></div>
                    </div>
                    <div class="item-order-middle-middle">
                        <div class="item-order-title">{{goods.goodsName}}</div>
                    </div>
                    <div class="item-order-middle-right">
                        <div class="item-order-state">服务中</div>
                    </div>
                </div>
                <div class="item-order-bottom">
                    <div class="item-order-bottom-left">
                        <div>应付：￥{{item.payAmount}}</div>
                    </div>
                    <div class="item-order-bottom-middle">
                        <div class="item-button" @click="gotoOrderDetails(item)"><div>查看详情</div></div>
                    </div>
                </div>
            </div>
            <vBlackData v-if="inServiceOrder=='' || inServiceOrder == null"></vBlackData>
        </mt-tab-container-item>
        <mt-tab-container-item id="complete">
            <div class="item-order" v-for="item in completeOrder">
                <div class="item-order-top">
                    <div class="item-order-top-left">
                        <div class="item-order-number">订单号：{{item.orderCode}}</div>
                    </div>
                    <div class="item-order-top-right">
                        <div class="item-order-time">{{formatDate(item.orderTime)}}</div>
                    </div>
                </div>
                <div class="item-order-middle" v-for="goods in item.goodsGroup">
                    <div class="item-order-middle-left">
                        <div class="item-order-img"><img :src="goods.photoGroup[0].photoUrl"></div>
                    </div>
                    <div class="item-order-middle-middle">
                        <div class="item-order-title">{{goods.goodsName}}</div>
                    </div>
                    <div class="item-order-middle-right">
                        <div class="item-order-state">已完成</div>
                    </div>
                </div>
                <div class="item-order-bottom">
                    <div class="item-order-bottom-left">
                        <div>应付：￥{{item.payAmount}}</div>
                    </div>
                    <div class="item-order-bottom-middle">
                        <div class="item-button" @click="gotoOrderDetails(item)"><div>查看详情</div></div>
                    </div>
                </div>
            </div>
            <vBlackData v-if="completeOrder=='' || completeOrder == null "></vBlackData>
        </mt-tab-container-item>
        <mt-tab-container-item id="canceled">
            <div class="item-order" v-for="item in canceledOrder">
                <div class="item-order-top">
                    <div class="item-order-top-left">
                        <div class="item-order-number">订单号：{{item.orderCode}}</div>
                    </div>
                    <div class="item-order-top-right">
                        <div class="item-order-time">{{formatDate(item.orderTime)}}</div>
                    </div>
                </div>
                <div class="item-order-middle" v-for="goods in item.goodsGroup">
                    <div class="item-order-middle-left">
                        <div class="item-order-img"><img :src="goods.photoGroup[0].photoUrl"></div>
                    </div>
                    <div class="item-order-middle-middle">
                        <div class="item-order-title">{{goods.goodsName}}</div>
                    </div>
                    <div class="item-order-middle-right">
                        <div class="item-order-state" >已取消</div>
                    </div>
                </div>
                <div class="item-order-bottom">
                    <div class="item-order-bottom-left">
                        <div>应付：￥{{item.payAmount}}</div>
                    </div>
                    <div class="item-order-bottom-middle">
                        <div class="item-button" @click="gotoOrderDetails(item)"><div>查看详情</div></div>
                    </div>
                </div>
            </div>
            <vBlackData v-if="canceledOrder=='' || canceledOrder == null"></vBlackData>
        </mt-tab-container-item>
      </mt-tab-container>

  </div>
</template>
<style>
  #myOrder {
    position:fixed;
    left:0;
    top:0;
    width:100%;
    z-index:9999;
  }
  #myOrderTab {
    margin-top: 5em;
  }
  .item-order {
    height: auto;
    width: 100%;
  }
  .item-order-top {
    height: 2.5em;
    width: 100%;
    background-color: #ffffff;
    border-top: 0.1em solid #E3E3E3;
    border-bottom: 0.1em solid #E3E3E3;
  }
  .item-order-top-left {
    float: left;
    height: auto;
    width: 63%;
  }
  .item-order-number {
    font-size: 0.8em;
    padding: 0.9em 0 0 0.5em;
    color: #ABABAB;
  }
  .item-order-time {
    font-size: 0.8em;
    padding: 0.9em 0 0 0;
    color: #ABABAB;
  }
  .item-order-top-right {
    float: left;
    height: auto;
    width: 37%;
  }
  .item-order-middle {
    height: 5em;
    width: 100%;
    background-color: #ffffff;
    border-bottom: 0.1em solid #E3E3E3;
  }
  .item-order-middle-left {
    float: left;
    height: auto;
    width: 30%;
  }
  .item-order-middle-middle {
    float: left;
    height: auto;
    width: 50%;
  }
  .item-order-middle-right {
    float: left;
    height: auto;
    width: 20%;
  }
  .item-order-img {
    margin: 0.5em 0 0 0.5em;
    height: auto;
    width: auto;
    /*border: 0.1em solid #000000;*/
  }
  .item-order-img > img {
    height: 3.5em;
    width: 5em;
  }
  .item-order-title {
    margin: 1em 0 0 0.5em;
    font-size: 0.95em;
  }
  .item-order-state {
    margin: 1em 0 0 0.5em;
    font-size: 0.95em;
    color: #FF9800;
  }
  .item-order-bottom {
    margin: 0.5em 0 0 0.5em;
    height: 3em;
    width: 100%;
  }
  .item-order-bottom-left {
    float: left;
    height: auto;
    width: 50%;
  }
  .item-order-bottom-middle {
    float: right;
    height: auto;
    width: 25%;
  }
  .item-order-bottom-right {
    float: right;
    height: auto;
    width: 25%;
  }
  .item-button {
      border: 0.1em solid #FF7043;
      width: 4.5em;
      height: 1.6em;
      margin-top: 0.1em;
      margin-left: 0.2em;
      border-radius: 0.3em;
  }
  .item-button > div {
      font-size: 0.8em;
      color: #FF7043;
      padding-top: 0.18em;
      padding-left: 0.7em;
  }
  .myOrder-page .mint-tab-item {
    color: #B0B0B0;
  }
  .myOrder-page .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 3px solid #FF7043 !important;
    color: #FF7043 !important;
  }
   .myOrder-page .mint-navbar {
    height: 2.5em;
  }
  .myOrder-page .mint-navbar .mint-tab-item {
    padding-top: 0.8em !important;
  }
  .myOrder-page .mint-tab-item-label {
    font-size: 0.9em !important;
  }
</style>
<script>
  import {mapState} from 'vuex';
  import { Navbar, TabItem ,TabContainer, TabContainerItem,Toast} from 'mint-ui';
  import api from '../../../api/index';
  import config from '../../../api/config'
  const localStorage = global.localStorage;
  const WX_USER_ORDER_SHOW_TYPE = 'wx.user.order.show.type';//订单显示方式
  const WX_USER_PHONE = 'wx.user.userPhone'
  const WX_USER_ORDER = 'wx.user.order';
  const ORDER_DETAILS = 'order.details';
  const WX_USER_ID = 'wx.user.id';
  const WX_USER_TOPAY_ORDER = 'wx.user.wait.topay.order'; //去付款的订单
  export default{
      name: 'page-navbar',
      //数据绑定
      data: function () {
          return {
              selectedTab: 'all',
              allOrder: [],
              waitPayOrder: [],
              waitDealOrder: [],
              inServiceOrder: [],
              canceledOrder: [],
              completeOrder: [],
              waitOrderCount:''
          }
      },
      computed: mapState({
          login: state => state.account.auth.check(),
          userId: state => state.account.auth.userId,
      }),
      //定义额外方法
      methods: {
          loadOrderList(){
            this.waitPayOrder = [];
            this.waitDealOrder = [];
            this.inServiceOrder = [],
            this.canceledOrder = [];
            this.completeOrder = [];
            var orderShowType = localStorage.getItem(WX_USER_ORDER_SHOW_TYPE);
            console.log("订单显示类型:" + orderShowType);
            this.selectedTab = orderShowType;
            var orderList = localStorage.getItem(WX_USER_ORDER);
            this.allOrder = JSON.parse(orderList);
            if(!this.allOrder){
              console.log("订单数据为空!");
              return;
            }
            for(var i = 0; i < this.allOrder.length; i ++){
              switch(this.allOrder[i].orderStatus){
                case 0: //代付款
                  this.waitPayOrder.push(this.allOrder[i]);
                break;
                case 1:  //待处理
                  this.waitDealOrder.push(this.allOrder[i]);
                break;
                case 2:  //服务中
                  this.inServiceOrder.push(this.allOrder[i]);
                break;
                case 3:   //已完成
                  this.completeOrder.push(this.allOrder[i]);
                break;
                case 4:   //已取消
                  this.canceledOrder.push(this.allOrder[i]);
                break;
              }
            }
          },
          //获取授权
          getAuthorization(item){
              localStorage.setItem(WX_USER_TOPAY_ORDER, item==undefined?"":JSON.stringify(item));

              let wechatCode = localStorage.getItem("wx.user.wechat.code");
              let retUrl = "http://"+config.wxUrl+"/auth/wechatCommonService"
              +"/wechatDomainAuth?menuCode=WAIT_PAY&wechatCode="+wechatCode+"&pay=212";
              console.log(retUrl);
              window.location.href = retUrl;
          },
          goBack(){
            //window.location.href="/wechat/#/wx?tab=my";
            //window.location.reload();
            window.history.go(-1);
          },
          updataWaitPayNum(){
            var orderList = JSON.parse(localStorage.getItem(WX_USER_ORDER));
            var waitOrderCount = 0;
            if(!orderList){
              console.log("订单数据为空----更新代付款订单数量");
              return;
            }
            for(var i = 0; i < orderList.length; i ++){
              if(orderList[i].orderStatus == '0' ){
                waitOrderCount ++;
              }
            }
            this.waitOrderCount = waitOrderCount;
          },
          gotoOrderDetails(item){
            localStorage.setItem(WX_USER_ORDER_SHOW_TYPE, this.selectedTab);
            localStorage.removeItem(ORDER_DETAILS);
            localStorage.setItem(ORDER_DETAILS, item==undefined?"":JSON.stringify(item));
            //付款状态订单带code和wechatCode
           /* var code = api.getQueryString("code");
            var wechatCode = api.getQueryString("state");*/
            var code = api.getQueryString("code");
            if(!code){
              code =  this.$route.query.code;
            }
            var wechatCode = api.getQueryString("state");
            if(!wechatCode){
              wechatCode =  this.$route.query.state;
            }

            this.$router.push('/orderdetails');
          },
          formatDate(timeStamp){
            var d = new Date(timeStamp);
            var year = d.getFullYear();
            var month = d.getMonth()+1;
            var date = d.getDate();
            var hour = d.getHours();
            var minute = d.getMinutes();
            var second = d.getSeconds();
            return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
          },
          loadOrderListFromService:function () {
              localStorage.removeItem(WX_USER_ORDER);
              var params = {};
              //params.phone = localStorage.getItem(WX_USER_PHONE);
              //params.phone = '13501010101';
              params.userId = localStorage.getItem(WX_USER_ID);
              //params.userId = 'ad16849d3a114f69908c7cb543f6b648';
              params.pageSize = '1000';
              params.pageIndex = '1';
              let _this = this
              api.queryPersonalOrderPage(params).then((response) => {
                  console.log(response.data.body.data[0].orderId);
                  var orderList = response.data.body.data;
                  if(response.data.head.errorCode == '0'){
                    //重新加载订单，存到本地缓存
                    localStorage.setItem(WX_USER_ORDER,orderList==undefined?"":JSON.stringify(orderList));
                    _this.fetchData();
                  }
              }).catch((response) => {
               });
          },
          fetchData(){
              var self = this;
              console.info("created: self.login=" + self.login);
              //if (self.login) {
                  self.loadOrderList();
                  self.updataWaitPayNum();
              //}
          }
      },
      watch:{

      },
      //初始化执行的方法
      created(){
            /*  var flag = localStorage.getItem('wx.order.waitpay.state');
              if(flag == '1'){
                this.loadOrderListFromService();
              */

      },
      //通过路由的before钩子解决router-view缓存页面问题
      beforeRouteEnter (to, from, next) {
          next(vm => {
              var flag = localStorage.getItem('wx.order.waitpay.state');
              console.log("5655"+flag);
              if(flag == '1'){
                //vm.loadOrderListFromService();
                vm.fetchData();
                console.log("待付款订单发生变化============");
                localStorage.setItem('wx.order.waitpay.state','0');
                return;
              }
              vm.fetchData();
          });
      },
      mounted() {
      },
      watch:{
        selectedTab(){
          console.log("tab发生变化：" + this.selectedTab);
          //列表置顶
          window.scrollTo(0, 0);
        },
        waitOrderCount(){
          this.$store.dispatch('changeWaitPayNum' ,this.waitOrderCount);
        }
      }
  }
</script>
