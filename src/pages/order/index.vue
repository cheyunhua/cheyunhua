<template>
    <div>
        <div class="fx-header-top fx-orange">
          <i class="glyphicon glyphicon-menu-left fx-ico-left" aria-hidden="true"
                 v-on:click="goBack()"></i>确认订单
        </div>

        <div class="line"></div>
        <div style="background-color:#fff;">
            <v-product-card :product="item"
                deadline="年起" />
            <div class="edit"><textarea :placeholder="remarkPlaceholder" id="userMessage"></textarea></div>
        </div>

        <div class="line"></div>
        <div class="line"></div>
        <div class="listtxt">
            <li><span class="left">服务商品合计：</span><span class="right txtColor01 size">{{showData.goodsPrice}}</span></li>
            <li><span class="left">优惠金额：</span><span class="right txtColor01">{{Discount}}</span></li>
        </div>

        <div class="line"></div>
        <table><tr>
            <td class="yftd">应付金额：<span class="right txtColor01 size">{{showData.goodsPrice}}</span></td>
            <td class="buttontd"><div class="toptitle" style="border-radius: 3px;" v-on:click="submitOrder();">{{submitOrderText}}</div></td>
        </tr></table>
    </div>
</template>
<script>
    import config from 'src/api/config'
    import api from '../../api/';
    import { Toast,Indicator,MessageBox } from 'mint-ui';
    import '../../assets/css/login.css';
    const localStorage = global.localStorage;
    const WX_USER_TOPAY_ORDER = 'wx.user.wait.topay.order'; //去付款的订单
    const WX_USER_ID = 'wx.user.id';  //用户id
    export default {
        data () {
            return {
                showData:{
                    goodsName:'',
                    goodsPrice:'',
                    goodsPcurl:''
                },
                params:{
                    userId:'',
                    channel:'3',  //渠道 0 平台 1网站 2金财代账 3 微信商城
                    cusName :'',  //客户名称
                    cusType: '0', //客户类型
                    needInvoice:'1', //是否需要发票。0：需要开票1：不需要开票
                    dividePay:'0', // 0-全额
                    feedback:'',  //客户留言
                    mobilePhone:'',
                    price: '',  //订单价格
                    wechatCode:'',
                    code:'',
                    goodsGroup:[

                    ]
                },
                hasGoods: true,
                goodsImgurl:'',
                remark:'',
                goodsName:'商品名称',
                goodsDescribe:'商品描述',
                goodsPriceText:'0.00',
                Discount:'￥0.00',
                amountPayable:'￥0.00',
                submitOrderText:'提交订单',
                remarkPlaceholder:'选填，请填写您对此服务的要求',
                payPrice:'￥0.00'
            }
        },
        //通过路由的before钩子解除router-view缓存限制
        //相对于组件来说的，而且应该是在路由进入之前开始准备的
        //所以beforeRouteEnter是调用ajax的时机
        beforeRouteEnter (to, from, next) {
                next(vm => {

                });
      },
        //在组件的生命周期完成后，且旧路由即将切换走，新路由beforeEach的时机执行

        beforeRouteLeave(to, from, next){
                next();
        },
        //在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用
        beforeCreate() {
            console.log("come beforeCreate");
        },
        //mounted 是生命期钩子
        mounted(){

            var goodsSku = localStorage.getItem("goodsSku");
            if(goodsSku == null || goodsSku ===''){
                Toast("立即订购商品已失效，请重新订购！");
                return;
            }else{
                var goodsSkuParam = {'goodsSku':goodsSku};
                let _this = this;
                Indicator.open({
                    text: "正在加载数据...",
                    spinnerType:"fading-circle"
                });
                api.queryGoodInfoBySku(goodsSkuParam).then((response) => {
                    Indicator.close();
                    console.log('queryGoodInfoBySku')
                    if(response.data.head.errorCode === '0'){
                        var goodsDetails = response.data.body;
                        var goods = {};
                        goods.goodsSku = goodsDetails.goodsSku;
                        goods.goodsName = goodsDetails.goodsName;
                        //goods.price = goodsDetails.price;
                        goods.goodsQuantiy = 1;
                        //goods.discountPrice = "";
                        goods.areaCode = goodsDetails.areaCode;
                        //goods.customerId = goodsDetails.customerId;

                        //订单价格=商品价格    目前一个商品
                        _this.params.price = goodsDetails.price;

                        //页面显示
                        _this.showData.goodsName = goodsDetails.goodsName;
                        _this.showData.goodsPrice = goodsDetails.price;
                        _this.showData.goodsPcurl = goodsDetails.photos[0].photoUrl;

                        _this.params.goodsGroup.push(goods);
                    }
                    else{
                        _this.hasGoods = false;
                        Toast(response.data.head.errorMsg);
                    }
                })
                .catch((response) => {

                });
            }
            //this.startWxPayTest();
        },
        //computed相当于属性的一个实时计算，如果实时计算里关联了对象，那么当对象的某个值改变的时候，同事会出发实时计算
       computed: {
          item(){
              return {
                    title:this.showData.goodsName,
                    //pcurl:config.wxImgvUrl + "/mproducts/"+this.params.goodsNumber+"/01.jpg",
                    pcurl:this.showData.goodsPcurl,
                    price:this.showData.goodsPrice,
                    content:this.goodsDescribe,
                    hint:"",
                    img:"",
            }
          }
       },
        //监听某个值（双向绑定）的变化，一旦发生变化，就调用引号里的方法，从而达到change事件监听的效果！
        watch: {

        },
    created(){
    },
    methods: {
        goBack:function(){
            window.history.go(-2);
        },
        submitOrder:function(){
            localStorage.removeItem(WX_USER_TOPAY_ORDER);
            this.params.feedback = $("#userMessage").val();
            if(this.hasGoods){
                /*Indicator.open({
                    text: "正在提交...",
                    spinnerType: 'fading-circle'
                });*/
                var param = {};
                param = this.params;
                var mobilePhone= localStorage.getItem("wx.user.userPhone");
                console.log("提交订单");
                if(!mobilePhone){
                    Toast("请完善个人信息再进行操作");
                    this.$router.push("/bindPhone");
                    return;
                }
                param.userId = localStorage.getItem("wx.user.id");
                param.mobilePhone= mobilePhone;
                //目前 cusname = username
                param.cusName = localStorage.getItem("wx.user.name");
                localStorage.setItem(WX_USER_TOPAY_ORDER, param==undefined?"":JSON.stringify(param));
                let wechatCode = localStorage.getItem("wx.user.wechat.code");
                let retUrl = "http://"+config.wxUrl+"/auth/wechatCommonService"+"/wechatDomainAuth?menuCode=WAIT_PAY&wechatCode="+wechatCode+"&pay=212";
                console.log(retUrl);
                window.location.href = retUrl;

/*                api.addMallOrder(param).then((response) => {
                        Indicator.close();
                        console.log('addMallOrder')
                        if(response.data.head.errorCode === '0'){
                            var temparams = response.data.body;
                            if(temparams != null){
                                var orderId = temparams.orderId;
                                var payUrl = temparams.payUrl;
                                Toast("提交订单成功！");
                                localStorage.setItem("wx.pay.finish.url","wx");
                                window.location.href=payUrl;
                            }
                        }
                        else{
                            Toast(response.data.head.errorMsg);
                        }
                })
                .catch((response) => {
                    Toast(response.data.head.errorMsg);
                });*/
            }else{
                Toast("您尚未订购商品，请先订购！");
            }

        },
        startWxPay:function(params){
            if(params != null){
                var url = 'http://twx.jchl.com/wechatPay/pay/payWeChat.html?'
                        +'orderPrice='+params.orderPrice
                        +'&payProject='+params.payProject
                        +'&appId='+params.appId
                        +'&timeStamp='+params.timeStamp
                        +'&nonceStr='+params.nonceStr
                        +'&packageName='+params.packageName
                        +'&signType='+params.signType
                        +'&paySign='+params.paySign
                        +'&payRetUrl='+params.payRetUrl
                        +'&payFailureUrl='+params.payFailureUrl;
                window.location.href=url;
            }
            else{
                Toast("参数不能为空！");
            }
        },
        startWxPayTest:function(params){
                var name = decodeURIComponent(decodeURIComponent('%E5%BE%AE%E4%BF%A1%E4%BC%81%E4%B8%9A%E8%B4%A2%E7%A8%8E%E6%9C%8D%E5%8A%A1'));
                var returl = 'http://10.10.11.55:8011/?#payPrice=0.01&payProject=%E5%BE%AE%E4%BF%A1%E4%BC%81%E4%B8%9A%E8%B4%A2%E7%A8%8E%E6%9C%8D%E5%8A%A1'
                +'&orderId=eebe038e47780c96e2762b5e2003cef7&/orderPayResult';
                returl = encodeURIComponent(returl);
                /*localStorage.setItem('order.wx.payPrice', '0.01');
                localStorage.setItem('order.wx.payProject', '%E5%BE%AE%E4%BF%A1%E4%BC%81%E4%B8%9A%E8%B4%A2%E7%A8%8E%E6%9C%8D%E5%8A%A1');
                localStorage.setItem('order.wx.pay.orderId', 'eebe038e47780c96e2762b5e2003cef7');
                localStorage.setItem('order.wx.pay.time', (new Date()).getTime());*/
                console.log(returl);
                var url = 'http://twx.jchl.com/wechatPay/pay/payWeChat.html?orderPrice=0.01&payProject=%E5%BE%AE%E4%BF%A1%E4%BC%81%E4%B8%9A%E8%B4%A2%E7%A8%8E%E6%9C%8D%E5%8A%A1&appId=wx35102306dfc2506e&timeStamp=1501646478&nonceStr=fac05328668f599efe18e76cdb284aab&packageName=prepay_id%3Dwx20170802120118f446a06a2f0265807264&signType=MD5&paySign=992E93D37089DB728AE06D765FE97F5E&payRetUrl=http%3A%2F%2F10.10.11.55%3A8011%2F%23%2ForderPayResult%3FpayPrice%3D0.01%26payProject%3D%E5%BE%AE%E4%BF%A1%E4%BC%81%E4%B8%9A%E8%B4%A2%E7%A8%8E%E6%9C%8D%E5%8A%A1%26orderId%3D2267822898984722112&payFailureUrl=http%3A%2F%2F10.10.11.55%3A8011%2F%23%2ForderPayResultFail%3FpayPrice%3D0.01%26payProject%3D%E5%BE%AE%E4%BF%A1%E4%BC%81%E4%B8%9A%E8%B4%A2%E7%A8%8E%E6%9C%8D%E5%8A%A1%26orderId%3D2267822898984722112';
                window.location.href=url;
        }
    }
}
</script>
<style scoped>
.toptitle{ background-color: #ff7043;height: 4.2rem; line-height: 4.2rem; text-align: center; color: #fff; font-size: 1.8rem;}
.toptitle .iconfont{ color: #fff; position: absolute; left: 2rem;}
.line{ height: 0.6rem;}

.edit {  padding: 1rem;}
.edit textarea{ width: 100%; height: 5rem; border: 1px solid #e3e3e3; }

.listtxt{ background-color: #fff; padding: 1rem 2rem; }
.listtxt li .left{ color: #707070}
.listtxt li .right{position: absolute; right:0px;}
.listtxt li { border-bottom: 1px solid #e3e3e3; line-height: 3.5rem; position:relative;}
.listtxt li .size{ font-size: 2.6rem;}
.listtxt li:last-child{border-bottom: 1px solid #fff;}
.listtxt .iconfont{ padding-left: 1rem;}

.txtColor01{ color: #ff5722;}
.bgcolor01{ background-color: #ff660a;}
.bgcolor02{ background-color: #52b02e;}
.bgcolor03{ background-color: #30c5e0;}
.bgcolor04{ background-color: #865ad6;}
.bgcolor05{ background-color: #ed2a25;}

table{
    width: 100%;
    border: 1px solid #ccc;
    padding: 0;
    background-color: #fff;
    position:fixed;
    bottom:0;
}
.buttontd{ width: 40%;}
.yftd{text-align: center;}
</style>
